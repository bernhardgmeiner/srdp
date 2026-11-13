/* ════════════════════════════════════════════════════════════
   PWA – "Install as app"
   Zeigt alle Elemente mit [data-install] nur dann, wenn die Seite installierbar ist:
   - Chrome/Edge/Samsung (Android, Desktop): ueber das Ereignis beforeinstallprompt
   - iPhone/iPad: kein Ereignis, daher eine kurze Anleitung (Teilen → Zum Home-Bildschirm)
   Laeuft die Seite schon als App (standalone), bleibt alles verborgen.
   ════════════════════════════════════════════════════════════ */
(function () {
'use strict';
var deferred = null;      /* gespeichertes beforeinstallprompt-Ereignis */
var installed = false;
var HIDE_KEY = 'mwg_install_hide';
var ua = navigator.userAgent || '';
var isIOS = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

function standalone() {
  try { if (window.matchMedia('(display-mode: standalone)').matches) return true; } catch (e) {}
  return navigator.standalone === true;
}
function rowHidden() { try { return localStorage.getItem(HIDE_KEY) !== null; } catch (e) { return false; } }
function available() { return !installed && !standalone() && (!!deferred || isIOS); }

function sync() {
  var on = available();
  var els = document.querySelectorAll('[data-install]');
  for (var i = 0; i < els.length; i++) {
    var el = els[i];
    el.hidden = !(on && !(el.hasAttribute('data-install-row') && rowHidden()));
  }
}

function say(msg) {
  var t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg; t.classList.add('show');
  setTimeout(function () { t.classList.remove('show'); }, 4000);
}

var opener = null;
function closeHelp() {
  var d = document.getElementById('installHelp');
  if (d) d.remove();
  var app = document.getElementById('app');
  if (app) app.removeAttribute('inert');
  if (opener && document.contains(opener)) { try { opener.focus(); } catch (e) {} }
  opener = null;
}
function showIosHelp(from) {
  if (document.getElementById('installHelp')) return;
  opener = from || null;
  var d = document.createElement('div');
  d.id = 'installHelp';
  d.className = 'install-help no-print';
  d.innerHTML =
    '<div class="ih-box" role="dialog" aria-modal="true" aria-labelledby="ihTitle">' +
      '<h2 class="ih-title" id="ihTitle">Add this guide to your home screen</h2>' +
      '<ol class="ih-steps">' +
        '<li>Tap the <strong>Share</strong> button <span class="ih-ic" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"><path d="M12 15V3M8 7l4-4 4 4M6 11H5v10h14V11h-1"/></svg></span> in the browser bar.</li>' +
        '<li>Scroll down and tap <strong>Add to Home Screen</strong>.</li>' +
        '<li>Tap <strong>Add</strong>.</li>' +
      '</ol>' +
      '<p class="ih-note">The guide then opens like an app and works offline. If you cannot find the option, open this page in Safari.</p>' +
      '<button class="btn btn-primary" data-action="install-help-close">Got it</button>' +
    '</div>';
  document.body.appendChild(d);
  var app = document.getElementById('app');
  if (app) app.setAttribute('inert', '');
  var b = d.querySelector('button'); if (b) { try { b.focus(); } catch (e) {} }
}

window.addEventListener('beforeinstallprompt', function (e) {
  e.preventDefault();   /* kein Browser-Banner; die Seite zeigt ihren eigenen Knopf */
  deferred = e;
  sync();
});
window.addEventListener('appinstalled', function () {
  deferred = null; installed = true;
  sync();
  say('Installed. You will find the guide on your home screen.');
});

document.addEventListener('click', function (e) {
  var help = document.getElementById('installHelp');
  if (help && e.target === help) { closeHelp(); return; }
  var el = e.target.closest ? e.target.closest('[data-action]') : null;
  if (!el) return;
  var act = el.getAttribute('data-action');
  if (act === 'install-app') {
    if (deferred) {
      var ev = deferred;
      deferred = null;   /* ein Ereignis darf nur einmal prompt() aufrufen */
      ev.prompt();
      if (ev.userChoice && ev.userChoice.then) ev.userChoice.then(sync, sync); else sync();
    } else if (isIOS) {
      showIosHelp(el);
    }
  } else if (act === 'install-hide') {
    try { localStorage.setItem(HIDE_KEY, '1'); } catch (err) {}
    sync();
  } else if (act === 'install-help-close') {
    closeHelp();
  }
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && document.getElementById('installHelp')) closeHelp();
});

/* Menue und Seiteninhalt werden per innerHTML neu gebaut: danach erneut abgleichen. */
function watch() {
  if (!('MutationObserver' in window)) return;
  var mo = new MutationObserver(sync);
  ['sidenav', 'main'].forEach(function (id) {
    var n = document.getElementById(id);
    if (n) mo.observe(n, { childList: true });
  });
}
watch();
sync();
window.addEventListener('load', sync);
})();

/* ════════════════════════════════════════════════════════════
   PWA – Service-Worker-Registrierung + Update-Toast
   ════════════════════════════════════════════════════════════ */
(function () {
'use strict';
if (!('serviceWorker' in navigator)) return;
if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') return;

let reloading = false; /* controllerchange darf genau einmal reloaden, und nur nach Klick */
let userAskedReload = false;

function showUpdateToast(worker) {
  if (document.getElementById('swToast')) return;
  const t = document.createElement('div');
  t.id = 'swToast';
  t.className = 'sw-toast no-print';
  t.setAttribute('role', 'status');
  t.innerHTML =
    '<span>A new version of this guide is ready.</span>' +
    '<button class="btn btn-primary btn-sm" id="swReload">Reload</button>' +
    '<button class="sw-toast-x" id="swDismiss" aria-label="Dismiss">✕</button>';
  document.body.appendChild(t);
  document.getElementById('swReload').addEventListener('click', () => {
    userAskedReload = true;
    worker.postMessage({ type: 'SKIP_WAITING' });
  });
  document.getElementById('swDismiss').addEventListener('click', () => t.remove());
}

window.addEventListener('load', () => {
  navigator.serviceWorker.register('/sw.js').then(reg => {
    /* Bereits wartender Worker (Seite war offen, Update kam früher) */
    if (reg.waiting && navigator.serviceWorker.controller) showUpdateToast(reg.waiting);
    reg.addEventListener('updatefound', () => {
      const nw = reg.installing;
      if (!nw) return;
      nw.addEventListener('statechange', () => {
        if (nw.state === 'installed' && navigator.serviceWorker.controller) showUpdateToast(nw);
      });
    });
  }).catch(() => { /* Registrierung fehlgeschlagen – Seite läuft normal weiter */ });

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (reloading || !userAskedReload) return;
    reloading = true;
    location.reload();
  });
});
})();
