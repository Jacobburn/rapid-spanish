# Rapid Spanish - Training Dashboard

Dashboard + Sporcle-style quiz app with:
- Local account system (create, log in/out, manage name/password)
- Beginner phrases training (16 grouped decks)
- Discourse chunks training (5 grouped decks)
- English -> Spanish conversion training (14 rule decks)
- Grammar training (18 deck MVP)
- Slang training (7 regional decks)
- Stories in Spanish (12 unlockable stories)
- KOFI verb conjugation training
- Top 2000 nouns training (40 decks of 50 nouns)
- Leaderboards (global progress + weekly progress for local accounts)

## Run locally

```bash
python3 -m http.server 8000
```

Then open: `http://localhost:8000`

Accounts and progress are stored in browser `localStorage` on the device.

## Data source

The app reads:
- `data/kofi-verbs.json`
- `data/top-2000-nouns.json`
- `data/beginner-phrases.json`
- `data/discourse-chunks.json`
- `data/english-spanish-conversion.json`
- `data/grammar-decks.json`
- `data/slang.json`
- `data/stories.json`

## Regenerate verb data from `.apkg`

```bash
python3 scripts/extract_kofi_verbs.py \
  --apkg "/Users/jakeburn/Downloads/Ultimate_Spanish_Conjugation_Lisardos_KOFI_Method.apkg" \
  --output data/kofi-verbs.json
```

You can also generate from an extracted collection file:

```bash
python3 scripts/extract_kofi_verbs.py \
  --collection data/anki/collection.anki21 \
  --output data/kofi-verbs.json
```

## Regenerate Top 2000 nouns data

From a local saved Frequency Lists HTML:

```bash
python3 scripts/extract_frequency_nouns.py \
  --html-input /tmp/frequency_nouns_2000.html \
  --output data/top-2000-nouns.json
```

Or fetch directly:

```bash
python3 scripts/extract_frequency_nouns.py \
  --output data/top-2000-nouns.json
```

## Regenerate beginner phrases data

```bash
python3 scripts/generate_beginner_phrases.py
```

## Regenerate English -> Spanish conversion data

```bash
python3 scripts/generate_conversion_rules.py
```

## Regenerate grammar deck data

```bash
python3 scripts/generate_grammar_decks.py
```

`data/stories.json` is hand-curated.
`data/slang.json` is hand-curated.
