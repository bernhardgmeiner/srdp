/* ════════════════════════════════════════════════════════════
   Grade like an examiner: worked examples with band-by-band ratings
   ------------------------------------------------------------------
   All model texts and all commentary on this page were WRITTEN FOR
   THIS SITE as realistic B2-style examples. They are not real
   candidates' work and are not copied from any publication. The four
   criteria and the 0–10 logic follow the official SRDP B2 scale that
   the rest of the guide already builds on.
   ════════════════════════════════════════════════════════════ */
(function () {
'use strict';
const M = window.MWG;
const { $$, esc, sectionLabel, pageHead } = M;

const BANDS = [0, 2, 4, 6, 8, 10];
const CRIT = [
  { id: 'TA', name: 'Task Achievement' },
  { id: 'CC', name: 'Coherence and Cohesion' },
  { id: 'LR', name: 'Lexical and Structural Range' },
  { id: 'LA', name: 'Lexical and Structural Accuracy' },
];

/* B1 / B2 / C1 in one line each (own wording) */
const LEVELS = SRDP.ratingLevels;

/* "Appropriate" (Coherence) vs "correct" (Accuracy): own examples */
const APPROP = SRDP.ratingApprop;

/* ─── the worked examples ─────────────────────────────────────
   type must match a text-type id (drives colour + school filter).  */
const EXAMPLES = SRDP.ratingExamples;

/* ─── helpers ────────────────────────────────────────────────── */
function wordCount(ex) {
  return ex.text.filter(p => !p.mono).map(p => p.t).join(' ').trim().split(/\s+/).filter(Boolean).length;
}
function typeMeta(id) { return ((window.SRDP && SRDP.textTypes) || []).find(t => t.id === id) || {}; }
function typeLabel(ex) { const tt = typeMeta(ex.type); return (tt.name || ex.type).replace(/^The\s+/i, ''); }
function findExample(id) { return EXAMPLES.find(e => e.id === id); }

function compareMsg(guess, awarded) {
  const d = guess - awarded;
  const between = BANDS.indexOf(awarded) === -1;
  if (d === 0) return 'Exactly right. Our band is also ' + awarded + '/10.';
  if (between && Math.abs(d) === 1) return 'As close as the buttons allow. Our band is ' + awarded + '/10, an odd-numbered band for a text between two descriptions.';
  if (Math.abs(d) <= 2) return d > 0
    ? 'Close. Our band is ' + awarded + '/10, a little lower than yours.'
    : 'Close. Our band is ' + awarded + '/10, a little higher than yours.';
  return d > 0
    ? 'Your band was higher than ours. We gave ' + awarded + '/10 because we saw more problems here. The reasons are below.'
    : 'Your band was lower than ours. We gave ' + awarded + '/10 because the text does better here than your band shows. The reasons are below.';
}

function modelTextBox(ex) {
  return '<div class="ex-model">' +
    ex.text.map(function (p, i) {
      const head = i === 0 && !p.mono;
      return '<p class="ex-p' + (p.mono ? ' mono' : '') + (head ? ' ex-title' : '') + '">' + esc(p.t).replace(/\n/g, '<br>') + '</p>';
    }).join('') +
    '</div>' +
    '<div class="ex-meta">≈ ' + wordCount(ex) + ' words · ' + esc(ex.register) + ' register · target ' + ex.target + ' words</div>';
}

/* the verdict is built on demand and inserted into an (initially empty)
   aria-live region, so screen readers announce it reliably */
function verdictHTML(ex, critId, guess) {
  const r = ex.ratings[critId];
  const isTA = critId === 'TA';
  return '<div class="ex-vband">Our band: <b>' + r.band + '</b>/10' +
      (isTA && ex.taBeforePenalty ? ' <span class="ex-pen">(' + ex.taBeforePenalty + ' before the word-count penalty)</span>' : '') + '</div>' +
    '<div class="ex-compare">' + esc(compareMsg(guess, r.band)) + '</div>' +
    '<ul class="ex-reasons">' + r.points.map(p => '<li>' + esc(p) + '</li>').join('') + '</ul>' +
    (isTA && ex.wordNote ? '<div class="ex-wordnote">' + esc(ex.wordNote) + '</div>' : '');
}

function critBlock(ex, c) {
  const r = ex.ratings[c.id];
  return '<div class="ex-crit" data-awarded="' + r.band + '" data-crit="' + c.id + '" data-ex="' + ex.id + '">' +
    '<div class="ex-crit-top"><span class="ex-crit-name">' + c.name + '</span>' +
      '<span class="ex-crit-ask">Which band would you give?</span></div>' +
    '<div class="ex-seg" role="group" aria-label="Your band for ' + esc(c.name) + '">' +
      BANDS.map(function (b) { return '<button class="rate-btn" type="button" aria-pressed="false" aria-label="Band ' + b + '" data-action="ex-guess" data-band="' + b + '">' + b + '</button>'; }).join('') +
    '</div>' +
    '<div class="ex-hint" data-hint>Choose a band to see our rating.</div>' +
    '<div class="ex-verdict" aria-live="polite"></div>' +
  '</div>';
}

function exampleCard(ex, idx, n) {
  const tt = typeMeta(ex.type);
  const col = M.TYPE_COLORS[tt.color] || 'var(--primary)';
  return '<div class="ex-card" id="ex-' + ex.id + '" style="--exc:' + col + '">' +
    '<h3 class="ex-h"><span class="ex-dot" aria-hidden="true"></span>Example ' + (idx + 1) + ' of ' + n + ': ' + esc(typeLabel(ex)) + '</h3>' +
    '<div class="ex-tag">' + esc(ex.taskLine) + '</div>' +
    '<div class="ex-task"><div class="ex-task-h">The task</div><p>' + esc(ex.prompt) + '</p></div>' +
    '<div class="acc"><div class="acc-item open"><button class="acc-head" data-action="acc" aria-expanded="true"><span class="pm">+</span><span>What the examiner expects before reading</span></button>' +
      '<div class="acc-body"><ul class="ex-horizon">' + ex.horizon.map(h => '<li>' + esc(h) + '</li>').join('') + '</ul></div></div></div>' +
    modelTextBox(ex) +
    '<div class="ex-crits">' + CRIT.map(c => critBlock(ex, c)).join('') + '</div>' +
    '<div class="acc ex-holi"><div class="acc-item"><button class="acc-head" data-action="acc" aria-expanded="false"><span class="pm">+</span><span>Our overall comment</span><span class="sub">open after you grade</span></button>' +
      '<div class="acc-body"><p class="ex-holi-p">' + esc(ex.holistic) + '</p>' +
        scoreboard(ex) + '</div></div></div>' +
  '</div>';
}

function scoreboard(ex) {
  return '<div class="ex-sb">' +
    '<div class="ex-sb-h">How close were you?</div>' +
    CRIT.map(function (c) {
      return '<div class="ex-sb-row" data-brk="' + c.id + '">' +
        '<span class="lab">' + c.name + '</span>' +
        '<span class="you" data-you>?</span>' +
        '<span class="mid">vs ours</span>' +
        '<span class="pan" data-pan>?</span>' +
        '<span class="gap" data-gap></span></div>';
    }).join('') +
    '<div class="ex-sb-tot" data-tot>Grade all four criteria above to compare your total with ours.</div>' +
    '<div class="ex-sb-sum" data-sum></div>' +
  '</div>';
}
function updateScoreboard(card) {
  const crits = $$('.ex-crit', card);
  let graded = 0, yourSum = 0, ourSum = 0, exact = 0, near = 0;
  crits.forEach(function (cr) {
    const ours = +cr.dataset.awarded;
    ourSum += ours;
    const row = card.querySelector('.ex-sb-row[data-brk="' + cr.dataset.crit + '"]');
    if (!row) return;
    const sel = cr.querySelector('.rate-btn.sel');
    if (!sel) return;
    const g = +sel.dataset.band, diff = g - ours;
    graded++; yourSum += g;
    if (diff === 0) exact++;
    if (Math.abs(diff) <= 1) near++;
    row.querySelector('[data-you]').textContent = g;
    row.querySelector('[data-pan]').textContent = ours;
    const gap = row.querySelector('[data-gap]');
    gap.textContent = diff === 0 ? 'same band' : (diff > 0 ? '+' + diff + ' too high' : diff + ' too low');
    gap.className = 'gap ' + (diff === 0 ? 'g-ok' : Math.abs(diff) <= 1 ? 'g-near' : 'g-far');
    row.classList.add('done');
  });
  const totEl = card.querySelector('[data-tot]'), sumEl = card.querySelector('[data-sum]');
  if (graded < 4) {
    if (totEl) totEl.textContent = 'Graded ' + graded + ' of 4. Grade all four to compare your total with ours.';
    if (sumEl) sumEl.textContent = '';
  } else {
    if (totEl) totEl.innerHTML = 'Your total: <b>' + yourSum + '</b> · Our total: <b>' + ourSum + '</b> (out of 40)';
    if (sumEl) sumEl.textContent = 'You chose exactly our band in ' + exact + ' of 4 criteria and were within one band in ' + near + ' of 4.';
  }
}

/* ─── the interaction (self-wired; no global dispatch needed) ─── */
function onGuess(btn) {
  const seg = btn.closest('.ex-seg');
  const crit = btn.closest('.ex-crit');
  if (!seg || !crit) return;
  const ex = findExample(crit.dataset.ex);
  if (!ex) return;
  const guess = +btn.dataset.band;
  $$('.rate-btn', seg).forEach(function (x) {
    const on = x === btn;
    x.classList.toggle('sel', on);
    x.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
  const hint = crit.querySelector('[data-hint]');
  if (hint) hint.hidden = true;
  const v = crit.querySelector('.ex-verdict');
  if (v) v.innerHTML = verdictHTML(ex, crit.dataset.crit, guess);
  const card = btn.closest('.ex-card');
  if (card) updateScoreboard(card);
}

/* ─── the page ───────────────────────────────────────────────── */
const page = {
  title: 'Grade like an examiner',
  track: 'examiner',
  render: function () {
    const allowed = M.typesForSchool().map(t => t.id);
    const exs = EXAMPLES.filter(e => allowed.indexOf(e.type) >= 0);

    const process =
      '<div class="ex-process"><ol>' +
        '<li><b>First, the examiner thinks about the task.</b> Before reading your text, the examiner thinks about what a good B2 answer to <em>this</em> task needs: its purpose, its reader, the three content points and the conventions of the text type. Your text is compared with this picture.</li>' +
        '<li><b>One criterion at a time.</b> Each of the four criteria gets its own judgement, often in a separate reading. The same text can get 8 for Range and 6 for Accuracy. That is normal.</li>' +
        '<li><b>Task Achievement comes first.</b> If a text does not address the task as a whole, the whole text gets 0 and the other three criteria are not marked.</li>' +
        '<li><b>Examiners choose a band by judgement.</b> They do not calculate an average. Some descriptors count more than others: in Task Achievement, developing the content points matters more than the title. The examiner looks at what matters most and then chooses the band.</li>' +
        '<li><b>Length is part of Task Achievement.</b> If your text is more than 10% over or under the target, Task Achievement drops one band.</li>' +
      '</ol></div>';

    const levels =
      '<div class="tbl-wrap" tabindex="0" role="group" aria-label="B1, B2 and C1 compared (scroll sideways on small screens)"><table class="tbl"><thead><tr><th scope="col">Level</th><th scope="col">What a text at this level is like</th></tr></thead><tbody>' +
        LEVELS.map(l => '<tr><td class="ex-lvl"><b>' + l.lvl + '</b> <span class="ex-lvl-tag">' + esc(l.tag) + '</span></td><td>' + esc(l.desc) + '</td></tr>').join('') +
      '</tbody></table></div>' +
      '<p class="ex-note">This site aims at the middle row, B2. The C1 row shows that a B2 text does not have to be perfect. The B1 row shows what a text looks like when it is not quite B2 yet.</p>';

    const approp =
      '<p class="ex-lead">Two criteria can look at the same word. <strong>Coherence and Cohesion</strong> asks whether a linking word <em>fits</em> in this place. <strong>Accuracy</strong> asks whether it is <em>correct English</em>. A word can do well in one and badly in the other. Then it counts under both: once as a plus, once as a minus.</p>' +
      '<div class="ex-approp">' +
        APPROP.map(a => '<div class="row"><div class="q">“' + esc(a.s) + '”</div>' +
          '<div class="v ok"><span aria-hidden="true">✓ </span>Coherence and Cohesion: ' + esc(a.ok) + '</div>' +
          '<div class="v no"><span aria-hidden="true">✗ </span>Accuracy: ' + esc(a.no) + '</div></div>').join('') +
      '</div>' +
      '<p class="ex-note">So use linking words, because they help your Coherence and Cohesion band. When you proofread, check that each one is correct, because Accuracy counts them too.</p>';

    return pageHead(
      'Learn',
      'Grade like an examiner',
      'Here you see the four criteria used on realistic texts. Grade each text yourself first, then compare with our rating.'
    ) +
    '<div class="wrap" id="exRoot">' +
      '<div class="gap-s"></div>' +
      '<p class="ex-lead ex-intro">In the real Matura, the examiners are your own teachers. They use the same four criteria that you see on this page.</p>' +
      sectionLabel('How an examiner reads your text', { id: 'process', label: 'How an examiner reads' }) +
      process +
      '<div class="gap"></div>' +
      sectionLabel('B1, B2, C1 at a glance', { id: 'levels', label: 'B1 / B2 / C1' }) +
      '<p class="ex-lead">The exam checks whether your writing is at B2. It helps to know the levels just below and just above it.</p>' +
      levels +
      '<div class="gap"></div>' +
      sectionLabel('“Right” and “correct” are different things', { id: 'appropriate', label: 'Right vs correct' }) +
      approp +
      '<div class="gap"></div>' +
      sectionLabel('Now grade these yourself', { id: 'examples', label: 'Grade these yourself' }) +
      '<p class="ex-lead">Each text below is written at about B2, with the kind of strengths and mistakes real exam texts have. For each criterion, choose a band first. Then you see our band and the reasons. Where your band is different from ours, read the reasons.</p>' +
      '<p class="ex-note">The buttons show the six bands that have a description (0, 2, 4, 6, 8, 10). Examiners also use the odd-numbered bands (1, 3, 5, 7, 9) for a text between two descriptions, so a few of our bands are odd numbers that the buttons do not show.</p>' +
      '<p class="ex-small">These texts were written for this site as realistic examples. They are not real candidates’ work.</p>' +
      '<nav class="ex-jump no-print" aria-label="Jump to an example">' + exs.map(function (ex, i) { return '<button class="ex-chip" type="button" data-scroll-to="ex-' + ex.id + '">' + (i + 1) + ' · ' + esc(typeLabel(ex)) + '</button>'; }).join('') + '</nav>' +
      exs.map(function (ex, i) { return exampleCard(ex, i, exs.length); }).join('') +
      '<div class="ex-end"></div>' +
    '</div>';
  },
  wire: function () {
    const root = document.getElementById('exRoot');
    if (!root) return;
    /* buttons are native: click, Enter and Space all fire this */
    root.addEventListener('click', function (e) {
      const b = e.target.closest('[data-action="ex-guess"]');
      if (b) onGuess(b);
    });
  },
};

window.PAGES = window.PAGES || {};
window.PAGES.examiner = page;
})();
