/* Service Worker — matura.bernhardgmeiner.com
   VERSION wird von _dev/bump-sw.mjs vor jedem Deploy auf einen Zeitstempel gesetzt. */
const VERSION = '20260713140000';
const CACHE = 'mwg-' + VERSION;

/* @assets:start (von bump-sw.mjs generiert) */
const ASSETS = [
  '/',
  'index.html',
  'css/main.css',
  'manifest.json',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/maskable-192.png',
  'icons/maskable-512.png',
  'js/boot.js',
  'js/core.js',
  'js/data-content.js',
  'js/data-practice.js',
  'js/data-texttypes.js',
  'js/flashcards.js',
  'js/pages-extra.js',
  'js/pages-main.js',
  'js/pages-practice.js',
  'js/pages-rating.js',
  'js/pages-timer.js',
  'js/pages-tools.js',
  'js/pwa.js',
  'js/search.js',
  'js/selfrating.js',
  'js/studyplan.js',
  'js/toc.js',
  'fonts/ibm-plex-mono-latin-400-normal.woff2',
  'fonts/ibm-plex-mono-latin-500-normal.woff2',
  'fonts/ibm-plex-sans-latin-300-normal.woff2',
  'fonts/ibm-plex-sans-latin-400-italic.woff2',
  'fonts/ibm-plex-sans-latin-400-normal.woff2',
  'fonts/ibm-plex-sans-latin-500-normal.woff2',
  'fonts/ibm-plex-sans-latin-600-normal.woff2',
  'article/',
  'blog/',
  'checklist/',
  'email/',
  'essay/',
  'examiner/',
  'faq/',
  'grammar/',
  'leaflet/',
  'notebooklm/',
  'overview/',
  'paragraphs/',
  'parents/',
  'phrasebank/',
  'practice/',
  'report/',
  'selfcheck/',
  'studyplan/',
  'taskbank/',
  'teachers/',
  'timer/',
  'topicvocab/',
  'pdf/article.pdf',
  'pdf/blog.pdf',
  'pdf/checklist.pdf',
  'pdf/email.pdf',
  'pdf/essay.pdf',
  'pdf/leaflet.pdf',
  'pdf/overview.pdf',
  'pdf/phrase-bank.pdf',
  'pdf/report.pdf',
  'pdf/topic-vocabulary.pdf',
  'og-image.png'
];
/* @assets:end */

/* Install: fehlertolerant precachen.
   cache.addAll() ist atomar — eine einzige fehlende Datei (404) laesst die gesamte
   Installation scheitern, der SW aktiviert nie mehr und niemand bekommt Updates.
   Deshalb jedes Asset einzeln, Fehler werden geloggt statt den Install abzubrechen. */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c =>
      Promise.allSettled(ASSETS.map(a => c.add(a).catch(err => {
        console.warn('[sw] Precache fehlgeschlagen:', a, err && err.message);
        throw err;
      })))
    ).then(results => {
      const failed = results.filter(r => r.status === 'rejected').length;
      if (failed) console.warn('[sw] ' + failed + ' von ' + ASSETS.length + ' Assets nicht gecacht. SW installiert trotzdem.');
    })
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k.startsWith('mwg-') && k !== CACHE).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  /* Navigation + index.html: network-first (Updates kommen an, offline aus dem Cache).
     Gilt auch für prerenderte Pfade wie /essay/ (WP12). */
  if (req.mode === 'navigate' || url.pathname === '/' || url.pathname.endsWith('/index.html')) {
    e.respondWith(
      fetch(req).then(res => {
        if (res.ok && res.type === 'basic') { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      }).catch(() =>
        caches.match(req).then(hit => hit || caches.match('index.html'))
      )
    );
    return;
  }

  /* PDFs: cache-first (stehen im Precache; fehlt eine, wird sie hier nachgeladen) */
  if (url.pathname.includes('/pdf/')) {
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      }))
    );
    return;
  }

  /* Rest (js/css/fonts/icons): cache-first mit Netz-Fallback */
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }))
  );
});
