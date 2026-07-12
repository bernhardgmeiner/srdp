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
const FAQ = [
  { q: "What happens if I write too few or too many words?",
    a: "The tolerance is ±10%. For a task of around 250 words that means 225–275. If you are outside that range, your Task Achievement score officially drops by one band – that is written into the assessment grid. Nobody fails because of word count alone, but why give away a band? Practise estimating your word count from your handwriting: count one full line, count the lines, multiply." },
  { q: "Do contractions (don't, it's) really cost marks?",
    a: "Not automatically. The grid rates whether your register fits the text type. In a blog or an informal e-mail, contractions are exactly right. In a report or a formal e-mail they pull your register down – one won't sink you, but a text full of them tells the examiner you can't hear the difference. Decide once before you write: formal or informal? Then commit." },
  { q: "Can I use a dictionary?",
    a: "It depends on your school type. At AHS, dictionaries and reference works – electronic ones included – are not allowed anywhere in the exam. At BHS, (electronic) dictionaries are allowed, but only during the Writing section. Either way, the tasks are built so that B2 vocabulary is enough: when a word will not come, paraphrase it – the grid rewards that." },
  { q: "What if I completely misread the task?",
    a: "The only true disaster is a text that ignores the set task altogether – an off-topic text or one that was obviously prepared in advance. That triggers the official VETO rule: Task Achievement is rated 0 and the other three criteria are not assessed at all. Writing the wrong text type alone does NOT trigger the veto, but it costs you heavily in Task Achievement. Your insurance policy costs 60 seconds: read the task twice and underline text type, audience and the three bullet points." },
  { q: "Can I invent facts, numbers and personal experiences?",
    a: "Yes. This is a language exam, not a fact check. The official guidance says content counts as relevant when it serves the task – even if it's not what the examiner expected. An invented survey, a made-up summer job in Italy: all fine, as long as it is plausible and actually develops the bullet point. What doesn't help is padding that ignores the task." },
  { q: "Do British and American spelling both count?",
    a: "Both are generally accepted, though this is not spelled out in the official rules – colour or color, organise or organize. What you should avoid is mixing systems mid-text, because inconsistency starts to look like guessing. Pick the one you actually know (for most Austrian students that's British) and stay with it. If you want certainty for your school, verify this one with your teacher." },
  { q: "What if I don't finish a task?",
    a: "An unfinished text is not an automatic zero – it is assessed with the same grid, and whatever stands on the page earns what it earns. But an incomplete text usually bleeds marks in Task Achievement (undeveloped content points) and Coherence (no ending). The rescue strategy is time management: set finishing times for each task before you start writing, and if time gets short, a short, complete text beats a long, unfinished one." },
  { q: "How exact is 'around 400 words'?", schools: ['ahs'],
    a: "Exactly ±10% – that is the official rule, not folklore. 'Around 400' means 360–440 is safe; 'around 250' means 225–275. Inside the range, nobody counts pedantically. Outside it, Task Achievement drops one band. Note that more is not better anyway: hitting the range with dense, relevant content scores higher than 480 words of padding." },
  { q: "Can I write more than the three bullet points ask for?",
    a: "You can – extra relevant ideas are not punished. But the grid rewards developing all three given points in roughly equal depth. Every sentence you spend on a fourth idea is a sentence missing from the three that are actually being assessed, and it pushes you towards the word limit. Treat the three bullet points as the skeleton of your text; add extras only when all three stand solid." },
  { q: "Is the title part of the word count?",
    a: "There is no clear public rule on this, and counting practice can differ. The pragmatic answer: a title is four to eight words, so it almost never decides anything. If you are near the edge of the ±10% range, the title is not what saves you – cutting waffle is. If you want the exact counting convention for your school, ask your teacher." },
  { q: "Which task should I write first?",
    a: "Your choice – the booklet does not care about order. Give each task a planned time slot before you start, begin with the text type you feel most confident about, and keep a few minutes at the end to proofread all of them. Decide your order before exam day, not during it." },
  { q: "Are the tasks the same at every school?",
    a: "Yes. The written Matura is standardised: the tasks come centrally from the BMB, and every candidate in your school type opens the same booklet on the same day at the same time. That is good news for you – it is exactly why the released past papers are such honest practice material." },
  { q: "What happens if my written exam is negative?",
    a: "It is not the end of the road. A negative Klausur can be repeated, and there is also the option of a mündliche Kompensationsprüfung – an oral compensation exam that can turn the grade around. Your teachers will walk you through the exact procedure if it ever comes to that. Plan A, of course, is this guide." },
];

