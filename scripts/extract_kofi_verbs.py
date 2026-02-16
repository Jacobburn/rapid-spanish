#!/usr/bin/env python3
"""Extract KOFI verb conjugations from an Anki .anki21 collection."""

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

CLOZE_RE = re.compile(r"\{\{c\d+::(.*?)(?:::(.*?))?\}\}", re.DOTALL)
VERB_HINT_RE = re.compile(r"…([^…]+)…")
HTML_TAG_RE = re.compile(r"<[^>]+>")
WHITESPACE_RE = re.compile(r"\s+")
DECK_VERB_TRANSLATION_RE = re.compile(r"^\s*\d+\.\s*([^\(\n:]+?)\s*\(([^)]+)\):", re.MULTILINE)

PERSON_TAGS = [
    ("yo", "yo"),
    ("tú", "tú"),
    ("vos", "vos"),
    ("él_ella_usted", "él/ella/usted"),
    ("nosotros", "nosotros"),
    ("vosotros", "vosotros"),
    ("ellos_ellas_ustedes", "ellos/ellas/ustedes"),
]

TENSE_TAGS = [
    ("infinitivo", "infinitivo"),
    ("gerundio", "gerundio"),
    ("participio", "participio"),
    ("presente", "presente"),
    ("imperfecto", "imperfecto"),
    ("indefinido", "indefinido"),
    ("futuro", "futuro"),
    ("condicional", "condicional"),
    ("subjuntivo_presente", "subjuntivo presente"),
    ("subjuntivo_pasado", "subjuntivo pasado"),
    ("subjuntivo_futuro", "subjuntivo futuro"),
    ("imperativo", "imperativo positivo"),
    ("negative_imperativo", "imperativo negativo"),
]


def clean_text(value: str) -> str:
    text = html.unescape(value)
    text = HTML_TAG_RE.sub("", text)
    text = WHITESPACE_RE.sub(" ", text).strip()
    return text


def parse_note(prompt: str) -> tuple[str, str | None]:
    match = CLOZE_RE.search(prompt)
    if not match:
        return "", None
    answer = clean_text(match.group(1))
    hint = clean_text(match.group(2)) if match.group(2) else None
    return answer, hint


def extract_hint_verb(hint: str | None) -> str | None:
    if not hint:
        return None
    match = VERB_HINT_RE.search(hint)
    if not match:
        return None
    return match.group(1).strip()


def verb_key(value: str) -> str:
    return value.strip().casefold()


def extract_verb_translations(connection: sqlite3.Connection) -> dict[str, str]:
    row = connection.execute("SELECT decks FROM col").fetchone()
    if not row:
        return {}

    decks = json.loads(row[0])
    translations: dict[str, str] = {}

    for deck in decks.values():
        description = html.unescape(deck.get("desc", ""))
        if not description:
            continue

        for match in DECK_VERB_TRANSLATION_RE.finditer(description):
            infinitive = match.group(1).strip()
            english = match.group(2).strip()
            key = verb_key(infinitive)
            if key and english and key not in translations:
                translations[key] = english

    return translations


def build_dataset(collection_path: Path) -> list[dict]:
    connection = sqlite3.connect(collection_path)
    translation_map = extract_verb_translations(connection)
    rows = connection.execute("SELECT id, flds, tags FROM notes ORDER BY id").fetchall()

    notes = []
    verb_candidates: set[str] = set()

    for note_id, fields, tags in rows:
        raw_tags = tags.strip().split()
        if "orientation" in raw_tags:
            continue

        prompt = fields.split("\x1f")[1]
        answer, hint = parse_note(prompt)
        if not answer:
            continue

        hint_verb = extract_hint_verb(hint)
        if hint_verb and hint_verb != "OK":
            verb_candidates.add(hint_verb)

        notes.append(
            {
                "id": note_id,
                "answer": answer,
                "tags": raw_tags,
                "hint_verb": hint_verb,
            }
        )

    verbs: dict[str, list[dict]] = defaultdict(list)
    first_note_id: dict[str, int] = {}

    for note in notes:
        tags = note["tags"]
        hint_verb = note["hint_verb"]
        verb = None

        if hint_verb in verb_candidates:
            verb = hint_verb
        else:
            for token in tags:
                if token in verb_candidates:
                    verb = token
                    break

        if not verb:
            continue

        tense_tag, tense_label = next(
            ((tag, label) for tag, label in TENSE_TAGS if tag in tags),
            (None, None),
        )
        person_tag, person_label = next(
            ((tag, label) for tag, label in PERSON_TAGS if tag in tags),
            (None, None),
        )

        if tense_label and person_label:
            label = f"{tense_label} - {person_label}"
        elif tense_label:
            label = tense_label
        elif person_label:
            label = person_label
        else:
            label = "forma"

        verbs[verb].append(
            {
                "id": note["id"],
                "label": label,
                "answer": note["answer"],
                "tenseTag": tense_tag,
                "personTag": person_tag,
            }
        )

        first_note_id.setdefault(verb, note["id"])

    sorted_verbs = sorted(verbs.keys(), key=lambda name: first_note_id[name])
    dataset = []

    for verb in sorted_verbs:
        forms = sorted(verbs[verb], key=lambda item: item["id"])
        for form in forms:
            form.pop("id", None)
        dataset.append(
            {
                "infinitive": verb,
                "translation": translation_map.get(verb_key(verb), ""),
                "formCount": len(forms),
                "forms": forms,
            }
        )

    return dataset


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--apkg",
        type=Path,
        help="Path to an Anki .apkg package",
    )
    parser.add_argument(
        "--collection",
        type=Path,
        default=Path("data/anki/collection.anki21"),
        help="Path to collection.anki21",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("data/kofi-verbs.json"),
        help="Output JSON file",
    )
    args = parser.parse_args()

    if args.apkg:
        with tempfile.TemporaryDirectory() as tmp_dir:
            temp_path = Path(tmp_dir)
            with zipfile.ZipFile(args.apkg) as archive:
                member = "collection.anki21"
                if member not in archive.namelist():
                    member = "collection.anki2"
                archive.extract(member, path=temp_path)
            dataset = build_dataset(temp_path / member)
    else:
        dataset = build_dataset(args.collection)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        json.dumps(dataset, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    print(f"Wrote {len(dataset)} verbs to {args.output}")


if __name__ == "__main__":
    main()
