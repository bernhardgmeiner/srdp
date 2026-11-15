/* ════════════════════════════════════════════════════════════
   Speaking – explanations (Route "speakingguide") and the class view
   for teachers (Route "speakingclass": task on the projector, phase
   clock, printable task cards). No recording in the class view.
   Both pages are hidden until launch, like "speaking".
   ════════════════════════════════════════════════════════════ */
(function () {
'use strict';
const M = window.MWG, SP = M.SP;
const { esc, pageHead, sectionLabel } = M;
const D = () => SP.data();
const ext = (url, label, lang) => '<a href="' + esc(url) + '" target="_blank" rel="noopener"' + (lang ? ' hreflang="' + lang + '"' : '') + '>' + esc(label) + '</a>';

/* ═══ GUIDE ═════════════════════════════════════════════════ */
function modelTalk(m) {
  return '<div class="sp-task"><div class="sp-task-k">Individual Long Turn &middot; ' + esc(m.topic) + '</div><div class="sp-aspect">' + esc(m.aspect) + '</div>' +
    SP.inputHTML({ type: 'statements', statements: m.statements }) +
    '<p class="sp-lead">' + esc(m.intro) + '</p><ol class="sp-bullets">' + m.bullets.map((b, i) => '<li>' + SP.bulletText(b, i, m.bullets.length) + '</li>').join('') + '</ol></div>' +
    '<div class="sp-model">' + m.moves.map(v => '<div class="sp-move"><div class="sp-move-l"><span class="sp-move-tag">' + esc(v.label) + '</span><span class="sp-move-n">' + esc(v.note) + '</span></div><p>' + esc(v.text) + '</p></div>').join('') + '</div>' +
    '<div class="tip good mt-4"><strong>What to notice</strong><ul class="sp-notice">' + m.notice.map(n => '<li>' + esc(n) + '</li>').join('') + '</ul></div>';
}
function modelPaired(m) {
  return SP.pairedCard(m.topic, { aspect: m.aspect, scenario: m.scenario, options: m.options, closing: m.closing, minutes: 10 }) +
    '<div class="sp-model sp-dialogue">' + m.turns.map(t => t.cut
      ? '<p class="sp-cut">[ ' + esc(t.cut) + ' ]</p>'
      : '<div class="sp-turn ' + t.who.toLowerCase() + '"><span class="sp-who">' + esc(t.who) + '</span><div><p>' + esc(t.text) + '</p>' + (t.label ? '<span class="sp-move-tag">' + esc(t.label) + '</span>' : '') + '</div></div>').join('') + '</div>' +
    '<div class="tip good mt-4"><strong>What to notice</strong><ul class="sp-notice">' + m.notice.map(n => '<li>' + esc(n) + '</li>').join('') + '</ul></div>';
}
PAGES.speakingguide = {
  title: 'Speaking: how it works', hidden: true,
  render() {
    const d = D(), g = d.guide;
    const tl = steps => '<ol class="sp-tl">' + steps.map(s => '<li><span class="sp-tl-time">' + esc(s.time) + '</span><div><strong>' + esc(s.t) + '</strong><p>' + esc(s.d) + '</p></div></li>').join('') + '</ol>';
    return '<div class="page" id="spGuide">' +
      pageHead('Oral exam &middot; B2', 'How the oral exam works', 'The paired form step by step, a plan for your preparation time, what examiners listen for, two model transcripts and the phrases you need.',
        '<div class="row-wrap mt-4 mb-4"><a class="btn btn-primary" href="#speaking">Open the trainer <span aria-hidden="true">&rarr;</span></a></div>') +
      '<div class="wrap">' +
        sectionLabel('How the paired exam works', { id: 'exam', label: 'The exam' }) +
        '<p class="lead-sm mb-4">' + esc(g.exam.lead) + '</p>' + tl(g.exam.steps) +
        '<ul class="sp-after">' + g.exam.after.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul>' +
        '<div class="tip mt-4">' + esc(g.exam.otherForm) + '</div>' +
        '<div class="tip mt-4">' + esc(g.exam.minimum) + ' ' + ext(g.exam.minimumUrl, 'Government statement', 'de') + '</div>' +
        '<p class="muted text-sm mt-4">Sources: ' + g.exam.sources.map(s => ext(s.url, s.label, s.lang)).join(' &middot; ') + '. Checked on ' + esc(g.checked) + '. Your teachers and the exam regulations are what counts.</p>' +

        sectionLabel('How to use your 10 minutes', { id: 'prep', label: 'Your 10 minutes' }) +
        '<p class="lead-sm mb-4">' + esc(g.prep.lead) + '</p>' + tl(g.prep.steps) +
        '<ul class="sp-after">' + g.prep.tips.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul>' +

        sectionLabel('What examiners listen for', { id: 'criteria', label: 'Criteria' }) +
        '<p class="lead-sm mb-4">' + esc(g.criteria.lead) + '</p>' +
        '<div class="grid g-2 sp-crit">' + g.criteria.items.map(c => '<div class="card"><div class="card-title">' + esc(c.name) + '</div><div class="muted text-sm mb-2" lang="de">' + esc(c.de) + '</div><div class="card-desc">' + esc(c.d) + '</div></div>').join('') + '</div>' +
        '<div class="tip mt-4"><strong>' + ext(g.criteria.watch.url, g.criteria.watch.label, 'de') + '</strong><br>' + esc(g.criteria.watch.note) + '</div>' +

        sectionLabel('A model Long Turn', { id: 'modeltalk', label: 'Model talk' }) +
        '<p class="lead-sm mb-4">One way to do it, by a solid B2 candidate. It is a model for how to build a talk. The task is not in the trainer, so there is nothing to learn by heart.</p>' +
        modelTalk(d.models.longturn) +

        sectionLabel('A model Paired Activity', { id: 'modelpaired', label: 'Model discussion' }) +
        '<p class="lead-sm mb-4">The beginning and the end of a discussion, shortened. Watch what each speaker does with the partner&rsquo;s last sentence.</p>' +
        modelPaired(d.models.paired) +

        sectionLabel('Phrases for the Long Turn', { id: 'phraseslt', label: 'Phrases: talk' }) +
        '<p class="lead-sm mb-4">Tap a phrase to copy it. Learn two or three from each group and use them until they come without thinking.</p>' +
        M.phraseGroups(d.toolkits.longturn) +
        sectionLabel('Phrases for the Paired Activity', { id: 'phrasespa', label: 'Phrases: discussion' }) +
        M.phraseGroups(d.toolkits.paired) +

        sectionLabel('The six practice topic areas', { id: 'topics', label: 'Topic areas' }) +
        '<p class="lead-sm mb-4">For each topic area: what it covers, questions to think about, and a quick check before the exam.</p>' +
        '<div class="acc">' + d.topics.map(t =>
          '<div class="acc-item"><button class="acc-head" data-action="acc" aria-expanded="false"><span class="pm">+</span><span>' + esc(t.name) + '</span></button><div class="acc-body">' +
          '<h3 class="sub-label mt-4">Key aspects</h3><p>' + esc(t.keyAspects.join(' · ')) + '</p>' +
          '<h3 class="sub-label mt-4">Questions to think about</h3><ul class="sp-after">' + t.guiding.map(q => '<li>' + esc(q) + '</li>').join('') + '</ul>' +
          '<h3 class="sub-label mt-4">Ask yourself before the exam</h3><ul class="sp-after">' + t.selfCheck.map(q => '<li>' + esc(q) + '</li>').join('') + '</ul>' +
          '</div></div>').join('') + '</div>' +

        sectionLabel('Why there is no AI in the trainer', { id: 'why', label: 'Why no AI' }) +
        '<p class="lead-sm mb-4">' + esc(g.why.lead) + '</p>' +
        '<div class="grid g-auto-240">' + g.why.points.map(p => '<div class="card"><div class="card-title">' + esc(p.t) + '</div><div class="card-desc">' + esc(p.d) + '</div></div>').join('') + '</div>' +
        '<div class="page-end"></div>' +
      '</div></div>';
  },
};

/* ═══ CLASS VIEW ════════════════════════════════════════════ */
const C = { kind: 'lt', topic: null, task: null, phase: 0 };
let cClock = null;
function cTopic() { return SP.topic(C.topic) || D().topics[0]; }
function cTasks() { const t = cTopic(); return C.kind === 'lt' ? t.longTurns : t.paired; }
function cTask() { return cTasks().find(x => x.id === C.task) || cTasks()[0]; }
function cPhases() {
  const tm = D().timing;
  return C.kind === 'lt'
    ? [{ label: 'Preparation', sec: SP.prepMinutes() * 60, down: true }, { label: 'Long Turn', sec: tm.longTurn, marks: tm.marks, hints: ['Bullet 1', 'Bullet 2', 'Bullet 3'] }]
    : [{ label: 'Reading time', sec: tm.reading, down: true }, { label: 'Paired Activity', sec: tm.paired, marks: [tm.pairedNarrow], hints: ['Discuss the options', 'Start narrowing down'] }];
}
function cStop() { if (cClock) { cClock.stop(); cClock = null; } }
function cShowHTML() {
  const t = cTopic(), task = cTask(), ph = cPhases(), p = ph[C.phase];
  return '<div class="spc-task">' + (C.kind === 'lt' ? SP.longTurnCard(t.name, task) : SP.pairedCard(t.name, task)) + '</div>' +
    '<div class="spc-side">' +
      '<ol class="spc-phases">' + ph.map((x, i) => '<li class="' + (i === C.phase ? 'on' : i < C.phase ? 'done' : '') + '">' + esc(x.label) + ' <span>' + SP.fmt(x.sec) + '</span></li>').join('') + '</ol>' +
      '<div class="spc-clock" id="spcClock" role="timer">' + (p.down ? SP.fmt(p.sec) : '0:00') + '</div>' +
      '<div class="spc-of">' + (p.down ? esc(p.label) : 'of ' + SP.fmt(p.sec)) + '</div>' +
      '<div class="spc-msg" id="spcMsg" aria-live="polite">' + (p.hints ? esc(p.hints[0]) : '&nbsp;') + '</div>' +
      '<div class="row-wrap spc-btns no-print">' +
        '<button type="button" class="btn btn-primary" data-spc="toggle" id="spcToggle">Start</button>' +
        '<button type="button" class="btn btn-ghost" data-spc="next">' + (C.phase < ph.length - 1 ? 'Next phase' : 'Back to start') + '</button>' +
        '<button type="button" class="btn btn-ghost" data-spc="full">Full screen</button>' +
      '</div>' +
      '<p class="spc-keys no-print">Space starts and pauses. The right arrow goes to the next phase.</p>' +
    '</div>';
}
function cPaint() { cStop(); const el = document.getElementById('spcShow'); if (el) el.innerHTML = cShowHTML(); }
function cToggle() {
  const btn = document.getElementById('spcToggle'), cl = document.getElementById('spcClock'), msg = document.getElementById('spcMsg');
  if (!btn || !cl) return;
  const p = cPhases()[C.phase];
  if (!cClock) {
    cClock = SP.clock({ duration: p.sec, marks: p.marks || [],
      onTick(e) { cl.textContent = p.down ? SP.fmt(Math.ceil(Math.max(0, p.sec - e))) : SP.fmt(e); cl.classList.toggle('over', e >= p.sec); },
      onMark(s) { SP.signal(); if (p.hints) msg.textContent = p.hints[p.marks.indexOf(s) + 1]; },
      onEnd() { SP.signal(); msg.textContent = p.down ? 'Time is up.' : p.label === 'Paired Activity' ? 'Time is up. Say what you have decided.' : 'Time is up. Finish your sentence.'; } });
  }
  if (cClock.running()) { cClock.pause(); btn.textContent = 'Go on'; } else { cClock.start(); btn.textContent = 'Pause'; }
}
function cNext() { const n = cPhases().length; C.phase = (C.phase + 1) % n; cPaint(); }
function cControls() {
  const d = D();
  const opt = (v, l, sel) => '<option value="' + esc(v) + '"' + (sel ? ' selected' : '') + '>' + esc(l) + '</option>';
  return '<div class="spc-controls no-print">' +
    '<label><span>Part</span><select data-spc-sel="kind">' + opt('lt', 'Individual Long Turn', C.kind === 'lt') + opt('pa', 'Paired Activity', C.kind === 'pa') + '</select></label>' +
    '<label><span>Topic area</span><select data-spc-sel="topic">' + d.topics.map(t => opt(t.id, t.name, t.id === cTopic().id)).join('') + '</select></label>' +
    '<label><span>Task</span><select data-spc-sel="task">' + cTasks().map(x => opt(x.id, x.aspect, x.id === cTask().id)).join('') + '</select></label>' +
    '<button type="button" class="btn btn-ghost" data-spc="draw">Draw a task</button>' +
  '</div>';
}
function printCards(list) {
  let host = document.getElementById('spPrint');
  if (!host) { host = document.createElement('div'); host.id = 'spPrint'; document.body.appendChild(host); }
  SP.eagerImages = true;
  host.innerHTML = list.map(x =>
    '<section class="sp-pcard"><div class="sp-pcard-h"><span>Oral exam practice &middot; B2</span><span>' + esc(x.topic.name) + '</span></div>' +
    (x.kind === 'lt' ? SP.longTurnCard(x.topic.name, x.task) : SP.pairedCard(x.topic.name, x.task)) +
    '<div class="sp-pcard-f">Practice task, written for matura.bernhardgmeiner.com. It is not an exam task. CC BY-NC-SA 4.0.</div></section>').join('');
  SP.eagerImages = false;
  document.documentElement.classList.add('sp-printing');
  /* pictures have to be loaded before the print dialog opens */
  const imgs = Array.prototype.slice.call(host.querySelectorAll('img'));
  Promise.all(imgs.map(i => i.decode ? i.decode().catch(() => {}) : null)).then(() => window.print());
}
window.addEventListener('afterprint', () => { document.documentElement.classList.remove('sp-printing'); const h = document.getElementById('spPrint'); if (h) h.remove(); });
function allCards(topicId) {
  const out = [];
  D().topics.forEach(t => { if (topicId && t.id !== topicId) return; t.longTurns.forEach(x => out.push({ kind: 'lt', topic: t, task: x })); t.paired.forEach(x => out.push({ kind: 'pa', topic: t, task: x })); });
  return out;
}

PAGES.speakingclass = {
  title: 'Speaking in class', hidden: true,
  render() {
    if (!C.topic) { C.topic = D().topics[0].id; }
    C.phase = 0;
    return '<div class="page" id="spClass">' +
      pageHead('For teachers', 'Speaking in class', 'Show a task on the projector, run the clock for each phase and print task cards. Nothing is recorded in this view.') +
      '<div class="wrap spc-wrap">' +
        '<div id="spcControls">' + cControls() + '</div>' +
        '<div class="spc-show" id="spcShow">' + cShowHTML() + '</div>' +

        sectionLabel('Printable task cards') +
        '<p class="lead-sm mb-4">The cards are packed onto A4 pages, usually two to a page. Charts print with their source. Pictures are AI-generated and marked as such.</p>' +
        '<div class="row-wrap no-print"><button type="button" class="btn btn-ghost" data-spc="print-one">Print this task</button><button type="button" class="btn btn-ghost" data-spc="print-topic">Print all four tasks of this topic area</button><button type="button" class="btn btn-ghost" data-spc="print-all">Print all 24 tasks</button></div>' +

        sectionLabel('Ideas for a lesson') +
        '<div class="grid g-auto-240">' +
          '<div class="card"><div class="card-title">One task, the whole class</div><div class="card-desc">Show a Long Turn, run the preparation clock, and let everybody write keywords. Then one or two volunteers give the talk, and the class says whether the speaker covered all three bullets, gave an example and gave a reason.</div></div>' +
          '<div class="card"><div class="card-title">Pairs with their phones</div><div class="card-desc">Pairs open the trainer and do a Paired Activity with one phone between them. You walk round and listen. Afterwards each pair names one thing it wants to do better.</div></div>' +
          '<div class="card"><div class="card-title">Mock exam as homework</div><div class="card-desc">Two students do the full mock exam together, at home or in a free period at school, and bring one sentence each: what the partner did well.</div></div>' +
        '</div>' +

        sectionLabel('About the tasks') +
        '<div class="tip">These are practice tasks, written for this site. None of them is an exam task, and none comes from a school&rsquo;s task pool. They follow the usual format: three bullets for the Long Turn, five options for the Paired Activity. Texts: CC BY-NC-SA 4.0. Chart data: Eurostat, CC BY 4.0. Pictures: AI-generated.</div>' +
        '<p class="mt-4"><a href="#speakingguide">How the exam works, criteria, model transcripts and phrases</a> &middot; <a href="#speaking">The trainer for students</a></p>' +
        '<div class="page-end"></div>' +
      '</div></div>';
  },
  wire() {
    const page = document.getElementById('spClass'); if (!page) return;
    const redo = () => { document.getElementById('spcControls').innerHTML = cControls(); C.phase = 0; cPaint(); };
    page.addEventListener('change', e => {
      const s = e.target.closest('[data-spc-sel]'); if (!s) return;
      if (s.dataset.spcSel === 'kind') { C.kind = s.value; C.task = null; }
      else if (s.dataset.spcSel === 'topic') { C.topic = s.value; C.task = null; }
      else C.task = s.value;
      redo();
    });
    page.addEventListener('click', e => {
      const b = e.target.closest('[data-spc]'); if (!b) return;
      const a = b.dataset.spc;
      if (a === 'toggle') cToggle();
      else if (a === 'next') cNext();
      else if (a === 'draw') { const t = M.shuffle(D().topics)[0]; C.topic = t.id; C.task = SP.pickFresh(C.kind === 'lt' ? t.longTurns : t.paired).id; redo(); }
      else if (a === 'full') { const el = document.getElementById('spcShow'); if (document.fullscreenElement) document.exitFullscreen(); else if (el.requestFullscreen) el.requestFullscreen().catch(() => {}); else M.toast('Full screen is not available in this browser'); }
      else if (a === 'print-one') printCards([{ kind: C.kind, topic: cTopic(), task: cTask() }]);
      else if (a === 'print-topic') printCards(allCards(cTopic().id));
      else if (a === 'print-all') printCards(allCards(null));
    });
  },
};
document.addEventListener('keydown', e => {
  if (!document.getElementById('spcShow') || e.altKey || e.ctrlKey || e.metaKey) return;
  const tag = (e.target.tagName || '').toLowerCase();
  if (tag === 'input' || tag === 'select' || tag === 'textarea' || tag === 'button' || tag === 'a' || (e.target.closest && e.target.closest('summary,[role="slider"],[contenteditable]'))) return;
  if (document.documentElement.classList.contains('sp-open')) return;
  if (e.key === ' ') { e.preventDefault(); cToggle(); }
  else if (e.key === 'ArrowRight') { e.preventDefault(); cNext(); }
});
window.addEventListener('hashchange', cStop);
})();
