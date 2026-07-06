/* ════════════════════════════════════════════════════════════
   Boot — footer, router, event delegation
   ════════════════════════════════════════════════════════════ */
(function () {
'use strict';
const M = window.MWG;
const { $, $$, esc } = M;
const SITE_FOOTER = '<footer class="site-footer no-print"><div class="ftin">' +'<div class="ft-cols">' +'<div><div class="ft-h">About this site</div><p>A free, independent revision site for the written part of the English Matura (AHS, B2). Made by an English teacher. It is not an official document of the BMB or any education authority.</p></div>' +'<div><div class="ft-h">Your data</div><p>No account, no tracking, no ads. Your progress is saved only in your own browser and is never sent anywhere. Everything runs on your device.</p></div>' +'<div><div class="ft-h" lang="de">Impressum / Kontakt</div><p lang="de">Bernhard Gmeiner, Wien<br>E-Mail: bernhard.gmeiner@gmail.com<br><a href="https://www.bernhardgmeiner.com" target="_blank" rel="noopener">bernhardgmeiner.com</a><br>Privates, nicht-kommerzielles Projekt.</p></div>' +'<div><div class="ft-h">Found a mistake? <span lang="de">/ Fehler gefunden?</span></div><p>Spotted a typo, a wrong fact or a broken link? <a href="mailto:bernhard.gmeiner@gmail.com?subject=Matura%20Guide%20Feedback">Send a short e-mail</a> and mention which section it is in. Every report makes the guide better.</p></div>' +'</div>' +'<div class="ft-base" lang="de">Diese Seite hilft bei der Vorbereitung auf die schriftliche Englisch-Matura (AHS, B2) und orientiert sich an der offiziellen SRDP-Beurteilungsskala. Bewertet wird in der echten Matura von deinen Lehrkr\u00e4ften mit der offiziellen Skala. \u00b7 Stand: Schuljahr 2025/26</div>' +'</div></footer>';

/* ─── ROUTER ──────────────────────────────────────────────── */
let current = '';
/* Prerender-Hydration: /essay/ u. ä. wird als Startseite übernommen (kein Redirect).
   Interne Navigation läuft danach wie gehabt über Hashes. */
const pathMatch = location.pathname.match(/^\/([a-z]+)\/?$/);
const pathPage = (pathMatch && window.PAGES && PAGES[pathMatch[1]]) ? pathMatch[1] : null;
function route() {
  if (tourActive) endTour();
  let id = (location.hash || (pathPage ? '#' + pathPage : '#home')).slice(1);
  if (!PAGES[id]) id = 'home';
  current = id;
  const page = PAGES[id];
  const main = $('#main');
  main.innerHTML = page.render() + SITE_FOOTER;
  if (page.wire) page.wire();
  if (M.buildPageTOC) M.buildPageTOC();
  if (page.track) M.markVisited(page.track);
  $$('#sidenav .nav-item').forEach(a => a.classList.toggle('active', a.dataset.nav === id));
  document.title = page.title + ' — Matura Writing Guide B2';
  try { main.scrollTo({ top: 0 }); window.scrollTo({ top: 0 }); } catch (e) { main.scrollTop = 0; }
  $('#sidenav').classList.remove('open');
  const ov = $('.nav-overlay'); if (ov) ov.remove();
  M.paintNav();
}
function rerender(partId, html, wire) { const el = $(partId); if (el) { el.innerHTML = html; wire && wire(); } }

/* ─── GUIDED TOUR ─────────────────────────────────────────── */
const TOUR = [
  { sel:null, title:'Welcome to the writing guide', text:'Everything here is built around the two writing tasks of the B2 Matura. This quick tour shows you where things are. It takes about a minute.' },
  { sel:'[data-nav="overview"]', title:'Start with the overview', text:'How the Writing section is built, how much time you get, and how the four criteria are graded. Read it once and the rest makes more sense.' },
  { sel:'[data-nav="studyplan"]', title:'Your countdown plan', text:'A day-by-day study plan for the last four weeks (or the last seven days). Set your exam date and the plan tells you what to do today.' },
  { sel:'[data-nav="essay"]', title:'The five text types', text:'Essay, article, report, blog and email. Each one has a guide, a model text, a phrase list, a quiz and a drag-and-drop builder.' },
  { sel:'[data-nav="phrasebank"]', title:'Tools that do the work', text:'A searchable phrase bank, a self-assessment checklist, and the Self-check studio that scans a draft you paste in.' },
  { sel:'[data-nav="selfcheck"]', title:'Self-check studio', text:'Paste a draft and get instant feedback on length, register and conventions, plus a ready-made prompt for an AI second opinion.' },
  { sel:'[data-nav="taskbank"]', title:'Task bank and practice', text:'Real Matura-style prompts with source material, plus a practice zone to spot mistakes and take the final quiz.' },
  { sel:'#themeToggle', title:'Theme and progress', text:'Switch between light and dark here. Visited sections and quiz results are saved on this device, so the menu remembers where you were.' },
  { sel:null, title:'You are set', text:'Pick any section in the menu to start. You can replay this tour any time from the ? button at the top of the menu, or the button on the home page.' },
];
let tourI = 0, tourActive = false;
function ensureTourDom(){
  if (document.getElementById('tourCard')) return;
  const w = document.createElement('div');
  w.innerHTML = '<div id="tourCatch" class="tour-catch"></div><div id="tourSpot" class="tour-spot"></div><div id="tourCard" class="tour-card" role="dialog" aria-modal="true" aria-label="Guided tour"></div>';
  document.body.appendChild(w);
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
function startTour(){ tourActive = true; document.body.classList.add('tour-on'); if (window.innerWidth <= 840) { var _sn = document.getElementById('sidenav'); if (_sn) _sn.classList.add('open'); } showTour(0); }
function endTour(){ tourActive = false; document.body.classList.remove('tour-on'); var _sn=document.getElementById('sidenav'); if(_sn) _sn.classList.remove('open'); var _ov=document.querySelector('.nav-overlay'); if(_ov) _ov.remove(); ['tourSpot','tourCard','tourCatch'].forEach(function(id){ const e=document.getElementById(id); if(e) e.style.display='none'; }); try{ M.store('mwg_tour_done','1'); }catch(e){} }
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
  function dismiss(){ if(done) return; done=true; help.classList.remove('pulse'); if(hint.parentNode) hint.remove(); try{ M.store('mwg_hint_seen','1'); }catch(e){} document.removeEventListener('click', onDoc, true); window.removeEventListener('hashchange', dismiss); }
  function onDoc(e){ if (e.target.closest('.nav-hint')) return; dismiss(); }
  hint.addEventListener('click', function(e){ e.stopPropagation(); dismiss(); startTour(); });
  setTimeout(function(){ document.addEventListener('click', onDoc, true); }, 200);
  window.addEventListener('hashchange', dismiss);
  setTimeout(dismiss, 7000);
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
  else if (act === 'open-search') { M.openSearch && M.openSearch(); }
  else if (act.indexOf('flash-') === 0) { M.flashAction && M.flashAction(act, el.dataset); }
  else if (act.indexOf('plan-') === 0) { M.planAction && M.planAction(act, el); }
  else if (act.indexOf('rate-') === 0) { M.rateAction && M.rateAction(act, el); }
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
    const findings = M.analyze(text, type, target);
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
    const prompt = SRDP.aiPromptTemplate(type.name, $('#scTarget').value, $('#scTask').value.trim(), text) + (M.scRatingLine ? M.scRatingLine() : '');
    M.copyText(prompt, () => M.flashCopied(el));
  }
  /* task bank */
  else if (act === 'tb-filter') { M.tbState.filter = el.dataset.f; route(); }
  else if (act === 'tb-random') {
    const pool = M.tbState.filter === 'all' ? SRDP.prompts : SRDP.prompts.filter(p => p.type === M.tbState.filter);
    const p = pool[Math.floor(Math.random() * pool.length)];
    rerender('#tbRandom', '<div style="border:2px solid var(--primary);border-bottom:none;margin-top:0"><div style="padding:10px 22px;background:var(--primary-faint);font-size:.75rem;letter-spacing:.32px;color:var(--primary)">🎲 Your random task. No take-backs, start writing!</div>' + M.taskCard(p, 0) + '</div>');
    try { $('#tbRandom').scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (err) {}
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

/* INIT */
M.setTheme(M.store('mwg_theme') || 'light');
M.buildNav();
M.initBackToTop();
window.addEventListener('hashchange', route);
route();
setTimeout(maybeShowHint, 600);
})();
