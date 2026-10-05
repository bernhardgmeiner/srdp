/* ════════════════════════════════════════════════════════════
   Pages 3 – Grammar kit · Paragraph writing · Practice zone
   ════════════════════════════════════════════════════════════ */
(function () {
'use strict';
const M = window.MWG;
const { esc, sectionLabel, pageHead, PEEL } = M;
function comparisonTable() {
  const drop = M.school() === 'bhs' ? SRDP.comparison.head.indexOf('Essay') : SRDP.comparison.head.indexOf('Leaflet');
  const keep = arr => arr.filter((_, i) => i !== drop);
  return '<div class="tbl-wrap" tabindex="0" role="group" aria-label="Table (scroll sideways on small screens)"><table class="tbl"><thead><tr>' +
    keep(SRDP.comparison.head).map(h => '<th>' + esc(h) + '</th>').join('') + '</tr></thead><tbody>' +
    SRDP.comparison.rows.map(r => '<tr>' + keep(r).map((c, j) =>
      '<td class="' + (j > 0 && c === 'Yes' ? 'cell-yes' : j > 0 && c === 'No' ? 'cell-no' : '') + '">' + esc(c) + '</td>').join('') + '</tr>').join('') +
    '</tbody></table></div>';
}

/* ─── GRAMMAR KIT ─────────────────────────────────────────── */
PAGES.grammar = {
  title: 'Grammar kit', track: 'grammar',
  render() {
    const d = SRDP;
    return '<div class="page">' +
      pageHead('Reference', 'Grammar kit', d.grammar.length + ' places where German gets into your English. Each one has typical errors, corrections and a rule to remember.') +
      '<div class="wrap"><div class="gap-s"></div>' +
        sectionLabel('Common mistakes') +
        '<div class="acc">' + d.grammar.map(g =>
          '<div class="acc-item"><button class="acc-head" data-action="acc" aria-expanded="false"><span class="pm">+</span><span>' + esc(g.title) + '</span><span class="sub">' + (g.pairs ? g.pairs.length + ' examples' : g.table.length + ' items') + '</span></button>' +
          '<div class="acc-body"><p style="font-size:.9rem;color:var(--text-secondary);line-height:1.6;padding:10px 0 16px">' + esc(g.intro) + '</p>' +
            (g.pairs ? g.pairs.map(p =>
              '<div class="pair-row" style="border:1px solid var(--border);margin-bottom:8px">' +
                '<div class="pair-cell"><div class="lab wrong-c">' + (g.labels ? esc(g.labels[0]) : '✗ TYPICAL ERROR') + '</div><span style="font-family:var(--font-mono);font-size:.8125rem">' + esc(p.wrong) + '</span></div>' +
                '<div class="pair-cell"><div class="lab right-c">' + (g.labels ? esc(g.labels[1]) : '✓ CORRECT') + '</div><span style="font-family:var(--font-mono);font-size:.8125rem">' + esc(p.right) + '</span><div style="font-size:.78rem;color:var(--text-muted);margin-top:5px">' + esc(p.note) + '</div></div>' +
              '</div>').join('') : '') +
            (g.table ?
              '<div class="tbl-wrap" tabindex="0" role="group" aria-label="Table (scroll sideways on small screens)"><table class="tbl" style="min-width:520px"><thead><tr><th>You write…</th><th>You think it means…</th><th>It actually means…</th><th>Use instead</th></tr></thead><tbody>' +
              g.table.map(r => '<tr><td style="font-family:var(--font-mono)">' + esc(r.word) + '</td><td>' + esc(r.youThink) + '</td><td>' + esc(r.itMeans) + '</td><td style="color:var(--green)">' + esc(r.correct) + '</td></tr>').join('') +
              '</tbody></table></div>' : '') +
            (g.rule ? '<div class="tip" style="margin-top:12px"><strong>Rule · </strong>' + esc(g.rule) + '</div>' : '') +
          '</div></div>').join('') +
        '</div>' +
        '<div class="gap"></div>' +
        sectionLabel('B2 linking words: learn new ones') +
        '<div class="tbl-wrap" tabindex="0" role="group" aria-label="Table (scroll sideways on small screens)"><table class="tbl"><thead><tr><th>Function</th><th>B1 (don&rsquo;t rely on these)</th><th>B2 (use these)</th></tr></thead><tbody>' +
          SRDP.linkingWords.map(r => '<tr><td>' + esc(r.fn) + '</td><td class="cell-no">' + esc(r.basic) + '</td><td style="color:var(--text)">' + esc(r.b2) + '</td></tr>').join('') +
        '</tbody></table></div>' +
        '<div class="gap"></div>' +
        sectionLabel('Which text type does what?') +
        comparisonTable() +
        '<div class="gap"></div>' +
        sectionLabel('Task operators: what the verbs in a task ask for') +
        '<div class="acc">' + SRDP.operators.map(o =>
          '<div class="day-row" style="grid-template-columns:170px 1fr"><div class="d">' + esc(o.op) + '</div><div class="c">' + esc(o.what) + '<div style="font-family:var(--font-mono);font-size:.78rem;color:var(--text-muted);margin-top:6px">&ldquo;' + esc(o.ex) + '&rdquo;</div></div></div>').join('') +
        '</div>' +
        '<div class="page-end"></div>' +
      '</div></div>';
  },
};

/* ─── PARAGRAPH WRITING ───────────────────────────────────── */
const paraTabs = { current: 'anatomy' };
const warmupState = { i: 0, show: false, drafts: {} };
const taskState = { i: 0, show: false, analysis: false, drafts: {} };

function peelMark(role, text) {
  const c = PEEL[role];
  return '<mark class="peel" style="--ann-c:' + c + ';--ann-bg:color-mix(in srgb,' + c + ' 13%,transparent)">' + esc(text) + '</mark>';
}
function paragraphsBody() {
  const P = SRDP.paragraphs;
  const tab = paraTabs.current;
  if (tab === 'anatomy') {
    return sectionLabel('Every body paragraph has four layers') +
      '<div class="grid g-auto-220" style="background:transparent;border:none;gap:10px;display:grid">' +
        P.layers.map(l => '<div class="peel-card" style="--pc:' + PEEL[l.key] + '"><span class="pn">' + l.num + '</span><span class="pl">' + l.label + '</span><div class="pd">' + esc(l.desc) + '</div></div>').join('') +
      '</div><div class="gap-s"></div>' +
      sectionLabel('An annotated example') +
      '<div class="model-box"><div class="model-head"><div class="legend">' +
        P.layers.map(l => '<span><i style="background:' + PEEL[l.key] + ';opacity:.55"></i>' + l.label + '</span>').join('') +
      '</div></div>' +
      '<div class="model-body" style="line-height:2.3">' + P.anatomyExample.map(s => peelMark(s.role, s.text)).join(' ') + '</div></div>' +
      '<div class="gap-s"></div>' +
      '<div class="grid g-2">' +
        '<div class="dd-col do"><h3>Strong closings</h3>' + P.closings.strong.map(c => '<div style="margin-bottom:10px"><div style="font-size:.8125rem;font-weight:500;color:var(--text)">' + esc(c.t) + '</div><div style="font-size:.8125rem;color:var(--text-muted);font-style:italic">' + esc(c.e) + '</div></div>').join('') + '</div>' +
        '<div class="dd-col dont"><h3>Weak closings to avoid</h3>' + P.closings.weak.map(c => '<div style="margin-bottom:10px"><div style="font-family:var(--font-mono);font-size:.78rem;color:var(--red)">' + esc(c.w) + '</div><div style="font-size:.78rem;color:var(--text-muted)">' + esc(c.r) + '</div></div>').join('') + '</div>' +
      '</div>';
  }
  if (tab === 'formulas') {
    return sectionLabel('Three topic-sentence patterns') +
      P.formulas.map(f =>
        '<div style="display:grid;grid-template-columns:96px 1fr;border:1px solid var(--border);background:var(--surface);margin-bottom:8px">' +
          '<div style="padding:14px;border-right:1px solid var(--border);display:flex;align-items:center;justify-content:center;background:var(--surface-1)"><span class="tag-label" style="--pc:var(--blue)">' + f.label + '</span></div>' +
          '<div style="padding:13px 17px"><div style="font-family:var(--font-mono);font-size:.78rem;color:var(--text-muted);margin-bottom:7px">' + esc(f.formula) + '</div><div style="font-size:.86rem;color:var(--text-secondary);font-style:italic;line-height:1.6">' + esc(f.example) + '</div></div>' +
        '</div>').join('') +
      '<div class="gap-s"></div>' +
      '<div class="dd-col dont" style="border:1px solid var(--border);border-top:3px solid var(--red);background:var(--surface)"><h3>Common topic-sentence mistakes</h3>' +
        P.tsMistakes.map(m => '<div style="display:flex;gap:10px;margin-bottom:8px;flex-wrap:wrap"><span style="font-family:var(--font-mono);font-size:.8rem;color:var(--red)">' + esc(m.w) + '</span><span style="font-size:.78rem;color:var(--text-muted)">– ' + esc(m.fix) + '</span></div>').join('') +
      '</div>' +
      '<div class="gap-s"></div>' +
      sectionLabel('Three ways to support your point') +
      '<div class="grid g-auto-240">' +
        P.supports.map(s => '<div class="card"><div class="tag-label mb-1" style="--pc:var(--blue)">' + s.label + '</div><div style="font-size:.75rem;color:var(--text-muted);margin-bottom:10px">' + esc(s.sub) + '</div><div style="font-size:.84rem;color:var(--text-secondary);font-style:italic;line-height:1.65">' + esc(s.ex) + '</div></div>').join('') +
      '</div>';
  }
  if (tab === 'warmups') {
    const wu = P.warmups[warmupState.i];
    const typeColor = { CLAIM: 'var(--blue)', CONTRAST: 'var(--purple)', CAUSE: 'var(--orange)' };
    return sectionLabel('Warm-up ' + (warmupState.i + 1) + ' of ' + P.warmups.length + ' – find the topic sentence') +
      '<p class="lead-sm mb-4">The topic sentence is missing. Read the paragraph and write one that fits. A good topic sentence makes a clear, specific claim.</p>' +
      '<div class="tip mb-4">If you do not know what to say, try one of these: argue the other side and then answer it, follow a cause to its effect, or give a concrete example. The example may be invented. A realistic made-up survey or a personal story is allowed, because this is a language exam.</div>' +
      '<div style="border:1px solid var(--border);background:var(--surface);margin-bottom:18px">' +
        '<div class="box-head">' + esc(wu.title) + '</div>' +
        '<div style="padding:14px 19px;border-bottom:1px solid var(--border);display:flex;gap:12px;background:color-mix(in srgb,' + PEEL.point + ' 6%,transparent);border-left:2px solid ' + PEEL.point + '">' +
          '<span style="color:' + PEEL.point + ';flex-shrink:0;margin-top:2px">①</span>' +
          '<textarea id="wuInput" rows="2" placeholder="Write your topic sentence here…" style="flex:1;background:transparent;border:none;color:var(--text);font-size:.88rem;font-family:var(--font-sans);line-height:1.6;resize:none">' + esc(warmupState.drafts[warmupState.i] || '') + '</textarea>' +
        '</div>' +
        [['explain', '②', 'SUPPORTING', wu.supporting], ['evidence', '③', 'EVIDENCE', wu.evidence], ['closing', '④', 'CLOSING', wu.closing]].map((r, i) =>
          '<div style="padding:13px 19px;' + (i < 2 ? 'border-bottom:1px solid var(--border);' : '') + 'display:flex;gap:12px">' +
            '<span style="color:' + PEEL[r[0]] + ';flex-shrink:0;margin-top:2px">' + r[1] + '</span>' +
            '<div><div class="tag-label mb-1" style="--pc:' + PEEL[r[0]] + '">' + r[2] + '</div>' +
            '<div style="font-size:.86rem;color:var(--text-secondary);line-height:1.7">' + esc(r[3]) + '</div></div></div>').join('') +
      '</div>' +
      '<div style="display:flex;gap:8px;margin-bottom:18px;flex-wrap:wrap">' +
        '<button class="btn btn-ghost btn-sm" data-action="wu-toggle">' + (warmupState.show ? 'Hide model sentences' : 'Show model sentences') + '</button>' +
        '<button class="btn btn-ghost btn-sm" data-action="wu-prev"><span aria-hidden="true">&larr;</span> Previous</button>' +
        '<button class="btn btn-ghost btn-sm" data-action="wu-next">Next <span aria-hidden="true">&rarr;</span></button>' +
      '</div>' +
      (warmupState.show ?
        '<div style="border:1px solid var(--border);background:var(--surface)">' +
          '<div class="box-head">Model topic sentences</div>' +
          wu.modelSentences.map((s, i) =>
            '<div style="display:grid;grid-template-columns:88px 1fr;' + (i < wu.modelSentences.length - 1 ? 'border-bottom:1px solid var(--border)' : '') + '">' +
              '<div style="padding:11px 13px;border-right:1px solid var(--border);display:flex;align-items:center;justify-content:center;background:var(--surface-1)"><span class="tag-label" style="--pc:' + (typeColor[s.type] || 'var(--blue)') + '">' + s.type + '</span></div>' +
              '<div style="padding:11px 15px;font-size:.85rem;color:var(--text-secondary);font-style:italic;line-height:1.6">' + esc(s.text) + '</div>' +
            '</div>').join('') +
        '</div>' : '');
  }
  if (tab === 'tasks') {
    const task = P.tasks[taskState.i];
    return '<div style="display:flex;gap:6px;margin-bottom:22px;flex-wrap:wrap">' +
        P.tasks.map((t, i) => '<button class="btn ' + (taskState.i === i ? 'btn-primary' : 'btn-ghost') + ' btn-sm" data-action="pt-task" data-i="' + i + '">Task ' + (i + 1) + '</button>').join('') +
      '</div>' +
      sectionLabel(esc(task.title)) +
      '<div class="tip mb-4" style="border-left-color:var(--blue)"><div class="sub-label">Task</div><em>' + esc(task.prompt) + '</em><div style="font-size:.78rem;color:var(--text-muted);margin-top:7px">' + esc(task.instruction) + '</div></div>' +
      '<div style="display:flex;flex-direction:column;gap:6px;margin-bottom:14px">' +
        P.layers.map(l =>
          '<div class="wa-row" style="--pc:' + PEEL[l.key] + '">' +
            '<div class="wa-side"><div class="pn">' + l.num + '</div><div class="pl">' + l.label + '</div></div>' +
            '<textarea class="pt-input" data-key="' + l.key + '" rows="' + (l.key === 'explain' ? 3 : 2) + '" placeholder="' +
              (l.key === 'point' ? 'Write your topic sentence…' : l.key === 'explain' ? 'Explain the why/how…' : l.key === 'evidence' ? 'Give evidence – a fact, statistic, or example…' : 'Draw a conclusion or link forward…') + '">' + esc((taskState.drafts[taskState.i] || {})[l.key] || '') + '</textarea>' +
          '</div>').join('') +
      '</div>' +
      '<div style="display:flex;gap:8px;align-items:center;margin-bottom:18px;flex-wrap:wrap">' +
        '<span id="ptCount" class="text-xs muted" aria-live="off">0 words</span>' +
        '<button class="btn btn-ghost btn-sm" data-action="pt-model">' + (taskState.show ? 'Hide model' : 'Show model paragraph') + '</button>' +
        (taskState.show ? '<button class="btn btn-ghost btn-sm" data-action="pt-analysis">' + (taskState.analysis ? 'Hide analysis' : 'Why does it work?') + '</button>' : '') +
      '</div>' +
      (taskState.show ?
        '<div class="model-box mb-3"><div class="box-head">Model paragraph</div>' +
        '<div class="model-body" style="line-height:2.2">' + Object.keys(task.model).map(k => peelMark(k, task.model[k])).join(' ') + '</div></div>' : '') +
      (taskState.show && taskState.analysis ?
        '<div style="border:1px solid var(--border);background:var(--surface)">' +
          '<div class="box-head">Why does this paragraph work?</div>' +
          task.analysis.map((a, i) =>
            '<div style="display:grid;grid-template-columns:140px 1fr;' + (i < task.analysis.length - 1 ? 'border-bottom:1px solid var(--border)' : '') + '">' +
              '<div style="padding:11px 13px;border-right:1px solid var(--border);display:flex;align-items:center;background:var(--surface-1)"><span class="tag-label" style="--pc:' + PEEL[Object.keys(PEEL)[i]] + '">' + esc(a.part) + '</span></div>' +
              '<div style="padding:11px 15px;font-size:.84rem;color:var(--text-secondary);line-height:1.65">' + esc(a.why) + '</div>' +
            '</div>').join('') +
        '</div>' : '');
  }
  if (tab === 'phrases') {
    return sectionLabel('Paragraph phrases (tap to copy)') +
      SRDP.paragraphs.phraseGroups.map(g => '<div style="margin-bottom:26px"><h2 class="section-label">' + esc(g.label) + '</h2>' + M.chips(g.phrases) + '</div>').join('');
  }
  if (tab === 'recipe') {
    const P2 = SRDP.paragraphs;
    const accents = [PEEL.point, PEEL.explain, PEEL.evidence, PEEL.closing];
    return sectionLabel('Four steps to a good paragraph') +
      P2.recipe.map((s, i) =>
        '<div style="display:grid;grid-template-columns:58px 1fr;border:1px solid var(--border);background:var(--surface);margin-bottom:6px">' +
          '<div style="padding:16px;background:var(--surface-1);border-right:1px solid var(--border);display:flex;align-items:center;justify-content:center"><span style="font-size:1.35rem;font-weight:300;color:' + accents[i] + '">' + s.num + '</span></div>' +
          '<div style="padding:15px 19px"><div style="font-size:.78rem;letter-spacing:.05em;font-weight:600;color:' + accents[i] + ';margin-bottom:5px">' + esc(s.title) + '</div><div style="font-size:.86rem;color:var(--text-secondary);line-height:1.6">' + esc(s.desc) + '</div></div>' +
        '</div>').join('') +
      '<div class="gap-s"></div>' +
      sectionLabel('A strong and a weak paragraph on the same topic') +
      '<div class="grid g-2">' +
        '<div class="dd-col do"><h3>✓ Strong</h3><div style="font-size:.84rem;color:var(--text-secondary);line-height:1.8;font-style:italic">' + esc(P2.goodVsWeak.strong) + '</div></div>' +
        '<div class="dd-col dont"><h3>✗ Weak</h3><div style="font-size:.84rem;color:var(--text-secondary);line-height:1.8;font-style:italic">' + esc(P2.goodVsWeak.weak) + '</div></div>' +
      '</div>' +
      '<div class="gap-s"></div>' +
      '<div class="tip"><strong>What makes the difference?</strong><br>' + P2.goodVsWeak.diffs.map(d => '– ' + esc(d)).join('<br>') + '</div>';
  }
  return '';
}
PAGES.paragraphs = {
  title: 'Paragraph writing', track: 'paragraphs',
  render() {
    const tabs = [['anatomy', 'The four layers'], ['formulas', 'Topic sentences'], ['warmups', 'Warm-ups'], ['tasks', 'Full paragraphs'], ['phrases', 'Phrases'], ['recipe', 'Four steps']];
    return '<div class="page">' +
      pageHead('Practise', 'Paragraph writing', 'A good body paragraph does four jobs, in this order. Once you know them, starting a paragraph gets much easier.',
        '<div class="tabs">' + tabs.map(t => '<button class="tab' + (paraTabs.current === t[0] ? ' active' : '') + '" data-action="para-tab" data-tab="' + t[0] + '">' + t[1] + '</button>').join('') + '</div>') +
      '<div class="wrap"><div class="gap-s"></div><div id="paraBody">' + paragraphsBody() + '</div><div style="height:72px"></div></div>' +
    '</div>';
  },
  wire() { wireParaInputs(); },
};
function wireParaInputs() {
  /* Warm-up: persist the single topic-sentence draft per warm-up index (survives re-render). */
  const wuInput = M.$('#wuInput');
  if (wuInput) {
    wuInput.addEventListener('input', () => { warmupState.drafts[warmupState.i] = wuInput.value; });
  }
  /* Full paragraphs: persist a draft per task index and PEEL field, and keep the word counter live. */
  const inputs = M.$$('.pt-input');
  if (inputs.length) {
    const store = taskState.drafts[taskState.i] || (taskState.drafts[taskState.i] = {});
    const counter = M.$('#ptCount');
    const updateCount = () => {
      if (!counter) return;
      counter.textContent = inputs.map(x => x.value).join(' ').trim().split(/\s+/).filter(Boolean).length + ' words';
    };
    inputs.forEach(t => {
      const key = t.getAttribute('data-key');
      t.addEventListener('input', () => { store[key] = t.value; updateCount(); });
    });
    updateCount();
  }
}
window.MWG.paraTabs = paraTabs;
window.MWG.warmupState = warmupState;
window.MWG.taskState = taskState;
window.MWG.paragraphsBody = paragraphsBody;
window.MWG.wireParaInputs = wireParaInputs;

/* ─── PRACTICE ZONE ───────────────────────────────────────── */
const przState = { tab: 'spot', revealed: {}, regRevealed: {} };
function finalQuizForSchool() {
  const s = M.school();
  return SRDP.finalQuiz.filter(q => !q.schools || q.schools.indexOf(s) >= 0);
}
function practiceBody() {
  if (przState.tab === 'spot') {
    return sectionLabel('Spot the mistakes in the text-type rules') +
      '<p class="lead-sm mb-5">Each text below breaks some rules of its text type on purpose. The grammar is fine. Find the mistakes yourself, then show the answers.</p>' +
      '<div style="border:1px solid var(--border)">' + SRDP.spotTexts.filter(ex => !ex.schools || ex.schools.indexOf(M.school()) >= 0).map((ex, i) =>
        '<div style="' + (i > 0 ? 'border-top:1px solid var(--border)' : '') + '">' +
          '<div style="padding:14px 22px;background:var(--surface-1);font-size:.875rem;font-weight:600">' + esc(ex.title) + '</div>' +
          '<div class="mono-text" style="border-top:1px solid var(--border);background:var(--surface)">' + esc(ex.text) + '</div>' +
          '<div style="padding:15px 22px;border-top:1px solid var(--border);background:var(--surface)">' +
            '<button class="btn btn-ghost btn-sm" data-action="spot-toggle" data-id="' + ex.id + '">' + (przState.revealed[ex.id] ? 'Hide the mistakes' : 'Show the ' + ex.errors.length + ' mistakes') + '</button>' +
            (przState.revealed[ex.id] ?
              '<div style="margin-top:14px">' + ex.errors.map((e, j) =>
                '<div class="err-row"><span class="n">' + (j + 1) + '</span><span><span class="m">' + esc(e.mark) + '</span> <span class="f">→ ' + esc(e.fix) + '</span></span></div>').join('') +
              '<div class="tip" style="margin-top:10px;border-left-color:var(--border-strong)"><strong>Verdict:</strong> ' + esc(ex.verdict) + '</div></div>' : '') +
          '</div>' +
        '</div>').join('') +
      '</div>';
  }
  if (przState.tab === 'register') {
    return sectionLabel('Register gym: one idea, two registers') +
      '<p class="lead-sm mb-5">Read the informal sentence and write (or say) a formal version. Then show our version. Every formal text type rewards this skill.</p>' +
      '<div style="border:1px solid var(--border)">' + SRDP.registerGym.map((r, i) =>
        '<div style="' + (i > 0 ? 'border-top:1px solid var(--border);' : '') + 'background:var(--surface);padding:16px 22px">' +
          '<div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:8px"><span class="badge">' + esc(r.hint) + '</span></div>' +
          '<div style="font-size:.75rem;letter-spacing:.32px;color:var(--text-muted);margin-bottom:4px">Informal</div><div style="font-size:.9rem;color:var(--text);margin-bottom:10px;line-height:1.6">&ldquo;' + esc(r.informal) + '&rdquo;</div>' +
          (przState.regRevealed[i]
            ? '<div class="tip good" style="font-size:.875rem"><strong>Formal · </strong>' + esc(r.formal) + '</div>'
            : '<button class="btn btn-ghost btn-sm" data-action="reg-reveal" data-i="' + i + '">Show the formal version</button>') +
        '</div>').join('') +
      '</div>';
  }
  if (przState.tab === 'final') {
    const fq = finalQuizForSchool();
    return sectionLabel('The final quiz: ' + fq.length + ' questions on all text types') +
      '<p class="lead-sm mb-5">' + fq.length + ' questions on everything on this site. Aim for at least ' + Math.ceil(fq.length * 0.7) + ' correct answers.</p>' +
      '<div data-quiz-host="final"></div>';
  }
  return '';
}
PAGES.practice = {
  title: 'Practice zone', track: 'practice',
  render() {
    const tabs = [['spot', 'Spot the mistakes'], ['register', 'Register gym'], ['final', 'Final quiz']];
    return '<div class="page">' +
      pageHead('Practise', 'Practice zone', 'Student texts with planted mistakes, register practice, and a final quiz for the week before the exam.',
        '<div class="tabs">' + tabs.map(t => '<button class="tab' + (przState.tab === t[0] ? ' active' : '') + '" data-action="prz-tab" data-tab="' + t[0] + '">' + t[1] + '</button>').join('') + '</div>') +
      '<div class="wrap"><div class="gap-s"></div><div id="przBody">' + practiceBody() + '</div><div style="height:72px"></div></div>' +
    '</div>';
  },
  wire() { wirePractice(); },
};
function wirePractice() {
  if (przState.tab === 'final') {
    if (!M.quizStates.final) M.initQuiz('final', finalQuizForSchool(), (score, total) => { if (score >= Math.ceil(total * 0.6)) M.markQuiz('final'); });
    const host = M.$('[data-quiz-host="final"]');
    if (host) M.setHTML(host, M.quizHTML('final'));
  }
}
window.MWG.przState = przState;
window.MWG.practiceBody = practiceBody;
window.MWG.wirePractice = wirePractice;
})();
