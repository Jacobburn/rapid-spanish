#!/usr/bin/env python3

import json
import re
import unicodedata
from datetime import datetime, UTC
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PATH = ROOT / "data" / "beginner-phrases.json"


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


def english_number(n: int) -> str:
    ones = {
        0: "zero",
        1: "one",
        2: "two",
        3: "three",
        4: "four",
        5: "five",
        6: "six",
        7: "seven",
        8: "eight",
        9: "nine",
        10: "ten",
        11: "eleven",
        12: "twelve",
        13: "thirteen",
        14: "fourteen",
        15: "fifteen",
        16: "sixteen",
        17: "seventeen",
        18: "eighteen",
        19: "nineteen",
    }
    tens = {
        20: "twenty",
        30: "thirty",
        40: "forty",
        50: "fifty",
        60: "sixty",
        70: "seventy",
        80: "eighty",
        90: "ninety",
        100: "one hundred",
    }
    if n in ones:
        return ones[n]
    if n in tens:
        return tens[n]
    base = (n // 10) * 10
    remainder = n % 10
    return f"{tens[base]}-{ones[remainder]}"


def spanish_number(n: int) -> list[str]:
    base = {
        0: "cero",
        1: "uno",
        2: "dos",
        3: "tres",
        4: "cuatro",
        5: "cinco",
        6: "seis",
        7: "siete",
        8: "ocho",
        9: "nueve",
        10: "diez",
        11: "once",
        12: "doce",
        13: "trece",
        14: "catorce",
        15: "quince",
        16: "dieciséis",
        17: "diecisiete",
        18: "dieciocho",
        19: "diecinueve",
        20: "veinte",
        21: "veintiuno",
        22: "veintidós",
        23: "veintitrés",
        24: "veinticuatro",
        25: "veinticinco",
        26: "veintiséis",
        27: "veintisiete",
        28: "veintiocho",
        29: "veintinueve",
        30: "treinta",
        40: "cuarenta",
        50: "cincuenta",
        60: "sesenta",
        70: "setenta",
        80: "ochenta",
        90: "noventa",
        100: "cien",
    }
    if n in base:
        if n == 100:
            return ["cien", "ciento"]
        return [base[n]]
    tens = (n // 10) * 10
    ones = n % 10
    return [f"{base[tens]} y {base[ones]}"]


def numbered_items() -> list[dict]:
    rows = []
    for n in range(0, 101):
        spanish_forms = spanish_number(n)
        rows.append(
            make_item(
                f"{n} ({english_number(n)})",
                spanish_forms[0],
                *spanish_forms[1:],
            ),
        )
    return rows


def decorate_group(group_id: str, title: str, items: list[dict], description: str) -> dict:
    return {
        "id": group_id,
        "title": title,
        "description": description,
        "count": len(items),
        "items": [
            {
                **item,
                "index": idx,
            }
            for idx, item in enumerate(items, start=1)
        ],
    }


def main() -> None:
    core_functional_words = [
        make_item("yes", "sí"),
        make_item("no", "no"),
        make_item("okay / all right", "vale"),
        make_item("agreed", "de acuerdo"),
        make_item("it is fine", "está bien"),
        make_item("of course", "claro"),
        make_item("maybe", "quizá"),
        make_item("perhaps", "quizás"),
        make_item("maybe / perhaps", "tal vez"),
        make_item("I understand", "entiendo"),
        make_item("I don't understand", "no entiendo"),
        make_item("I don't know", "no sé"),
        make_item("please repeat", "repita, por favor"),
        make_item("more slowly, please", "despacio, por favor"),
        make_item("what?", "¿qué?"),
        make_item("who?", "¿quién?"),
        make_item("who? (plural)", "¿quiénes?"),
        make_item("which?", "¿cuál?"),
        make_item("which ones?", "¿cuáles?"),
        make_item("where?", "¿dónde?"),
        make_item("to where?", "¿adónde?"),
        make_item("when?", "¿cuándo?"),
        make_item("how?", "¿cómo?"),
        make_item("how much?", "¿cuánto?"),
        make_item("how much? (feminine)", "¿cuánta?"),
        make_item("how many? (masculine)", "¿cuántos?"),
        make_item("how many? (feminine)", "¿cuántas?"),
        make_item("why?", "¿por qué?"),
        make_item("what for?", "¿para qué?"),
        make_item("from where?", "¿de dónde?"),
        make_item("at what time?", "¿a qué hora?"),
    ]

    greetings_and_social = [
        make_item("hello", "hola"),
        make_item("good morning", "buenos días"),
        make_item("good afternoon", "buenas tardes"),
        make_item("good evening / good night", "buenas noches"),
        make_item("how are you? (formal)", "¿cómo está?"),
        make_item("how are you? (informal)", "¿cómo estás?"),
        make_item("how are you? (plural)", "¿cómo están?"),
        make_item("how's it going?", "¿qué tal?"),
        make_item("nice to meet you", "mucho gusto"),
        make_item("pleased to meet you (masculine speaker)", "encantado"),
        make_item("pleased to meet you (feminine speaker)", "encantada"),
        make_item("likewise", "igualmente"),
        make_item("welcome (to a man)", "bienvenido"),
        make_item("welcome (to a woman)", "bienvenida"),
        make_item("goodbye", "adiós"),
        make_item("see you later", "hasta luego"),
        make_item("see you tomorrow", "hasta mañana"),
        make_item("see you soon", "hasta pronto"),
        make_item("see you", "nos vemos"),
        make_item("have a good day (formal)", "que tenga buen día"),
        make_item("have a good day (informal)", "que te vaya bien"),
        make_item("thanks", "gracias"),
        make_item("thank you very much", "muchas gracias"),
        make_item("you're welcome", "de nada"),
        make_item("don't mention it", "no hay de qué"),
        make_item("please", "por favor"),
        make_item("excuse me (passing by)", "permiso"),
        make_item("excuse me (with permission)", "con permiso"),
        make_item("sorry / pardon", "perdón"),
        make_item("I'm sorry", "lo siento"),
        make_item("excuse me (formal apology)", "disculpe"),
        make_item("excuse me (informal apology)", "disculpa"),
        make_item("bless you / cheers", "salud"),
        make_item("congratulations", "felicidades"),
        make_item("have a good trip", "buen viaje"),
        make_item("rest well", "que descanses"),
    ]

    articles = [
        make_item("the (masculine singular)", "el"),
        make_item("the (feminine singular)", "la"),
        make_item("the (masculine plural)", "los"),
        make_item("the (feminine plural)", "las"),
        make_item("the (neuter)", "lo"),
        make_item("a / an (masculine singular)", "un"),
        make_item("a / an (feminine singular)", "una"),
        make_item("some (masculine plural)", "unos"),
        make_item("some (feminine plural)", "unas"),
    ]

    pronouns = [
        make_item("I", "yo"),
        make_item("you (informal singular)", "tú"),
        make_item("you (voseo singular)", "vos"),
        make_item("you (formal singular)", "usted"),
        make_item("he", "él"),
        make_item("she", "ella"),
        make_item("it (neuter pronoun)", "ello"),
        make_item("we (masculine/mixed)", "nosotros"),
        make_item("we (feminine)", "nosotras"),
        make_item("you all (informal Spain, masculine/mixed)", "vosotros"),
        make_item("you all (informal Spain, feminine)", "vosotras"),
        make_item("you all (formal/plural)", "ustedes"),
        make_item("they (masculine/mixed)", "ellos"),
        make_item("they (feminine)", "ellas"),
        make_item("me", "me"),
        make_item("you (object, informal)", "te"),
        make_item("him/it (direct object, masculine singular)", "lo"),
        make_item("her/it (direct object, feminine singular)", "la"),
        make_item("them (direct object, masculine plural)", "los"),
        make_item("them (direct object, feminine plural)", "las"),
        make_item("him/her/to him/to her (indirect object)", "le"),
        make_item("to them / to you all (indirect object)", "les"),
        make_item("himself/herself/itself (clitic)", "se"),
        make_item("us (object)", "nos"),
        make_item("you all (object, informal Spain)", "os"),
        make_item("me (after preposition)", "mí"),
        make_item("you (after preposition)", "ti"),
        make_item("self (after preposition)", "sí"),
        make_item("with me", "conmigo"),
        make_item("with you", "contigo"),
        make_item("with himself/herself/itself", "consigo"),
        make_item("who / whoever (singular relative pronoun)", "quien"),
        make_item("who / whoever (plural relative pronoun)", "quienes"),
        make_item("the one who / that (masculine singular)", "el que"),
        make_item("the one who / that (feminine singular)", "la que"),
        make_item("the ones who / that (masculine plural)", "los que"),
        make_item("the ones who / that (feminine plural)", "las que"),
        make_item("what / that which", "lo que"),
        make_item("which / who (formal relative, masculine singular)", "el cual"),
        make_item("which / who (formal relative, feminine singular)", "la cual"),
        make_item("which / who (formal relative, masculine plural)", "los cuales"),
        make_item("which / who (formal relative, feminine plural)", "las cuales"),
        make_item("which / what (formal relative, neuter)", "lo cual"),
        make_item("whose (masculine singular)", "cuyo"),
        make_item("whose (feminine singular)", "cuya"),
        make_item("whose (masculine plural)", "cuyos"),
        make_item("whose (feminine plural)", "cuyas"),
        make_item("as much as / all that (masculine singular)", "cuanto"),
        make_item("as much as / all that (feminine singular)", "cuanta"),
        make_item("as many as / all those (masculine plural)", "cuantos"),
        make_item("as many as / all those (feminine plural)", "cuantas"),
    ]

    possessives = [
        make_item("my", "mi"),
        make_item("my (plural possessed)", "mis"),
        make_item("your (informal singular)", "tu"),
        make_item("your (informal singular, plural possessed)", "tus"),
        make_item("his/her/your/their", "su"),
        make_item("his/her/your/their (plural possessed)", "sus"),
        make_item("our (masculine singular)", "nuestro"),
        make_item("our (feminine singular)", "nuestra"),
        make_item("our (masculine plural)", "nuestros"),
        make_item("our (feminine plural)", "nuestras"),
        make_item("your all (Spain, masculine singular)", "vuestro"),
        make_item("your all (Spain, feminine singular)", "vuestra"),
        make_item("your all (Spain, masculine plural)", "vuestros"),
        make_item("your all (Spain, feminine plural)", "vuestras"),
        make_item("mine (masculine singular)", "mío"),
        make_item("mine (feminine singular)", "mía"),
        make_item("mine (masculine plural)", "míos"),
        make_item("mine (feminine plural)", "mías"),
        make_item("yours (informal, masculine singular)", "tuyo"),
        make_item("yours (informal, feminine singular)", "tuya"),
        make_item("yours (informal, masculine plural)", "tuyos"),
        make_item("yours (informal, feminine plural)", "tuyas"),
        make_item("his/hers/yours/theirs (masculine singular)", "suyo"),
        make_item("his/hers/yours/theirs (feminine singular)", "suya"),
        make_item("his/hers/yours/theirs (masculine plural)", "suyos"),
        make_item("his/hers/yours/theirs (feminine plural)", "suyas"),
    ]

    demonstratives = [
        make_item("this (masculine singular)", "este"),
        make_item("this (feminine singular)", "esta"),
        make_item("these (masculine plural)", "estos"),
        make_item("these (feminine plural)", "estas"),
        make_item("that (masculine singular)", "ese"),
        make_item("that (feminine singular)", "esa"),
        make_item("those (masculine plural)", "esos"),
        make_item("those (feminine plural)", "esas"),
        make_item("that over there (masculine singular)", "aquel"),
        make_item("that over there (feminine singular)", "aquella"),
        make_item("those over there (masculine plural)", "aquellos"),
        make_item("those over there (feminine plural)", "aquellas"),
        make_item("this thing", "esto"),
        make_item("that thing", "eso"),
        make_item("that thing over there", "aquello"),
    ]

    quantifiers = [
        make_item("all / every (masculine singular)", "todo"),
        make_item("all / every (feminine singular)", "toda"),
        make_item("all (masculine plural)", "todos"),
        make_item("all (feminine plural)", "todas"),
        make_item("some / any (masculine singular)", "alguno"),
        make_item("some / any (feminine singular)", "alguna"),
        make_item("some / any (masculine plural)", "algunos"),
        make_item("some / any (feminine plural)", "algunas"),
        make_item("some / any (apocopated masculine)", "algún"),
        make_item("none / not any (masculine singular)", "ninguno"),
        make_item("none / not any (feminine singular)", "ninguna"),
        make_item("none / not any (apocopated masculine)", "ningún"),
        make_item("much / many (masculine singular)", "mucho"),
        make_item("much / many (feminine singular)", "mucha"),
        make_item("many (masculine plural)", "muchos"),
        make_item("many (feminine plural)", "muchas"),
        make_item("little / few (masculine singular)", "poco"),
        make_item("little / few (feminine singular)", "poca"),
        make_item("few (masculine plural)", "pocos"),
        make_item("few (feminine plural)", "pocas"),
        make_item("enough / quite a lot (singular)", "bastante"),
        make_item("enough / quite a lot (plural)", "bastantes"),
        make_item("several (masculine)", "varios"),
        make_item("several (feminine)", "varias"),
        make_item("each", "cada"),
        make_item("other / another (masculine singular)", "otro"),
        make_item("other / another (feminine singular)", "otra"),
        make_item("other / others (masculine plural)", "otros"),
        make_item("other / others (feminine plural)", "otras"),
        make_item("so much / so many (masculine singular)", "tanto"),
        make_item("so much / so many (feminine singular)", "tanta"),
        make_item("so many (masculine plural)", "tantos"),
        make_item("so many (feminine plural)", "tantas"),
        make_item("too much / too many (masculine singular)", "demasiado"),
        make_item("too much / too many (feminine singular)", "demasiada"),
        make_item("too many (masculine plural)", "demasiados"),
        make_item("too many (feminine plural)", "demasiadas"),
        make_item("any (before noun)", "cualquier"),
        make_item("anyone / any (singular)", "cualquiera"),
        make_item("any (plural)", "cualesquiera"),
        make_item("both (masculine/mixed)", "ambos"),
        make_item("both (feminine)", "ambas"),
        make_item("more", "más"),
        make_item("less", "menos"),
        make_item("something", "algo"),
        make_item("nothing", "nada"),
        make_item("someone", "alguien"),
        make_item("nobody", "nadie"),
        make_item("one (pronoun, masculine)", "uno"),
        make_item("one (pronoun, feminine)", "una"),
        make_item("ones (pronoun, masculine plural)", "unos"),
        make_item("ones (pronoun, feminine plural)", "unas"),
        make_item("the rest / others", "demás"),
        make_item("such (singular)", "tal"),
        make_item("such (plural)", "tales"),
        make_item("each one (masculine)", "cada uno"),
        make_item("each one (feminine)", "cada una"),
    ]

    prepositions = [
        make_item("to / at", "a"),
        make_item("to the / at the (a + el contraction)", "al"),
        make_item("before / in the presence of", "ante"),
        make_item("under", "bajo"),
        make_item("next to (archaic/literary)", "cabe"),
        make_item("with", "con"),
        make_item("against", "contra"),
        make_item("of / from", "de"),
        make_item("of the / from the (de + el contraction)", "del"),
        make_item("from / since", "desde"),
        make_item("during", "durante"),
        make_item("in / on", "en"),
        make_item("between / among", "entre"),
        make_item("except / excluding", "excepto"),
        make_item("toward", "hacia"),
        make_item("until / up to", "hasta"),
        make_item("including / even", "incluso"),
        make_item("by means of", "mediante"),
        make_item("except / minus", "menos"),
        make_item("for / in order to", "para"),
        make_item("for / through / by", "por"),
        make_item("except / save", "salvo"),
        make_item("according to", "según"),
        make_item("without", "sin"),
        make_item("under (archaic)", "so"),
        make_item("on / about", "sobre"),
        make_item("after / behind", "tras"),
        make_item("versus / against", "versus"),
        make_item("via / by way of", "vía"),
    ]

    conjunctions = [
        make_item("and", "y"),
        make_item("and (before i/hi)", "e"),
        make_item("or", "o"),
        make_item("or (before o/ho)", "u"),
        make_item("neither / nor", "ni"),
        make_item("or else / or rather", "o bien"),
        make_item("but", "pero"),
        make_item("but (formal/literary)", "mas"),
        make_item("but rather", "sino"),
        make_item("but rather that", "sino que"),
        make_item("neither...nor", "ni...ni"),
        make_item("either...or", "o...o"),
        make_item("whether...or / either...or", "ya...ya"),
        make_item("whether...or (alt correlative)", "bien...bien"),
        make_item("be it...be it", "sea...sea"),
        make_item("both...and", "tanto...como"),
        make_item("that", "que"),
        make_item("because", "porque"),
        make_item("since / because", "pues"),
        make_item("since", "ya que"),
        make_item("since / given that", "puesto que"),
        make_item("given that", "dado que"),
        make_item("like / as", "como"),
        make_item("if", "si"),
        make_item("as if", "como si"),
        make_item("although", "aunque"),
        make_item("even though", "a pesar de que"),
        make_item("while", "mientras"),
        make_item("while / whereas", "mientras que"),
        make_item("when", "cuando"),
        make_item("where", "donde"),
        make_item("as soon as / as", "en cuanto"),
        make_item("as soon as", "tan pronto como"),
        make_item("as soon as / hardly when", "apenas"),
        make_item("before", "antes de que"),
        make_item("after", "después de que"),
        make_item("since / ever since", "desde que"),
        make_item("until", "hasta que"),
        make_item("so that / in order that", "para que"),
        make_item("so that", "a fin de que"),
        make_item("without ...ing / without that", "sin que"),
        make_item("unless", "a menos que"),
        make_item("provided that", "con tal de que"),
        make_item("as long as / whenever", "siempre que"),
        make_item("in case", "por si"),
        make_item("so / therefore", "conque"),
        make_item("so / thus", "así que"),
        make_item("therefore", "por lo tanto"),
        make_item("consequently", "por consiguiente"),
        make_item("then / afterwards", "luego"),
        make_item("then", "entonces"),
    ]

    interjections = [
        make_item("ouch!", "ay"),
        make_item("ah!", "ah"),
        make_item("hey! / huh?", "eh"),
        make_item("oh!", "oh"),
        make_item("ugh!", "uf"),
        make_item("bah!", "bah"),
        make_item("wow / well then!", "vaya"),
        make_item("gosh!", "caramba"),
        make_item("bravo!", "bravo"),
        make_item("come on!", "anda"),
        make_item("come on! / wow!", "hala"),
        make_item("watch out!", "ojo"),
        make_item("careful!", "cuidado"),
        make_item("oops!", "uy"),
        make_item("yikes!", "huy"),
        make_item("phew!", "puf"),
    ]

    directions_and_location = [
        make_item("to the right", "a la derecha"),
        make_item("to the left", "a la izquierda"),
        make_item("straight ahead", "todo recto"),
        make_item("straight", "derecho"),
        make_item("at the end of the street", "al final de la calle"),
        make_item("on the corner", "en la esquina"),
        make_item("next to", "al lado de"),
        make_item("near", "cerca de"),
        make_item("far from", "lejos de"),
        make_item("in front of", "delante de"),
        make_item("behind", "detrás de"),
        make_item("across from", "enfrente de"),
        make_item("up / upstairs", "arriba"),
        make_item("down / downstairs", "abajo"),
        make_item("inside", "dentro de"),
        make_item("outside", "fuera de"),
        make_item("north", "norte"),
        make_item("south", "sur"),
        make_item("west", "oeste"),
        make_item("east", "oriente"),
        make_item("map", "mapa"),
        make_item("street", "calle"),
        make_item("avenue", "avenida"),
        make_item("square / plaza", "plaza"),
        make_item("corner", "esquina"),
        make_item("traffic light", "semáforo"),
        make_item("crosswalk/intersection", "cruce"),
        make_item("bridge", "puente"),
        make_item("roundabout", "rotonda"),
        make_item("entrance", "entrada"),
        make_item("exit", "salida"),
        make_item("where is ...?", "¿dónde está...?"),
        make_item("how do I get ...?", "¿cómo llego...?"),
        make_item("keep going straight", "sigue recto"),
        make_item("turn right", "gire a la derecha"),
        make_item("turn left", "gire a la izquierda"),
        make_item("cross the street", "cruce la calle"),
        make_item("it is here", "está aquí"),
        make_item("it is there", "está allí"),
    ]

    ordering_food = [
        make_item("a table for two", "una mesa para dos"),
        make_item("do you have a table available?", "¿tiene mesa libre?"),
        make_item("menu (card)", "la carta"),
        make_item("menu", "el menú"),
        make_item("waiter", "el mesero"),
        make_item("waitress", "la mesera"),
        make_item("dish of the day", "el plato del día"),
        make_item("what do you recommend?", "¿qué recomienda?"),
        make_item("for me...", "para mí..."),
        make_item("to share", "para compartir"),
        make_item("what does it have?", "¿qué lleva?"),
        make_item("is it spicy?", "¿es picante?"),
        make_item("not spicy", "sin picante"),
        make_item("with ice", "con hielo"),
        make_item("without ice", "sin hielo"),
        make_item("still water", "agua sin gas"),
        make_item("sparkling water", "agua con gas"),
        make_item("I want to order", "quiero pedir"),
        make_item("I'll have...", "voy a tomar"),
        make_item("for the first course", "de primero"),
        make_item("for the second course", "de segundo"),
        make_item("for dessert", "de postre"),
        make_item("the check, please", "la cuenta, por favor"),
        make_item("can you bring me the check?", "¿me trae la cuenta?"),
        make_item("do you accept card?", "¿aceptan tarjeta?"),
        make_item("I pay in cash", "pago en efectivo"),
        make_item("I pay by card", "pago con tarjeta"),
        make_item("is tip included?", "¿está incluida la propina?"),
        make_item("tip", "la propina"),
        make_item("I am allergic to...", "tengo alergia a..."),
        make_item("gluten-free", "sin gluten"),
        make_item("lactose-free", "sin lactosa"),
        make_item("I am vegetarian (masculine speaker)", "soy vegetariano"),
        make_item("I am vegetarian (feminine speaker)", "soy vegetariana"),
        make_item("I am vegan (masculine speaker)", "soy vegano"),
        make_item("I am vegan (feminine speaker)", "soy vegana"),
        make_item("can you repeat?", "¿puede repetir?"),
        make_item("can you recommend something?", "¿me puede recomendar algo?"),
        make_item("can you bring me another napkin?", "¿me trae otra servilleta?"),
        make_item("another round", "otra ronda"),
        make_item("to go", "para llevar"),
        make_item("for here", "para comer aquí"),
        make_item("it's delicious", "está delicioso"),
        make_item("it's cold", "está fría"),
        make_item("it's hot", "está caliente"),
        make_item("I would like a reservation", "quisiera una reserva"),
        make_item("we have a reservation", "tenemos reserva"),
        make_item("split check", "la cuenta separada"),
        make_item("a bottle of water", "una botella de agua"),
        make_item("a black coffee", "un café solo"),
    ]

    common_adjectives = [
        make_item("good", "bueno"),
        make_item("bad", "malo"),
        make_item("big / large", "grande"),
        make_item("small", "pequeño"),
        make_item("tall / high", "alto"),
        make_item("wide", "ancho"),
        make_item("long", "largo"),
        make_item("short (length)", "corto"),
        make_item("new", "nuevo"),
        make_item("old", "viejo"),
        make_item("young", "joven"),
        make_item("pretty / nice", "bonito"),
        make_item("ugly", "feo"),
        make_item("easy", "fácil"),
        make_item("difficult", "difícil"),
        make_item("fast", "rápido"),
        make_item("slow", "lento"),
        make_item("hot (temperature)", "caliente"),
        make_item("cold", "frío"),
        make_item("strong", "fuerte"),
        make_item("weak", "débil"),
        make_item("expensive", "caro"),
        make_item("cheap", "barato"),
        make_item("clean", "limpio"),
        make_item("dirty", "sucio"),
        make_item("full", "lleno"),
        make_item("empty", "vacío"),
        make_item("happy", "feliz"),
        make_item("sad", "triste"),
        make_item("tired", "cansado"),
        make_item("busy", "ocupado"),
        make_item("free / available", "libre"),
        make_item("safe / sure", "seguro"),
        make_item("dangerous", "peligroso"),
        make_item("important", "importante"),
        make_item("possible", "posible"),
        make_item("impossible", "imposible"),
        make_item("necessary", "necesario"),
        make_item("useful", "útil"),
        make_item("useless", "inútil"),
        make_item("kind", "amable"),
        make_item("nice / friendly", "simpático"),
        make_item("unfriendly / unpleasant", "antipático"),
        make_item("serious", "serio"),
        make_item("fun", "divertido"),
        make_item("boring", "aburrido"),
        make_item("intelligent", "inteligente"),
        make_item("silly / dumb", "tonto"),
        make_item("correct", "correcto"),
        make_item("incorrect / wrong", "incorrecto"),
    ]

    common_adverbs = [
        make_item("well", "bien"),
        make_item("badly", "mal"),
        make_item("very", "muy"),
        make_item("almost", "casi"),
        make_item("already", "ya"),
        make_item("still / yet", "aún"),
        make_item("still / yet", "todavía"),
        make_item("always", "siempre"),
        make_item("never", "nunca"),
        make_item("never ever", "jamás"),
        make_item("today", "hoy"),
        make_item("yesterday", "ayer"),
        make_item("tomorrow", "mañana"),
        make_item("now", "ahora"),
        make_item("before", "antes"),
        make_item("after", "después"),
        make_item("soon", "pronto"),
        make_item("late", "tarde"),
        make_item("early", "temprano"),
        make_item("often", "a menudo"),
        make_item("sometimes", "a veces"),
        make_item("from time to time", "de vez en cuando"),
        make_item("generally", "generalmente"),
        make_item("normally", "normalmente"),
        make_item("frequently", "frecuentemente"),
        make_item("regularly", "regularmente"),
        make_item("immediately", "inmediatamente"),
        make_item("right away", "enseguida"),
        make_item("slowly", "lentamente"),
        make_item("quickly", "rápidamente"),
        make_item("easily", "fácilmente"),
        make_item("with difficulty", "difícilmente"),
        make_item("clearly", "claramente"),
        make_item("exactly", "exactamente"),
        make_item("approximately", "aproximadamente"),
        make_item("really", "realmente"),
        make_item("simply", "simplemente"),
        make_item("especially", "especialmente"),
        make_item("directly", "directamente"),
        make_item("correctly", "correctamente"),
        make_item("probably", "probablemente"),
        make_item("surely", "seguramente"),
        make_item("fortunately", "afortunadamente"),
        make_item("unfortunately", "desafortunadamente"),
        make_item("carefully", "cuidadosamente"),
        make_item("quietly", "silenciosamente"),
        make_item("openly", "abiertamente"),
        make_item("literally", "literalmente"),
        make_item("totally", "totalmente"),
        make_item("partially", "parcialmente"),
    ]

    numbers = numbered_items()

    colours = [
        make_item("yellow", "amarillo"),
        make_item("blue", "azul"),
        make_item("white", "blanco"),
        make_item("gray", "gris"),
        make_item("brown", "marrón"),
        make_item("brown (alt form)", "café"),
        make_item("purple", "morado"),
        make_item("purple (alt form)", "púrpura"),
        make_item("orange", "naranja"),
        make_item("orange (adjectival)", "anaranjado"),
        make_item("black", "negro"),
        make_item("red", "rojo"),
        make_item("pink", "rosado"),
        make_item("pink (alt form)", "rosa"),
        make_item("green", "verde"),
        make_item("violet", "violeta"),
        make_item("light blue", "celeste"),
        make_item("turquoise", "turquesa"),
        make_item("beige", "beige"),
        make_item("golden", "dorado"),
        make_item("silver", "plateado"),
        make_item("maroon", "granate"),
        make_item("lilac", "lila"),
        make_item("lavender", "lavanda"),
    ]

    assert len(common_adjectives) == 50, "Adjectives must be exactly 50."
    assert len(common_adverbs) == 50, "Adverbs must be exactly 50."
    assert len(numbers) == 101, "Numbers must include 0-100."

    groups = [
        decorate_group(
            "core-functional-words",
            "Core Functional Words",
            core_functional_words,
            "High-utility words and question forms used in beginner conversation.",
        ),
        decorate_group(
            "greetings-social-phrases",
            "Greetings & Social Phrases",
            greetings_and_social,
            "Core greetings, farewells, and social courtesy phrases.",
        ),
        decorate_group(
            "articles",
            "Articles",
            articles,
            "Definite and indefinite Spanish articles.",
        ),
        decorate_group(
            "pronouns",
            "Pronouns",
            pronouns,
            "Personal pronouns and core object/prepositional forms.",
        ),
        decorate_group(
            "possessives",
            "Possessives",
            possessives,
            "Possessive determiners and possessive pronoun forms.",
        ),
        decorate_group(
            "demonstratives",
            "Demonstratives",
            demonstratives,
            "Demonstrative determiners/pronouns across distance contrasts.",
        ),
        decorate_group(
            "quantifiers",
            "Quantifiers",
            quantifiers,
            "Universal and indefinite quantifier forms commonly taught to beginners.",
        ),
        decorate_group(
            "prepositions",
            "Prepositions",
            prepositions,
            "The canonical set of Spanish prepositions.",
        ),
        decorate_group(
            "conjunctions",
            "Conjunctions",
            conjunctions,
            "Common coordinating and subordinating conjunctions.",
        ),
        decorate_group(
            "interjections",
            "Interjections",
            interjections,
            "Frequent interjections for reactions, emphasis, and exclamations.",
        ),
        decorate_group(
            "directions-location",
            "Directions & Location",
            directions_and_location,
            "Phrases and words for navigating and talking about location.",
        ),
        decorate_group(
            "ordering-food",
            "Ordering Food",
            ordering_food,
            "Core restaurant phrases for requesting, ordering, and paying.",
        ),
        decorate_group(
            "common-adjectives-50",
            "50 Common Adjectives",
            common_adjectives,
            "A high-utility beginner adjective set.",
        ),
        decorate_group(
            "common-adverbs-50",
            "50 Common Adverbs",
            common_adverbs,
            "A high-utility beginner adverb set spanning time, frequency, and manner.",
        ),
        decorate_group(
            "numbers-0-100",
            "Numbers (0-100)",
            numbers,
            "Cardinal numbers from 0 through 100.",
        ),
        decorate_group(
            "colours",
            "Colours",
            colours,
            "Common basic and high-frequency colour terms.",
        ),
    ]

    # Validate uniqueness within each group by normalized Spanish answer.
    for group in groups:
        seen_answers = {}
        for item in group["items"]:
            for answer in item["answers"]:
                key = normalize_for_uniqueness(answer)
                if not key:
                    continue
                if key in seen_answers:
                    raise ValueError(
                        "Duplicate answer inside group: "
                        f"'{answer}' in {group['id']}",
                    )
                seen_answers[key] = {
                    "answer": answer,
                }

    payload = {
        "sourceNotes": [
            "https://www.rae.es/buen-uso-espa%C3%B1ol/el-art%C3%ADculo-clases-y-usos",
            "https://www.rae.es/buen-uso-espa%C3%B1ol/los-pronombres-personales-formas-y-caracter%C3%ADsticas",
            "https://www.rae.es/buen-uso-espa%C3%B1ol/los-posesivos-caracterizaci%C3%B3n-y-formas",
            "https://www.rae.es/buen-uso-espa%C3%B1ol/los-demostrativos",
            "https://www.rae.es/buen-uso-espa%C3%B1ol/los-cuantificadores-alguno-ninguno-alguien-y-nadie",
            "https://www.rae.es/gram%C3%A1tica-b%C3%A1sica/la-preposici%C3%B3n-la-conjunci%C3%B3n-la-interjecci%C3%B3n/la-preposici%C3%B3n/las-preposiciones-del-espa%C3%B1ol",
            "https://www.rae.es/gtg/interjecci%C3%B3n",
            "https://www.spanishdict.com/guide/greetings-in-spanish",
            "https://www.spanishdict.com/guide/spanish-question-words",
            "https://www.spanishdict.com/guide/get-directions-in-spanish",
            "https://www.spanishdict.com/guide/order-at-a-restaurant-in-spanish",
            "https://www.spanishdict.com/guide/spanish-conjunctions",
            "https://www.spanishdict.com/guide/numbers-in-spanish-0-100",
            "https://www.spanishdict.com/guide/colors-in-spanish",
            "https://www.spanishdict.com/lists/351942/100-most-common-adjectives",
            "https://www.spanishdict.com/guide/spanish-adverbs",
        ],
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
