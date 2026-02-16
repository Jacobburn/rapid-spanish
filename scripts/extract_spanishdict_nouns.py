#!/usr/bin/env python3
"""Extract the SpanishDict Top 1000 nouns list into quiz-ready JSON."""

from __future__ import annotations

import argparse
import html
import json
import re
import urllib.request
from pathlib import Path

PAIR_RE = re.compile(
    r'<div class="UO6pWUJR">(.*?)</div><div class="xLusdC9B">(.*?)</div>'
)

FEMININE_ENDINGS = (
    "a",
    "cion",
    "sion",
    "dad",
    "tad",
    "tud",
    "umbre",
    "ie",
    "sis",
    "ez",
    "triz",
)


def clean_text(value: str) -> str:
    return html.unescape(value).strip()


def normalize_key(value: str) -> str:
    return value.strip().lower()


def guess_article(base: str) -> str:
    probe = normalize_key(base)
    for ending in FEMININE_ENDINGS:
        if probe.endswith(ending):
            return "la"
    return "el"


def with_required_article(raw_spanish: str) -> tuple[str, list[str]]:
    raw = " ".join(raw_spanish.split()).strip()
    lowered = normalize_key(raw)

    if lowered.startswith("el/la "):
        base = raw[6:].strip()
        return f"el {base}", [f"el {base}", f"la {base}"]

    if lowered.startswith("el "):
        return raw, [raw]

    if lowered.startswith("la "):
        return raw, [raw]

    # Keep the quiz singular as requested.
    if lowered.startswith("las "):
        singular = f"la {raw[4:].strip()}"
        return singular, [singular]

    article = guess_article(raw)
    answer = f"{article} {raw}"
    return answer, [answer]


def parse_pairs(page_html: str) -> list[tuple[str, str]]:
    pairs = []
    for spanish_raw, english_raw in PAIR_RE.findall(page_html):
        spanish = clean_text(spanish_raw)
        english = clean_text(english_raw)
        pairs.append((spanish, english))
    return pairs


def build_dataset(pairs: list[tuple[str, str]]) -> dict:
    items = []

    for index, (spanish_raw, english) in enumerate(pairs, start=1):
        answer, answers = with_required_article(spanish_raw)
        items.append(
            {
                "index": index,
                "hint": english,
                "answer": answer,
                "answers": answers,
                "source": spanish_raw,
            }
        )

    decks = []
    chunk = 50
    for start in range(0, len(items), chunk):
        end = min(start + chunk, len(items))
        from_n = start + 1
        to_n = end
        deck_id = f"nouns-{from_n}-{to_n}"
        decks.append(
            {
                "id": deck_id,
                "title": f"Nouns {from_n}-{to_n}",
                "start": from_n,
                "end": to_n,
                "count": end - start,
                "items": items[start:end],
            }
        )

    return {
        "source": "https://www.spanishdict.com/lists/1862408/1000-most-common-nouns",
        "totalWords": len(items),
        "decks": decks,
    }


def fetch_html(url: str) -> str:
    with urllib.request.urlopen(url, timeout=30) as response:
        return response.read().decode("utf-8", "ignore")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--url",
        default="https://www.spanishdict.com/lists/1862408/1000-most-common-nouns",
        help="SpanishDict list URL",
    )
    parser.add_argument(
        "--html-input",
        type=Path,
        help="Optional local HTML input file (skips network fetch)",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("data/top-1000-nouns.json"),
        help="Output JSON path",
    )
    args = parser.parse_args()

    if args.html_input:
        page_html = args.html_input.read_text(encoding="utf-8")
    else:
        page_html = fetch_html(args.url)

    pairs = parse_pairs(page_html)
    dataset = build_dataset(pairs)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        json.dumps(dataset, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Wrote {dataset['totalWords']} nouns to {args.output}")
    print(f"Wrote {len(dataset['decks'])} decks")


if __name__ == "__main__":
    main()
