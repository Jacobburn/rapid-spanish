# Rapid Spanish

Spanish study web app with:
- Progress map unlock system
- KOFI verb training (core + additional tenses track)
- Nouns split into Top 500 + 501-2000 tracks
- Beginner phrases, discourse chunks, conversion, grammar, slang
- Stories, SRS tests, achievements, streaks, leaderboard, stats

## Run locally

```bash
python3 -m http.server 8000
```

Open: `http://localhost:8000`

## Supabase migration setup

The app now supports Supabase for:
- Account auth (signup/login/password update)
- Per-user state sync (best scores, attempts, activity, SRS, gamification)
- Shared leaderboard data

### 1. Create Supabase project

Create a project at [supabase.com](https://supabase.com/), then copy:
- Project URL
- Project `anon` key

### 2. Apply DB schema

Run `/Users/jakeburn/Documents/04  Projects/CODEX/Rapid Spanish/supabase/schema.sql` in the Supabase SQL editor.

### 3. Auth settings

In Supabase Auth settings:
- Disable mandatory email confirmation for this username-based flow, or handle email verification separately.

The app maps usernames to synthetic emails:
- `username` -> `username@rapidspanish.local` (customizable)

### 4. Configure frontend

Edit `/Users/jakeburn/Documents/04  Projects/CODEX/Rapid Spanish/supabase-config.js`:

```js
window.RAPID_SPANISH_SUPABASE_CONFIG = {
  url: "https://YOUR_PROJECT_ID.supabase.co",
  anonKey: "YOUR_SUPABASE_ANON_KEY",
  usernameDomain: "rapidspanish.local",
};
```

Template file:
- `/Users/jakeburn/Documents/04  Projects/CODEX/Rapid Spanish/supabase-config.example.js`

If `url` or `anonKey` is blank, the app falls back to localStorage mode.

## Data files

- `/Users/jakeburn/Documents/04  Projects/CODEX/Rapid Spanish/data/kofi-verbs.json`
- `/Users/jakeburn/Documents/04  Projects/CODEX/Rapid Spanish/data/top-2000-nouns.json`
- `/Users/jakeburn/Documents/04  Projects/CODEX/Rapid Spanish/data/beginner-phrases.json`
- `/Users/jakeburn/Documents/04  Projects/CODEX/Rapid Spanish/data/discourse-chunks.json`
- `/Users/jakeburn/Documents/04  Projects/CODEX/Rapid Spanish/data/english-spanish-conversion.json`
- `/Users/jakeburn/Documents/04  Projects/CODEX/Rapid Spanish/data/grammar-decks.json`
- `/Users/jakeburn/Documents/04  Projects/CODEX/Rapid Spanish/data/slang.json`
- `/Users/jakeburn/Documents/04  Projects/CODEX/Rapid Spanish/data/stories.json`

## Data generation scripts

- KOFI verbs: `/Users/jakeburn/Documents/04  Projects/CODEX/Rapid Spanish/scripts/extract_kofi_verbs.py`
- Frequency nouns: `/Users/jakeburn/Documents/04  Projects/CODEX/Rapid Spanish/scripts/extract_frequency_nouns.py`
- Beginner phrases: `/Users/jakeburn/Documents/04  Projects/CODEX/Rapid Spanish/scripts/generate_beginner_phrases.py`
- Conversion rules: `/Users/jakeburn/Documents/04  Projects/CODEX/Rapid Spanish/scripts/generate_conversion_rules.py`
- Grammar decks: `/Users/jakeburn/Documents/04  Projects/CODEX/Rapid Spanish/scripts/generate_grammar_decks.py`