PAGES.faq = {
  title: 'FAQ', track: 'faq',
  render() {
    return '<div class="page">' +
      pageHead('Basics', 'FAQ', 'The questions students actually ask before the writing exam – answered short and straight. Where something depends on your school, we say so instead of guessing.') +
      '<div class="wrap"><div class="gap-s"></div>' +
        '<div class="acc">' + FAQ.filter(f => !f.schools || f.schools.indexOf(M.school()) >= 0).map((f, i) =>
          '<div class="acc-item"><button class="acc-head" data-action="acc" aria-expanded="false"><span class="pm">+</span><span>' + esc(f.q) + '</span></button>' +
          '<div class="acc-body"><p style="font-size:.9375rem;color:var(--text-secondary);line-height:1.65;padding:10px 0 4px">' + esc(typeof f.a === 'function' ? f.a() : f.a) + '</p></div></div>').join('') +
        '</div>' +
        '<div class="tip" style="margin-top:26px">Rules around exam-day logistics are applied by your school&rsquo;s exam team. When in doubt, your teacher&rsquo;s answer beats this page.</div>' +
        '<div style="height:72px"></div>' +
      '</div></div>';
  },
};
M.FAQ_DATA = FAQ;

/* ─── FOR TEACHERS ────────────────────────────────────────── */
PAGES.teachers = {
  title: 'For teachers', track: 'teachers',
  render() {
    return '<div class="page">' +
      pageHead('About', 'For teachers', 'What this site is, and how to use it in your classroom. Short version: take it, it&rsquo;s free.') +
      '<div class="wrap"><div class="gap-s"></div>' +
        sectionLabel('What this is') +
        '<p style="font-size:1rem;color:var(--text-secondary);line-height:1.65;max-width:720px;margin-bottom:14px">A free, independent revision site for the writing part of the English Matura (AHS and BHS, B2), built by <a href="https://www.bernhardgmeiner.com" target="_blank" rel="noopener">Bernhard Gmeiner</a>, an English teacher in Vienna, with the help of Claude Cowork. It follows the official SRDP documents – the B2 assessment grid (2023 revision), the text type characteristics, the ±10% rule, the veto rule – and turns them into guides, model texts, quizzes and practice tools that students can use on their own.</p>' +
        '<p style="font-size:1rem;color:var(--text-secondary);line-height:1.65;max-width:720px">No accounts, no tracking, no ads. Progress lives in the student&rsquo;s own browser and nowhere else.</p>' +
        '<div class="gap-s"></div>' +
        sectionLabel('Use it freely') +
        '<p style="font-size:1rem;color:var(--text-secondary);line-height:1.65;max-width:720px">Everything here may be used in class: project it, share links to individual sections, print or copy the PDFs, put the URL on your Moodle, Google Classroom or MS Teams page. No permission needed, no strings attached. A short mention of the source is appreciated, never required.</p>' +
        '<div class="gap-s"></div>' +
        sectionLabel('Three ideas for your classroom') +
        '<div class="grid g-auto-240">' +
          [['Task bank as Schularbeit prep', 'The Matura-style tasks in the <a href="#taskbank">Task bank</a> come with source material and operators, ready for timed writing sessions. The random button settles the &ldquo;which topic&rdquo; discussion in one click.'],
           ['Self-check as a peer ritual', 'Before texts reach your desk, students run them through the <a href="#selfcheck">Self-check studio</a> and rate themselves on the four official criteria. Peer pairs compare ratings first – the arguments they have are half the learning.'],
           ['Countdown plan as a frame', 'The <a href="#studyplan">Countdown plan</a> gives the last four weeks before the Klausur a day-by-day structure. Assign it as the homework skeleton and spend lesson time on feedback instead of organisation.']
          ].map(c => '<div class="card"><div style="font-weight:600;margin-bottom:8px">' + c[0] + '</div><div style="font-size:.875rem;color:var(--text-secondary);line-height:1.6">' + c[1] + '</div></div>').join('') +
        '</div>' +
        '<div class="gap-s"></div>' +
        sectionLabel('Found a mistake?') +
        '<p style="font-size:1rem;color:var(--text-secondary);line-height:1.65;max-width:720px">Corrections from colleagues are gold. If a fact, a model text or a quiz answer looks off, <a href="mailto:bernhard.gmeiner@gmail.com?subject=Matura%20Guide%20Feedback">send a short e-mail</a> naming the section. More about me at <a href="https://www.bernhardgmeiner.com" target="_blank" rel="noopener">bernhardgmeiner.com</a>.</p>' +
        '<div class="gap-s"></div>' +
        sectionLabel('Für Eltern') +
        '<p lang="de" style="font-size:1rem;color:var(--text-secondary);line-height:1.65;max-width:720px">Diese Seite hilft Ihrem Kind bei der Vorbereitung auf die schriftliche Englisch-Matura (AHS oder BHS, Niveau B2). Sie ist kostenlos, werbefrei und speichert keine Daten auf Servern – der Lernfortschritt bleibt im Browser Ihres Kindes. Die Inhalte orientieren sich an den offiziellen Unterlagen des Bildungsministeriums. Bewertet wird in der echten Matura von den Lehrer:innen Ihres Kindes mit der offiziellen Skala; diese Seite ersetzt keinen Unterricht, sie ergänzt ihn.</p>' +
        '<div style="height:72px"></div>' +
      '</div></div>';
  },
};

