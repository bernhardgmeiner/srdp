/* ════════════════════════════════════════════════════════════
   Global search (Ctrl+K / Cmd+K / "/") – Overlay im Carbon-Stil
   ════════════════════════════════════════════════════════════ */
(function () {
'use strict';
const M = window.MWG;
const { $, $$, esc } = M;
const reduced = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let overlay = null, input = null, resultsEl = null, lastFocus = null;
let items = null, current = [], active = 0;

function buildIndex() {
  items = [];
  const _sch = M.school ? M.school() : 'ahs';
  const _inSchool = t => !t.schools || t.schools.indexOf(_sch) >= 0;
  M.NAV.forEach(sec => sec.items.forEach(it =>
    items.push({ type: 'Pages', label: it.label, sub: sec.divider || 'Start', go: { page: it.id } })));
  SRDP.textTypes.filter(_inSchool).forEach(t => t.phrases.forEach(g => g.items.forEach(p =>
    items.push({ type: 'Phrases', label: p, sub: t.name + ' – ' + g.category, copy: p, go: { page: 'phrasebank', search: p } }))));
  SRDP.emailSubTypes.forEach(st => st.phrases.forEach(g => g.items.forEach(p =>
    items.push({ type: 'Phrases', label: p, sub: 'E-mail – ' + st.name, copy: p, go: { page: 'phrasebank', search: p } }))));
  SRDP.paragraphs.phraseGroups.forEach(g => g.phrases.forEach(p =>
    items.push({ type: 'Phrases', label: p, sub: 'Paragraphs – ' + g.label, copy: p, go: { page: 'phrasebank', search: p } })));
  (M.TOPIC_VOCAB || []).forEach((t, ti) => t.words.forEach(w => {
    const label = w.w || w;
    items.push({ type: 'Vocabulary', label, sub: t.topic, copy: label, go: { page: 'topicvocab', acc: ti, chip: label } });
  }));
  SRDP.emailSubTypes.forEach((st, si) =>
    items.push({ type: 'Pages', label: st.name + ' (formal e-mail)', sub: 'Text types – E-mail sub-type', go: { page: 'email', emailTab: si } }));
  items.push({ type: 'Pages', label: 'B2 linking words', sub: 'Grammar kit – connectors table', go: { page: 'grammar', findLabel: 'B2 linking words' } });
  SRDP.linkingWords.forEach(r =>
    items.push({ type: 'Phrases', label: r.b2, sub: 'Linking words – ' + r.fn + ' (instead of: ' + r.basic + ')', copy: r.b2.split(' · ').join(', '), go: { page: 'grammar', findLabel: 'B2 linking words' } }));
  SRDP.grammar.forEach((g, gi) =>
    items.push({ type: 'Grammar', label: g.title, sub: (g.intro || '').slice(0, 90), go: { page: 'grammar', acc: gi },
      extra: (g.pairs || []).map(p => (p.wrong || '') + ' ' + (p.right || '')).join(' ').toLowerCase() }));
  SRDP.prompts.forEach((p, pi) => {
    const t = SRDP.textTypes.find(x => x.id === p.type);
    if (t && !_inSchool(t)) return;
    items.push({ type: 'Tasks', label: p.topic, sub: (t ? t.name : p.type) + ' · ~' + p.length + ' words', go: { page: 'taskbank', task: pi },
      extra: (p.scenario + ' ' + p.instruction).toLowerCase() });
  });
  Object.keys(SRDP.checklists).filter(k => k === 'general' || SRDP.textTypes.some(t => t.id === k && _inSchool(t))).forEach(k => SRDP.checklists[k].items.forEach(it =>
    items.push({ type: 'Checklist', label: it.text, sub: 'Writing checklist – ' + SRDP.checklists[k].label, go: { page: 'checklist', cl: k } })));
  items.forEach(it => { it.l = it.label.toLowerCase(); it.s = (it.sub || '').toLowerCase(); });
}

const TYPE_PRIO = { Pages: 0, Phrases: 1, Vocabulary: 2, Grammar: 3, Tasks: 4, Checklist: 5 };
function query(q) {
  q = q.trim().toLowerCase();
  if (!q) return [];
  const scored = [];
  for (const it of items) {
    let sc = -1;
    if (it.l.startsWith(q)) sc = 0;
    else if (it.l.includes(q)) sc = 1;
    else if (it.s.includes(q)) sc = 2;
    else if (it.extra && it.extra.includes(q)) sc = 3;
    if (sc >= 0) scored.push([sc + (it.type === 'Checklist' ? 1 : 0) + (it.type === 'Pages' ? -1.5 : 0), it]);
  }
  scored.sort((a, b) => a[0] - b[0] || TYPE_PRIO[a[1].type] - TYPE_PRIO[b[1].type]);
  return scored.slice(0, 20).map(x => x[1]);
}

function ensureDom() {
  if (overlay) return;
  overlay = document.createElement('div');
  overlay.className = 'search-overlay no-print';
  overlay.id = 'searchOverlay';
  overlay.innerHTML =
    '<div class="search-panel" role="dialog" aria-modal="true" aria-label="Search this guide">' +
      '<input type="text" id="srInput" placeholder="Search pages, phrases, vocabulary, grammar, tasks…" aria-label="Search" autocomplete="off" role="combobox" aria-expanded="true" aria-controls="srResults" aria-autocomplete="list">' +
      '<div class="sr-results" id="srResults" role="listbox" aria-label="Search results"></div>' +
    '</div>';
  document.body.appendChild(overlay);
  input = $('#srInput');
  resultsEl = $('#srResults');
  overlay.addEventListener('mousedown', e => { if (e.target === overlay) closeSearch(); });
  input.addEventListener('input', () => { current = query(input.value); active = 0; paint(); if (M.announce && input.value.trim()) M.announce(current.length + (current.length === 1 ? ' result' : ' results')); });
  resultsEl.addEventListener('click', e => {
    const copyBtn = e.target.closest('.sr-copy');
    if (copyBtn) {
      const it = current[+copyBtn.dataset.i];
      M.copyText(it.copy, () => M.flashCopied(copyBtn));
      return;
    }
    const main = e.target.closest('.sr-main');
    if (main) go(current[+main.dataset.i]);
  });
}

function paint() {
  if (!input.value.trim()) { resultsEl.innerHTML = '<div class="sr-empty">Type to search. Try &ldquo;linking&rdquo;, &ldquo;complaint&rdquo; or &ldquo;since&rdquo;.</div>'; return; }
  if (!current.length) { resultsEl.innerHTML = '<div class="sr-empty">No results for &ldquo;' + esc(input.value) + '&rdquo;.</div>'; return; }
  let html = '', lastType = null;
  current.forEach((it, i) => {
    if (it.type !== lastType) { html += '<div class="sr-group" role="presentation">' + it.type + '</div>'; lastType = it.type; }
    html += '<div class="sr-row' + (i === active ? ' active' : '') + '" role="presentation">' +
      '<button class="sr-main" id="srOpt-' + i + '" role="option" aria-selected="' + (i === active) + '" data-i="' + i + '"><span>' + esc(it.label) + '</span><span class="sub">' + esc(it.sub) + '</span></button>' +
      (it.copy ? '<button class="sr-copy" data-i="' + i + '" aria-label="Copy to clipboard" title="Copy">⧉</button>' : '') +
    '</div>';
  });
  resultsEl.innerHTML = html;
  if (input) input.setAttribute('aria-activedescendant', current.length ? 'srOpt-' + active : '');
  const act = resultsEl.querySelector('.sr-row.active');
  if (act) act.scrollIntoView({ block: 'nearest' });
}

function onKey(e) {
  if (e.key === 'Escape') { e.preventDefault(); closeSearch(); return; }
  if (e.key === 'ArrowDown') { e.preventDefault(); if (current.length) { active = (active + 1) % current.length; paint(); } return; }
  if (e.key === 'ArrowUp') { e.preventDefault(); if (current.length) { active = (active - 1 + current.length) % current.length; paint(); } return; }
  if (e.key === 'Enter') { e.preventDefault(); if (current[active]) go(current[active]); return; }
  if (e.key === 'Tab') {
    /* Fokus-Falle: Tab bleibt im Overlay */
    const focusables = [input, ...$$('.sr-main, .sr-copy', resultsEl)];
    const idx = focusables.indexOf(document.activeElement);
    e.preventDefault();
    const next = e.shiftKey ? (idx <= 0 ? focusables.length - 1 : idx - 1) : (idx + 1) % focusables.length;
    focusables[next].focus();
  }
}

function openSearch() {
  if (!items) buildIndex();
  ensureDom();
  lastFocus = document.activeElement;
  overlay.style.display = 'flex';
  const appEl = document.getElementById('app'); if (appEl) { appEl.setAttribute('inert', ''); appEl.setAttribute('aria-hidden', 'true'); }
  input.value = ''; current = []; active = 0; paint();
  input.focus();
  document.addEventListener('keydown', onKey, true);
}
function closeSearch() {
  if (!overlay) return;
  overlay.style.display = 'none';
  const appEl = document.getElementById('app'); if (appEl) { appEl.removeAttribute('inert'); appEl.removeAttribute('aria-hidden'); }
  document.removeEventListener('keydown', onKey, true);
  if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) {} }
}

