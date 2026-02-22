#!/usr/bin/env python3
"""Generate Italian noun decks aligned to the Spanish top-2000 noun map.

This script translates each Spanish noun answer phrase (singular + pluralized form)
into Italian and emits the app-ready schema used by `top-2000-nouns-it.json`.
"""

from __future__ import annotations

import argparse
import html
import json
import re
import ssl
import time
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

TRANSLATE_URL = "https://translate.googleapis.com/translate_a/single"
SSL_CONTEXT = ssl._create_unverified_context()
WHITESPACE_RE = re.compile(r"\s+")
NON_WORD_RE = re.compile(r"[^\w\sÀ-ÖØ-öø-ÿ]")
ITALIAN_SINGULAR_ARTICLES = {"il", "lo", "la", "l"}
ITALIAN_PLURAL_ARTICLES = {"i", "gli", "le"}
PLURAL_CONTRACTION_TO_ARTICLE = {
    "nei": "i",
    "negli": "gli",
    "nelle": "le",
    "dei": "i",
    "degli": "gli",
    "delle": "le",
    "ai": "i",
    "agli": "gli",
    "alle": "le",
}


def normalize_phrase(value: str) -> str:
    text = html.unescape(value or "").strip().lower()
    # Make elided forms easy to type in the app: l'uomo -> l uomo.
    text = text.replace("’", "'").replace("'", " ")
    text = NON_WORD_RE.sub(" ", text)
    text = WHITESPACE_RE.sub(" ", text).strip()
    return text


def dedupe(values: list[str]) -> list[str]:
    out: list[str] = []
    seen = set()
    for value in values:
        normalized = normalize_phrase(value)
        if not normalized or normalized in seen:
            continue
        seen.add(normalized)
        out.append(normalized)
    return out


def starts_with_article(phrase: str, plural: bool) -> bool:
    parts = phrase.split()
    if not parts:
        return False
    first = parts[0].lower()
    if plural:
        return first in ITALIAN_PLURAL_ARTICLES or first in ITALIAN_SINGULAR_ARTICLES
    return first in ITALIAN_SINGULAR_ARTICLES


def starts_with_special_lo_cluster(word: str) -> bool:
    probe = word.lower()
    return (
        probe.startswith("z")
        or probe.startswith("x")
        or probe.startswith("y")
        or probe.startswith("gn")
        or probe.startswith("pn")
        or probe.startswith("ps")
        or (probe.startswith("s") and len(probe) > 1 and probe[1] not in "aeiouàèéìíòóùú")
    )


def guess_italian_article(source_phrase: str, noun: str, plural: bool) -> str:
    source_parts = source_phrase.split()
    source_article = source_parts[0].lower() if source_parts else ""

    if plural:
        if source_article == "las":
            return "le"
        if source_article == "los":
            if noun and (noun[0] in "aeiouàèéìíòóùú" or starts_with_special_lo_cluster(noun)):
                return "gli"
            return "i"
        return "le" if noun.endswith("a") else "i"

    if source_article == "la":
        if noun and noun[0] in "aeiouàèéìíòóùú":
            return "l"
        return "la"
    if source_article == "el":
        if noun and noun[0] in "aeiouàèéìíòóùú":
            return "l"
        if starts_with_special_lo_cluster(noun):
            return "lo"
        return "il"

    if noun and noun[0] in "aeiouàèéìíòóùú":
        return "l"
    return "la" if noun.endswith("a") else "il"


def ensure_article(phrase: str, source_phrase: str, plural: bool) -> str:
    normalized = normalize_phrase(phrase)
    if not normalized:
        return normalized
    if plural:
        parts = normalized.split()
        if parts and parts[0] in PLURAL_CONTRACTION_TO_ARTICLE:
            parts[0] = PLURAL_CONTRACTION_TO_ARTICLE[parts[0]]
            normalized = " ".join(parts)
    if starts_with_article(normalized, plural=plural):
        return normalized
    article = guess_italian_article(source_phrase, normalized.split()[0], plural=plural)
    return normalize_phrase(f"{article} {normalized}")


