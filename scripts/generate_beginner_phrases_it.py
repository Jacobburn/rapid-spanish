#!/usr/bin/env python3

import json
import re
import unicodedata
from datetime import datetime, UTC
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE_PATH = ROOT / "data" / "beginner-phrases.json"
OUTPUT_PATH = ROOT / "data" / "beginner-phrases-it.json"


def normalize(value: str) -> str:
    lowered = value.lower()
    decomposed = unicodedata.normalize("NFD", lowered)
    without_marks = "".join(ch for ch in decomposed if unicodedata.category(ch) != "Mn")
    cleaned = "".join(ch if (ch.isalnum() or ch.isspace()) else " " for ch in without_marks)
    return re.sub(r"\s+", " ", cleaned).strip()


def normalize_for_uniqueness(value: str) -> str:
    lowered = value.lower()
    cleaned = "".join(ch if (ch.isalnum() or ch.isspace()) else " " for ch in lowered)
    return re.sub(r"\s+", " ", cleaned).strip()


def make_item(hint: str, answer: str, *alternates: str) -> dict:
    answers = [answer, *alternates]
    unique_answers = []
    seen = set()
    for item in answers:
        key = normalize(item)
        if not key or key in seen:
            continue
        seen.add(key)
        unique_answers.append(item)
    return {
        "hint": hint,
        "answer": answer,
        "answers": unique_answers,
    }


def decorate_group(source_group: dict, items: list[dict]) -> dict:
    return {
        "id": source_group["id"],
        "title": source_group["title"],
        "description": source_group.get("description", ""),
        "count": len(items),
        "items": [
            {
                **item,
                "index": idx,
            }
            for idx, item in enumerate(items, start=1)
        ],
    }


def to_answer_parts(spec):
    if isinstance(spec, str):
        return spec, []
    if isinstance(spec, (list, tuple)) and spec:
        return spec[0], list(spec[1:])
    raise ValueError(f"Unsupported answer spec: {spec!r}")


