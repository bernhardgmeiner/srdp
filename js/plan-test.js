/* ════════════════════════════════════════════════════════════
   Lernplan für eine Schularbeit (Okt. 2026)
   Datum + Textsorte(n) wählen → Aufgaben werden auf die Tage bis zur
   Schularbeit verteilt. Erledigte Aufgaben zählen nach Schlüssel
   (z. B. "article:guide"), nicht nach Tag: Jeden Tag werden die noch
   offenen Aufgaben neu auf die verbleibenden Tage verteilt.
   Speicher: localStorage mwg_sa = { date, types: [...], done: { key: true } }
   ════════════════════════════════════════════════════════════ */
(function () {
'use strict';
const M = window.MWG;
const { $, esc, store } = M;

const MAX_DAYS = 10;      /* länger als 10 Tage im Voraus: Plan beginnt 10 Tage vorher */
const DAY_TARGET = 50;    /* angestrebte Minuten pro Tag */

function state() { const s = store('mwg_sa'); return (s && typeof s === 'object') ? s : {}; }
function save(s) { store('mwg_sa', s); }
function viennaToday() { return new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Vienna' }); }
function daysUntil(d) {
  if (!d) return null;
  const t = new Date(viennaToday() + 'T00:00:00Z').getTime();
  const e = new Date(d + 'T00:00:00Z').getTime();
  return Math.round((e - t) / 86400000);
}
function typeById(id) { return ((window.SRDP && SRDP.textTypes) || []).find(t => t.id === id); }
function visibleTypes() { return M.typesForSchool ? M.typesForSchool() : []; }
function chosenTypes() {
  const vis = visibleTypes().map(t => t.id);
  return (state().types || []).filter(id => vis.indexOf(id) >= 0);
}
function lower(t) { return t.id === 'email' ? 'e-mail' : t.name.toLowerCase(); }
function plural(n, w) { return n + ' ' + w + (n === 1 ? '' : 's'); }

/* Alle Aufgaben in sinnvoller Reihenfolge. core = bleibt auch bei wenig Zeit. */
function allTasks() {
  const types = chosenTypes().map(typeById).filter(Boolean);
  const out = [];
  types.forEach(t => {
    const a = '<a href="#' + t.id + '">';
    out.push({ key: t.id + ':guide', min: 20, core: true, t: 'Read the ' + a + lower(t) + ' guide</a>: layout, do&rsquo;s and don&rsquo;ts, and the weaker and stronger example.' });
    out.push({ key: t.id + ':model', min: 15, core: true, t: 'Open the Model text tab of the ' + a + lower(t) + '</a> and read the model text. Then read the realistic borderline text underneath and note what costs marks.' });
    out.push({ key: t.id + ':quiz', min: 10, core: false, t: 'Take the ' + a + lower(t) + ' quiz</a> until you pass it.' });
    out.push({ key: t.id + ':phrases', min: 10, core: false, t: 'Pick ten ' + a + lower(t) + ' phrases</a> you will really use and write them into your notes.' });
  });
  types.forEach(t => {
    out.push({ key: t.id + ':write', min: 45, core: true, t: 'Write a ' + lower(t) + ' from the <a href="#taskbank">task bank</a> in one go, with a time limit.' });
    out.push({ key: t.id + ':check', min: 20, core: true, t: 'Check your ' + lower(t) + ' in the <a href="#selfcheck">self-check</a> and fix what it finds.' });
  });
  if (types.length) {
    out.push({ key: 'grammar', min: 15, core: false, t: 'Look up your two most common mistakes in the <a href="#grammar">grammar kit</a>.' });
    out.push({ key: 'review', min: 15, core: true, last: true, t: 'Read the <a href="#checklist">final checklist</a> and your phrases once more. Then stop and sleep.' });
  }
  return out;
}

/* Offene Aufgaben auf die Tage bis zur Schularbeit verteilen.
   Ergebnis: [{ offset, tasks: [...] }], offset 0 = heute. */
function schedule() {
  const s = state();
  const dl = daysUntil(s.date);
  const done = s.done || {};
  const all = allTasks();
  if (dl === null || dl <= 0 || !all.length) return { dl, days: [], all, done };
  const startOffset = Math.max(0, dl - MAX_DAYS);           /* Plan beginnt höchstens 10 Tage vorher */
  const n = dl - startOffset;                                  /* Lerntage: heute (bzw. Planstart) bis Tag vor der Schularbeit */
  const today = viennaToday();
  /* heute Erledigtes bleibt im heutigen Tag (abgehakt), damit sich der Tag nicht ständig neu füllt */
  let open = all.filter(x => !done[x.key] || done[x.key] === today);
  /* zu wenig Zeit: nur die Kernaufgaben */
  const mins = open.reduce((a, x) => a + x.min, 0);
  const tight = mins > n * 75;
  if (tight) open = open.filter(x => x.core);
  const last = open.filter(x => x.last), rest = open.filter(x => !x.last);
  const days = [];
  for (let i = 0; i < n; i++) days.push({ offset: startOffset + i, tasks: [] });
  const workDays = n > 1 && last.length ? n - 1 : n;
  const total = rest.reduce((a, x) => a + x.min, 0);
  const per = Math.max(DAY_TARGET, Math.ceil(total / Math.max(1, workDays)));
  let d = 0, acc = 0;
  rest.forEach(x => {
    if (acc > 0 && acc + x.min > per && d < workDays - 1) { d++; acc = 0; }
    days[d].tasks.push(x); acc += x.min;
  });
  last.forEach(x => days[n - 1].tasks.push(x));
  return { dl, days: days.filter(x => x.tasks.length), all, done, tight, startOffset };
}

function dayLabel(offset) {
  if (offset === 0) return 'Today';
  if (offset === 1) return 'Tomorrow';
  const d = new Date(viennaToday() + 'T12:00:00Z');
  d.setUTCDate(d.getUTCDate() + offset);
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' });
}

/* Status für Startseite und Menü-Hinweis */
function status() {
  const s = state();
  const dl = daysUntil(s.date);
  const types = chosenTypes();
  if (dl === null || !types.length) return null;
  const sc = schedule();
  const all = sc.all;
  const doneN = all.filter(x => (s.done || {})[x.key]).length;
  const first = sc.days[0] || null;
  return {
    daysLeft: dl, types, done: doneN, total: all.length,
    today: first && first.offset === 0 ? first.tasks : [],
    nextOffset: first ? first.offset : null,
    nextTasks: first ? first.tasks.filter(x => !(s.done || {})[x.key]) : [],
    label: types.map(id => lower(typeById(id))).join(' and '),
  };
}

/* ─── Render ──────────────────────────────────────────────── */
function setupCard(s) {
  const types = visibleTypes();
  const chosen = s.types || [];
  return '<div class="plan-datecard card no-print">' +
    '<div class="plan-datecard-h">When is your Schularbeit, and which text types come up?</div>' +
    '<p class="plan-datecard-p">You get a plan for the days before the test: read the guide, study the model text, write a practice text and check it. Everything is saved only in this browser.</p>' +
    '<fieldset class="sa-types"><legend class="sa-legend">Text types in the test (one or more)</legend>' +
      types.map(t => '<label class="sa-type"><input type="checkbox" name="saType" value="' + t.id + '"' + (chosen.indexOf(t.id) >= 0 ? ' checked' : '') + '><span>' + esc(t.name) + '</span></label>').join('') +
    '</fieldset>' +
    '<div class="plan-datecard-row">' +
      '<label class="visually-hidden" for="saDate">Date of the Schularbeit</label>' +
      '<input type="date" id="saDate" value="' + esc(s.date || '') + '">' +
      '<button class="btn btn-primary btn-sm" data-action="plan-sa-save">Make my plan</button>' +
    '</div></div>';
}

function render() {
  const s = state();
  const dl = daysUntil(s.date);
  const types = chosenTypes();
  if (s.editing || dl === null || !types.length) return setupCard(s);
  const names = types.map(id => esc(typeById(id).name)).join(', ');
  if (dl < 0) {
    return '<div class="plan-date"><strong>Your Schularbeit (' + names + ') is over.</strong> <button class="btn-text" data-action="plan-sa-new">Plan the next one</button></div>';
  }
  if (dl === 0) {
    return '<div class="plan-date"><strong>Today is your Schularbeit. Good luck!</strong> Read the task twice and keep time to proofread. <a href="#checklist">Final checklist</a> · <button class="btn-text" data-action="plan-sa-new">Plan the next one</button></div>';
  }
  const sc = schedule();
  const doneMap = s.done || {};
  const doneTasks = sc.all.filter(x => doneMap[x.key]);
  const doneBefore = doneTasks.filter(x => doneMap[x.key] !== viennaToday());
  const pct = sc.all.length ? Math.round(doneTasks.length / sc.all.length * 100) : 0;
  let html = '<div class="plan-date"><strong>' + plural(dl, 'day') + ' until your Schularbeit</strong> (' + names + '). ' +
    '<button class="btn-text" data-action="plan-sa-edit">Change</button></div>' +
    '<div class="gap-s"></div>' +
    '<div class="plan-prog"><span class="plan-prog-l">Your progress</span><span class="plan-prog-n">' + doneTasks.length + '/' + sc.all.length + ' tasks · ' + pct + '%</span></div>' +
    '<div class="qbar plan-qbar"><i style="width:' + pct + '%"></i></div>';
  if (sc.tight) html += '<div class="tip plan-note">There is not much time left, so the plan shows only the most important tasks. If you have more time, do the quiz and the phrases as well.</div>';
  if (sc.startOffset > 0) html += '<p class="plan-intro">The plan starts ' + plural(sc.startOffset, 'day') + ' from now. You can start earlier: tick tasks off whenever you do them, and the plan moves the rest.</p>';
  else html += '<p class="plan-intro">Open tasks are spread over the days you have left. If you miss a day, the plan moves the rest for you.</p>';
  html += sc.days.map(d => {
    const mins = d.tasks.reduce((a, x) => a + x.min, 0);
    return '<div class="plan-day' + (d.offset === 0 ? ' today' : '') + '">' +
      '<div class="plan-day-head"><span class="plan-day-num">' + (d.offset === 0 ? '<span class="plan-today-badge">Today</span>' : esc(dayLabel(d.offset))) + '</span>' +
      '<span class="plan-day-min">~' + mins + ' min</span></div>' +
      d.tasks.map(x => '<label class="plan-task"><input type="checkbox" data-action="plan-sa-check" data-key="' + esc(x.key) + '"' + (doneMap[x.key] ? ' checked' : '') + '><span>' + x.t + '</span></label>').join('') +
    '</div>';
  }).join('');
  if (doneBefore.length) {
    html += '<div class="acc mt-5"><div class="acc-item"><button class="acc-head" data-action="acc" aria-expanded="false"><span class="pm">+</span><span>Done on earlier days</span><span class="sub">' + doneBefore.length + '</span></button><div class="acc-body">' +
      doneBefore.map(x => '<label class="plan-task"><input type="checkbox" data-action="plan-sa-check" data-key="' + esc(x.key) + '" checked><span>' + x.t + '</span></label>').join('') +
    '</div></div></div>';
  }
  return html;
}

function action(act, el) {
  const s = state();
  if (act === 'plan-sa-save') {
    const d = $('#saDate') && $('#saDate').value;
    const types = Array.prototype.slice.call(document.querySelectorAll('input[name="saType"]:checked')).map(x => x.value);
    if (!types.length) { M.toast('Pick at least one text type'); return; }
    if (!d) { M.toast('Pick the date first'); return; }
    const same = s.date === d && JSON.stringify(s.types || []) === JSON.stringify(types);
    save({ date: d, types, done: same ? (s.done || {}) : {} });
    M.route();
    const h = document.querySelector('#main .plan-date'); if (h) { h.setAttribute('tabindex', '-1'); try { h.focus(); } catch (e) {} }
    if (M.announce) M.announce('Plan for your Schularbeit is ready.');
  } else if (act === 'plan-sa-check') {
    s.done = s.done || {};
    if (el.checked) s.done[el.dataset.key] = viennaToday(); else delete s.done[el.dataset.key];
    save(s);
    setTimeout(() => { const host = $('#saBody'); if (host) M.setHTML(host, render()); if (M.paintPlanChip) M.paintPlanChip(); }, 250);
  } else if (act === 'plan-sa-edit') {
    s.editing = true; save(s); M.route();
  } else if (act === 'plan-sa-new') {
    save({ types: s.types || [] }); M.route();
  }
}

M.testPlan = { render, action, status, daysUntil: () => daysUntil(state().date), hasPlan: () => !!(state().date && chosenTypes().length) };
})();
