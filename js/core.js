/* ════════════════════════════════════════════════════════════
   App core – state, router, helpers
   ════════════════════════════════════════════════════════════ */
(function () {
'use strict';

/* ─── helpers ─────────────────────────────────────────────── */
const $ = (s, el) => (el || document).querySelector(s);
const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const TYPE_COLORS = { purple: 'var(--purple)', blue: 'var(--blue)', orange: 'var(--orange)', green: 'var(--green)', red: 'var(--red)' };
const ANN = {
  structure: { c: 'var(--blue)', label: 'Structure' },
  content:   { c: 'var(--green)', label: 'Content' },
  language:  { c: 'var(--yellow)', label: 'Language' },
  special:   { c: 'var(--purple)', label: 'Text-specific' },
};
const PEEL = { point: 'var(--blue)', explain: 'var(--green)', evidence: 'var(--yellow)', closing: 'var(--purple)' };

function store(key, val) {
  try { if (val === undefined) { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } localStorage.setItem(key, JSON.stringify(val)); } catch (e) { return null; }
}
let progress = store('mwg_progress') || {};
function markVisited(id) { progress[id] = Object.assign({}, progress[id], { visited: true }); store('mwg_progress', progress); paintNav(); }
function markQuiz(id) { progress[id] = Object.assign({}, progress[id], { quiz: true }); store('mwg_progress', progress); paintNav(); }

/* Screenreader-Announcement über die visuell versteckte Live-Region */
function announce(msg) {
  const r = document.getElementById('srlive');
  if (!r) return;
  r.textContent = '';
  setTimeout(() => { r.textContent = msg; }, 30);
}
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 1500);
}
function copyText(text, onDone) {
  const done = () => { toast('Copied to clipboard'); onDone && onDone(); };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text, done));
  } else fallbackCopy(text, done);
}
function fallbackCopy(text, done) {
  const ta = document.createElement('textarea');
  ta.value = text; ta.style.cssText = 'position:fixed;opacity:0';
  document.body.appendChild(ta); ta.select();
  try { document.execCommand('copy'); done(); } catch (e) { toast('Copy failed – select and copy manually'); }
  document.body.removeChild(ta);
}
/* visible success feedback on a copy trigger: chips flip their icon, buttons swap their label */
function flashCopied(el) {
  if (!el) return;
  if (el.classList.contains('chip')) {
    el.classList.add('copied');
    const ic = el.querySelector('.ic'); if (ic) ic.textContent = '✓';
    clearTimeout(el._ct); el._ct = setTimeout(() => { el.classList.remove('copied'); if (ic) ic.textContent = '⧉'; }, 1400);
    return;
  }
  if (!el.dataset.origLabel) el.dataset.origLabel = el.innerHTML;
  el.innerHTML = 'Copied ✓';
  el.classList.add('copied-btn');
  clearTimeout(el._ct); el._ct = setTimeout(() => { el.innerHTML = el.dataset.origLabel; el.classList.remove('copied-btn'); }, 1500);
}

