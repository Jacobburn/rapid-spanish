#!/usr/bin/env python3
"""Extract the frequencylists.blogspot 2000 Spanish nouns into quiz JSON."""

from __future__ import annotations

import argparse
import html
import json
import re
import urllib.request
from pathlib import Path

ENTRY_RE = re.compile(r"<b>(\d+)\.\s*(.*?)</b>\s*-\s*(.*?)<br\s*/?>", re.IGNORECASE)
TARGET_COUNT = 2000


def clean(value: str) -> str:
    return " ".join(html.unescape(value).strip().split())


def strip_tags(value: str) -> str:
    return re.sub(r"<[^>]+>", "", value)


def guess_article(noun: str) -> str:
    probe = noun.lower()
    if probe.endswith(
        ("a", "ción", "sión", "dad", "tad", "tud", "umbre", "ie", "sis", "ez", "triz")
    ):
        return "la"
    return "el"


def expand_slash_a(noun: str) -> list[str]:
    # Handles frequent patterns like "graduado/a", "bravucón/a".
    if "/a" not in noun or " " in noun:
        return [noun]

    base = noun.replace("/a", "")
    forms = [base]

    if base.endswith("o"):
        forms.append(f"{base[:-1]}a")
    elif base.endswith("ón"):
        forms.append(f"{base}a")
    else:
        forms.append(f"{base}a")

    return list(dict.fromkeys(forms))


def parse_gender(segment: str) -> tuple[list[str], str]:
    cleaned = clean(strip_tags(segment))
    if " - " in cleaned:
        noun, gender = cleaned.rsplit(" - ", 1)
    else:
        noun, gender = cleaned, ""

    noun = noun.strip()
    gender = gender.strip().lower()

    if "masculine/feminine" in gender or ("masculine" in gender and "feminine" in gender):
        articles = ["el", "la"]
    elif "feminine" in gender:
        articles = ["la"]
    elif "masculine" in gender:
        articles = ["el"]
    else:
        articles = [guess_article(noun)]

    return articles, noun


def build_answers(noun: str, articles: list[str]) -> list[str]:
    noun_forms = expand_slash_a(noun)
    answers = []
    for article in articles:
        for form in noun_forms:
            answers.append(f"{article} {form}".strip())
    return list(dict.fromkeys(answers))


def parse_variants(spanish_tail: str) -> list[dict]:
    parts = [p.strip() for p in spanish_tail.split(" / ")]
    variants: list[dict] = []

    for part in parts:
        if not part:
            continue
        articles, noun = parse_gender(part)
        answers = build_answers(noun, articles)
        variants.append(
            {
                "noun": noun,
                "answers": answers,
            }
        )

    if variants:
        return variants

    # Fallback if parsing failed.
    cleaned = clean(strip_tags(spanish_tail))
    fallback_answer = f"{guess_article(cleaned)} {cleaned}".strip()
    return [{"noun": cleaned, "answers": [fallback_answer]}]


def parse_rows(page_html: str) -> list[dict]:
    rows = []
    for match in ENTRY_RE.finditer(page_html):
        rank = int(match.group(1))
        english = clean(strip_tags(match.group(2)))
        tail = clean(match.group(3))
        variants = parse_variants(tail)
        rows.append(
            {
                "rank": rank,
                "english": english,
                "raw": clean(strip_tags(tail)),
                "variants": variants,
            }
        )
    return rows


def build_items(rows: list[dict], target_count: int) -> tuple[list[dict], int]:
    primary = []
    extras = []

    for row in rows:
        if not row["variants"]:
            continue

        first = row["variants"][0]
        primary.append(
            {
                "hint": row["english"],
                "answer": first["answers"][0],
                "answers": first["answers"],
                "sourceRank": row["rank"],
                "source": first["noun"],
            }
        )

        for variant in row["variants"][1:]:
            extras.append(
                {
                    "hint": row["english"],
                    "answer": variant["answers"][0],
                    "answers": variant["answers"],
                    "sourceRank": row["rank"],
                    "source": variant["noun"],
                }
            )

    expanded_count = 0
    items = list(primary)
    while len(items) < target_count and extras:
        items.append(extras.pop(0))
        expanded_count += 1

    if len(items) > target_count:
        items = items[:target_count]

    # If still short due source gaps, duplicate tail entries to keep fixed deck sizing.
    while len(items) < target_count and items:
        source = items[-1].copy()
        source["sourceRank"] = None
        source["source"] = f"{source['source']} (duplicate)"
        items.append(source)

    for index, item in enumerate(items, start=1):
        item["index"] = index

    return items, expanded_count


def build_decks(items: list[dict], chunk_size: int = 50) -> list[dict]:
    decks = []
    for start in range(0, len(items), chunk_size):
        end = min(start + chunk_size, len(items))
        from_n = start + 1
        to_n = end
        decks.append(
            {
                "id": f"nouns-{from_n}-{to_n}",
                "title": f"Nouns {from_n}-{to_n}",
                "start": from_n,
                "end": to_n,
                "count": end - start,
                "items": items[start:end],
            }
        )
    return decks


def fetch_html(url: str) -> str:
    with urllib.request.urlopen(url, timeout=35) as response:
        return response.read().decode("utf-8", "ignore")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--url",
        default="https://frequencylists.blogspot.com/2015/12/the-2000-most-frequently-used-spanish.html",
        help="Source URL",
    )
    parser.add_argument(
        "--html-input",
        type=Path,
        help="Optional local HTML input",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("data/top-2000-nouns.json"),
        help="Output JSON path",
    )
    args = parser.parse_args()

    if args.html_input:
        page_html = args.html_input.read_text(encoding="utf-8")
    else:
        page_html = fetch_html(args.url)

    rows = parse_rows(page_html)
    items, expanded_count = build_items(rows, TARGET_COUNT)
    decks = build_decks(items, chunk_size=50)

    payload = {
        "source": args.url,
        "sourceRows": len(rows),
        "expandedFromAlternateForms": expanded_count,
        "totalWords": len(items),
        "decks": decks,
    }

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    print(f"Parsed rows: {len(rows)}")
    print(f"Expanded extra forms: {expanded_count}")
    print(f"Wrote words: {len(items)}")
    print(f"Wrote decks: {len(decks)}")
    print(f"Output: {args.output}")


if __name__ == "__main__":
    main()
