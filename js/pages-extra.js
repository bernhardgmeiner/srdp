/* ════════════════════════════════════════════════════════════
   Pages 4 – FAQ · For teachers · The honest model · Archiv-Links
   ════════════════════════════════════════════════════════════ */
(function () {
'use strict';
const M = window.MWG;
const { esc, sectionLabel, pageHead } = M;

/* ─── FAQ ─────────────────────────────────────────────────── */
/* Quellen: matura.gv.at (LFS-Seite, Stand 2026), Begleittext zum
   SRDP-Bewertungsraster B2 (2023). Antworten ohne offizielle Quelle
   sind als best practice formuliert – Details siehe _dev/NOTES.md */
const FAQ = SRDP.faq;

PAGES.faq = {
  title: 'FAQ', track: 'faq',
  render() {
    return '<div class="page">' +
      pageHead('Learn', 'FAQ', 'Questions students ask before the writing exam, with short answers. Where something depends on your school, the answer says so.') +
      '<div class="wrap"><div class="gap-s"></div>' +
        '<div class="acc">' + FAQ.filter(f => !f.schools || f.schools.indexOf(M.school()) >= 0).map((f, i) =>
          '<div class="acc-item"><button class="acc-head" data-action="acc" aria-expanded="false"><span class="pm">+</span><span>' + esc(f.q) + '</span></button>' +
          '<div class="acc-body"><p class="faq-a">' + esc(typeof f.a === 'function' ? f.a() : f.a) + '</p></div></div>').join('') +
        '</div>' +
        '<div class="tip mt-6">Your school organises the exam day. If your teacher&rsquo;s answer differs from this page, follow your teacher.</div>' +
        '<div class="page-end"></div>' +
      '</div></div>';
  },
};
M.FAQ_DATA = FAQ;

/* ─── FOR TEACHERS ────────────────────────────────────────── */
PAGES.teachers = {
  title: 'For teachers', track: 'teachers',
  render() {
    return '<div class="page">' +
      pageHead('About', 'For teachers', 'What this site is and how you can use it in class. Everything here is free to use.') +
      '<div class="wrap"><div class="gap-s"></div>' +
        sectionLabel('What this is') +
        '<p class="lead-sm mb-4">A free, independent site for learning the text types of the written English Matura (AHS and BHS, B2), from the 5th class to the Matura itself. Students use it in class, for homework and before Schularbeiten. It was built by <a href="https://www.bernhardgmeiner.com" target="_blank" rel="noopener">Bernhard Gmeiner</a>, an English teacher in Vienna, together with Claude, an AI model by Anthropic. It is based on the official SRDP documents: the B2 assessment scale (2023 revision), the descriptions of the text types, and the rules on word count and the veto. From these it builds guides, model texts, quizzes and practice tools for students working on their own.</p>' +
        '<p class="lead-sm">There are no accounts and no tracking. Progress is saved only in the student&rsquo;s own browser.</p>' +
        '<div class="gap-s"></div>' +
        sectionLabel('Use it freely') +
        '<p class="lead-sm">You may use everything here in class: project it, share links to single sections, print or copy the PDFs, or put the URL on Moodle, Google Classroom or MS Teams. You do not need to ask. A short mention of the source is welcome but not required.</p>' +
        '<div class="gap-s"></div>' +
        sectionLabel('Four ideas for your classroom') +
        '<div class="grid g-auto-240">' +
          [['Task bank for Schularbeit practice', 'The Matura-style tasks in the <a href="#taskbank">task bank</a> come with input material and operators, ready for timed writing. The random button picks a topic in one click.'],
           ['Mock exam in class', 'The <a href="#timer">mock exam</a> suggests a full set of tasks for AHS or BHS and runs the exam clock. Afterwards each student checks their text in the self-check.'],
           ['Self-check in pairs', 'Before texts reach your desk, students run them through the <a href="#selfcheck">self-check</a> and rate themselves on the four official criteria. Pairs compare their ratings first and discuss where they differ.'],
           ['Study plan before a Schularbeit', 'In the <a href="#studyplan">study plan</a>, students enter the date of the Schularbeit and the text types, and get a day-by-day plan: guide, model text, a practice text, self-check. For the Matura there are four-week, two-week and seven-day plans.']
          ].map(c => '<div class="card"><div class="card-title">' + c[0] + '</div><div class="card-desc">' + c[1] + '</div></div>').join('') +
        '</div>' +
        '<div class="gap-s"></div>' +
        sectionLabel('Found a mistake?') +
        '<p class="lead-sm">Corrections from colleagues help a lot. If a fact, a model text or a quiz answer looks wrong, <a href="mailto:bernhard.gmeiner@gmail.com?subject=Matura%20Guide%20Feedback">send a short e-mail</a> and name the section. More about me at <a href="https://www.bernhardgmeiner.com" target="_blank" rel="noopener">bernhardgmeiner.com</a>.</p>' +
        '<div class="gap-s"></div>' +
        '<h2 class="section-label" lang="de">Für Eltern</h2>' +
        '<p class="lead-sm" lang="de">Für Eltern gibt es eine eigene Seite auf Deutsch: was diese Seite ist, was mit den Daten passiert und wie Sie Ihr Kind unterstützen können. <a href="#parents">Zur Elternseite</a></p>' +
        '<div class="page-end"></div>' +
      '</div></div>';
  },
};

PAGES.parents = {
  title: 'Für Eltern & Datenschutz', track: 'parents',
  render() {
    return '<div class="page" lang="de">' +
      pageHead('Über die Seite', 'Für Eltern &amp; Datenschutz', 'Was diese Seite ist, was mit den Daten Ihres Kindes passiert und wie Sie unterstützen können.') +
      '<div class="wrap" lang="de" style="max-width:760px"><div class="gap-s"></div>' +
        sectionLabel('Was diese Seite ist') +
        '<p class="lead-sm mb-4">Eine kostenlose, unabhängige Seite zum Lernen der Textsorten für die schriftliche Englisch-Matura (AHS und BHS, Niveau B2). Sie begleitet durch die ganze Oberstufe: im Unterricht, bei Hausübungen, vor Schularbeiten und vor der Matura. Gemacht von <a href="https://www.bernhardgmeiner.com" target="_blank" rel="noopener">Bernhard Gmeiner</a>, einem Englischlehrer aus Wien. Sie orientiert sich an den offiziellen SRDP-Unterlagen des Bildungsministeriums, ist aber kein offizielles Dokument des BMB. Sie ergänzt den Unterricht.</p>' +
        '<div class="gap-s"></div>' +
        sectionLabel('Datenschutz – kurz und ehrlich') +
        '<p class="lead-sm mb-3">Es gibt kein Konto und keine Anmeldung, keine Werbung und kein Tracking. Der Lernfortschritt Ihres Kindes (besuchte Seiten, Quizergebnisse, Lernplan, Prüfungsdatum) wird nur im Browser auf dem jeweiligen Gerät gespeichert und an keinen Server geschickt. Werden die Browserdaten gelöscht oder wird das Gerät gewechselt, ist der Fortschritt weg. Das ist der Preis dafür, dass die Daten das Gerät nicht verlassen. Die Seite liegt bei GitHub Pages (USA). Wie bei fast jeder Website speichert der Hoster beim Aufruf technisch bedingt die IP-Adresse in Server-Logs. Sonst wird nichts erhoben.</p>' +
        '<p class="lead-sm mb-3">Es gibt eine freiwillige KI-Funktion: Der Self-check erstellt auf Wunsch einen fertigen Prompt (eine Anfrage samt Übungstext), den Ihr Kind selbst in ein KI-Werkzeug wie ChatGPT oder Claude kopieren kann, um Übungs-Feedback zu bekommen. Erst dann verlässt der eingefügte Text das Gerät und geht an den jeweiligen Anbieter. Deshalb rät die Seite: nur Übungstexte verwenden, keine echten Namen und keine persönlichen Daten. Hat Ihre Schule eigene Regeln zum Einsatz von KI, gelten diese zuerst. In der Matura selbst sind KI-Werkzeuge nicht erlaubt.</p>' +
        '<p class="lead-sm mb-3">Der Fortschritt liegt nur auf dem Gerät, auf dem Ihr Kind lernt. Löschen lässt er sich deshalb nur dort: mit dem Button „Reset my progress on this device“ unten auf jeder Seite, oder mit diesem Button hier, wenn Sie gerade dieses Gerät benutzen.</p>' +
        '<button class="btn btn-ghost" data-action="reset-progress" data-lang="de">Fortschritt auf diesem Gerät löschen</button>' +
        '<div class="gap-s"></div>' +
        sectionLabel('Wie Sie unterstützen können') +
        '<p class="lead-sm mb-3">Am meisten hilft Regelmäßigkeit: lieber viele kurze Einheiten als ein langer Abend vor der Prüfung. Im <a href="#studyplan">Lernplan</a> kann Ihr Kind das Datum der nächsten Schularbeit samt Textsorten oder das Matura-Datum eintragen. Dann zeigt die Seite jeden Tag, was dran ist. Der Haupttermin für die schriftliche Englisch-Matura 2027 ist Dienstag, der 11. Mai 2027. Fragen Sie Ihr Kind, was es gerade übt: etwas erklären zu müssen ist die halbe Miete. Und setzen Sie Ihr Kind nicht unter Druck. Die Lerninhalte sind auf Englisch (das ist Absicht), diese Seite hier ist für Sie auf Deutsch.</p>' +
        '<div class="gap-s"></div>' +
        sectionLabel('Kein Ersatz für den Unterricht') +
        '<p class="lead-sm mb-3">Bewertet wird in der echten Matura ausschließlich von den Lehrer:innen Ihres Kindes mit der offiziellen Skala. Wo etwas von der Schule abhängt, steht das auf der Seite dabei. Im Zweifel zählt immer die Auskunft der Lehrkraft, nicht diese Seite.</p>' +
        '<div class="gap-s"></div>' +
        sectionLabel('Kontakt / Impressum') +
        '<p class="lead-sm">Bernhard Gmeiner, Wien · <a href="mailto:bernhard.gmeiner@gmail.com">bernhard.gmeiner@gmail.com</a> · <a href="https://www.bernhardgmeiner.com" target="_blank" rel="noopener">bernhardgmeiner.com</a>. Privates, nichtkommerzielles Projekt. Fehler gefunden? Eine kurze E-Mail hilft, die Seite besser zu machen.</p>' +
        '<div class="page-end"></div>' +
      '</div></div>';
  },
};

/* ─── GEMINI NOTEBOOK STUDY COMPANION (frueher NotebookLM) ─────────────────────────── */
PAGES.notebooklm = {
  title: 'Gemini Notebook study companion', track: 'notebooklm',
  render() {
    const NB = 'https://notebook.google.com/notebook/408309a8-0d35-414b-b7f5-9f6ba1a6b959';
    const cta = '<div class="my-cta"><a class="btn btn-primary" href="' + NB + '" target="_blank" rel="noopener">Open the Gemini Notebook <span>&rarr;</span></a></div>';
    const card = (h, b) => '<div class="card"><div class="card-title">' + h + '</div><div class="card-desc">' + b + '</div></div>';
    const ask = [
      M.school() === 'bhs' ? 'What is the difference between a leaflet and an article?' : 'What is the difference between an essay and an article?',
      'How do I start a letter to the editor?',
      'Grade this text like an examiner: &hellip;',
      'Give me a 250-word report task to practise, then a checklist for it.',
    ];
    const know = [
      'You need to be signed in to a Google account to use it.',
      'Its feedback is practice help. In the real Matura only your teachers assess your texts, using the official scale.',
      'Use it for practice only. AI tools are not allowed in the exam itself.',
      'Please do not paste real names or personal data into the chat, and follow your school&rsquo;s own rules on using AI first.',
      'The notebook is updated together with this guide, so new explainers appear from time to time.',
    ];
    return '<div class="page">' +
      pageHead('About', 'Gemini Notebook study companion', 'An AI study helper that knows this whole guide. Ask it questions about the writing exam, or listen to a short audio explainer on the way to school.') +
      '<div class="wrap"><div class="gap-s"></div>' +
        sectionLabel('What it is') +
        '<p class="lead-sm mb-4">Gemini Notebook (formerly NotebookLM) is a free tool from Google. Its only sources are the pages of this guide. It answers from this material and shows where each answer comes from, so it is less likely to invent rules. It can still be wrong, so check important points on this site or with your teacher. You can chat with it in your own words or open one of the ready-made explainers.</p>' +
        cta +
        sectionLabel('What is already inside') +
        '<div class="grid g-auto-240">' +
          card('Audio explainers', 'A short &ldquo;How to&hellip;&rdquo; brief for each text type, a longer interactive deep dive on the whole writing exam, a general overview, and a separate episode in German for parents. Press play and listen.') +
          card('A revision guide', 'A written study guide that pulls the whole guide into one place, ready to read through in one sitting.') +
          card('Flashcards', 'Ready-made flashcards for quick self-testing on vocabulary, text-type conventions and grammar.') +
          card('A mind map', 'A visual mind map that shows how the text types, grammar and skills fit together.') +
        '</div>' +
        '<div class="gap-s"></div>' +
        sectionLabel('How to use it') +
        '<p class="lead-sm">Open the notebook and sign in with a Google account. Then type a question into the chat, or press play on one of the audio explainers. A few things worth asking:</p>' +
        '<ul class="lead-sm list">' + ask.map(q => '<li>&ldquo;' + q + '&rdquo;</li>').join('') + '</ul>' +
        '<div class="gap-s"></div>' +
        sectionLabel('Good to know') +
        '<ul class="lead-sm list">' + know.map(k => '<li>' + k + '</li>').join('') + '</ul>' +
        '<div class="tip mt-5" lang="de">F&uuml;r Eltern: Eine eigene Audio-Folge erkl&auml;rt die Pr&uuml;fung auf Deutsch, direkt im Notebook.</div>' +
        cta +
        '<div class="page-end"></div>' +
      '</div></div>';
  },
};


/* ─── THE HONEST MODEL (annotierte Realtexte) ─────────────── */
const HONEST = SRDP.honest;

function honestModel(typeId) {
  const h = HONEST[typeId];
  if (!h) return '';
  let n = 0;
  const paras = h.paras.map(p => {
    const html = esc(p).replace(/\{\{(\d+)\}\}/g, (_, num) =>
      '<button class="hm-mark" data-action="hm-jump" data-type="' + typeId + '" data-n="' + num + '" aria-label="Annotation ' + num + '">' + num + '</button>');
    const mono = p.indexOf('To:') === 0 || p.indexOf('by ') === 0;
    return '<p' + (mono ? ' class="mono-line"' : '') + '>' + html.replace(/\n/g, '<br>') + '</p>';
  }).join('');
  return '<div class="gap-s"></div>' +
    '<div class="acc"><div class="acc-item"><button class="acc-head" data-action="acc" aria-expanded="false"><span class="pm">+</span><span>The honest model: a realistic text and what it costs</span></button>' +
    '<div class="acc-body">' +
      '<h3 class="sm-title">' + esc(h.title) + '</h3>' +
      '<div class="sm-meta">' + esc(h.meta) + '</div>' +
      '<p class="sm-intro">' + esc(h.intro) + '</p>' +
      '<div class="hm-grid">' +
        '<div class="hm-text" id="hmText-' + typeId + '">' + paras + '</div>' +
        '<ol class="hm-notes" id="hmNotes-' + typeId + '">' + h.notes.map((x, i) =>
          '<li id="hmNote-' + typeId + '-' + (i + 1) + '"><span class="hm-num">' + (i + 1) + '</span>' + esc(x) + '</li>').join('') + '</ol>' +
      '</div>' +
      '<div class="tip mt-4"><strong>Where would this land? · </strong>' + esc(h.verdict) + '</div>' +
    '</div></div></div>';
}
M.honestModel = honestModel;

M.hmJump = function (el) {
  const note = document.getElementById('hmNote-' + el.dataset.type + '-' + el.dataset.n);
  if (!note) return;
  note.setAttribute('tabindex', '-1'); try { note.focus({ preventScroll: true }); } catch (e) {}
  try { note.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' }); } catch (e) {}
  note.classList.add('search-hit');
  setTimeout(() => note.classList.remove('search-hit'), 2000);
};
})();
