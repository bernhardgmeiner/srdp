# Don't Panic, It's Just the Matura — Writing Guide B2

Interaktive Lern-Website für die schriftliche Englisch-Matura (AHS, B2, standardisierte Reifeprüfung). Erstellt von Bernhard Gmeiner. Gehostet über GitHub Pages unter matura.bernhardgmeiner.com.

Dieses Dokument hält den aktuellen Stand und die gesamte bisherige Arbeit fest. Es ist interne Projektdoku, kein Teil der Website. Wer das Repo öffentlich stellt, kann diese Datei behalten oder vom Upload ausnehmen.

Stand: 18. Juni 2026.

---

## Was die Seite ist

Eine einzige, selbstständige HTML-Datei (Vanilla JavaScript, kein Framework, kein Server, keine Anmeldung, keine Datenerfassung, keine Werbung). Sie deckt alles ab, was für die zwei Schreibaufgaben der Englisch-Matura nötig ist. Die Lerninhalte sind auf Englisch (Immersion für die Zielgruppe), die Rahmen- und Rechtstexte teils auf Deutsch (Footer, Einordnungssatz auf der Startseite).

Zielgruppe: Maturant:innen kurz vor der schriftlichen Englisch-Matura. Sekundär: Eltern und Lehrkräfte.

---

## Dateien im Projekt

