/* ════════════════════════════════════════════════════════════
   Self-check studio: SRDP-Selbst-Rating (Beurteilungsraster B2)
   Deskriptoren abgeleitet vom offiziellen Raster des BMB (Stand 2023):
   11 Stufen 0–10, beschrieben sind 0/2/4/6/8/10, Stufe 6 = B2-Minimum.
   ════════════════════════════════════════════════════════════ */
(function () {
'use strict';
const M = window.MWG;
const { $, $$, esc } = M;

const CRITERIA = [
  { id: 'TA', name: 'Task Achievement', note: 'Off the word count by more than ±10%? Then rate one band lower here – that is the official rule.', bands: {
    10: 'I did exactly what the task asked: all three bullet points fully developed with relevant, well-chosen details, the text type fits, and my opening and ending do their job.',
    8: 'All three bullet points are developed with relevant details; small gaps in balance, or my title/opening/closing could be sharper.',
    6: 'All points are developed but with only a limited number of supporting details – or one point is thin while the other two carry it. Conventions mostly respected.',
    4: 'I mentioned the content points but did not really develop them; details or required elements (title, greeting, closing) are missing.',
    2: 'Only parts of the task are recognisable; most content points are barely touched.',
    0: 'My text does not answer this task at all (off topic or clearly prepared in advance – the veto case).',
  }},
  { id: 'CC', name: 'Coherence and Cohesion', note: '', bands: {
    10: 'My text reads as one clear line of thought from start to finish; paragraphs connect to each other and I use a variety of linking devices naturally.',
    8: 'Clear overall structure and logical order; varied linking words with maybe a bump or two in the flow.',
    6: 'Generally well organised in clear, logical paragraphs; I use a limited set of common linking devices, and they fit.',
    4: 'Mostly short, simple sentences strung together; paragraph breaks unclear or random.',
    2: 'A reader has to work hard to follow my text; little visible organisation.',
    0: 'No recognisable structure.',
  }},
  { id: 'LR', name: 'Lexical and Structural Range', note: '', bands: {
    10: 'I said everything I wanted to say without having to simplify: varied topic vocabulary, several complex structures, register right throughout.',
    8: 'Good variety in vocabulary and structures; occasional repetition; register right almost everywhere.',
    6: 'Enough vocabulary and structures for the task, including some complex sentence forms; some repetition and safe word choices (thing, good, nice).',
    4: 'I repeat the same words, lift words and phrases from the task sheet, or stay in simple structures the whole time.',
    2: 'Very limited language; I often could not express what I actually meant.',
    0: 'Too little own language to assess.',
  }},
  { id: 'LA', name: 'Lexical and Structural Accuracy', note: '', bands: {
    10: 'Only occasional slips; nothing disturbs the reading.',
    8: 'Mistakes exist but are rare and never cause misunderstanding; the complex forms I attempt mostly work.',
    6: 'A relatively high degree of control: errors happen, especially in complex sentences, but communication always works; spelling reasonably accurate.',
    4: 'I am only safe in simple, frequent structures; errors pile up as soon as I try more.',
    2: 'Errors make parts of the text hard to understand.',
    0: 'Errors make most of the text hard to understand.',
  }},
];
const BAND_ORDER = [0, 2, 4, 6, 8, 10];

let rating = { TA: null, CC: null, LR: null, LA: null }; /* nur pro Sitzung, bewusst kein localStorage */

/* Seit der Raster-Revision 2023 heißt Kriterium 2 bei AHS und BHS gleich: „Coherence and Cohesion". */
function critName(c) {
  return c.name;
}

function ratingBlock() {
  return '<div class="gap-s"></div>' +
    M.sectionLabel('Rate yourself on the four criteria') +
    '<p style="font-size:.9375rem;color:var(--text-secondary);line-height:1.55;margin-bottom:6px;max-width:720px">This is the official 0–10 scale your teachers use. The grid describes levels 0, 2, 4, 6, 8 and 10 – the levels in between are for texts that sit between two descriptions. <strong style="color:var(--text)">Level 6 means: B2 minimum met.</strong></p>' +
    '<p style="font-size:.8125rem;color:var(--text-muted);margin-bottom:18px">Pick the description that honestly fits your text. Your rating is added to the AI feedback prompt so you can compare judgements.</p>' +
    CRITERIA.map(c =>
      '<div class="rate-row">' +
        '<div class="rate-name">' + critName(c) + '</div>' +
        '<div class="rate-seg" role="radiogroup" aria-label="' + esc(c.name) + ' self-rating" data-crit="' + c.id + '">' +
          BAND_ORDER.map(b =>
            '<button class="rate-btn' + (rating[c.id] === b ? ' sel' : '') + '" role="radio" aria-checked="' + (rating[c.id] === b) + '" data-action="rate-pick" data-crit="' + c.id + '" data-band="' + b + '" tabindex="' + (rating[c.id] === b || (rating[c.id] === null && b === 6) ? '0' : '-1') + '">' + b + '</button>').join('') +
        '</div>' +
        '<div class="rate-desc" id="rateDesc' + c.id + '" aria-live="polite">' +
          (rating[c.id] !== null ? esc(c.bands[rating[c.id]]) : '<span style="color:var(--text-muted)">Tap a level to see what it means.</span>') +
        '</div>' +
        (c.note ? '<div class="rate-note">' + c.note + '</div>' : '') +
      '</div>').join('') +
    '<div style="display:flex;gap:14px;align-items:baseline;flex-wrap:wrap;margin-top:6px">' +
      '<div id="rateSum" class="rate-sum">' + sumLine() + '</div>' +
      '<button class="tc-skip" data-action="rate-clear">Clear rating</button>' +
    '</div>';
}
function sumLine() {
  const vals = CRITERIA.map(c => rating[c.id]);
  if (vals.every(v => v === null)) return '';
  const set = CRITERIA.filter(c => rating[c.id] !== null);
  const sum = set.reduce((s, c) => s + rating[c.id], 0);
  return 'Your rating: ' + set.map(c => c.id + ' ' + rating[c.id]).join(' · ') +
    (set.length === 4 ? ' – ' + sum + '/40' : '');
}

M.scRatingLine = function () {
  const set = CRITERIA.filter(c => rating[c.id] !== null);
  if (!set.length) return '';
  return '\n\nThe student rated themselves on the official criteria: ' +
    set.map(c => c.name + ' ' + rating[c.id] + '/10').join(', ') +
    '. Comment on where you agree and disagree with this self-assessment, and why.';
};

M.rateAction = function (act, el) {
  if (act === 'rate-pick') {
    const crit = el.dataset.crit, band = +el.dataset.band;
    rating[crit] = band;
    const c = CRITERIA.find(x => x.id === crit);
    const seg = el.closest('.rate-seg');
    $$('.rate-btn', seg).forEach(b => {
      const s = +b.dataset.band === band;
      b.classList.toggle('sel', s);
      b.setAttribute('aria-checked', s);
      b.tabIndex = s ? 0 : -1;
    });
    const d = document.getElementById('rateDesc' + crit);
    if (d) d.textContent = c.bands[band];
    const sum = document.getElementById('rateSum');
    if (sum) sum.textContent = sumLine();
  } else if (act === 'rate-clear') {
    rating = { TA: null, CC: null, LR: null, LA: null };
    const host = document.getElementById('scRating');
    if (host) host.innerHTML = ratingBlock();
  }
};

/* Pfeiltasten-Navigation im Radiogroup */
document.addEventListener('keydown', e => {
  const seg = e.target.closest && e.target.closest('.rate-seg');
  if (!seg) return;
  if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].indexOf(e.key) === -1) return;
  e.preventDefault();
  const btns = Array.from(seg.querySelectorAll('.rate-btn'));
  const i = btns.indexOf(e.target);
  const next = (e.key === 'ArrowRight' || e.key === 'ArrowDown') ? Math.min(btns.length - 1, i + 1) : Math.max(0, i - 1);
  btns[next].focus();
  btns[next].click();
});

M.scRatingBlock = ratingBlock;
M.scRatingReset = function () { rating = { TA: null, CC: null, LR: null, LA: null }; };
})();
