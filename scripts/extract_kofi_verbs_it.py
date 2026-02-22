#!/usr/bin/env python3
"""Extract Italian KOFI verb data from an Anki .apkg/collection file.

This parser is tailored to Lisardo's Ultimate Italian Conjugation deck and emits
the app's expected `data/kofi-verbs-it.json` schema.
"""

from __future__ import annotations

import argparse
import html
import json
import re
import sqlite3
import tempfile
import zipfile
from collections import defaultdict
from pathlib import Path

PERSON_TAGS = ("io", "tu", "lui_lei", "noi", "voi", "loro")
PERSON_LABELS = {
    "io": "io",
    "tu": "tu",
    "lui_lei": "lui/lei",
    "noi": "noi",
    "voi": "voi",
    "loro": "loro",
}
TENSE_TAGS = {
    "infinito": "infinito",
    "gerundio": "gerundio",
    "participio_passato": "participio_passato",
    "participio_presente": "participio_presente",
    "presente": "presente",
    "imperfetto": "imperfetto",
    "passato_remoto": "passato_remoto",
    "futuro": "futuro",
    "condizionale": "condizionale",
    # Map congiuntivo -> subgiuntivo so app splitting into additional track works.
    "congiuntivo_presente": "subgiuntivo_presente",
    "congiuntivo_imperfetto": "subgiuntivo_imperfetto",
    "imperativo": "imperativo",
}
TENSE_LABELS = {
    "infinito": "infinito",
    "gerundio": "gerundio",
    "participio_passato": "participio passato",
    "participio_presente": "participio presente",
    "presente": "presente",
    "imperfetto": "imperfetto",
    "passato_remoto": "passato remoto",
    "futuro": "futuro",
    "condizionale": "condizionale",
    "congiuntivo_presente": "subgiuntivo presente",
    "congiuntivo_imperfetto": "subgiuntivo imperfetto",
    "imperativo": "imperativo",
}
FINITE_TENSES = {
    "presente",
    "imperfetto",
    "passato_remoto",
    "futuro",
    "condizionale",
    "congiuntivo_presente",
    "congiuntivo_imperfetto",
}

HTML_TAG_RE = re.compile(r"<[^>]+>")
DOUBLE_BREAK_RE = re.compile(r"(?i)<br\s*/?>\s*<br\s*/?>")
WHITESPACE_RE = re.compile(r"\s+")

PRONOUN_PATTERNS = {
    "io": re.compile(r"\bio\b", re.IGNORECASE),
    "tu": re.compile(r"\btu\b", re.IGNORECASE),
    "lui_lei": re.compile(r"\blui\s*/\s*lei\b|\blui/lei\b", re.IGNORECASE),
    "noi": re.compile(r"\bnoi\b", re.IGNORECASE),
    "voi": re.compile(r"\bvoi\b", re.IGNORECASE),
    "loro": re.compile(r"\bloro\b", re.IGNORECASE),
}


def html_to_text(raw: str) -> str:
    first_segment = DOUBLE_BREAK_RE.split(raw, maxsplit=1)[0]
    text = html.unescape(first_segment)
    text = HTML_TAG_RE.sub("", text)
    return WHITESPACE_RE.sub(" ", text).strip()


def strip_edge_punctuation(value: str) -> str:
    return value.strip().strip(" .,!?:;…↧⇠⇢")


def pick_primary_variant(value: str) -> str:
    value = value.strip()
    for sep in (" | ", " / ", "|", "/"):
        if sep in value:
            return value.split(sep)[0].strip()
    return value


def extract_tail_after_pronoun(text: str, person_tag: str) -> str:
    pattern = PRONOUN_PATTERNS[person_tag]
    matches = list(pattern.finditer(text))
    if not matches:
        return text
    return text[matches[-1].end() :].strip()


def normalize_translation(value: str) -> str:
    text = strip_edge_punctuation(value)
    if not text:
        return ""
    return text[0].lower() + text[1:]


def normalize_answer(value: str) -> str:
    return value.strip().lower()


def extract_form_answer(back_text: str, tense_tag: str, person_tag: str | None, infinitive: str) -> str:
    text = strip_edge_punctuation(back_text)

    if tense_tag == "participio_passato":
        # One deck anomaly: "dovere participio_passato" card is actually infinitive.
        if text.casefold() == infinitive.casefold():
            return infinitive
        lowered = text.casefold()
        if lowered.startswith("avere "):
            text = text.split(" ", 1)[1]
        elif lowered.startswith("essere "):
            text = text.split(" ", 1)[1]
        return strip_edge_punctuation(pick_primary_variant(text))

    if tense_tag in {"participio_presente", "infinito", "gerundio", "imperativo"}:
        return strip_edge_punctuation(pick_primary_variant(text))

    if tense_tag in FINITE_TENSES and person_tag:
        tail = extract_tail_after_pronoun(text, person_tag)
        if not tail:
            tail = text
        return strip_edge_punctuation(pick_primary_variant(tail))

    return strip_edge_punctuation(pick_primary_variant(text))


