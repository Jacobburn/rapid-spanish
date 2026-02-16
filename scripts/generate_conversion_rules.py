#!/usr/bin/env python3

import json
import re
import unicodedata
from datetime import UTC, datetime
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PATH = ROOT / "data" / "english-spanish-conversion.json"


def normalize(value: str) -> str:
    lowered = value.lower().strip()
    decomp = unicodedata.normalize("NFD", lowered)
    without_marks = "".join(ch for ch in decomp if unicodedata.category(ch) != "Mn")
    cleaned = "".join(ch if (ch.isalnum() or ch.isspace()) else " " for ch in without_marks)
    return re.sub(r"\s+", " ", cleaned).strip()


def expected_translation(rule_id: str, english_word: str) -> str | None:
    w = english_word.lower()
    if rule_id == "rule-tion":
        if not w.endswith("tion"):
            return None
        return f"{w[:-4]}ción"
    if rule_id == "rule-ate":
        if not w.endswith("ate"):
            return None
        return f"{w[:-3]}ar"
    if rule_id == "rule-ize":
        if not w.endswith("ize"):
            return None
        return f"{w[:-3]}izar"
    if rule_id == "rule-al":
        if not w.endswith("al"):
            return None
        return w
    if rule_id == "rule-ic":
        if not w.endswith("ic"):
            return None
        return f"{w[:-2]}ico"
    if rule_id == "rule-ity":
        if not w.endswith("ity"):
            return None
        return f"{w[:-3]}idad"
    if rule_id == "rule-ism":
        if w.endswith("ism"):
            return f"{w[:-3]}ismo"
        if w.endswith("ysm"):
            return f"{w[:-3]}ismo"
        return None
    if rule_id == "rule-sion":
        if not w.endswith("sion"):
            return None
        return f"{w[:-4]}sión"
    if rule_id == "rule-ous":
        if not w.endswith("ous"):
            return None
        return f"{w[:-3]}oso"
    if rule_id == "rule-ent":
        if not w.endswith("ent"):
            return None
        return f"{w[:-3]}ente"
    if rule_id == "rule-ally":
        if not w.endswith("ly"):
            return None
        return f"{w[:-2]}mente"
    if rule_id == "rule-ary-ory":
        if w.endswith("ary"):
            return f"{w[:-3]}ario"
        if w.endswith("ory"):
            return f"{w[:-3]}orio"
        return None
    if rule_id == "rule-ble":
        if not w.endswith("ble"):
            return None
        return w
    if rule_id == "rule-ive":
        if not w.endswith("ive"):
            return None
        return f"{w[:-3]}ivo"
    return None


def make_group(
    rule_id: str,
    title: str,
    description: str,
    source_url: str,
    rows: list[tuple[str, str]],
) -> dict:
    items = []
    for index, (english, spanish) in enumerate(rows, start=1):
        expected = expected_translation(rule_id, english)
        imperfect = expected is None or normalize(expected) != normalize(spanish)
        items.append(
            {
                "hint": english.lower(),
                "answer": spanish.lower(),
                "answers": [spanish.lower()],
                "imperfect": imperfect,
                "index": index,
            },
        )

    return {
        "id": rule_id,
        "title": title,
        "description": description,
        "source": source_url,
        "count": len(items),
        "items": items,
    }


