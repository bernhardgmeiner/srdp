# HANDOVER — SRDP Matura Writing Guide

Stand: 8. Juli 2026. Dieses Dokument beschreibt den kompletten Ist-Zustand der Website, alles was gemacht wurde, die technischen Umstellungen und die offene Roadmap. Ziel: im richtigen Projekt nahtlos weiterarbeiten können. Es ersetzt die älteren `PROJEKTSTAND.md` und `ABSCHLUSSBERICHT.md` (die sind historisch).

---

## 1. Kurzüberblick

- **Was:** Gratis, unabhängige Übungsseite für den schriftlichen Teil der Englisch-Matura (B2), für **AHS und BHS**. Titel: „Don't Panic, It's Just the Matura".
- **Live:** https://matura.bernhardgmeiner.com (GitHub Pages, Custom Domain).
- **Tech-Stack:** Reines Vanilla-JavaScript (kein Framework, kein Build-Schritt fürs JS), eine Single-Page-App mit Hash-Router. Design im IBM-Carbon-Stil. Progressive Web App (offline-fähig, installierbar). Statisch vorgerenderte Sektionsseiten für SEO und Deep-Links.
- **Deploy:** Dateien per GitHub-Website hochladen. Kein Server, keine Datenbank, kein Tracking. Fortschritt der Nutzer:innen liegt nur im Browser (localStorage).

---

## 2. Aktueller Funktionsstand

**Schultyp-Umschaltung (Kern):** Oben links kann zwischen AHS und BHS umgeschaltet werden. Beim ersten Besuch erscheint ein Auswahl-Dialog. Die Wahl liegt in `localStorage` (`mwg_school`).

- **AHS:** 2 Schreibaufgaben, 120 Min, ~400 + ~250 Wörter, KEIN Wörterbuch, Textsorten inkl. **Essay**, 4 Prüfungsteile inkl. „Language in Use".
- **BHS:** 3 Schreibaufgaben, 195 Min, je ~250 Wörter, (elektronisches) Wörterbuch nur im Writing-Teil, Textsorten inkl. **Leaflet/Broschüre**, KEIN Essay, KEIN „Language in Use".
- Das Beurteilungsraster ist bei beiden **identisch** (4 Kriterien: Task Achievement, Coherence and Cohesion, Lexical and Structural Range, Lexical and Structural Accuracy).

**Textsorten** (jede mit Guide, Layout, Do's & Don'ts, annotiertem Modelltext, zweitem Modelltext, Phrasen, Quiz, „Build the text"-Drag&Drop, „Honest Model" und Checkliste):
- Essay (nur AHS), Article, Report, Blog, E-Mail (alle), Leaflet (nur BHS).

**Tools:** Phrase bank, Writing checklist, Self-check studio (analysiert eingefügten Text + erzeugt einen KI-Feedback-Prompt zum Kopieren), Task bank (Matura-Aufgaben mit Material), Topic vocabulary (Karteikarten).

**Skills & practice:** Paragraph writing (PEEL), Grammar kit (14 Regeln), Practice zone (Spot the mistakes, Register gym, Abschlussquiz), **Exam timer** (neu: schultyp-bewusster Countdown).

**Basics:** Overview & grading (schultyp-bewusst), Countdown plan (AHS: 4-Wochen/7-Tage; BHS: eigene Varianten mit Leaflet statt Essay), FAQ (schultyp-gefiltert).

**About:** For teachers, Für Eltern & Datenschutz (auf Deutsch).

**PDFs:** je Textsorte plus overview, checklist, phrase-bank, topic-vocabulary (alle 11 Themen), leaflet. Ordner `pdf/`.

**PWA/Technik:** Service Worker (offline, network-first für Navigation), `manifest.json`, Content-Security-Policy, `robots.txt`, `sitemap.xml`, 20 vorgerenderte Sektionsseiten.

---

## 3. Technische Architektur

- **Globale Namespaces:** `window.MWG` (Helfer, Router, State), `window.SRDP` (alle Inhalts-Daten), `window.PAGES` (Seiten-Registry). Jede JS-Datei ist eine eigene IIFE `(function(){ ... })()`.
- **Router:** Hash-basiert in `boot.js` (`route()`). Navigation per `data-action`-Event-Delegation. Textsorten, die es im aktuellen Schultyp nicht gibt (Essay bei BHS, Leaflet bei AHS), werden auf Home umgeleitet, auch bei Deep-Links.
- **HTML:** wird per String-Konkatenation gebaut und via `innerHTML` gesetzt. Escaping über `esc()` (escapt auch einfache Anführungszeichen).
- **Schultyp-Logik (wichtig):**
  - `SRDP.schools.{ahs,bhs}` in `js/data-texttypes.js` (Labels, Zeiten, Wortanzahl, Wörterbuch-Text, Overview-Intro, brandTag).
  - Textsorten, Quizfragen, `spotTexts` und FAQ-Einträge tragen optional ein `schools: ['ahs'|'bhs']`-Tag. Ohne Tag = für beide sichtbar.
  - Helfer in `core.js`: `M.school()`, `M.setSchool()`, `M.typesForSchool()`, `M.schoolConfig()`, `M.assessmentCriteria()`, `M.SCHOOLS`.
  - Schultyp-abhängige Labels in `pages-main.js`: `qfWordCount(t)` (Wortzahl-Karte) und `qfBadge(t)` (Kopf-Badge).
