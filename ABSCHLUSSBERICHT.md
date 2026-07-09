# Abschlussbericht: Ausbaustufe 2 — matura.bernhardgmeiner.com

Stand: 6. Juli 2026. Interne Doku, nicht für den Upload gedacht. Alle 13 Arbeitspakete sind umgesetzt, jeder Schritt liegt als eigener Commit in `_dev/history.bundle` (öffnen mit `git clone _dev/history.bundle mwg`).

## Nachtrag: Review-Runde 1 (6. Juli, abends)

Auf Bernhards Feedback umgesetzt: Name + Link auf bernhardgmeiner.com und „with the help of Claude Cowork" auf der Teachers-Seite; Moodle-Satz um Google Classroom und MS Teams erweitert; BMBWF überall auf der Seite zu BMB geändert; die unklare Zeile „Wrong text type conventions" in der 8-Fehler-Tabelle neu formuliert (nennt jetzt Beispiel, Kosten und Fix klar getrennt); die FAQ „Can I write in pencil?" und „Is bad handwriting a problem?" gestrichen (jetzt 13 Fragen, JSON-LD in index.html und faq/ mitgezogen); Em-Dashes in allen neuen Texten (FAQ, Teachers, Realtexte, Lernplan, Selbst-Rating, Flashcards, Suche) durch Halbgeviertstriche ersetzt. Der Seitentitel-Stil „X — Matura Writing Guide B2" wurde bewusst belassen (bestehendes Muster auf allen Seiten) – bei Bedarf sagen, dann ändere ich ihn überall.

Zwei bekannte Restposten: (1) In den 16 vorgerenderten Sektions-Ordnern außer faq/ steckt im unsichtbaren FAQ-Datenblock (JSON-LD im Head) noch der alte Stand mit 15 Fragen und Em-Dashes; ebenso die Em-Dashes in den Honest-Model-Texten von essay/ und email/ (nur für Suchmaschinen sichtbar, die App zeigt beim Laden sofort den korrigierten Inhalt). Ein Lauf von `node _dev/build-prerender.mjs` regeneriert alle 17 Ordner aus den korrigierten Quellen – mache ich in der nächsten Sitzung, oder es passiert automatisch beim nächsten Deploy-Vorbereitungslauf. (2) Diese Review-Änderungen sind noch nicht in `_dev/history.bundle` committet (Arbeitsumgebung war nicht verfügbar); wird beim nächsten Mal nachgeholt. Die Em-Dashes in den älteren Bestandstexten (Modelltexte, Checklisten, Vokabel-Hints) wurden nicht angerührt – bei Bedarf als eigener Durchgang.

## Was gebaut wurde

Die Seite ist von einer 296-KB-Einzeldatei zu einer modularen Struktur gewachsen: `css/main.css` plus zwölf Dateien unter `js/`, dazu PWA, Prerender und drei neue Seiten. Der Reihe nach:

**WP0.5 Modularisierung.** CSS und die acht Script-Blöcke sind jetzt eigene Dateien, per `defer` in alter Reihenfolge geladen. DOM-Diff vor/nach dem Split war auf Home, Essay und Phrase Bank byte-identisch.

**WP1 Quick Wins.** `og-image.png` (aus `og-template.html` mit echten Site-Fonts gerendert), komplettes og:/twitter:/canonical-Set im Head (vorher gab es gar keine og-Tags), Copy-Feedback auf allen Buttons („Copied ✓"), vierte Footer-Spalte „Found a mistake?" mit Mailto.

**WP2 Orientierung.** Sticky „On this page"-Chips mit Scroll-Spy auf Overview und den fünf Guide-Tabs, globaler Back-to-top-Button ab 800 px Scrolltiefe.

**WP3 PWA.** `manifest.json`, vier Icons, Service Worker mit Precache (25 Assets), network-first für HTML, Runtime-Cache für PDFs, Update-Toast mit Reload-Knopf (reloadet nur nach Klick, genau einmal). Die Seite läuft komplett offline, inklusive Fonts und Fortschritt. Versionierung über `_dev/bump-sw.mjs` — Pflichtschritt vor jedem Deploy, steht im README.

**WP6 Quiz-Upgrade.** „Retry wrong answers only" auf dem Ergebnis-Screen, Verlauf der letzten fünf Voll-Versuche („Last attempts: 2/7 · …"), falsche Antworten durchgestrichen, Ergebnis-Announcement für Screenreader. Retry-Runden zählen nicht als Voll-Versuch und ändern nichts an der ✓✓-Logik.