PAGES.parents = {
  title: 'Für Eltern & Datenschutz', track: 'parents',
  render() {
    return '<div class="page">' +
      pageHead('Über die Seite', 'Für Eltern &amp; Datenschutz', 'Was diese Seite ist, was mit den Daten Ihres Kindes passiert und wie Sie unterstützen können.') +
      '<div class="wrap" lang="de" style="max-width:760px"><div class="gap-s"></div>' +
        sectionLabel('Was diese Seite ist') +
        '<p style="font-size:1rem;color:var(--text-secondary);line-height:1.65;margin-bottom:14px">Eine kostenlose, unabhängige Übungsseite für den schriftlichen Teil der Englisch-Matura (AHS und BHS, Niveau B2), gemacht von <a href="https://www.bernhardgmeiner.com" target="_blank" rel="noopener">Bernhard Gmeiner</a>, einem Englischlehrer aus Wien. Sie orientiert sich an den offiziellen SRDP-Unterlagen des Bildungsministeriums, ist aber kein offizielles Dokument des BMB. Sie ergänzt den Unterricht, sie ersetzt ihn nicht.</p>' +
        '<div class="gap-s"></div>' +
        sectionLabel('Datenschutz – kurz und ehrlich') +
        '<p style="font-size:1rem;color:var(--text-secondary);line-height:1.65;margin-bottom:12px">Kein Konto, keine Anmeldung, keine Werbung, kein Tracking. Der Lernfortschritt Ihres Kindes (besuchte Seiten, Quizergebnisse, Lernplan, Prüfungsdatum) wird ausschließlich lokal im Browser auf diesem Gerät gespeichert und an keinen Server geschickt. Wird der Browser geleert oder das Gerät gewechselt, ist der Fortschritt weg – das ist der Preis dafür, dass keine Daten das Gerät verlassen. Die Seite selbst liegt bei GitHub Pages (USA); beim Aufruf verarbeitet der Hoster – wie bei praktisch jeder Website – technisch bedingt die IP-Adresse in Server-Logs. Sonst wird nichts erhoben.</p>' +
        '<p style="font-size:1rem;color:var(--text-secondary);line-height:1.65;margin-bottom:12px">Es gibt eine freiwillige KI-Funktion: Der Self-check erstellt auf Wunsch einen fertigen Text, den Ihr Kind selbst in ein KI-Werkzeug wie ChatGPT oder Claude kopieren kann, um Übungs-Feedback zu bekommen. Erst dann, und nur dann, verlässt der eingefügte Text dieses Gerät und geht an den jeweiligen Anbieter. Deshalb der Rat auf der Seite: nur Übungstexte verwenden, keine echten Namen oder persönlichen Daten. Ihre Schule kann außerdem eigene Regeln zum Einsatz von KI haben; die gelten zuerst.</p>' +
        '<p style="font-size:1rem;color:var(--text-secondary);line-height:1.65;margin-bottom:10px">Du kannst den gespeicherten Lernfortschritt jederzeit hier löschen.</p>' +
        '<button class="btn btn-ghost" data-action="reset-progress">Fortschritt auf diesem Gerät zurücksetzen</button>' +
        '<div class="gap-s"></div>' +
        sectionLabel('Wie Sie unterstützen können') +
        '<p style="font-size:1rem;color:var(--text-secondary);line-height:1.65;margin-bottom:12px">Am meisten hilft Regelmäßigkeit: lieber viele kurze Einheiten als ein langer Abend vor der Prüfung. Tragen Sie gemeinsam das Prüfungsdatum im <a href="#studyplan">Countdown-Lernplan</a> ein, dann zeigt die Seite jeden Tag, was dran ist. Fragen Sie Ihr Kind, was es gerade übt: etwas erklären zu müssen ist die halbe Miete. Und: kein Druck. Die Lerninhalte sind auf Englisch (das ist Absicht), diese Seite hier ist für Sie auf Deutsch.</p>' +
        '<div class="gap-s"></div>' +
        sectionLabel('Kein Ersatz für den Unterricht') +
        '<p style="font-size:1rem;color:var(--text-secondary);line-height:1.65;margin-bottom:12px">Bewertet wird in der echten Matura ausschließlich von den Lehrer:innen Ihres Kindes mit der offiziellen Skala. Wo etwas von der Schule abhängt, steht das auf der Seite dabei. Im Zweifel zählt immer die Auskunft der Lehrkraft, nicht diese Seite.</p>' +
        '<div class="gap-s"></div>' +
        sectionLabel('Kontakt / Impressum') +
        '<p style="font-size:1rem;color:var(--text-secondary);line-height:1.65">Bernhard Gmeiner, Wien · <a href="mailto:bernhard.gmeiner@gmail.com">bernhard.gmeiner@gmail.com</a> · <a href="https://www.bernhardgmeiner.com" target="_blank" rel="noopener">bernhardgmeiner.com</a>. Privates, nichtkommerzielles Projekt. Fehler gefunden? Eine kurze E-Mail hilft, die Seite besser zu machen.</p>' +
        '<div style="height:72px"></div>' +
      '</div></div>';
  },
};

