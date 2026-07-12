/* ════════════════════════════════════════════════════════════
   Pages 2 – Phrase bank · Checklist · Self-check · Task bank
   ════════════════════════════════════════════════════════════ */
(function () {
'use strict';
const M = window.MWG;
const { esc, sectionLabel, pageHead, TYPE_COLORS } = M;

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
  return '<div style="font-size:.8125rem;color:var(--text-muted);margin-bottom:18px">' + list.length + ' phrase' + (list.length !== 1 ? 's' : '') + ' found' + (pbState.search ? ' for &ldquo;' + esc(pbState.search) + '&rdquo;' : '') + '</div>' +
    (list.length === 0 ? '<div style="text-align:center;padding:48px;color:var(--text-muted)">No phrases match your search.</div>' :
      Object.keys(grouped).map(cat =>
        '<div style="margin-bottom:26px"><h2 class="section-label">' + esc(cat) + '</h2>' + M.chips(grouped[cat].map(p => p.phrase)) + '</div>').join(''));
}
PAGES.phrasebank = {
  title: 'Phrase bank', track: 'phrasebank',
  render() {
    const n = allPhrases().length;
    return '<div class="page">' +
      pageHead('Tool', 'Phrase bank', n + ' exam-ready phrases. Click any phrase to copy it instantly.') +
      '<div class="wrap"><div class="gap-s"></div>' +
        '<a class="btn btn-ghost no-print" href="pdf/phrase-bank.pdf" target="_blank" rel="noopener" style="margin-bottom:20px">Download this page as a PDF <span>&darr;</span></a>' +
        '<div class="field" style="max-width:420px;margin-bottom:18px"><label for="pbSearch">Search</label><input type="text" id="pbSearch" placeholder="Search phrases…" value="' + esc(pbState.search) + '"></div>' +
        '<div class="tabs" style="border-bottom:1px solid var(--border);margin-bottom:26px">' +
          [['all', 'All']].concat(M.typesForSchool().map(t => [t.id, t.name])).map(f =>
            '<button class="tab' + (pbState.filter === f[0] ? ' active' : '') + '" data-action="pb-filter" data-f="' + f[0] + '">' + f[1] + '</button>').join('') +
        '</div>' +
        '<div id="pbResults">' + pbResults() + '</div>' +
        '<div style="height:72px"></div>' +
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
      return '<div class="cl-item' + (checked ? ' checked' : '') + (flagged ? ' flagged' : '') + '" data-action="cl-toggle" data-id="' + it.id + '" role="checkbox" aria-checked="' + checked + '" tabindex="0">' +
        '<span class="cl-box">' + (checked ? '✓' : '') + '</span>' +
        '<span class="cl-text">' + esc(it.text) + (it.weight >= 3 ? '<span class="hi-pri">High priority</span>' : '') + '</span></div>';
    }).join('') + '</div></div>';
  return '<div style="border:1px solid var(--border);padding:18px 22px;margin-bottom:24px;background:var(--surface)">' +
      '<div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px">' +
        '<span style="font-size:.875rem;color:var(--text-secondary)">' + n + ' / ' + items.length + ' items checked</span>' +
        '<span style="font-weight:300;font-size:1.9rem;line-height:1">' + score + '%</span></div>' +
      '<div class="qbar" style="margin:0"><i style="width:' + score + '%;background:' + bar + '"></i></div>' +
      (clState.submitted ? '<div style="margin-top:11px;font-size:.875rem;color:' + (score >= 90 ? 'var(--green)' : score >= 70 ? 'var(--yellow)' : 'var(--red)') + '">' +
        (score >= 90 ? 'Ready to hand in.' : score >= 70 ? 'Almost there. Look at the red items.' : 'Keep working. Several important items are unchecked.') + '</div>' : '') +
    '</div>' +
    section('General – all text types', c.general.items) +
    (clState.type !== 'general' ? section(c[clState.type].label + ' – specific', c[clState.type].items) : '') +
    '<div style="display:flex;gap:8px">' +
      (!clState.submitted ? '<button class="btn btn-primary" data-action="cl-submit">See score</button>' : '<button class="btn btn-ghost" data-action="cl-reset">Reset</button>') +
    '</div>';
}
PAGES.checklist = {
  title: 'Writing checklist', track: 'checklist',
  render() {
    return '<div class="page">' +
      pageHead('Tool', 'Writing checklist', 'Use this before you put your pen down. Tick each item you are confident about. The high-priority items cost the most marks.') +
      '<div class="wrap" style="max-width:780px"><div class="gap-s"></div>' +
        '<a class="btn btn-ghost no-print" href="pdf/checklist.pdf" target="_blank" rel="noopener" style="margin-bottom:20px">Download this page as a PDF <span>&darr;</span></a>' +
        '<div class="tabs" style="border-bottom:1px solid var(--border);margin-bottom:28px">' +
          ['general'].concat(M.typesForSchool().map(t => t.id)).filter(id => SRDP.checklists[id]).map(id =>
            '<button class="tab' + (clState.type === id ? ' active' : '') + '" data-action="cl-type" data-t="' + id + '">' + SRDP.checklists[id].label + '</button>').join('') +
        '</div>' +
        '<div id="clBody">' + clBody() + '</div>' +
        '<div style="height:72px"></div>' +
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

function analyze(text, type, target) {
  const f = [];
  const add = (status, html) => f.push({ status, html });
  const bodyForCount = text.split('\n').filter(function (l) { return !/^\s*(to|from|subject|date)\s*:/i.test(l); }).join('\n');
  const words = bodyForCount.match(/\S+/g) || [];
  const wc = words.length;
  const lo = Math.round(target * 0.9), hi = Math.round(target * 1.1);

  /* word count */
  if (wc === 0) return [{ status: 'bad', html: 'No text yet – paste your text above and press <b>Check my text</b>.' }];
  if (wc < lo) add('bad', '<b>' + wc + ' words</b> – below the safe range (' + lo + '–' + hi + ' for a ~' + target + '-word task). Develop your bullet points further.');
  else if (wc > hi) add('bad', '<b>' + wc + ' words</b> – above the safe range (' + lo + '–' + hi + '). Cut repetition and filler; more text = more error opportunities.');
  else add('ok', '<b>' + wc + ' words</b> – inside the safe range (' + lo + '–' + hi + '). ');

  /* paragraphs */
  const paras = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  if (paras.length < 4) add('warn', '<b>' + paras.length + ' paragraph' + (paras.length === 1 ? '' : 's') + ' detected.</b> A Matura text usually needs 5–6 blocks (intro + one per bullet + conclusion). Separate paragraphs with an empty line.');
  else add('ok', '<b>' + paras.length + ' paragraphs</b> – structure looks deliberate.');

  /* register */
  const contr = text.match(CONTRACTIONS) || [];
  const informalHits = INFORMAL.filter(wrd => new RegExp('\\b' + wrd.replace(/ /g, '\\s+') + '\\b', 'i').test(text));
  if (FORMAL_TYPES[type]) {
    if (contr.length) add('bad', '<b>' + contr.length + ' contraction' + (contr.length > 1 ? 's' : '') + '</b> found (' + contr.slice(0, 5).map(c => '<code>' + esc(c) + '</code>').join(' ') + (contr.length > 5 ? ' …' : '') + ') – write the full forms in formal texts. (This affects Range/register, not Accuracy.)');
    else add('ok', 'No contractions – correct for a formal text.');
    if (informalHits.length) add('warn', 'Possibly informal wording: ' + informalHits.slice(0, 6).map(w => '<code>' + esc(w) + '</code>').join(' ') + '. Replace with formal alternatives.');
  } else {
    add('info', (contr.length ? contr.length + ' contractions found – fine for a ' + type + '.' : 'No contractions found. For a ' + (type === 'leaflet' ? 'leaflet, keep it persuasive and reader-friendly, but not personal or slangy.' : type + ', a personal, natural voice is welcome.')));
  }

  /* linkers */
  const found = LINKERS.filter(l => new RegExp('\\b' + l.replace(/ /g, '\\s+') + '\\b', 'i').test(text));
  const narrativeType = type === 'blog' || type === 'article';
  if (found.length >= 5) add('ok', '<b>' + found.length + ' different linking devices</b> found: ' + found.slice(0, 8).map(l => '<code>' + esc(l) + '</code>').join(' ') + (found.length > 8 ? ' …' : ''));
  else if (narrativeType) add('info', '<b>' + found.length + ' linking device' + (found.length === 1 ? '' : 's') + '</b> detected (' + (found.map(l => '<code>' + esc(l) + '</code>').join(' ') || 'none') + '). In a narrative text, linking through pronouns and time markers is fine – a few clear connectors are enough.');
  else add('warn', 'Only <b>' + found.length + ' B2 linking device' + (found.length === 1 ? '' : 's') + '</b> detected (' + (found.map(l => '<code>' + esc(l) + '</code>').join(' ') || 'none') + '). Aim for at least 5 different ones.');

  /* complex structures */
  const passive = (text.match(/\b(is|are|was|were|been|being|be)\s+\w+(ed|en)\b/gi) || []).length;
  const rel = (text.match(/\b(which|who|whose)\b/gi) || []).length;
  const cond = /\bif\b/i.test(text) && /\bwould\b/i.test(text);
  const signals = [];
  if (passive) signals.push(passive + '× possible passive');
  if (rel) signals.push(rel + '× relative pronoun (which/who/whose)');
  if (cond) signals.push('a conditional pattern (if … would)');
  if (signals.length >= 2) add('ok', '<b>Complex structures:</b> ' + signals.join(', ') + ' – good for your Range score. (Rough automatic estimate.)');
  else add('warn', '<b>Few complex structures detected</b> (' + (signals.join(', ') || 'none') + '). Work in a passive, a conditional or a relative clause – simple-only grammar caps your Range.');

  /* sentence stats */
  const sentences = text.replace(/\n+/g, ' ').split(/[.!?]+\s/).filter(s => s.trim().split(/\s+/).length > 2);
  if (sentences.length) {
    const lens = sentences.map(s => s.trim().split(/\s+/).length);
    const avg = Math.round(lens.reduce((a, b) => a + b, 0) / lens.length);
    const maxLen = Math.max.apply(null, lens), minLen = Math.min.apply(null, lens);
    if (maxLen - minLen < 8) add('warn', 'Sentence lengths are uniform (avg ' + avg + ' words, range ' + minLen + '–' + maxLen + '). Mix short, punchy sentences with longer complex ones.');
    else add('ok', 'Sentence variety: avg ' + avg + ' words, range ' + minLen + '–' + maxLen + ' – good rhythm.');
    const starters = {};
    sentences.forEach(s => { const w = (s.trim().split(/\s+/)[0] || '').toLowerCase().replace(/[^a-z']/g, ''); if (w) starters[w] = (starters[w] || 0) + 1; });
    const rep = Object.keys(starters).filter(w => starters[w] >= 4);
    if (rep.length) add('warn', 'Sentence starter repeated: ' + rep.map(w => '<code>' + esc(w) + '</code> (' + starters[w] + '×)').join(', ') + '. Vary your openings.');
  }

  /* questions / exclamations */
  const qs = (text.match(/\?/g) || []).length;
  const ex = (text.match(/!/g) || []).length;
  if (type === 'essay' && qs > 1) add('warn', qs + ' question marks – in an essay, at most one rhetorical question (in the introduction).');
  if ((type === 'article' || type === 'blog') && qs === 0) add('warn', 'No rhetorical questions – articles and blogs should engage the reader directly.');
  if (FORMAL_TYPES[type] && ex > 0) add('bad', ex + ' exclamation mark' + (ex > 1 ? 's' : '') + ' – not appropriate in a formal ' + type + '.');

  /* type-specific structure */
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  if (type === 'email') {
    const hasHeader = /to\s*:/i.test(text) && /from\s*:/i.test(text) && /subject\s*:/i.test(text) && /date\s*:/i.test(text);
    add(hasHeader ? 'ok' : 'bad', hasHeader ? 'Header complete (To / From / Date / Subject).' : '<b>Header incomplete</b> – a formal e-mail needs To, From, Date AND Subject lines.');
    const dearSir = /dear\s+(sir|madam|editor)/i.test(text);
    const dearName = /dear\s+(mr|ms|mrs|dr)\.?\s+\w+/i.test(text);
    const faith = /yours\s+faithfully/i.test(text);
    const sinc = /yours\s+sincerely/i.test(text);
    if (!dearSir && !dearName) add('bad', 'No formal greeting found – open with <code>Dear Sir or Madam,</code> or <code>Dear Mr/Ms [Name],</code>.');
    if (!faith && !sinc) add('bad', 'No sign-off found – close with <code>Yours faithfully,</code> (name unknown) or <code>Yours sincerely,</code> (name known).');
    if (dearSir && sinc) add('bad', '<b>Mismatch:</b> "Dear Sir or Madam" must pair with <code>Yours faithfully</code>, not "sincerely".');
    if (dearName && faith) add('bad', '<b>Mismatch:</b> a named greeting (Dear Mr/Ms …) must pair with <code>Yours sincerely</code>.');
    if ((dearSir && faith) || (dearName && sinc)) add('ok', 'Greeting and sign-off match correctly.');
  }
  if (type === 'report') {
    const hasHeader = /from\s*:/i.test(text) && /subject\s*:/i.test(text) && /date\s*:/i.test(text);
    add(hasHeader ? 'ok' : 'bad', hasHeader ? 'Header complete (Date / From / Subject).' : '<b>Header incomplete</b> – a report needs Date, From and Subject lines.');
    const headings = lines.filter(l => { const tt = l.trim(); return tt.length > 0 && tt.split(/\s+/).length <= 6 && !/[.!?;,]$/.test(tt) && !/^(date|from|subject|to)\b/i.test(tt) && !/^report$/i.test(tt); }).length;
    add(headings >= 3 ? 'ok' : 'warn', headings >= 3 ? headings + ' section headings found.' : 'Only ' + headings + ' section heading' + (headings === 1 ? '' : 's') + ' detected – give each section a short, clear heading such as Introduction, Findings or Recommendations. They do not need numbers.');
    if (/dear\s+(sir|madam)/i.test(text)) add('bad', 'Reports have <b>no greeting</b> – delete "Dear Sir or Madam".');
    const opinion = (text.match(/\bI (think|believe|feel)\b/gi) || []).length;
    if (opinion > 1) add('warn', '"I think/believe/feel" appears ' + opinion + '× – keep opinion out of the body; only the recommendations may carry careful suggestions.');
  }
  if (type === 'essay' || type === 'article') {
    const first = lines[0] || '';
    const looksTitle = first.length > 0 && first.split(/\s+/).length <= 12 && !/[.:,]$/.test(first) && !/^(dear|to:|from:)/i.test(first);
    add(looksTitle ? 'ok' : 'warn', looksTitle ? 'First line looks like a title: <code>' + esc(first) + '</code>' : 'No title detected – ' + (type === 'essay' ? 'essays need a clear title on the first line.' : 'articles need a catchy title on the first line.'));
  }
  if (type === 'blog') {
    add('info', 'Blog post: username + date/time at the top, catchy title, and an invitation to comment at the end. Blog comment: NO title – reference the original post in sentence one.');
    if (!/\?/.test(text)) add('warn', 'Consider ending with a question to invite comments.');
  }
  if (type === 'essay') {
    const anecdote = (text.match(/\b(my|me|I was|when I)\b/gi) || []).length;
    if (anecdote > 6) add('warn', 'Lots of first-person/personal phrasing – essays argue with generalisations, not personal stories. ("It is often the case that…" instead of "When I was…")');
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
  add('info', 'This is a quick robot check of the surface. It cannot judge your ideas or your accuracy; for real feedback, use the AI prompt below or ask your teacher.');
  return f;
}
PAGES.selfcheck = {
  title: 'Self-check studio', track: 'selfcheck',
  render() {
    return '<div class="page">' +
      pageHead('Tool', 'Self-check studio', 'Paste your practice text for a quick convention check: word count, register, layout. For real feedback, copy the ready-made AI prompt at the bottom.') +
      '<div class="wrap" style="max-width:860px"><div class="gap-s"></div>' +
        '<div class="acc" style="margin-bottom:22px"><div class="acc-item"><button class="acc-head" data-action="acc" aria-expanded="false"><span class="pm">+</span><span>How this check works, and what it cannot do</span></button>' +
        '<div class="acc-body">' +
          '<ol style="margin:12px 0 0 18px;font-size:.9rem;color:var(--text-secondary);line-height:1.7">' +
            '<li>Choose the text type and your target word count.</li>' +
            '<li>Paste your practice text into the box.</li>' +
            '<li>Press <strong>Check my text</strong> for instant notes on length, register, layout and the conventions of that text type.</li>' +
          '</ol>' +
          '<p style="font-size:.875rem;color:var(--text-muted);line-height:1.6;margin-top:13px">It scans the surface only. It cannot judge your ideas or catch every grammar slip, so treat the notes as a quick second pair of eyes. For real feedback, copy the AI prompt it builds for you, or ask your teacher.</p>' +
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
        '<div class="field" style="margin-bottom:16px"><label for="scTask">The task you answered (optional, but it makes the AI prompt much better)</label>' +
          '<textarea id="scTask" rows="3" placeholder="Paste the task here, including the three bullet points…"></textarea></div>' +
        '<div class="field"><label for="scText">Your text <span id="scLive" style="margin-left:8px;color:var(--text-secondary)"></span></label>' +
          '<textarea id="scText" rows="14" placeholder="Paste or type your practice text here…"></textarea></div>' +
        '<div style="display:flex;gap:8px;margin-top:16px;flex-wrap:wrap">' +
          '<button class="btn btn-primary" data-action="sc-run">Check my text</button>' +
          '<button class="btn btn-ghost" data-action="sc-prompt">Copy AI feedback prompt</button>' +
        '</div>' +
        '<div style="margin-top:8px;font-size:.8125rem;color:var(--text-muted);line-height:1.5">The AI prompt copies your text plus the official SRDP criteria. When you paste it into ChatGPT, Claude or another tool, your text is sent to that provider, so use a practice text and leave out real names or personal details. An AI score is only rough practice feedback, not your real Matura mark. Nothing leaves this page unless you paste it there yourself. Your school may also have its own rules about using AI tools – follow those first.</div>' +
        '<div id="scResults" style="margin-top:28px"></div>' +
        '<div id="scRating">' + (M.scRatingBlock ? M.scRatingBlock() : '') + '</div>' +
        '<div style="height:72px"></div>' +
      '</div></div>';
  },
  wire() {
    const txt = M.$('#scText'), live = M.$('#scLive');
    const upd = () => {
      const wc = (txt.value.match(/\S+/g) || []).length;
      const t = +M.$('#scTarget').value;
      const lo = Math.round(t * 0.9), hi = Math.round(t * 1.1);
      live.textContent = wc + ' words' + (wc ? ' (target ' + lo + '–' + hi + ')' : '');
      live.style.color = wc >= lo && wc <= hi ? 'var(--green)' : 'var(--text-secondary)';
      try{ sessionStorage.setItem('mwg_sc_draft', txt.value); }catch(e){}
    };
    txt.addEventListener('input', upd);
    M.$('#scTarget').addEventListener('change', () => { scState.target = +M.$('#scTarget').value; upd(); });
    M.$('#scType').addEventListener('change', () => { scState.type = M.$('#scType').value; });
    try{ var d = sessionStorage.getItem('mwg_sc_draft'); if (d && !txt.value) txt.value = d; }catch(e){}
    upd();
  },
};
window.MWG.analyze = analyze;
window.MWG.scState = scState;

/* ─── TASK BANK ───────────────────────────────────────────── */
const tbState = { filter: 'all' };
function materialBox(m, col) {
  if (!m) return '';
  return '<div style="border:1px solid var(--border);border-left:3px solid ' + col + ';background:var(--surface-1);padding:13px 17px;margin-bottom:12px">' +
    '<div style="font-size:.6875rem;letter-spacing:.32px;color:var(--text-muted);margin-bottom:5px;text-transform:uppercase">' + esc(m.label) + '</div>' +
    (m.source ? '<div style="font-size:.8125rem;font-weight:600;color:var(--text);margin-bottom:7px">' + esc(m.source) + '</div>' : '') +
    (m.kind === 'data'
      ? '<ul style="margin:0;padding-left:18px;font-size:.8425rem;color:var(--text-secondary);line-height:1.7">' + m.lines.map(l => '<li>' + esc(l) + '</li>').join('') + '</ul>'
      : m.lines.map(l => '<div style="font-size:.8425rem;color:var(--text-secondary);line-height:1.65;font-style:italic">' + esc(l) + '</div>').join('')) +
  '</div>';
}
function materialText(m) {
  if (!m) return '';
  return '\n\n' + m.label.toUpperCase() + (m.source ? '\n' + m.source : '') + '\n' + (m.kind === 'data' ? m.lines.map(l => '• ' + l).join('\n') : m.lines.join('\n'));
}
function taskCard(p, i) {
  const t = SRDP.textTypes.find(x => x.id === p.type);
  const col = t ? TYPE_COLORS[t.color] : 'var(--primary)';
  const origIdx = SRDP.prompts.indexOf(p);
  const full = p.scenario + materialText(p.material) + '\n\n' + p.instruction + '\n\nIn your ' + (t ? t.name.toLowerCase() : 'text') + ' you should:\n• ' + p.bullets.join('\n• ');
  return '<div class="card" data-task-i="' + origIdx + '" style="border-top:1px solid var(--border)">' +
    '<div style="display:flex;gap:10px;margin-bottom:10px;flex-wrap:wrap;align-items:center">' +
      '<span style="display:inline-flex;align-items:center;gap:6px;font-size:.75rem;font-weight:600"><span style="width:8px;height:8px;background:' + col + '"></span>' + (t ? t.name : p.type) + '</span>' +
      '<span class="badge">~' + p.length + ' words</span>' +
    '</div>' +
    '<div style="font-size:1rem;font-weight:600;margin-bottom:8px">' + esc(p.topic) + '</div>' +
    '<div style="font-size:.875rem;color:var(--text-secondary);line-height:1.55;margin-bottom:10px">' + esc(p.scenario) + '</div>' +
    materialBox(p.material, col) +
    '<div style="font-size:.875rem;color:var(--text);line-height:1.55;margin-bottom:8px">' + esc(p.instruction) + '</div>' +
    '<ul style="margin:0 0 14px;padding-left:20px;font-size:.875rem;color:var(--text-muted);line-height:1.7">' + p.bullets.map(b => '<li>' + esc(b) + '</li>').join('') + '</ul>' +
    '<div style="display:flex;gap:8px;flex-wrap:wrap">' +
      '<button class="btn btn-ghost btn-sm" data-copy="' + esc(full) + '">Copy task</button>' +
      '<a class="btn btn-ghost btn-sm" href="#selfcheck">Write &amp; self-check →</a>' +
    '</div>' +
  '</div>';
}
function tbPrompts() {
  const ids = M.typesForSchool().map(t => t.id);
  const bhs = M.school() === 'bhs';
  return SRDP.prompts.map((p, i) => ({ p, i })).filter(x => ids.indexOf(x.p.type) >= 0 && (!bhs || x.p.length <= 250));
}
function genPrompt() {
  const cfg = M.schoolConfig();
  const types = M.school() === 'ahs'
    ? 'essay (~400 words), or article, report, blog or e-mail (~250 words)'
    : 'article, report, blog, e-mail or leaflet (~250 words)';
  return 'You are an experienced Austrian English teacher. Generate ONE realistic writing task for the standardised SRDP exam (' + (cfg.long || 'AHS') + ', English B2), text type of your choice: ' + types + '. Format: a 1–2 sentence situation; any input material the text type needs (a short statement or quotation to respond to, 4–5 survey figures for a report, a 3–4 sentence excerpt for a letter to the editor or blog comment, an advertisement for an application, or a topic and target audience for a persuasive task); a clear instruction naming text type, audience and word count; and exactly three bullet points, each starting with an operator (describe, explain, suggest…). Then ask me to write the text and wait. After I submit it, assess it with the four SRDP criteria (Task Achievement, Coherence and Cohesion, Lexical and Structural Range, Lexical and Structural Accuracy), each 0–10, with brief justifications and my five most important errors.';
}
function tbList() {
  let list = tbPrompts();
  if (tbState.filter !== 'all') list = list.filter(x => x.p.type === tbState.filter);
  return list.map(x => taskCard(x.p, x.i)).join('');
}
const TOPIC_VOCAB = [
  { topic: "Environment & climate", words: [
    { w: "climate change", hint: "The long-term change in the Earth's weather patterns. Works as the subject of strong openings: 'Climate change affects every one of us.'" },
    { w: "carbon footprint", hint: "The amount of CO2 your lifestyle produces. Often with 'reduce': 'Flying less is the fastest way to reduce your carbon footprint.'" },
    { w: "renewable energy sources", hint: "Wind, solar, hydro – energy that does not run out. 'Austria invests heavily in renewable energy sources.'" },
    { w: "greenhouse gas emissions", hint: "The gases that heat up the planet. Usually with 'cut' or 'reduce': 'The EU wants to cut greenhouse gas emissions by 2030.'" },
    { w: "to cut down on waste", hint: "To reduce the amount you throw away. 'Schools could cut down on waste by banning plastic bottles.'" },
    { w: "a throwaway society", hint: "A society that buys, uses and bins things quickly. Good for critical writing: 'We live in a throwaway society.'" },
    { w: "environmentally friendly", hint: "Not harmful to nature. Describes products, habits, choices: 'an environmentally friendly alternative'." },
    { w: "to raise awareness of", hint: "To make people notice a problem. 'The campaign raises awareness of plastic pollution.'" },
    { w: "sustainable development", hint: "Growth that does not destroy resources for the future. A key term in formal texts and reports." },
    { w: "to tackle pollution", hint: "To deal with pollution seriously. 'Tackle' also works with problems, causes, issues." },
    { w: "single-use plastic", hint: "Plastic you use once and throw away – straws, cups, bags. 'The EU has banned many single-use plastics.'" },
    { w: "to combat global warming", hint: "To fight against global warming. More formal than 'fight': perfect for reports and articles." },
  ] },
  { topic: "Social media & technology", words: [
    { w: "to scroll through a feed", hint: "To move through posts on a screen, often mindlessly. 'I caught myself scrolling through my feed for an hour.'" },
    { w: "screen time", hint: "The hours you spend looking at screens. 'Parents worry about their children's screen time.'" },
    { w: "a digital detox", hint: "A planned break from phones and social media. 'A weekend digital detox did me a world of good.'" },
    { w: "to go viral", hint: "To spread extremely fast online. 'The video went viral within hours.'" },
    { w: "an online presence", hint: "How you appear on the internet – profiles, posts, photos. 'Employers check applicants' online presence.'" },
    { w: "to spread fake news", hint: "To pass on false information as if it were true. 'Bots spread fake news faster than humans can correct it.'" },
    { w: "data privacy", hint: "Control over who sees and uses your personal information. 'Teenagers care more about data privacy than adults think.'" },
    { w: "to stay connected", hint: "To keep in contact, especially over distance. 'Social media helps families stay connected across continents.'" },
    { w: "information overload", hint: "Too much information to process. 'Constant notifications lead to information overload.'" },
    { w: "a filter bubble", hint: "An online space where you only see opinions you already agree with. Strong term for writing on social media." },
    { w: "cyberbullying", hint: "Bullying that happens online. 'Victims of cyberbullying cannot simply walk away.'" },
    { w: "to disconnect from devices", hint: "To switch off and step away from technology. 'Learning to disconnect from devices is a skill in itself.'" },
  ] },
  { topic: "Education & school", words: [
    { w: "to sit an exam", hint: "To take an exam (British English). 'Austrian students sit their final exams in May.'" },
    { w: "lifelong learning", hint: "Continuing to learn long after school. A favourite in articles about the future of work." },
    { w: "a heavy workload", hint: "A large amount of work to manage. 'Students complain about a heavy workload in their final year.'" },
    { w: "to fall behind", hint: "To make slower progress than the others. 'Without support, weaker students quickly fall behind.'" },
    { w: "extracurricular activities", hint: "Clubs, sports and projects outside normal lessons. 'Universities value extracurricular activities.'" },
    { w: "distance learning", hint: "Learning from home via the internet. 'Distance learning tested everyone's self-discipline.'" },
    { w: "academic pressure", hint: "Stress caused by the demand for good marks. 'Academic pressure peaks in the Matura year.'" },
    { w: "to broaden your horizons", hint: "To widen your experience and understanding. 'A term abroad broadens your horizons.'" },
    { w: "a well-rounded education", hint: "An education that develops many different skills, not just exam knowledge." },
    { w: "to retake a subject", hint: "To repeat an exam or course you failed. 'She had to retake maths in autumn.'" },
    { w: "peer pressure", hint: "The push to do what people your age do. 'Peer pressure shapes what teenagers wear, watch and buy.'" },
    { w: "to develop key skills", hint: "To build the central abilities you need. Common in formal texts: 'Group projects develop key skills.'" },
  ] },
  { topic: "Health & lifestyle", words: [
    { w: "a balanced diet", hint: "Eating a healthy mix of foods. 'A balanced diet does more than any miracle product.'" },
    { w: "to lead an active lifestyle", hint: "To live in a way that includes regular movement. 'Cycling to school is an easy way to lead an active lifestyle.'" },
    { w: "mental health", hint: "The state of your mind and emotions. 'Schools finally talk openly about mental health.'" },
    { w: "to put on weight", hint: "To become heavier. Neutral phrasing: 'Many students put on weight in stressful phases.'" },
    { w: "a work-life balance", hint: "The balance between job or school and free time. 'A healthy work-life balance prevents burnout.'" },
    { w: "to burn off calories", hint: "To use up energy through movement. 'A brisk walk burns off more calories than you think.'" },
    { w: "a sedentary lifestyle", hint: "A lifestyle with too much sitting. Formal and precise – great for reports on health." },
    { w: "to cope with stress", hint: "To manage stress successfully. 'Sport helps me cope with stress before exams.'" },
    { w: "to stay in shape", hint: "To remain fit. 'You do not need a gym membership to stay in shape.'" },
    { w: "sleep deprivation", hint: "Not getting enough sleep. 'Sleep deprivation ruins concentration faster than any distraction.'" },
    { w: "preventive healthcare", hint: "Medicine that stops illness before it starts – check-ups, vaccinations, healthy habits." },
    { w: "to get into shape", hint: "To become fit (after not being fit). 'He got into shape for the ski season.'" },
  ] },
  { topic: "Work & career", words: [
    { w: "to apply for a job", hint: "To formally ask for a position. 'She applied for a summer job at a local hotel.'" },
    { w: "job satisfaction", hint: "How happy work makes you. 'For many, job satisfaction matters more than salary.'" },
    { w: "a steady income", hint: "Regular, reliable money. 'A steady income gives you freedom to plan.'" },
    { w: "to climb the career ladder", hint: "To move up to better positions. 'She climbed the career ladder within five years.'" },
    { w: "work experience", hint: "Practical experience of working. 'An internship gives you valuable work experience.'" },
    { w: "a nine-to-five job", hint: "A standard office job with fixed hours. Often slightly negative: 'He never wanted a nine-to-five job.'" },
    { w: "to be self-employed", hint: "To work for yourself instead of a company. 'Being self-employed means freedom – and risk.'" },
    { w: "job security", hint: "How safe your job is from being lost. 'Public sector jobs offer more job security.'" },
    { w: "to work remotely", hint: "To work from home or anywhere outside the office. 'Half the team works remotely on Fridays.'" },
    { w: "to meet a deadline", hint: "To finish work on time. 'Journalists live from deadline to deadline.'" },
    { w: "a competitive field", hint: "An area where many people fight for few positions. 'Medicine is a highly competitive field.'" },
    { w: "transferable skills", hint: "Skills useful in any job – teamwork, communication, problem-solving." },
  ] },
  { topic: "Travel & tourism", words: [
    { w: "to broaden the mind", hint: "Travel makes you more open and understanding. 'Travel broadens the mind' is a classic opener – use it with a twist." },
    { w: "mass tourism", hint: "Tourism in huge, damaging numbers. 'Mass tourism is slowly destroying the places it loves.'" },
    { w: "off the beaten track", hint: "Away from the usual tourist routes. 'We found a village completely off the beaten track.'" },
    { w: "a once-in-a-lifetime trip", hint: "A journey you will probably only make once. 'For my grandparents, it was a once-in-a-lifetime trip.'" },
    { w: "to immerse yourself in a culture", hint: "To dive deeply into local life. 'Living with a host family lets you immerse yourself in the culture.'" },
    { w: "eco-tourism", hint: "Travel designed to protect nature and support locals. Useful contrast to mass tourism." },
    { w: "a tourist hotspot", hint: "A place crowded with visitors. 'Hallstatt has become a tourist hotspot.'" },
    { w: "to travel on a budget", hint: "To travel cheaply. 'Interrail is the classic way to travel on a budget.'" },
    { w: "cultural exchange", hint: "Sharing traditions and views between cultures. 'School partnerships create real cultural exchange.'" },
    { w: "to soak up the atmosphere", hint: "To enjoy the feeling of a place. 'We sat in the square and soaked up the atmosphere.'" },
    { w: "overtourism", hint: "When too many tourists overwhelm a place. Modern, precise term – examiners notice it." },
    { w: "a culture shock", hint: "The confusion of meeting a very different culture. 'Moving from a village to Tokyo was a culture shock.'" },
  ] },
  { topic: "Consumerism & money", words: [
    { w: "to live beyond your means", hint: "To spend more than you earn. 'Credit cards make it easy to live beyond your means.'" },
    { w: "an impulse buy", hint: "Something you buy without planning. 'The chocolate at the checkout is a classic impulse buy.'" },
    { w: "to save up for", hint: "To collect money for something specific. 'She is saving up for a year abroad.'" },
    { w: "fast fashion", hint: "Cheap clothing produced quickly and thrown away quickly. A key term for writing on consumption." },
    { w: "a throwaway culture", hint: "A culture of using things once and binning them. Works well paired with fast fashion." },
    { w: "value for money", hint: "Good quality for the price paid. 'The hostel was basic but great value for money.'" },
    { w: "to be in debt", hint: "To owe money. 'Many students leave university deeply in debt.'" },
    { w: "to spend money wisely", hint: "To make sensible spending choices. 'Learning to spend money wisely should be taught at school.'" },
    { w: "a tight budget", hint: "Very little money to work with. 'We planned the trip on a tight budget.'" },
    { w: "conspicuous consumption", hint: "Buying expensive things to show off. Advanced term – use it once, precisely." },
    { w: "to cut back on spending", hint: "To reduce how much you spend. 'Families cut back on spending when prices rise.'" },
    { w: "ethical shopping", hint: "Buying with attention to people and planet. 'Ethical shopping costs more – but who pays otherwise?'" },
  ] },
  { topic: "Society & community", words: [
    { w: "to volunteer for a good cause", hint: "To work unpaid for something worthwhile. 'Thousands volunteer for good causes every weekend.'" },
    { w: "a sense of belonging", hint: "The feeling of being part of a group. 'Clubs give young people a sense of belonging.'" },
    { w: "social inequality", hint: "The unfair gap between rich and poor. 'Education is the best answer to social inequality.'" },
    { w: "to give something back", hint: "To return help to your community. 'After her career, she wanted to give something back.'" },
    { w: "an ageing population", hint: "A society with more and more old people. Standard term in reports and articles on society." },
    { w: "cultural diversity", hint: "The variety of cultures in one place. 'Vienna's cultural diversity is one of its greatest strengths.'" },
    { w: "to bridge the gap", hint: "To reduce the distance between groups. 'Sport can bridge the gap between generations.'" },
    { w: "community spirit", hint: "The feeling of togetherness in a neighbourhood. 'The flood revealed an amazing community spirit.'" },
    { w: "to integrate into society", hint: "To become a full part of a society. 'Language courses help newcomers integrate into society.'" },
    { w: "equal opportunities", hint: "The same chances for everyone. 'Equal opportunities remain a goal, not a reality.'" },
    { w: "a multicultural society", hint: "A society made up of many cultures. Neutral, factual term for reports." },
    { w: "to break down barriers", hint: "To remove obstacles between people. 'Music breaks down barriers that words cannot.'" },
  ] },
  { topic: "AI & the digital future", words: [
    { w: "artificial intelligence (AI)", hint: "Computer systems that perform tasks needing human-like thinking. Write it out once, then use 'AI'." },
    { w: "an AI-generated text", hint: "A text written by a machine. 'Teachers are learning to spot AI-generated texts.'" },
    { w: "a deepfake video", hint: "A fake but realistic video created with AI. 'Deepfake videos make it harder to trust what we see.'" },
    { w: "to automate routine tasks", hint: "To let machines do repetitive work. 'AI automates routine tasks so people can focus on ideas.'" },
    { w: "to be replaced by a machine", hint: "To lose your job or role to technology. 'Not every job can be replaced by a machine.'" },
    { w: "to rely too heavily on AI", hint: "To depend on AI so much that your own skills suffer. 'Students who rely too heavily on AI stop learning.'" },
    { w: "digital literacy", hint: "The ability to use and judge digital tools sensibly. 'Digital literacy is as basic as reading now.'" },
    { w: "to regulate new technologies", hint: "To set legal rules for technology. 'The EU was the first to regulate new technologies like AI.'" },
    { w: "an algorithm", hint: "The set of rules a computer follows to decide something. 'An algorithm decides what you see next.'" },
    { w: "human oversight", hint: "Humans checking and controlling what machines do. 'Every AI system needs human oversight.'" },
    { w: "to raise ethical concerns", hint: "To create questions about right and wrong. 'Facial recognition raises serious ethical concerns.'" },
    { w: "to adapt to technological change", hint: "To adjust to a world changed by technology. 'Schools must adapt to technological change, not ignore it.'" },
  ] },
  { topic: "Media & news", words: [
    { w: "to keep up with the news", hint: "To stay informed about current events. 'Most teenagers keep up with the news on their phones.'" },
    { w: "a reliable source", hint: "A source you can trust. 'Check whether the claim comes from a reliable source.'" },
    { w: "to spread disinformation", hint: "To distribute deliberately false information. Stronger and more precise than 'fake news'." },
    { w: "media literacy", hint: "The ability to understand and question media. 'Media literacy should be a school subject of its own.'" },
    { w: "a paywall", hint: "A barrier that makes you pay to read articles. 'Quality journalism increasingly sits behind a paywall.'" },
    { w: "public service broadcasting", hint: "Radio and TV financed by the public, like the ORF or the BBC. Useful in writing on trustworthy news." },
    { w: "investigative journalism", hint: "Journalism that uncovers hidden facts. 'Investigative journalism brought the scandal to light.'" },
    { w: "a news outlet", hint: "A company that publishes news – paper, site or channel. 'Compare how two news outlets report the same story.'" },
    { w: "to fact-check a claim", hint: "To check whether a statement is true. 'Fact-check a claim before you share it.'" },
    { w: "clickbait headlines", hint: "Headlines designed only to make you click. 'Clickbait headlines promise more than the article delivers.'" },
    { w: "freedom of the press", hint: "The right of media to report without state control. 'Democracy dies without freedom of the press.'" },
    { w: "to quote somebody out of context", hint: "To repeat words in a misleading way. 'The minister claimed she had been quoted out of context.'" },
  ] },
  { topic: "Migration & global citizenship", words: [
    { w: "to flee a war zone", hint: "To escape from an area at war. 'Millions have fled war zones in recent years.'" },
    { w: "to seek asylum", hint: "To officially ask another country for protection. 'The family sought asylum in Austria.'" },
    { w: "a refugee camp", hint: "A temporary settlement for people who have fled. 'She spent two years in a refugee camp before moving on.'" },
    { w: "to integrate into a new society", hint: "To become part of a new country's life. 'Work and language are the keys to integrating into a new society.'" },
    { w: "a residence permit", hint: "The official document allowing you to live in a country. 'Without a residence permit, nothing else is possible.'" },
    { w: "to face discrimination", hint: "To be treated unfairly because of who you are. 'Many newcomers face discrimination when looking for flats.'" },
    { w: "a sense of global responsibility", hint: "The feeling that world problems concern us all. 'Climate change demands a sense of global responsibility.'" },
    { w: "to overcome a language barrier", hint: "To manage communication despite different languages. 'Children overcome language barriers astonishingly fast.'" },
    { w: "a skilled worker", hint: "Someone with valuable professional training. 'Austria actively recruits skilled workers from abroad.'" },
    { w: "cultural identity", hint: "The feeling of belonging to a particular culture. 'You can build a new life without giving up your cultural identity.'" },
    { w: "to build a new life", hint: "To start again in a new place. 'They arrived with two suitcases and built a new life.'" },
    { w: "humanitarian aid", hint: "Emergency help – food, shelter, medicine. 'Humanitarian aid reaches the camps by convoy.'" },
  ] },
];
/* pdf/topic-vocabulary.pdf deckt alle 11 Themen ab (via _dev/make-pdf.mjs). */
PAGES.topicvocab = {
  title: 'Topic vocabulary', track: 'topicvocab',
  render() {
    return '<div class="page">' +
      pageHead('Tool', 'Topic vocabulary', 'Collocations for the most common Matura topics. Topic-specific vocabulary is what lifts your Lexical Range score above the safe basics. Open a topic and click any phrase to copy it.') +
      '<div class="wrap"><div class="gap-s"></div>' +
        '<div class="no-print" style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:20px"><button class="btn btn-primary" data-action="flash-start" data-topic="all">Practise all topics as flashcards <span>→</span></button><a class="btn btn-ghost" href="pdf/topic-vocabulary.pdf" target="_blank" rel="noopener">Download as a PDF <span>&darr;</span></a></div>' +
        '<div class="tip" style="margin-bottom:22px">Phrases here are for the <strong>content</strong> of your text (the ideas in your body paragraphs). For structure and linking, use the <a href="#phrasebank">phrase bank</a>.</div>' +
        '<div class="acc">' + TOPIC_VOCAB.map(function(t, ti){
          var m = M.flashMastered ? M.flashMastered(ti, t.words) : 0;
          return '<div class="acc-item"><button class="acc-head" data-action="acc" aria-expanded="false"><span class="pm">+</span><span>' + esc(t.topic) + '</span><span class="sub">' + (m > 0 ? m + '/' + t.words.length + ' mastered · ' : '') + t.words.length + ' phrases</span></button>' +
          '<div class="acc-body">' + M.chips(t.words.map(function(x){ return x.w; })) +
            '<div style="margin-top:16px"><button class="btn btn-ghost btn-sm no-print" data-action="flash-start" data-topic="' + ti + '">Practise as flashcards <span>→</span></button></div>' +
          '</div></div>'; }).join('') +
        '</div>' +
        '<div style="height:72px"></div>' +
      '</div></div>';
  },
};
PAGES.taskbank = {
  title: 'Task bank', track: 'taskbank',
  render() {
    return '<div class="page">' +
      pageHead('Tool', 'Task bank', tbPrompts().length + ' Matura-style writing tasks, each with the material you need: survey data for reports, source texts for letters and comments, and statements or topics to respond to. Pick one yourself or roll the dice.') +
      '<div class="wrap" style="max-width:860px"><div class="gap-s"></div>' +
        '<div class="tip" style="margin-bottom:18px">These ' + tbPrompts().length + ' tasks are Matura-style, built for practice. The officially released past papers are in the BMB download area: <a href="https://www.matura.gv.at/downloads" target="_blank" rel="noopener">matura.gv.at/downloads</a>.</div>' +
        '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;border-bottom:1px solid var(--border)">' +
          '<div class="tabs">' +
            [['all', 'All']].concat(M.typesForSchool().map(t => [t.id, t.name])).map(f =>
              '<button class="tab' + (tbState.filter === f[0] ? ' active' : '') + '" data-action="tb-filter" data-f="' + f[0] + '">' + f[1] + '</button>').join('') +
          '</div>' +
          '<button class="btn btn-primary btn-sm no-print" data-action="tb-random" style="margin-bottom:6px">🎲 Random task</button>' +
        '</div>' +
        '<div id="tbRandom"></div>' +
        '<div id="tbList" style="border:1px solid var(--border);border-top:none;margin-top:0">' + tbList() + '</div>' +
        '<div class="gap-s"></div>' +
        '<div class="tip">Want endless new tasks? Copy this generator prompt into ChatGPT or Claude: ' +
          '<button class="btn btn-ghost btn-sm" style="margin-left:8px" data-copy="' + esc(genPrompt()) + '">Copy generator prompt</button>' +
        '</div>' +
        '<div style="height:72px"></div>' +
      '</div></div>';
  },
};
window.MWG.tbState = tbState;
window.MWG.TOPIC_VOCAB = TOPIC_VOCAB;
window.MWG.tbList = tbList;
window.MWG.tbPrompts = tbPrompts;
window.MWG.taskCard = taskCard;
})();