- **JS-Dateien (16, exakt diese Reihenfolge in `index.html`):**
  `data-texttypes.js`, `data-content.js`, `data-practice.js`, `core.js`, `toc.js`, `search.js`, `pages-main.js`, `studyplan.js`, `pages-tools.js`, `selfrating.js`, `pages-extra.js`, `flashcards.js`, `pages-practice.js`, `pages-timer.js`, `boot.js`, `pwa.js`.
- **CSS:** `css/main.css` (IBM-Carbon-Tokens, Light/Dark-Theme, Print-Styles).

---

## 4. Wichtige technische Umstellungen (in diesen Threads)

Das ist der zentrale Teil für die Weiterarbeit. Reihenfolge grob chronologisch.

1. **AHS → AHS+BHS umgebaut.** Vorher war es eine reine AHS-Seite. Neu: Schultyp-Umschalter, Erstbesuch-Dialog, `SRDP.schools`-Konfig, `schools`-Tags, Schultyp-Helfer, schultyp-bewusste Overview/Home/Studienplan/FAQ.
2. **Bewertungsraster korrigiert.** Erkannt, dass das Writing-Raster seit 2023 bei AHS und BHS **identisch** ist. Kriterium 2 heißt bei beiden „Coherence and Cohesion". Eine frühere falsche Annahme (eigenes BHS-Kriterium „Organisation & Layout") wurde entfernt.
3. **Fakten gegen offizielle Quellen geprüft und korrigiert.** Ministerium heißt 2026 wieder **BMB** (nicht mehr BMBWF). Broschüre ist der offizielle BHS-Begriff für das Leaflet, und es wird **nur der Text, nicht das Layout** bewertet. BHS-Struktur (3/195/~250/Wörterbuch nur Writing/kein Language in Use) bestätigt (matura.gv.at + echtes HAK-2024-Heft).
4. **Content-Security-Policy + Referrer-Policy** in `index.html` eingeführt. Voraussetzung: kein `eval`, keine Inline-Event-Handler, keine Inline-Scripts (alles über externe Dateien und `data-action`). `script-src 'self'`.
5. **JS-Bündelung eingeführt UND wieder verworfen.** Kurzzeitig wurde alles zu `js/app.min.js` (terser) gebündelt. Das wurde **rückgängig gemacht**, weil eine einzige fehlende Datei die ganze Seite lahmlegt und der manuelle GitHub-Web-Upload dafür zu fragil ist. **Entscheidung für die Zukunft: KEIN Bundle, kein JS-Build-Schritt. Die 16 Einzeldateien werden direkt geladen.** (`js/app.min.js` und `_dev/build-bundle.mjs` sind Überreste, siehe Punkt 9.)
6. **Service Worker** (`sw.js`): Navigation network-first (cacht nur `res.ok && type === 'basic'`), Assets cache-first. Precache umfasst die 16 JS-Quellen, `css`, `icons`, `fonts`, die vorgerenderten Sektionsordner, `pdf/*.pdf` und `og-image.png`. Version = Zeitstempel, gesetzt von `bump-sw.mjs`.
7. **Prerender/PDF-Fallback CSP-sicher gemacht.** Falls das defer-Boot im Headless nicht lief, wurde früher `boot.js` per `eval` nachgeladen (von CSP blockiert). Jetzt per `page.addScriptTag` für alle 16 Dateien.
8. **Barrierefreiheit.** Router fokussiert/announced nur bei echtem Seitenwechsel, sonst den aktiven Tab. Tastatur-Fokus im Drag&Drop, scrollbare Tabellen fokussierbar, Kontrast-Tokens (rot/gelb/muted), Erstbesuch-Dialog per Escape neutral schließbar, ARIA-Labels/Live-Region.
9. **Robustheit + Performance.** `setSchool()` resettet Quiz-/Self-check-/Phrasebank-/Taskbank-State. Phrasen-Index memoisiert (`_phraseCache`). Font-Preload für 2 woff2. `100dvh` fürs Mobile-Layout. Null-Guards in Self-check-Prompt und Task-Zufall.
10. **Cross-Contamination beseitigt (beide Richtungen).** AHS-only (Essay, 400 Wörter, „Language in Use", „long/short task") aus der BHS-Ansicht entfernt bzw. neutralisiert; BHS-only (Leaflet, Broschüre) aus der AHS-Ansicht. Neue schultyp-abhängige Badges (`qfBadge`), Quizfragen/FAQ/spotTexts per `schools`-Tag gefiltert, Vergleichstabelle blendet die Essay-Spalte für BHS aus.
11. **Neue Funktion Exam timer** (`js/pages-timer.js`): echter Klausur-Countdown je Schultyp (AHS 120/2, BHS 195/3), Zeit-Split-Vorschlag, Start/Pause/Reset, Meilenstein-Ansagen, selbst-stoppend beim Verlassen der Seite.
12. **Micro-Copy vereinheitlicht.** E-Mail-Register „Formal" (vorher unklar „Formal (mostly at B2)"). Badges in Klartext („One of two/three tasks", „AHS only", „BHS only · Broschüre"). Artikel-Register „Depends on the audience". Blog-Titel „Post only (not a comment)". Wortzahl-Karten einheitlich „~250 or ~400 words".
13. **Neue Prüf-Skripte (dauerhaft, siehe Abschnitt 5).** `verify.mjs`, `audit.mjs`, `bhs-scan.mjs`. Alle grün.
14. **Leaflet-„Spot the mistakes" (Text F)** ergänzt, nur für BHS sichtbar.

---

## 5. Build- und Prüf-Workflow

Alle Skripte liegen in `_dev/`. **Voraussetzungen:** Node.js; für die Render-Skripte (prerender, pdf, og, verify, audit, bhs-scan) zusätzlich **`playwright-core` + ein Chromium**. `package.json` listet aktuell nur `terser` (für das verworfene Bundle, im Normalbetrieb nicht nötig). Also im echten Setup einmalig:

```
npm install playwright-core
npx playwright install chromium
```

(In der Sandbox hier war Chromium händisch installiert und brauchte `LD_LIBRARY_PATH`/`NODE_PATH` – das ist eine Sandbox-Eigenheit und im normalen Umfeld nicht nötig.)

**Vor jedem Deploy, in dieser Reihenfolge:**

```
node _dev/build-prerender.mjs   # rendert die 20 Sektionsseiten + sitemap.xml
node _dev/make-pdf.mjs          # erzeugt pdf/*.pdf
node _dev/bump-sw.mjs           # neue SW-Version + Precache-Liste (kein Playwright nötig)
```

**Prüfen (sollten alle „PASS" bzw. 0 zeigen):**

```
for f in js/*.js; do node --check "$f"; done     # Syntax
node _dev/verify.mjs      # rendert alle Seiten in beiden Schultypen: 0 Konsolen-/CSP-/Seitenfehler, Timer zählt runter
node _dev/audit.mjs       # Cross-Contamination beide Richtungen + kaputte interne Links + Quiz-Logik: 0 Probleme
node _dev/bhs-scan.mjs    # BHS-Reinheit (kein essay/400/Language-in-Use in der BHS-Ansicht)
```

`_dev/make-og.mjs` erzeugt das OG-Bild (nur bei Bedarf). `_dev/smoke.mjs`/`run-smoke.sh` sind ältere Smoke-Tests.

**Wichtig zum Editieren:** In dieser Sandbox wurde über einen Spiegel-Ordner ohne Leerzeichen im Pfad gearbeitet (der Pfad mit Leerzeichen brach `bump-sw`, und es gab eine Sync-Falle beim Host-Edit). **Im echten Projekt** kannst du die Dateien direkt im Projektordner editieren. Falls ein Skript am Leerzeichen im Pfad scheitert, in einen Ordner ohne Leerzeichen kopieren, dort bauen, zurückkopieren.

---

## 6. Deploy (GitHub Pages)

- Ziel: das Repository, das `matura.bernhardgmeiner.com` bedient.
- Upload über die GitHub-Website: **Add file → Upload files → den ganzen Ordnerinhalt hineinziehen.** Besonders wichtig: der Unterordner **`js/`** muss vollständig mit (die häufigste Upload-Falle – einzelne Dateien aktualisieren `js/` nicht). Ebenso `sw.js`, `index.html`, `css/`, die vorgerenderten Sektionsordner, `pdf/`, `manifest.json`, `robots.txt`, `sitemap.xml`, `icons/`, `fonts/`, `og-image.png`.
- **Nicht hochladen:** `_dev/`, `node_modules/`, und die Doku-Dateien (`HANDOVER.md`, `PROJEKTSTAND.md`, `ABSCHLUSSBERICHT.md`, `README.md`) – schaden aber auch nicht.
- **Cache-Falle beim Testen:** Service Worker und Browser-Cache halten die alte Version fest. Zum Prüfen ein **privates/Inkognito-Fenster** öffnen oder hart neu laden (Strg/Cmd + Umschalt + R). Für echte Nutzer:innen aktualisiert sich der neue SW automatisch, spätestens nachdem alle Tabs der Seite einmal geschlossen waren.

---

## 7. Dateistruktur (Überblick)

```
index.html            SPA-Hülle, lädt die 16 JS-Dateien (defer) + Meta/CSP/JSON-LD
sw.js                 Service Worker (Version + Precache von bump-sw gesetzt)
manifest.json         PWA-Manifest
robots.txt, sitemap.xml, og-image.png, og-template.html
css/main.css
js/                   16 Runtime-Dateien (siehe Abschnitt 3) + app.min.js (verwaist, siehe 9)
fonts/  icons/
pdf/                  10 generierte PDFs
<sektion>/index.html  20 vorgerenderte Seiten (overview, essay, article, ..., timer, parents)
_dev/                 Build-/Prüf-Skripte (nicht deployen)
instagram/            frühere Marketing-Bilder (gehören nicht zur Seite)
```

---

## 8. Bekannte Eigenheiten / Fallstricke

- **Kein JS-Build.** Änderungen an `js/*.js` wirken direkt. Nach Änderungen `bump-sw.mjs` laufen lassen, damit der SW eine neue Version bekommt, sonst sehen Wiederkehrer:innen die alte Version aus dem Cache.
- **Prerender-Seiten sind statische Momentaufnahmen (meist AHS).** Nach Inhaltsänderungen `build-prerender.mjs` neu laufen lassen, sonst zeigen die Sektionsordner alten Inhalt bei Direktaufruf. Die SPA hydratisiert clientseitig je nach gespeichertem Schultyp.
- **`esc()` immer für dynamische Strings verwenden** (verhindert kaputtes HTML / XSS).
- **`schools`-Tag nicht vergessen**, wenn du schultyp-spezifische Inhalte hinzufügst. Danach `audit.mjs` und `bhs-scan.mjs` laufen lassen – die fangen AHS/BHS-Lecks in beide Richtungen ab.
- **Fakten bei matura.gv.at gegenprüfen**, bevor eine neue Regel/Aussage rein kommt.

---

## 9. Offene und Aufräum-Punkte

- **Letzter Upload steht aus:** der aktuelle Stand im Ordner ist noch nicht live (siehe Abschnitt 6).
- **Verwaiste Dateien:** `js/app.min.js` (≈340 KB) und `_dev/build-bundle.mjs` stammen aus dem verworfenen Bundle-Experiment. Sie werden nirgends geladen (nur `build-bundle.mjs` referenziert `app.min.js`) und sind nicht im Service-Worker-Precache. In dieser Umgebung ließen sie sich nicht löschen. **Empfehlung: beide löschen** (oder einfach nicht hochladen). `terser` aus `package.json` kann dann auch raus.
- **„Brief" als eigene Textsorte:** offiziell kennt die BHS zusätzlich den Brief; aktuell als E-Mail-Unterform abgebildet (Beschwerdebrief, Leserbrief). Kein Fehler, aber ausbaubar.

---

## 10. Roadmap (was man darüber hinaus machen könnte)

**Produkt-Ausbau (gleiche Engine):**
- Schreib-Feedback-Tool: eingefügter Übungstext → Einschätzung nach den 4 SRDP-Kriterien + häufigste Fehler (nur Übungstexte, keine echten Namen).
- Deutsch-Matura-Textsorten (größtes Publikum) und weitere lebende Fremdsprachen (gleiches B1/B2-Raster).
- Begleitseite für die **mündliche** Matura (Themenpool, Individual Long Turn, Paired Activity).
- Lehrer:innen-Edition: Aufgabenpakete zum Ausdrucken, Beamer-Modus, Stundenbilder.
- Print-/PDF-Workbook (Inhalt existiert bereits).

**Technik/Qualität:**
- Lighthouse-Audit (Performance, A11y, SEO, PWA).
- Echttest am Handy + mit Screenreader (VoiceOver/NVDA).
- Google Search Console einrichten (misst Suchleistung ohne User-Tracking, passt zur No-Tracking-Haltung).

**Vertrieb:**
- Größter Hebel: Lehrer:innen erreichen (ARGE Englisch der Bundesländer, eEducation-Netzwerk, PH-Fortbildungen, ÖSZ/matura.gv.at um Verlinkung bitten).
- Schüler:innen direkt: TikTok/Reels/Shorts, Knowunity, Reddit, Lern-Discords, Bundesschülervertretung. Timing: Jänner bis Anfang Mai.
- SEO: die Textsorten-Seiten auf Suchbegriffe wie „Englisch Matura Leaflet" ranken lassen.
- derStandard-Blogpost („mit KI ein gratis Matura-Tool gebaut").