def build_dataset(collection_path: Path) -> list[dict]:
    connection = sqlite3.connect(collection_path)
    rows = connection.execute("SELECT id, tags, flds FROM notes ORDER BY id").fetchall()

    verb_order: list[str] = []
    seen_verbs: set[str] = set()
    forms_by_verb: dict[str, list[dict]] = defaultdict(list)
    translation_candidates: dict[str, list[str]] = defaultdict(list)

    for note_id, raw_tags, raw_fields in rows:
        tags = raw_tags.strip().split()
        if not tags:
            continue

        source_tense_tag = next((token for token in tags if token in TENSE_TAGS), None)
        person_tag = next((token for token in tags if token in PERSON_TAGS), None)
        infinitive = next(
            (token for token in tags if token not in TENSE_TAGS and token not in PERSON_TAGS),
            None,
        )
        if not infinitive or not source_tense_tag:
            continue

        if infinitive not in seen_verbs:
            seen_verbs.add(infinitive)
            verb_order.append(infinitive)

        fields = raw_fields.split("\x1f")
        front_text = html_to_text(fields[1] if len(fields) > 1 else "")
        back_text = html_to_text(fields[2] if len(fields) > 2 else "")

        if front_text.lower().startswith("to "):
            translation_candidates[infinitive].append(front_text)

        answer = normalize_answer(extract_form_answer(back_text, source_tense_tag, person_tag, infinitive))
        if not answer:
            continue

        tense_tag = TENSE_TAGS[source_tense_tag]
        label = TENSE_LABELS[source_tense_tag]
        if person_tag:
            label = f"{label} - {PERSON_LABELS[person_tag]}"

        # Fix deck anomaly: dovere infinitive is tagged as participio_passato once.
        if infinitive == "dovere" and source_tense_tag == "participio_passato" and answer.casefold() == "dovere":
            tense_tag = "infinito"
            label = "infinito"
            person_tag = None

        forms_by_verb[infinitive].append(
            {
                "sortId": note_id,
                "label": label,
                "answer": answer,
                "tenseTag": tense_tag,
                "personTag": person_tag,
            }
        )

    dataset: list[dict] = []
    for infinitive in verb_order:
        forms = sorted(forms_by_verb[infinitive], key=lambda item: item["sortId"])
        deduped_forms: list[dict] = []
        seen_form_keys = set()

        for form in forms:
            form_key = (form["tenseTag"], form["personTag"], form["answer"])
            if form_key in seen_form_keys:
                continue
            seen_form_keys.add(form_key)
            form.pop("sortId", None)
            deduped_forms.append(form)

        candidates = translation_candidates.get(infinitive, [])
        translation = normalize_translation(min(candidates, key=lambda text: (len(text), text))) if candidates else ""

        dataset.append(
            {
                "infinitive": infinitive,
                "translation": translation,
                "formCount": len(deduped_forms),
                "forms": deduped_forms,
            }
        )

    return dataset


def extract_collection_from_apkg(apkg_path: Path) -> tuple[Path, tempfile.TemporaryDirectory]:
    temp_dir = tempfile.TemporaryDirectory()
    temp_path = Path(temp_dir.name)

    with zipfile.ZipFile(apkg_path) as archive:
        member = "collection.anki21"
        if member not in archive.namelist():
            member = "collection.anki2"
        archive.extract(member, path=temp_path)

    collection_path = temp_path / member
    return collection_path, temp_dir


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--apkg", type=Path, help="Path to the Italian KOFI Anki package (.apkg)")
    parser.add_argument(
        "--collection",
        type=Path,
        default=Path("data/anki/collection.anki21"),
        help="Path to Anki collection DB (collection.anki21/collection.anki2)",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("data/kofi-verbs-it.json"),
        help="Output JSON file path",
    )
    args = parser.parse_args()

    temp_dir_ref: tempfile.TemporaryDirectory | None = None
    try:
        if args.apkg:
            collection_path, temp_dir_ref = extract_collection_from_apkg(args.apkg)
        else:
            collection_path = args.collection

        dataset = build_dataset(collection_path)
    finally:
        if temp_dir_ref is not None:
            temp_dir_ref.cleanup()

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        json.dumps(dataset, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    total_forms = sum(verb["formCount"] for verb in dataset)
    print(f"Wrote {len(dataset)} verbs and {total_forms} forms to {args.output}")


if __name__ == "__main__":
    main()
