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
