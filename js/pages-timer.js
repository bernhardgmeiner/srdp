/* ════════════════════════════════════════════════════════════
   Mock exam (Route-ID "timer"): Aufgaben wählen → Prüfungsuhr → Texte prüfen
   AHS 120 min · 2 Aufgaben (~400 + ~250)  |  BHS 195 min · 3 Aufgaben (~250)
   Uhr zeitstempel-basiert (bleibt genau), stoppt sich selbst beim Verlassen
   der Seite, Meilenstein-Ansagen über M.announce.
   Aktionen kommen über boot.js als M.mockAction(act) – ohne Element, daher
   stecken Parameter im Aktionsnamen (mock-full-1, mock-change-0, mock-check-2).
   ════════════════════════════════════════════════════════════ */
(function () {
'use strict';
const M = window.MWG;
const { $, esc, sectionLabel, pageHead } = M;

const PLANS = {
  ahs: { total: 120, label: '2 tasks · 120 minutes · no dictionary', lengths: [400, 250],
    windows: [65, 40], check: 15, checkLab: 'Read through and correct both texts' },
  bhs: { total: 195, label: '3 tasks · 195 minutes · dictionary allowed', lengths: [250, 250, 250],
    windows: [60, 60, 60], check: 15, checkLab: 'Read through and correct all three texts' },
};

let st = null;          /* Uhr: { school, total(sec), remaining(sec), endAt(ms|null), running } */
let iv = null;
let lastMk = -1;
/* Aufgaben-Set pro Schultyp, nur für diese Sitzung:
   { picks: [promptIndex…], open: {slot:true}, choosing: slot|-1, finished: bool } */
const sets = {};

function schoolId() { return (M.school && M.school() === 'bhs') ? 'bhs' : 'ahs'; }
function plan() { return PLANS[schoolId()]; }

/* ─── Aufgaben ─────────────────────────────────────────────── */
function pool() { return (M.tbPrompts ? M.tbPrompts() : []); }
function prompt(i) { return (window.SRDP && SRDP.prompts) ? SRDP.prompts[i] : null; }
function typeOf(p) { return ((window.SRDP && SRDP.textTypes) || []).find(t => t.id === p.type); }
function typeName(p) { const t = typeOf(p); return t ? t.name : p.type; }
function shuffle(a) { return M.shuffle ? M.shuffle(a) : a.slice().sort(() => Math.random() - 0.5); }

/* Kandidaten für einen Platz: passende Länge, nicht schon in einem anderen Platz */
function candidates(slot, picks) {
  const len = plan().lengths[slot];
  const fit = pool().filter(x => x.p.length === len && picks.indexOf(x.i) < 0);
  /* Wie in der echten Prüfung: jede Aufgabe eine andere Textsorte (falls möglich) */
  const types = picks.map(i => prompt(i) && prompt(i).type);
  const diff = fit.filter(x => types.indexOf(x.p.type) < 0);
  return diff.length ? diff : fit;
}
/* Vorschlag: AHS = ~400 + ~250 anderer Typ; BHS = drei ~250, möglichst Leaflet + E-Mail + ein dritter Typ */
function suggest(avoid) {
  avoid = avoid || [];
  const all = pool();
  const fresh = xs => { const f = xs.filter(x => avoid.indexOf(x.i) < 0); return shuffle(f.length ? f : xs); };
  const picks = [];
  const used = [];
  function take(xs) { const x = xs.find(y => picks.indexOf(y.i) < 0); if (x) { picks.push(x.i); used.push(x.p.type); } return !!x; }
  if (schoolId() === 'ahs') {
    take(fresh(all.filter(x => x.p.length === 400)));
    take(fresh(all.filter(x => x.p.length === 250 && used.indexOf(x.p.type) < 0)));
  } else {
    const short = all.filter(x => x.p.length === 250);
    take(fresh(short.filter(x => x.p.type === 'leaflet')));
    take(fresh(short.filter(x => x.p.type === 'email')));
    while (picks.length < 3) {
      const rest = short.filter(x => used.indexOf(x.p.type) < 0);
      if (!take(fresh(rest.length ? rest : short))) break;
    }
  }
  /* Notfall (z. B. leere Kategorie): mit beliebigen passenden Aufgaben auffüllen */
  plan().lengths.forEach((len, slot) => {
    if (picks[slot] === undefined) { const c = candidates(slot, picks); if (c.length) picks[slot] = c[0].i; }
  });
  return picks;
}
function getSet() {
  const id = schoolId();
  const valid = pool().map(x => x.i);
  let s = sets[id];
  if (!s || s.picks.length !== plan().lengths.length || s.picks.some((i, slot) => valid.indexOf(i) < 0 || !prompt(i) || prompt(i).length !== plan().lengths[slot])) {
    s = sets[id] = { picks: suggest(), open: {}, choosing: -1, finished: s ? s.finished : false };
  }
  return s;
}

function materialBox(m) {
  if (!m || !m.lines) return '';
  return '<div class="mx-mat">' +
    '<div class="mx-mat-l">' + esc(m.label) + '</div>' +
    (m.source ? '<div class="mx-mat-s">' + esc(m.source) + '</div>' : '') +
    (m.kind === 'data'
      ? '<ul class="mx-mat-data">' + m.lines.map(l => '<li>' + esc(l) + '</li>').join('') + '</ul>'
      : m.lines.map(l => '<p class="mx-mat-text">' + esc(l) + '</p>').join('')) +
  '</div>';
}
function materialText(m) {
  if (!m || !m.lines) return '';
  return '\n\n' + m.label.toUpperCase() + (m.source ? '\n' + m.source : '') + '\n' + (m.kind === 'data' ? m.lines.map(l => '• ' + l).join('\n') : m.lines.join('\n'));
}
function fullText(p) {
  return p.scenario + materialText(p.material) + '\n\n' + p.instruction + '\n\nIn your ' + typeName(p).toLowerCase() + ' you should:\n• ' + p.bullets.join('\n• ');
}
function taskColor(p) { const t = typeOf(p); return t && M.TYPE_COLORS ? (M.TYPE_COLORS[t.color] || 'var(--primary)') : 'var(--primary)'; }

function taskCard(s, slot) {
  const i = s.picks[slot];
  const p = prompt(i);
  if (!p) return '';
  const open = !!s.open[slot];
  const choosing = s.choosing === slot;
  const cands = candidates(slot, s.picks.filter((_, k) => k !== slot)).filter(x => x.i !== i);
  const groups = {};
  cands.forEach(x => { (groups[x.p.type] = groups[x.p.type] || []).push(x); });
  return '<li class="mx-task" style="--mx-c:' + taskColor(p) + '">' +
    '<div class="mx-task-top">' +
      '<span class="mx-task-n">Task ' + (slot + 1) + '</span>' +
      '<span class="mx-task-type"><i aria-hidden="true"></i>' + esc(typeName(p)) + '</span>' +
      '<span class="badge">~' + p.length + ' words</span>' +
    '</div>' +
    '<div class="mx-task-topic">' + esc(p.topic) + '</div>' +
    '<div class="mx-task-btns">' +
      '<button class="btn btn-ghost btn-sm" data-action="mock-full-' + slot + '" aria-expanded="' + open + '" aria-controls="mxFull' + slot + '">' + (open ? 'Hide the task' : 'Show the full task') + '</button>' +
      (cands.length ? '<button class="btn btn-ghost btn-sm" data-action="mock-change-' + slot + '" aria-expanded="' + choosing + '" aria-controls="mxPick' + slot + '">Choose another task</button>' : '') +
    '</div>' +
    (choosing
      ? '<div class="mx-pick" id="mxPick' + slot + '">' +
          '<label for="mxSel' + slot + '">Pick task ' + (slot + 1) + ' (about ' + p.length + ' words)</label>' +
          '<select id="mxSel' + slot + '" data-slot="' + slot + '">' +
            '<option value="' + i + '" selected>' + esc(typeName(p) + ': ' + p.topic) + ' (current)</option>' +
            Object.keys(groups).map(type => '<optgroup label="' + esc(typeName(groups[type][0].p)) + '">' +
              groups[type].map(x => '<option value="' + x.i + '">' + esc(typeName(x.p) + ': ' + x.p.topic) + '</option>').join('') +
            '</optgroup>').join('') +
          '</select>' +
        '</div>'
      : '') +
    '<div class="mx-full" id="mxFull' + slot + '"' + (open ? '' : ' hidden') + '>' +
      (open
        ? '<p class="mx-scen">' + esc(p.scenario) + '</p>' +
          materialBox(p.material) +
          '<p class="mx-instr">' + esc(p.instruction) + '</p>' +
          '<p class="mx-should">In your ' + esc(typeName(p).toLowerCase()) + ' you should:</p>' +
          '<ul class="mx-bullets">' + p.bullets.map(b => '<li>' + esc(b) + '</li>').join('') + '</ul>' +
          '<button class="btn btn-ghost btn-sm" data-copy="' + esc(fullText(p)) + '">Copy task ' + (slot + 1) + '</button>'
        : '') +
    '</div>' +
  '</li>';
}
function tasksHTML() {
  const s = getSet();
  if (!s.picks.length) return '<p class="mock-lead">No tasks found for your school type. Pick tasks yourself in the <a href="#taskbank">Task bank</a>.</p>';
  return '<ol class="mx-tasks">' + s.picks.map((_, slot) => taskCard(s, slot)).join('') + '</ol>' +
    '<button class="btn btn-ghost" data-action="mock-shuffle">Give me different tasks</button>';
}

/* ─── Zeitplan neben der Uhr ───────────────────────────────── */
function splitHTML() {
  const s = getSet(), p = plan();
  return '<ol class="mock-plan">' +
    p.windows.map((min, slot) => {
      const pr = prompt(s.picks[slot]);
      return '<li><span class="mp-min">' + min + ' min</span><span class="mp-lab">Task ' + (slot + 1) +
        (pr ? ': ' + esc(typeName(pr)) + ', about ' + pr.length + ' words' : '') +
        '<span class="mp-sub">' + (slot === 0 && schoolId() === 'ahs' ? 'Planning (5–10 min) included' : 'Planning included') + '</span></span></li>';
    }).join('') +
    '<li><span class="mp-min">' + p.check + ' min</span><span class="mp-lab">' + esc(p.checkLab) + '</span></li>' +
  '</ol>';
}

/* ─── Texte prüfen ─────────────────────────────────────────── */
function checkHTML() {
  const s = getSet();
  if (!s.finished) {
    return '<p class="mx-wait">When you click &ldquo;Finish&rdquo; or the time is up, you can check your texts here, one task at a time.</p>';
  }
  return '<p class="mock-lead">Well done for finishing. Now check each text in the self-check. The button opens it with the right text type, word count and task.</p>' +
    '<div class="mx-check">' +
      s.picks.map((i, slot) => {
        const p = prompt(i);
        return p ? '<button class="btn btn-primary mx-check-btn" data-action="mock-check-' + slot + '">Check task ' + (slot + 1) + ': ' + esc(typeName(p)) + ' <span class="mx-check-topic">' + esc(p.topic) + '</span></button>' : '';
      }).join('') +
    '</div>' +
    '<ul class="mx-links">' +
      '<li><a href="#examiner">Grade like an examiner</a>: give your own text a band for each criterion.</li>' +
      '<li><a href="#checklist">Final checklist</a>: go through it for each text.</li>' +
    '</ul>';
}

/* ─── Uhr ──────────────────────────────────────────────────── */
function ensureState() {
  const school = schoolId();
  if (!st || st.school !== school) {
    const wasRunning = !!(st && st.running);
    stopIv();
    st = { school: school, total: plan().total * 60, remaining: plan().total * 60, endAt: null, running: false };
    lastMk = -1;
    if (wasRunning && M.toast) M.toast('School type changed, so the exam clock was reset to ' + plan().total + ' minutes.');
  }
  return st;
}
function value() { return (st.running && st.endAt) ? Math.max(0, Math.round((st.endAt - Date.now()) / 1000)) : st.remaining; }
function fmt(sec) { const m = Math.floor(sec / 60), s = sec % 60; return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s; }

function stopIv() { if (iv) { clearInterval(iv); iv = null; } }
function startIv() {
  stopIv();
  iv = setInterval(function () {
    if (!document.getElementById('mockClock')) { stopIv(); return; }  /* Seite verlassen: selbst stoppen, Zustand behalten */
    const v = value();
    if (v <= 0) timeUp();
    else { paint(v); milestone(v); }
  }, 1000);
}
function timeUp() {
  st.running = false; st.endAt = null; st.remaining = 0; stopIv();
  getSet().finished = true;
  paint(0);
  const host = document.getElementById('mockCheck');
  if (host) M.setHTML(host, checkHTML());
  if (M.announce) M.announce('Time is up. Pens down. You can now check your texts.');
  if (M.toast) M.toast('Time is up. Pens down.');
}
/* Meilensteine als Schwellen: feuern auch, wenn der Tick (gedrosselter Hintergrund-Tab,
   gesperrtes Handy) die Sekunde verpasst hat. lastMk = kleinste bereits gemeldete Schwelle. */
function milestone(v) {
  const half = Math.round(st.total / 2);
  const marks = [[half, 'Halfway through.'], [15 * 60, 'Fifteen minutes left.'], [5 * 60, 'Five minutes left.'], [60, 'One minute left.']];
  for (let i = 0; i < marks.length; i++) {
    const m = marks[i];
    if (v <= m[0] && (lastMk === -1 || m[0] < lastMk)) { lastMk = m[0]; if (M.announce) M.announce(m[1]); if (M.toast) M.toast(m[1]); }
  }
}
/* Restzeit im Tab-Titel, damit man sie auch in einem anderen Tab sieht */
function titleClock(v) {
  const base = document.title.replace(/^[⏱✓] [^–]+ – /, '');
  document.title = (st && st.running) ? '⏱ ' + fmt(v) + ' – ' + base : (st && st.remaining <= 0 && v <= 0 ? '✓ Time is up – ' + base : base);
}
document.addEventListener('visibilitychange', function () {
  if (st && st.running && !document.hidden && document.getElementById('mockClock')) { const v = value(); if (v <= 0) timeUp(); else { paint(v); milestone(v); } }
});
function btnLabel(v) { return st.running ? 'Pause' : ((v <= 0 || getSet().finished) ? 'Start again' : (v === st.total ? 'Start' : 'Resume')); }
function showFinish(v) { return v > 0 && v < st.total && !getSet().finished; }
function paint(v) {
  const clock = document.getElementById('mockClock');
  if (clock) { clock.textContent = fmt(v); clock.classList.toggle('is-low', v <= 5 * 60 && v > 0); clock.classList.toggle('is-done', v <= 0); }
  const fill = document.getElementById('mockElapsed');
  if (fill) fill.style.width = Math.min(100, 100 * (1 - v / st.total)) + '%';
  const sb = document.getElementById('mockStart');
  if (sb) sb.textContent = btnLabel(v);
  const fb = document.getElementById('mockFinish');
  if (fb) fb.hidden = !showFinish(v);
  titleClock(v);
}
function focusCheck() {
  const h = document.getElementById('sec-mock-check');
  if (h) { h.setAttribute('tabindex', '-1'); try { h.focus({ preventScroll: true }); h.scrollIntoView({ block: 'start', behavior: 'auto' }); } catch (e) {} }
}
function rerender(id, html) { const el = document.getElementById(id); if (el) M.setHTML(el, html); }
function refreshTasks() { rerender('mockTasks', tasksHTML()); rerender('mockSplit', splitHTML()); if (getSet().finished) rerender('mockCheck', checkHTML()); }

M.mockAction = function (act) {
  ensureState();
  const s = getSet();
  const m = /^mock-(full|change|check)-(\d+)$/.exec(act);
  if (m) {
    const slot = +m[2];
    if (m[1] === 'full') { s.open[slot] = !s.open[slot]; rerender('mockTasks', tasksHTML()); }
    else if (m[1] === 'change') {
      s.choosing = s.choosing === slot ? -1 : slot;
      rerender('mockTasks', tasksHTML());
      if (s.choosing === slot) { const sel = document.getElementById('mxSel' + slot); if (sel) { try { sel.focus(); } catch (e) {} } }
    }
    else if (m[1] === 'check') {
      const i = s.picks[slot];
      if (typeof M.sendToSelfcheck === 'function') M.sendToSelfcheck(i);
      else location.hash = '#selfcheck';
    }
    return;
  }
  if (act === 'mock-shuffle') {
    s.picks = suggest(s.picks); s.open = {}; s.choosing = -1; s.finished = false;
    rerender('mockTasks', tasksHTML()); rerender('mockSplit', splitHTML()); rerender('mockCheck', checkHTML());
    paint(value());
    if (M.announce) M.announce('New tasks: ' + s.picks.map(i => prompt(i) ? typeName(prompt(i)) + ', ' + prompt(i).topic : '').join('; ') + '.');
    return;
  }
  if (act === 'mock-toggle') {
    if (st.running) { st.remaining = value(); st.running = false; st.endAt = null; stopIv(); }
    else {
      if (st.remaining <= 0 || s.finished) { st.remaining = st.total; if (s.finished) { s.finished = false; rerender('mockCheck', checkHTML()); } }
      st.endAt = Date.now() + st.remaining * 1000; st.running = true; lastMk = -1; startIv();
    }
  } else if (act === 'mock-reset') {
    st.running = false; st.endAt = null; st.remaining = st.total; lastMk = -1; stopIv();
    if (s.finished) { s.finished = false; rerender('mockCheck', checkHTML()); }
  } else if (act === 'mock-finish') {
    if (st.running) { st.remaining = value(); st.running = false; st.endAt = null; stopIv(); }
    s.finished = true;
    paint(value());
    rerender('mockCheck', checkHTML());
    if (M.announce) M.announce('Finished. Now check your texts.');
    focusCheck();
    return;
  }
  paint(value());
};

/* Auswahl im <select>: boot.js delegiert nur Klicks, daher eigener change-Listener */
function onPick(e) {
  const sel = e.target;
  if (!sel || sel.tagName !== 'SELECT' || sel.dataset.slot === undefined) return;
  const s = getSet(), slot = +sel.dataset.slot, v = +sel.value;
  if (isNaN(v) || v === s.picks[slot]) return;
  s.picks[slot] = v; s.choosing = -1; s.open[slot] = false;
  refreshTasks();
  const btn = document.querySelector('[data-action="mock-change-' + slot + '"]');
  if (btn) { try { btn.focus(); } catch (err) {} }
  const p = prompt(v);
  if (M.announce && p) M.announce('Task ' + (slot + 1) + ' is now: ' + typeName(p) + ', ' + p.topic + '.');
}

PAGES.timer = {
  title: 'Mock exam', track: 'timer',
  render() {
    ensureState();
    const p = plan(), v = value();
    const bhs = schoolId() === 'bhs';
    return '<div class="page">' +
      pageHead('Plan', 'Mock exam', 'Write a full practice exam under real conditions: pick your tasks, start the clock, then check your texts. ' + (bhs ? 'At BHS you get three tasks and 195 minutes.' : 'At AHS you get two tasks and 120 minutes.')) +
      '<div class="wrap"><div class="gap-s"></div>' +
        sectionLabel('1 · Your tasks', { id: 'mock-tasks', label: 'Your tasks' }) +
        '<p class="mock-lead">' + (bhs
          ? 'Here is a suggested set: three tasks of about 250 words, of different text types.'
          : 'Here is a suggested set: one task of about 400 words and one of about 250 words, in two different text types.') +
          ' Open a task to read all of it, or choose another one. All tasks come from the <a href="#taskbank">Task bank</a>.</p>' +
        '<div id="mockTasks">' + tasksHTML() + '</div>' +
        '<div class="gap-s"></div>' +
        sectionLabel('2 · The clock', { id: 'mock-clock', label: 'The clock' }) +
        '<div class="mx-clockrow">' +
          '<div class="mock-card">' +
            '<div class="mock-meta">' + esc(p.label) + '</div>' +
            '<div class="mx-left" aria-hidden="true">Time left</div>' +
            '<div id="mockClock" class="mock-clock' + (v <= 0 ? ' is-done' : (v <= 5 * 60 ? ' is-low' : '')) + '" role="timer" aria-live="off" aria-atomic="true">' + fmt(v) + '</div>' +
            '<div class="mock-bar" aria-hidden="true"><div id="mockElapsed" class="mock-bar-fill" style="width:' + (100 * (1 - v / st.total)) + '%"></div></div>' +
            '<div class="mock-btns">' +
              '<button class="btn btn-primary" id="mockStart" data-action="mock-toggle">' + btnLabel(v) + '</button>' +
              '<button class="btn btn-ghost" id="mockFinish" data-action="mock-finish"' + (showFinish(v) ? '' : ' hidden') + '>Finish</button>' +
              '<button class="btn btn-ghost" data-action="mock-reset">Reset</button>' +
            '</div>' +
          '</div>' +
          '<div class="mx-split">' +
            '<h3 class="sub-label">A sensible time split</h3>' +
            '<div id="mockSplit">' + splitHTML() + '</div>' +
            '<p class="mx-split-note">On the day you choose the order yourself. A time plan stops one task from taking time away from the others.</p>' +
          '</div>' +
        '</div>' +
        '<div class="tip mx-tip">The real exam has no pause button, so try not to use it either. ' + (bhs ? 'At BHS a dictionary is allowed, but only in the Writing section.' : 'At AHS no dictionaries are allowed in the exam, not even electronic ones.') + ' Put your phone in another room.</div>' +
        '<div class="gap-s"></div>' +
        sectionLabel('3 · Check your texts', { id: 'mock-check', label: 'Check your texts' }) +
        '<div id="mockCheck">' + checkHTML() + '</div>' +
        '<div style="height:72px"></div>' +
      '</div></div>';
  },
  wire() {
    ensureState();
    const host = document.getElementById('mockTasks');
    if (host) host.addEventListener('change', onPick);
    if (st.running) { const v = value(); if (v <= 0) timeUp(); else { paint(v); startIv(); } }
    else paint(value());
  },
};
})();