**WP7 Globale Suche.** Ctrl+K / Cmd+K / „/" plus Lupen-Buttons in Sidebar und mobiler Top-Bar. Der Index (lazy beim ersten Öffnen) umfasst Seiten, E-Mail-Subtypen, alle Phrasen, Topic-Vokabeln, Grammar-Einträge, Linking words, Tasks und Checklist-Items. Phrasen/Vokabeln haben Copy-Icons direkt im Ergebnis; Treffer öffnen Akkordeons und highlighten das Element 2 s.

**WP5 Vokabeln + Flashcards.** Drei neue Themen (AI & the digital future, Media & news, Migration & global citizenship) — 36 neue Kollokationen. Alle 132 Einträge haben jetzt Verwendungshinweise als Kartenrückseite. Flashcard-Modus mit 3-Boxen-Leitner-System (Box 1 jede Session, Box 2 jede zweite, Box 3 jede vierte), Swipe-Gesten, Tastatur (Space/1/2/Esc), „mastered"-Badges an den Akkordeons.

**WP4 Countdown plan.** Neue Seite mit 4-Wochen-Plan (20 Tage, jede Aufgabe verlinkt) und 7-Tage-Notfallplan. Prüfungsdatum optional (Europe/Vienna), unter 14 Tagen ist der 7-Tage-Tab vorgewählt. Abhaken persistiert, Home zeigt genau EINE Leiste (Countdown > Fortschritt > Hinweis — die homeHint()-Weiche verhindert Banner-Stapel). Tour um einen Schritt erweitert (jetzt 9).

**WP8 Selbst-Rating.** Im Self-check studio: vier Radiogroup-Segmented-Controls mit den sechs beschriebenen Stufen des offiziellen Rasters, Deskriptoren in „I…"-Form, Pfeiltasten-Bedienung. Das Rating wandert in den AI-Prompt („comment on where you agree and disagree").

**WP9 Neue Inhalte.** FAQ (15 Fragen), For-teachers-Seite (mit deutschem Eltern-Absatz), Hinweiskästen mit Link auf den offiziellen Aufgabenpool (matura.gv.at/downloads, live geprüft), und „The honest model": je ein bewusst mittelmäßiger Realtext für Essay und E-Mail mit 12 nummerierten Annotationen und Band-Einschätzung.

**WP10 Startseite.** Fortschritt + Countdown in einer Leiste mit „Next up"-Link (erste unbesuchte Sektion, dynamisch aus der NAV — zählt jetzt 17 Sektionen), Textsorten-Farben als linke Border auf Step- und Typ-Karten.

**WP11 Accessibility.** prefers-reduced-motion global (CSS + alle JS-Scrolls/Flips), sichtbarer Fokus-Ring, aria-live-Announcements konsequent (Copy/Quiz/Self-check/Flashcards), JSON-LD (LearningResource + FAQPage), robots.txt. axe-core: keine critical/serious Violations auf Home, Essay, Phrase Bank, Suche und Flashcards — Light und Dark.

**WP12 SEO-Prerender (Weg A, Hydration).** `_dev/build-prerender.mjs` erzeugt für alle 17 Sektionen `/<id>/index.html` mit vollem Inhalt, gerenderter Navigation als Linkgraph, eigenem title/description/canonical. Der Router übernimmt Pfade beim Boot per Hydration — kein Redirect, kein Flackern; `curl /essay/` liefert den kompletten Guide ohne JS, im Browser bleibt die URL `/essay/` und die App ist voll funktional. sitemap.xml listet 18 URLs. Der Service Worker behandelt Navigations-Requests network-first, überschreibt also keine Prerender-Pfade mit alter Shell.

