/* ════════════════════════════════════════════════════════════
   Pages 2 – Phrase bank · Checklist · Self-check · Task bank
   ════════════════════════════════════════════════════════════ */
(function () {
'use strict';
const M = window.MWG;
const { esc, sectionLabel, pageHead, TYPE_COLORS } = M;

/* Geschwister-Seiten als Reiter (echte Links, eigene URLs bleiben erhalten) */
function sibTabs(label, items, current) {
  return '<nav class="tabs sib-tabs" aria-label="' + esc(label) + '">' + items.map(it =>
    '<a class="tab' + (it[0] === current ? ' active' : '') + '" href="#' + it[0] + '"' + (it[0] === current ? ' aria-current="page"' : '') + '>' + it[1] + '</a>').join('') + '</nav>';
}
const SIB_LANG = [['phrasebank', 'Phrase bank'], ['topicvocab', 'Topic vocabulary']];
const SIB_CHECK = [['selfcheck', 'Check a draft'], ['checklist', 'Final checklist']];
M.sibTabs = sibTabs;

/* ─── PHRASE BANK ─────────────────────────────────────────── */
const _phraseCache = {};
function allPhrases() {
  const school = M.school();
  if (_phraseCache[school]) return _phraseCache[school];
  const out = [];
  const vis = t => !t.schools || t.schools.indexOf(school) >= 0;
  SRDP.textTypes.filter(vis).forEach(t => t.phrases.forEach(g => g.items.forEach(p => out.push({ phrase: p, category: g.category, typeId: t.id, typeName: t.name, color: t.color }))));
  const emailType = SRDP.textTypes.find(t => t.id === 'email');
  if (!emailType || vis(emailType)) SRDP.emailSubTypes.forEach(st => st.phrases.forEach(g => g.items.forEach(p => out.push({ phrase: p, category: st.name + ' – ' + g.category, typeId: 'email', typeName: 'E-Mail', color: 'red' }))));
  SRDP.paragraphs.phraseGroups.forEach(g => g.phrases.forEach(p => out.push({ phrase: p, category: 'Paragraphs – ' + g.label, typeId: 'all', typeName: 'Any text', color: null })));
  _phraseCache[school] = out;
  return out;
}
const pbState = { search: '', filter: 'all' };
function pbList() {
  let r = allPhrases();
  if (pbState.filter !== 'all') r = r.filter(p => p.typeId === pbState.filter || p.typeId === 'all');
  if (pbState.search.trim()) {
    const q = pbState.search.toLowerCase();
    r = r.filter(p => p.phrase.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.typeName.toLowerCase().includes(q));
  }
  return r;
}
function pbResults() {
  const list = pbList();
  const grouped = {};
  list.forEach(p => { (grouped[p.category] = grouped[p.category] || []).push(p); });
  const open = !!pbState.search.trim() || pbState.filter !== 'all';
  return '<p class="text-sm muted mb-4" role="status">' + list.length + ' phrase' + (list.length !== 1 ? 's' : '') + (pbState.search ? ' for &ldquo;' + esc(pbState.search) + '&rdquo;' : '') + (open ? '' : ' in ' + Object.keys(grouped).length + ' groups. Open a group to see its phrases.') + '</p>' +
    (list.length === 0 ? '<p class="pb-empty">No phrases match your search. Try a shorter word, for example &ldquo;opinion&rdquo; or &ldquo;contrast&rdquo;.</p>' :
      '<div class="acc">' + Object.keys(grouped).map(cat =>
        '<div class="acc-item' + (open ? ' open' : '') + '"><button class="acc-head" data-action="acc" aria-expanded="' + open + '"><span class="pm">+</span><span>' + esc(cat) + '</span><span class="sub">' + grouped[cat].length + '</span></button>' +
        '<div class="acc-body"><div class="mt-3">' + M.chips(grouped[cat].map(p => p.phrase)) + '</div></div></div>').join('') + '</div>');
}
PAGES.phrasebank = {
  title: 'Phrases & vocabulary', track: 'phrasebank',
  render() {
    const n = allPhrases().length;
    return '<div class="page">' +
      pageHead('Reference', 'Phrases &amp; vocabulary', n + ' phrases for the exam, sorted by text type and job. Tap a phrase to copy it.', sibTabs('Phrases and vocabulary', SIB_LANG, 'phrasebank')) +
      '<div class="wrap"><div class="gap-s"></div>' +
        '<a class="btn btn-ghost no-print mb-5" href="/pdf/phrase-bank.pdf" target="_blank" rel="noopener">Download the phrase bank as a PDF <span aria-hidden="true">&darr;</span></a>' +
        '<div class="field mb-4" style="max-width:420px"><label for="pbSearch">Search the phrases</label><input type="search" id="pbSearch" placeholder="for example: opinion, contrast, conclusion" value="' + esc(pbState.search) + '"></div>' +
        '<div class="tabs filters mb-5" aria-label="Show phrases for">' +
          [['all', 'All']].concat(M.typesForSchool().map(t => [t.id, t.name])).map(f =>
            '<button class="tab' + (pbState.filter === f[0] ? ' active' : '') + '" data-action="pb-filter" data-f="' + f[0] + '">' + f[1] + '</button>').join('') +
        '</div>' +
        '<div id="pbResults">' + pbResults() + '</div>' +
        '<div class="page-end"></div>' +
      '</div></div>';
  },
  wire() {
    const inp = M.$('#pbSearch');
    inp.addEventListener('input', () => { pbState.search = inp.value; M.$('#pbResults').innerHTML = pbResults(); });
  },
};
window.MWG.pbState = pbState;
window.MWG.pbResults = pbResults;

/* ─── WRITING CHECKLIST ───────────────────────────────────── */
const clState = { type: 'general', checks: {}, submitted: false };
function clItems() {
  const c = SRDP.checklists;
  return clState.type === 'general' ? c.general.items : c.general.items.concat(c[clState.type].items);
}
function clBody() {
  const c = SRDP.checklists;
  const items = clItems();
  const total = items.reduce((s, i) => s + i.weight, 0);
  const earned = items.filter(i => clState.checks[i.id]).reduce((s, i) => s + i.weight, 0);
  const score = Math.round((earned / total) * 100);
  const n = items.filter(i => clState.checks[i.id]).length;
  const bar = score >= 90 ? 'var(--green)' : score >= 70 ? 'var(--yellow)' : 'var(--primary)';
  const section = (title, list) =>
    '<div style="margin-bottom:26px"><h2 class="section-label">' + title + '</h2><div style="border:1px solid var(--border)">' +
    list.map(it => {
      const checked = !!clState.checks[it.id];
      const flagged = clState.submitted && !checked;
      return '<div class="cl-item' + (checked ? ' checked' : '') + (flagged ? ' flagged' : '') + '" data-action="cl-toggle" data-id="' + it.id + '" role="checkbox" aria-checked="' + checked + '"' + (clState.submitted ? ' aria-disabled="true"' : '') + ' tabindex="0">' +
        '<span class="cl-box">' + (checked ? '✓' : '') + '</span>' +
        '<span class="cl-text">' + esc(it.text) + (it.weight >= 3 ? '<span class="hi-pri">High priority</span>' : '') + (flagged ? '<span class="cl-flag">Not ticked</span>' : '') + '</span></div>';
    }).join('') + '</div></div>';
  return '<div style="border:1px solid var(--border);padding:18px 22px;margin-bottom:24px;background:var(--surface)">' +
      '<div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px">' +
        '<span style="font-size:.875rem;color:var(--text-secondary)">' + n + ' / ' + items.length + ' items checked</span>' +
        '<span style="font-weight:300;font-size:1.9rem;line-height:1">' + score + '%</span></div>' +
      '<div class="qbar" style="margin:0"><i style="width:' + score + '%;background:' + bar + '"></i></div>' +
      (clState.submitted ? '<div style="margin-top:11px;font-size:.875rem;color:' + (score >= 90 ? 'var(--green)' : score >= 70 ? 'var(--yellow)' : 'var(--red)') + '">' +
        (score >= 90 ? 'Ready to hand in.' : score >= 70 ? 'Almost there. Look at the items marked &ldquo;Not ticked&rdquo;.' : 'Keep working. Several important items are not ticked yet.') + '</div>' : '') +
    '</div>' +
    section('General – all text types', c.general.items) +
    (clState.type !== 'general' ? section(c[clState.type].label + ' – specific', c[clState.type].items) : '') +
    '<div style="display:flex;gap:8px">' +
      (!clState.submitted ? '<button class="btn btn-primary" data-action="cl-submit">Show what is missing</button>' : '<button class="btn btn-ghost" data-action="cl-reset">Start again</button>') +
    '</div>';
}
PAGES.checklist = {
  title: 'Final checklist', track: 'checklist',
  render() {
    return '<div class="page">' +
      pageHead('Practise', 'Self-check &amp; checklist', 'Go through this list before you hand in. Tick every item you are sure about. High-priority items cost the most marks.', sibTabs('Self-check and checklist', SIB_CHECK, 'checklist')) +
      '<div class="wrap" style="max-width:780px"><div class="gap-s"></div>' +
        '<a class="btn btn-ghost no-print mb-5" href="/pdf/checklist.pdf" target="_blank" rel="noopener">Download the checklist as a PDF <span aria-hidden="true">&darr;</span></a>' +
        '<div class="tabs filters mb-6" aria-label="Checklist for">' +
          ['general'].concat(M.typesForSchool().map(t => t.id)).filter(id => SRDP.checklists[id]).map(id =>
            '<button class="tab' + (clState.type === id ? ' active' : '') + '" data-action="cl-type" data-t="' + id + '">' + SRDP.checklists[id].label + '</button>').join('') +
        '</div>' +
        '<div id="clBody">' + clBody() + '</div>' +
        '<div class="page-end"></div>' +
      '</div></div>';
  },
};
window.MWG.clState = clState;
window.MWG.clBody = clBody;

/* ─── SELF-CHECK STUDIO ───────────────────────────────────── */
const scState = { type: (M.typesForSchool && M.typesForSchool()[0] ? M.typesForSchool()[0].id : 'essay'), target: (M.school && M.school() === 'bhs') ? 250 : 400 };
const CONTRACTIONS = /\b(don't|can't|won't|isn't|aren't|wasn't|weren't|doesn't|didn't|couldn't|shouldn't|wouldn't|hasn't|haven't|hadn't|it's|that's|there's|here's|what's|who's|let's|i'm|i've|i'll|i'd|you're|you've|you'll|you'd|we're|we've|we'll|we'd|they're|they've|they'll|she's|he's|she'll|he'll|gonna|wanna|gotta)\b/gi;
const INFORMAL = ['basically', 'stuff', 'guys', 'kids', 'loads of', 'lots of', 'a lot of', 'totally', 'awesome', 'cool', 'okay', 'ok', 'btw', 'huge', 'crazy', 'dumb', 'super', 'really really', 'kinda', 'sort of', 'pretty good', 'anyway'];
const LINKERS = ['furthermore', 'moreover', 'in addition', 'what is more', 'however', 'nevertheless', 'nonetheless', 'on the other hand', 'on the one hand', 'although', 'even though', 'despite', 'in spite of', 'therefore', 'consequently', 'as a result', 'thus', 'hence', 'owing to', 'due to', 'for instance', 'for example', 'admittedly', 'while', 'whereas', 'to sum up', 'on balance', 'in conclusion', 'taking everything into account', 'first of all', 'to begin with', 'in contrast', 'as a consequence', 'firstly', 'secondly', 'finally'];
const FORMAL_TYPES = { essay: true, report: true, email: true, article: false, blog: false, leaflet: false };

function analyze(text, type, target, task) {
  const f = [];
  const add = (status, html) => f.push({ status, html });
  /* Lifting: Wortfolgen (6+ Wörter), die wörtlich aus der Aufgabe/dem Material stammen */
  const lifted = [];
  if (task && task.trim()) {
    const norm = s => s.toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9' ]+/g, ' ').replace(/\s+/g, ' ').trim();
    const tw = norm(task).split(' '), xw = norm(text).split(' ');
    const grams = new Set();
    for (let i = 0; i + 6 <= tw.length; i++) grams.add(tw.slice(i, i + 6).join(' '));
    let i = 0;
    while (i + 6 <= xw.length) {
      const g = xw.slice(i, i + 6).join(' ');
      if (grams.has(g)) { let j = i + 6; while (j < xw.length && grams.has(xw.slice(j - 5, j + 1).join(' '))) j++; lifted.push(xw.slice(i, j).join(' ')); i = j; } else i++;
    }
  }
  const bodyForCount = text.split('\n').filter(function (l) { return !/^\s*(to|from|subject|date)\s*:/i.test(l); }).join('\n');
  const words = bodyForCount.match(/\S+/g) || [];
  const wc = words.length;
  const lo = Math.round(target * 0.9), hi = Math.round(target * 1.1);

  /* word count */
  if (wc === 0) return [{ status: 'bad', html: 'No text yet. Paste your text above and press <b>Check my text</b>.' }];
  if (wc < lo) add('bad', '<b>' + wc + ' words</b>: below the safe range (' + lo + '–' + hi + ' for a ~' + target + '-word task). Develop your content points further.');
  else if (wc > hi) add('bad', '<b>' + wc + ' words</b>: above the safe range (' + lo + '–' + hi + '). Cut repetition and filler. Longer texts also have more chances for mistakes.');
  else add('ok', '<b>' + wc + ' words</b>: inside the safe range (' + lo + '–' + hi + '). ');

  /* paragraphs */
  const paras = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  if (paras.length < 4) add('warn', '<b>' + paras.length + ' paragraph' + (paras.length === 1 ? '' : 's') + ' detected.</b> A Matura text usually has 5–6 paragraphs (introduction, one per content point, conclusion). Leave an empty line between paragraphs.');
  else add('ok', '<b>' + paras.length + ' paragraphs</b>. Your text has clear paragraphs.');

  /* register */
  const contr = text.match(CONTRACTIONS) || [];
  const informalHits = INFORMAL.filter(wrd => new RegExp('\\b' + wrd.replace(/ /g, '\\s+') + '\\b', 'i').test(text));
  if (FORMAL_TYPES[type]) {
    if (contr.length) add('bad', '<b>' + contr.length + ' contraction' + (contr.length > 1 ? 's' : '') + '</b> found (' + contr.slice(0, 5).map(c => '<code>' + esc(c) + '</code>').join(' ') + (contr.length > 5 ? ' …' : '') + '). Write the full forms in formal texts. They make the register too casual. They are not counted as Accuracy errors.');
    else add('ok', 'No contractions. Correct for a formal text.');
    if (informalHits.length) add('warn', 'Possibly informal wording: ' + informalHits.slice(0, 6).map(w => '<code>' + esc(w) + '</code>').join(' ') + '. Replace with formal alternatives.');
  } else {
    add('info', (contr.length ? contr.length + ' contractions found. That is fine for a ' + type + '.' : 'No contractions found. For a ' + (type === 'leaflet' ? 'leaflet, keep it persuasive and reader-friendly, but not personal or slangy.' : type + ', a personal, natural voice is welcome.')));
  }

  /* linkers */
  const found = LINKERS.filter(l => new RegExp('\\b' + l.replace(/ /g, '\\s+') + '\\b', 'i').test(text));
  const narrativeType = type === 'blog' || type === 'article';
  if (found.length >= 5) add('ok', '<b>' + found.length + ' different linking words</b> found: ' + found.slice(0, 8).map(l => '<code>' + esc(l) + '</code>').join(' ') + (found.length > 8 ? ' …' : ''));
  else if (narrativeType) add('info', '<b>' + found.length + ' linking word' + (found.length === 1 ? '' : 's') + '</b> found (' + (found.map(l => '<code>' + esc(l) + '</code>').join(' ') || 'none') + '). In a blog or article, pronouns and time words also link your ideas, so a few clear linking words are enough.');
  else add('warn', 'Only <b>' + found.length + ' B2 linking word' + (found.length === 1 ? '' : 's') + '</b> found (' + (found.map(l => '<code>' + esc(l) + '</code>').join(' ') || 'none') + '). Aim for at least five different ones.');

  /* complex structures */
  const passive = (text.match(/\b(is|are|was|were|been|being|be)\s+\w+(ed|en)\b/gi) || []).length;
  const rel = (text.match(/\b(which|who|whose)\b/gi) || []).length;
  const cond = /\bif\b/i.test(text) && /\bwould\b/i.test(text);
  const signals = [];
  if (passive) signals.push(passive + '× possible passive');
  if (rel) signals.push(rel + '× relative pronoun (which/who/whose)');
  if (cond) signals.push('a conditional pattern (if … would)');
  if (signals.length >= 2) add('ok', '<b>Complex structures:</b> ' + signals.join(', ') + '. This helps your Range score. (Rough automatic estimate.)');
  else add('warn', '<b>Few complex structures detected</b> (' + (signals.join(', ') || 'none') + '). Add a passive, a conditional or a relative clause where it fits. With only simple grammar, your Range score stays low.');

  /* sentence stats */
  const sentences = text.replace(/\n+/g, ' ').split(/[.!?]+\s/).filter(s => s.trim().split(/\s+/).length > 2);
  if (sentences.length) {
    const lens = sentences.map(s => s.trim().split(/\s+/).length);
    const avg = Math.round(lens.reduce((a, b) => a + b, 0) / lens.length);
    const maxLen = Math.max.apply(null, lens), minLen = Math.min.apply(null, lens);
    if (maxLen - minLen < 8) add('warn', 'Sentence lengths are uniform (avg ' + avg + ' words, range ' + minLen + '–' + maxLen + '). Mix short sentences with longer ones.');
    else add('ok', 'Sentence variety: avg ' + avg + ' words, range ' + minLen + '–' + maxLen + '. Good variety.');
    const starters = {};
    sentences.forEach(s => { const w = (s.trim().split(/\s+/)[0] || '').toLowerCase().replace(/[^a-z']/g, ''); if (w) starters[w] = (starters[w] || 0) + 1; });
    const rep = Object.keys(starters).filter(w => starters[w] >= 4);
    if (rep.length) add('warn', 'Sentence starter repeated: ' + rep.map(w => '<code>' + esc(w) + '</code> (' + starters[w] + '×)').join(', ') + '. Start some sentences differently.');
  }

  /* questions / exclamations */
  const qs = (text.match(/\?/g) || []).length;
  const ex = (text.match(/!/g) || []).length;
  if (type === 'essay' && qs > 1) add('warn', qs + ' question marks. In an essay, use one rhetorical question at most, in the introduction.');
  if ((type === 'article' || type === 'blog') && qs === 0) add('warn', 'No questions to the reader. Articles and blogs usually speak to the reader directly, for example with a question.');
  if (FORMAL_TYPES[type] && ex > 0) add('bad', ex + ' exclamation mark' + (ex > 1 ? 's' : '') + '. They do not fit a formal ' + type + '.');

  /* type-specific structure */
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  if (type === 'email') {
    const hasHeader = /to\s*:/i.test(text) && /from\s*:/i.test(text) && /subject\s*:/i.test(text) && /date\s*:/i.test(text);
    add(hasHeader ? 'ok' : 'warn', hasHeader ? 'Header complete (To / From / Date / Subject).' : '<b>Header incomplete.</b> A formal e-mail should show To, From, Date and, above all, a clear Subject line.');
    const dearSir = /dear\s+(sir|madam|editor)/i.test(text);
    const dearName = /dear\s+(mr|ms|mrs|dr)\.?\s+\w+/i.test(text);
    const faith = /yours\s+faithfully/i.test(text);
    const sinc = /yours\s+sincerely/i.test(text);
    if (!dearSir && !dearName) add('bad', 'No formal greeting found. Open with <code>Dear Sir or Madam,</code> or <code>Dear Mr/Ms [Name],</code>.');
    if (!faith && !sinc) add('bad', 'No sign-off found. Close with <code>Yours faithfully,</code> (name unknown) or <code>Yours sincerely,</code> (name known).');
    if (dearSir && sinc) add('bad', '<b>Mismatch:</b> "Dear Sir or Madam" must pair with <code>Yours faithfully</code>, not "sincerely".');
    if (dearName && faith) add('bad', '<b>Mismatch:</b> a named greeting (Dear Mr/Ms …) must pair with <code>Yours sincerely</code>.');
    if ((dearSir && faith) || (dearName && sinc)) add('ok', 'Greeting and sign-off match correctly.');
  }
  if (type === 'report') {
    const hasHeader = /from\s*:/i.test(text) && /subject\s*:/i.test(text) && /date\s*:/i.test(text);
    add(hasHeader ? 'ok' : 'warn', hasHeader ? 'Header complete (Date / From / Subject).' : '<b>Header incomplete.</b> A report should open with Date, From and a clear Subject line.');
    const headings = lines.filter(l => { const tt = l.trim(); return tt.length > 0 && tt.split(/\s+/).length <= 6 && !/[.!?;,]$/.test(tt) && !/^(date|from|subject|to)\b/i.test(tt) && !/^report$/i.test(tt); }).length;
    add(headings >= 3 ? 'ok' : 'warn', headings >= 3 ? headings + ' section headings found.' : 'Only ' + headings + ' section heading' + (headings === 1 ? '' : 's') + ' found. Give each section a short, clear heading such as Introduction, Findings or Recommendations. They do not need numbers.');
    if (/dear\s+(sir|madam)/i.test(text)) add('bad', 'Reports have <b>no greeting</b>. Delete "Dear Sir or Madam".');
    const opinion = (text.match(/\bI (think|believe|feel)\b/gi) || []).length;
    if (opinion > 1) add('warn', '"I think/believe/feel" appears ' + opinion + '×. Keep your opinion out of the findings. Careful suggestions belong in the recommendations.');
  }
  if (type === 'essay' || type === 'article') {
    const first = lines[0] || '';
    const looksTitle = first.length > 0 && first.split(/\s+/).length <= 12 && !/[.:,]$/.test(first) && !/^(dear|to:|from:)/i.test(first);
    add(looksTitle ? 'ok' : 'warn', looksTitle ? 'First line looks like a title: <code>' + esc(first) + '</code>' : 'No title found. ' + (type === 'essay' ? 'An essay needs a clear title on the first line.' : 'An article needs a catchy title on the first line.'));
  }
  if (type === 'blog') {
    add('info', 'Blog post: username and date at the top, a catchy title, and an invitation to comment at the end. Blog comment: no title, and the first sentence refers to the post.');
    if (!/\?/.test(text)) add('warn', 'Consider ending with a question to invite comments.');
  }
  if (type === 'essay') {
    const anecdote = (text.match(/\b(my|me|I was|when I)\b/gi) || []).length;
    if (anecdote > 6) add('warn', 'A lot of first-person phrasing. Argue mainly with general and hypothetical examples. A short personal example is fine, but not as your main evidence. ("It is often the case that…" instead of "When I was…")');
  }
  if (type === 'leaflet') {
    const lfirst = (lines[0] || '').trim();
    const looksTitle = lfirst.length > 0 && lfirst.split(' ').length <= 12 && '.:,'.indexOf(lfirst.slice(-1)) === -1;
    add(looksTitle ? 'ok' : 'warn', looksTitle ? 'First line looks like a title.' : 'No title detected: a leaflet needs a clear title on the first line.');
    const heads = lines.filter(function (l) { var tt = l.trim(); return tt.length > 0 && tt.split(' ').length <= 6 && '.!?:;,'.indexOf(tt.slice(-1)) === -1; }).length;
    add(heads >= 2 ? 'ok' : 'warn', heads >= 2 ? heads + ' short heading-like lines found (subheadings).' : 'Few subheadings: break the leaflet into short, headed sections.');
    const low = text.toLowerCase();
    const cta = ['come', 'join', 'sign up', 'visit', 'call', 'find out', 'bring', 'do not miss', 'get in touch', 'contact'].some(function (wq) { return new RegExp('\\b' + wq.replace(/ /g, '\\s+') + '\\b', 'i').test(low); });
    add(cta ? 'ok' : 'warn', cta ? 'A call to action is present.' : 'No clear call to action: tell the reader what to do next (come along, sign up, get in touch).');
  }
  if (task && task.trim()) {
    if (lifted.length) add('warn', '<b>' + lifted.length + ' passage' + (lifted.length === 1 ? '' : 's') + ' lifted from the task</b> – word for word: ' + lifted.slice(0, 3).map(function (l) { return '“' + M.esc(l.length > 70 ? l.slice(0, 70) + '…' : l) + '”'; }).join(', ') + '. Put these in your own words. Copied language does not count for Range.');
    else add('ok', 'No sentences copied from the task. The wording is your own.');
  }
  add('info', 'This is a quick robot check of the surface. It cannot judge your ideas or your accuracy; for real feedback, use the AI prompt below or ask your teacher.');
  return f;
}
function scHasDraft() { try { return !!(sessionStorage.getItem('mwg_sc_draft') || '').trim(); } catch (e) { return false; } }
PAGES.selfcheck = {
  title: 'Self-check', track: 'selfcheck',
  afterRoute() {
    if (!scState.wantFocus) return;
    scState.wantFocus = false;
    const t = M.$('#scText');
    if (t) { try { t.scrollIntoView({ block: 'center' }); t.focus({ preventScroll: true }); } catch (e) {} }
  },
  render() {
    return '<div class="page">' +
      pageHead('Practise', 'Self-check &amp; checklist', 'Paste a practice text and get quick notes on length, register and layout. For feedback on your ideas and language, copy the AI prompt or ask your teacher.', sibTabs('Self-check and checklist', SIB_CHECK, 'selfcheck')) +
      '<div class="wrap" style="max-width:860px"><div class="gap-s"></div>' +
        (scState.fromTask ? '<div class="tip good mb-5" role="status"><strong>Task loaded:</strong> ' + esc(scState.fromTask) + '. Text type, target length and task are filled in. Paste or write your text below.' + (scHasDraft() ? ' <span class="sc-draftnote">The text box still holds your earlier text. <button class="btn-text" data-action="sc-clear">Clear the text box</button></span>' : '') + '</div>' : '') +
        '<div class="acc mb-5"><div class="acc-item"><button class="acc-head" data-action="acc" aria-expanded="false"><span class="pm">+</span><span>How this check works, and what it cannot do</span></button>' +
        '<div class="acc-body">' +
          '<ol class="sc-steps">' +
            '<li>Choose the text type and your target length.</li>' +
            '<li>Paste your practice text into the box. Adding the task helps, too.</li>' +
            '<li>Press <strong>Check my text</strong>. You get notes on length, register, layout and the rules of that text type.</li>' +
          '</ol>' +
          '<p class="text-base muted mt-3">The check only looks at the surface. It cannot judge your ideas or find every grammar mistake. For that, copy the AI prompt it builds for you, or ask your teacher.</p>' +
        '</div></div></div>' +
        '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;margin-bottom:18px">' +
          '<div class="field"><label for="scType">Text type</label><select id="scType">' +
            M.typesForSchool().map(t => '<option value="' + t.id + '"' + (scState.type === t.id ? ' selected' : '') + '>' + t.name + '</option>').join('') +
          '</select></div>' +
          '<div class="field"><label for="scTarget">Target length</label><select id="scTarget">' +
            '<option value="250"' + (scState.target === 250 ? ' selected' : '') + '>~250 words</option>' +
            (M.school() === 'ahs' ? '<option value="400"' + (scState.target === 400 ? ' selected' : '') + '>~400 words</option>' : '') +
          '</select></div>' +
        '</div>' +
        '<div class="field mb-4"><label for="scTask">The task you answered (optional, but it makes the AI prompt better and lets the check find sentences copied from the task)</label>' +
          '<textarea id="scTask" rows="3" placeholder="Paste the task here, including the three content points…"></textarea></div>' +
        '<div class="field"><label for="scText">Your text <span id="scLive" class="sc-live" aria-live="off"></span></label>' +
          '<textarea id="scText" rows="14" placeholder="Paste or type your practice text here…"></textarea></div>' +
        '<div class="row-wrap mt-4">' +
          '<button class="btn btn-primary" data-action="sc-run">Check my text</button>' +
          '<button class="btn btn-ghost" data-action="sc-prompt">Copy AI feedback prompt</button>' +
        '</div>' +
        '<p class="text-sm muted mt-2">The AI prompt contains your text and the official SRDP criteria. When you paste it into ChatGPT, Claude or another tool, your text goes to that company. Use a practice text and leave out real names and personal details. An AI score is rough practice feedback and says nothing certain about your real Matura mark. Nothing leaves this page unless you paste it somewhere yourself. If your school has rules about AI tools, follow them first. In the exam itself, AI tools are not allowed.</p>' +
        '<div id="scResults" class="mt-6"></div>' +
        '<div id="scRating">' + (M.scRatingBlock ? M.scRatingBlock() : '') + '</div>' +
        '<div class="page-end"></div>' +
      '</div></div>';
  },
  wire() {
    const txt = M.$('#scText'), live = M.$('#scLive');
    const upd = () => {
      const wc = (txt.value.match(/\S+/g) || []).length;
      const t = +M.$('#scTarget').value;
      const lo = Math.round(t * 0.9), hi = Math.round(t * 1.1);
      live.textContent = wc + ' words' + (wc ? ' (target ' + lo + '–' + hi + ')' : '');
      live.classList.toggle('in-range', wc >= lo && wc <= hi);
      if (wc >= lo && wc <= hi) live.textContent += ' ✓';
      try{ sessionStorage.setItem('mwg_sc_draft', txt.value); }catch(e){}
    };
    txt.addEventListener('input', upd);
    M.$('#scTarget').addEventListener('change', () => { scState.target = +M.$('#scTarget').value; upd(); });
    M.$('#scType').addEventListener('change', () => {
      scState.type = M.$('#scType').value;
      /* Ziellänge an die Textsorte koppeln: Essay ~400, alles andere ~250 (wenn die Option existiert) */
      const want = scState.type === 'essay' ? '400' : '250';
      const sel = M.$('#scTarget');
      if (sel && [...sel.options].some(o => o.value === want) && sel.value !== want) { sel.value = want; scState.target = +want; upd(); }
    });
    try{ var d = sessionStorage.getItem('mwg_sc_draft'); if (d && !txt.value) txt.value = d; var tk = M.$('#scTask'); var dt = sessionStorage.getItem('mwg_sc_task'); if (tk) { if (dt && !tk.value) tk.value = dt; tk.addEventListener('input', function () { try { sessionStorage.setItem('mwg_sc_task', tk.value); } catch (e) {} }); } }catch(e){}
    if (scState.fromTask) { scState.fromTask = null; scState.wantFocus = true; }
    upd();
  },
};
window.MWG.analyze = analyze;
window.MWG.scState = scState;

/* Aufgabe aus Task bank, Textsorten-Seite oder Mock exam in den Self-check übernehmen */
function taskPlainText(p) {
  const t = SRDP.textTypes.find(x => x.id === p.type);
  return p.scenario + materialText(p.material) + '\n\n' + p.instruction + '\n\nIn your ' + (t ? t.name.toLowerCase() : 'text') + ' you should:\n• ' + p.bullets.join('\n• ');
}
M.sendToSelfcheck = function (promptIndex) {
  const p = SRDP.prompts[+promptIndex];
  if (!p) { location.hash = '#selfcheck'; return; }
  const vis = M.typesForSchool().map(t => t.id);
  if (vis.indexOf(p.type) >= 0) scState.type = p.type;
  scState.target = (+p.length >= 400 && M.school() === 'ahs') ? 400 : 250;
  scState.fromTask = p.topic;
  try { sessionStorage.setItem('mwg_sc_task', taskPlainText(p)); } catch (e) {}
  if (location.hash === '#selfcheck') M.route(); else location.hash = '#selfcheck';
  if (M.announce) M.announce('Task loaded into the self-check: ' + p.topic);
};

/* ─── TASK BANK ───────────────────────────────────────────── */
const tbState = { filter: 'all', open: null };
function materialBox(m, col) {
  if (!m) return '';
  return '<div class="task-mat" style="--tc:' + col + '">' +
    '<div class="task-mat-l">' + esc(m.label) + '</div>' +
    (m.source ? '<div class="task-mat-s">' + esc(m.source) + '</div>' : '') +
    (m.kind === 'data'
      ? '<ul class="task-mat-data">' + m.lines.map(l => '<li>' + esc(l) + '</li>').join('') + '</ul>'
      : m.lines.map(l => '<p class="task-mat-text">' + esc(l) + '</p>').join('')) +
  '</div>';
}
function materialText(m) {
  if (!m) return '';
  return '\n\n' + m.label.toUpperCase() + (m.source ? '\n' + m.source : '') + '\n' + (m.kind === 'data' ? m.lines.map(l => '• ' + l).join('\n') : m.lines.join('\n'));
}
function taskCard(p, i, opts) {
  const o = opts || {};
  const t = SRDP.textTypes.find(x => x.id === p.type);
  const col = t ? TYPE_COLORS[t.color] : 'var(--primary)';
  const origIdx = SRDP.prompts.indexOf(p);
  const full = taskPlainText(p);
  return '<div class="task-card' + (o.inAcc ? ' in-acc' : '') + '" data-task-i="' + origIdx + '" style="--tc:' + col + '">' +
    (o.inAcc ? '' :
      '<div class="task-top"><span class="tb-type"><i aria-hidden="true"></i>' + esc(t ? t.name : p.type) + '</span><span class="badge">~' + p.length + ' words</span></div>' +
      '<div class="task-topic">' + esc(p.topic) + '</div>') +
    '<p class="task-scen">' + esc(p.scenario) + '</p>' +
    materialBox(p.material, col) +
    '<p class="task-instr">' + esc(p.instruction) + '</p>' +
    '<ul class="task-points" aria-label="Content points">' + p.bullets.map(b => '<li>' + esc(b) + '</li>').join('') + '</ul>' +
    '<div class="row-wrap">' +
      '<button class="btn btn-primary btn-sm" data-action="tb-write" data-i="' + origIdx + '">Write &amp; self-check <span aria-hidden="true">&rarr;</span></button>' +
      '<button class="btn btn-ghost btn-sm" data-copy="' + esc(full) + '">Copy task</button>' +
    '</div>' +
  '</div>';
}
function tbPrompts() {
  const ids = M.typesForSchool().map(t => t.id);
  const bhs = M.school() === 'bhs';
  return SRDP.prompts.map((p, i) => ({ p, i })).filter(x => ids.indexOf(x.p.type) >= 0 && (!bhs || x.p.length <= 250) && (!x.p.schools || x.p.schools.indexOf(M.school()) >= 0));
}
function genPrompt() {
  const cfg = M.schoolConfig();
  const types = M.school() === 'ahs'
    ? 'essay (~400 words), or article, report, blog or e-mail (~250 words)'
    : 'article, report, blog, e-mail or leaflet (~250 words)';
  return 'You are an experienced Austrian English teacher. Generate ONE realistic writing task for the standardised SRDP exam (' + (cfg.long || 'AHS') + ', English B2), text type of your choice: ' + types + '. Format: a 1–2 sentence situation; any input material the text type needs (a short statement or quotation to respond to, 4–5 survey figures for a report, a 3–4 sentence excerpt for a letter to the editor or blog comment, an advertisement for an application, or a topic and target audience for a persuasive task); a clear instruction naming text type, audience and word count; and exactly three content points as bullet points, each starting with an operator (describe, explain, suggest…). Then ask me to write the text and wait. After I submit it, assess it with the four SRDP criteria (Task Achievement, Coherence and Cohesion, Lexical and Structural Range, Lexical and Structural Accuracy), each 0–10, with brief justifications and my five most important errors.';
}
function tbList() {
  let list = tbPrompts();
  if (tbState.filter !== 'all') list = list.filter(x => x.p.type === tbState.filter);
  return '<div class="acc tb-acc">' + list.map(x => {
    const t = SRDP.textTypes.find(y => y.id === x.p.type);
    const open = tbState.open === x.i;
    return '<div class="acc-item' + (open ? ' open' : '') + '" id="tb-' + x.i + '"><button class="acc-head" data-action="acc" aria-expanded="' + open + '">' +
      '<span class="pm">+</span><span class="tb-head"><span class="tb-type" style="--tc:' + (t ? TYPE_COLORS[t.color] : 'var(--primary)') + '"><i aria-hidden="true"></i>' + esc(t ? t.name : x.p.type) + '</span><span class="tb-topic">' + esc(x.p.topic) + '</span></span><span class="sub">~' + x.p.length + ' words</span></button>' +
      '<div class="acc-body">' + taskCard(x.p, x.i, { inAcc: true }) + '</div></div>';
  }).join('') + '</div>';
}
const TOPIC_VOCAB = SRDP.topicVocab;
/* pdf/topic-vocabulary.pdf deckt alle Themen ab (via _dev/build-pdfs.mjs). */
PAGES.topicvocab = {
  title: 'Topic vocabulary', track: 'topicvocab',
  render() {
    return '<div class="page">' +
      pageHead('Reference', 'Phrases &amp; vocabulary', 'Word combinations for common Matura topics. Precise topic words help your Range score. Open a topic and tap a phrase to copy it, or practise with flashcards.', sibTabs('Phrases and vocabulary', SIB_LANG, 'topicvocab')) +
      '<div class="wrap"><div class="gap-s"></div>' +
        '<div class="row-wrap no-print mb-5"><button class="btn btn-primary" data-action="flash-start" data-topic="all">Practise all topics as flashcards <span aria-hidden="true">&rarr;</span></button><a class="btn btn-ghost" href="/pdf/topic-vocabulary.pdf" target="_blank" rel="noopener">Download the vocabulary as a PDF <span aria-hidden="true">&darr;</span></a></div>' +
        '<div class="tip mb-5">These words are for the <strong>content</strong> of your text, the ideas in your body paragraphs. For structure and linking words, use the <a href="#phrasebank">phrase bank</a>.</div>' +
        '<div class="acc">' + TOPIC_VOCAB.map(function(t, ti){
          var m = M.flashMastered ? M.flashMastered(ti, t.words) : 0;
          return '<div class="acc-item"><button class="acc-head" data-action="acc" aria-expanded="false"><span class="pm">+</span><span>' + esc(t.topic) + '</span><span class="sub">' + (m > 0 ? m + '/' + t.words.length + ' mastered · ' : '') + t.words.length + ' phrases</span></button>' +
          '<div class="acc-body">' + M.chips(t.words.map(function(x){ return x.w; })) +
            '<div class="mt-4"><button class="btn btn-ghost btn-sm no-print" data-action="flash-start" data-topic="' + ti + '">Practise this topic as flashcards <span aria-hidden="true">&rarr;</span></button></div>' +
          '</div></div>'; }).join('') +
        '</div>' +
        '<div class="page-end"></div>' +
      '</div></div>';
  },
};
PAGES.taskbank = {
  title: 'Task bank', track: 'taskbank',
  render() {
    return '<div class="page">' +
      pageHead('Practise', 'Task bank', tbPrompts().length + ' Matura-style tasks with the material you need: survey figures, short source texts and statements to respond to. Open a task, write it, then check it in the self-check.') +
      '<div class="wrap" style="max-width:860px"><div class="gap-s"></div>' +
        '<div class="tip mb-4">The tasks on this site are written for practice in the Matura style. The official past papers are in the BMB download area: <a href="https://www.matura.gv.at/downloads" target="_blank" rel="noopener">matura.gv.at/downloads</a>. Want the full exam under time? Try the <a href="#timer">mock exam</a>.</div>' +
        '<div class="acc mb-5"><div class="acc-item"><button class="acc-head" data-action="acc" aria-expanded="false"><span class="pm">+</span><span>How to use the input material (and how not to)</span></button>' +
        '<div class="acc-body">' +
          '<p class="lead-sm mt-3 mb-3">Many tasks give you material: survey figures, a quote, an advert or a short text. Use it in your own words. Copying sentences word for word is called <em>lifting</em>. Lifted phrases do not count for Range, and figures you only repeat without a point do not help Task Achievement. Three steps:</p>' +
          '<ol class="tb-steps">' +
            '<li><strong>Pick</strong> the two or three facts that help your content points. You do not have to use everything.</li>' +
            '<li><strong>Rephrase</strong> them in your own words and grammar (“21% visit monthly” → “Only one student in five uses the library more than once a month”).</li>' +
            '<li><strong>Interpret</strong>: say what the fact means for your argument or recommendation.</li>' +
          '</ol>' +
          '<div class="pair-row" style="border:1px solid var(--border);margin-bottom:12px">' +
            '<div class="pair-cell"><div class="lab wrong-c">✗ LIFTED</div><span style="font-size:.875rem;color:var(--text-secondary);line-height:1.55">78% of respondents said they valued having a library, only 21% visited it more than once a month. The main reasons given were limited opening hours and a lack of quiet study space.</span></div>' +
            '<div class="pair-cell"><div class="lab right-c">✓ USED</div><span style="font-size:.875rem;color:var(--text-secondary);line-height:1.55">Almost four in five students say they value the library, yet only one in five actually uses it more than once a month. The gap has two clear causes, and both can be fixed: the doors close too early, and there is nowhere quiet to work.</span></div>' +
          '</div>' +
          '<p class="text-base muted">Quotes are the exception: you may quote a short phrase from a source text if you mark it as a quotation and react to it. The self-check finds sentences copied from the task if you paste the task in as well.</p>' +
        '</div></div></div>' +
        '<div class="tb-bar">' +
          '<div class="tabs filters" aria-label="Show tasks for">' +
            [['all', 'All']].concat(M.typesForSchool().map(t => [t.id, t.name])).map(f =>
              '<button class="tab' + (tbState.filter === f[0] ? ' active' : '') + '" data-action="tb-filter" data-f="' + f[0] + '">' + f[1] + '</button>').join('') +
          '</div>' +
          '<button class="btn btn-ghost btn-sm no-print" data-action="tb-random">Random task</button>' +
        '</div>' +
        '<div id="tbRandom"></div>' +
        '<div id="tbList">' + tbList() + '</div>' +
        '<div class="gap-s"></div>' +
        '<div class="tip">More tasks: copy this prompt into ChatGPT or Claude, and it writes a new Matura-style task for you and gives feedback on your text. ' +
          '<button class="btn btn-ghost btn-sm mt-2" data-copy="' + esc(genPrompt()) + '">Copy the task prompt</button>' +
        '</div>' +
        '<div class="page-end"></div>' +
      '</div></div>';
  },
};
window.MWG.tbState = tbState;
window.MWG.TOPIC_VOCAB = TOPIC_VOCAB;
window.MWG.tbList = tbList;
window.MWG.tbPrompts = tbPrompts;
window.MWG.taskCard = taskCard;
})();
