/* ════════════════════════════════════════════════════════════
   Pages 3 — Grammar kit · Paragraph writing · Practice zone
   ════════════════════════════════════════════════════════════ */
(function () {
'use strict';
const M = window.MWG;
const { esc, sectionLabel, pageHead, PEEL } = M;
function comparisonTable() {
  const drop = M.school() === 'bhs' ? SRDP.comparison.head.indexOf('Essay') : -1;
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
      pageHead('Skills', 'Grammar kit', d.grammar.length + ' places where German sneaks into your English. Each one with typical errors, corrections and a rule you can remember.') +
      '<div class="wrap"><div class="gap-s"></div>' +
        sectionLabel('Common mistakes — click to open') +
        '<div class="acc">' + d.grammar.map(g =>
          '<div class="acc-item"><button class="acc-head" data-action="acc" aria-expanded="false"><span class="pm">+</span><span>' + esc(g.title) + '</span><span class="sub">' + (g.pairs ? g.pairs.length + ' examples' : g.table.length + ' items') + '</span></button>' +
          '<div class="acc-body"><p style="font-size:.9rem;color:var(--text-secondary);line-height:1.6;padding:10px 0 16px">' + esc(g.intro) + '</p>' +
            (g.pairs ? g.pairs.map(p =>
              '<div class="pair-row" style="border:1px solid var(--border);margin-bottom:8px">' +
                '<div class="pair-cell"><div class="lab wrong-c">✗ TYPICAL ERROR</div><span style="font-family:var(--font-mono);font-size:.8125rem">' + esc(p.wrong) + '</span></div>' +
                '<div class="pair-cell"><div class="lab right-c">✓ CORRECT</div><span style="font-family:var(--font-mono);font-size:.8125rem">' + esc(p.right) + '</span><div style="font-size:.78rem;color:var(--text-muted);margin-top:5px">' + esc(p.note) + '</div></div>' +
              '</div>').join('') : '') +
            (g.table ?
              '<div class="tbl-wrap" tabindex="0" role="group" aria-label="Table (scroll sideways on small screens)"><table class="tbl" style="min-width:520px"><thead><tr><th>You write…</th><th>You think it means…</th><th>It actually means…</th><th>Use instead</th></tr></thead><tbody>' +
              g.table.map(r => '<tr><td style="font-family:var(--font-mono)">' + esc(r.word) + '</td><td>' + esc(r.youThink) + '</td><td>' + esc(r.itMeans) + '</td><td style="color:var(--green)">' + esc(r.correct) + '</td></tr>').join('') +
              '</tbody></table></div>' : '') +
            (g.rule ? '<div class="tip" style="margin-top:12px"><strong>Rule · </strong>' + esc(g.rule) + '</div>' : '') +
          '</div></div>').join('') +
        '</div>' +
        '<div class="gap"></div>' +
        sectionLabel('B2 linking words — upgrade your connectors') +
        '<div class="tbl-wrap" tabindex="0" role="group" aria-label="Table (scroll sideways on small screens)"><table class="tbl"><thead><tr><th>Function</th><th>B1 (don&rsquo;t rely on these)</th><th>B2 (use these)</th></tr></thead><tbody>' +
          SRDP.linkingWords.map(r => '<tr><td>' + esc(r.fn) + '</td><td class="cell-no">' + esc(r.basic) + '</td><td style="color:var(--text)">' + esc(r.b2) + '</td></tr>').join('') +
        '</tbody></table></div>' +
        '<div class="gap"></div>' +
        sectionLabel('Which text type does what?') +
        comparisonTable() +
        '<div class="gap"></div>' +
        sectionLabel('Task operators — what the verbs in the task demand') +
        '<div class="acc">' + SRDP.operators.map(o =>
          '<div class="day-row" style="grid-template-columns:170px 1fr"><div class="d">' + esc(o.op) + '</div><div class="c">' + esc(o.what) + '<div style="font-family:var(--font-mono);font-size:.78rem;color:var(--text-muted);margin-top:6px">&ldquo;' + esc(o.ex) + '&rdquo;</div></div></div>').join('') +
        '</div>' +
        '<div style="height:72px"></div>' +
      '</div></div>';
  },
};

/* ─── PARAGRAPH WRITING ───────────────────────────────────── */
const paraTabs = { current: 'anatomy' };
const warmupState = { i: 0, show: false };
const taskState = { i: 0, show: false, analysis: false };

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
      sectionLabel('See it in action — annotated example') +
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
    return sectionLabel('Three topic-sentence formulas that always work') +
      P.formulas.map(f =>
        '<div style="display:grid;grid-template-columns:96px 1fr;border:1px solid var(--border);background:var(--surface);margin-bottom:8px">' +
          '<div style="padding:14px;border-right:1px solid var(--border);display:flex;align-items:center;justify-content:center;background:var(--surface-1)"><span style="font-size:.7rem;letter-spacing:.08em;color:var(--blue);font-weight:600">' + f.label + '</span></div>' +
          '<div style="padding:13px 17px"><div style="font-family:var(--font-mono);font-size:.78rem;color:var(--text-muted);margin-bottom:7px">' + esc(f.formula) + '</div><div style="font-size:.86rem;color:var(--text-secondary);font-style:italic;line-height:1.6">' + esc(f.example) + '</div></div>' +
        '</div>').join('') +
      '<div class="gap-s"></div>' +
      '<div class="dd-col dont" style="border:1px solid var(--border);border-top:3px solid var(--red);background:var(--surface)"><h3>Common topic-sentence mistakes</h3>' +
        P.tsMistakes.map(m => '<div style="display:flex;gap:10px;margin-bottom:8px;flex-wrap:wrap"><span style="font-family:var(--font-mono);font-size:.8rem;color:var(--red)">' + esc(m.w) + '</span><span style="font-size:.78rem;color:var(--text-muted)">— ' + esc(m.fix) + '</span></div>').join('') +
      '</div>' +
      '<div class="gap-s"></div>' +
      sectionLabel('Three ways to support your point') +
      '<div class="grid g-auto-240">' +
        P.supports.map(s => '<div class="card"><div style="font-size:.7rem;letter-spacing:.09em;color:var(--blue);font-weight:600;margin-bottom:4px">' + s.label + '</div><div style="font-size:.75rem;color:var(--text-muted);margin-bottom:10px">' + esc(s.sub) + '</div><div style="font-size:.84rem;color:var(--text-secondary);font-style:italic;line-height:1.65">' + esc(s.ex) + '</div></div>').join('') +
      '</div>';
  }
  if (tab === 'warmups') {
    const wu = P.warmups[warmupState.i];
    const typeColor = { CLAIM: 'var(--blue)', CONTRAST: 'var(--purple)', CAUSE: 'var(--orange)' };
    return sectionLabel('Warm-up ' + (warmupState.i + 1) + ' of ' + P.warmups.length + ' — find the topic sentence') +
      '<p style="font-size:.875rem;color:var(--text-secondary);line-height:1.7;margin-bottom:18px">The topic sentence is missing. Read the paragraph and write one that fits. Remember: a good topic sentence makes a clear, specific claim.</p>' +
      '<div style="border:1px solid var(--border);background:var(--surface);margin-bottom:18px">' +
        '<div style="padding:11px 19px;border-bottom:1px solid var(--border);font-size:.7rem;letter-spacing:.08em;color:var(--text-muted)">' + esc(wu.title.toUpperCase()) + '</div>' +
        '<div style="padding:14px 19px;border-bottom:1px solid var(--border);display:flex;gap:12px;background:color-mix(in srgb,' + PEEL.point + ' 6%,transparent);border-left:2px solid ' + PEEL.point + '">' +
          '<span style="color:' + PEEL.point + ';flex-shrink:0;margin-top:2px">①</span>' +
          '<textarea id="wuInput" rows="2" placeholder="Write your topic sentence here…" style="flex:1;background:transparent;border:none;color:var(--text);font-size:.88rem;font-family:var(--font-sans);line-height:1.6;resize:none;outline:none"></textarea>' +
        '</div>' +
        [['explain', '②', 'SUPPORTING', wu.supporting], ['evidence', '③', 'EVIDENCE', wu.evidence], ['closing', '④', 'CLOSING', wu.closing]].map((r, i) =>
          '<div style="padding:13px 19px;' + (i < 2 ? 'border-bottom:1px solid var(--border);' : '') + 'display:flex;gap:12px">' +
            '<span style="color:' + PEEL[r[0]] + ';flex-shrink:0;margin-top:2px">' + r[1] + '</span>' +
            '<div><div style="font-size:.62rem;letter-spacing:.08em;color:' + PEEL[r[0]] + ';font-weight:600;margin-bottom:4px">' + r[2] + '</div>' +
            '<div style="font-size:.86rem;color:var(--text-secondary);line-height:1.7">' + esc(r[3]) + '</div></div></div>').join('') +
      '</div>' +
      '<div style="display:flex;gap:8px;margin-bottom:18px;flex-wrap:wrap">' +
        '<button class="btn btn-ghost btn-sm" data-action="wu-toggle">' + (warmupState.show ? 'Hide model sentences' : 'Reveal model sentences') + '</button>' +
        '<button class="btn btn-ghost btn-sm" data-action="wu-prev">← Prev</button>' +
        '<button class="btn btn-ghost btn-sm" data-action="wu-next">Next →</button>' +
      '</div>' +
      (warmupState.show ?
        '<div style="border:1px solid var(--border);background:var(--surface)">' +
          '<div style="padding:10px 19px;border-bottom:1px solid var(--border);font-size:.65rem;letter-spacing:.1em;color:var(--text-muted)">MODEL TOPIC SENTENCES</div>' +
          wu.modelSentences.map((s, i) =>
            '<div style="display:grid;grid-template-columns:88px 1fr;' + (i < wu.modelSentences.length - 1 ? 'border-bottom:1px solid var(--border)' : '') + '">' +
              '<div style="padding:11px 13px;border-right:1px solid var(--border);display:flex;align-items:center;justify-content:center;background:var(--surface-1)"><span style="font-size:.62rem;letter-spacing:.06em;color:' + (typeColor[s.type] || 'var(--blue)') + ';font-weight:600">' + s.type + '</span></div>' +
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
      '<div class="tip" style="border-left-color:var(--blue);margin-bottom:18px"><div style="font-size:.65rem;letter-spacing:.1em;color:var(--text-muted);margin-bottom:7px">ESSAY PROMPT</div><em>' + esc(task.prompt) + '</em><div style="font-size:.78rem;color:var(--text-muted);margin-top:7px">' + esc(task.instruction) + '</div></div>' +
      '<div style="display:flex;flex-direction:column;gap:6px;margin-bottom:14px">' +
        P.layers.map(l =>
          '<div class="wa-row" style="--pc:' + PEEL[l.key] + '">' +
            '<div class="wa-side"><div class="pn">' + l.num + '</div><div class="pl">' + l.label + '</div></div>' +
            '<textarea class="pt-input" data-key="' + l.key + '" rows="' + (l.key === 'explain' ? 3 : 2) + '" placeholder="' +
              (l.key === 'point' ? 'Write your topic sentence…' : l.key === 'explain' ? 'Explain the why/how…' : l.key === 'evidence' ? 'Give evidence — a fact, statistic, or example…' : 'Draw a conclusion or link forward…') + '"></textarea>' +
          '</div>').join('') +
      '</div>' +
      '<div style="display:flex;gap:8px;align-items:center;margin-bottom:18px;flex-wrap:wrap">' +
        '<span id="ptCount" style="font-size:.72rem;letter-spacing:.08em;color:var(--text-muted)">0 WORDS</span>' +
        '<button class="btn btn-ghost btn-sm" data-action="pt-model">' + (taskState.show ? 'Hide model' : 'Show model paragraph') + '</button>' +
        (taskState.show ? '<button class="btn btn-ghost btn-sm" data-action="pt-analysis">' + (taskState.analysis ? 'Hide analysis' : 'Why does it work?') + '</button>' : '') +
      '</div>' +
      (taskState.show ?
        '<div class="model-box" style="margin-bottom:12px"><div style="padding:10px 19px;border-bottom:1px solid var(--border);font-size:.65rem;letter-spacing:.1em;color:var(--text-muted)">MODEL PARAGRAPH</div>' +
        '<div class="model-body" style="line-height:2.2">' + Object.keys(task.model).map(k => peelMark(k, task.model[k])).join(' ') + '</div></div>' : '') +
      (taskState.show && taskState.analysis ?
        '<div style="border:1px solid var(--border);background:var(--surface)">' +
          '<div style="padding:10px 19px;border-bottom:1px solid var(--border);font-size:.65rem;letter-spacing:.1em;color:var(--text-muted)">WHY DOES THIS PARAGRAPH WORK?</div>' +
          task.analysis.map((a, i) =>
            '<div style="display:grid;grid-template-columns:140px 1fr;' + (i < task.analysis.length - 1 ? 'border-bottom:1px solid var(--border)' : '') + '">' +
              '<div style="padding:11px 13px;border-right:1px solid var(--border);display:flex;align-items:center;background:var(--surface-1)"><span style="font-size:.62rem;letter-spacing:.07em;font-weight:600;color:' + PEEL[Object.keys(PEEL)[i]] + '">' + esc(a.part.toUpperCase()) + '</span></div>' +
              '<div style="padding:11px 15px;font-size:.84rem;color:var(--text-secondary);line-height:1.65">' + esc(a.why) + '</div>' +
            '</div>').join('') +
        '</div>' : '');
  }
  if (tab === 'phrases') {
    return sectionLabel('Paragraph phrase bank — click to copy') +
      SRDP.paragraphs.phraseGroups.map(g => '<div style="margin-bottom:26px"><h2 class="section-label">' + esc(g.label) + '</h2>' + M.chips(g.phrases) + '</div>').join('');
  }
  if (tab === 'recipe') {
    const P2 = SRDP.paragraphs;
    const accents = [PEEL.point, PEEL.explain, PEEL.evidence, PEEL.closing];
    return sectionLabel('The recipe — four steps to a perfect paragraph') +
      P2.recipe.map((s, i) =>
        '<div style="display:grid;grid-template-columns:58px 1fr;border:1px solid var(--border);background:var(--surface);margin-bottom:6px">' +
          '<div style="padding:16px;background:var(--surface-1);border-right:1px solid var(--border);display:flex;align-items:center;justify-content:center"><span style="font-size:1.35rem;font-weight:300;color:' + accents[i] + '">' + s.num + '</span></div>' +
          '<div style="padding:15px 19px"><div style="font-size:.78rem;letter-spacing:.05em;font-weight:600;color:' + accents[i] + ';margin-bottom:5px">' + esc(s.title) + '</div><div style="font-size:.86rem;color:var(--text-secondary);line-height:1.6">' + esc(s.desc) + '</div></div>' +
        '</div>').join('') +
      '<div class="gap-s"></div>' +
      sectionLabel('Good paragraph vs. weak paragraph — same topic') +
      '<div class="grid g-2">' +
        '<div class="dd-col do"><h3>✓ Strong</h3><div style="font-size:.84rem;color:var(--text-secondary);line-height:1.8;font-style:italic">' + esc(P2.goodVsWeak.strong) + '</div></div>' +
        '<div class="dd-col dont"><h3>✗ Weak</h3><div style="font-size:.84rem;color:var(--text-secondary);line-height:1.8;font-style:italic">' + esc(P2.goodVsWeak.weak) + '</div></div>' +
      '</div>' +
      '<div class="gap-s"></div>' +
      '<div class="tip"><strong>What makes the difference?</strong><br>' + P2.goodVsWeak.diffs.map(d => '— ' + esc(d)).join('<br>') + '</div>';
  }
  return '';
}
PAGES.paragraphs = {
  title: 'Paragraph writing', track: 'paragraphs',
  render() {
    const tabs = [['anatomy', 'Anatomy'], ['formulas', 'Topic sentences'], ['warmups', 'Warm-ups'], ['tasks', 'Full paragraphs'], ['phrases', 'Phrase bank'], ['recipe', 'The recipe']];
    return '<div class="page">' +
      pageHead('Skills', 'Building a paragraph', 'Every good body paragraph does four jobs, in order. Learn them once and the blank page stops being a problem.',
        '<div class="tabs">' + tabs.map(t => '<button class="tab' + (paraTabs.current === t[0] ? ' active' : '') + '" data-action="para-tab" data-tab="' + t[0] + '">' + t[1] + '</button>').join('') + '</div>') +
      '<div class="wrap"><div class="gap-s"></div><div id="paraBody">' + paragraphsBody() + '</div><div style="height:72px"></div></div>' +
    '</div>';
  },
  wire() { wireParaInputs(); },
};
function wireParaInputs() {
  const counter = M.$('#ptCount');
  if (counter) {
    M.$$('.pt-input').forEach(t => t.addEventListener('input', () => {
      const wc = M.$$('.pt-input').map(x => x.value).join(' ').trim().split(/\s+/).filter(Boolean).length;
      counter.textContent = wc + ' WORDS';
    }));
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
    return sectionLabel('Spot the mistakes — conventions, not grammar') +
      '<p style="font-size:.9375rem;color:var(--text-secondary);margin-bottom:20px;line-height:1.55">Each text below contains deliberate errors in text-type conventions. Find them yourself, then reveal the answers.</p>' +
      '<div style="border:1px solid var(--border)">' + SRDP.spotTexts.filter(ex => !ex.schools || ex.schools.indexOf(M.school()) >= 0).map((ex, i) =>
        '<div style="' + (i > 0 ? 'border-top:1px solid var(--border)' : '') + '">' +
          '<div style="padding:14px 22px;background:var(--surface-1);font-size:.875rem;font-weight:600">' + esc(ex.title) + '</div>' +
          '<div class="mono-text" style="border-top:1px solid var(--border);background:var(--surface)">' + esc(ex.text) + '</div>' +
          '<div style="padding:15px 22px;border-top:1px solid var(--border);background:var(--surface)">' +
            '<button class="btn btn-ghost btn-sm" data-action="spot-toggle" data-id="' + ex.id + '">' + (przState.revealed[ex.id] ? 'Hide errors −' : 'Reveal ' + ex.errors.length + ' errors +') + '</button>' +
            (przState.revealed[ex.id] ?
              '<div style="margin-top:14px">' + ex.errors.map((e, j) =>
                '<div class="err-row"><span class="n">' + (j + 1) + '</span><span><span class="m">' + esc(e.mark) + '</span> <span class="f">→ ' + esc(e.fix) + '</span></span></div>').join('') +
              '<div class="tip" style="margin-top:10px;border-left-color:var(--border-strong)"><strong>Verdict:</strong> ' + esc(ex.verdict) + '</div></div>' : '') +
          '</div>' +
        '</div>').join('') +
      '</div>';
  }
  if (przState.tab === 'register') {
    return sectionLabel('Register gym — same idea, two voices') +
      '<p style="font-size:.9375rem;color:var(--text-secondary);margin-bottom:20px;line-height:1.55">Read the informal sentence and write (or say) the formal version yourself, then reveal a model. Switching register on demand is worth points in every formal text type.</p>' +
      '<div style="border:1px solid var(--border)">' + SRDP.registerGym.map((r, i) =>
        '<div style="' + (i > 0 ? 'border-top:1px solid var(--border);' : '') + 'background:var(--surface);padding:16px 22px">' +
          '<div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:8px"><span class="badge">' + esc(r.hint) + '</span></div>' +
          '<div style="font-size:.75rem;letter-spacing:.32px;color:var(--text-muted);margin-bottom:4px">Informal</div><div style="font-size:.9rem;color:var(--text);margin-bottom:10px;line-height:1.6">&ldquo;' + esc(r.informal) + '&rdquo;</div>' +
          (przState.regRevealed[i]
            ? '<div class="tip good" style="font-size:.875rem"><strong>Formal · </strong>' + esc(r.formal) + '</div>'
            : '<button class="btn btn-ghost btn-sm" data-action="reg-reveal" data-i="' + i + '">Reveal formal version</button>') +
        '</div>').join('') +
      '</div>';
  }
  if (przState.tab === 'final') {
    const fq = finalQuizForSchool();
    return sectionLabel('The final quiz — ' + fq.length + ' questions across all text types') +
      '<p style="font-size:.9375rem;color:var(--text-secondary);margin-bottom:24px;line-height:1.55">' + fq.length + ' questions across everything on this site. If you can pass this, you are ready. Aim for 10 or better.</p>' +
      '<div data-quiz-host="final"></div>';
  }
  return '';
}
PAGES.practice = {
  title: 'Practice zone', track: 'practice',
  render() {
    const tabs = [['spot', 'Spot the mistakes'], ['register', 'Register gym'], ['final', 'Final quiz']];
    return '<div class="page">' +
      pageHead('Skills', 'Practice zone', 'Five student texts with planted mistakes, a register workout, and the final quiz for the week before the exam.',
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
    if (host) host.innerHTML = M.quizHTML('final');
  }
}
window.MWG.przState = przState;
window.MWG.practiceBody = practiceBody;
window.MWG.wirePractice = wirePractice;
})();
