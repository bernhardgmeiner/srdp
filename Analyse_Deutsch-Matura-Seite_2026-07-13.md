# Eine Schwesterseite für die Deutsch-Matura?

**Analyse vom 13.07.2026** · 12 Fach-Agenten (Recht, Didaktik, Code, UX, Markt, Zielgruppe, Advocatus Diaboli), anschließend dreifacher Re-Check gegen die Originaldokumente auf matura.gv.at und RIS.

---

## Das Ergebnis in vier Sätzen

Technisch ist die Sache leicht: Der Code trägt ein zweites Fach, der Umbau ist überschaubar, und es gibt einen Weg, der die Englisch-Seite unter keinen Umständen gefährdet.

Inhaltlich ist sie schwer: Deutsch als Erstsprache funktioniert didaktisch fast gegenteilig zu Englisch B2. Die Bausteine, die deine Englisch-Seite stark machen (Phrasenbank, Modelltexte, Kollokationen), sind in Deutsch teils wirkungslos, teils schädlich.

Strategisch ist sie riskant: Der Deutsch-Markt ist – anders als Englisch – dicht besetzt, und du bist dort kein Prüfer, sondern Laie.

**Empfehlung: Nicht als „Deutsch-Version der Englisch-Seite". Wenn, dann als schmale Seite über die Bewertungslogik – und nur mit einer Deutschlehrkraft, die vorher schriftlich zugesagt hat.**

---

## 1. Die Faktenbasis (dreifach geprüft, viele Netzquellen sind falsch)

Das Wichtigste zuerst, weil fast alle Nachhilfeseiten und Schulbücher hier veraltet sind:

**Es sind SIEBEN Textsorten, nicht neun.** Gültiger Textsortenkatalog (Stand September 2020, keine neuere Fassung):
Erörterung · Kommentar · Leserbrief · Meinungsrede · Textanalyse · Textinterpretation · Zusammenfassung.
*Empfehlung* und *offener Brief* wurden mit Haupttermin 2020 gestrichen. Der *Leserbrief* dagegen lebt: Er kam beim Haupttermin 5.5.2026 sogar zweimal vor.

Weiteres, alles am Original verifiziert:

