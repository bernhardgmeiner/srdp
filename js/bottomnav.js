/* ════════════════════════════════════════════════════════════
   Bottom bar on phones (Theme H)
   Four fixed targets: Home, Text types (opens a small sheet with all text
   types of the chosen school), Practise, Phrases. The bar itself is static
   markup in index.html (#bottomNav); this file marks the active entry and
   runs the sheet. Everything else stays in the menu.
   ════════════════════════════════════════════════════════════ */
(function () {
'use strict';
var bar = document.getElementById('bottomNav');
if (!bar) return;
var sheet = null;
var typesBtn = bar.querySelector('[data-bn="types"]');
var PHRASE_PAGES = { phrasebank: 1, topicvocab: 1 };

/* Which entry does the current page belong to? Read it from the side menu,
   so the bar never needs its own list of pages. The headings of the menu
   groups are matched by their text (see NAV in core.js). */
function groupOfActive() {
  var a = document.querySelector('#sidenav .nav-item.active');
  if (!a) return '';
  var id = a.getAttribute('data-nav');
  if (id === 'home') return 'home';
  if (PHRASE_PAGES[id]) return 'phrases';
  var el = a.previousElementSibling;
  while (el && !el.classList.contains('nav-divider')) el = el.previousElementSibling;
  var g = el ? (el.textContent || '').trim().toLowerCase() : '';
  if (g === 'text types') return 'types';
  if (g === 'practise' || g === 'plan') return 'practise';
  return '';
}
/* The page we are on, as a hash: prerendered pages are opened as /essay/ without one. */
function here() {
  if (location.hash) return location.hash;
  var m = location.pathname.match(/^\/([a-z]+)\/?$/);
  return '#' + (m && window.PAGES && window.PAGES[m[1]] ? m[1] : 'home');
}
function paint() {
  var g = groupOfActive();
  var items = bar.querySelectorAll('[data-bn]');
  for (var i = 0; i < items.length; i++) {
    var it = items[i];
    var on = it.getAttribute('data-bn') === g;
    it.classList.toggle('on', on);
    /* "page" only when the entry really is this page, otherwise "true" */
    if (on) it.setAttribute('aria-current', it.tagName === 'A' && it.getAttribute('href') === here() ? 'page' : 'true');
    else it.removeAttribute('aria-current');
  }
}

function typeLinks() {
  var out = [];
  var el = null;
  var divs = document.querySelectorAll('#sidenav .nav-divider');
  for (var i = 0; i < divs.length; i++) { if ((divs[i].textContent || '').trim().toLowerCase() === 'text types') { el = divs[i].nextElementSibling; break; } }
  while (el && el.classList.contains('nav-item')) { out.push(el); el = el.nextElementSibling; }
  return out;
}
function closeSheet(refocus) {
  if (!sheet) return;
  sheet.remove(); sheet = null;
  typesBtn.setAttribute('aria-expanded', 'false');
  typesBtn.removeAttribute('aria-controls');
  if (refocus) { try { typesBtn.focus(); } catch (e) {} }
}
function openSheet() {
  var links = typeLinks();
  if (!links.length) { location.hash = '#home'; return; }
  sheet = document.createElement('div');
  sheet.className = 'bn-sheet no-print';
  sheet.id = 'bnSheet';
  sheet.setAttribute('role', 'group');
  sheet.setAttribute('aria-label', 'Text types');
  var h = '<div class="bn-sheet-h" aria-hidden="true">Text types</div><div class="bn-sheet-list">';
  for (var i = 0; i < links.length; i++) {
    var a = links[i];
    var dot = a.querySelector('.nav-dot');
    var lab = a.querySelector('span:not(.nav-dot):not(.nav-check)');
    var on = a.classList.contains('active');
    h += '<a href="' + a.getAttribute('href') + '" class="bn-type' + (on ? ' on' : '') + '"' + (on ? ' aria-current="page"' : '') + '>' +
      '<span class="nav-dot" aria-hidden="true" style="background:' + (dot ? dot.style.background : 'transparent') + '"></span>' +
      '<span>' + (lab ? lab.innerHTML : '') + '</span></a>';
  }
  h += '</div>';
  sheet.innerHTML = h;
  /* right after the button, so Tab moves from the button into the sheet and on to the next entry */
  typesBtn.insertAdjacentElement('afterend', sheet);
  typesBtn.setAttribute('aria-expanded', 'true');
  typesBtn.setAttribute('aria-controls', 'bnSheet');
  var first = sheet.querySelector('a'); if (first) { try { first.focus(); } catch (e) {} }
}

typesBtn.addEventListener('click', function () { if (sheet) closeSheet(false); else openSheet(); });

/* Keyboard: when focus leaves the button and the sheet, the sheet closes.
   Pointer taps are left to the click handler below, otherwise the sheet would be
   gone before the click arrives and the tap would hit what lies underneath. */
var byPointer = false;
document.addEventListener('pointerdown', function () { byPointer = !!sheet; }, true);
bar.addEventListener('focusout', function (e) {
  if (!sheet || byPointer) return;
  var to = e.relatedTarget;
  if (to && to !== typesBtn && !sheet.contains(to)) closeSheet(false);
});

/* A tap outside the open sheet only closes it; it must not also trigger what lies underneath. */
document.addEventListener('click', function (e) {
  if (!sheet || !e.target.closest) return;
  byPointer = false;
  var link = e.target.closest('#bnSheet a');
  if (link) { var same = link.getAttribute('href') === here(); setTimeout(function () { closeSheet(same); }, 0); return; }
  if (e.target.closest('#bnSheet') || e.target.closest('[data-bn="types"]')) return;
  /* Menu and Search in the top bar and the other bar entries stay live; anything else is swallowed. */
  if (!e.target.closest('#bottomNav') && !e.target.closest('.mobile-bar')) { e.preventDefault(); e.stopPropagation(); }
  closeSheet(false);
}, true);
document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && sheet) closeSheet(true); });

/* Tapping the entry of the page you are on scrolls back to the top. */
bar.addEventListener('click', function (e) {
  var a = e.target.closest ? e.target.closest('a[data-bn]') : null;
  if (a && a.getAttribute('href') === here()) {
    e.preventDefault();
    window.scrollTo(0, 0);
    var m = document.getElementById('main'); if (m) m.scrollTop = 0;
  }
});

window.addEventListener('hashchange', function () { closeSheet(false); setTimeout(paint, 0); });
if (window.matchMedia) {
  var wide = window.matchMedia('(min-width:841px)');
  var onWide = function (e) { if (e.matches) closeSheet(false); };
  if (wide.addEventListener) wide.addEventListener('change', onWide); else if (wide.addListener) wide.addListener(onWide);
}

if ('MutationObserver' in window) {
  var nav = document.getElementById('sidenav');
  if (nav) new MutationObserver(paint).observe(nav, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  /* dialogs make #app inert; the bar sits outside #app and follows it */
  var app = document.getElementById('app');
  if (app) {
    var syncInert = function () {
      if (app.hasAttribute('inert')) { closeSheet(false); bar.setAttribute('inert', ''); } else bar.removeAttribute('inert');
    };
    new MutationObserver(syncInert).observe(app, { attributes: true, attributeFilter: ['inert'] });
    syncInert();
  }
}
paint();
})();