/* annotated paragraph → HTML */
function annotated(para) {
  if (!para.annotations || !para.annotations.length) return '<p>' + esc(para.text) + '</p>';
  let parts = [{ text: para.text, type: null }];
  para.annotations.forEach(ann => {
    parts = parts.flatMap(part => {
      if (part.type !== null || part.text.indexOf(ann.span) === -1) return [part];
      const i = part.text.indexOf(ann.span);
      return [
        { text: part.text.slice(0, i), type: null },
        { text: ann.span, type: ann.type, label: ann.label },
        { text: part.text.slice(i + ann.span.length), type: null },
      ].filter(p => p.text);
    });
  });
  const inner = parts.map(p => {
    if (!p.type) return esc(p.text);
    const a = ANN[p.type] || ANN.language;
    return '<mark class="ann" tabindex="0" aria-label="' + esc(p.label) + '" style="--ann-c:' + a.c + ';--ann-bg:color-mix(in srgb,' + a.c + ' 15%,transparent)">' +
      esc(p.text) + '<span class="bub">' + esc(p.label) + '</span></mark>';
  }).join('');
  return '<p' + (para.isHeader ? ' style="font-family:var(--font-mono);font-size:.8125rem;line-height:1.8"' : '') + '>' + inner + '</p>';
}
function modelBox(model, extraNote) {
  return (
    '<div class="model-box">' +
      '<div class="model-head"><div class="legend">' +
        Object.keys(ANN).map(k => '<span><i style="background:color-mix(in srgb,' + ANN[k].c + ' 22%,transparent);border-bottom:2px solid ' + ANN[k].c + '"></i>' + ANN[k].label + '</span>').join('') +
      '</div><button class="btn btn-ghost btn-sm" data-action="toggle-labels">Show all labels</button></div>' +
      '<div class="model-body">' + model.paragraphs.map(annotated).join('') + '</div>' +
    '</div>' +
    '<div style="margin-top:11px;font-size:.75rem;color:var(--text-muted);letter-spacing:.32px">' +
      (extraNote || 'Hover (or tap) any highlighted passage to see its role. ' + esc(model.wordCount) + ' words · ' + esc(model.register) + ' register.') +
    '</div>'
  );
}
function sectionLabel(t, toc) { return '<h2 class="section-label"' + (toc ? ' id="sec-' + toc.id + '" data-toc-anchor="' + esc(toc.label) + '"' : '') + '>' + t + '</h2>'; }
function pageHead(eyebrow, title, lead, extra) {
  return '<div class="page-head"><div class="inner">' +
    '<div class="eyebrow">' + eyebrow + '</div>' +
    '<h1 class="title">' + title + '</h1>' +
    (lead ? '<p class="lead">' + lead + '</p>' : '') +
    (extra || '<div style="height:26px"></div>') +
  '</div></div>';
}
function ddCols(dos, donts) {
  return '<div class="grid g-2">' +
    '<div class="dd-col do"><h3>Do</h3><ul>' + dos.map(d => '<li>' + esc(d) + '</li>').join('') + '</ul></div>' +
    '<div class="dd-col dont"><h3>Don&rsquo;t</h3><ul>' + donts.map(d => '<li>' + esc(d) + '</li>').join('') + '</ul></div>' +
  '</div>';
}
function chips(items, prefix) {
  return '<div class="chips">' + items.map(p =>
    '<button class="chip" data-copy="' + esc(p) + '"><span class="ic">⧉</span><span>' + esc(p) + '</span></button>'
  ).join('') + '</div>';
}
function phraseGroups(groups) {
  return groups.map(g => '<div style="margin-bottom:30px"><h3 class="sub-label">' + esc(g.category || g.label) + '</h3>' + chips(g.items || g.phrases) + '</div>').join('');
}

/* ─── generic quiz engine ─────────────────────────────────── */
const quizStates = {};

/* Verlauf der letzten 5 Voll-Versuche pro Quiz (mwg_quizlog) */
function quizLog(qid) {
  const log = store('mwg_quizlog');
  return (log && typeof log === 'object' && Array.isArray(log[qid])) ? log[qid] : [];
}
function quizLogPush(qid, score, total) {
  const log = (store('mwg_quizlog') && typeof store('mwg_quizlog') === 'object') ? store('mwg_quizlog') : {};
  const arr = Array.isArray(log[qid]) ? log[qid] : [];
  arr.push({ d: new Date().toISOString().slice(0, 10), s: score, t: total });
  log[qid] = arr.slice(-5);
  store('mwg_quizlog', log);
}

function quizRunLength(st) { return st.queue ? st.queue.length : st.questions.length; }
function quizCurrentIndex(st) { return st.queue ? st.queue[st.current] : st.current; }

