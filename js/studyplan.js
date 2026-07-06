/* ════════════════════════════════════════════════════════════
   Countdown plan – 4-Wochen- und 7-Tage-Lernplan mit Countdown
   ════════════════════════════════════════════════════════════ */
(function () {
'use strict';
const M = window.MWG;
const { $, $$, esc, store, sectionLabel, pageHead } = M;

/* ─── Pläne ───────────────────────────────────────────────── */
const P4 = [
  /* Woche 1 – Fundament */
  { w: 1, title: 'Read the rules of the game', tasks: [
    { t: 'Read <a href="#overview">Overview &amp; grading</a> from top to bottom. Slowly. This is the map for everything else.', min: 25 },
    { t: 'Close the page and write down the four criteria from memory. Check yourself.', min: 5 },
  ]},
  { w: 1, title: 'Meet the essay', tasks: [
    { t: 'Work through the <a href="#essay">essay guide</a>: layout, do&rsquo;s and don&rsquo;ts, weaker vs. stronger.', min: 25 },
    { t: 'Take the essay quiz until you pass it.', min: 10 },
  ]},
  { w: 1, title: 'Paragraphs are the unit of thought', tasks: [
    { t: 'Do the <a href="#paragraphs">Paragraph writing</a> section: the four layers, then at least two warm-ups.', min: 30 },
    { t: 'Read the essay <a href="#essay">model text</a> and find the topic sentence of each paragraph.', min: 10 },
  ]},
  { w: 1, title: 'First real essay', tasks: [
    { t: 'Pick an essay task from the <a href="#taskbank">Task bank</a> and write it. No timer yet, but in one sitting.', min: 45 },
  ]},
  { w: 1, title: 'Feedback day', tasks: [
    { t: 'Run yesterday&rsquo;s essay through the <a href="#selfcheck">Self-check studio</a> and fix what it finds.', min: 20 },
    { t: 'Look up your two most annoying mistakes in the <a href="#grammar">Grammar kit</a>.', min: 15 },
  ]},
  /* Woche 2 – kurze Textsorten */
  { w: 2, title: 'The article', tasks: [
    { t: 'Work through the <a href="#article">article guide</a> and model text.', min: 25 },
    { t: 'Take the article quiz.', min: 10 },
  ]},
  { w: 2, title: 'The report', tasks: [
    { t: 'Work through the <a href="#report">report guide</a>. Note: headings are mandatory, numbering is not.', min: 25 },
    { t: 'Take the report quiz.', min: 10 },
  ]},
  { w: 2, title: 'Write an article', tasks: [
    { t: 'Write a ~250-word article from the <a href="#taskbank">Task bank</a>, then <a href="#selfcheck">self-check</a> it.', min: 45 },
  ]},
  { w: 2, title: 'Write a report', tasks: [
    { t: 'Write a ~250-word report from the <a href="#taskbank">Task bank</a>, then <a href="#selfcheck">self-check</a> it.', min: 45 },
  ]},
  { w: 2, title: 'Upgrade your connectors', tasks: [
    { t: 'Learn the B2 linking words table in the <a href="#grammar">Grammar kit</a> – five new ones, used in real sentences.', min: 20 },
    { t: 'Do one topic in <a href="#topicvocab">Topic vocabulary</a> as flashcards.', min: 15 },
  ]},
  /* Woche 3 – Blog, E-Mail, Sprache */
  { w: 3, title: 'The blog', tasks: [
    { t: 'Work through the <a href="#blog">blog guide</a> – register is everything here.', min: 25 },
    { t: 'Take the blog quiz.', min: 10 },
  ]},
  { w: 3, title: 'The e-mail', tasks: [
    { t: 'Work through the <a href="#email">e-mail guide</a> and all four sub-types.', min: 30 },
    { t: 'Take the e-mail quiz.', min: 10 },
  ]},
  { w: 3, title: 'Write a formal e-mail', tasks: [
    { t: 'Write a complaint or application from the <a href="#taskbank">Task bank</a>, then <a href="#selfcheck">self-check</a> it.', min: 45 },
  ]},
  { w: 3, title: 'German-to-English traps', tasks: [
    { t: 'Do five topics in the <a href="#grammar">Grammar kit</a>: articles, since/for, if-clauses, false friends, word order.', min: 35 },
  ]},
  { w: 3, title: 'Phrase day', tasks: [
    { t: 'Pick ten phrases from the <a href="#phrasebank">Phrase bank</a> you will actually use, and copy them into your notes.', min: 20 },
    { t: 'One more <a href="#topicvocab">flashcard</a> session – let the boxes do their work.', min: 15 },
  ]},
  /* Woche 4 – Generalprobe */
  { w: 4, title: 'Dress rehearsal I', tasks: [
    { t: 'Full exam simulation from the <a href="#taskbank">Task bank</a>: one ~400-word and one ~250-word task, 120 minutes, no phone, no dictionary.', min: 120 },
  ]},
  { w: 4, title: 'Debrief day', tasks: [
    { t: 'Run both rehearsal texts through the <a href="#selfcheck">Self-check studio</a>, including the AI feedback prompt.', min: 30 },
    { t: 'Write your personal top-5 mistake list. Keep it next to you this week.', min: 10 },
  ]},
  { w: 4, title: 'Practice zone day', tasks: [
    { t: 'In the <a href="#practice">Practice zone</a>: Spot the mistakes, Register gym, and the final quiz.', min: 40 },
  ]},
  { w: 4, title: 'Close the gaps', tasks: [
    { t: 'Retake your weakest quizzes (the menu shows which sections have no ✓✓ yet).', min: 25 },
    { t: 'Read the <a href="#checklist">Writing checklist</a> once, slowly.', min: 15 },
  ]},
  { w: 4, title: 'Dress rehearsal II', tasks: [
    { t: 'One more 120-minute run with two fresh <a href="#taskbank">tasks</a>. Then stop revising. Seriously.', min: 120 },
  ]},
];

const P7 = [
  { w: 0, title: 'The map and the main event', tasks: [
    { t: 'Read <a href="#overview">Overview &amp; grading</a> – you need to know how points are won and lost.', min: 25 },
    { t: 'Work through the <a href="#essay">essay guide</a> and take the quiz.', min: 35 },
  ]},
  { w: 0, title: 'Write the essay', tasks: [
    { t: 'Write a ~400-word essay from the <a href="#taskbank">Task bank</a> in 65 minutes, then <a href="#selfcheck">self-check</a> it.', min: 90 },
  ]},
  { w: 0, title: 'The formal e-mail', tasks: [
    { t: 'Work through the <a href="#email">e-mail guide</a> with sub-types, take the quiz.', min: 40 },
    { t: 'Learn the opening/closing pairs by heart – they are free points.', min: 10 },
  ]},
  { w: 0, title: 'Your second short type', tasks: [
    { t: 'Pick the short type your school favours – <a href="#article">article</a> or <a href="#report">report</a> – and do guide + quiz.', min: 40 },
  ]},
  { w: 0, title: 'Write it under time', tasks: [
    { t: 'Write a ~250-word text from the <a href="#taskbank">Task bank</a> in 40 minutes, then <a href="#selfcheck">self-check</a> with AI feedback.', min: 70 },
  ]},
  { w: 0, title: 'Sharpen the language', tasks: [
    { t: 'Grammar kit top five: articles, since/for, if-clauses, false friends, word order – in the <a href="#grammar">Grammar kit</a>.', min: 35 },
    { t: 'Take the <a href="#practice">final quiz</a>.', min: 15 },
  ]},
  { w: 0, title: 'Full run, then rest', tasks: [
    { t: 'Both tasks, 120 minutes, exam conditions, from the <a href="#taskbank">Task bank</a>.', min: 120 },
    { t: 'Then close this site and sleep. A rested brain beats a crammed one.', min: 0 },
  ]},
];

const PLANS = { p4: { label: '4 weeks', days: P4 }, p7: { label: '7 days', days: P7 } };

/* ─── Datum / Countdown (Europe/Vienna, Tagesgrenze Mitternacht) ─ */
function viennaToday() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Vienna' });
}
function daysLeft() {
  const d = store('mwg_examdate');
  if (!d) return null;
  const t = new Date(viennaToday() + 'T00:00:00Z').getTime();
  const e = new Date(d + 'T00:00:00Z').getTime();
  return Math.round((e - t) / 86400000);
}

/* ─── Zustand ─────────────────────────────────────────────── */
let tab = null;            /* 'p4' | 'p7' – null = automatisch */
let dateCardHidden = false; /* „Skip for now" nur für diese Sitzung */

function planState() {
  const p = store('mwg_plan');
  return (p && typeof p === 'object') ? p : {};
}
function isChecked(planId, day, task) {
  const p = planState();
  return !!(p[planId] && p[planId][day] && p[planId][day][task]);
}
function currentTab() {
  if (tab) return tab;
  const dl = daysLeft();
  return (dl !== null && dl >= 0 && dl < 14) ? 'p7' : 'p4';
}
function todayIndex(planId) {
  const dl = daysLeft();
  if (dl === null || dl < 0) return -1;
  const len = PLANS[planId].days.length;
  return Math.max(0, Math.min(len - 1, len - dl));
}
function firstOpenDay(planId) {
  const days = PLANS[planId].days;
  for (let i = 0; i < days.length; i++) {
    if (days[i].tasks.some((_, ti) => !isChecked(planId, i, ti))) return i;
  }
  return days.length - 1;
}

/* ─── Render ──────────────────────────────────────────────── */
function dateControls() {
  const d = store('mwg_examdate');
  if (d) {
    const dl = daysLeft();
    return '<div class="plan-date">' +
      (dl >= 0
        ? '<strong>' + (dl === 0 ? 'Today is the day. Breathe – you know this.' : dl + ' day' + (dl === 1 ? '' : 's') + ' until the exam.') + '</strong>'
        : '<strong>The saved exam date has passed.</strong>') +
      ' <button class="tc-skip" data-action="plan-changedate">Change date</button></div>';
  }
  if (dateCardHidden) {
    return '<div class="plan-date"><button class="tc-skip" data-action="plan-changedate">Set your exam date</button> to see a countdown and a &ldquo;today&rdquo; marker.</div>';
  }
  return '<div class="plan-datecard card no-print">' +
    '<div style="font-weight:600;margin-bottom:6px">When is your written English Matura?</div>' +
    '<p style="font-size:.8125rem;color:var(--text-muted);margin-bottom:12px">Your teacher knows the exact date – the written English Matura is usually in early May. The date is saved only in this browser.</p>' +
    '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">' +
      '<input type="date" id="planDate" aria-label="Exam date" style="padding:9px 12px;border:1px solid var(--border-strong);background:var(--surface);color:var(--text);font-family:inherit">' +
      '<button class="btn btn-primary btn-sm" data-action="plan-setdate">Save</button>' +
      '<button class="tc-skip" data-action="plan-skipdate">Skip for now</button>' +
    '</div></div>';
}

function dayCard(planId, i, day, today) {
  const total = day.tasks.length;
  const doneN = day.tasks.filter((_, ti) => isChecked(planId, i, ti)).length;
  const mins = day.tasks.reduce((s, t) => s + t.min, 0);
  return '<div class="plan-day' + (doneN === total ? ' done' : '') + (today ? ' today' : '') + '">' +
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
  const planId = currentTab();
  const days = PLANS[planId].days;
  const today = todayIndex(planId);
  const dl = daysLeft();
  const autoNote = (!tab && planId === 'p7' && dl !== null)
    ? '<div class="tip" style="margin-bottom:18px">Less than two weeks to go, so the 7-day plan is pre-selected. The 4-week tab is still there if you want the long version.</div>' : '';
  const allTasks = days.reduce((s, d) => s + d.tasks.length, 0);
  const doneTasks = days.reduce((s, d, i) => s + d.tasks.filter((_, ti) => isChecked(planId, i, ti)).length, 0);
  const pct = Math.round((doneTasks / allTasks) * 100);
  let html = autoNote +
    '<div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px"><span class="section-label" style="border:none;padding:0;margin:0">Your progress</span><span style="font-size:.875rem;color:var(--text-muted)">' + doneTasks + '/' + allTasks + ' tasks · ' + pct + '%</span></div>' +
    '<div class="qbar" style="margin-bottom:26px"><i style="width:' + pct + '%"></i></div>';
  if (planId === 'p4') {
    for (let w = 1; w <= 4; w++) {
      const wdays = days.map((d, i) => [d, i]).filter(x => x[0].w === w);
      const wTotal = wdays.reduce((s, x) => s + x[0].tasks.length, 0);
      const wDone = wdays.reduce((s, x) => s + x[0].tasks.filter((_, ti) => isChecked(planId, x[1], ti)).length, 0);
      html += sectionLabel(['Week 1 – the foundation', 'Week 2 – the short text types', 'Week 3 – blog, e-mail, language', 'Week 4 – the dress rehearsal'][w - 1]) +
        '<div style="font-size:.75rem;color:var(--text-muted);margin:-6px 0 12px">' + wDone + '/' + wTotal + ' done</div>' +
        wdays.map(x => dayCard(planId, x[1], x[0], x[1] === today)).join('');
      html += '<div class="gap-s"></div>';
    }
  } else {
    html += '<p style="font-size:1rem;color:var(--text-secondary);margin-bottom:18px">So you have one week. Don&rsquo;t panic – a focused week beats a distracted month. One block per day, essay first.</p>' +
      days.map((d, i) => dayCard(planId, i, d, i === today)).join('');
  }
  return html;
}

PAGES.studyplan = {
  title: 'Countdown plan', track: 'studyplan',
  render() {
    const planId = currentTab();
    return '<div class="page">' +
      pageHead('Basics', 'Countdown plan', 'A day-by-day route to the written exam: read, practise, write, repeat. Tick things off – the plan remembers where you are.',
        '<div class="tabs">' +
          ['p4', 'p7'].map(id => '<button class="tab' + (planId === id ? ' active' : '') + '" data-action="plan-tab" data-tab="' + id + '">' + PLANS[id].label + '</button>').join('') +
        '</div>') +
      '<div class="wrap"><div class="gap-s"></div>' +
        dateControls() +
        '<div class="gap-s"></div>' +
        '<div id="planBody">' + planBody() + '</div>' +
        '<div style="height:72px"></div>' +
      '</div></div>';
  },
};

/* ─── Home-Leiste (Anti-Banner-Regel: genau EIN Hinweis-Element) ─ */
function homeHint(progressHtml, next) {
  const d = store('mwg_examdate');
  if (d) {
    const dl = daysLeft();
    const planId = currentTab();
    const day = firstOpenDay(planId) + 1;
    if (dl !== null && dl >= 0) {
      const green = dl <= 7;
      return '<a href="#studyplan" class="cd-bar no-print' + (green ? ' green' : '') + '">' +
        '<span><strong>' + (dl === 0 ? 'Exam day.' : dl + ' day' + (dl === 1 ? '' : 's') + ' until the exam.') + '</strong>' +
        (green ? ' You&rsquo;ve got this.' : '') + '</span>' +
        (progressHtml ? '<span class="cd-prog">' + progressHtml + '</span>' : '') +
        '<span class="cd-link">Continue with Day ' + day + ' <span aria-hidden="true">→</span></span>' +
      '</a>';
    }
  }
  if (progressHtml && next) {
    return '<a href="#' + next.id + '" class="cd-bar no-print"><span>' + progressHtml + '</span><span class="cd-link">Next up: ' + next.label + ' <span aria-hidden="true">→</span></span></a>';
  }
  if (progressHtml) {
    return '<a href="#studyplan" class="cd-bar no-print"><span>' + progressHtml + ' – every section visited.</span><span class="cd-link">Open the countdown plan <span aria-hidden="true">→</span></span></a>';
  }
  return '<a href="#studyplan" class="cd-bar no-print subtle"><span>Set your exam date and get a day-by-day plan.</span><span class="cd-link">Open the countdown plan <span aria-hidden="true">→</span></span></a>';
}

M.planAction = function (act, el) {
  const ds = el.dataset;
  if (act === 'plan-check') {
    const p = planState();
    p[ds.plan] = p[ds.plan] || {};
    p[ds.plan][ds.day] = p[ds.plan][ds.day] || [];
    p[ds.plan][ds.day][+ds.task] = el.checked;
    store('mwg_plan', p);
    /* nur den Plan-Body neu rendern – Scrollposition bleibt erhalten */
    const host = $('#planBody');
    if (host) host.innerHTML = planBody();
  }
  else if (act === 'plan-tab') { tab = ds.tab; M.route(); }
  else if (act === 'plan-setdate') {
    const v = $('#planDate') && $('#planDate').value;
    if (!v) { M.toast('Pick a date first'); return; }
    store('mwg_examdate', v);
    tab = null;
    M.route();
  }
  else if (act === 'plan-skipdate') { dateCardHidden = true; M.route(); }
  else if (act === 'plan-changedate') { dateCardHidden = false; try { localStorage.removeItem('mwg_examdate'); } catch (e) {} M.route(); }
};
M.homeHint = homeHint;
M.planDaysLeft = daysLeft;
})();