def italian_number(n: int) -> list[str]:
    base = {
        0: "zero",
        1: "uno",
        2: "due",
        3: "tre",
        4: "quattro",
        5: "cinque",
        6: "sei",
        7: "sette",
        8: "otto",
        9: "nove",
        10: "dieci",
        11: "undici",
        12: "dodici",
        13: "tredici",
        14: "quattordici",
        15: "quindici",
        16: "sedici",
        17: "diciassette",
        18: "diciotto",
        19: "diciannove",
        20: "venti",
        30: "trenta",
        40: "quaranta",
        50: "cinquanta",
        60: "sessanta",
        70: "settanta",
        80: "ottanta",
        90: "novanta",
        100: "cento",
    }
    if n in base:
        return [base[n]]

    tens = (n // 10) * 10
    ones = n % 10
    tens_word = base[tens]
    if ones in (1, 8):
        tens_word = tens_word[:-1]

    ones_word = base[ones]
    alternates = []
    if ones == 3 and n > 20:
        ones_word = "tré"
        alternates.append(f"{tens_word}tre")

    return [f"{tens_word}{ones_word}", *alternates]


ITALIAN_GROUP_ANSWERS = {
    "core-functional-words": [
        ("sì", "si"),
        "no",
        "ok",
        "d'accordo",
        "va bene",
        "certo",
        "forse",
        "magari",
        "può darsi",
        "capisco",
        "non capisco",
        "non lo so",
        "ripeta, per favore",
        "più lentamente, per favore",
        "che cosa?",
        "chi?",
        "chi sono?",
        "quale?",
        "quali?",
        "dove?",
        "verso dove?",
        "quando?",
        "come?",
        "quanto?",
        "quanta?",
        "quanti?",
        "quante?",
        "perché?",
        "per che cosa?",
        "da dove?",
        "a che ora?",
    ],
    "greetings-social-phrases": [
        "ciao",
        "buongiorno",
        "buon pomeriggio",
        ("buonasera", "buonanotte"),
        "come sta?",
        "come stai?",
        "come state?",
        "come va?",
        ("piacere di conoscerti", "piacere"),
        "lieto di conoscerla",
        "lieta di conoscerla",
        "altrettanto",
        "benvenuto",
        "benvenuta",
        "arrivederci",
        "a più tardi",
        "a domani",
        "a presto",
        "ci vediamo",
        "buona giornata",
        "buona giornata a te",
        "grazie",
        "grazie mille",
        "prego",
        ("di niente", "non c'è di che"),
        "per favore",
        "permesso",
        "con permesso",
        "scusi",
        "mi dispiace",
        "mi scusi",
        "scusa",
        "salute",
        "congratulazioni",
        "buon viaggio",
        "riposati bene",
    ],
    "articles": [
        "il",
        "la",
        "i",
        "le",
        "lo",
        "un",
        "una",
        "dei",
        "delle",
    ],
    "pronouns": [
        "io",
        "tu",
        "tu (voseo non usato)",
        "Lei",
        "lui",
        "ella",
        "esso",
        "noi",
        "noi stesse",
        "voi",
        "voi stesse",
        "Loro",
        "essi",
        "esse",
        "mi",
        "ti",
        "lo",
        "la",
        "li",
        "le",
        "gli",
        "a loro",
        "si",
        "ci",
        "vi",
        "me",
        "te",
        "sé",
        "con me",
        "con te",
        "con sé",
        "chi",
        "coloro che",
        "quello che",
        "quella che",
        "quelli che",
        "quelle che",
        "ciò che",
        "il quale",
        "la quale",
        "i quali",
        "le quali",
        "il che",
        "il cui",
        "la cui",
        "i cui",
        "le cui",
        "quanto",
        "quanta",
        "quanti",
        "quante",
    ],
    "possessives": [
        "mio",
        "miei",
        "tuo",
        "tuoi",
        "suo",
        "suoi",
        "nostro",
        "nostra",
        "nostri",
        "nostre",
        "vostro",
        "vostra",
        "vostri",
        "vostre",
        "il mio",
        "la mia",
        "i miei",
        "le mie",
        "il tuo",
        "la tua",
        "i tuoi",
        "le tue",
        "il suo",
        "la sua",
        "i suoi",
        "le sue",
    ],
    "demonstratives": [
        "questo",
        "questa",
        "questi",
        "queste",
        "codesto",
        "codesta",
        "codesti",
        "codeste",
        "quello laggiù",
        "quella laggiù",
        "quelli laggiù",
        "quelle laggiù",
        "questa cosa",
        "quella cosa",
        "quella cosa laggiù",
    ],
    "quantifiers": [
        "tutto",
        "tutta",
        "tutti",
        "tutte",
        "alcuno",
        "alcuna",
        "alcuni",
        "alcune",
        "alcun",
        "nessuno",
        "nessuna",
        "nessun",
        "molto",
        "molta",
        "molti",
        "molte",
        "poco",
        "poca",
        "pochi",
        "poche",
        "sufficienti",
        "abbastanza",
        "vari",
        "varie",
        "ogni",
        "altro",
        "altra",
        "altri",
        "altre",
        "tanto",
        "tanta",
        "tanti",
        "tante",
        "troppo",
        "troppa",
        "troppi",
        "troppe",
        "qualsiasi",
        "chiunque",
        "qualsivoglia",
        "entrambi",
        "entrambe",
        "più",
        "meno",
        "qualcosa",
        "niente",
        "qualcuno",
        "nessuna persona",
        "uno",
        "una",
        "gli uni",
        "le une",
        "gli altri",
        "tale",
        "tali",
        "ciascuno",
        "ciascuna",
    ],
    "prepositions": [
        "a",
        "al",
        "dinanzi a",
        "sotto",
        "accanto a",
        "con",
        "contro",
        "di",
        "del",
        "da",
        "durante",
        "in",
        "tra",
        "eccetto",
        "verso",
        "fino a",
        "incluso",
        "mediante",
        "salvo",
        "per",
        "tramite",
        "tranne",
        "secondo",
        "senza",
        "sotto a",
        "su",
        "dopo",
        "versus",
        "via",
    ],
    "conjunctions": [
        "e",
        "ed",
        "o",
        "od",
        "né",
        "oppure",
        "ma",
        "però",
        "bensì",
        "bensì che",
        "né...né",
        "o...o",
        "sia...sia",
        "ora...ora",
        "che sia...che sia",
        "sia...che",
        "che",
        "perché",
        "poiché",
        "dato che",
        "visto che",
        "giacché",
        "come",
        "se",
        "come se",
        "sebbene",
        "anche se",
        "mentre",
        "mentre invece",
        "quando",
        "dove",
        "non appena",
        "appena",
        "a stento quando",
        "prima che",
        "dopo che",
        "da quando",
        "finché",
        "affinché",
        "in modo che",
        "senza che",
        "a meno che",
        "purché",
        "ogni volta che",
        "nel caso in cui",
        "dunque",
        "quindi",
        "perciò",
        "di conseguenza",
        "poi",
        "allora",
    ],
    "interjections": [
        "ahi!",
        "ah!",
        "eh?",
        "oh!",
        "uff!",
        "bah!",
        "caspita!",
        "accidenti!",
        "bravo!",
        "dai!",
        "su!",
        "occhio!",
        "attenzione!",
        "ops!",
        "aiuto!",
        "meno male!",
    ],
    "directions-location": [
        "a destra",
        "a sinistra",
        "dritto",
        "diritto",
        "in fondo alla strada",
        "all'angolo",
        "accanto a",
        "vicino a",
        "lontano da",
        "davanti a",
        "dietro",
        "di fronte a",
        "su",
        "giù",
        "dentro",
        "fuori",
        "nord",
        "sud",
        "ovest",
        "est",
        "mappa",
        "strada",
        "viale",
        "piazza",
        "angolo",
        "semaforo",
        "attraversamento pedonale",
        "ponte",
        "rotonda",
        "entrata",
        "uscita",
        "dov'è ...?",
        "come arrivo ...?",
        "continua dritto",
        "giri a destra",
        "giri a sinistra",
        "attraversi la strada",
        "è qui",
        "è lì",
    ],
    "ordering-food": [
        "un tavolo per due",
        "avete un tavolo libero?",
        "la carta",
        "il menù",
        "il cameriere",
        "la cameriera",
        "il piatto del giorno",
        "cosa consiglia?",
        "per me...",
        "da condividere",
        "cosa contiene?",
        "è piccante?",
        "non piccante",
        "con ghiaccio",
        "senza ghiaccio",
        "acqua naturale",
        "acqua frizzante",
        "vorrei ordinare",
        "prendo...",
        "come primo",
        "come secondo",
        "come dolce",
        "il conto, per favore",
        "mi porta il conto?",
        "accettate la carta?",
        "pago in contanti",
        "pago con carta",
        "il servizio è incluso?",
        "la mancia",
        "sono allergico a...",
        "senza glutine",
        "senza lattosio",
        "sono vegetariano",
        "sono vegetariana",
        "sono vegano",
        "sono vegana",
        "può ripetere?",
        "mi può consigliare qualcosa?",
        "mi porta un altro tovagliolo?",
        "un altro giro",
        "da asporto",
        "da consumare qui",
        "è delizioso",
        "è freddo",
        "è caldo",
        "vorrei una prenotazione",
        "abbiamo una prenotazione",
        "conto separato",
        "una bottiglia d'acqua",
        "un caffè nero",
    ],
    "common-adjectives-50": [
        "buono",
        "cattivo",
        "grande",
        "piccolo",
        "alto",
        "largo",
        "lungo",
        "corto",
        "nuovo",
        "vecchio",
        "giovane",
        "bello",
        "brutto",
        "facile",
        "difficile",
        "veloce",
        "lento",
        "caldo",
        "freddo",
        "forte",
        "debole",
        "costoso",
        "economico",
        "pulito",
        "sporco",
        "pieno",
        "vuoto",
        "felice",
        "triste",
        "stanco",
        "occupato",
        "libero",
        "sicuro",
        "pericoloso",
        "importante",
        "possibile",
        "impossibile",
        "necessario",
        "utile",
        "inutile",
        "gentile",
        "simpatico",
        "antipatico",
        "serio",
        "divertente",
        "noioso",
        "intelligente",
        "sciocco",
        "corretto",
        "scorretto",
    ],
    "common-adverbs-50": [
        "bene",
        "male",
        "molto",
        "quasi",
        "già",
        "ancora",
        "tuttora",
        "sempre",
        "mai",
        "mai e poi mai",
        "oggi",
        "ieri",
        "domani",
        "adesso",
        "prima",
        "dopo",
        "presto",
        "tardi",
        "di buon'ora",
        "spesso",
        "a volte",
        "di tanto in tanto",
        "generalmente",
        "normalmente",
        "frequentemente",
        "regolarmente",
        "immediatamente",
        "subito",
        "lentamente",
        "rapidamente",
        "facilmente",
        "con difficoltà",
        "chiaramente",
        "esattamente",
        "approssimativamente",
        "davvero",
        "semplicemente",
        "soprattutto",
        "direttamente",
        "correttamente",
        "probabilmente",
        "sicuramente",
        "fortunatamente",
        "sfortunatamente",
        "attentamente",
        "silenziosamente",
        "apertamente",
        "letteralmente",
        "totalmente",
        "parzialmente",
    ],
    "colours": [
        "giallo",
        "blu",
        "bianco",
        "grigio",
        "marrone",
        "castano",
        "viola",
        "porpora",
        "arancione",
        "aranciato",
        "nero",
        "rosso",
        "rosa",
        "rosato",
        "verde",
        "violetto",
        "azzurro",
        "turchese",
        "beige",
        "dorato",
        "argentato",
        "bordeaux",
        "lilla",
        "lavanda",
    ],
}


def build_numbers_group(source_group: dict) -> dict:
    items = []
    for source_item in source_group.get("items", []):
        hint = str(source_item.get("hint", "")).strip()
        match = re.match(r"^(\d+)\b", hint)
        if not match:
            raise ValueError(f"Could not parse number from hint: {hint!r}")
        n = int(match.group(1))
        forms = italian_number(n)
        items.append(make_item(hint, forms[0], *forms[1:]))
    return decorate_group(source_group, items)


def build_translated_group(source_group: dict, answer_specs: list) -> dict:
    source_items = source_group.get("items", [])
    if len(answer_specs) != len(source_items):
        raise ValueError(
            f"Group {source_group['id']} length mismatch: "
            f"expected {len(source_items)} answers, got {len(answer_specs)}",
        )

    items = []
    for source_item, answer_spec in zip(source_items, answer_specs, strict=True):
        hint = source_item.get("hint", "")
        answer, alternates = to_answer_parts(answer_spec)
        items.append(make_item(hint, answer, *alternates))

    return decorate_group(source_group, items)


def report_duplicates(groups: list[dict]) -> list[str]:
    duplicates = []
    for group in groups:
        seen = {}
        for item in group.get("items", []):
            for answer in item.get("answers", []):
                key = normalize_for_uniqueness(answer)
                if not key:
                    continue
                if key in seen:
                    duplicates.append(
                        f"{group['id']}: '{answer}' duplicates '{seen[key]}'"
                    )
                else:
                    seen[key] = answer
    return duplicates


def main() -> None:
    with SOURCE_PATH.open("r", encoding="utf-8") as handle:
        source_payload = json.load(handle)

    source_groups = source_payload.get("groups", [])
    if not source_groups:
        raise ValueError("Source beginner-phrases.json has no groups.")

    groups = []
    for source_group in source_groups:
        group_id = source_group.get("id")
        if group_id == "numbers-0-100":
            groups.append(build_numbers_group(source_group))
            continue

        if group_id not in ITALIAN_GROUP_ANSWERS:
            raise ValueError(f"Missing Italian answer set for group: {group_id}")

        groups.append(build_translated_group(source_group, ITALIAN_GROUP_ANSWERS[group_id]))

    duplicates = report_duplicates(groups)

    payload = {
        "source": "Rapid Italian curated beginner phrases (aligned with Spanish beginner quiz map)",
        "generatedAt": datetime.now(UTC).isoformat(),
        "groupCount": len(groups),
        "totalItems": sum(group["count"] for group in groups),
        "groups": groups,
    }

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with OUTPUT_PATH.open("w", encoding="utf-8") as handle:
        json.dump(payload, handle, ensure_ascii=False, indent=2)
        handle.write("\n")

    print(f"Wrote {payload['totalItems']} items across {payload['groupCount']} groups.")
    print(f"Output: {OUTPUT_PATH}")
    if duplicates:
        print(f"Duplicate normalized answers detected: {len(duplicates)}")
        for row in duplicates[:20]:
            print(f"  - {row}")
        if len(duplicates) > 20:
            print(f"  - ... {len(duplicates) - 20} more")


if __name__ == "__main__":
    main()
