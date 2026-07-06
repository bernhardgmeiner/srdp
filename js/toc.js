/* ════════════════════════════════════════════════════════════
   On-this-page TOC (sticky chips + scroll-spy) & Back-to-top
   ════════════════════════════════════════════════════════════ */
(function () {
'use strict';
const M = window.MWG;
const { $, $$ } = M;
const reduced = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let spy = null, spyScroll = null;
function buildPageTOC() {
  if (spy) { spy.disconnect(); spy = null; }
  if (spyScroll) { $('#main').removeEventListener('scroll', spyScroll); spyScroll = null; }
  const main = $('#main');
  const targets = $$('[data-toc-anchor]', main);
  if (targets.length < 2) return;
  const head = $('.page-head', main);
  if (!head) return;
  const bar = document.createElement('nav');
  bar.className = 'page-toc no-print';
  bar.setAttribute('aria-label', 'On this page');
  bar.innerHTML = '<div class="pt-in">' + targets.map(t =>
    '<a class="pt-chip" href="#" data-toc-to="' + t.id + '">' + M.esc(t.dataset.tocAnchor) + '</a>'
  ).join('') + '</div>';
  head.insertAdjacentElement('afterend', bar);
  bar.addEventListener('click', e => {
    const a = e.target.closest('[data-toc-to]');
    if (!a) return;
    e.preventDefault();
    const el = document.getElementById(a.dataset.tocTo);
    if (el) el.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' });
  });
  const paint = () => {
    const mainTop = main.getBoundingClientRect().top;
    let active = targets[0].id;
    if (main.scrollTop + main.clientHeight >= main.scrollHeight - 24) {
      active = targets[targets.length - 1].id; /* Seitenende: letzter Abschnitt gewinnt */
    } else {
      for (const t of targets) {
        if (t.getBoundingClientRect().top - mainTop <= 130) active = t.id; else break;
      }
    }
    $$('.pt-chip', bar).forEach(c => c.classList.toggle('active', c.dataset.tocTo === active));
  };
  spyScroll = () => { if (spy && bar.isConnected) requestAnimationFrame(paint); };
  main.addEventListener('scroll', spyScroll, { passive: true });
  spy = new IntersectionObserver(paint, { root: main, threshold: [0, 1] });
  targets.forEach(t => spy.observe(t));
  paint();
}

function initBackToTop() {
  const main = $('#main');
  const btn = document.createElement('button');
  btn.id = 'backtop';
  btn.className = 'backtop no-print';
  btn.setAttribute('aria-label', 'Back to top');
  btn.textContent = '↑';
  document.body.appendChild(btn);
  btn.addEventListener('click', () => {
    try { main.scrollTo({ top: 0, behavior: reduced() ? 'auto' : 'smooth' }); } catch (e) { main.scrollTop = 0; }
  });
  let vis = false;
  main.addEventListener('scroll', () => {
    const v = main.scrollTop > 800;
    if (v !== vis) { vis = v; btn.classList.toggle('show', v); }
  }, { passive: true });
}

M.buildPageTOC = buildPageTOC;
M.initBackToTop = initBackToTop;
})();