def pluralize_spanish_word(word: str) -> str:
    probe = word.lower()
    if probe.endswith(("z",)):
        return f"{word[:-1]}ces"
    if probe.endswith(("s", "x")):
        if len(word) > 2 and probe[-2] in "aeiouáéíóú":
            return word
        return f"{word}es"
    if probe.endswith(("a", "e", "i", "o", "u", "á", "é", "ó")):
        return f"{word}s"
    if probe.endswith(("í", "ú")):
        return f"{word}es"
    return f"{word}es"


def pluralize_spanish_noun_phrase(noun_phrase: str) -> str:
    parts = [part for part in re.split(r"\s+", noun_phrase.strip()) if part]
    if not parts:
        return noun_phrase
    parts[0] = pluralize_spanish_word(parts[0])
    return " ".join(parts)


def pluralize_spanish_answer_with_article(answer: str) -> str:
    parts = [part for part in re.split(r"\s+", answer.strip()) if part]
    if len(parts) < 2:
        return answer
    article = parts[0].lower()
    plural_article = "los" if article == "el" else "las" if article == "la" else parts[0]
    noun = " ".join(parts[1:])
    plural_noun = pluralize_spanish_noun_phrase(noun)
    return f"{plural_article} {plural_noun}"


def pluralize_italian_phrase_fallback(answer: str) -> str:
    parts = [part for part in re.split(r"\s+", normalize_phrase(answer)) if part]
    if len(parts) < 2:
        return normalize_phrase(answer)

    article = parts[0]
    noun = parts[1]
    rest = parts[2:]

    if article == "il":
        plural_article = "i"
    elif article == "lo":
        plural_article = "gli"
    elif article == "la":
        plural_article = "le"
    elif article == "l":
        plural_article = "le" if noun.endswith("a") else "gli"
    else:
        plural_article = article

    if noun.endswith(("à", "è", "é", "ì", "í", "ò", "ó", "ù", "ú")):
        plural_noun = noun
    elif noun.endswith("a"):
        plural_noun = f"{noun[:-1]}e"
    elif noun.endswith(("co", "go")):
        # A rough fallback. Many nouns are irregular, but this handles a common pattern.
        plural_noun = f"{noun[:-1]}hi"
    elif noun.endswith("o"):
        plural_noun = f"{noun[:-1]}i"
    elif noun.endswith("e"):
        plural_noun = f"{noun[:-1]}i"
    else:
        plural_noun = noun

    phrase = " ".join([plural_article, plural_noun, *rest]).strip()
    return normalize_phrase(phrase)


def translate_phrase(phrase: str, retries: int = 5) -> str:
    encoded = urllib.parse.urlencode(
        {
            "client": "gtx",
            "sl": "es",
            "tl": "it",
            "dt": "t",
            "q": phrase,
        }
    )
    url = f"{TRANSLATE_URL}?{encoded}"

    delay = 0.4
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(url, timeout=20, context=SSL_CONTEXT) as response:
                payload = json.loads(response.read().decode("utf-8"))
            chunks = payload[0] if isinstance(payload, list) and payload else []
            translated = "".join(chunk[0] for chunk in chunks if isinstance(chunk, list) and chunk)
            translated = translated.strip()
            if translated:
                return translated
        except Exception:
            pass

        if attempt < retries - 1:
            time.sleep(delay)
            delay *= 1.7

    raise RuntimeError(f"Translation failed for phrase: {phrase!r}")


def load_cache(path: Path) -> dict[str, str]:
    if not path.exists():
        return {}
    raw = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(raw, dict):
        return {}
    return {str(key): str(value) for key, value in raw.items()}