function quizHTML(qid) {
  const st = quizStates[qid];
  const qs = st.questions;
  if (st.done) {
    const runLen = quizRunLength(st);
    const score = st.answers.filter(a => a.correct).length;
    const misses = st.answers.filter(a => !a.correct);
    const attempts = quizLog(qid);
    const attemptsLine = attempts.length
      ? '<div style="font-size:.8125rem;color:var(--text-muted);margin-bottom:22px">Last attempts: ' + attempts.map(a => a.s + '/' + a.t).join(' · ') + '</div>'
      : '';
    return '<div class="quiz">' +
      '<div class="qscore">' + score + '/' + runLen + (st.retry ? ' <span style="font-size:.9rem;color:var(--text-muted);font-weight:400">retry round</span>' : '') + '</div>' +
      '<div style="font-size:1rem;color:var(--text-secondary);margin-bottom:10px">' +
        (st.retry
          ? (misses.length === 0 ? 'All fixed. Nice recovery.' : 'Getting closer – the rest is listed below.')
          : (score === qs.length ? 'Perfect score. You know this text type.' : score >= qs.length * 0.7 ? 'Good. Review the explanations below.' : 'Not there yet. Read the guide again, then retake the quiz.')) +
      '</div>' +
      attemptsLine +
      misses.map(a => {
        const q = qs[a.q];
        return '<div class="qmiss"><div style="font-weight:600;color:var(--text);margin-bottom:8px">' + esc(q.q) + '</div>' +
          '<div style="color:var(--red);margin-bottom:4px">✗ You chose: <s>' + esc(q.options[a.chosen]) + '</s></div>' +
          '<div style="color:var(--green);margin-bottom:8px">✓ Correct: ' + esc(q.options[q.correct]) + '</div>' +
          (q.explanation ? '<div style="color:var(--text-muted)">' + esc(q.explanation) + '</div>' : '') + '</div>';
      }).join('') +
      '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px">' +
        (misses.length ? '<button class="btn btn-primary" data-action="quiz-retry-wrong" data-quiz="' + qid + '">Retry wrong answers only (' + misses.length + ')</button>' : '') +
        '<button class="btn btn-ghost" data-action="quiz-restart" data-quiz="' + qid + '">Retake quiz</button>' +
      '</div>' +
    '</div>';
  }
  const runLen = quizRunLength(st);
  const q = qs[quizCurrentIndex(st)];
  const sel = st.selected;
  return '<div class="quiz">' +
    '<div class="qmeta"><span>' + (st.retry ? 'Retry · ' : '') + 'Question ' + (st.current + 1) + ' of ' + runLen + '</span><span>' + Math.round((st.current / runLen) * 100) + '%</span></div>' +
    '<div class="qbar"><i style="width:' + (st.current / runLen) * 100 + '%"></i></div>' +
    '<div class="qq">' + esc(q.q) + '</div>' +
    '<div class="qopts">' + q.options.map((o, i) => {
      let cls = '';
      if (sel !== null) { if (i === q.correct) cls = ' right'; else if (i === sel) cls = ' wrong'; }
      return '<button class="qopt' + cls + '" data-action="quiz-pick" data-quiz="' + qid + '" data-i="' + i + '"' + (sel !== null ? ' disabled' : '') + '><b>' + String.fromCharCode(65 + i) + '</b>' + esc(o) + '</button>';
    }).join('') + '</div>' +
    (sel !== null ? '<div class="qexpl">' + esc(q.explanation) + '</div>' : '') +
    (sel !== null ? '<button class="btn btn-primary" style="margin-top:16px" data-action="quiz-next" data-quiz="' + qid + '">' + (st.current < runLen - 1 ? 'Next question <span>→</span>' : 'See results <span>→</span>') + '</button>' : '') +
  '</div>';
}
/* Antwortoptionen mischen, damit die richtige Antwort nicht an der Position erkennbar ist */
function shuffleOptions(questions) {
  return questions.map(q => {
    const order = shuffle(q.options.map((_, i) => i));
    return Object.assign({}, q, { options: order.map(i => q.options[i]), correct: order.indexOf(q.correct) });
  });
}
function initQuiz(qid, questions, onComplete) {
  quizStates[qid] = { questions: shuffleOptions(questions), current: 0, selected: null, answers: [], done: false, onComplete, queue: null, retry: false };
}
function quizAction(action, qid, i) {
  const st = quizStates[qid]; if (!st) return;
  if (action === 'quiz-pick' && st.selected === null) {
    st.selected = i;
    const qi = quizCurrentIndex(st);
    st.answers.push({ q: qi, chosen: i, correct: i === st.questions[qi].correct });
  } else if (action === 'quiz-next') {
    if (st.current < quizRunLength(st) - 1) { st.current++; st.selected = null; }
    else {
      st.done = true;
      const score = st.answers.filter(a => a.correct).length;
      const total = quizRunLength(st);
      announce('Quiz finished. ' + score + ' of ' + total + ' correct.');
      if (!st.retry) {
        quizLogPush(qid, score, total);
        st.onComplete && st.onComplete(score, st.questions.length);
      }
    }
  } else if (action === 'quiz-restart') {
    st.questions = shuffleOptions(st.questions); st.current = 0; st.selected = null; st.answers = []; st.done = false; st.queue = null; st.retry = false;
  } else if (action === 'quiz-retry-wrong') {
    const missIdx = st.answers.filter(a => !a.correct).map(a => a.q);
    if (!missIdx.length) return;
    st.queue = missIdx; st.retry = true;
    st.current = 0; st.selected = null; st.answers = []; st.done = false;
  }
  const host = $('[data-quiz-host="' + qid + '"]');
  if (host) setHTML(host, quizHTML(qid));
}

