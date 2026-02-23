#!/usr/bin/env python3
"""Rebuild the 501-2000 noun decks using a rank-ordered JSON list."""

from __future__ import annotations

import argparse
import json
from pathlib import Path


def guess_article(noun: str) -> str:
    probe = noun.lower()
    if probe.endswith(
        ("a", "ción", "sión", "dad", "tad", "tud", "umbre", "ie", "sis", "ez", "triz")
    ):
        return "la"
    return "el"


def build_answers(noun: str, article: str) -> list[str]:
    return [f"{article} {noun}".strip()]


def load_existing_answers(existing: dict) -> dict:
    answer_map: dict[str, list[str]] = {}
    for deck in existing.get("decks", []):
        for item in deck.get("items", []):
            source = item.get("source")
            if not source or source in answer_map:
                continue
            answers = item.get("answers")
            if not answers:
                answer = item.get("answer")
                if answer:
                    answers = [answer]
            if answers:
                answer_map[source] = [str(entry).strip() for entry in answers if str(entry).strip()]
    return answer_map


def build_deck_items(words: list[str], start_rank: int, answer_map: dict) -> list[dict]:
    items: list[dict] = []
    for offset, noun in enumerate(words):
        rank = start_rank + offset
        answers = answer_map.get(noun)
        if not answers:
            answers = build_answers(noun, guess_article(noun))
        item = {
            "hint": noun,
            "hintLanguage": "es",
            "answer": answers[0],
            "answers": answers,
            "sourceRank": rank,
            "source": noun,
            "index": rank,
        }
        items.append(item)
    return items


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--source",
        type=Path,
        default=Path("/Users/jakeburn/Downloads/spanish_nouns_rank_501_2000.json"),
        help="Path to the 501-2000 noun rank JSON",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("data/top-2000-nouns.json"),
        help="Path to write the combined noun dataset",
    )
    args = parser.parse_args()

    existing = json.loads(args.output.read_text())
    source_data = json.loads(args.source.read_text())

    groups = source_data.get("groups", [])
    if not groups:
        raise SystemExit("No groups found in source JSON")

    answer_map = load_existing_answers(existing)

    core_decks = [deck for deck in existing.get("decks", []) if int(deck.get("start", 0)) <= 500]
    advanced_decks: list[dict] = []
    for group in groups:
        start_rank = int(group.get("start_rank"))
        end_rank = int(group.get("end_rank"))
        words = group.get("words", [])
        items = build_deck_items(words, start_rank, answer_map)
        advanced_decks.append(
            {
                "id": f"nouns-{start_rank}-{end_rank}",
                "title": group.get("name") or f"Nouns {start_rank}-{end_rank}",
                "start": start_rank,
                "end": end_rank,
                "count": len(items),
                "items": items,
            }
        )

    decks = core_decks + advanced_decks
    total_words = sum(deck.get("count", 0) for deck in decks)

    existing.update(
        {
            "source": "User-provided Top 500 replacement list (20 themed groups) + doozan/spanish_data frequency list (ranks 501-2000)",
            "sourceRows": total_words,
            "expandedFromAlternateForms": 0,
            "totalWords": total_words,
            "decks": decks,
        }
    )

    args.output.write_text(json.dumps(existing, ensure_ascii=False, indent=2) + "\n")


if __name__ == "__main__":
    main()
