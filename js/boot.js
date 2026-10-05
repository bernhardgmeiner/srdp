/* ════════════════════════════════════════════════════════════
   Boot – footer, router, event delegation
   ════════════════════════════════════════════════════════════ */
(function () {
'use strict';
const M = window.MWG;
const { $, $$, esc } = M;
/* Schuljahr automatisch: ab September gilt das neue Schuljahr */
function schoolYear() {
  const d = new Date(), y = d.getFullYear(), start = d.getMonth() >= 8 ? y : y - 1;
  return start + '/' + String(start + 1).slice(2);
}
function siteFooter() {
  const wide = window.innerWidth > 840;
  return '<footer class="site-footer no-print"><div class="ftin">' +
    '<p class="ft-short">Free and independent. Not an official document of the BMB. No accounts and no tracking.</p>' +
    '<details class="ft-details"' + (wide ? ' open' : '') + '><summary>About this site, your data and Impressum</summary>' +
    '<div class="ft-cols">' +
      '<div><h2 class="ft-h">About this site</h2><p>A free, independent site for the text types of the written English Matura (AHS and BHS, B2), from the 5th class to the Matura. Made by an English teacher. It is not an official document of the BMB or of any education authority.</p></div>' +
      '<div><h2 class="ft-h">Your data</h2><p>Your progress is saved only in this browser on this device. If you clear your browser data or switch devices, it is gone. Nothing leaves your device unless you use the optional AI prompt yourself. Like any website, the host (GitHub Pages) logs your IP address.</p><p class="mt-3"><button class="btn btn-ghost btn-sm" data-action="reset-progress">Reset my progress on this device</button></p></div>' +
      '<div><h2 class="ft-h" lang="de">Impressum / Kontakt</h2><p lang="de">Bernhard Gmeiner, Wien<br>E-Mail: bernhard.gmeiner@gmail.com<br><a href="https://www.bernhardgmeiner.com" target="_blank" rel="noopener">bernhardgmeiner.com</a><br>Privates, nichtkommerzielles Projekt.</p></div>' +
      '<div><h2 class="ft-h">Found a mistake? <span lang="de">/ Fehler gefunden?</span></h2><p>A typo, a wrong fact or a broken link? <a href="mailto:bernhard.gmeiner@gmail.com?subject=Matura%20Guide%20Feedback">Send a short e-mail</a> and say which section it is in. Thank you.</p></div>' +
    '</div></details>' +
    '<div class="ft-base" lang="de">Diese Seite hilft bei der Vorbereitung auf die schriftliche Englisch-Matura (AHS und BHS, B2) und orientiert sich an der offiziellen SRDP-Beurteilungsskala. In der echten Matura bewerten die Lehrkräfte der Schule. · Stand: Schuljahr ' + schoolYear() + '</div>' +
  '</div></footer><div class="print-note" lang="de">Unabhängige Übungsseite von Bernhard Gmeiner, kein offizielles Dokument des BMB. Die Übungsaufgaben sind nachgebaut. Es zählt die Bewertung deiner Lehrkräfte.</div>';
}

/* ─── ROUTER ──────────────────────────────────────────────── */
/* Seiten, die im Menü unter einer anderen Seite hängen (eigene URL bleibt) */
const NAV_ALIAS = { topicvocab: 'phrasebank', checklist: 'selfcheck' };
/* Kleiner Plan-Hinweis im Menü, sobald ein Prüfungsdatum gespeichert ist */
function paintPlanChip() {
  const el = document.getElementById('navPlan');
  if (!el) return;
  const ap = M.activePlan ? M.activePlan() : null;
  if (!ap) { el.hidden = true; return; }
  const s = ap.s, what = ap.kind === 'test' ? 'Schularbeit' : 'Matura';
  el.hidden = false;
  el.innerHTML = s.daysLeft === 0 ? '<strong>' + what + ' today.</strong> Good luck!' :
    '<strong>' + what + ' in ' + s.daysLeft + ' day' + (s.daysLeft === 1 ? '' : 's') + '</strong><span>Your plan <span aria-hidden="true">&rarr;</span></span>';
}
M.paintPlanChip = paintPlanChip;
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
    else { const label = (SRDP.schools && SRDP.schools[tt.schools[0]] && SRDP.schools[tt.schools[0]].label) || tt.schools[0].toUpperCase(); id = 'home'; setTimeout(function () { M.toast('The ' + tt.name.toLowerCase() + ' is ' + (/^[AEIOU]/.test(label) ? 'an ' : 'a ') + label + ' text type. Switch the school type in the menu to see it.'); }, 50); }
  }
  const prev = current;
  current = id;
  const page = PAGES[id];
  const main = $('#main');
  main.innerHTML = page.render() + siteFooter();
  if (page.wire) page.wire();
  decorateTabs(main);
  if (M.buildPageTOC) M.buildPageTOC();
  if (page.track) M.markVisited(page.track);
  const navId = NAV_ALIAS[id] || id;
  $$('#sidenav .nav-item').forEach(a => { const on = a.dataset.nav === navId; a.classList.toggle('active', on); if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
  paintPlanChip();
  const _mt = document.querySelector('.mobile-bar .t1'); if (_mt) _mt.textContent = page.title;
  document.title = page.title + ' – Matura Writing Guide B2';
  try { main.scrollTo({ top: 0 }); window.scrollTo({ top: 0 }); } catch (e) { main.scrollTop = 0; }
  if ($('#sidenav').classList.contains('open')) closeMobileNav(false);
  if (id !== prev) { try { main.focus(); } catch (e) {} if (M.announce) M.announce(page.title); }
  else { const at = main.querySelector('.tabs .tab.active'); if (at) { try { at.focus(); } catch (e) {} } }
  M.paintNav();
  if (page.afterRoute) page.afterRoute();
}
function rerender(partId, html, wire) { const el = $(partId); if (el) { M.setHTML(el, html); wire && wire(); decorateTabs(el); } }
/* Tab-Leisten für Screenreader: role=tablist/tab + aria-selected (Filterleisten inklusive) */
/* Echte Reiter (im Seitenkopf, wechseln den Inhalt): role=tablist/tab/tabpanel, Pfeiltasten, Home/End.
   Filterleisten (.tabs.filters) sind Umschalter: role=group + aria-pressed.
   Geschwister-Seiten (.sib-tabs) sind Links: nichts zu tun. */
let tabSeq = 0;
function decorateTabs(root) {
  $$('.tabs', root).forEach(bar => {
    if (bar.classList.contains('sib-tabs')) return;
    const btns = $$('.tab', bar);
    if (bar.classList.contains('filters') || !bar.closest('.page-head')) {
      bar.setAttribute('role', 'group');
      btns.forEach(b => { b.removeAttribute('role'); b.setAttribute('aria-pressed', b.classList.contains('active') ? 'true' : 'false'); });
      return;
    }
    bar.setAttribute('role', 'tablist');
    const h1 = $('h1', root.closest ? (root.closest('#main') || root) : root) || $('#main h1');
    if (!bar.hasAttribute('aria-label')) bar.setAttribute('aria-label', (h1 ? h1.textContent + ': ' : '') + 'sections');
    const panel = $('#main .page > .wrap');
    const active = btns.find(b => b.classList.contains('active')) || btns[0];
    btns.forEach(b => {
      if (!b.id) b.id = 'tab-' + (++tabSeq);
      const on = b === active;
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', on ? 'true' : 'false');
      b.tabIndex = on ? 0 : -1;
      if (panel) { if (!panel.id) panel.id = 'tabpanel-main'; b.setAttribute('aria-controls', panel.id); }
    });
    if (panel && active) { panel.setAttribute('role', 'tabpanel'); panel.setAttribute('aria-labelledby', active.id); }
    if (!bar._kb) {
      bar._kb = true;
      bar.addEventListener('keydown', e => {
        const list = $$('.tab', bar), i = list.indexOf(document.activeElement);
        if (i < 0) return;
        let n = -1;
        if (e.key === 'ArrowRight') n = (i + 1) % list.length;
        else if (e.key === 'ArrowLeft') n = (i - 1 + list.length) % list.length;
        else if (e.key === 'Home') n = 0;
        else if (e.key === 'End') n = list.length - 1;
        if (n < 0) return;
        e.preventDefault();
        list[n].click();
        setTimeout(() => { const again = $$('#main .page-head .tab')[n]; if (again) { try { again.focus(); } catch (err) {} } }, 0);
      });
    }
  });
}
M.decorateTabs = decorateTabs;

/* ─── GUIDED TOUR ─────────────────────────────────────────── */
const TOUR = [
  { sel:null, title:'Welcome to the writing guide', text:'Everything here is about the writing tasks of the B2 Matura. This tour shows you where things are. It takes about a minute.' },
  { sel:'[data-nav="overview"]', title:'Start with the overview', text:'How the Writing section works, how much time you get, how the four criteria are graded and how bands become your grade.' },
  { sel:'[data-nav="studyplan"]', title:'Your study plan', text:'A day-by-day plan for your next Schularbeit or for the Matura. Enter the date (and the text types for a Schularbeit), and the plan shows you what to do each day.' },
  { sel:'[data-nav="article"]', title:'The text types', text:'Each text type has a guide, model texts, phrases, a quiz and a sentence-order exercise. Open one and switch between the tabs at the top.' },
  { sel:'[data-nav="taskbank"]', title:'Practise with Matura-style tasks', text:'Matura-style tasks with input material. Each task has a button that sends it to the self-check, so you can write and check in one go.' },
  { sel:'[data-nav="selfcheck"]', title:'Self-check and checklist', text:'Paste a draft and get quick notes on length, register and layout, plus a ready-made prompt for AI feedback. The final checklist is in the same place.' },
  { sel:'[data-nav="timer"]', title:'Mock exam', text:'The full exam under time: the site picks a set of tasks for your school type and runs the clock.' },
  { sel:'[data-nav="phrasebank"]', title:'Look things up', text:'Phrases, topic vocabulary with flashcards and the grammar kit. Open them while you write.' },
  { sel:'#themeToggle', title:'Dark mode and progress', text:'Switch dark mode on or off here. Visited sections and quiz results are saved on this device, and the menu shows them with ticks.' },
  { sel:null, title:'You are ready', text:'Pick any section in the menu. You can start this tour again with the ? button at the top of the menu.' },
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
  if (step.sel){ const t = document.querySelector(step.sel); if (t && t.closest('.nav-scroll, #sidenav')) { try { t.scrollIntoView({ block: 'nearest' }); } catch (e) {} } if (t){ const r = t.getBoundingClientRect(); if (r.width>0 && r.height>0 && r.right>0 && r.left<window.innerWidth && r.bottom>0 && r.top<window.innerHeight){ rect = r; } } }
  if (rect){ const pad = 6; spot.style.display='block'; spot.style.top=(rect.top-pad)+'px'; spot.style.left=(rect.left-pad)+'px'; spot.style.width=(rect.width+pad*2)+'px'; spot.style.height=(rect.height+pad*2)+'px'; }
  else { spot.style.display='none'; }
  const isLast = tourI===TOUR.length-1, isFirst = tourI===0;
  card.innerHTML = '<div class="tc-step">Step '+(tourI+1)+' of '+TOUR.length+'</div>' +
    '<div class="tc-title">'+step.title+'</div>' +
    '<div class="tc-text">'+step.text+'</div>' +
    '<div class="tc-btns">' +
      (isFirst?'':'<button class="btn btn-ghost btn-sm" data-action="tour-prev">Back</button>') +
      '<button class="btn btn-primary btn-sm" data-action="tour-next">'+(isLast?'Done':'Next')+'</button>' +
      (isLast?'':'<button class="btn-text" data-action="tour-skip">Skip the tour</button>') +
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
  hint.innerHTML = '<b>New here?</b>Take the one-minute tour.';
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
    el.setAttribute('aria-pressed', box.classList.contains('show-labels') ? 'true' : 'false');
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
  else if (act === 'dnd-check') { M.dndCheck(el.dataset.dnd); }
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
  else if (act === 'sc-clear') { const t = $('#scText'); if (t) { t.value = ''; try { sessionStorage.removeItem('mwg_sc_draft'); } catch (e) {} t.dispatchEvent(new Event('input')); try { t.focus(); } catch (e) {} } const n = el.closest('.sc-draftnote'); if (n) n.remove(); M.announce('Text box cleared.'); }
  else if (act === 'tb-write') { M.sendToSelfcheck && M.sendToSelfcheck(+el.dataset.i); }
  else if (act === 'tb-show-type') { M.tbState.filter = el.dataset.type; M.tbState.open = null; location.hash = '#taskbank'; }
  else if (act === 'tb-random') {
    const base = M.tbPrompts ? M.tbPrompts().map(x => x.p) : SRDP.prompts;
    const pool = M.tbState.filter === 'all' ? base : base.filter(p => p.type === M.tbState.filter);
    if (!pool.length) { M.toast('No tasks for this filter yet'); return; }
    const p = pool[Math.floor(Math.random() * pool.length)];
    rerender('#tbRandom', '<div class="tb-random" role="status"><div class="tb-random-h">Your random task</div>' + M.taskCard(p, 0) + '</div>');
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

/* mobile nav: Inhalt dahinter inert, Escape schließt, Fokus zurück zum Menü-Button */
function closeMobileNav(focusBurger) {
  const nav = $('#sidenav'); const bg = $('#burger');
  nav.classList.remove('open');
  const ov = $('.nav-overlay'); if (ov) ov.remove();
  const mn = $('#main'); if (mn) mn.removeAttribute('inert');
  const btt = document.getElementById('backtop'); if (btt) btt.removeAttribute('inert');
  if (bg) { bg.setAttribute('aria-expanded', 'false'); if (focusBurger) { try { bg.focus(); } catch (e) {} } }
}
$('#burger').addEventListener('click', () => {
  const nav = $('#sidenav');
  const open = !nav.classList.contains('open');
  if (!open) { closeMobileNav(false); return; }
  nav.classList.add('open');
  $('#burger').setAttribute('aria-expanded', 'true');
  const mn = $('#main'); if (mn) mn.setAttribute('inert', '');
  ['backtop'].forEach(id => { const x = document.getElementById(id); if (x) x.setAttribute('inert', ''); });
  const ov = document.createElement('div');
  ov.className = 'nav-overlay';
  ov.addEventListener('click', () => closeMobileNav(true));
  document.body.appendChild(ov);
  const first = nav.querySelector('.nav-item.active') || nav.querySelector('.nav-item');
  if (first) { try { first.focus(); } catch (e) {} }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && $('#sidenav').classList.contains('open') && !tourActive) { closeMobileNav(true); }
});

/* ─── FIRST-VISIT SCHOOL CHOOSER ──────────────────────────── */
function showSchoolChooser() {
  if (M.schoolChosen && M.schoolChosen() && !M.autoSchool) return;
  if (document.getElementById('schoolChooser')) return;
  const SC = (window.SRDP && SRDP.schools) || {};
  function card(id) {
    const c = SC[id] || {};
    const d = id === 'ahs' ? 'Gymnasium · 2 writing tasks, including the essay' : 'HAK, HTL, HUM, BAfEP and others · 3 writing tasks, including the leaflet';
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
    '<div class="sc-sub" id="scSub">Grammar, vocabulary, the language tools and the assessment scale are the same for both. The text types and the number of writing tasks differ (AHS: 2, BHS: 3). <span lang="de">Willkommen! Wähle deinen Schultyp. Du kannst ihn im Menü jederzeit ändern.</span></div>' +
    '<div class="sc-cards">' + card('ahs') + card('bhs') + '</div>' +
    '<button class="btn-text sc-skip" data-action="set-school" data-school="ahs">Not sure? Start with AHS. You can switch in the menu at any time.</button>' +
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