## Fachliche Korrektur (bitte ansehen)

Die Overview-Seite zeigte bisher die Bänder „9–10 / 7–8 / **5–6** / 3–4 / 0–2". Der offizielle Raster (Begleittext 2023) beschreibt aber die Stufen 0/2/4/6/8/10, und **Stufe 6 ist das B2-Minimum, Stufe 5 bereits negativ** — „5–6 Satisfactory" hat die Bestehensgrenze verwischt. Die Overview zeigt jetzt sechs Bänder mit „6 · B2 minimum met" und erklärt die Zwischenstufen. Quelle: srdp_lfs_Bewertungsraster_B2_Begleittext_2023.pdf (matura.gv.at).

## Offene Review-Punkte für dich

1. **FAQ-Antworten** (js/pages-extra.js): Belegt über Begleittext 2023 bzw. matura.gv.at sind die Antworten zu ±10 %-Regel, Wörterbuch-Verbot (AHS), Veto, Relevanz erfundener Inhalte, gleichmäßiger Punkt-Behandlung, zentralen Terminen und Kompensationsprüfung. Als best practice mit „ask your teacher" formuliert (unbelegt, bitte prüfen): Stift/Tipp-Ex, Handschrift, BE/AE-Spelling, unfertige zweite Aufgabe, Titel im Word count, Aufgaben-Reihenfolge.
2. **132 Vokabel-Hints + 36 neue Kollokationen** (js/pages-tools.js, TOPIC_VOCAB) — alles neu geschrieben.
3. **Die zwei Realtexte** samt Annotationen und Band-Schätzungen (js/pages-extra.js, HONEST).
4. **Selbst-Rating-Deskriptoren** (js/selfrating.js) — aus dem offiziellen Raster abgeleitet, für Schüler:innen umformuliert.
5. **Plan-Didaktik** des Countdown plans (js/studyplan.js) — Wochenlogik und Tagesdosen nach bestem Wissen, aber du kennst deine Schüler:innen.

## Abweichungen vom Plan

Der Projektordner war kein Git-Repo (Deploy war manueller Upload) — die Commit-Historie liegt deshalb in `_dev/history.bundle`; die als GitHub-Action geplanten Schritte (SW-Bump, Prerender) sind dokumentierte Pflichtschritte im README. og-Tags fehlten komplett (nicht nur og:image). Die Quiz-Engine hatte die Review-Liste falscher Antworten schon — WP6 wurde entsprechend schlanker. Die Topic-Vokabeln hatten keine Verwendungsangaben; die Rückseiten der Flashcards sind daher neu geschrieben. Die Tour wurde nicht um FAQ/Teachers erweitert (9 Schritte reichen). Mobile Annotationen der Realtexte springen zur Notizliste statt inline aufzuklappen. Lighthouse lief nicht in der Sandbox (kein volles Chrome) — stattdessen axe-core, curl-Checks und die Playwright-Smoke-Matrix; ein Lighthouse-Lauf nach dem Deploy wäre ein guter Gegencheck.

## Screenshots

Vorher/Nachher in `_dev/screenshots/` (vorher-home-* vom 18.06-Stand, nachher-* von heute, dazu Essay mit TOC und Countdown plan).

## TODOs

1. `pdf/topic-vocabulary.pdf` deckt 8 von 11 Themen ab → neu bauen (TODO-Kommentar steht im Code).
2. Vor jedem Deploy: `node _dev/bump-sw.mjs` und `node _dev/build-prerender.mjs` (README, Abschnitt „Deploy").
3. Nach dem FAQ-Review: FAQPage-JSON-LD im Head von index.html mitziehen, falls sich Antworten ändern.
4. Wenn du das GitHub-Repo mal lokal klonst: `_dev/history.bundle` hineinmergen, dann existiert die ganze Historie auch dort, und die beiden Deploy-Schritte lassen sich als GitHub Action automatisieren.
5. Nach dem Deploy: Link-Vorschau testen (LinkedIn Post Inspector o. Ä.) und einmal Lighthouse auf https://matura.bernhardgmeiner.com/essay/.
