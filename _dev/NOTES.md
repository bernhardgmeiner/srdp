# Ausbaustufe 2 – Arbeitsnotizen (für den Abschlussbericht)

Stand: wird laufend ergänzt. Interne Doku, kein Teil der Website.

## WP0 – Bestandsaufnahme: Abweichungen vom Plan

1. **Kein Git-Repo im Projektordner.** Deploy war bisher manueller Upload zu GitHub (laut README). Kein CNAME im Ordner, kein Workflow. Anpassung: Git-Historie wird im Sandbox-Spiegel geführt (ein Commit pro WP) und nach jedem Commit als `_dev/history.bundle` in den Projektordner gelegt. GitHub-Action-Schritte aus WP3/WP12 werden stattdessen als dokumentierte Pflichtschritte im README umgesetzt.
2. **Keine `og:`-Tags und kein `canonical` vorhanden** (Plan nahm „og: ohne og:image" an). WP1 ergänzt das komplette Set.
3. **Quiz-Engine zeigt bereits eine Review-Liste** aller falschen Antworten mit Erklärung (Ergebnis-Screen, `qmiss`). WP6 reduziert sich auf: „Retry wrong answers only", Versuchs-Verlauf, aria-live.
4. **Copy-Feedback existiert teilweise:** Chips wechseln bereits auf ✓ (Event-Delegation, Klasse `copied`), globaler Toast `#toast` hat `role="status"` (implizit aria-live=polite), Fallback über execCommand vorhanden. WP1b ergänzt: Label-Feedback bei Buttons (v. a. „Copy AI feedback prompt"), grüner Rahmen bei Chips.
5. **Fortschritts-Modul auf Home existiert bereits** (Balken + „X/14 sections · Y/6 quizzes"), erscheint ab visited > 0. WP10 ergänzt Next-Link und die homeHint()-Weiche.
6. Struktur: 1 Style-Block (Z. 9–341), 8 IIFE-Script-Blöcke: (1) SRDP textTypes+emailSubTypes, (2) SRDP grammar/quizzes/finalQuiz/prompts/linking/assessment/checklists/paragraphs, (3) SRDP spotTexts/registerGym/dndSets/aiPromptTemplate, (4) MWG-Core+NAV, (5) PAGES home/overview/typePage (+TYPE_EXAMPLES, SECOND_MODELS), (6) PAGES tools (+TOPIC_VOCAB Z. 2710), (7) PAGES grammar/paragraphs/practice, (8) Boot/Router/Tour/Delegation.
7. Trackable: 14 Sektionen; Quiz-IDs: essay, article, report, blog, email, final.
8. `html{scroll-behavior:smooth}` global gesetzt → WP11 muss das bei prefers-reduced-motion neutralisieren.
9. `#toast` existiert als globale Status-Region → WP1/WP6/WP11 nutzen sie weiter, keine zweite Region nötig.
10. Mobile-Top-Bar existiert (`.mobile-bar`: Titel + Burger) → Ort für den Such-Button (WP7).
11. Auf dem eingebundenen Ordner funktioniert git nicht (Unlink gesperrt); ein leeres `.git`-Skelett liegt dort und sollte am Ende gelöscht werden (harmlos, aber unnötig).

## Umgebung

- Playwright headless-shell 1228 + libXdamage lokal in der Sandbox installiert.
- Smoke-Test: `bash _dev/run-smoke.sh --pages home,essay,phrasebank --tour` (Screenshots 1440/390 × light/dark, Konsolenfehler, Theme, Routing, Progress-Migration, PDF-HEAD, Tour).
- Baseline-Screenshots (Vorher-Stand) gesichert.

## Offene Review-Punkte für Bernhard

- **WP5:** TOPIC_VOCAB-Format geändert: aus `words: ['…']` wurde `words: [{ w, hint }]` – die 96 bestehenden Kollokationen haben jetzt NEUE Verwendungshinweise (Kartenrückseiten), dazu 36 neue Vokabeln in 3 neuen Themen (AI & the digital future, Media & news, Migration & global citizenship). Alle 132 Hints + 36 neue Vokabeln bitte fachlich prüfen.
- **WP5:** Plan-Annahme „Verwendungsangabe wie bei den bestehenden" stimmte nicht – die bestehenden Vokabeln hatten keine. Hints wurden neu geschrieben.
- **WP8 (fachliche Korrektur der Overview!):** Die alte Band-Darstellung „9–10 / 7–8 / 5–6 / 3–4 / 0–2" widersprach dem offiziellen Raster: Der BMBWF-Raster (Begleittext 2023, matura.gv.at) beschreibt die Stufen 0/2/4/6/8/10, Stufe 6 = B2-Minimum, Stufe 5 ist bereits negativ. „5–6 Satisfactory" hat die Bestehensgrenze verwischt. Neu: sechs Bänder 10/8/6/4/2/0 mit „6 = B2 minimum met" + Hinweis auf die Zwischenstufen. Quelle: srdp_lfs_Bewertungsraster_B2_Begleittext_2023.pdf.
- **WP8:** Selbst-Rating-Deskriptoren (4 Kriterien × 6 Stufen, „I…"-Form) sind aus dem offiziellen Begleittext abgeleitet, aber sprachlich für Schüler:innen umformuliert – bitte fachlich prüfen.

- **WP9 FAQ – Quellenlage für den fachlichen Review:**
  - Belegt (Begleittext B2 2023 bzw. matura.gv.at/srdp/lebende-fremdsprachen): ±10%-Regel + Band-Abzug (Q1, Q10), keine (elektronischen) Wörterbücher an der AHS (Q3), Veto-Regel (Q5), Relevanz-Definition „selbst wenn nicht den Erwartungen entsprechend" (Q7), gleich ausführliche Behandlung der Inhaltspunkte (Q11), zentrale Termine BMBWF (Q14), Wiederholung + mündliche Kompensationsprüfung SchUG §40 (Q15), Register-Deskriptor als Basis der Kontraktions-Antwort (Q2).
  - Unbelegt, als best practice formuliert + „ask your teacher": Stift/Tipp-Ex (Q4), Handschrift (Q6), BE/AE-Spelling (Q8), unfertige zweite Aufgabe/Gewichtung der zwei Tasks (Q9), Titel im Word count (Q12), Reihenfolge der Aufgaben (Q13). Bitte prüfen bzw. schulpraktisch bestätigen.
- **WP9 Realtexte („The honest model", Essay + E-Mail):** komplett neu geschrieben (Texte, 12 Annotationen je Text, Band-Einschätzung). Bitte fachlich prüfen — besonders die Band-Schätzungen am Ende.
- **WP9 Abweichung:** Tour wurde NICHT um FAQ/Teachers-Schritte erweitert (9 Schritte reichen; mehr Schritte = mehr Abbrüche). Mobile Annotationen: Marker springen zur Notizliste unterhalb des Texts (statt Inline-Aufklappen) — einfacher und robust.

- **WP11 Token-Anpassungen (Light):** `--text-muted` #6f6f6f → #636363, `--primary` #0f62fe → #0043ce (IBM Blue 70; Link-/Akzentfarbe, WCAG AA auf allen Flächen). Button-Hintergrund `--primary-bg` bleibt #0f62fe. Footer-Links jetzt unterstrichen. axe-core: keine critical/serious Violations auf Home/Essay/Phrase Bank/Suche/Flashcards in beiden Themes.
- **WP11:** JSON-LD (LearningResource + FAQPage) statisch im Head — bei FAQ-Änderungen in js/pages-extra.js muss der FAQPage-Block im Head mitgezogen werden.

## TODOs für später

- `pdf/topic-vocabulary.pdf` deckt nach WP5 nur 8 von 11 Themen ab → neu bauen.
- `.git`-Skelett im Projektordner löschen.