/* ─── drag & drop engine ──────────────────────────────────── */
const dndStates = {};
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function initDnd(did, items) {
  const withOrder = items.map((it, i) => Object.assign({}, it, { order: i }));
  let sh = shuffle(withOrder), _g = 0;
  while (withOrder.length > 1 && sh.every((s, i) => s.order === i) && _g++ < 25) sh = shuffle(withOrder); // avoid trivially solved
  dndStates[did] = { items: withOrder, shuffled: sh, checked: false };
}
function dndHTML(did) {
  const st = dndStates[did];
  return '<div class="dnd" data-dnd="' + did + '">' + st.shuffled.map((s, i) => {
    const ok = st.checked && s.order === i, no = st.checked && s.order !== i;
    return '<div class="dnd-item' + (ok ? ' right' : '') + (no ? ' wrong' : '') + '" draggable="true" data-i="' + i + '">' +
      '<span class="dnd-grip" aria-hidden="true">⠿</span>' +
      '<div class="dnd-text">' + esc(s.text) +
        (st.checked ? '<div class="dnd-role ' + (ok ? 'ok' : 'no') + '">' + (ok ? '✓ ' + esc(s.role) : '✗ This position needs: ' + esc(st.items[i].role)) + '</div>' : '') +
      '</div>' +
      '<div class="dnd-btns no-print"><button data-action="dnd-up" data-dnd="' + did + '" data-i="' + i + '" aria-label="Move up">▲</button><button data-action="dnd-down" data-dnd="' + did + '" data-i="' + i + '" aria-label="Move down">▼</button></div>' +
    '</div>';
  }).join('') + '</div>' +
  '<div style="margin-top:18px;display:flex;gap:8px">' +
    (!st.checked
      ? '<button class="btn btn-primary" data-action="dnd-check" data-dnd="' + did + '">Check order</button>'
      : '<button class="btn btn-ghost" data-action="dnd-retry" data-dnd="' + did + '">Shuffle &amp; try again</button>') +
  '</div>';
}
function repaintDnd(did) {
  const host = $('[data-dnd-host="' + did + '"]');
  if (host) { setHTML(host, dndHTML(did)); wireDnd(did); }
}
function wireDnd(did) {
  const st = dndStates[did];
  const list = $('[data-dnd="' + did + '"]');
  if (!list) return;
  let dragIdx = null;
  $$('.dnd-item', list).forEach(el => {
    el.addEventListener('dragstart', () => { dragIdx = +el.dataset.i; el.classList.add('dragging'); });
    el.addEventListener('dragend', () => { dragIdx = null; el.classList.remove('dragging'); });
    el.addEventListener('dragover', e => { e.preventDefault(); el.classList.add('over'); });
    el.addEventListener('dragleave', () => el.classList.remove('over'));
    el.addEventListener('drop', e => {
      e.preventDefault();
      const to = +el.dataset.i;
      if (dragIdx === null || dragIdx === to) return;
      const arr = st.shuffled;
      const [m] = arr.splice(dragIdx, 1);
      arr.splice(to, 0, m);
      st.checked = false;
      repaintDnd(did);
    });
  });
}

/* ─── innerHTML ersetzen, ohne den Tastaturfokus auf <body> fallen zu lassen ───
   Merkt sich das fokussierte Element (id oder data-Attribute), setzt den Inhalt neu
   und fokussiert dasselbe Element wieder – oder das erste bedienbare Element im Host. */
function focusKey(el) {
  if (!el || el === document.body || el === document.documentElement) return null;
  if (el.id) return '#' + CSS.escape(el.id);
  const attrs = Array.prototype.filter.call(el.attributes, a => a.name.indexOf('data-') === 0 && a.name !== 'data-copy' && a.name !== 'data-orig-label')
    .map(a => '[' + a.name + '="' + CSS.escape(a.value) + '"]').join('');
  return attrs ? el.tagName.toLowerCase() + attrs : null;
}
function setHTML(host, html) {
  if (!host) return;
  const had = host.contains(document.activeElement);
  const key = had ? focusKey(document.activeElement) : null;
  host.innerHTML = html;
  if (!had) return;
  let el = null;
  if (key) { try { el = host.querySelector(key); } catch (e) { el = null; } }
  if (!el || el.disabled) el = host.querySelector('button:not([disabled]):not([tabindex="-1"]), [href], input, select, textarea, [tabindex="0"]');
  if (el) { try { el.focus({ preventScroll: true }); } catch (e) {} }
}

