/* ════════════════════════════════════════════════════════════
   Flashcards für Topic vocabulary – 3-Boxen-Leitner-System
   Box 1: jede Session · Box 2: jede zweite · Box 3: jede vierte
   ════════════════════════════════════════════════════════════ */
(function () {
'use strict';
const M = window.MWG;
const { $, $$, esc, store } = M;
const reduced = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const fState = { on: false, scope: 'all', queue: [], i: 0, flipped: false, known: 0, unknown: 0, missed: [] };

function boxes() { const b = store('mwg_flash'); return (b && typeof b === 'object') ? b : {}; }
function cardId(ti, w) { return ti + ':' + w; }

function mastered(ti, words) {
  const b = boxes();
  return words.filter(x => { const e = b[cardId(ti, x.w)]; return e && e.box >= 3; }).length;
}

function buildQueue(scope) {
  const meta = store('mwg_flash_meta') || {};
  const session = (typeof meta.session === 'number' ? meta.session : 0) + 1;
  store('mwg_flash_meta', { session });
  const b = boxes();
  const all = [];
  M.TOPIC_VOCAB.forEach((t, ti) => {
    if (scope !== 'all' && ti !== scope) return;
    t.words.forEach(x => all.push({ id: cardId(ti, x.w), w: x.w, hint: x.hint, topic: t.topic }));
  });
  let due = all.filter(c => {
    const e = b[c.id];
    const box = e ? e.box : 1;
    if (box <= 1) return true;
    if (box === 2) return session % 2 === 0;
    return session % 4 === 0;
  });
  if (!due.length) due = all; /* alles gelernt und heute nichts fällig → trotzdem üben */
  return M.shuffle(due);
}

function answer(knew) {
  const c = fState.queue[fState.i];
  if (!c) return;
  const b = boxes();
  const e = b[c.id] || { box: 1 };
  e.box = knew ? Math.min(3, (e.box || 1) + 1) : 1;
  e.last = new Date().toISOString().slice(0, 10);
  b[c.id] = e;
  store('mwg_flash', b);
  if (knew) fState.known++; else { fState.unknown++; fState.missed.push(c); }
  fState.i++;
  fState.flipped = false;
  if (fState.i >= fState.queue.length) {
    M.announce('Session finished. ' + fState.known + ' known, ' + fState.unknown + ' to review.');
    if (!store('mwg_flash_hint')) store('mwg_flash_hint', '1');
  }
  repaint();
}

function flip() { fState.flipped = !fState.flipped; repaint(); }
function exitCards() { fState.on = false; M.route(); }
function startCards(scope) {
  fState.on = true;
  fState.scope = scope;
  fState.queue = buildQueue(scope);
  fState.i = 0; fState.flipped = false; fState.known = 0; fState.unknown = 0; fState.missed = [];
  M.route();
}

function repaint() {
  const host = $('#fcHost');
  if (host) { host.innerHTML = cardsBody(); }
}

function cardsBody() {
  const total = fState.queue.length;
  if (fState.i >= total) {
    return '<div class="fc-end">' +
      '<div class="qscore">' + fState.known + '/' + total + '</div>' +
      '<p style="font-size:1rem;color:var(--text-secondary);margin-bottom:6px">' + fState.known + ' known · ' + fState.unknown + ' to review.</p>' +
      '<p style="font-size:.8125rem;color:var(--text-muted);margin-bottom:22px">Cards you knew move up a box and come back less often. Cards you missed return next session.</p>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap">' +
        '<button class="btn btn-primary" data-action="flash-again">Again <span>→</span></button>' +
        '<button class="btn btn-ghost" data-action="flash-exit">Back to the list</button>' +
      '</div>' +
    '</div>';
  }
  const c = fState.queue[fState.i];
  const b = boxes()[c.id];
  const showHint = !store('mwg_flash_hint');
  return '<div class="qmeta"><span>Card ' + (fState.i + 1) + ' of ' + total + '</span><span>' + esc(c.topic) + (b && b.box > 1 ? ' · box ' + b.box : '') + '</span></div>' +
    '<div class="qbar"><i style="width:' + (fState.i / total) * 100 + '%"></i></div>' +
    '<button class="fcard' + (fState.flipped ? ' flipped' : '') + '" data-action="flash-flip">' +
      '<span class="fc-inner">' +
        '<span class="fc-face fc-front"' + (fState.flipped ? ' aria-hidden="true"' : '') + '><span class="fc-word">' + esc(c.w) + '</span><span class="fc-tap">Tap or press Space to flip</span></span>' +
        '<span class="fc-face fc-back"' + (fState.flipped ? '' : ' aria-hidden="true"') + '><span class="fc-hint">' + esc(c.hint) + '</span><span class="fc-small">' + esc(c.w) + '</span></span>' +
      '</span>' +
    '</button>' +
    '<div class="fc-btns">' +
      '<button class="btn btn-ghost" data-action="flash-dont">✗ Didn&rsquo;t know <kbd>2</kbd></button>' +
      '<button class="btn btn-primary" data-action="flash-know">✓ Knew it <kbd>1</kbd></button>' +
    '</div>' +
    (showHint ? '<div class="fc-swipehint">On touch screens you can also swipe: right = knew it, left = didn&rsquo;t. <span aria-hidden="true">← ✗ · ✓ →</span></div>' : '') +
    '<button class="tc-skip" data-action="flash-exit" style="margin-top:18px">Exit flashcards (Esc)</button>';
}

function cardsPage() {
  const label = fState.scope === 'all' ? 'All topics shuffled' : M.TOPIC_VOCAB[fState.scope].topic;
  return '<div class="page">' +
    M.pageHead('Tool · Flashcards', esc(label), 'Flip the card, be honest with yourself, and the box system does the spaced repetition for you.') +
    '<div class="wrap" style="max-width:720px"><div class="gap-s"></div><div id="fcHost">' + cardsBody() + '</div><div style="height:72px"></div></div>' +
  '</div>';
}

function wireCards() {
  /* Swipe */
  const card = $('.fcard');
  if (!card) return;
  let sx = null, sy = null;
  card.addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
  card.addEventListener('touchend', e => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    sx = null;
    if (Math.abs(dx) > 60 && Math.abs(dy) < 50) { if (dx > 0) answer(true); else answer(false); }
  }, { passive: true });
}

document.addEventListener('keydown', e => {
  if (!fState.on) return;
  const so = document.getElementById('searchOverlay');
  if (so && so.style.display === 'flex') return;
  if (e.key === ' ') { e.preventDefault(); if (fState.i < fState.queue.length) flip(); }
  else if (e.key === '1') { if (fState.i < fState.queue.length) answer(true); }
  else if (e.key === '2') { if (fState.i < fState.queue.length) answer(false); }
  else if (e.key === 'Escape') exitCards();
});

M.flashAction = function (act, ds) {
  if (act === 'flash-start') startCards(ds.topic === 'all' ? 'all' : +ds.topic);
  else if (act === 'flash-flip') flip();
  else if (act === 'flash-know') answer(true);
  else if (act === 'flash-dont') answer(false);
  else if (act === 'flash-exit') exitCards();
  else if (act === 'flash-again') startCards(fState.scope);
};
M.flashMastered = mastered;
M.flashWireCards = wireCards;

/* topicvocab-Seite umhüllen: im Karten-Modus ersetzt der Flashcard-Screen die Liste */
const orig = Object.assign({}, PAGES.topicvocab);
PAGES.topicvocab.render = function () { return fState.on ? cardsPage() : orig.render(); };
PAGES.topicvocab.wire = function () { if (fState.on) wireCards(); else if (orig.wire) orig.wire(); };
window.addEventListener('hashchange', () => { if (fState.on && location.hash !== '#topicvocab') fState.on = false; });
})();