def save_cache(path: Path, cache: dict[str, str]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(cache, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def translate_missing(cache: dict[str, str], phrases: list[str], workers: int) -> None:
    missing = [phrase for phrase in phrases if phrase not in cache]
    if not missing:
        return

    print(f"Translating {len(missing)} new phrases with {workers} workers...")
    completed = 0

    with ThreadPoolExecutor(max_workers=workers) as pool:
        futures = {pool.submit(translate_phrase, phrase): phrase for phrase in missing}
        for future in as_completed(futures):
            phrase = futures[future]
            cache[phrase] = future.result()
            completed += 1
            if completed % 200 == 0 or completed == len(missing):
                print(f"  translated {completed}/{len(missing)}")


def build_dataset(source_payload: dict, cache: dict[str, str]) -> dict:
    source_decks = source_payload.get("decks") or []
    decks = []
    total_words = 0

    for deck in source_decks:
        items_out = []
        for item in deck.get("items", []):
            source_answers = item.get("answers") or []
            if not source_answers and item.get("answer"):
                source_answers = [item.get("answer")]
            source_answers = [str(value).strip() for value in source_answers if str(value).strip()]

            singular_answers = dedupe(
                [
                    ensure_article(cache.get(value, value), value, plural=False)
                    for value in source_answers
                ]
            )

            source_plural_answers = [pluralize_spanish_answer_with_article(value) for value in source_answers]
            plural_answers = dedupe(
                [
                    ensure_article(cache.get(source_plural, source_plural), source_plural, plural=True)
                    for source_plural in source_plural_answers
                ]
            )
            if not plural_answers:
                plural_answers = dedupe([pluralize_italian_phrase_fallback(value) for value in singular_answers])

            if not singular_answers:
                continue

            items_out.append(
                {
                    "hint": item.get("hint", ""),
                    "answer": singular_answers[0],
                    "answers": singular_answers,
                    "pluralAnswers": plural_answers,
                    "sourceRank": item.get("sourceRank"),
                    "source": item.get("source"),
                    "index": item.get("index"),
                }
            )

        decks.append(
            {
                "id": deck.get("id"),
                "title": deck.get("title"),
                "start": deck.get("start"),
                "end": deck.get("end"),
                "count": len(items_out),
                "items": items_out,
            }
        )
        total_words += len(items_out)

    return {
        "source": "Spanish top-2000 nouns map translated es->it via Google Translate endpoint",
        "sourceMap": source_payload.get("source", ""),
        "totalWords": total_words,
        "decks": decks,
    }


def collect_phrases(payload: dict) -> list[str]:
    phrases: list[str] = []
    for deck in payload.get("decks", []):
        for item in deck.get("items", []):
            answers = item.get("answers") or []
            if not answers and item.get("answer"):
                answers = [item.get("answer")]
            for answer in answers:
                answer_text = str(answer).strip()
                if not answer_text:
                    continue
                phrases.append(answer_text)
                phrases.append(pluralize_spanish_answer_with_article(answer_text))
    # Preserve order while deduping.
    seen = set()
    ordered = []
    for phrase in phrases:
        if phrase in seen:
            continue
        seen.add(phrase)
        ordered.append(phrase)
    return ordered


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--source",
        type=Path,
        default=Path("data/top-2000-nouns.json"),
        help="Spanish noun source map path",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("data/top-2000-nouns-it.json"),
        help="Italian noun output path",
    )
    parser.add_argument(
        "--cache",
        type=Path,
        default=Path("data/translation-cache-es-it-nouns.json"),
        help="Translation cache path",
    )
    parser.add_argument(
        "--workers",
        type=int,
        default=8,
        help="Translation worker count",
    )
    args = parser.parse_args()

    source_payload = json.loads(args.source.read_text(encoding="utf-8"))
    phrases = collect_phrases(source_payload)
    print(f"Unique translation phrases: {len(phrases)}")

    cache = load_cache(args.cache)
    print(f"Cache entries before: {len(cache)}")
    translate_missing(cache, phrases, workers=max(1, args.workers))
    save_cache(args.cache, cache)
    print(f"Cache entries after: {len(cache)}")

    output_payload = build_dataset(source_payload, cache)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        json.dumps(output_payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    print(f"Wrote {output_payload['totalWords']} words across {len(output_payload['decks'])} decks.")
    print(f"Output: {args.output}")


if __name__ == "__main__":
    main()