/* expose to other script blocks */
window.MWG = { $, $$, esc, TYPE_COLORS, ANN, PEEL, store, progress: () => progress, markVisited, markQuiz, toast, announce, copyText, flashCopied,
  annotated, modelBox, sectionLabel, pageHead, ddCols, chips, phraseGroups, setHTML,
  initQuiz, quizHTML, quizAction, quizStates, initDnd, dndHTML, repaintDnd, wireDnd, dndStates, shuffle };

/* ─── SCHOOL TYPE (AHS / BHS) ─────────────────────────────── */
const SCHOOLS = ['ahs', 'bhs'];
function getSchool() { const s = store('mwg_school'); return SCHOOLS.indexOf(s) >= 0 ? s : 'ahs'; }
function schoolChosen() { return SCHOOLS.indexOf(store('mwg_school')) >= 0; }
function schoolConfig() { return (window.SRDP && SRDP.schools && SRDP.schools[getSchool()]) || {}; }
function typesForSchool() {
  const s = getSchool();
  return ((window.SRDP && SRDP.textTypes) || []).filter(t => !t.schools || t.schools.indexOf(s) >= 0);
}
/* Beurteilungsraster mit schultyp-abhängigem Kriterium 2 */
function assessmentCriteria() {
  const base = (window.SRDP && SRDP.assessment && SRDP.assessment.criteria) ? SRDP.assessment.criteria.slice() : [];
  const c2 = schoolConfig().crit2;
  if (c2 && base[1]) base[1] = c2;
  return base;
}
function setSchool(s) {
  if (SCHOOLS.indexOf(s) < 0) return;
  store('mwg_school', s);
  document.documentElement.setAttribute('data-school', s);
  try {
    for (var qk in quizStates) { delete quizStates[qk]; }
    var vis = typesForSchool().map(function (t) { return t.id; });
    var W = window.MWG;
    if (W.scState && vis.indexOf(W.scState.type) < 0) W.scState.type = vis[0] || 'article';
    if (W.clState && W.clState.type !== 'general' && vis.indexOf(W.clState.type) < 0) W.clState.type = 'general';
    if (W.pbState && W.pbState.filter !== 'all' && vis.indexOf(W.pbState.filter) < 0) W.pbState.filter = 'all';
    if (W.tbState && W.tbState.filter !== 'all' && vis.indexOf(W.tbState.filter) < 0) W.tbState.filter = 'all';
  } catch (e) {}
  if (window.MWG.rebuildSearch) window.MWG.rebuildSearch();
  buildNav();
  const id = (location.hash || '#home').slice(1);
  const hidden = ((window.SRDP && SRDP.textTypes) || []).some(t => t.id === id && t.schools && t.schools.indexOf(s) < 0);
  if (hidden && location.hash && location.hash !== '#home') { location.hash = '#home'; toast('That text type is not part of the ' + (schoolConfig().label || s.toUpperCase()) + ' exam, so you are back on the home page.'); } /* triggers route via hashchange */
  else if (window.MWG.route) window.MWG.route();
  announce('Switched to ' + (schoolConfig().label || s.toUpperCase()));
}

/* ─── NAV ─────────────────────────────────────────────────── */
const NAV = [
  { divider: null, items: [{ id: 'home', label: 'Home' }] },
  /* Gruppen nach Tätigkeit: Learn (verstehen) · Text types · Practise (schreiben/üben) ·
     Reference (nachschlagen) · Plan (Zeit) · About */
  { divider: 'Learn', items: [
    { id: 'overview', label: 'Overview & grading' },
    { id: 'examiner', label: 'Grade like an examiner' },
    { id: 'faq', label: 'FAQ' },
  ]},
  { divider: 'Text types', items: [] }, // filled below
  { divider: 'Practise', items: [
    { id: 'paragraphs', label: 'Paragraph writing' },
    { id: 'taskbank', label: 'Task bank' },
    { id: 'selfcheck', label: 'Self-check studio' },
    { id: 'practice', label: 'Practice zone' },
  ]},
  { divider: 'Reference', items: [
    { id: 'phrasebank', label: 'Phrase bank' },
    { id: 'topicvocab', label: 'Topic vocabulary' },
    { id: 'grammar', label: 'Grammar kit' },
    { id: 'checklist', label: 'Writing checklist' },
  ]},
  { divider: 'Plan', items: [
    { id: 'studyplan', label: 'Countdown plan' },
    { id: 'timer', label: 'Exam timer' },
  ]},
  { divider: 'About', items: [
    { id: 'notebooklm', label: 'Gemini Notebook' },
    { id: 'teachers', label: 'For teachers' },
    { id: 'parents', label: 'Für Eltern & Datenschutz', lang: 'de' },
  ]},
];
NAV[2].items = typesForSchool().map(t => ({ id: t.id, label: t.name, color: t.color }));

