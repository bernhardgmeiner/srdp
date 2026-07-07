/* ════════════════════════════════════════════════════════════
   Exam timer / mock-exam countdown (schultyp-bewusst)
   AHS 120 min · 2 Aufgaben  |  BHS 195 min · 3 Aufgaben
   Zeitstempel-basiert (bleibt genau), stoppt sich selbst beim
   Verlassen der Seite, Meilenstein-Ansagen ueber M.announce.
   ════════════════════════════════════════════════════════════ */
(function () {
'use strict';
const M = window.MWG;
const { $, esc, sectionLabel, pageHead } = M;

const PLANS = {
  ahs: { total: 120, label: '2 tasks · 120 minutes · no dictionary',
    windows: [
      { min: 65, lab: 'Task 1 – the long text (about 400 words)' },
      { min: 40, lab: 'Task 2 – the short text (about 250 words)' },
      { min: 15, lab: 'Read through and correct both' },
    ] },
  bhs: { total: 195, label: '3 tasks · 195 minutes · dictionary allowed',
    windows: [
      { min: 60, lab: 'Task 1 (about 250 words, planning included)' },
      { min: 60, lab: 'Task 2 (about 250 words, planning included)' },
      { min: 60, lab: 'Task 3 (about 250 words, planning included)' },
      { min: 15, lab: 'Read through and correct' },
    ] },
};

let st = null;          /* { school, total(sec), remaining(sec), endAt(ms|null), running } */
let iv = null;
let lastMk = -1;

function plan() { return PLANS[(M.school && M.school() === 'bhs') ? 'bhs' : 'ahs']; }
function ensureState() {
  const school = M.school ? M.school() : 'ahs';
  if (!st || st.school !== school) {
    st = { school: school, total: plan().total * 60, remaining: plan().total * 60, endAt: null, running: false };
    lastMk = -1;
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
    paint(v);
    if (v <= 0) { st.running = false; st.endAt = null; st.remaining = 0; stopIv(); if (M.announce) M.announce('Time is up. Pens down.'); if (M.toast) M.toast('Time is up. Pens down.'); }
    else { milestone(v); }
  }, 1000);
}
function milestone(v) {
  const half = Math.round(st.total / 2);
  const map = {}; map[half] = 'Halfway through.'; map[15 * 60] = 'Fifteen minutes left.'; map[5 * 60] = 'Five minutes left.'; map[60] = 'One minute left.';
  if (map[v] && lastMk !== v) { lastMk = v; if (M.announce) M.announce(map[v]); if (M.toast) M.toast(map[v]); }
}
function btnLabel(v) { return st.running ? 'Pause' : (v <= 0 ? 'Reset' : (v === st.total ? 'Start' : 'Resume')); }
function paint(v) {
  const clock = document.getElementById('mockClock');
  if (clock) { clock.textContent = fmt(v); clock.classList.toggle('is-low', v <= 5 * 60 && v > 0); clock.classList.toggle('is-done', v <= 0); }
  const fill = document.getElementById('mockElapsed');
  if (fill) fill.style.width = Math.min(100, 100 * (1 - v / st.total)) + '%';
  const sb = document.getElementById('mockStart');
  if (sb) sb.textContent = btnLabel(v);
}

M.mockAction = function (act) {
  ensureState();
  if (act === 'mock-toggle') {
    if (st.running) { st.remaining = value(); st.running = false; st.endAt = null; stopIv(); }
    else { if (st.remaining <= 0) st.remaining = st.total; st.endAt = Date.now() + st.remaining * 1000; st.running = true; lastMk = -1; startIv(); }
  } else if (act === 'mock-reset') {
    st.running = false; st.endAt = null; st.remaining = st.total; lastMk = -1; stopIv();
  }
  paint(value());
};

PAGES.timer = {
  title: 'Exam timer', track: 'timer',
  render() {
    ensureState();
    const p = plan(), v = value();
    return '<div class="page">' +
      pageHead('Skills & practice', 'Exam timer', 'Rehearse the real thing: the exam clock for your school type, with a sensible split across the tasks. Start it when you sit down to a full practice paper – beating the clock is a skill you train, not a talent.') +
      '<div class="wrap"><div class="gap-s"></div>' +
        '<div class="mock-card">' +
          '<div class="mock-meta">' + esc(p.label) + '</div>' +
          '<div id="mockClock" class="mock-clock' + (v <= 0 ? ' is-done' : (v <= 5 * 60 ? ' is-low' : '')) + '" role="timer" aria-live="off">' + fmt(v) + '</div>' +
          '<div class="mock-bar" aria-hidden="true"><div id="mockElapsed" class="mock-bar-fill" style="width:' + (100 * (1 - v / st.total)) + '%"></div></div>' +
          '<div class="mock-btns">' +
            '<button class="btn btn-primary" id="mockStart" data-action="mock-toggle">' + btnLabel(v) + '</button>' +
            '<button class="btn btn-ghost" data-action="mock-reset">Reset</button>' +
          '</div>' +
        '</div>' +
        '<div class="gap-s"></div>' +
        sectionLabel('A sensible split') +
        '<p class="mock-lead">You pick the order on the day, but a plan stops one task eating the others. Adjust it to your strengths, then defend it against the clock.</p>' +
        '<ol class="mock-plan">' + p.windows.map(w => '<li><span class="mp-min">' + w.min + ' min</span><span class="mp-lab">' + esc(w.lab) + '</span></li>').join('') + '</ol>' +
        '<div class="tip" style="margin-top:22px">This is a rehearsal tool – the real exam has no pause button. ' + ((M.school && M.school() === 'bhs') ? 'At BHS a dictionary is allowed, but only during the Writing section.' : 'At AHS no dictionaries are allowed anywhere in the exam.') + ' Do a couple of full runs before the Klausur and the real clock stops being scary.</div>' +
        '<div style="height:72px"></div>' +
      '</div></div>';
  },
  wire() { ensureState(); if (st.running) startIv(); else paint(value()); },
};
})();