def main() -> None:
    groups = [
        make_group(
            "rule-tion",
            'The "TION" Rule',
            "Rule: English words ending in ...tion generally become Spanish ...ción.",
            "https://knowspanish.com/the-TION-rule.html",
            [
                ("administration", "administración"),
                ("adulation", "adulación"),
                ("application", "aplicación"),
                ("benediction", "benedicción"),
                ("bifurcation", "bifurcación"),
                ("classification", "clasificación"),
                ("conservation", "conservación"),
                ("corruption", "corrupción"),
                ("distribution", "distribución"),
                ("embarcation", "embarcación"),
                ("education", "educación"),
                ("evacuation", "evacuación"),
                ("fabrication", "fabricación"),
                ("frustration", "frustración"),
                ("gravitation", "gravitación"),
                ("hibernation", "hibernación"),
                ("hospitalization", "hospitalización"),
                ("installation", "instalación"),
                ("instruction", "instrucción"),
                ("justification", "justificación"),
                ("manipulation", "manipulación"),
                ("nation", "nación"),
                ("nutrition", "nutrición"),
                ("occupation", "ocupación"),
                ("personification", "personificación"),
                ("speculation", "especulación"),
                ("station", "estación"),
                ("transition", "transición"),
                ("translation", "traducción"),
                ("congratulation", "felicitación"),
            ],
        ),
        make_group(
            "rule-ate",
            'The "ATE" Rule',
            "Rule: English words ending in ...ate generally become Spanish infinitives ending ...ar.",
            "https://knowspanish.com/the-ATE-rule.html",
            [
                ("articulate", "articular"),
                ("ambulate", "ambular"),
                ("beneficiate", "beneficiar"),
                ("capitulate", "capitular"),
                ("congregate", "congregar"),
                ("conjugate", "conjugar"),
                ("contemplate", "contemplar"),
                ("delegate", "delegar"),
                ("donate", "donar"),
                ("elevate", "elevar"),
                ("fabricate", "fabricar"),
                ("fluctuate", "fluctuar"),
                ("formulate", "formular"),
                ("germinate", "germinar"),
                ("graduate", "graduar"),
                ("hallucinate", "alucinar"),
                ("illuminate", "iluminar"),
                ("imitate", "imitar"),
                ("initiate", "iniciar"),
                ("innovate", "inovar"),
                ("manipulate", "manipular"),
                ("participate", "participar"),
                ("precipitate", "precipitar"),
                ("quadruplicate", "cuadruplicar"),
                ("radiate", "radiar"),
                ("segregate", "segregar"),
                ("simulate", "simular"),
                ("tolerate", "tolerar"),
                ("validate", "validar"),
                ("congratulate", "felicitar"),
            ],
        ),
        make_group(
            "rule-ize",
            'The "IZE" Rule',
            "Rule: English words ending in ...ize generally become Spanish ...izar.",
            "https://knowspanish.com/the-IZE-rule.html",
            [
                ("amortize", "amortizar"),
                ("analyze", "analizar"),
                ("botanize", "botanizar"),
                ("brutalize", "brutalizar"),
                ("capitalize", "capitalizar"),
                ("catalyze", "catalizar"),
                ("deodorize", "deodorizar"),
                ("editorialize", "editorializar"),
                ("equalize", "equalizar"),
                ("familiarize", "familiarizar"),
                ("federalize", "federalizar"),
                ("galvanize", "galvanizar"),
                ("glamorize", "glamorizar"),
                ("habitualize", "habitualizar"),
                ("harmonize", "armonizar"),
                ("individualize", "individualizar"),
                ("industrialize", "industrializar"),
                ("initialize", "inicializar"),
                ("legalize", "legalizar"),
                ("liberalize", "liberalizar"),
                ("materialize", "materializar"),
                ("modernize", "modernizar"),
                ("neutralize", "neutralizar"),
                ("patronize", "patronizar"),
                ("penalize", "penalizar"),
                ("specialize", "especializar"),
                ("trivialize", "trivializar"),
                ("vulcanize", "vulcanizar"),
                ("realize", "realizar"),
                ("mobilize", "mobilizar"),
            ],
        ),
        make_group(
            "rule-al",
            'The "AL" Rule',
            "Rule: English words ending in ...al often keep ...al in Spanish (with some spelling quirks).",
            "https://knowspanish.com/the-AL-rule.html",
            [
                ("abdominal", "abdominal"),
                ("aboriginal", "aboriginal"),
                ("alluvial", "aluvial"),
                ("antisocial", "antisocial"),
                ("arterial", "arterial"),
                ("bestial", "bestial"),
                ("bilateral", "bilateral"),
                ("capital", "capital"),
                ("celestial", "celestial"),
                ("commercial", "comercial"),
                ("communal", "comunal"),
                ("cordial", "cordial"),
                ("credential", "credencial"),
                ("crystal", "cristal"),
                ("cultural", "cultural"),
                ("decimal", "decimal"),
                ("digital", "digital"),
                ("elemental", "elemental"),
                ("facial", "facial"),
                ("federal", "federal"),
                ("funeral", "funeral"),
                ("illegal", "ilegal"),
                ("immoral", "inmoral"),
                ("initial", "inicial"),
                ("international", "internacional"),
                ("lateral", "lateral"),
                ("martial", "marcial"),
                ("official", "oficial"),
                ("spatial", "espacial"),
                ("special", "especial"),
                ("structural", "estructural"),
                ("thermal", "termal"),
                ("tropical", "tropical"),
                ("universal", "universal"),
                ("visual", "visual"),
                ("continual", "continuo"),
            ],
        ),
        make_group(
            "rule-ic",
            'The "IC" Rule',
            "Rule: English words ending in ...ic usually become Spanish ...ico.",
            "https://knowspanish.com/the-IC-rule.html",
            [
                ("academic", "académico"),
                ("acidic", "acídico"),
                ("allergic", "alérgico"),
                ("aquatic", "acuático"),
                ("arctic", "ártico"),
                ("caloric", "calórico"),
                ("caustic", "caústico"),
                ("critic", "crítico"),
                ("eccentric", "excéntrico"),
                ("fanatic", "fanático"),
                ("fantastic", "fantástico"),
                ("galactic", "galáctico"),
                ("gastric", "gástrico"),
                ("geographic", "geográfico"),
                ("harmonic", "armónico"),
                ("intrinsic", "intrínseco"),
                ("kinetic", "kinético"),
                ("linguistic", "lingüístico"),
                ("magnetic", "magnético"),
                ("microscopic", "microscópico"),
                ("nordic", "nórdico"),
                ("organic", "orgánico"),
                ("panic", "pánico"),
                ("plastic", "plástico"),
                ("quadratic", "cuadrático"),
                ("semantic", "semántico"),
                ("septic", "séptico"),
                ("telegraphic", "telegráfico"),
                ("toxic", "tóxico"),
                ("volcanic", "volcánico"),
            ],
        ),
        make_group(
            "rule-ity",
            'The "ITY" Rule',
            "Rule: English words ending in ...ity often become Spanish ...idad.",
            "https://knowspanish.com/the-ITY-rule.html",
            [
                ("ability", "habilidad"),
                ("agility", "agilidad"),
                ("amiability", "amabilidad"),
                ("capacity", "capacidad"),
                ("compatibility", "compatibilidad"),
                ("continuity", "continuidad"),
                ("density", "densidad"),
                ("ductility", "ductilidad"),
                ("elasticity", "elasticidad"),
                ("electricity", "electricidad"),
                ("finality", "finalidad"),
                ("familiarity", "familiaridad"),
                ("generosity", "generosidad"),
                ("humanity", "humanidad"),
                ("identity", "identidad"),
                ("immobility", "inmovilidad"),
                ("inactivity", "inactividad"),
                ("instability", "instabilidad"),
                ("justifiability", "justificabilidad"),
                ("liability", "liabilidad"),
                ("luminosity", "luminosidad"),
                ("mediocrity", "mediocridad"),
                ("neutrality", "neutralidad"),
                ("normality", "normalidad"),
                ("parity", "paridad"),
                ("punctuality", "puntualidad"),
                ("tranquility", "tranquilidad"),
                ("ubiquity", "ubicuidad"),
                ("vanity", "vanidad"),
                ("veracity", "veracidad"),
            ],
        ),
        make_group(
            "rule-ism",
            'The "ISM / YSM" Rule',
            "Rule: English words ending in ...ism or ...ysm usually become Spanish ...ismo.",
            "https://knowspanish.com/the-ISM-rule.html",
            [
                ("abysm", "abismo"),
                ("anachronism", "anacronismo"),
                ("aneurysm", "aneurisma"),
                ("baptism", "bautismo"),
                ("cannibalism", "canibalismo"),
                ("darwinism", "darwinismo"),
                ("dynamism", "dinamismo"),
                ("embolism", "embolismo"),
                ("fanaticism", "fanaticismo"),
                ("geotropism", "geotropismo"),
                ("imagism", "imaginismo"),
                ("imperialism", "imperialismo"),
                ("impressionism", "impresionismo"),
                ("individualism", "individualismo"),
                ("materialism", "materialismo"),
                ("mysticism", "misticismo"),
                ("occultism", "ocultismo"),
                ("organism", "organismo"),
                ("opportunism", "oportunismo"),
                ("phototropism", "fototropismo"),
                ("quietism", "quietismo"),
                ("rationalism", "racionalismo"),
                ("realism", "realismo"),
                ("socialism", "socialismo"),
                ("universalism", "universalismo"),
                ("volcanism", "vulcanismo"),
                ("tourism", "turismo"),
            ],
        ),
        make_group(
            "rule-sion",
            'The "SION" Rule',
            "Rule: English words ending in ...sion generally become Spanish ...sión.",
            "https://knowspanish.com/the-SION-rule.html",
            [
                ("aspersion", "aspersión"),
                ("compassion", "compasión"),
                ("comprehension", "comprensión"),
                ("compulsion", "compulsión"),
                ("conclusion", "conclusión"),
                ("confusion", "confusión"),
                ("decision", "decisión"),
                ("defusion", "defusión"),
                ("fission", "fisión"),
                ("fusion", "fusión"),
                ("illusion", "ilusión"),
                ("lesion", "lesión"),
                ("mission", "misión"),
                ("passion", "pasión"),
                ("pension", "pensión"),
                ("seclusion", "seclusión"),
                ("session", "sesión"),
                ("tension", "tensión"),
            ],
        ),
        make_group(
            "rule-ous",
            'The "OUS" Rule',
            "Rule: English words ending in ...ous often become Spanish ...oso.",
            "https://knowspanish.com/the-OUS-rule.html",
            [
                ("albuminous", "albuminoso"),
                ("amorous", "amoroso"),
                ("auspicious", "auspicioso"),
                ("billious", "bilioso"),
                ("bulbous", "bulboso"),
                ("cadaverous", "cadaveroso"),
                ("capacious", "capacioso"),
                ("curious", "curioso"),
                ("delicious", "delicioso"),
                ("fallacious", "falacioso"),
                ("fastidious", "fastidioso"),
                ("fibrous", "fibroso"),
                ("generous", "generoso"),
                ("glamorous", "glamoroso"),
                ("gracious", "gracioso"),
                ("harmonious", "armonioso"),
                ("laborious", "laborioso"),
                ("luminous", "luminoso"),
                ("monstrous", "monstruoso"),
                ("pompous", "pomposo"),
                ("precious", "precioso"),
                ("religious", "religioso"),
                ("scandalous", "escandaloso"),
                ("spacious", "espacioso"),
                ("sulphurous", "sulfuroso"),
                ("vicious", "vicioso"),
                ("virtuous", "virtuoso"),
                ("ambitious", "ambicioso"),
                ("ferocious", "feroz"),
                ("tenacious", "tenaz"),
            ],
        ),
        make_group(
            "rule-ent",
            'The "ENT" Rule',
            "Rule: English words ending in ...ent (except ...ment) often become Spanish ...ente.",
            "https://knowspanish.com/the-ENT-rule.html",
            [
                ("affluent", "afluente"),
                ("apparent", "aparente"),
                ("astringent", "astringente"),
                ("client", "cliente"),
                ("coefficient", "coeficiente"),
                ("coincident", "coincidente"),
                ("consistent", "consistente"),
                ("continent", "continente"),
                ("detergent", "detergente"),
                ("different", "diferente"),
                ("efficient", "eficiente"),
                ("eminent", "eminente"),
                ("equivalent", "equivalente"),
                ("excellent", "excelente"),
                ("fluorescent", "fluorescente"),
                ("gradient", "gradiente"),
                ("inconvenient", "inconveniente"),
                ("indifferent", "indiferente"),
                ("innocent", "inocente"),
                ("intelligent", "inteligente"),
                ("latent", "latente"),
                ("malevolent", "malevolente"),
                ("nutrient", "nutriente"),
                ("obedient", "obediente"),
                ("patent", "patente"),
                ("permanent", "permanente"),
                ("president", "presidente"),
                ("prudent", "prudente"),
                ("sufficient", "suficiente"),
                ("transparent", "transparente"),
                ("urgent", "urgente"),
                ("vice-president", "vicepresidente"),
                ("rent", "renta"),
            ],
        ),
        make_group(
            "rule-ally",
            'The "ALLY" Rule',
            "Rule: English words ending in ...ally generally become Spanish ...mente (and ...cally -> ...camente).",
            "https://knowspanish.com/the-ALLY-rule.html",
            [
                ("artificially", "artificialmente"),
                ("anatomically", "anatómicamente"),
                ("beneficially", "beneficialmente"),
                ("bilaterally", "bilateralmente"),
                ("casually", "casualmente"),
                ("categorically", "categóricamente"),
                ("classically", "clasicalmente"),
                ("democratically", "democráticamente"),
                ("economically", "económicamente"),
                ("emotionally", "emocionalmente"),
                ("especially", "especialmente"),
                ("fanatically", "fanáticamente"),
                ("genetically", "genéticamente"),
                ("generically", "genéricamente"),
                ("initially", "inicialmente"),
                ("ironically", "irónicamente"),
                ("laterally", "lateralmente"),
                ("logically", "lógicamente"),
                ("mechanically", "mecánicamente"),
                ("methodically", "metódicamente"),
                ("numerically", "numéricamente"),
                ("officially", "oficialmente"),
                ("partially", "parcialmente"),
                ("peacefully", "pacíficamente"),
                ("rationally", "racionalmente"),
                ("socially", "socialmente"),
                ("specifically", "específicamente"),
                ("totally", "totalmente"),
                ("virtually", "virtualmente"),
                ("automatically", "automáticamente"),
            ],
        ),
        make_group(
            "rule-ary-ory",
            'The "ARY / ORY" Rule',
            "Rule: English ...ary -> Spanish ...ario and English ...ory -> Spanish ...orio.",
            "https://knowspanish.com/the-ARY-ORY-rule.html",
            [
                ("accusatory", "acusatorio"),
                ("adversary", "adversario"),
                ("ambulatory", "ambulatorio"),
                ("anniversary", "aniversario"),
                ("canary", "canario"),
                ("category", "categoría"),
                ("conciliatory", "conciliatorio"),
                ("conservatory", "conservatorio"),
                ("contrary", "contrario"),
                ("crematory", "crematorio"),
                ("culinary", "culinario"),
                ("defamatory", "difamatorio"),
                ("directory", "directorio"),
                ("dormitory", "dormitorio"),
                ("elementary", "elementario"),
                ("factory", "factoría"),
                ("glory", "gloria"),
                ("history", "historia"),
                ("illusory", "ilusorio"),
                ("inflammatory", "inflamatorio"),
                ("laboratory", "laboratorio"),
                ("mandatory", "mandatorio"),
                ("observatory", "observatorio"),
                ("offertory", "ofertorio"),
                ("ordinary", "ordinario"),
                ("parliamentary", "parlamentario"),
                ("proprietary", "propietario"),
                ("pulmonary", "pulmonario"),
                ("accessory", "accesorio"),
                ("penitenciary", "penitenciaría"),
            ],
        ),
        make_group(
            "rule-ble",
            'The "BLE" Rule',
            "Rule: English words ending in ...ble are often the same in Spanish (with common spelling quirks).",
            "https://knowspanish.com/the-BLE-rule.html",
            [
                ("admissible", "admisible"),
                ("alienable", "alienable"),
                ("applicable", "aplicable"),
                ("cable", "cable"),
                ("calculable", "calculable"),
                ("comparable", "comparable"),
                ("compatible", "compatible"),
                ("comprehensible", "comprensible"),
                ("corrigible", "corregible"),
                ("curable", "curable"),
                ("destructible", "destructible"),
                ("divisible", "divisible"),
                ("durable", "durable"),
                ("explicable", "explicable"),
                ("fallible", "falible"),
                ("flammable", "flamable"),
                ("flexible", "flexible"),
                ("imitable", "imitable"),
                ("impossible", "imposible"),
                ("inflamable", "inflamable"),
                ("indomitable", "indomable"),
                ("irresistible", "irresistible"),
                ("malleable", "maleable"),
                ("memorable", "memorable"),
                ("moldable", "moldeable"),
                ("objectionable", "objetable"),
                ("permissible", "permisible"),
                ("possible", "posible"),
                ("supportable", "soportable"),
                ("traversable", "transitable"),
            ],
        ),
        make_group(
            "rule-ive",
            'The "IVE" Rule',
            "Rule: English words ending in ...ive usually become Spanish ...ivo.",
            "https://knowspanish.com/the-IVE-rule.html",
            [
                ("abortive", "abortivo"),
                ("abrasive", "abrasivo"),
                ("abusive", "abusivo"),
                ("active", "activo"),
                ("adaptive", "adaptivo"),
                ("additive", "aditivo"),
                ("adhesive", "adhesivo"),
                ("adjective", "adjetivo"),
                ("affirmative", "afirmativo"),
                ("aggressive", "agresivo"),
                ("attractive", "atractivo"),
                ("administrative", "administrativo"),
                ("communicative", "comunicativo"),
                ("competitive", "competitivo"),
                ("compulsive", "compulsivo"),
                ("descriptive", "descriptivo"),
                ("evasive", "evasivo"),
                ("fixative", "fijativo"),
                ("genitive", "genitivo"),
                ("imaginative", "imaginativo"),
                ("imitative", "imitativo"),
                ("inclusive", "inclusivo"),
                ("indicative", "indicativo"),
                ("inductive", "inductivo"),
                ("ineffective", "inefectivo"),
                ("infinitive", "infinitivo"),
                ("informative", "informativo"),
                ("intuitive", "intuitivo"),
                ("inventive", "inventivo"),
                ("investigative", "investigativo"),
                ("legislative", "legislativo"),
                ("nominative", "nominativo"),
                ("operative", "operativo"),
                ("positive", "positivo"),
                ("presumptive", "presuntivo"),
                ("preventive", "preventivo"),
                ("productive", "productivo"),
                ("progressive", "progresivo"),
                ("protective", "protectivo"),
                ("punitive", "punitivo"),
                ("repetitive", "repetitivo"),
                ("representative", "representativo"),
                ("reproductive", "reproductivo"),
                ("restrictive", "restrictivo"),
                ("retroactive", "retroactivo"),
                ("sedative", "sedativo"),
                ("sensitive", "sensitivo"),
                ("speculative", "especulativo"),
                ("stimulative", "estimulativo"),
                ("suggestive", "sugestivo"),
            ],
        ),
    ]

    payload = {
        "source": "https://knowspanish.com/index.html",
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


if __name__ == "__main__":
    main()
