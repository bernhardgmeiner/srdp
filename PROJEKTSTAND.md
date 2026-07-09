# PROJEKTSTAND matura.bernhardgmeiner.com – Übergabe für neue Threads

Stand: 6. Juli 2026, Ende Ausbaustufe 2. **Neuer Thread? Diese Datei zuerst lesen, dann bei Bedarf ABSCHLUSSBERICHT.md (Details) und _dev/NOTES.md (technische Notizen).**

## Was das Projekt ist

„Don't Panic, It's Just the Matura" – interaktiver B2-Writing-Guide für die schriftliche Englisch-Matura (AHS), gebaut von Bernhard Gmeiner mit Claude. Gehostet auf GitHub Pages unter matura.bernhardgmeiner.com, Deploy = manueller Upload zu GitHub. Kein Framework, Vanilla JS, IBM-Carbon-Design, alles lokal (keine Datenerfassung).

## Stand nach Ausbaustufe 2 (alle 13 Arbeitspakete fertig, plus Review-Runde 1)

Die frühere Ein-Datei-Seite (296 KB index.html) ist jetzt modular: `css/main.css` + 12 Dateien in `js/` (core, boot, toc, search, pwa, flashcards, studyplan, selfrating, pages-main/-tools/-practice/-extra + 3 Daten-Dateien). Neu gebaut in Stufe 2: PWA (offline, installierbar, Service Worker `sw.js`, Update-Toast), og:image + komplette Meta/JSON-LD, globale Suche (Strg+K), On-this-page-TOC + Back-to-top, Quiz-Retry nur falscher Fragen + Versuchs-Verlauf, Leitner-Flashcards, 3 neue Vokabelthemen (jetzt 11 Themen × 12, alle 132 mit Hints), Countdown-Lernplan (Seite `studyplan`, 4 Wochen/7 Tage, `mwg_examdate`), SRDP-Selbst-Rating im Self-check (offizieller Raster, Stufen 0/2/4/6/8/10), FAQ-Seite (13 Fragen), For-teachers-Seite, zwei annotierte Realtexte („The honest model" bei Essay + E-Mail), Startseiten-Leiste (Countdown/Fortschritt/Next-up in EINER Leiste via homeHint()), Barrierefreiheit (axe-clean, reduced-motion, Fokus-Ringe), SEO-Prerender: 17 Unterordner `/<sektion>/index.html` + sitemap.xml (18 URLs) + robots.txt.

Wichtige fachliche Korrektur: Overview-Bänder an offiziellen Raster angepasst (Stufe 6 = B2-Minimum, 5 negativ; vorher stand „5–6 Satisfactory"). BMBWF wurde überall zu BMB. Em-Dashes in allen neuen Texten durch – ersetzt (Seitentitel-Muster „X — Matura Writing Guide B2" bewusst belassen).

## localStorage-Schema (Präfix mwg_)

mwg_theme, mwg_progress (visited/quiz je Sektion), mwg_tour_done, mwg_hint_seen, mwg_quizlog (letzte 5 Versuche je Quiz), mwg_flash (Leitner-Boxen), mwg_flash_meta (Session-Zähler), mwg_flash_hint, mwg_examdate (YYYY-MM-DD), mwg_plan (Checkboxen). Jeder Zugriff über M.store() mit try/catch.

## Architektur-Regeln

window.MWG-Namespace, window.PAGES[id] = {title, track, render(), wire()}, NAV-Array in core.js, Hash-Routing + Pfad-Hydration beim Boot (boot.js erkennt /essay/ usw., kein Redirect), Event-Delegation über data-action in boot.js, neue Features als neue js/-Datei. Design-Tokens in css/main.css (light: --primary #0043ce Links / --primary-bg #0f62fe Buttons). Inhalte in window.SRDP (data-*.js) bzw. TOPIC_VOCAB (pages-tools.js, Format {w, hint}), FAQ/HONEST in pages-extra.js.

## Deploy-Ablauf (steht auch im README)

Vor jedem Upload: `node _dev/bump-sw.mjs` (neue SW-Version, sonst sehen Wiederkehrende alte Inhalte) und `node _dev/build-prerender.mjs` (regeneriert die 17 Sektions-Ordner + sitemap; braucht playwright-core). Beides erledigt Claude in der Sitzung – Bernhard lädt danach nur hoch (alles außer `_dev/`, `ABSCHLUSSBERICHT.md`, `PROJEKTSTAND.md`). Für den Stand vom 6.7. sind beide Schritte bereits gelaufen, Upload kann direkt erfolgen.

## Arbeitsumgebungs-Fallen (wichtig für Claude im neuen Thread!)

1. **Git funktioniert NICHT direkt im eingebundenen Projektordner** (Unlink gesperrt). Workflow: Ordner nach ~/mwg in der Sandbox spiegeln (rsync), dort committen (ein Commit pro Arbeitspaket), danach `git bundle create "<Ordner>/_dev/history.bundle" main`. Historie liegt in `_dev/history.bundle` (17 Commits bis inkl. Abschlussbericht).
2. **Sync-Falle:** Dateien, die von der Sandbox aus erstellt/geschrieben wurden, nehmen anschließende Host-Edits (Edit/Write-Tool) im Sandbox-Blick nicht an → Konsistenz-Regel: Code-Änderungen ENTWEDER komplett sandbox-seitig (python-Patches via bash) ODER, wenn die Sandbox nicht läuft, komplett mit Edit/Write. Nicht mischen.
3. Sandbox-Setup für Tests: playwright-core in ~/tools, Chromium-headless-shell + libXdamage (Details _dev/NOTES.md). Smoke-Test: `bash _dev/run-smoke.sh --pages home,essay --tour`. og-Bild: `node _dev/make-og.mjs`.

## Offene Punkte

1. **Nächste Sitzung mit funktionierender Sandbox:** `node _dev/build-prerender.mjs` einmal laufen lassen – in 16 Prerender-Ordnern steckt im unsichtbaren JSON-LD noch der alte FAQ-Stand (15 statt 13 Fragen, Em-Dashes); ebenso Em-Dashes in den Honest-Model-Prerendern von essay/ und email/. Quellen sind korrigiert, nur die generierten Ordner sind stale. Danach Review-Änderungen ins history.bundle nachcommitten.
2. `pdf/topic-vocabulary.pdf` deckt 8 von 11 Themen ab → neu bauen.
3. Fachlicher Review durch Bernhard offen (Liste in ABSCHLUSSBERICHT.md): FAQ-Antworten (6 davon unbelegt/best practice), 132 Vokabel-Hints, 2 Realtexte samt Band-Schätzungen, Selbst-Rating-Deskriptoren, Lernplan-Didaktik.
4. Em-Dashes in ÄLTEREN Bestandstexten (Modelltexte, Checklisten) wurden nicht angerührt – bei Bedarf eigener Durchgang.
5. Nach dem Upload: Live-Check, Link-Vorschau testen, sitemap.xml in der Search Console einreichen (Domain-Property deckt Subdomain ab), einmal Lighthouse auf /essay/.

## Bernhards Präferenzen fürs Projekt (aus der Zusammenarbeit)

Einfache, jargonfreie Erklärungen auf Deutsch; keine Em-Dashes in Texten (– mit Leerzeichen); Doppelpunkt-Gendern in deutschen Texten; Lerninhalte auf Englisch, B2, direkt und leicht humorvoll, nie belehrend; ehrliche „ask your teacher"-Antworten statt erfundener Fakten; er lädt selbst zu GitHub hoch, Claude bereitet vor.