function buildNav() {
  const nav = $('#sidenav');
  NAV[2].items = typesForSchool().map(t => ({ id: t.id, label: t.name, color: t.color }));
  const scfg = schoolConfig();
  nav.innerHTML =
    '<div class="nav-brand" style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px"><div><div class="t1">Don&rsquo;t Panic, It&rsquo;s Just the Matura</div><div class="t2">' + esc(scfg.brandTag || 'English Writing · B2') + '</div></div><div style="display:flex;gap:6px;flex-shrink:0"><button class="nav-help" data-action="open-search" title="Search (Ctrl+K)" aria-label="Search this guide">⌕</button><button class="nav-help" data-action="start-tour" title="Replay the guided tour" aria-label="Replay the guided tour">?</button></div></div>' +
    '<div class="nav-school-label" style="padding:10px 22px 4px;font-size:.75rem;text-transform:uppercase;letter-spacing:.4px;color:var(--text-muted)">School type <span lang="de">(Schultyp)</span></div>' +
    '<div class="school-switch" role="group" aria-label="Schultyp (AHS oder BHS)">' +
      SCHOOLS.map(function (s) { var sc = (window.SRDP && SRDP.schools && SRDP.schools[s]) || {}; var on = getSchool() === s; return '<button class="school-btn' + (on ? ' active' : '') + '" data-action="set-school" data-school="' + s + '" aria-pressed="' + on + '" title="Switch to ' + esc(sc.label || s.toUpperCase()) + '">' + esc(sc.label || s.toUpperCase()) + '</button>'; }).join('') +
    '</div>' +
    '<div class="nav-scroll">' +
      NAV.map(sec =>
        (sec.divider ? '<div class="nav-divider">' + sec.divider + '</div>' : '') +
        sec.items.map(it =>
          '<a class="nav-item" href="#' + it.id + '" data-nav="' + it.id + '">' +
            (it.color ? '<span class="nav-dot" aria-hidden="true" style="background:' + TYPE_COLORS[it.color] + '"></span>' : '') +
            '<span' + (it.lang ? ' lang="' + it.lang + '"' : '') + '>' + esc(it.label) + '</span><span class="nav-check" data-check="' + it.id + '"></span>' +
          '</a>'
        ).join('')
      ).join('') +
    '</div>' +
    '<div style="padding:6px 22px 2px;font-size:.75rem;color:var(--text-muted);letter-spacing:.3px">&#10003; visited &middot; &#10003;&#10003; quiz passed</div>' +
    '<button class="theme-toggle" id="themeToggle" role="switch" aria-checked="' + (document.documentElement.getAttribute('data-theme') === 'dark') + '" aria-label="Dark mode"><span class="lab" id="themeLabel">' + (document.documentElement.getAttribute('data-theme') === 'dark' ? 'Dark mode' : 'Light mode') + '</span><span class="toggle-track"><span class="toggle-knob"></span></span></button>';
  $('#themeToggle').addEventListener('click', () => {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    setTheme(dark ? 'light' : 'dark');
  });
}
function setTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  store('mwg_theme', t);
  const l = $('#themeLabel'); if (l) l.textContent = t === 'dark' ? 'Dark mode' : 'Light mode';
  const tg = $('#themeToggle'); if (tg) tg.setAttribute('aria-checked', t === 'dark');
}
function paintNav() {
  $$('[data-check]').forEach(el => {
    const p = progress[el.dataset.check];
    el.textContent = p && p.quiz ? '✓✓' : p && p.visited ? '✓' : '';
    el.title = p && p.quiz ? 'Guide read + quiz completed' : p && p.visited ? 'Visited' : '';
  });
}
window.MWG.paintNav = paintNav;
window.MWG.NAV = NAV;
window.MWG.buildNav = buildNav;
window.MWG.setTheme = setTheme;
window.MWG.school = getSchool;
window.MWG.schoolChosen = schoolChosen;
window.MWG.schoolConfig = schoolConfig;
window.MWG.typesForSchool = typesForSchool;
window.MWG.assessmentCriteria = assessmentCriteria;
window.MWG.setSchool = setSchool;
window.MWG.SCHOOLS = SCHOOLS;
})();
