/* ════════════════════════════════════════════════════════════
   Study plan (Matura-Teil) – 4-Wochen-, 2-Wochen- und 7-Tage-Lernplan, schultyp-abhängig
   M.planStatus() ist die EINZIGE Quelle für "wo bin ich" (Home + Planseite).
   ════════════════════════════════════════════════════════════ */
(function () {
'use strict';
const M = window.MWG;
const { $, store, sectionLabel, pageHead } = M;

const MOCK = '<a href="#timer">mock exam</a>';

/* ─── AHS: 4-Wochen-Plan (20 Lerntage auf 28 Kalendertagen) ─────
   Reihenfolge/Anzahl der Tage NICHT ändern: mwg_plan speichert Häkchen per Tagesindex. */
const P4 = [
  { w: 1, core: true, title: 'Learn how the exam works', tasks: [
    { t: 'Read <a href="#overview">Overview &amp; grading</a> from top to bottom. Everything else on this site builds on it.', min: 25 },
    { t: 'Close the page and write down the four criteria from memory. Then check your list.', min: 5 },
  ]},
  { w: 1, core: true, title: 'Meet the essay', tasks: [
    { t: 'Work through the <a href="#essay">essay guide</a>: layout, do&rsquo;s and don&rsquo;ts, weaker and stronger versions.', min: 25 },
    { t: 'Take the essay quiz until you pass it.', min: 10 },
  ]},
  { w: 1, title: 'Build good paragraphs', tasks: [
    { t: 'Do the <a href="#paragraphs">Paragraph writing</a> section: the four layers, then at least two warm-ups.', min: 30 },
    { t: 'Read the essay <a href="#essay">model text</a> and find the topic sentence of each paragraph.', min: 10 },
  ]},
  { w: 1, title: 'Your first essay', tasks: [
    { t: 'Pick an essay task from the <a href="#taskbank">Task bank</a> and write it. No timer yet, but in one go.', min: 45 },
  ]},
  { w: 1, title: 'Feedback day', tasks: [
    { t: 'Run yesterday&rsquo;s essay through the <a href="#selfcheck">self-check</a> and fix what it finds.', min: 20 },
    { t: 'Look up your two most common mistakes in the <a href="#grammar">Grammar kit</a>.', min: 15 },
  ]},
  { w: 2, core: true, title: 'The article', tasks: [
    { t: 'Work through the <a href="#article">article guide</a> and model text.', min: 25 },
    { t: 'Take the article quiz.', min: 10 },
  ]},
  { w: 2, core: true, title: 'The report', tasks: [
    { t: 'Work through the <a href="#report">report guide</a>. A report needs headings. Numbering them is not necessary.', min: 25 },
    { t: 'Take the report quiz.', min: 10 },
  ]},
  { w: 2, title: 'Write an article', tasks: [
    { t: 'Write a ~250-word article from the <a href="#taskbank">Task bank</a>, then <a href="#selfcheck">self-check</a> it.', min: 45 },
  ]},
  { w: 2, title: 'Write a report', tasks: [
    { t: 'Write a ~250-word report from the <a href="#taskbank">Task bank</a>, then <a href="#selfcheck">self-check</a> it.', min: 45 },
  ]},
  { w: 2, title: 'Learn new linking words', tasks: [
    { t: 'Learn five new linking words from the table in the <a href="#grammar">Grammar kit</a> and write a real sentence with each one.', min: 20 },
    { t: 'Do one topic in <a href="#topicvocab">Topic vocabulary</a> as flashcards.', min: 15 },
  ]},
  { w: 3, core: true, title: 'The blog', tasks: [
    { t: 'Work through the <a href="#blog">blog guide</a>. Here the right tone (register) matters most.', min: 25 },
    { t: 'Take the blog quiz.', min: 10 },
  ]},
  { w: 3, core: true, title: 'The e-mail', tasks: [
    { t: 'Work through the <a href="#email">e-mail guide</a> and all four sub-types.', min: 30 },
    { t: 'Take the e-mail quiz.', min: 10 },
  ]},
  { w: 3, title: 'Write a formal e-mail', tasks: [
    { t: 'Write a complaint or an application from the <a href="#taskbank">Task bank</a>, then <a href="#selfcheck">self-check</a> it.', min: 45 },
  ]},
  { w: 3, core: true, title: 'German-to-English traps', tasks: [
    { t: 'Do the top five in the <a href="#grammar">Grammar kit</a>: articles, since/for, if-clauses, false friends, word order.', min: 35 },
  ]},
  { w: 3, title: 'Phrase day', tasks: [
    { t: 'Pick ten phrases from the <a href="#phrasebank">Phrase bank</a> that you will really use, and copy them into your notes.', min: 20 },
    { t: 'One more <a href="#topicvocab">flashcard</a> session. The cards you know move back less often.', min: 15 },
  ]},
  { w: 4, core: true, title: 'Full run I', tasks: [
    { t: 'Do the ' + MOCK + ': one ~400-word and one ~250-word task, 120 minutes, no phone, no dictionary.', min: 120 },
  ]},
  { w: 4, core: true, title: 'Check your texts', tasks: [
    { t: 'Run both texts from the mock exam through the <a href="#selfcheck">self-check</a>, including the AI feedback prompt.', min: 30 },
    { t: 'Write a list of your five most common mistakes. Keep it next to you this week.', min: 10 },
  ]},
  { w: 4, title: 'Practice zone day', tasks: [
    { t: 'In the <a href="#practice">Practice zone</a>: Spot the mistakes, Register gym and the final quiz.', min: 40 },
  ]},
  { w: 4, title: 'Close the gaps', tasks: [
    { t: 'Retake your weakest quizzes (the menu shows which sections have no ✓✓ yet).', min: 25 },
    { t: 'Read the <a href="#checklist">final checklist</a> once, slowly.', min: 15 },
  ]},
  { w: 4, title: 'Full run II', tasks: [
    { t: 'One more ' + MOCK + ' with two new tasks: 120 minutes, no phone. After that, stop revising and rest.', min: 120 },
  ]},
];

/* ─── AHS: 2-Wochen-Plan (14 Lerntage auf 14 Kalendertagen) ───── */
const P14 = [
  { core: true, title: 'Learn how the exam works', tasks: [
    { t: 'Read <a href="#overview">Overview &amp; grading</a> from top to bottom. Everything else builds on it.', min: 30 },
    { t: 'Close the page and write down the four criteria from memory. Then check your list.', min: 5 },
  ]},
  { core: true, title: 'The essay', tasks: [
    { t: 'Work through the <a href="#essay">essay guide</a> and take the quiz.', min: 40 },
    { t: 'Read the essay model text and find the topic sentence of each paragraph.', min: 10 },
  ]},
  { title: 'Build good paragraphs', tasks: [
    { t: 'Do the <a href="#paragraphs">Paragraph writing</a> section: the four layers, then two warm-ups.', min: 35 },
  ]},
  { title: 'Write an essay', tasks: [
    { t: 'Write a ~400-word essay from the <a href="#taskbank">Task bank</a> in 65 minutes, the time you have in the exam.', min: 65 },
  ]},
  { title: 'Check your essay', tasks: [
    { t: 'Run your essay through the <a href="#selfcheck">self-check</a> and fix what it finds.', min: 25 },
    { t: 'Look up your two most common mistakes in the <a href="#grammar">Grammar kit</a>.', min: 15 },
  ]},
  { core: true, title: 'Article and report', tasks: [
    { t: 'Work through the <a href="#article">article guide</a> and take the quiz.', min: 25 },
    { t: 'Work through the <a href="#report">report guide</a> and take the quiz. A report needs headings, but no numbers.', min: 25 },
  ]},
  { title: 'Write a short text', tasks: [
    { t: 'Write a ~250-word article or report from the <a href="#taskbank">Task bank</a> in 40 minutes, then <a href="#selfcheck">self-check</a> it.', min: 55 },
  ]},
  { core: true, title: 'Blog and e-mail', tasks: [
    { t: 'Work through the <a href="#blog">blog guide</a> and take the quiz.', min: 20 },
    { t: 'Work through the <a href="#email">e-mail guide</a> with its four sub-types and take the quiz.', min: 30 },
  ]},
  { title: 'Linking words and phrases', tasks: [
    { t: 'Learn five new linking words from the table in the <a href="#grammar">Grammar kit</a> and write a sentence with each one.', min: 20 },
    { t: 'Pick ten phrases from the <a href="#phrasebank">Phrase bank</a> that you will really use, and copy them into your notes.', min: 20 },
  ]},
  { core: true, title: 'German-to-English traps', tasks: [
    { t: 'Do the top five in the <a href="#grammar">Grammar kit</a>: articles, since/for, if-clauses, false friends, word order.', min: 35 },
    { t: 'Take the final quiz in the <a href="#practice">Practice zone</a>.', min: 15 },
  ]},
  { core: true, title: 'Full run I', tasks: [
    { t: 'Do the ' + MOCK + ': one ~400-word and one ~250-word task, 120 minutes, no phone, no dictionary.', min: 120 },
  ]},
  { core: true, title: 'Check your texts', tasks: [
    { t: 'Run both texts from the mock exam through the <a href="#selfcheck">self-check</a>.', min: 35 },
    { t: 'Write a list of your five most common mistakes. Keep it next to you until the exam.', min: 10 },
  ]},
  { title: 'Full run II', tasks: [
    { t: 'One more ' + MOCK + ' with two new tasks, 120 minutes. Afterwards, only look at your list of five mistakes.', min: 120 },
  ]},
  { core: true, title: 'Light day', tasks: [
    { t: 'Read the <a href="#checklist">final checklist</a> once, slowly, and your list of five mistakes.', min: 20 },
    { t: 'No new tasks today. Pack your things and go to bed on time.', min: 0 },
  ]},
];

/* ─── AHS: 7-Tage-Plan ───────────────────────────────────────── */
const P7 = [
  { core: true, title: 'How the exam works, and the essay', tasks: [
    { t: 'Read <a href="#overview">Overview &amp; grading</a>. You need to know how you win and lose points.', min: 25 },
    { t: 'Work through the <a href="#essay">essay guide</a> and take the quiz.', min: 35 },
  ]},
  { title: 'Write the essay', tasks: [
    { t: 'Write a ~400-word essay from the <a href="#taskbank">Task bank</a> in 65 minutes, then <a href="#selfcheck">self-check</a> it.', min: 90 },
  ]},
  { core: true, title: 'The formal e-mail', tasks: [
    { t: 'Work through the <a href="#email">e-mail guide</a> with its sub-types and take the quiz.', min: 40 },
    { t: 'Learn the pairs of openings and closings by heart. They are easy points.', min: 10 },
  ]},
  { core: true, title: 'Article and report', tasks: [
    { t: 'Do the <a href="#article">article</a> and <a href="#report">report</a> guides and take both quizzes.', min: 50 },
  ]},
  { core: true, title: 'German-to-English traps', tasks: [
    { t: 'Do the top five in the <a href="#grammar">Grammar kit</a>: articles, since/for, if-clauses, false friends, word order.', min: 35 },
    { t: 'Take the final quiz in the <a href="#practice">Practice zone</a>.', min: 15 },
  ]},
  { core: true, title: 'Full run', tasks: [
    { t: 'Do the ' + MOCK + ': both tasks, 120 minutes, exam conditions.', min: 120 },
  ]},
  { core: true, title: 'Check, then rest', tasks: [
    { t: 'Run one text from yesterday through the <a href="#selfcheck">self-check</a> and note your three most common mistakes.', min: 25 },
    { t: 'Read the <a href="#checklist">final checklist</a>. Then close this site and go to bed on time.', min: 15 },
  ]},
];

/* ─── BHS: 4-Wochen-Plan (drei Aufgaben, Leaflet statt Essay) ──── */
const P4B = [
  { w: 1, core: true, title: 'Learn how the exam works', tasks: [
    { t: 'Read <a href="#overview">Overview &amp; grading</a> from top to bottom. Everything else on this site builds on it.', min: 25 },
    { t: 'Close the page and write down the four criteria from memory. Then check your list.', min: 5 },
  ]},
  { w: 1, core: true, title: 'Meet the leaflet', tasks: [
    { t: 'Work through the <a href="#leaflet">leaflet guide</a>: layout, do&rsquo;s and don&rsquo;ts, weaker and stronger versions. It is the one text type that only BHS students write.', min: 25 },
    { t: 'Take the leaflet quiz until you pass it.', min: 10 },
  ]},
  { w: 1, title: 'Build good paragraphs', tasks: [
    { t: 'Do the <a href="#paragraphs">Paragraph writing</a> section: the four layers, then at least two warm-ups.', min: 30 },
    { t: 'Read the leaflet <a href="#leaflet">model text</a> and find the title, the subheadings and the call to action.', min: 10 },
  ]},
  { w: 1, title: 'Your first leaflet', tasks: [
    { t: 'Pick a leaflet task from the <a href="#taskbank">Task bank</a> and write it. No timer yet, but in one go.', min: 45 },
  ]},
  { w: 1, title: 'Feedback day', tasks: [
    { t: 'Run yesterday&rsquo;s leaflet through the <a href="#selfcheck">self-check</a> and fix what it finds.', min: 20 },
    { t: 'Look up your two most common mistakes in the <a href="#grammar">Grammar kit</a>.', min: 15 },
  ]},
  { w: 2, core: true, title: 'The article', tasks: [
    { t: 'Work through the <a href="#article">article guide</a> and model text.', min: 25 },
    { t: 'Take the article quiz.', min: 10 },
  ]},
  { w: 2, core: true, title: 'The report', tasks: [
    { t: 'Work through the <a href="#report">report guide</a>. A report needs headings. Numbering them is not necessary.', min: 25 },
    { t: 'Take the report quiz.', min: 10 },
  ]},
  { w: 2, title: 'Write an article', tasks: [
    { t: 'Write a ~250-word article from the <a href="#taskbank">Task bank</a>, then <a href="#selfcheck">self-check</a> it.', min: 45 },
  ]},
  { w: 2, title: 'Write a report', tasks: [
    { t: 'Write a ~250-word report from the <a href="#taskbank">Task bank</a> (the guest feedback task is good practice), then <a href="#selfcheck">self-check</a> it.', min: 45 },
  ]},
  { w: 2, title: 'Learn new linking words', tasks: [
    { t: 'Learn five new linking words from the table in the <a href="#grammar">Grammar kit</a> and write a real sentence with each one.', min: 20 },
    { t: 'Do one topic in <a href="#topicvocab">Topic vocabulary</a> as flashcards.', min: 15 },
  ]},
  { w: 3, core: true, title: 'The blog', tasks: [
    { t: 'Work through the <a href="#blog">blog guide</a>. Here the right tone (register) matters most.', min: 25 },
    { t: 'Take the blog quiz.', min: 10 },
  ]},
  { w: 3, core: true, title: 'The e-mail', tasks: [
    { t: 'Work through the <a href="#email">e-mail guide</a> and all four sub-types. At BHS, business enquiries and applications matter most.', min: 30 },
    { t: 'Take the e-mail quiz.', min: 10 },
  ]},
  { w: 3, title: 'Write a formal e-mail', tasks: [
    { t: 'Write a business enquiry or an application from the <a href="#taskbank">Task bank</a>, then <a href="#selfcheck">self-check</a> it.', min: 45 },
  ]},
  { w: 3, core: true, title: 'German-to-English traps', tasks: [
    { t: 'Do the top five in the <a href="#grammar">Grammar kit</a>: articles, since/for, if-clauses, false friends, word order.', min: 35 },
  ]},
  { w: 3, title: 'Phrase day', tasks: [
    { t: 'Pick ten phrases from the <a href="#phrasebank">Phrase bank</a> that you will really use, and copy them into your notes.', min: 20 },
    { t: 'One more <a href="#topicvocab">flashcard</a> session. The cards you know move back less often.', min: 15 },
  ]},
  { w: 4, core: true, title: 'Full run I', tasks: [
    { t: 'Do the ' + MOCK + ': three ~250-word tasks (a leaflet, an e-mail and an article or report), 195 minutes. A dictionary is allowed, as in the real Writing section.', min: 195 },
  ]},
  { w: 4, core: true, title: 'Check your texts', tasks: [
    { t: 'Run all three texts from the mock exam through the <a href="#selfcheck">self-check</a>, including the AI feedback prompt.', min: 35 },
    { t: 'Write a list of your five most common mistakes. Keep it next to you this week.', min: 10 },
  ]},
  { w: 4, title: 'Practice zone day', tasks: [
    { t: 'In the <a href="#practice">Practice zone</a>: Spot the mistakes, Register gym and the final quiz.', min: 40 },
  ]},
  { w: 4, title: 'Close the gaps', tasks: [
    { t: 'Retake your weakest quizzes (the menu shows which sections have no ✓✓ yet).', min: 25 },
    { t: 'Read the <a href="#checklist">final checklist</a> once, slowly.', min: 15 },
  ]},
  { w: 4, title: 'Full run II', tasks: [
    { t: 'One more ' + MOCK + ' with three new tasks: 195 minutes, no phone. After that, stop revising and rest.', min: 195 },
  ]},
];

/* ─── BHS: 2-Wochen-Plan ─────────────────────────────────────── */
const P14B = [
  { core: true, title: 'Learn how the exam works', tasks: [
    { t: 'Read <a href="#overview">Overview &amp; grading</a> from top to bottom. Everything else builds on it.', min: 30 },
    { t: 'Close the page and write down the four criteria from memory. Then check your list.', min: 5 },
  ]},
  { core: true, title: 'The leaflet', tasks: [
    { t: 'Work through the <a href="#leaflet">leaflet guide</a> and take the quiz.', min: 40 },
    { t: 'Read the leaflet model text and find the title, the subheadings and the call to action.', min: 10 },
  ]},
  { title: 'Build good paragraphs', tasks: [
    { t: 'Do the <a href="#paragraphs">Paragraph writing</a> section: the four layers, then two warm-ups.', min: 35 },
  ]},
  { title: 'Write a leaflet', tasks: [
    { t: 'Write a ~250-word leaflet from the <a href="#taskbank">Task bank</a> in 60 minutes, planning included.', min: 60 },
  ]},
  { title: 'Check your leaflet', tasks: [
    { t: 'Run your leaflet through the <a href="#selfcheck">self-check</a> and fix what it finds.', min: 25 },
    { t: 'Look up your two most common mistakes in the <a href="#grammar">Grammar kit</a>.', min: 15 },
  ]},
  { core: true, title: 'The e-mail', tasks: [
    { t: 'Work through the <a href="#email">e-mail guide</a> with its four sub-types and take the quiz. At BHS, business enquiries and applications matter most.', min: 40 },
    { t: 'Learn the pairs of openings and closings by heart. They are easy points.', min: 10 },
  ]},
  { title: 'Write a formal e-mail', tasks: [
    { t: 'Write a business enquiry or an application from the <a href="#taskbank">Task bank</a> in 45 minutes, then <a href="#selfcheck">self-check</a> it.', min: 60 },
  ]},
  { core: true, title: 'Article and report', tasks: [
    { t: 'Work through the <a href="#article">article guide</a> and take the quiz.', min: 25 },
    { t: 'Work through the <a href="#report">report guide</a> and take the quiz. A report needs headings, but no numbers.', min: 25 },
  ]},
  { title: 'Blog and linking words', tasks: [
    { t: 'Work through the <a href="#blog">blog guide</a> and take the quiz.', min: 25 },
    { t: 'Learn five new linking words from the table in the <a href="#grammar">Grammar kit</a> and write a sentence with each one.', min: 20 },
  ]},
  { core: true, title: 'German-to-English traps', tasks: [
    { t: 'Do the top five in the <a href="#grammar">Grammar kit</a>: articles, since/for, if-clauses, false friends, word order.', min: 35 },
    { t: 'Take the final quiz in the <a href="#practice">Practice zone</a>.', min: 15 },
  ]},
  { core: true, title: 'Full run I', tasks: [
    { t: 'Do the ' + MOCK + ': three ~250-word tasks, 195 minutes, no phone. A dictionary is allowed, as in the real Writing section.', min: 195 },
  ]},
  { core: true, title: 'Check your texts', tasks: [
    { t: 'Run all three texts from the mock exam through the <a href="#selfcheck">self-check</a>.', min: 40 },
    { t: 'Write a list of your five most common mistakes. Keep it next to you until the exam.', min: 10 },
  ]},
  { title: 'Full run II', tasks: [
    { t: 'One more ' + MOCK + ' with three new tasks, 195 minutes. Afterwards, only look at your list of five mistakes.', min: 195 },
  ]},
  { core: true, title: 'Light day', tasks: [
    { t: 'Read the <a href="#checklist">final checklist</a> once, slowly, and your list of five mistakes.', min: 20 },
    { t: 'No new tasks today. Pack your things and go to bed on time.', min: 0 },
  ]},
];

/* ─── BHS: 7-Tage-Plan ───────────────────────────────────────── */
const P7B = [
  { core: true, title: 'How the exam works, and the leaflet', tasks: [
    { t: 'Read <a href="#overview">Overview &amp; grading</a>. You need to know how you win and lose points.', min: 25 },
    { t: 'Work through the <a href="#leaflet">leaflet guide</a> and take the quiz.', min: 35 },
  ]},
  { title: 'Write a leaflet', tasks: [
    { t: 'Write a ~250-word leaflet from the <a href="#taskbank">Task bank</a> in about 45 minutes, then <a href="#selfcheck">self-check</a> it.', min: 65 },
  ]},
  { core: true, title: 'The formal e-mail', tasks: [
    { t: 'Work through the <a href="#email">e-mail guide</a> with its sub-types and take the quiz.', min: 40 },
    { t: 'Learn the pairs of openings and closings by heart. They are easy points.', min: 10 },
  ]},
  { core: true, title: 'Article and report', tasks: [
    { t: 'Do the <a href="#article">article</a> and <a href="#report">report</a> guides and take both quizzes.', min: 50 },
  ]},
  { core: true, title: 'German-to-English traps', tasks: [
    { t: 'Do the top five in the <a href="#grammar">Grammar kit</a>: articles, since/for, if-clauses, false friends, word order.', min: 35 },
    { t: 'Take the final quiz in the <a href="#practice">Practice zone</a>.', min: 15 },
  ]},
  { core: true, title: 'Full run', tasks: [
    { t: 'Do the ' + MOCK + ': three tasks, 195 minutes, exam conditions.', min: 195 },
  ]},
  { core: true, title: 'Check, then rest', tasks: [
    { t: 'Run one text from yesterday through the <a href="#selfcheck">self-check</a> and note your three most common mistakes.', min: 25 },
    { t: 'Read the <a href="#checklist">final checklist</a>. Then close this site and go to bed on time.', min: 15 },
  ]},
];

const PLANS = {
  p4: { label: '4 weeks', name: '4-week', span: 28, days: P4 },
  p14: { label: '2 weeks', name: '2-week', span: 14, days: P14 },
  p7: { label: '7 days', name: '7-day', span: 7, days: P7 },
  p4b: { label: '4 weeks', name: '4-week', span: 28, days: P4B },
  p14b: { label: '2 weeks', name: '2-week', span: 14, days: P14B },
  p7b: { label: '7 days', name: '7-day', span: 7, days: P7B },
};
const BASES = ['p4', 'p14', 'p7'];
const WEEKS = ['Week 1 – the basics', 'Week 2 – article and report', 'Week 3 – blog, e-mail, language', 'Week 4 – full runs'];

/* Schultyp-abhängiger Plan-Schlüssel: BHS bekommt eigene Pläne + eigenen Fortschritt */
function isBhs() { return !!(M.school && M.school() === 'bhs'); }
function planKey(base) { return isBhs() ? base + 'b' : base; }

/* ─── Datum / Countdown (Europe/Vienna, Tagesgrenze Mitternacht) ─ */
function viennaToday() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Vienna' });
}
function daysLeft() {
  const d = store('mwg_examdate');
  if (!d || typeof d !== 'string') return null;
  const t = new Date(viennaToday() + 'T00:00:00Z').getTime();
  const e = new Date(d + 'T00:00:00Z').getTime();
  if (isNaN(e)) return null;
  return Math.round((e - t) / 86400000);
}

/* ─── Zustand ─────────────────────────────────────────────── */
let tab = null;            /* 'p4' | 'p14' | 'p7' – null = automatisch (nur diese Sitzung) */
let dateCardHidden = false;

function planState() {
  const p = store('mwg_plan');
  return (p && typeof p === 'object') ? p : {};
}
function isChecked(planId, day, task) {
  const p = planState();
  return !!(p[planId] && p[planId][day] && p[planId][day][task]);
}
function coreOnly() { return store('mwg_plan_core') === true; }
function autoBase(dl) {
  if (dl === null || dl < 0) return 'p4';
  if (dl <= 7) return 'p7';
  if (dl <= 14) return 'p14';
  return 'p4';
}
function currentTab() { return tab || autoBase(daysLeft()); }

/* Sichtbare Tage (Indizes) – im Aufholmodus nur core-Tage */
function visibleDays(planId, core) {
  return PLANS[planId].days.map((d, i) => i).filter(i => !core || PLANS[planId].days[i].core);
}
/* Kalender-Abbildung: Kalendertage bis zur Prüfung werden proportional auf den Plan
   abgebildet (4 Wochen: 20 Lerntage auf 28 Tage, 2 Wochen 14/14, 7 Tage 7/7).
   Vor Planbeginn und ab dem Prüfungstag gibt es keinen Marker. */
function calendarIndex(planId, dl) {
  if (dl === null || dl <= 0) return -1;
  const len = PLANS[planId].days.length, span = PLANS[planId].span;
  if (dl > span) return -1;
  return Math.max(0, Math.min(len - 1, Math.floor((span - dl) * len / span)));
}
function dayOpen(planId, i) { return PLANS[planId].days[i].tasks.some((_, ti) => !isChecked(planId, i, ti)); }

/* ─── Die gemeinsame "Wo bin ich?"-Funktion ───────────────────
   Home-Seite und Planseite verwenden beide nur diese Funktion. */
function planStatus() {
  const dl = daysLeft();
  const base = currentTab();
  const planId = planKey(base);
  const plan = PLANS[planId];
  const core = coreOnly();
  const vis = visibleDays(planId, core);
  let cal = calendarIndex(planId, dl);
  /* Aufholmodus: fällt "heute" auf einen ausgeblendeten Tag, gilt der nächste
     sichtbare Tag (sonst der letzte sichtbare davor). */
  if (cal >= 0 && vis.indexOf(cal) < 0) {
    const next = vis.filter(i => i > cal);
    cal = next.length ? next[0] : vis.filter(i => i < cal).pop();
    if (cal === undefined) cal = -1;
  }
  const isToday = cal >= 0;
  let dayIndex = cal;
  if (!isToday) {
    const open = vis.filter(i => dayOpen(planId, i));
    dayIndex = open.length ? open[0] : vis[vis.length - 1];
  }
  let total = 0, done = 0;
  vis.forEach(i => plan.days[i].tasks.forEach((_, ti) => { total++; if (isChecked(planId, i, ti)) done++; }));
  return {
    daysLeft: dl,
    planId: planId,
    base: base,
    dayIndex: dayIndex,
    dayNumber: dayIndex + 1,
    dayTitle: plan.days[dayIndex].title,
    isToday: isToday,
    started: dl !== null && dl > 0 && dl <= plan.span,
    done: done,
    total: total,
  };
}

/* ─── Render ──────────────────────────────────────────────── */
function plural(n, w) { return n + ' ' + w + (n === 1 ? '' : 's'); }
function dateControls() {
  const d = store('mwg_examdate');
  const dl = daysLeft();
  if (d && dl !== null) {
    const plan = PLANS[planKey(currentTab())];
    let msg;
    if (dl < 0) msg = '<strong>The saved exam date has passed.</strong>';
    else if (dl === 0) msg = '<strong>Today is the exam. Take a deep breath. You have prepared for this.</strong>';
    else {
      msg = '<strong>' + plural(dl, 'day') + ' until the exam.</strong>';
      if (dl > plan.span) msg += ' The ' + plan.name + ' plan starts in ' + plural(dl - plan.span, 'day') + '. Until then, work through it at your own speed.';
    }
    return '<div class="plan-date">' + msg + ' <button class="btn-text" data-action="plan-changedate">Change date</button></div>';
  }
  if (dateCardHidden) {
    return '<div class="plan-date"><button class="btn-text" data-action="plan-changedate">Set your exam date</button> to see a countdown and a &ldquo;Today&rdquo; marker.</div>';
  }
  return '<div class="plan-datecard card no-print">' +
    '<div class="plan-datecard-h">When is your written English Matura?</div>' +
    '<p class="plan-datecard-p">' + MAIN_DATE_NOTE + ' The date is saved only in this browser.</p>' +
    '<div class="plan-datecard-row">' +
      '<input type="date" id="planDate" aria-label="Exam date">' +
      '<button class="btn btn-primary btn-sm" data-action="plan-setdate">Save</button>' +
      '<button class="btn-text" data-action="plan-usemain">Use 11 May 2027</button>' +
      '<button class="btn-text" data-action="plan-skipdate">Skip for now</button>' +
    '</div></div>';
}

/* Haupttermin Englisch schriftlich 2027 (AHS/BHS/BRP), Quelle: matura.gv.at/pruefungstermine, Stand 05.10.2026 */
const MAIN_DATE = '2027-05-11';
const MAIN_DATE_NOTE = 'The main date for written English in 2027 is Tuesday, 11 May (AHS and BHS). If your exam is on another date, ask your teacher.';
function dayCard(planId, i, day, today) {
  const total = day.tasks.length;
  const doneN = day.tasks.filter((_, ti) => isChecked(planId, i, ti)).length;
  const mins = day.tasks.reduce((s, t) => s + t.min, 0);
  return '<div class="plan-day' + (doneN === total ? ' done' : '') + (today ? ' today' : '') + '"' + (today ? ' id="planToday"' : '') + '>' +
    '<div class="plan-day-head">' +
      '<span class="plan-day-num">Day ' + (i + 1) + (today ? '<span class="plan-today-badge">Today</span>' : '') + '</span>' +
      '<span class="plan-day-title">' + day.title + '</span>' +
      '<span class="plan-day-min">' + (mins ? '~' + mins + ' min' : '') + '</span>' +
    '</div>' +
    day.tasks.map((t, ti) =>
      '<label class="plan-task"><input type="checkbox" data-action="plan-check" data-plan="' + planId + '" data-day="' + i + '" data-task="' + ti + '"' + (isChecked(planId, i, ti) ? ' checked' : '') + '><span>' + t.t + '</span></label>').join('') +
  '</div>';
}

function planBody() {
  const s = planStatus();
  const planId = s.planId, base = s.base;
  const days = PLANS[planId].days;
  const core = coreOnly();
  const vis = visibleDays(planId, core);
  const today = s.isToday ? s.dayIndex : -1;
  const dl = s.daysLeft;
  let html = '';
  if (!tab && dl !== null && dl > 0 && base !== 'p4') {
    html += '<div class="tip plan-note">Your exam is ' + plural(dl, 'day') + ' away, so the ' + PLANS[planId].name + ' plan is selected. You can switch to another plan with the tabs above.</div>';
  }
  /* offene Aufgaben aus früheren Tagen (nur mit Kalender-Marker) */
  if (today > 0 && vis.some(i => i < today && dayOpen(planId, i))) {
    html += '<div class="tip plan-note">Some earlier days still have open tasks. Do today&rsquo;s day first and catch up when you have time' + (core ? '.' : ', or switch on &ldquo;Show only the essentials&rdquo; below.') + '</div>';
  }
  html += coreToggle();
  if (today > 1) html += '<p class="plan-jump no-print"><button class="btn-text" data-scroll-to="planToday">Jump to today: Day ' + (today + 1) + '</button></p>';
  const pct = s.total ? Math.round((s.done / s.total) * 100) : 0;
  html +=
    '<div class="plan-prog"><span class="plan-prog-l">Your progress' + (core ? ' (essentials)' : '') + '</span><span class="plan-prog-n">' + s.done + '/' + s.total + ' tasks · ' + pct + '%</span></div>' +
    '<div class="qbar plan-qbar"><i style="width:' + pct + '%"></i></div>';
  if (core) {
    html += '<p class="plan-core-note">Showing ' + vis.length + ' of ' + days.length + ' days: the essentials. The hidden days and your ticks are still saved.</p>';
  }
  if (base === 'p4') {
    for (let w = 1; w <= 4; w++) {
      const wdays = vis.filter(i => days[i].w === w);
      if (!wdays.length) continue;
      const wTotal = wdays.reduce((n, i) => n + days[i].tasks.length, 0);
      const wDone = wdays.reduce((n, i) => n + days[i].tasks.filter((_, ti) => isChecked(planId, i, ti)).length, 0);
      html += sectionLabel(WEEKS[w - 1]) +
        '<div class="plan-week-n">' + wDone + '/' + wTotal + ' done</div>' +
        wdays.map(i => dayCard(planId, i, days[i], i === today)).join('') +
        '<div class="gap-s"></div>';
    }
  } else {
    const intro = base === 'p14'
      ? 'Two weeks, one block per day, mostly 30 to 60 minutes. The two full runs near the end take as long as the real exam. The last day is a light day.'
      : 'One week is enough for the essentials if you do one block per day. ' + (isBhs() ? 'Start with the leaflet, the one text type that only BHS students write.' : 'Start with the essay while your head is fresh.');
    html += '<p class="plan-intro">' + intro + '</p>' +
      vis.map(i => dayCard(planId, i, days[i], i === today)).join('');
  }
  return html;
}

function coreToggle() {
  const on = coreOnly();
  return '<label class="plan-core no-print"><input type="checkbox" data-action="plan-core"' + (on ? ' checked' : '') + '><span>Behind? Show only the essentials</span></label>';
}

/* Modus: Schularbeit (plan-test.js) oder Matura. Gespeichert in mwg_plan_mode. */
function planMode() {
  const m = store('mwg_plan_mode');
  if (m === 'test' || m === 'matura') return m;
  return (store('mwg_examdate') && !(M.testPlan && M.testPlan.hasPlan())) ? 'matura' : 'test';
}
PAGES.studyplan = {
  title: 'Study plan', track: 'studyplan',
  render() {
    const mode = planMode();
    const base = currentTab();
    const head = pageHead('Plan', 'Study plan', 'A day-by-day plan for your next Schularbeit or for the Matura. Tick off what you have done and the plan remembers where you are.',
      '<div class="tabs">' +
        [['test', 'Schularbeit'], ['matura', 'Matura']].map(m => '<button class="tab' + (mode === m[0] ? ' active' : '') + '" data-action="plan-mode" data-mode="' + m[0] + '">' + m[1] + '</button>').join('') +
      '</div>');
    if (mode === 'test') {
      return '<div class="page">' + head +
        '<div class="wrap"><div class="gap-s"></div>' +
          '<div id="saBody">' + (M.testPlan ? M.testPlan.render() : '') + '</div>' +
          '<div class="page-end"></div>' +
        '</div></div>';
    }
    return '<div class="page">' + head +
      '<div class="wrap"><div class="gap-s"></div>' +
        '<div class="tabs filters mb-5" aria-label="Plan length">' +
          BASES.map(id => '<button class="tab' + (base === id ? ' active' : '') + '" data-action="plan-tab" data-tab="' + id + '">' + PLANS[id].label + '</button>').join('') +
        '</div>' +
        (isBhs() ? '<div class="tip plan-note">This is the BHS plan: three tasks, 195 minutes, and the leaflet instead of the essay. If you need the AHS version, switch the school type in the menu.</div>' : '') +
        dateControls() +
        '<div class="gap-s"></div>' +
        '<div id="planBody">' + planBody() + '</div>' +
        '<div class="page-end"></div>' +
      '</div></div>';
  },
};

/* ─── Home-Leiste (genau EIN Hinweis-Element) ─── */
function homeHint(progressHtml, next) {
  const s = planStatus();
  const dl = s.daysLeft;
  if (dl !== null && dl >= 0) {
    const green = dl <= 7;
    const link = dl === 0
      ? '<a href="#checklist" class="cd-bar no-print green"><span><strong>Exam day.</strong> Good luck!</span><span class="cd-link">Last look: final checklist <span aria-hidden="true">→</span></span></a>'
      : null;
    if (link) return link;
    return '<a href="#studyplan" class="cd-bar no-print' + (green ? ' green' : '') + '">' +
      '<span><strong>' + plural(dl, 'day') + ' until the exam.</strong></span>' +
      (progressHtml ? '<span class="cd-prog">' + progressHtml + '</span>' : '') +
      '<span class="cd-link">' + (s.isToday ? 'Today: ' : 'Continue with ') + 'Day ' + s.dayNumber + ' – ' + s.dayTitle + ' <span aria-hidden="true">→</span></span>' +
    '</a>';
  }
  if (progressHtml && next) {
    return '<a href="#' + next.id + '" class="cd-bar no-print"><span>' + progressHtml + '</span><span class="cd-link">Next up: ' + next.label + ' <span aria-hidden="true">→</span></span></a>';
  }
  if (progressHtml) {
    return '<a href="#studyplan" class="cd-bar no-print"><span>' + progressHtml + '. You have visited every section.</span><span class="cd-link">Open the countdown plan <span aria-hidden="true">→</span></span></a>';
  }
  return '<a href="#studyplan" class="cd-bar no-print subtle"><span>Set your exam date and get a day-by-day plan.</span><span class="cd-link">Open the countdown plan <span aria-hidden="true">→</span></span></a>';
}

/* Nach dem Speichern des Datums: Fokus auf die neue Überschrift (Startseite) bzw. das Datum (Planseite) */
function focusAfterDate() {
  const t = document.getElementById('startH') || document.querySelector('#main .plan-date') || document.querySelector('#main h1');
  if (t) { t.setAttribute('tabindex', '-1'); try { t.focus({ preventScroll: false }); } catch (e) {} }
}
M.planAction = function (act, el) {
  const ds = el.dataset;
  if (act.indexOf('plan-sa-') === 0) { if (M.testPlan) M.testPlan.action(act, el); return; }
  if (act === 'plan-mode') { store('mwg_plan_mode', ds.mode); M.route(); return; }
  if (act === 'plan-check') {
    const p = planState();
    p[ds.plan] = p[ds.plan] || {};
    p[ds.plan][ds.day] = p[ds.plan][ds.day] || [];
    p[ds.plan][ds.day][+ds.task] = el.checked;
    store('mwg_plan', p);
    const host = $('#planBody');
    if (host) M.setHTML(host, planBody());
    if (M.paintPlanChip) M.paintPlanChip();
  }
  else if (act === 'plan-core') {
    store('mwg_plan_core', !!el.checked);
    const host = $('#planBody');
    if (host) M.setHTML(host, planBody());
    if (M.paintPlanChip) M.paintPlanChip();
    if (M.announce) M.announce(el.checked ? 'Showing only the essential days.' : 'Showing all days.');
  }
  else if (act === 'plan-tab') { tab = ds.tab; M.route(); }
  else if (act === 'plan-setdate') {
    const v = $('#planDate') && $('#planDate').value;
    if (!v) { M.toast('Pick a date first'); return; }
    store('mwg_examdate', v);
    store('mwg_plan_mode', 'matura');
    tab = null;
    M.route();
    focusAfterDate();
    if (M.announce) M.announce('Exam date saved. Your plan is ready.');
  }
  else if (act === 'plan-usemain') { store('mwg_plan_mode', 'matura'); store('mwg_examdate', MAIN_DATE); tab = null; M.route(); focusAfterDate(); if (M.announce) M.announce('Exam date saved: 11 May 2027. Your plan is ready.'); }
  else if (act === 'plan-skipdate') { dateCardHidden = true; M.route(); }
  else if (act === 'plan-changedate') { dateCardHidden = false; tab = null; try { localStorage.removeItem('mwg_examdate'); } catch (e) {} M.route(); }
};
M.homeHint = homeHint;
M.planDaysLeft = daysLeft;
M.planStatus = planStatus;
M.planDay = function (planId, i) { const p = PLANS[planId]; return p && p.days[i] ? p.days[i] : null; };
M.planMainDate = MAIN_DATE;
M.planMainDateNote = MAIN_DATE_NOTE;
})();
