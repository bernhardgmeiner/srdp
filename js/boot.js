/* ════════════════════════════════════════════════════════════
   Boot – footer, router, event delegation
   ════════════════════════════════════════════════════════════ */
(function () {
'use strict';
const M = window.MWG;
const { $, $$, esc } = M;
const SITE_FOOTER = '<footer class="site-footer no-print"><div class="ftin">' +'<div class="ft-cols">' +'<div><div class="ft-h">About this site</div><p>A free, independent revision site for the written part of the English Matura (AHS & BHS, B2). Made by an English teacher. It is not an official document of the BMB or any education authority.</p></div>' +'<div><div class="ft-h">Your data</div><p>No account, no tracking, no ads. Your progress is saved only in this browser on this device, so clearing your browser or switching devices resets it. Nothing leaves your device unless you use the optional AI features yourself. Like any website, the host (GitHub Pages) logs your IP address in its server logs.</p><p style="margin-top:10px"><button class="btn btn-ghost btn-sm" data-action="reset-progress">Reset my progress on this device</button></p></div>' +'<div><div class="ft-h" lang="de">Impressum / Kontakt</div><p lang="de">Bernhard Gmeiner, Wien<br>E-Mail: bernhard.gmeiner@gmail.com<br><a href="https://www.bernhardgmeiner.com" target="_blank" rel="noopener">bernhardgmeiner.com</a><br>Privates, nichtkommerzielles Projekt.</p></div>' +'<div><div class="ft-h">Found a mistake? <span lang="de">/ Fehler gefunden?</span></div><p>Spotted a typo, a wrong fact or a broken link? <a href="mailto:bernhard.gmeiner@gmail.com?subject=Matura%20Guide%20Feedback">Send a short e-mail</a> and mention which section it is in. Every report makes the guide better.</p></div>' +'</div>' +'<div class="ft-base" lang="de">Diese Seite hilft bei der Vorbereitung auf die schriftliche Englisch-Matura (AHS & BHS, B2) und orientiert sich an der offiziellen SRDP-Beurteilungsskala. Bewertet wird in der echten Matura von den Lehrkr\u00e4ften der Schule. \u00b7 Stand: Schuljahr 2026/27</div>' +'</div></footer><div class="print-note" lang="de">Unabhängige Übungsseite von Bernhard Gmeiner – kein offizielles Dokument des BMB. Übungsaufgaben sind nachgebaut. Es zählt die Bewertung deiner Lehrkräfte.</div>';

/* ─── ROUTER ──────────────────────────────────────────────── */
let current = '';
/* Prerender-Hydration: /essay/ u. ä. wird als Startseite übernommen (kein Redirect).
   Interne Navigation läuft danach wie gehabt über Hashes. */
const pathMatch = location.pathname.match(/^\/([a-z]+)\/?$/);
const pathPage = (pathMatch && window.PAGES && PAGES[pathMatch[1]]) ? pathMatch[1] : null;
function route() {
  if (tourActive) endTour();
  let id = (location.hash || (pathPage ? '#' + pathPage : '#home')).slice(1);
  /* "#main" ist der Skip-Link, keine Seite: nur den Inhalt fokussieren */
  if (id === 'main') { const mn = $('#main'); if (mn) { try { mn.focus(); } catch (e) {} } try { history.replaceState(null, '', location.pathname + (current && current !== pathPage ? '#' + current : '')); } catch (e) {} if (current) return; id = pathPage || 'home'; }
  if (!Object.prototype.hasOwnProperty.call(PAGES, id)) { if (current) return; id = 'home'; }
  /* Textsorte, die es im aktuellen Schultyp nicht gibt (z. B. essay bei BHS,
     leaflet bei AHS): Bei einem Deep-Link (Erstaufruf) den Schultyp passend
     umschalten, sonst auf Home umleiten und das sagen. */
  const tt = window.SRDP && SRDP.textTypes.find(t => t.id === id && t.schools && t.schools.indexOf(M.school()) < 0);
  if (tt) {
    if (!current && !M.schoolChosen()) { M.setSchool(tt.schools[0]); M.buildNav(); M.autoSchool = true; }
    else { const label = (SRDP.schools && SRDP.schools[tt.schools[0]] && SRDP.schools[tt.schools[0]].label) || tt.schools[0].toUpperCase(); id = 'home'; setTimeout(function () { M.toast('The ' + tt.name.toLowerCase() + ' is a ' + label + ' text type. Switch the school type in the menu to see it.'); }, 50); }
  }
  const prev = current;
  current = id;
  const page = PAGES[id];
  const main = $('#main');
  main.innerHTML = page.render() + SITE_FOOTER;
  if (page.wire) page.wire();
  decorateTabs(main);
  if (M.buildPageTOC) M.buildPageTOC();
  if (page.track) M.markVisited(page.track);
  $$('#sidenav .nav-item').forEach(a => { const on = a.dataset.nav === id; a.classList.toggle('active', on); if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
  const _mt = document.querySelector('.mobile-bar .t1'); if (_mt) _mt.textContent = page.title;
  document.title = page.title + ' – Matura Writing Guide B2';
  try { main.scrollTo({ top: 0 }); window.scrollTo({ top: 0 }); } catch (e) { main.scrollTop = 0; }
  $('#sidenav').classList.remove('open');
  const ov = $('.nav-overlay'); if (ov) ov.remove();
  const bg = $('#burger'); if (bg) bg.setAttribute('aria-expanded', 'false');
  if (id !== prev) { try { main.focus(); } catch (e) {} if (M.announce) M.announce(page.title); }
  else { const at = main.querySelector('.tabs .tab.active'); if (at) { try { at.focus(); } catch (e) {} } }
  M.paintNav();
}
function rerender(partId, html, wire) { const el = $(partId); if (el) { M.setHTML(el, html); wire && wire(); decorateTabs(el); } }
/* Tab-Leisten für Screenreader: role=tablist/tab + aria-selected (Filterleisten inklusive) */
function decorateTabs(root) {
  $$('.tabs', root).forEach(bar => {
    bar.setAttribute('role', 'tablist');
    $$('.tab', bar).forEach(b => { b.setAttribute('role', 'tab'); b.setAttribute('aria-selected', b.classList.contains('active') ? 'true' : 'false'); });
  });
}
M.decorateTabs = decorateTabs;

/* ─── GUIDED TOUR ─────────────────────────────────────────── */
const TOUR = [
  { sel:null, title:'Welcome to the writing guide', text:'Everything here is built around the writing tasks of the B2 Matura. This quick tour shows you where things are. It takes about a minute.' },
  { sel:'[data-nav="overview"]', title:'Start with the overview', text:'How the Writing section is built, how much time you get, and how the four criteria are graded. Read it once and the rest makes more sense.' },
  { sel:'[data-nav="studyplan"]', title:'Your countdown plan', text:'A day-by-day study plan for the last four weeks (or the last seven days). Set your exam date and the plan tells you what to do today.' },
  { sel:'[data-nav="article"]', title:'The text types', text:'Each text type has a guide, a model text, a phrase list, a quiz and a drag-and-drop builder. Open one and switch tabs along the top.' },
  { sel:'[data-nav="phrasebank"]', title:'Reference: look things up', text:'A searchable phrase bank, topic vocabulary with flashcards, the grammar kit and the writing checklist. Open them while you write.' },
  { sel:'[data-nav="selfcheck"]', title:'Self-check studio', text:'Paste a draft and get instant feedback on length, register and conventions, plus a ready-made prompt for an AI second opinion.' },
  { sel:'[data-nav="taskbank"]', title:'Practise: write and check', text:'Matura-style prompts with source material, paragraph training, a practice zone to spot mistakes, and the final quiz.' },
  { sel:'#themeToggle', title:'Theme and progress', text:'Switch between light and dark here. Visited sections and quiz results are saved on this device, so the menu remembers where you were.' },
  { sel:null, title:'You are set', text:'Pick any section in the menu to start. You can replay this tour any time from the ? button at the top of the menu, or the button on the home page.' },
];
let tourI = 0, tourActive = false;
function ensureTourDom(){
  if (document.getElementById('tourCard')) return;
  const w = document.createElement('div');
  w.innerHTML = '<div id="tourCatch" class="tour-catch"></div><div id="tourSpot" class="tour-spot"></div><div id="tourCard" class="tour-card" role="dialog" aria-modal="true" aria-label="Guided tour"></div>';
  document.body.appendChild(w);
  var _card = document.getElementById('tourCard');
  _card.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var f = _card.querySelectorAll('button'); if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
}
function positionTourCard(rect){
  const card = document.getElementById('tourCard');
  const cw = card.offsetWidth, ch = card.offsetHeight, gap = 16, vw = window.innerWidth, vh = window.innerHeight;
  let left, top;
  if (!rect){ left = (vw-cw)/2; top = (vh-ch)/2; }
  else if (rect.right+gap+cw <= vw){ left = rect.right+gap; top = Math.min(Math.max(8, rect.top), vh-ch-8); }
  else if (rect.left-gap-cw >= 0){ left = rect.left-gap-cw; top = Math.min(Math.max(8, rect.top), vh-ch-8); }
  else if (rect.bottom+gap+ch <= vh){ left = Math.min(Math.max(8, rect.left), vw-cw-8); top = rect.bottom+gap; }
  else { left = (vw-cw)/2; top = (vh-ch)/2; }
  card.style.left = Math.round(left)+'px'; card.style.top = Math.round(top)+'px';
}
function showTour(i){
  ensureTourDom();
  tourI = Math.max(0, Math.min(TOUR.length-1, i));
  const step = TOUR[tourI];
  const spot = document.getElementById('tourSpot'), card = document.getElementById('tourCard'), catcher = document.getElementById('tourCatch');
  catcher.style.display = 'block';
  let rect = null;
  if (step.sel){ const t = document.querySelector(step.sel); if (t){ const r = t.getBoundingClientRect(); if (r.width>0 && r.height>0 && r.right>0 && r.left<window.innerWidth && r.bottom>0 && r.top<window.innerHeight){ rect = r; } } }
  if (rect){ const pad = 6; spot.style.display='block'; spot.style.top=(rect.top-pad)+'px'; spot.style.left=(rect.left-pad)+'px'; spot.style.width=(rect.width+pad*2)+'px'; spot.style.height=(rect.height+pad*2)+'px'; }
  else { spot.style.display='none'; }
  const isLast = tourI===TOUR.length-1, isFirst = tourI===0;
  card.innerHTML = '<div class="tc-step">Step '+(tourI+1)+' of '+TOUR.length+'</div>' +
    '<div class="tc-title">'+step.title+'</div>' +
    '<div class="tc-text">'+step.text+'</div>' +
    '<div class="tc-btns">' +
      (isFirst?'':'<button class="btn btn-ghost btn-sm" data-action="tour-prev">Back</button>') +
      '<button class="btn btn-primary btn-sm" data-action="tour-next">'+(isLast?'Done':'Next')+'</button>' +
      (isLast?'':'<button class="tc-skip" data-action="tour-skip">Skip</button>') +
    '</div>';
  card.style.display = 'block';
  positionTourCard(rect);
  var _nb = card.querySelector('[data-action="tour-next"]'); if (_nb) { try { _nb.focus(); } catch (e) {} }
}
function startTour(){ tourActive = true; document.body.classList.add('tour-on'); var _app = document.getElementById('app'); if (_app) { _app.setAttribute('inert', ''); _app.setAttribute('aria-hidden', 'true'); } if (window.innerWidth <= 840) { var _sn = document.getElementById('sidenav'); if (_sn) _sn.classList.add('open'); } showTour(0); }
function endTour(){ tourActive = false; document.body.classList.remove('tour-on'); var _app=document.getElementById('app'); if(_app){ _app.removeAttribute('inert'); _app.removeAttribute('aria-hidden'); } var _sn=document.getElementById('sidenav'); if(_sn) _sn.classList.remove('open'); var _ov=document.querySelector('.nav-overlay'); if(_ov) _ov.remove(); var _bg=document.getElementById('burger'); if(_bg) _bg.setAttribute('aria-expanded','false'); ['tourSpot','tourCard','tourCatch'].forEach(function(id){ const e=document.getElementById(id); if(e) e.style.display='none'; }); try{ M.store('mwg_tour_done','1'); }catch(e){} var _h=(window.innerWidth<=840)?_bg:document.querySelector('.nav-help[data-action="start-tour"]'); if(_h){ try{ _h.focus(); }catch(e){} } }
function maybeShowHint(){
  try{ if (M.store('mwg_hint_seen')) return; }catch(e){ return; }
  if (window.innerWidth <= 840) return;
  var help = document.querySelector('.nav-help'); var brand = document.querySelector('.nav-brand');
  if (!help || !brand) return;
  help.classList.add('pulse');
  var hint = document.createElement('div');
  hint.className = 'nav-hint';
  hint.innerHTML = '<b>New here?</b>Take a quick tour of the guide.';
  brand.appendChild(hint);
  var done = false;
  function dismiss(persist){ if(done) return; done=true; help.classList.remove('pulse'); if(hint.parentNode) hint.remove(); if(persist){ try{ M.store('mwg_hint_seen','1'); }catch(e){} } document.removeEventListener('click', onDoc, true); window.removeEventListener('hashchange', onNav); }
  function onDoc(e){ if (e.target.closest('.nav-hint')) return; dismiss(true); }
  function onNav(){ dismiss(true); }
  hint.addEventListener('click', function(e){ e.stopPropagation(); dismiss(true); startTour(); });
  setTimeout(function(){ document.addEventListener('click', onDoc, true); }, 200);
  window.addEventListener('hashchange', onNav);
  setTimeout(function(){ dismiss(false); }, 10000);
}
window.addEventListener('resize', function(){ if (tourActive) showTour(tourI); });
M.startTour = startTour;
M.route = route;

/* ─── EVENT DELEGATION ────────────────────────────────────── */
document.addEventListener('click', e => {
  /* copy chips / buttons */
  const copyEl = e.target.closest('[data-copy]');
  if (copyEl) {
    M.copyText(copyEl.dataset.copy, () => M.flashCopied(copyEl));
    return;
  }
  const jump = e.target.closest('[data-scroll-to]');
  if (jump) { const tgt = document.getElementById(jump.dataset.scrollTo); if (tgt) { tgt.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }); tgt.setAttribute('tabindex', '-1'); try { tgt.focus({ preventScroll: true }); } catch (err) {} } return; }
  const row = e.target.closest('[data-goto]');
  if (row) { location.hash = '#' + row.dataset.goto; return; }

  const el = e.target.closest('[data-action]');
  if (!el) return;
  const act = el.dataset.action;

  if (act === 'acc') {
    const item = el.closest('.acc-item');
    if (item) { item.classList.toggle('open'); el.setAttribute('aria-expanded', item.classList.contains('open')); }
  }
  else if (act === 'print') { window.print(); }
  else if (act === 'start-tour') { startTour(); }
  else if (act === 'set-school') { M.autoSchool = false; M.setSchool(el.dataset.school); const ch = document.getElementById('schoolChooser'); if (ch) ch.remove(); var appEl = document.getElementById('app'); if (appEl) { appEl.removeAttribute('inert'); appEl.removeAttribute('aria-hidden'); } var ab = document.querySelector('.school-btn.active'); if (ab) { try { ab.focus(); } catch (e) {} } }
  else if (act === 'open-search') { M.openSearch && M.openSearch(); }
  else if (act === 'reset-progress') {
    const resetMsg = el.dataset.lang === 'de'
      ? 'Gespeicherten Fortschritt auf diesem Gerät löschen? Das entfernt besuchte Seiten, Quizergebnisse, Karteikarten, Lernplan und Prüfungsdatum. Design und Schultyp bleiben erhalten.'
      : 'Delete your saved progress on this device? This removes visited pages, quiz results, flashcards, study plan and exam date. Theme and school type are kept.';
    if (window.confirm(resetMsg)) {
      try { Object.keys(localStorage).filter(function (k) { return k.indexOf('mwg_') === 0 && k !== 'mwg_theme' && k !== 'mwg_school'; }).forEach(function (k) { localStorage.removeItem(k); }); } catch (e) {}
      location.reload();
    }
  }
  else if (act.indexOf('flash-') === 0) { M.flashAction && M.flashAction(act, el.dataset); }
  else if (act.indexOf('plan-') === 0) { M.planAction && M.planAction(act, el); }
  else if (act.indexOf('rate-') === 0) { M.rateAction && M.rateAction(act, el); }
  else if (act.indexOf('mock-') === 0) { M.mockAction && M.mockAction(act); }
  else if (act === 'hm-jump') { M.hmJump && M.hmJump(el); }
  else if (act === 'tour-next') { if (tourI >= TOUR.length-1) endTour(); else showTour(tourI+1); }
  else if (act === 'tour-prev') { showTour(tourI-1); }
  else if (act === 'tour-skip') { endTour(); }
  else if (act === 'toggle-labels') {
    const box = el.closest('.model-box');
    box.classList.toggle('show-labels');
    el.textContent = box.classList.contains('show-labels') ? 'Hide labels' : 'Show all labels';
  }
  /* text-type tabs */
  else if (act === 'type-tab') { M.typeTabs[el.dataset.type] = el.dataset.tab; route(); }
  /* quiz */
  else if (act === 'quiz-pick') { M.quizAction(act, el.dataset.quiz, +el.dataset.i); }
  else if (act === 'quiz-next' || act === 'quiz-restart' || act === 'quiz-retry-wrong') { M.quizAction(act, el.dataset.quiz); }
  /* dnd */
  else if (act === 'dnd-up' || act === 'dnd-down') {
    const st = M.dndStates[el.dataset.dnd]; const i = +el.dataset.i;
    const j = act === 'dnd-up' ? i - 1 : i + 1;
    if (st && j >= 0 && j < st.shuffled.length) {
      [st.shuffled[i], st.shuffled[j]] = [st.shuffled[j], st.shuffled[i]];
      st.checked = false; M.repaintDnd(el.dataset.dnd);
      const dh = $('[data-dnd-host="' + el.dataset.dnd + '"]');
      const mb = dh && dh.querySelector('.dnd-item[data-i="' + j + '"] [data-action="' + act + '"]');
      if (mb) { try { mb.focus(); } catch (e) {} }
      if (M.announce) M.announce('Moved to position ' + (j + 1) + ' of ' + st.shuffled.length);
    }
  }
  else if (act === 'dnd-check') { const st = M.dndStates[el.dataset.dnd]; if (st) { st.checked = true; M.repaintDnd(el.dataset.dnd); } }
  else if (act === 'dnd-retry') {
    const did = el.dataset.dnd; const st = M.dndStates[did];
    if (st) { st.shuffled = M.shuffle(st.items); st.checked = false; M.repaintDnd(did); }
  }
  /* phrase bank */
  else if (act === 'pb-filter') { M.pbState.filter = el.dataset.f; route(); }
  /* checklist */
  else if (act === 'cl-type') { M.clState.type = el.dataset.t; M.clState.checks = {}; M.clState.submitted = false; route(); }
  else if (act === 'cl-toggle') {
    if (!M.clState.submitted) { M.clState.checks[el.dataset.id] = !M.clState.checks[el.dataset.id]; rerender('#clBody', M.clBody()); }
  }
  else if (act === 'cl-submit') { M.clState.submitted = true; rerender('#clBody', M.clBody()); }
  else if (act === 'cl-reset') { M.clState.checks = {}; M.clState.submitted = false; rerender('#clBody', M.clBody()); }
  /* self-check */
  else if (act === 'sc-run') {
    const text = $('#scText').value;
    const type = $('#scType').value;
    const target = +$('#scTarget').value;
    const findings = M.analyze(text, type, target, $('#scTask') ? $('#scTask').value : '');
    const icons = { ok: '✓', warn: '!', bad: '✗', info: 'i' };
    rerender('#scResults',
      '<h2 class="section-label">Findings</h2><div style="border:1px solid var(--border)">' +
      findings.map(f => '<div class="finding ' + f.status + '"><span class="fi">' + icons[f.status] + '</span><span class="ft">' + f.html + '</span></div>').join('') +
      '</div>');
    M.announce('Check complete. ' + findings.length + ' note' + (findings.length === 1 ? '' : 's') + '.');
    try { $('#scResults').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }); } catch (err) {}
  }
  else if (act === 'sc-prompt') {
    const text = $('#scText').value.trim();
    if (!text) { M.toast('Paste your text first'); return; }
    const type = SRDP.textTypes.find(t => t.id === $('#scType').value);
    if (!type) { M.toast('Pick a text type first'); return; }
    const prompt = SRDP.aiPromptTemplate(type.name, $('#scTarget').value, $('#scTask').value.trim(), text) + (M.scRatingLine ? M.scRatingLine() : '');
    M.copyText(prompt, () => M.flashCopied(el));
  }
  /* task bank */
  else if (act === 'tb-filter') { M.tbState.filter = el.dataset.f; route(); }
  else if (act === 'tb-random') {
    const base = M.tbPrompts ? M.tbPrompts().map(x => x.p) : SRDP.prompts;
    const pool = M.tbState.filter === 'all' ? base : base.filter(p => p.type === M.tbState.filter);
    if (!pool.length) { M.toast('No tasks for this filter yet'); return; }
    const p = pool[Math.floor(Math.random() * pool.length)];
    rerender('#tbRandom', '<div style="border:2px solid var(--primary);border-bottom:none;margin-top:0"><div style="padding:10px 22px;background:var(--primary-faint);font-size:.75rem;letter-spacing:.32px;color:var(--primary)">🎲 Your random task. No take-backs, start writing!</div>' + M.taskCard(p, 0) + '</div>');
    try { $('#tbRandom').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }); } catch (err) {}
  }
  /* paragraphs */
  else if (act === 'para-tab') { M.paraTabs.current = el.dataset.tab; route(); }
  else if (act === 'wu-toggle') { M.warmupState.show = !M.warmupState.show; rerender('#paraBody', M.paragraphsBody(), M.wireParaInputs); }
  else if (act === 'wu-prev' || act === 'wu-next') {
    const n = SRDP.paragraphs.warmups.length;
    M.warmupState.i = (M.warmupState.i + (act === 'wu-next' ? 1 : n - 1)) % n;
    M.warmupState.show = false;
    rerender('#paraBody', M.paragraphsBody(), M.wireParaInputs);
  }
  else if (act === 'pt-task') { M.taskState.i = +el.dataset.i; M.taskState.show = false; M.taskState.analysis = false; rerender('#paraBody', M.paragraphsBody(), M.wireParaInputs); }
  else if (act === 'pt-model') { M.taskState.show = !M.taskState.show; if (!M.taskState.show) M.taskState.analysis = false; rerender('#paraBody', M.paragraphsBody(), M.wireParaInputs); }
  else if (act === 'pt-analysis') { M.taskState.analysis = !M.taskState.analysis; rerender('#paraBody', M.paragraphsBody(), M.wireParaInputs); }
  /* practice zone */
  else if (act === 'prz-tab') { M.przState.tab = el.dataset.tab; route(); }
  else if (act === 'spot-toggle') { M.przState.revealed[el.dataset.id] = !M.przState.revealed[el.dataset.id]; rerender('#przBody', M.practiceBody(), M.wirePractice); }
  else if (act === 'reg-reveal') { M.przState.regRevealed[el.dataset.i] = true; rerender('#przBody', M.practiceBody(), M.wirePractice); }
});