/* ─── NOTEBOOKLM STUDY COMPANION ─────────────────────────── */
PAGES.notebooklm = {
  title: 'NotebookLM study companion', track: 'notebooklm',
  render() {
    const NB = 'https://notebooklm.google.com/notebook/408309a8-0d35-414b-b7f5-9f6ba1a6b959';
    const cta = '<div style="margin:18px 0"><a class="btn btn-primary" href="' + NB + '" target="_blank" rel="noopener">Open the NotebookLM notebook <span>&rarr;</span></a></div>';
    const card = (h, b) => '<div class="card"><div style="font-weight:600;margin-bottom:8px">' + h + '</div><div style="font-size:.875rem;color:var(--text-secondary);line-height:1.6">' + b + '</div></div>';
    const P = 'font-size:1rem;color:var(--text-secondary);line-height:1.65;max-width:720px';
    const ask = [
      'What is the difference between an essay and an article?',
      'How do I start a letter to the editor?',
      'Grade this text like an examiner: &hellip;',
      'Give me a 250-word report task to practise, then a checklist for it.',
    ];
    const know = [
      'You need to be signed in to a Google account to use it.',
      'It is a practice aid, not an official grade. In the real Matura only your teachers assess, using the official scale.',
      'Please do not paste real names or personal data into the chat, and follow your school&rsquo;s own rules on using AI first.',
      'The notebook is kept in step with this guide and grows over time, so new explainers and material show up now and then. Worth checking back.',
    ];
    return '<div class="page">' +
      pageHead('About', 'NotebookLM study companion', 'An AI study buddy that has read this whole guide. Ask it anything about the writing exam, or just listen to a short explainer on the way to school.') +
      '<div class="wrap"><div class="gap-s"></div>' +
        sectionLabel('What it is') +
        '<p style="' + P + ';margin-bottom:14px">NotebookLM is a free tool from Google. This notebook has been given the entire content of this guide as its sources, and nothing else. That is the point: it answers from this material and links back to where each answer comes from, so it stays close to what the Matura actually rewards instead of inventing rules. You can chat with it in your own words, or open one of the ready-made explainers.</p>' +
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
        '<p style="' + P + '">Open the notebook and sign in with a Google account. Then type a question into the chat, or press play on one of the audio explainers. A few things worth asking:</p>' +
        '<ul style="' + P + ';padding-left:20px">' + ask.map(q => '<li style="margin:6px 0">&ldquo;' + q + '&rdquo;</li>').join('') + '</ul>' +
        '<div class="gap-s"></div>' +
        sectionLabel('Good to know') +
        '<ul style="' + P + ';padding-left:20px">' + know.map(k => '<li style="margin:8px 0">' + k + '</li>').join('') + '</ul>' +
        '<div class="tip" lang="de" style="margin-top:18px">F&uuml;r Eltern: Eine eigene Audio-Folge erkl&auml;rt die Pr&uuml;fung auf Deutsch, direkt im Notebook.</div>' +
        cta +
        '<div style="height:72px"></div>' +
      '</div></div>';
  },
};