| | |
|---|---|
| Format | 300 Minuten, drei Themenpakete zur Wahl (eines literarisch), je zwei Teilaufgaben, **beide** zu bearbeiten |
| Umfang | zusammen rund 900 Wörter ±10 %; Einzelbänder 270–330 / 405–495 / 540–660 |
| Hilfsmittel | Wörterbuch ja, Lexika nein, KI ausdrücklich verboten |
| AHS vs. BHS | **kein Unterschied**, gemeinsames Aufgabenheft |
| Beurteilung | 4 Dimensionen (Inhalt, Textstruktur, Stil und Ausdruck, normative Sprachrichtigkeit), 3 Kompetenzbereiche. **Kein Punktesystem, kein Notenschlüssel.** In K1/K2 reicht eine einzige Dimension unter „das Wesentliche überwiegend erfüllt" für ein Nicht genügend; in K3 ist Ausgleich zwischen den beiden Texten möglich. |
| Ausgangsmaterial | Jede Teilaufgabe hat Textbeilagen. Ohne sie existiert keine Deutsch-Aufgabe. |
| Lizenz | BMB-Dokumente stehen unter CC BY 4.0 („Datenquelle: Bundesministerium für Bildung"). **Die Textbeilagen Dritter sind davon nicht gedeckt.** |

---

## 2. Frage: Wie sähe die Seite inhaltlich aus?

Nicht wie deine Englisch-Seite mit deutschen Wörtern. Das ist der zentrale Befund der Fachdidaktik-Prüfung.

**Das kannst du übernehmen:** Onboarding, Prüfungs- und Beurteilungsübersicht, Checklisten, Practice Zone, Timer (aber als Etappenplan über 300 Minuten, nicht als nackter Countdown), FAQ, Eltern-/Lehrkräfte-Seite.

**Das musst du stark umbauen:** Die Textsortenseiten werden operatorenzentriert statt merkmalszentriert. „Absatzbau" wird zur Argumentationswerkstatt (Behauptung vs. Argument, Gegenargument entkräften). Das Grammar Kit (deutsche Interferenzfehler im Englischen) wird ersatzlos zum Normrichtigkeits-Kit (das/dass, Beistrichsetzung, Konjunktiv I in der Redewiedergabe).

**Das musst du streichen:** Die Phrasenbank. In B2-Englisch sind Chunks ein Qualitätsmerkmal, in Deutsch sind sie ein Abwertungsgrund unter „Stil und Ausdruck". Eine deutsche Wendungssammlung ist eine Floskelfabrik, und 30 gleich eingeleitete Arbeiten aus einer Schule fallen sofort auf. Dasselbe gilt für Topic Vocabulary und Formulierungs-Flashcards.

**Das braucht es neu, sonst ist es keine Deutsch-Seite:**

- **Textbeilagen-Labor.** Die halbe Deutsch-Matura ist Lesen, nicht Schreiben. Wer die Beilage falsch liest, verliert bei „Inhalt", egal wie schön er schreibt.
- **Operatoren-Kompass.** Der häufigste Punktverlust überhaupt: einer von drei Arbeitsaufträgen wird schlicht übersehen.
- **Zitier- und Redewiedergabe-Technik.** Der einzige Bereich, in dem eine Musterformulierungs-Sammlung in Deutsch unbedenklich ist.
- **300-Minuten-Strategie inklusive Paketwahl.** Banal, rettet aber mehr Noten als jeder Stiltipp.

Der eine Baustein, der in Deutsch sogar *stärker* wirkt als in Englisch: **„Grade like an examiner"**. Muttersprachler:innen können Textqualität durchaus beurteilen, ihnen fehlt nur das Raster. Genau das ist aber auch der Baustein, den du fachlich am wenigsten selbst verantworten kannst.

---

## 3. Frage: Wie müsste man um-coden?

Der Code ist zu rund 35 % fachneutral (Router, Quiz-Engine, Drag&Drop, Flashcards, Suche, PWA, Prerender, CSS zu fast 100 %), zu 15 % Engine mit Englisch-Annahmen und zu 50 % reiner Content.

Drei Optionen wurden geprüft, zwei Gutachten widersprachen sich, der Schiedsspruch lautet:

**Gemeinsame Origin, getrennter Code.** Also `matura.bernhardgmeiner.com/deutsch/` als vollständig eigenständige Anwendung im selben Ordner: eigene Kopie von `js/` und `css/`, eigener Service Worker mit eigenem Cache-Präfix (`dwg-`), eigenes Manifest, eigener localStorage-Präfix. Kein geteiltes Engine-Package, kein i18n-Layer, kein Monorepo-Build. Der Code wird bewusst dupliziert.

Das kombiniert das Beste aus beidem: null Regressionsrisiko für Englisch (kein Englisch-JS wird angefasst), aber eine Domain, geteiltes Theme und geteilter AHS/BHS-Schultyp, und ein Cross-Link, über den Englisch-Nutzer:innen Deutsch überhaupt erst entdecken.

**Ein echter Fund, unabhängig vom Deutsch-Projekt:** In `sw.js` bricht ein einziger 404 in `cache.addAll(ASSETS)` die komplette Service-Worker-Installation. Und `_dev/bump-sw.mjs` scannt automatisch alle Top-Level-Ordner mit `index.html` – ein noch nicht hochgeladener Ordner `deutsch/` würde beim nächsten Bump die **Englisch**-Seite lahmlegen. Das sollte in jedem Fall gehärtet werden (`Promise.allSettled` statt `addAll`), bevor irgendetwas Deutsches existiert.

**Abbruch-Szenario:** Ordner `deutsch/` löschen, Cross-Link raus, SW bumpen. Fertig. Kein DNS, kein zweites Repo, keine Migration.

---

## 4. Frage: Braucht es einen Re-Launch des Designs?

Nein. Aber die Sidebar kippt.

Sie ist eine flache Liste ohne zweite Ebene. Schon heute liegen bei 22 Einträgen rund 36 % unter der Falz; mit einer Deutsch-Struktur wären es über 50 %. Dazu kommt: `TYPE_COLORS` kennt fünf Farben – für sieben Textsorten reicht das nicht.

Die Lösung ist kein neues Design, sondern eine bessere Informationsarchitektur:

- Sidebar als **kollabierbares Akkordeon**, eine Gruppe offen.
- Die sieben Textsorten in **drei semantische Gruppen** statt sieben Farben: *textbezogen-analytisch* (Zusammenfassung, Textanalyse, Textinterpretation), *argumentativ* (Erörterung, Kommentar, Meinungsrede), *adressatenorientiert* (Leserbrief). Das löst das Farbproblem und gleichzeitig die häufigste Verwechslung überhaupt.
- Startseite als **vier Türen** statt 30 Menüpunkte: „Von vorne anfangen" / „3 Tage vorher" / „Welche Textsorte ist das?" / „Text fertig – ist der gut?"

Gleiche Designsprache, andere Akzentfarbe, andere Wortmarke. Aber drei Signale müssen kippen (Farbe, Wortmarke, PWA-Identität), sonst weiß niemand, in welchem Fach er ist.

Mobil fehlt heute `hyphens:auto` und `lang="de"` – deutsche Komposita laufen aus dem Viewport. Und es fehlt ein **Beilagen-Reader mit Zeilennummern**. Ohne Zeilennummern kann man Zitieren nicht üben.

---

## 5. Frage: Macht das Vorhaben Sinn?

Hier wird es unangenehm, und ich sage es so deutlich, wie du es verlangt hast.

**Was gegen das Projekt spricht:**

*Der Markt ist besetzt.* Bei Englisch hast du ein leeres Feld besetzt. Bei Deutsch gibt es deutsche-grammatik.net (alle sieben Textsorten, komplett, gratis), Knowunity, Studocu, öbv- und Veritas-Materialien, dazu SEO-starke Affiliate-Seiten. Nur eine Lücke ist echt: **Niemand erklärt die Bewertungslogik**, und niemand zeigt kommentierte Musterlösungen auf verschiedenen Niveaus.

*Die Statistik.* Die Negativquote in Deutsch lag 2025 bei 0,9 %. Der Schmerz der Schüler:innen ist nicht „durchfallen", sondern „ich weiß nicht, was die von mir wollen".

*Der Qualitätsfilter fehlt.* In deiner eigenen Projekthistorie warst immer **du** die Instanz, die die KI-Fehler gefunden hat: die falsche Veto-Regel, die nummerierten Report-Überschriften, die dreimal zu kurzen Modelltexte, der KI-Sprachduktus. Zehn Review-Agenten haben das nicht zuverlässig gefunden. In Deutsch fehlt dieses Netz. Dann bleibt: KI schreibt, KI prüft, KI lobt.

*Die Reputationsasymmetrie.* Du bloggst über KI in der Bildung. Ein einziger fachlich schwacher Modelltext liefert den Satz „Der predigt reflektierten KI-Einsatz und lässt sich sein Fachfremdes von ChatGPT schreiben." Der Vorwurf zielt auf die *Struktur* des Vorgehens, nicht auf das Ergebnis – Qualität widerlegt ihn nicht. Und der Schaden trifft auch die Englisch-Seite.

*Das Urheberrecht.* Bei Englisch konntest du jedes Ausgangsmaterial erfinden. Bei Deutsch ist das Ausgangsmaterial der Kern – und Zeitungsartikel wie moderne Literatur dürfen auf einer öffentlichen Seite nicht abgedruckt werden. Die Schulausnahme (§ 42g UrhG) gilt für abgegrenzte Nutzerkreise mit Login, nicht für eine indexierte PWA. Bleiben: selbst geschriebene Sachtexte, gemeinfreie Literatur (Autor:in vor 1956 gestorben) und Links.

**Was dafür spricht:** Die Lücke bei der Bewertungslogik ist real – und sie ist Prüfungs-Metawissen, kein Deutsch-Fachwissen. Genau darin bist du qualifiziert.

---

## 6. Der Aufwand, nüchtern gerechnet

Gemessen an der echten Englisch-Seite (46.000 Wörter Textbestand, davon ~24.000 didaktischer Kern), nicht geschätzt:

| | eigene Stunden | externe Fachprüfung |
|---|---|---|
| Vollausbau (7 Textsorten, Modelltexte, Aufgaben) | 190–260 h | 25–35 h (1.000–2.000 € oder kollegial) |
| Schlanke Variante (siehe unten) | 100–115 h | 8–12 h |

Der eigentliche Projektkiller ist nicht die Stundenzahl, sondern die **Kalenderzeit**: Bei Englisch entscheidest du in zwei Sekunden, ob ein Satz trägt. Bei Deutsch kostet jeder Zweifelsfall eine Mail und vier Tage Wartezeit. Davon gibt es hunderte.

**Die einzige Deadline, die zählt:** Lehrkräfte empfehlen Material im **Herbst**, nicht im März. Was nach Weihnachten fertig wird, ist für den Jahrgang 2027 verbrannt. Also: MVP bis Mitte Oktober 2026 – oder gleich auf 2028 zielen.

---

## 7. Die Variante, die ich empfehlen würde

**„Deutsch-Matura: Wie sie bewertet wird"** – fünf Seiten, kein Textsorten-Lehrbuch:

1. Der Beurteilungsraster im Klartext (das offizielle Dokument, übersetzt in „Was will die Prüferin hier sehen?")
2. Operatoren-Training (die BMB-Operatorenliste ist öffentlich und endlich; braucht keinen einzigen Modelltext)
3. 300-Minuten-Strategie und Paketwahl
4. Arbeit mit der Textbeilage (Methode, kein fremder Volltext)
5. Ein Prüfer:innen-Prompt nach dem offiziellen Raster

Keine Modelltexte, keine Phrasenbank, keine Textinterpretation, keine Notenvergabe. Damit sinkt der externe Prüfaufwand auf 8–12 Stunden, das Rechtsrisiko auf null – und es kollidiert mit keinem der bestehenden Anbieter, weil die alle Textsortenmerkmale liefern und niemand die Bewertungslogik erklärt.

**Ernsthaft zu prüfende Alternativen:**

- **Kooperation statt Eigenbau.** Du suchst eine Deutschlehrkraft mit Ambition, schenkst ihr die Technik und den Workflow. Sie ist Autorin, du bist Baumeister. Aufwand für dich: 40–60 h. Und es ist der bessere Blogartikel: „Ich habe einer Kollegin in drei Wochen ihre Fachwebsite gebaut" schlägt „Ich habe mir Deutsch von ChatGPT erklären lassen" um Längen.
- **Englisch ausbauen statt Deutsch anfangen.** Mündliche Matura, Schularbeiten 5.–7. Klasse, Lehrkräfte-Material. Leere Nische, volle Fachautorität, kein Reputationsrisiko.

---

## 8. Die harten Bedingungen, falls du es doch machst

Keine Ratschläge, sondern überprüfbare Gates:

1. **Vor der ersten Codezeile:** eine schriftliche Zusage einer aktiven AHS-Deutschlehrkraft mit RDP-Korrekturerfahrung, mit klarem Umfang (z. B. 8–12 h) und namentlicher Nennung auf der Seite. Findest du nach vier Wochen niemanden, ist das die Antwort auf das ganze Projekt – und eine billige.
2. **Blindbewertung:** Falls doch Modelltexte, werden sie von zwei Personen unabhängig nach dem Raster beurteilt. Streuung über eine Stufe hinaus: Text raus, nicht Bewertung glätten. (Einen KI-Detektor-Test brauchst du nicht – die Dinger sind unzuverlässig und beweisen nichts.)
3. **Textbeilagen:** selbst geschrieben, gemeinfrei (Sterbedatum geprüft) oder verlinkt. Kein einziger Text mit der Begründung „wird schon Zitatrecht sein".
4. **Transparenz über der Falz, nicht im Footer:** „Ich bin Englischlehrer, kein Deutschlehrer. Fachlich geprüft von [Name]. Kein offizielles Angebot des BMB."
5. **Prüfdatum im Footer jeder Seite** plus Errata-Seite. Läuft das Datum ohne Review ab, geht die Seite offline.
6. **Vorab abklären:** unentgeltlich, werbefrei, keine Spenden. Das ist gleichzeitig dein bester Haftungsschutz (§ 1300 ABGB schützt nur unentgeltlichen Rat).

---

## Die drei Fragen, die nur du beantworten kannst

1. **Habe ich die Zusage – schriftlich, mit Namen – bevor ich anfange?** Nicht „die Kollegin würde sicher", sondern eine Person, die weiß, dass ihr Name öffentlich unter KI-gestütztem Material steht, und trotzdem Ja sagt.

2. **Was ist der Antrieb: Nutzen für 40.000 Maturant:innen – oder der Beweis, dass man mit KI fachfremd produzieren kann?** Beides ist legitim. Aber das Zweite ist ein Experiment und ein Blogartikel, keine Website. Offen deklariert, mit Blindbewertung durch Deutschlehrkräfte und veröffentlichtem Ergebnis (auch wenn es schlecht ausfällt), wäre es vermutlich der beste Text, den du je über KI in der Bildung geschrieben hast.

3. **Was mache ich in diesen 200 Stunden nicht?**