/* keyboard support for checklist rows */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && tourActive) { endTour(); return; }
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[data-action="cl-toggle"]')) {
    e.preventDefault(); e.target.click();
  }
});

/* mobile nav */
$('#burger').addEventListener('click', () => {
  const nav = $('#sidenav');
  const open = nav.classList.toggle('open');
  $('#burger').setAttribute('aria-expanded', open);
  if (open) {
    const ov = document.createElement('div');
    ov.className = 'nav-overlay';
    ov.addEventListener('click', () => { nav.classList.remove('open'); ov.remove(); $('#burger').setAttribute('aria-expanded', 'false'); });
    document.body.appendChild(ov);
  } else { const ov = $('.nav-overlay'); if (ov) ov.remove(); }
});

/* ─── FIRST-VISIT SCHOOL CHOOSER ──────────────────────────── */
function showSchoolChooser() {
  if (M.schoolChosen && M.schoolChosen() && !M.autoSchool) return;
  if (document.getElementById('schoolChooser')) return;
  const SC = (window.SRDP && SRDP.schools) || {};
  function card(id) {
    const c = SC[id] || {};
    const d = id === 'ahs' ? 'Gymnasium · 2 writing tasks, with the essay' : 'HAK, HTL, HUM, BAfEP and others · 3 writing tasks, with the leaflet';
    return '<button class="sc-card" data-action="set-school" data-school="' + id + '">' +
      '<span class="sc-k">' + esc(c.label || id.toUpperCase()) + '</span>' +
      '<span class="sc-d">' + esc(d) + '</span></button>';
  }
  const w = document.createElement('div');
  w.id = 'schoolChooser';
  w.className = 'school-chooser';
  w.setAttribute('role', 'dialog');
  w.setAttribute('aria-modal', 'true');
  w.setAttribute('aria-labelledby', 'scTitle'); w.setAttribute('aria-describedby', 'scSub');
  w.innerHTML = '<div class="sc-box">' +
    '<div class="sc-title" id="scTitle">Welcome! Which school type are you at?</div>' +
    '<div class="sc-sub" id="scSub">Grammar, vocabulary and the language tools are the same for both, and so is the assessment grid. Only the text types and the number of writing tasks differ (AHS: 2, BHS: 3). <span lang="de">Willkommen! Wähle deinen Schultyp – du kannst oben links jederzeit umschalten.</span></div>' +
    '<div class="sc-cards">' + card('ahs') + card('bhs') + '</div>' +
    '<button class="sc-skip" data-action="set-school" data-school="ahs">Not sure? Start with AHS – you can switch any time in the menu.</button>' +
  '</div>';
  document.body.appendChild(w);
  var appEl = document.getElementById('app'); if (appEl) { appEl.setAttribute('inert', ''); appEl.setAttribute('aria-hidden', 'true'); }
  w.addEventListener('keydown', function (e) { if (e.key === 'Escape') { var sk = w.querySelector('.sc-skip'); if (sk) sk.click(); return; } if (e.key !== 'Tab') return; var cards = w.querySelectorAll('.sc-card, .sc-skip'); if (!cards.length) return; var f0 = cards[0], fn = cards[cards.length - 1]; if (e.shiftKey && document.activeElement === f0) { e.preventDefault(); fn.focus(); } else if (!e.shiftKey && document.activeElement === fn) { e.preventDefault(); f0.focus(); } });
  const first = w.querySelector('.sc-card'); if (first) { try { first.focus(); } catch (e) {} }
}
M.showSchoolChooser = showSchoolChooser;

/* INIT */
M.setTheme(M.store('mwg_theme') || 'light');
document.documentElement.setAttribute('data-school', M.school());
M.buildNav();
M.initBackToTop();
window.addEventListener('hashchange', route);
route();
if (M.schoolChosen() && !M.autoSchool) setTimeout(maybeShowHint, 600);
else showSchoolChooser();
})();