- `index.html` — die komplette App (rund 296 KB, etwa 3300 Zeilen, alles in einer Datei: HTML, CSS, Daten, Logik). Das ist die GitHub-Pages-Startseite (früher „Matura Writing Guide.html", für das Hosting umbenannt).
- `pdf/` — neun herunterladbare PDFs: `essay`, `article`, `report`, `blog`, `email`, `overview`, `phrase-bank`, `checklist`, `topic-vocabulary`.
- `fonts/` — sieben woff2-Schriftdateien (IBM Plex Sans 300/400/400-italic/500/600 und IBM Plex Mono 400/500), lokal eingebettet.

Beim Hochladen zu GitHub müssen alle drei Teile mit: die HTML-Datei plus die Ordner `pdf/` und `fonts/`. Die HTML verlinkt PDFs und Schriften relativ (`pdf/…`, `fonts/…`), das funktioniert lokal und auf GitHub Pages.

---

## Aufbau und Funktionen

### Seiten (15)

- **Home** — Hero mit Titel, deutscher Einordnungssatz, Vier-Schritte-Anleitung „How to use this guide", Statistik-Kacheln (120 min, 2 Aufgaben, 4 × 0–10, ±10 %), Karten für die fünf Textsorten und die acht Werkzeuge, Fortschrittsanzeige, Button zur geführten Tour.
- **Overview & grading** — Aufbau des Writing-Teils, Textsorten-Tabelle, die vier Bewertungskriterien (mit deutschen Bezeichnungen), Bandbeschreibungen, VETO-Regel, die acht teuersten Fehler, PDF-Download.
- **Fünf Textsorten** (Essay, Article, Report, Blog, E-Mail), je mit Reitern: *Guide* (Layout, Do's und Don'ts, aufklappbares „weaker vs. stronger"-Beispiel, Key tip, PDF-Download), *Model text* (kommentierter Mustertext mit Hover-Hervorhebungen plus ein zweiter Mustertext zum Aufklappen und Selbstanalysieren), *Phrases*, bei E-Mail zusätzlich *Sub-types*, *Quiz*, *Build the text* (Satzpuzzle).
- **Phrase bank** — durchsuchbare Phrasensammlung, Kopieren per Klick, PDF.
- **Writing checklist** — Selbst-Check pro Textsorte mit Punktestand, PDF.
- **Self-check studio** — eingefügten Text auf Oberflächenmerkmale prüfen (Wortzahl, Register, Konventionen) plus fertiger KI-Prompt zum Kopieren, mit Warnhinweis.
- **Task bank** — 24 Matura-artige Aufgaben mit Ausgangsmaterial, Filter, Zufallsaufgabe.
- **Topic vocabulary** — Collocations zu acht häufigen Maturathemen, kopierbar, PDF.
- **Paragraph writing** — Aufbau eines Absatzes, mehrere Reiter.
- **Grammar kit** — 14 typische Deutsch-nach-Englisch-Fehler.
- **Practice zone** — Fehler finden, Register-Übung, Abschlussquiz.

### Durchgängige Features

- Hash-Routing zwischen den Seiten.
- Fortschritt und Theme werden lokal im Browser gespeichert (localStorage, Schlüssel mit Präfix `mwg_`).
- Startet immer im Light-Modus; eine manuell gewählte Theme-Einstellung bleibt erhalten.
- Geführte Tour (acht Schritte, Spotlight auf die Navigation). Startet nicht mehr automatisch, sondern über den Button auf der Startseite oder das „?"-Icon oben in der Navigation.
- Einmaliger, nicht blockierender Hinweis beim allerersten Besuch: das „?"-Icon pulsiert kurz mit einer kleinen Sprechblase, verschwindet bei Klick oder nach sieben Sekunden und kommt nie wieder.
- Footer auf jeder Seite mit Impressum, Datenschutzhinweis (alles lokal, keine Datenerfassung) und deutschem Einordnungssatz.
- Schriften lokal eingebettet, kein externer Aufruf an Google (DSGVO).
- Barrierefreiheit: echte `h2`/`h3`-Überschriften, deutsche Begriffe mit `lang="de"`, WCAG-AA-Kontraste.

---

## Technik und Inhalte (für künftige Bearbeitung)

Alle Lerninhalte liegen im JavaScript-Objekt `window.SRDP` in der HTML-Datei:

- `textTypes` — die fünf Textsorten mit `tagline`, `quickFacts`, `layout`, `dos`, `donts`, `tip`, `phrases`, `modelText` (Absätze mit `annotations` für die Hover-Hervorhebungen).
- `emailSubTypes` — vier formale E-Mail-Untertypen (Complaint, Application, Letter to the Editor, Enquiry) mit eigenen Mustertexten.
- `grammar` (14 Themen), `quizzes` und `finalQuiz`, `prompts` (Task-Bank, 24 Aufgaben mit `material`), `checklists`, `paragraphs`, `spotTexts`, `registerGym`, `assessment` (Kriterien und Bands), `dndSets`, `linkingWords`.

Wichtige Konstanten in der Datei (nicht in `SRDP`):

- `TYPE_EXAMPLES` — die „weaker vs. stronger"-Beispiele pro Textsorte.
- `SECOND_MODELS` plus `secondModelBox()` — der zweite Mustertext pro Textsorte (rein Web, nicht in den PDFs).
- `TOPIC_VOCAB` — die acht Themen-Wortlisten.
- `TOUR` plus `startTour()`/`showTour()`/`endTour()` — die geführte Tour.
- `maybeShowHint()` — der einmalige Erstbesuch-Hinweis.
- `SITE_FOOTER` — der Footer, in `route()` an jede Seite angehängt.

localStorage-Schlüssel: `mwg_theme`, `mwg_progress`, `mwg_tour_done`, `mwg_hint_seen`.

Die PDFs werden NICHT von Hand erstellt, sondern aus den Inhalten generiert. Wer Mustertexte, Phrasen oder die Overview ändert, muss die PDFs neu bauen, damit sie zur Website passen. Die Hervorhebungen in den Mustertexten funktionieren über `annotations`, deren `span` ein exakter Teilstring des Absatztextes sein muss. Ändert man einen Mustertext, muss der betroffene `span` mit geändert werden, sonst verschwindet die Hervorhebung.

### Geprüfte fachliche Fakten

- Schreiben AHS B2: 120 Minuten, zwei Aufgaben (etwa 400 plus etwa 250 Wörter), vier Kriterien je 0–10 gleich gewichtet, Worttoleranz ±10 %, keine Wörterbücher.
- VETO-Regel (am offiziellen BMBWF-Begleittext 2023 geprüft): Sie greift, wenn ein Text die Aufgabe als Ganzes verfehlt (themenfremd oder erkennbar vorbereitet), nicht schon bei einem fehlenden Inhaltspunkt. Eine falsche Textsorte allein löst sie nicht aus.
- Report: Die Abschnitte brauchen aussagekräftige Überschriften (Pflichtelement, wird in Organisation und Layout bewertet), aber KEINE Nummerierung. Die offiziellen Beispielperformanzen nummerieren nie; sie schreiben Introduction / Findings / Conclusion, teils thematisch. Die Prüfungsangaben formulieren wörtlich „Divide your report into sections and give them headings." Quelle: BMBWF „Der Bericht als Textsorte bei der SRDP" (matura.gv.at). Frühere Darstellung mit nummerierten Überschriften wurde am 18.06.2026 korrigiert.

---

## Was bisher gemacht wurde

### Grundlage (11. Juni 2026)
Die ursprüngliche, große React-Version wurde komplett neu als einzelne, schlanke HTML-Datei (Vanilla JS) gebaut. Inhalt und Struktur der Lernseiten wurden dabei übernommen und überprüft.

### Große Überarbeitung (18. Juni 2026)

Ausgelöst durch Expertenfeedback und einen mehrstufigen Qualitätscheck.

- **Lesbarkeit und Hierarchie**: Abschnittsüberschriften von kleinen grauen Labels zu echten, deutlich größeren Überschriften gemacht, damit man die Seite leicht scannen kann.
- **Einstieg**: Vier-Schritte-Anleitung auf der Startseite plus geführte Tour.
- **Erklärungen**: aufklappbare „weaker vs. stronger"-Beispiele pro Textsorte, Erklärbox im Self-check.
- **PDF-Downloads** statt Web-Druck: neun sauber gesetzte PDFs mit Fußzeile und URL.
- **Light-Modus** als Standard.

### Qualitätscheck aus fünf Perspektiven
Eltern, Schüler:innen, Schulbuchverlag, Bildungsbehörde und fachfremde Außensicht. Daraus umgesetzt:

- **Recht und Vertrauen**: Footer mit Impressum und Datenschutzhinweis, lokale Schrifteinbettung statt Google (DSGVO), Warnhinweis bei den KI-Buttons.
- **Inhaltliche Korrekturen**: eine fachlich überholte Fast-Fashion-Statistik korrigiert (jetzt belegbare 2 bis 8 Prozent), eine erfundene Instagram-Zahl entfernt, Markennamen generalisiert, alle fiktiven Firmen- und E-Mail-Adressen auf reservierte `.example`-Domains umgestellt.
- **Bedienung**: Auto-Tour abgeschaltet, Satzpuzzle am Handy bedienbar gemacht, doppelten Druck-Button entfernt, deutscher Einordnungssatz ergänzt.
- **Barrierefreiheit**: echte Überschriftenebenen, deutsche Begriffe ausgezeichnet, Kontraste auf WCAG-AA angehoben.

### Inhaltsausbau
- Neue Seite **Topic vocabulary** (acht Themen, kopierbare Collocations, eigenes PDF).
- Ein **zweiter Mustertext** für jede der fünf Textsorten, jeweils zu einem anderen Thema, ohne Farbmarkierungen zum Selbstanalysieren.

### Modelltext- und PDF-Qualität
- Alle Mustertexte auf die korrekte Prüfungslänge gebracht (Essay rund 400, die übrigen rund 250 Wörter, alle innerhalb ±10 %).
- Strukturfehler in einem Mustertext behoben, kleinere Sprachglättungen.
- Geprüft, dass alle neun PDFs inhaltlich exakt zur Website passen; die fehlende „8 teuersten Fehler"-Tabelle im overview-PDF ergänzt.

### Anti-KI-Schreibstil
Die ganze Seite gegen die Wikipedia-Liste „Signs of AI writing" geprüft, mit Fokus auf die Mustertexte. Negative Parallelismen („not X, but Y") von sechs auf einen reduziert, KI-Vokabular entfernt (staggering, gateway, „a constant stream of" und andere), Em-Dashes in den informellen Texten ausgedünnt, einzelne UI-Formulierungen entglättet. Die Mustertexte klingen jetzt wie echte, gute B2-Schülertexte.

---

## Deploy (Ausbaustufe 2 — WICHTIG)

Vor JEDEM Upload zu GitHub in dieser Reihenfolge ausführen (Node nötig, playwright-core im NODE_PATH):

1. `node _dev/bump-sw.mjs` — setzt die Service-Worker-Version auf einen Zeitstempel und erneuert die Precache-Liste. Ohne diesen Schritt sehen wiederkehrende Besucher:innen alte Inhalte.
2. `node _dev/build-prerender.mjs` — baut die statischen `/<sektion>/index.html`-Seiten und die sitemap.xml neu. Ohne diesen Schritt zeigt Google veraltete Inhalte in den Sektions-URLs.

Hochzuladen: `index.html`, `css/`, `js/`, `fonts/`, `pdf/`, `icons/`, alle Sektions-Ordner (`essay/`, `overview/` …), `manifest.json`, `sw.js`, `og-image.png`, `og-template.html`, `robots.txt`, `sitemap.xml`. Der Ordner `_dev/` ist interne Werkzeugkiste und muss nicht deployt werden (GitHub Pages ignoriert `_`-Ordner ohnehin).

Die komplette Git-Historie der Ausbaustufe 2 liegt in `_dev/history.bundle` (`git clone _dev/history.bundle projektname`).

## Pflege und Betrieb

- **Hochladen zu GitHub**: immer die HTML-Datei plus `pdf/` und `fonts/`.
- **Inhalt ändern**: Lernstoff steckt in `window.SRDP` in der HTML-Datei. Nach Änderungen an Mustertexten, Phrasen oder der Overview die PDFs neu bauen, damit beides übereinstimmt.
- **Impressum**: enthält derzeit die Kontakt-E-Mail. Bei Bedarf direkt in `SITE_FOOTER` in der HTML-Datei anpassen.
- **Stil**: Mustertexte und Begleittexte bewusst menschlich und unaufgeregt halten, keine KI-typischen Floskeln, Em-Dashes sparsam.
