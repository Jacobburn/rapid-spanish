#!/usr/bin/env python3

import json
from datetime import UTC, datetime
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PATH = ROOT / "data" / "grammar-decks.json"


def item(hint: str, answer: str, *alts: str) -> dict:
  answers = [answer, *alts]
  deduped = []
  seen = set()
  for value in answers:
    key = value.strip().lower()
    if not key or key in seen:
      continue
    seen.add(key)
    deduped.append(value)
  return {"hint": hint, "answer": answer, "answers": deduped}


def group(group_id: str, title: str, description: str, rows: list[dict]) -> dict:
  items = [{**row, "index": idx} for idx, row in enumerate(rows, start=1)]
  return {
    "id": group_id,
    "title": title,
    "description": description,
    "count": len(items),
    "items": items,
  }


def main() -> None:
  groups = [
    group(
      "sentence-structure-svo",
      "Sentence Structure: Basic Word Order (SVO)",
      "Rule focus: Standard declarative order is subject + verb + object.",
      [
        item("María buys bread.", "maria compra pan"),
        item("My brother reads the newspaper.", "mi hermano lee el periodico"),
        item("The teacher explains the lesson.", "el profesor explica la leccion"),
        item("We watch a movie.", "nosotros vemos una pelicula", "vemos una pelicula"),
        item("The dog eats chicken.", "el perro come pollo"),
        item("Ana writes an email.", "ana escribe un correo"),
        item("They open the door.", "ellos abren la puerta", "abren la puerta"),
        item("I clean the kitchen.", "yo limpio la cocina", "limpio la cocina"),
        item("The children draw a house.", "los ninos dibujan una casa"),
        item("Pedro needs a car.", "pedro necesita un carro"),
      ],
    ),
    group(
      "sentence-structure-subject-pronouns",
      "Sentence Structure: Subject Pronouns vs Omission",
      "Rule focus: Spanish usually omits subject pronouns unless contrast/emphasis is needed.",
      [
        item("I speak Spanish.", "hablo espanol", "yo hablo espanol"),
        item("You work a lot. (informal)", "trabajas mucho", "tu trabajas mucho"),
        item("She lives in Lima.", "vive en lima", "ella vive en lima"),
        item("We study every day.", "estudiamos cada dia", "nosotros estudiamos cada dia"),
        item("They eat late.", "comen tarde", "ellos comen tarde"),
        item("I am tired.", "estoy cansado", "yo estoy cansado"),
        item("You are right. (formal)", "usted tiene razon", "tiene razon"),
        item("He runs in the morning.", "corre por la manana", "el corre por la manana"),
        item("We are ready.", "estamos listos", "nosotros estamos listos"),
        item("You all arrive early.", "ustedes llegan temprano", "llegan temprano"),
      ],
    ),
    group(
      "sentence-structure-questions",
      "Sentence Structure: Question Formation",
      "Rule focus: Form questions with intonation, punctuation, and question words.",
      [
        item("Where do you live? (informal)", "donde vives"),
        item("What time is it?", "que hora es"),
        item("Why are you sad? (informal)", "por que estas triste"),
        item("Who is she?", "quien es ella"),
        item("When do they arrive?", "cuando llegan"),
        item("How do you say this?", "como se dice esto"),
        item("How much does it cost?", "cuanto cuesta"),
        item("Which one do you prefer? (informal)", "cual prefieres"),
        item("How many books do you have? (informal)", "cuantos libros tienes"),
        item("Do you like coffee? (informal)", "te gusta el cafe"),
      ],
    ),
    group(
      "sentence-structure-negation",
      "Sentence Structure: Negation Placement",
      "Rule focus: Place no before the verb; combine with nunca, tampoco, nadie, nada.",
      [
        item("I do not eat meat.", "no como carne"),
        item("She does not understand.", "no entiende"),
        item("We never go there.", "nunca vamos alli", "no vamos nunca alli"),
        item("I don't know anything.", "no se nada"),
        item("Nobody came.", "no vino nadie"),
        item("He doesn't want coffee either.", "tampoco quiere cafe", "el tampoco quiere cafe"),
        item("I am not ready yet.", "todavia no estoy listo", "aun no estoy listo"),
        item("They never study at night.", "nunca estudian de noche", "no estudian nunca de noche"),
        item("I don't see anyone.", "no veo a nadie"),
        item("No one can help me.", "nadie puede ayudarme"),
      ],
    ),
    group(
      "sentence-structure-adverbs",
      "Sentence Structure: Adverb Placement",
      "Rule focus: Time/frequency adverbs often go before the verb or at sentence boundaries.",
      [
        item("I already ate.", "ya comi"),
        item("I still don't understand.", "todavia no entiendo", "aun no entiendo"),
        item("She always arrives early.", "siempre llega temprano"),
        item("We often walk to work.", "a menudo caminamos al trabajo"),
        item("They also want dessert.", "tambien quieren postre"),
        item("I almost finished.", "casi termine"),
        item("He never cooks.", "nunca cocina"),
        item("We usually have class on Monday.", "normalmente tenemos clase el lunes"),
        item("I really like this song.", "realmente me gusta esta cancion"),
        item("Soon we leave.", "pronto nos vamos"),
      ],
    ),
    group(
      "sentence-structure-clause-connectors",
      "Sentence Structure: Connecting Clauses",
      "Rule focus: Join clauses with porque, aunque, si, cuando, mientras, etc.",
      [
        item("I stay home because it is raining.", "me quedo en casa porque esta lloviendo"),
        item("Although I am tired, I work.", "aunque estoy cansado trabajo"),
        item("If I have time, I call you.", "si tengo tiempo te llamo"),
        item("When I arrive, I text you.", "cuando llego te escribo"),
        item("I study while my sister cooks.", "estudio mientras mi hermana cocina"),
        item("We leave after we eat.", "salimos despues de comer"),
        item("He doesn't go out because he has homework.", "no sale porque tiene tarea"),
        item("I will tell you when I know.", "te dire cuando sepa"),
        item("If it is cold, we stay inside.", "si hace frio nos quedamos dentro"),
        item("They work but they are happy.", "trabajan pero estan felices"),
      ],
    ),
    group(
      "ser-vs-estar",
      "Ser vs Estar",
      "Rule focus: Use ser for identity/essential traits and estar for state/location.",
      [
        item("She is a doctor.", "ella es doctora"),
        item("Madrid is in Spain.", "madrid esta en espana"),
        item("My house is big.", "mi casa es grande"),
        item("The soup is hot.", "la sopa esta caliente"),
        item("They are from Colombia.", "ellos son de colombia"),
        item("I am tired.", "estoy cansado"),
        item("The party is at my house.", "la fiesta esta en mi casa"),
        item("You are very kind. (informal)", "eres muy amable"),
        item("The children are quiet today.", "los ninos estan callados hoy"),
        item("This exercise is easy.", "este ejercicio es facil"),
      ],
    ),
    group(
      "hay-vs-esta-estan",
      "Hay vs Está/Están",
      "Rule focus: hay = existence (there is/are); estar = location of known things.",
      [
        item("There is a park in my neighborhood.", "hay un parque en mi barrio"),
        item("The park is near my house.", "el parque esta cerca de mi casa"),
        item("There are two banks on this street.", "hay dos bancos en esta calle"),
        item("The bank is next to the pharmacy.", "el banco esta al lado de la farmacia"),
        item("There is a problem.", "hay un problema"),
        item("The problem is here.", "el problema esta aqui"),
        item("There are many people at the party.", "hay mucha gente en la fiesta"),
        item("My friends are at the party.", "mis amigos estan en la fiesta"),
        item("There isn't any milk.", "no hay leche"),
        item("The milk is in the fridge.", "la leche esta en el refrigerador"),
      ],
    ),
    group(
      "por-vs-para",
      "Por vs Para",
      "Rule focus: por = cause/motion/exchange; para = purpose/destination/deadline.",
      [
        item("This gift is for you.", "este regalo es para ti"),
        item("I walk through the park.", "camino por el parque"),
        item("I study to learn.", "estudio para aprender"),
        item("Thanks for your help.", "gracias por tu ayuda"),
        item("The train leaves for Madrid tomorrow.", "el tren sale para madrid manana"),
        item("I was late because of traffic.", "llegue tarde por el trafico"),
        item("I need it by Monday.", "lo necesito para el lunes"),
        item("We paid twenty dollars for the book.", "pagamos veinte dolares por el libro"),
        item("I did it for you.", "lo hice por ti"),
        item("This report is for the boss.", "este informe es para el jefe"),
      ],
    ),
    group(
      "direct-vs-indirect-objects",
      "Direct vs Indirect Object Pronouns",
      "Rule focus: direct object pronouns (lo/la/los/las) vs indirect (le/les).",
      [
        item("I see him.", "lo veo"),
        item("I see her.", "la veo"),
        item("I see them. (masculine)", "los veo"),
        item("I give him the book.", "le doy el libro"),
        item("I give them the keys.", "les doy las llaves"),
        item("She writes us a message.", "nos escribe un mensaje"),
        item("We tell you the truth. (informal singular)", "te decimos la verdad"),
        item("They call me every day.", "me llaman cada dia"),
        item("I buy it.", "lo compro"),
        item("I explain the problem to her.", "le explico el problema"),
      ],
    ),
    group(
      "pronoun-position",
      "Pronoun Position",
      "Rule focus: pronouns go before conjugated verbs, or attach to infinitives/gerunds/affirmative commands.",
      [
        item("I want to buy it.", "quiero comprarlo", "lo quiero comprar"),
        item("I am watching it.", "lo estoy viendo", "estoy viendolo"),
        item("Can you explain it to me?", "me lo puedes explicar", "puedes explicarmelo"),
        item("Tell me. (tú command)", "dime"),
        item("Don't tell me. (tú command)", "no me digas"),
        item("I need to send it to them.", "necesito enviarselo", "se lo necesito enviar"),
        item("She keeps reading it.", "sigue leyendolo", "lo sigue leyendo"),
        item("Write it down for me. (tú command)", "apuntamelo"),
        item("Don't buy it. (tú command)", "no lo compres"),
        item("We're going to tell you tomorrow.", "vamos a decirtelo", "te lo vamos a decir"),
      ],
    ),
    group(
      "reflexive-vs-non-reflexive",
      "Reflexive vs Non-Reflexive Verbs",
      "Rule focus: reflexive forms indicate the subject acts on itself or idiomatic meaning changes.",
      [
        item("I wake up at six.", "me despierto a las seis"),
        item("I wake my brother up at six.", "despierto a mi hermano a las seis"),
        item("We are leaving now.", "nos vamos ahora"),
        item("We are going to the office.", "vamos a la oficina"),
        item("She remembers the date.", "recuerda la fecha"),
        item("She remembers the trip.", "se acuerda del viaje"),
        item("They put on their coats.", "se ponen los abrigos"),
        item("They put the books on the table.", "ponen los libros en la mesa"),
        item("I am getting dressed.", "me visto"),
        item("I dress my son.", "visto a mi hijo"),
      ],
    ),
    group(
      "preterite-vs-imperfect",
      "Preterite vs Imperfect",
      "Rule focus: preterite for completed events, imperfect for background/habitual past.",
      [
        item("Yesterday I went to the store.", "ayer fui a la tienda"),
        item("When I was a child, I lived in Chile.", "cuando era nino vivia en chile"),
        item("It was raining when I left.", "llovia cuando sali"),
        item("Last night we watched a movie.", "anoche vimos una pelicula"),
        item("She always studied at night.", "siempre estudiaba de noche"),
        item("Suddenly the phone rang.", "de repente sono el telefono"),
        item("Before, I worked in a bank.", "antes trabajaba en un banco"),
        item("This morning I had coffee.", "esta manana tome cafe"),
        item("While they were cooking, we cleaned.", "mientras cocinaban limpiamos"),
        item("He was tall and had blue eyes.", "era alto y tenia ojos azules"),
      ],
    ),
    group(
      "present-perfect-vs-preterite",
      "Present Perfect vs Preterite",
      "Rule focus: present perfect links to present timeframe; preterite marks finished past events.",
      [
        item("This week I have studied a lot.", "esta semana he estudiado mucho"),
        item("Yesterday I studied a lot.", "ayer estudie mucho"),
        item("Have you eaten today? (informal)", "has comido hoy", "comiste hoy"),
        item("I already have seen that movie.", "ya he visto esa pelicula"),
        item("Last year we traveled to Peru.", "el ano pasado viajamos a peru"),
        item("This month they have sold many cars.", "este mes han vendido muchos carros"),
        item("Two days ago she called me.", "hace dos dias me llamo"),
        item("Have you ever been to Mexico? (informal)", "has estado alguna vez en mexico"),
        item("This morning I had three meetings.", "esta manana tuve tres reuniones"),
        item("He has not finished yet.", "todavia no ha terminado", "aun no ha terminado"),
      ],
    ),
    group(
      "present-subjunctive-triggers",
      "Present Subjunctive Triggers",
      "Rule focus: use subjunctive after many expressions of desire, doubt, emotion, and impersonal judgment.",
      [
        item("I want you to come.", "quiero que vengas"),
        item("It is important that we study.", "es importante que estudiemos"),
        item("I hope it doesn't rain.", "espero que no llueva"),
        item("I doubt that he has time.", "dudo que tenga tiempo"),
        item("Maybe they arrive late.", "quizas lleguen tarde", "quiza lleguen tarde"),
        item("I am glad you are here.", "me alegra que estes aqui"),
        item("I don't think she knows.", "no creo que ella sepa"),
        item("It is possible that we leave early.", "es posible que salgamos temprano"),
        item("I prefer that you call me tomorrow.", "prefiero que me llames manana"),
        item("I recommend that they rest.", "recomiendo que descansen"),
      ],
    ),
    group(
      "commands",
      "Commands",
      "Rule focus: affirmative and negative commands for tú, usted, ustedes, and nosotros forms.",
      [
        item("Eat! (tú)", "come"),
        item("Don't eat! (tú)", "no comas"),
        item("Speak! (usted)", "hable"),
        item("Don't speak! (usted)", "no hable"),
        item("Open the door! (ustedes)", "abran la puerta"),
        item("Don't open the door! (ustedes)", "no abran la puerta"),
        item("Let's go!", "vamos"),
        item("Let's not leave.", "no salgamos"),
        item("Tell me! (tú)", "dime"),
        item("Tell me! (usted)", "digame"),
      ],
    ),
    group(
      "se-constructions",
      "Se Constructions",
      "Rule focus: impersonal se, passive se, and accidental se patterns.",
      [
        item("Spanish is spoken here.", "se habla espanol aqui"),
        item("Cars are sold here.", "se venden carros aqui"),
        item("One eats well here.", "se come bien aqui"),
        item("How do you say this?", "como se dice esto"),
        item("No smoking.", "no se fuma"),
        item("The glass broke on me. (accidental)", "se me rompio el vaso"),
        item("We forgot the keys. (accidental)", "se nos olvidaron las llaves"),
        item("My phone got lost. (accidental)", "se me perdio el telefono"),
        item("Tickets are bought online.", "se compran boletos en linea"),
        item("The doors were opened at eight.", "se abrieron las puertas a las ocho"),
      ],
    ),
    group(
      "si-clauses-conditional",
      "Si Clauses and Conditional",
      "Rule focus: combine si clauses with present/conditional/pluperfect patterns.",
      [
        item("If I have time, I call you.", "si tengo tiempo te llamo"),
        item("If I had time, I would call you.", "si tuviera tiempo te llamaria"),
        item("If I had studied, I would have passed.", "si hubiera estudiado habria aprobado"),
        item("If it rains, we stay home.", "si llueve nos quedamos en casa"),
        item("If I were you, I would rest.", "si yo fuera tu descansaria"),
        item("If they invite us, we will go.", "si nos invitan iremos"),
        item("If you need help, tell me.", "si necesitas ayuda dimelo"),
        item("If he arrives early, we can eat.", "si llega temprano podemos comer"),
        item("If she knew, she would not say anything.", "si lo supiera no diria nada"),
        item("If you had called me, I would have come.", "si me hubieras llamado habria venido"),
      ],
    ),
  ]

  payload = {
    "source": "Rapid Spanish curated grammar MVP deck set",
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