/* Sprung zum Ergebnis: navigieren, Akkordeon öffnen, Element hervorheben */
function go(it) {
  closeSearch();
  const g = it.go;
  if (g.search !== undefined && M.pbState) { M.pbState.search = g.search; M.pbState.filter = 'all'; }
  if (g.cl && M.clState) { M.clState.type = g.cl; M.clState.checks = {}; M.clState.submitted = false; }
  if (g.task !== undefined && M.tbState) M.tbState.filter = 'all';
  if (g.emailTab !== undefined && M.typeTabs) { M.typeTabs.email = 'subtypes'; g.acc = g.emailTab; }
  const target = '#' + g.page;
  if (location.hash === target) {
    if (g.page === 'phrasebank') {
      const inp = $('#pbSearch');
      if (inp) { inp.value = M.pbState.search; inp.dispatchEvent(new Event('input')); }
    } else if (M.route) M.route(); /* Seite neu rendern (z. B. Tab-Wechsel) */
    setTimeout(() => afterJump(g), 80);
  } else {
    window.addEventListener('hashchange', () => setTimeout(() => afterJump(g), 120), { once: true });
    location.hash = target;
  }
}
function afterJump(g) {
  const main = $('#main');
  let el = null;
  if (g.acc !== undefined) {
    const acc = $$('.acc-item', main)[g.acc];
    if (acc) {
      acc.classList.add('open');
      const head = acc.querySelector('.acc-head');
      if (head) head.setAttribute('aria-expanded', 'true');
      el = acc;
    }
  }
  if (g.chip) { const chip = $$('.chip', main).find(c => c.dataset.copy === g.chip); if (chip) el = chip; }
  if (g.search !== undefined) el = $('.chip', main);
  if (g.task !== undefined) el = $('[data-task-i="' + g.task + '"]', main);
  if (g.findLabel) { const h = $$('.section-label', main).find(x => x.textContent.toLowerCase().includes(g.findLabel.toLowerCase())); if (h) el = h.nextElementSibling || h; }
  if (el) {
    try { el.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'center' }); } catch (e) {}
    el.classList.add('search-hit');
    setTimeout(() => el.classList.remove('search-hit'), 2000);
  }
}

/* globale Shortcuts */
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
    e.preventDefault();
    if (overlay && overlay.style.display === 'flex') closeSearch(); else openSearch();
    return;
  }
  if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) {
    const t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)) return;
    if (overlay && overlay.style.display === 'flex') return;
    e.preventDefault();
    openSearch();
  }
});

M.rebuildSearch = function () { items = null; };
M.openSearch = openSearch;
M.closeSearch = closeSearch;
})();