/* ─── THE HONEST MODEL (annotierte Realtexte) ─────────────── */
const HONEST = {
  essay: {
    title: 'Should the school day start later?',
    meta: '~300 words · a realistic pass, not a model of perfection',
    intro: 'Every model text on this site shows you what strong looks like. This one shows you what real looks like: a believable student essay that would pass – and exactly where it leaks marks. The numbered markers explain what each weak spot costs and how the strong version would sound.',
    paras: [
      "Everybody knows that teenagers are always tired in the morning.{{1}} In Austria the school starts{{2}} at eight o'clock and many students must get up at six. In this essay I want to write about the question if the school day should start later.{{3}}",
      "The first point is sleep.{{4}} Scientists say that teenagers need around nine hours of sleep, but most of them only get seven hours. Since three years{{5}} I go to school by bus and I see every morning students which{{6}} are sleeping on the bus. When school would start{{7}} at nine, everybody could sleep one hour more. This would be very good for the health and also for the marks, because tired students cannot concentrate good{{8}} in the lessons.",
      "The second point is free time.{{4}} When school starts later, it also ends later, and this is a problem for students who do sports or play an instrument. My training for example starts at five. So a later start is maybe not so good for these students, it is really annoying for them.{{9}} On the other hand, they could do their homework in the morning, when the brain is fresh.",
      "The third point is the family. Many parents must go to work at eight, and they bring the small children to school before. When the school starts later, the parents have a problem, because they cannot bring the children. So a later start is good for the teenagers but not so good for the parents. This is a big problem and it is very important to think about it.{{10}}",
      "All in all I think that the school should start later, because sleep is very important for teenagers.{{11}} Maybe nine o'clock is too late, but half past eight would be a good compromise. It is very important that the politicians think about this question.{{12}}",
    ],
    notes: [
      "Opening with 'Everybody knows that…' is the weakest of all hooks – it announces an opinion piece without an angle. Stronger: a concrete image or a surprising fact ('At 7:15, half my bus is asleep.').",
      "Article error, straight from the Grammar kit: German 'die Schule' pulls in a wrong 'the'. It's 'school starts', no article – institution used for its purpose.",
      "Announcing your plan ('In this essay I want to write about…') wastes the whole introduction. State a thesis instead: take a position in one clear sentence.",
      "'The first point is sleep.' is a label, not a topic sentence. It costs Coherence marks because it doesn't say anything the paragraph will prove. Stronger: 'The strongest argument for a later start is simple biology: teenagers are wired to sleep late.'",
      "'Since three years' – the classic since/for trap. English needs 'for three years' (duration) and would prefer a present perfect: 'For three years I have been taking the bus…'.",
      "'students which' – people take 'who', not 'which'. Small error, but it repeats through the text, and repeated basic errors drag Accuracy below band 6.",
      "'When school would start at nine' – a double conditional error: 'when' instead of 'if', and 'would' inside the if-clause. B2 wants 'If school started at nine, everybody could…'.",
      "'concentrate good' – adverb needed: 'concentrate well' (or 'properly'). Adjective/adverb confusion is high-frequency and cheap to fix in proofreading.",
      "Register slip: 'it is really annoying for them' is spoken language in a formal essay. The idea is fine – the wrapping costs Range marks. Formal version: 'for these students, a later start would create serious scheduling conflicts.'",
      "Empty intensifiers ('a big problem', 'very important') appear five times in this text. Each one is a missed chance for precise B2 language: 'a genuine dilemma for working parents' says something; 'a big problem' says nothing.",
      "The conclusion only repeats the introduction's point about sleep and drops the other two arguments. A strong conclusion weighs all three and lands on a position.",
      "Ending on 'the politicians should think about it' outsources the essay's job. The task asked what YOU think – commit: 'Starting at half past eight would cost little and win back an hour of sleep – it is the obvious first step.'",
    ],
    verdict: "Where would this land? Task Achievement around 6 – all three points are addressed with some development, conventions are basically there. Coherence around 5–6 – paragraphs exist, but label-style topic sentences and a repetitive conclusion weaken the line of thought. Range and Accuracy around 4–5 each: simple structures dominate, intensifiers repeat, and the since/for, article and if-clause errors are exactly the frequent, fixable kind – which is the encouraging part, because every single marker above is trainable. One leak the numbered markers do not tag: at about 300 words this essay is well under the ~400 the task asks for, and that shortfall alone costs a Task Achievement band – length is the cheapest mark to lose.",
  },
  email: {
    title: 'Complaint about a delayed delivery',
    meta: '~150 words · a realistic pass, not a model of perfection',
    intro: 'Same idea as the other honest models: this formal e-mail would pass, but it drips marks in a dozen small places. The markers show where – and what the strong version would do instead.',
    paras: [
      "To: office@citysports.example\nFrom: lukas.maier@email.example\nDate: 12 March 2026\nSubject: Problem{{1}}",
      "Dear Sir or Madam,",
      "I am writing to you because I have a problem with my order.{{2}} Three weeks ago I ordered a pair of running shoes on your website. On the website it said{{3}} that the delivery takes three or four days, but until today{{4}} I didn't receive{{5}} anything.",
      "I already wrote two informations{{6}} to your service team, but I didn't get an answer. This is not okay for me.{{7}} I need the shoes for a running competition, which is in two weeks, and slowly I am getting nervous.{{8}} I don't{{9}} understand how a delivery can take so long when your website promises something else.",
      "So I want my money back or the shoes until next week.{{10}} I hope you understand my situation and that we can find a good solution together.",
      "I look forward to hear{{11}} from you.",
      "Best wishes,{{12}}\nLukas Maier",
    ],
    notes: [
      "A one-word subject line ('Problem') wastes the first impression and costs Task Achievement points on the title/subject descriptor. Strong: 'Delayed delivery of order #58291 – request for refund'.",
      "The purpose sentence is there (good!) but vague. Name the facts in line one: 'I am writing to complain about a delivery that is now three weeks overdue (order #58291).'",
      "'On the website it said' – word-for-word German ('Auf der Website stand'). Natural English: 'Your website states that…'. Word order and dummy subjects are Grammar-kit territory.",
      "'until today' – German 'bis heute'. English: 'to this day' or simply 'I have still not received anything'.",
      "Tense: 'I didn't receive anything' closes the event; the waiting continues, so present perfect is needed: 'I have not received anything.' The since/for/present-perfect cluster is the most expensive habit in Austrian B2 writing.",
      "'two informations' – 'information' is uncountable, and it's the wrong word anyway: 'I have already contacted your service team twice.'",
      "'This is not okay for me' – spoken register in a formal complaint. The formal weapon is understatement: 'I find this lack of response disappointing.'",
      "'slowly I am getting nervous' – direct translation of 'langsam werde ich nervös', and too personal for the genre. Formal: 'the matter is now becoming urgent.'",
      "Contractions ('don't', 'didn't') are fine in a blog – in a formal complaint they soften the register. Written out, the same sentence sounds professional.",
      "The demand is the right move (clear request!) but the tone tips into rude and the deadline is unclear. Formal: 'I would therefore ask you either to deliver the shoes by 20 March or to refund the full amount.'",
      "'look forward to hear' – after 'look forward to', English needs the -ing form: 'I look forward to hearing from you.' Cheap to memorise, embarrassing to lose.",
      "'Best wishes' after 'Dear Sir or Madam' breaks the pairing rule: unknown name → 'Yours faithfully'. The closing is a two-second decision that examiners always see.",
    ],
    verdict: "Where would this land? Task Achievement around 6 – purpose, complaint and request are all there, the subject line and the closing pair leak points. Coherence 6 – the order of ideas is actually fine. Range 5 – the register keeps slipping into spoken German-English. Accuracy 4–5 – 'informations', 'to hear', tense choices. Total effect: a pass with no room to spare, built almost entirely out of errors this site's Grammar kit covers. And at about 150 words it is far under the ~250 target, which by itself drops Task Achievement a band before a single language error is counted.",
  },
  leaflet: {
    title: 'Information about the Charity Run',
    meta: '~140 words · a realistic pass, not a model of perfection',
    intro: 'Same idea as the models above, but for the leaflet. This one would scrape a pass, yet it leaks marks exactly where BHS students lose them: a flat, report-style title, no subheadings, and no real call to action. The markers show where.',
    paras: [
      "Information about the Charity Run{{1}}",
      "Our school organises a charity run and we want that many people are coming.{{2}} In this leaflet I give you some informations{{3}} about the event.",
      "The run is since three years{{4}} a tradition at our school. Last year we collected over 2,000 Euro for a local animal shelter, and this year we want to collect even more. If you take part, you help animals who has{{5}} no home. You can run 5 or 10 kilometres, it depends on you.{{6}} There is also music and a buffet with cakes and drinks.",
      "The atmosphere is always great and it makes a lot of fun.{{7}} Your family and friends can come and watch too. So I think everybody should come, because it is for a good thing and also very funny.{{8}}",
      "It would be nice if many people come.{{9}}",
    ],
    notes: [
      "A leaflet needs a title that pulls the reader in and short sections with their own subheadings. This one has a flat, notice-style title and runs as a single block with no subheadings at all – the biggest leaflet convention to lose, and it costs Task Achievement.",
      "'we want that many people are coming' is German word order ('wir wollen, dass...'). English: 'we want many people to come'. And 'In this leaflet I give you information' is flat – a leaflet opens with a hook, not a table of contents.",
      "'informations' does not exist – 'information' is uncountable.",
      "'is since three years' – the classic since/for trap, plus tense: 'has been a tradition for three years'.",
      "'animals who has no home' – animals take 'that', and it needs plural agreement: 'animals that have no home'.",
      "'You can run 5 or 10 kilometres, it depends on you.' is a comma splice (two complete sentences joined by only a comma). Use a full stop, and turn it into a benefit rather than a flat statement.",
      "'it makes a lot of fun' is a direct translation of 'macht Spaß'. English: 'it is a lot of fun' or 'great fun'.",
      "'very funny' is a false friend: funny = lustig (comical). Here you mean 'fun' (enjoyable).",
      "This is where the leaflet really leaks: there is no call to action and no practical details. A leaflet must tell the reader exactly what to do and give the facts – When? Where? How do I sign up? Ending on 'it would be nice if many people come' leaves the reader with nothing to act on.",
    ],
    verdict: "Where would this land? Task Achievement around 4–5 – the content is there, but the missing subheadings, the missing call to action and the missing date/time/place are exactly the leaflet conventions the grid rewards. Coherence around 5 – one undivided block. Range and Accuracy around 4 each: simple sentences plus the frequent, fixable German-into-English errors above. At about 170 words it is also under the ~250 the task expects, which costs another Task Achievement band on its own. The encouraging part: every marker here is trainable, and adding clear subheadings and a real call to action would raise the score quickly.",
  },
  article: {
    title: 'Social media - curse or blessing?',
    meta: '~200 words · a realistic pass, not a model of perfection',
    intro: "Same idea as the other honest models, but for the article: this one would pass a school-magazine task, yet it reads more like a flat essay than a lively article, and a few Germanisms sneak in. The markers show where the marks leak and what the stronger version would do.",
    paras: [
      "Today everybody is talking about social media, and everybody has an opinion.{{1}} In this article I want to show you the good and the bad sides.{{2}} For young people like us it is really an important topic.",
      "Let us start with the good sides. Social media helps us to stay in contact with our friends, also when they live far away. Since two years my cousin lives{{3}} in Spain, and without Instagram I would never know what she is doing. We can also learn a lot, because there are many informations{{4}} about every topic you can imagine. And honestly, it makes a lot of fun{{5}} to watch videos after a long day in the school.{{6}}",
      "But of course there are bad sides too. Many students look at their phone the whole day and cannot concentrate proper{{7}} anymore. Others get real problems with their self-confidence, they compare themselves the whole time with perfect pictures.{{8}} My little brother is only thirteen and already he cannot put the phone away.",
      "All in all, social media has good and bad sides, and everybody must find the right balance. For me it is a great thing, but we should never forget the real life.{{9}}",
    ],
    notes: [
      "A school-magazine article lives from its opening: a question, an image, a surprising claim. 'Today everybody is talking about...' is a flat, essay-style opener with no angle, and it costs Task Achievement on article conventions. Stronger: 'Be honest - how many times did you check your phone before this sentence?'",
      "Announcing the structure ('In this article I want to show you...') is essay habit, not article style. An article pulls the reader straight in and lets the piece show its shape instead of describing it.",
      "'Since two years my cousin lives...' - the since/for trap plus a tense error. English needs duration with 'for' and a present perfect: 'For two years my cousin has been living in Spain.'",
      "'many informations' - 'information' is uncountable and never takes an -s: 'there is a lot of information'.",
      "'it makes a lot of fun' is a straight translation of 'macht Spass'. English does not 'make' fun: 'it is a lot of fun' or 'great fun'.",
      "'a long day in the school' - German 'in der Schule'. When the building is used for its purpose, English drops the article: 'at school'.",
      "'concentrate proper' - an adverb is needed: 'concentrate properly'. Adjective/adverb slips are high-frequency and cheap to catch when proofreading.",
      "'...with their self-confidence, they compare themselves...' is a comma splice: two full sentences joined by only a comma. Split them or add a linker: '...with their self-confidence, because they constantly compare themselves with perfect pictures.'",
      "'we should never forget the real life' - two things at once: 'the real life' should be 'real life' (no article for a general idea), and the ending is flat. A stronger article closes on a line that sticks: 'Social media is here to stay - the trick is to look up from it now and then.'",
    ],
    verdict: "Where would this land? Task Achievement around 5-6 - the topic is covered and both sides appear, but the flat opening, the announced structure and the weak ending miss the article conventions the grid rewards. Coherence around 6 - the two-sides plan is clear and easy to follow. Range around 4-5 - simple sentences and empty intensifiers ('really', 'a lot') dominate. Accuracy around 4-5 - the since/for, 'informations', article and adjective/adverb slips are the frequent, fixable kind. And at about 200 words it sits under the length the task sets (around 250), which on its own drops Task Achievement by one band before any language is judged. The good news stays the same: every marker here is trainable.",
  },
  report: {
    title: 'Our school canteen: a student survey',
    meta: '~175 words · a realistic pass, not a model of perfection',
    intro: "Same idea as the models above, but for the report. This one would scrape a pass, yet it leaks marks exactly where students lose them in a report: a vague subject line, unnumbered headings and a register that keeps slipping. The markers show where.",
    paras: [
      "To: Mr Berger, headmaster\nFrom: The student council\nDate: 5 May 2026\nSubject: The canteen{{1}}",
      "In this report I want to write about{{2}} the situation in our school canteen. Last month a survey was made{{3}} by the student council, and 120 students from all classes have answered our questions. The aim was to find out what the students really think.",
      "The results{{4}}\nMost of the students are not happy with the canteen. Since one year{{5}} the prices are higher, but the quality is the same. Many students said also that there is not enough vegetarian food, this is a big problem for them.{{6}} The waiting time at lunch is much too long, and often the warm meals are already gone. Some also complained that there is no information about allergies on the food.",
      "What we want{{7}}\nWe think that some things must be changed.{{8}} The school should offer more vegetarian meals and open a second counter. Also the prices for a warm meal should go down again. If this would happen{{9}}, the students would be much more happy.{{10}}",
    ],
    notes: [
      "A report subject line must be specific enough to file at a glance: 'The canteen' says almost nothing. Stronger: 'Survey results and recommendations on the school canteen'.",
      "'In this report I want to write about...' is essay register in a report. A report states its purpose formally and impersonally: 'This report presents the results of a student survey on the school canteen and makes recommendations.'",
      "'a survey was made by the student council' - wrong verb in the passive. Surveys are 'carried out' or 'conducted', not 'made': 'A survey was carried out last month.'",
      "'The results' as a section heading is vague and unnumbered. Reports are rewarded for clear, numbered headings - '1. Introduction', '2. Findings', '3. Recommendations' - so the reader can navigate at a glance.",
      "'Since one year the prices are higher' - the since/for trap plus tense. English: 'For a year, prices have been higher.'",
      "'...not enough vegetarian food, this is a big problem for them.' is a comma splice - two full sentences joined by a comma. Split them, and swap the empty 'big problem' for something precise: '...vegetarian food, which was the most frequent complaint.'",
      "'What we want' is an informal, unnumbered heading. In a report this section is '3. Recommendations', and the tone stays neutral rather than sounding like a wish list.",
      "'We think that some things must be changed' - subjective 'we think' plus a vague, agent-less passive. A report recommends concretely: 'The council recommends the following three changes.'",
      "'If this would happen' - 'would' does not belong in the if-clause. B2 wants 'If this happened' or 'If these changes were made'.",
      "'the students would be much more happy' - the comparative is 'happier', and 'much more happy' is spoken register. A report closes soberly: 'these measures would noticeably improve satisfaction.'",
    ],
    verdict: "Where would this land? Task Achievement around 5 - the report has a purpose, findings and a recommendation, but the vague subject and the missing numbered headings cost real marks on report conventions. Coherence around 5-6 - the reader can follow it, though the unlabelled sections make it feel more like a letter than a report. Range around 4-5 - simple sentences and 'big problem'-style filler. Accuracy around 4-5 - the passive, since/for, comma splice and if-clause errors are all the frequent, trainable kind. And at about 175 words it falls under the length the task sets (around 250), which by itself costs one Task Achievement band before the language is even weighed. Encouraging bottom line: every marker here is trainable.",
  },
  blog: {
    title: 'How I taught myself to cook',
    meta: '~215 words · a realistic pass, not a model of perfection',
    intro: "Same idea as the honest models above, but for the blog. The voice is genuinely good - informal and personal, contractions and all - but it loses marks on structure and on the missing call to comment at the end. The markers show where, and note which 'errors' are actually fine in a blog.",
    paras: [
      "Okay, I have to be honest with you: two months ago I couldn't even boil an egg without burning something. My mum always cooked for me and I never really thought about it. But then she went for three weeks to my grandma, who was sick, and suddenly I was alone with an empty fridge and a very empty stomach. The first days were a catastrophe. I ordered pizza every evening, and after a while my body just said stop, this is too much.{{1}} So I decided to learn how to cook, and honestly, it changed more than I expected.{{2}}",
      "At first I watched tons of videos and found so many informations{{3}} online that I had no idea where to start. Since two weeks I cook now{{4}} every day, and I've already got three or four dishes that I can make really good.{{5}} The best part isn't even the food, it's the feeling. When you make something with your own hands and it actually tastes nice, you feel really proud. And I'm saving a lot of money, because cooking at home is much cheaper than ordering all the time. My friends couldn't believe it when I cooked dinner for two of them last week. Cooking isn't a talent, it's just practice, and anyone can pick it up.{{6}}",
    ],
    notes: [
      "'...my body just said stop, this is too much.' - two complete sentences with only a comma between them (a comma splice). The chatty voice is right for a blog; the punctuation still is not. Use a full stop or a dash: '...my body just said stop. This was too much.'",
      "This is where the post should break. A blog lives in short, frequent paragraphs, but this text is only two big blocks - exactly at the turn from panic to decision a fresh, short paragraph should start. Walls of text cost Coherence and scare readers off.",
      "'so many informations' - 'information' is uncountable and never takes an -s: 'so much information'.",
      "'Since two weeks I cook now every day' - the since/for trap plus German word order. English: 'For two weeks now I have been cooking every day.'",
      "'dishes that I can make really good' - an adverb is needed: 'really well'. (Note that the contractions in this post - couldn't, it's, I've - are all correct here: an informal blog wants them, so they cost nothing.)",
      "A blog rarely just stops. This one ends on a neat line but never turns back to the reader - there is no question, no invitation to comment, no sign-off. Add one: 'Have you ever had to learn something from zero like this? Tell me in the comments - I need more recipes.'",
    ],
    verdict: "Where would this land? Task Achievement around 5-6 - it is a genuine, personal story that answers a blog task, but with no headline on the post, no clear reader address and no call to comment at the end, it misses blog conventions the grid rewards. Coherence around 5 - readable, yet the two giant paragraphs work against it. Range around 6 - the informal voice is actually a strength here, with some natural phrasing. Accuracy around 5 - 'informations', the since/for slip and 'really good' are the frequent, fixable kind, and the contractions, correct for a blog, cost nothing. At about 215 words it also sits under the length the task sets (around 250), which alone drops Task Achievement by a band. The encouraging part: every marker here is trainable.",
  },
};

function honestModel(typeId) {
  const h = HONEST[typeId];
  if (!h) return '';
  let n = 0;
  const paras = h.paras.map(p => {
    const html = esc(p).replace(/\{\{(\d+)\}\}/g, (_, num) =>
      '<button class="hm-mark" data-action="hm-jump" data-type="' + typeId + '" data-n="' + num + '" aria-label="Annotation ' + num + '">' + num + '</button>');
    const mono = p.indexOf('To:') === 0 || p.indexOf('by ') === 0;
    return '<p' + (mono ? ' style="font-family:var(--font-mono);font-size:.8125rem;line-height:1.8"' : '') + '>' + html.replace(/\n/g, '<br>') + '</p>';
  }).join('');
  return '<div class="gap-s"></div>' +
    '<div class="acc"><div class="acc-item"><button class="acc-head" data-action="acc" aria-expanded="false"><span class="pm">+</span><span>The honest model: a realistic text and what it costs</span></button>' +
    '<div class="acc-body">' +
      '<div style="font-weight:600;font-size:.95rem;margin:12px 0 3px">' + esc(h.title) + '</div>' +
      '<div style="font-size:.75rem;color:var(--text-muted);margin-bottom:12px;letter-spacing:.32px">' + esc(h.meta) + '</div>' +
      '<p style="font-size:.875rem;color:var(--text-secondary);line-height:1.6;margin-bottom:18px;max-width:700px">' + esc(h.intro) + '</p>' +
      '<div class="hm-grid">' +
        '<div class="hm-text" id="hmText-' + typeId + '">' + paras + '</div>' +
        '<ol class="hm-notes" id="hmNotes-' + typeId + '">' + h.notes.map((x, i) =>
          '<li id="hmNote-' + typeId + '-' + (i + 1) + '"><span class="hm-num">' + (i + 1) + '</span>' + esc(x) + '</li>').join('') + '</ol>' +
      '</div>' +
      '<div class="tip" style="margin-top:16px"><strong>Where would this land? · </strong>' + esc(h.verdict) + '</div>' +
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
