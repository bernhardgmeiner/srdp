/* ════════════════════════════════════════════════════════════
   Pages 1 – Home · Overview · Exam day · Text types
   ════════════════════════════════════════════════════════════ */
(function () {
'use strict';
const M = window.MWG;
const { esc, sectionLabel, pageHead, ddCols, chips, phraseGroups, modelBox, TYPE_COLORS } = M;
function qfWordCount(t) {
  const wc = (t.quickFacts || []).find(f => f.label === 'Word count');
  if (M.school() === 'bhs' && ['article', 'report', 'blog'].indexOf(t.id) >= 0) return '~250 words';
  return wc ? wc.value : '';
}
function qfBadge(t) {
  const bhs = M.school() === 'bhs';
  if (t.id === 'essay') return 'AHS only';
  if (t.id === 'leaflet') return 'BHS only · Broschüre';
  if (t.id === 'blog') return 'Post or comment';
  return bhs ? 'One of three tasks' : 'One of two tasks';  // article, report, e-mail
}
window.PAGES = window.PAGES || {};

/* ─── HOME ────────────────────────────────────────────────── */
/* Lernseiten, die in den Fortschritt zählen (ohne FAQ, Teachers, Parents, Notebook, Plan, Timer) */
function learnIds() {
  return ['overview', 'examiner'].concat(M.typesForSchool().map(t => t.id))
    .concat(['paragraphs', 'grammar', 'phrasebank', 'topicvocab', 'taskbank', 'selfcheck', 'checklist', 'practice']);
}
/* Empfohlene Reihenfolge für "Next up" (ohne Prüfungsdatum) */
function pathIds() {
  const types = M.typesForSchool().map(t => t.id);
  return ['overview', types[0], 'paragraphs', 'taskbank', 'selfcheck', 'examiner']
    .concat(types.slice(1)).concat(['grammar', 'phrasebank', 'topicvocab', 'checklist', 'practice']);
}
function navLabel(id) {
  let lab = id;
  M.NAV.forEach(sec => sec.items.forEach(it => { if (it.id === id) lab = it.label; }));
  const t = SRDP.textTypes.find(x => x.id === id);
  return t ? 'The ' + t.name.toLowerCase() : lab;
}
M.learnIds = learnIds;

/* Aktiver Plan (Schularbeit oder Matura), nur wenn ein Datum gespeichert ist; der nähere gewinnt */
function activePlan() {
  const sa = M.testPlan ? M.testPlan.status() : null;
  const ma = M.planStatus ? M.planStatus() : null;
  const saOk = sa && sa.daysLeft !== null && sa.daysLeft >= 0;
  const maOk = ma && ma.daysLeft !== null && ma.daysLeft >= 0;
  if (saOk && (!maOk || sa.daysLeft <= ma.daysLeft)) return { kind: 'test', s: sa };
  if (maOk) return { kind: 'matura', s: ma };
  return null;
}
M.activePlan = activePlan;

function planCard() {
  const ap = activePlan();
  if (!ap) return '';
  const s = ap.s, dl = s.daysLeft;
  const what = ap.kind === 'test' ? 'your Schularbeit (' + esc(s.label) + ')' : 'the Matura';
  if (dl === 0) {
    return '<section class="start-card is-green no-print" aria-labelledby="startH">' +
      '<h2 class="start-h" id="startH">Today is ' + what + '. Good luck!</h2>' +
      '<p class="start-p">Read the task twice, plan your time and keep time for proofreading. For a last look, open the <a href="#checklist">final checklist</a>.</p>' +
    '</section>';
  }
  let title, tasks;
  if (ap.kind === 'test') {
    tasks = s.nextTasks || [];
    title = s.nextOffset === 0 ? 'Today' : 'Next';
  } else {
    const day = M.planDay(s.planId, s.dayIndex);
    tasks = day ? day.tasks : [];
    title = (s.isToday ? 'Today' : (s.started ? 'Next' : 'Your first step')) + ': Day ' + s.dayNumber + ' – ' + esc(s.dayTitle);
  }
  const mins = tasks.reduce((a, t) => a + (t.min || 0), 0);
  return '<section class="start-card' + (dl <= 7 ? ' is-green' : '') + ' no-print" aria-labelledby="startH">' +
    '<div class="start-top"><span class="start-days">' + dl + ' day' + (dl === 1 ? '' : 's') + ' until ' + (ap.kind === 'test' ? 'your Schularbeit' : 'the Matura') + '</span>' +
      '<span class="start-meta">' + s.done + ' of ' + s.total + ' tasks done</span></div>' +
    '<h2 class="start-h" id="startH">' + title + '</h2>' +
    (tasks.length ? '<ul class="start-tasks">' + tasks.map(t => '<li>' + t.t + (t.min ? ' <span class="start-min">' + t.min + ' min</span>' : '') + '</li>').join('') + '</ul>' : '') +
    '<div class="start-row">' +
      '<a class="btn btn-primary" href="#studyplan">Open my plan <span aria-hidden="true">&rarr;</span></a>' +
      (mins ? '<span class="start-min">About ' + mins + ' minutes</span>' : '') +
    '</div>' +
  '</section>';
}

function waysBlock() {
  const ways = [
    ['<button type="button" class="way-card" data-scroll-to="types">', '</button>', 'Learn a text type', 'Guides, model texts, phrases and a quiz for each text type. Good for class and for revising.'],
    ['<a class="way-card" href="#taskbank">', '</a>', 'Write a text and check it', 'Pick a task, write it, and let the self-check look at your draft. Good for homework.'],
    ['<a class="way-card" href="#studyplan">', '</a>', 'Plan for a test', 'A day-by-day plan for your next Schularbeit or for the Matura, plus a mock exam.'],
  ];
  return '<nav class="ways no-print" aria-label="What do you want to do?">' + ways.map(w =>
    w[0] + '<span class="way-t">' + w[2] + ' <span aria-hidden="true">&rarr;</span></span><span class="way-d">' + w[3] + '</span>' + w[1]).join('') + '</nav>';
}

PAGES.home = {
  title: 'Home',
  render() {
    const prog = M.progress();
    const ids = learnIds();
    const visited = ids.filter(id => prog[id] && prog[id].visited).length;
    const quizIds = M.typesForSchool().map(t => t.id).concat('final');
    const quizzes = quizIds.filter(id => prog[id] && prog[id].quiz).length;
    const hasDate = !!activePlan();
    const nextId = pathIds().find(id => !(prog[id] && prog[id].visited));
    const sc = M.schoolConfig();
    const first = M.typesForSchool()[0] || { id: 'article', name: 'Article' };
    return '<div class="page home">' +
      '<div class="page-head home-head"><div class="inner home-inner">' +
        '<div class="eyebrow"><span lang="de">' + esc(sc.eyebrow || 'Schriftliche Reifeprüfung · English B2') + ' (<a href="https://www.bernhardgmeiner.com" target="_blank" rel="noopener">Bernhard Gmeiner</a>)</span></div>' +
        '<h1 class="title home-title">Don&rsquo;t panic, it&rsquo;s just the Matura.</h1>' +
        '<p class="lead">Guides, model texts and practice tasks for every text type of the written English exam. For homework, Schularbeiten and the Matura (' + esc(sc.label || 'AHS') + ', B2).</p>' +
        '<p class="home-de" lang="de">Diese Seite begleitet durch die Oberstufe: Textsorten lernen, Hausübungen schreiben, auf Schularbeiten und die Matura vorbereiten. Alle Lerninhalte sind auf Englisch. <a href="#parents">Für Eltern</a></p>' +
        planCard() +
        waysBlock() +
      '</div></div>' +
      '<div class="wrap home-wrap">' +
        (visited > 0
          ? '<div class="home-prog no-print"><span>Your progress: <strong>' + visited + ' of ' + ids.length + '</strong> sections visited · <strong>' + quizzes + ' of ' + quizIds.length + '</strong> quizzes passed</span>' +
            (!hasDate && nextId ? '<a href="#' + nextId + '">Next up: ' + esc(navLabel(nextId)) + ' <span aria-hidden="true">&rarr;</span></a>' : '') + '</div>'
          : '') +
        '<div class="gap-s"></div>' +
        '<h2 class="section-label" id="types" tabindex="-1">The text types</h2>' +
        '<div class="grid g-auto-280">' +
          M.typesForSchool().map(t => {
            const p = prog[t.id] || {};
            const mark = (on, lab) => '<span class="tt-step' + (on ? ' on' : '') + '">' + (on ? '✓ ' : '') + lab + '</span>';
            return '<a class="card link tt-card" href="#' + t.id + '" style="--tc:' + TYPE_COLORS[t.color] + '">' +
              '<span class="tt-name"><span class="tt-dot" aria-hidden="true"></span>' + esc(t.name) + '</span>' +
              '<span class="tt-tag">' + esc(t.tagline) + '</span>' +
              '<span class="tt-meta">' + esc(qfWordCount(t)) + ' · ' + esc(t.quickFacts[1].value) + '</span>' +
              '<span class="tt-steps">' + mark(p.visited, 'Guide') + mark(p.model, 'Model text') + mark(p.quiz, 'Quiz') + '</span>' +
            '</a>';
          }).join('') +
        '</div>' +
        '<div class="gap"></div>' +
        sectionLabel('The written Matura at a glance') +
        '<div class="grid g-auto-150">' +
          [[(sc.timeStat || '120 min'), (sc.timeStatSub || 'total writing time')], [(sc.tasksStat || '2 tasks'), (sc.tasksStatSub || '~400 + ~250 words')], ['4 × 0–10', 'equally weighted criteria'], ['±10%', 'word count tolerance']].map(s =>
            '<div class="card"><div class="stat-v">' + s[0] + '</div><div class="stat-l">' + s[1] + '</div></div>').join('') +
        '</div>' +
        '<p class="home-more"><a href="#overview">How the four criteria work and how bands become a grade <span aria-hidden="true">&rarr;</span></a></p>' +
        '<div class="gap"></div>' +
        sectionLabel('Practise and look things up') +
        '<ul class="home-links">' +
          [
            ['taskbank', 'Task bank', 'Matura-style tasks with input material'],
            ['timer', 'Mock exam', 'A full Matura paper against the clock, then check your texts'],
            ['selfcheck', 'Self-check & checklist', 'Paste a draft and get quick feedback'],
            ['studyplan', 'Study plan', 'For your next Schularbeit or the Matura'],
            ['examiner', 'Grade like an examiner', 'Rate example texts, then compare'],
            ['paragraphs', 'Paragraph writing', 'Four steps to a good body paragraph'],
            ['practice', 'Practice zone', 'Spot mistakes, switch register, final quiz'],
            ['phrasebank', 'Phrases & vocabulary', 'Phrases and topic words to copy'],
            ['grammar', 'Grammar kit', 'Where German sneaks into your English'],
          ].map(l => '<li><a href="#' + l[0] + '"><span class="hl-t">' + l[1] + '</span><span class="hl-d">' + l[2] + '</span></a></li>').join('') +
        '</ul>' +
        '<div class="gap"></div>' +
        sectionLabel('Six mistakes that cost the most marks') +
        '<p class="home-intro">All six are habits you can change. The <a href="#overview">overview</a> explains each one and lists two more.</p>' +
        '<div class="grid g-auto-280">' +
          [
            ['A content point is missing', 'Task Achievement drops sharply.'],
            ['Sentences copied from the task', 'Copied language does not count for Range.'],
            ['Only simple grammar', 'Range stays in the low bands.'],
            ['Wrong register for the text type', 'A formal blog or a chatty report loses marks.'],
            ['More than 10% too long or too short', 'Task Achievement drops one band.'],
            ['No time left to proofread', 'You lose marks for errors you would find in three minutes.'],
          ].map(w =>
            '<div class="card pit-card"><div class="pit-t">' + w[0] + '</div><div class="pit-d">' + w[1] + '</div></div>').join('') +
        '</div>' +
        '<div class="page-end"></div>' +
      '</div>' +
    '</div>';
  },
};

/* Notenberechnung: Korrektur- und Beurteilungsanleitung SRP LFS B1/B2 (AHS bzw. BHS), BMB/IQS, Sept. 2024 */
function gradeBlock() {
  const bhs = M.school() === 'bhs';
  const steps = bhs ? [
    'Your three texts get <strong>12 band scores</strong> (3 texts × 4 criteria, each 0–10). That is 120 points at most, and all three texts count the same.',
    'They are converted into the <strong>50 points</strong> of the Writing section: your total ÷ 120 × 50. Reading and listening count 25 points each.',
    'To pass, you need at least <strong>60 of 100 points</strong> overall and at least <strong>25 points</strong> in each area: reading + listening, and writing.',
  ] : [
    'Your two texts get <strong>8 band scores</strong> (2 texts × 4 criteria, each 0–10). That is 80 points at most, and both texts count the same.',
    'They are converted into the <strong>25 points</strong> of the Writing section: your total ÷ 80 × 25. Reading, listening and language in use count 25 points each.',
    'To pass, you need at least <strong>60 of 100 points</strong> overall and at least <strong>25 points</strong> in each area: reading + listening, and language in use + writing.',
  ];
  const example = bhs
    ? 'Example: band 6 on all twelve criteria is 72 of 120, which gives 30 of 50 points (60%).'
    : 'Example: band 6 on all eight criteria is 48 of 80, which gives 15 of 25 points (60%).';
  return '<ol class="grade-steps">' + steps.map(x => '<li>' + x + '</li>').join('') + '</ol>' +
    '<div class="tbl-wrap" tabindex="0" role="group" aria-label="Grade thresholds"><table class="tbl tbl-narrow"><thead><tr><th scope="col">Points (of 100)</th><th scope="col">Grade <span lang="de">(Note)</span></th></tr></thead><tbody>' +
      [['90 or more', 'Sehr gut'], ['80 or more', 'Gut'], ['70 or more', 'Befriedigend'], ['60 or more', 'Genügend'], ['under 60, or under 25 in one area', 'Nicht genügend']]
        .map(r => '<tr><td>' + r[0] + '</td><td lang="de">' + r[1] + '</td></tr>').join('') +
    '</tbody></table></div>' +
    '<div class="tip mt-4">' + example + ' Band 6 is the B2 minimum. A weaker text can still be balanced by the other parts of the exam.</div>' +
    '<p class="text-xs muted mt-3">Source: the official correction and assessment guide for the written exam in modern foreign languages (BMB/IQS, September 2024). Your teachers apply it. If anything is unclear, ask them.</p>';
}

/* ─── OVERVIEW & GRADING ──────────────────────────────────── */
PAGES.overview = {
  title: 'Overview & grading', track: 'overview',
  render() {
    const d = SRDP;
    return '<div class="page">' +
      pageHead('Learn', 'Overview &amp; grading', 'How the Writing section works, how your texts are graded and how the bands become your grade. Read this page first. It takes about ten minutes.') +
      '<div class="wrap"><div class="gap-s"></div>' +
        '<a class="btn btn-ghost no-print" href="/pdf/overview' + (M.school() === 'bhs' ? '-bhs' : '') + '.pdf" target="_blank" rel="noopener" style="margin-bottom:20px">Download this page as a PDF (' + esc(M.schoolConfig().label || 'AHS') + ') <span>&darr;</span></a>' +
        sectionLabel('The Writing section', { id: 'writing', label: 'The Writing section' }) +
        '<p style="font-size:1.1rem;color:var(--text-secondary);line-height:1.6;margin-bottom:22px;max-width:720px">' + (M.schoolConfig().overviewIntro || 'You have <strong style="color:var(--text)">120 minutes</strong> for two tasks.') + '</p>' +
        '<div class="tip">' + (M.schoolConfig().timeSplitTip || 'Plan your time before you start: divide the minutes across the tasks and keep time to proofread.') + '</div>' +
        '<div class="gap-s"></div>' +
        '<div class="tbl-wrap" tabindex="0" role="group" aria-label="Table (scroll sideways on small screens)"><table class="tbl"><thead><tr>' +
          ['Text type', 'Word count', 'Register', 'Title?', 'Key feature'].map(h => '<th>' + h + '</th>').join('') +
        '</tr></thead><tbody>' +
          M.typesForSchool().map(t =>
            '<tr class="rowlink" data-goto="' + t.id + '"><td><span style="display:inline-flex;align-items:center;gap:8px"><span aria-hidden="true" style="width:8px;height:8px;background:' + TYPE_COLORS[t.color] + '"></span><a href="#' + t.id + '" style="color:inherit;font-weight:500">' + esc(t.name) + '</a></span></td>' +
            '<td>' + esc(qfWordCount(t)) + '</td><td>' + esc(t.quickFacts[1].value) + '</td><td>' + esc(t.quickFacts[2].value) + '</td><td style="color:var(--text-muted)">' + esc(t.tagline) + '</td></tr>').join('') +
        '</tbody></table></div>' +
        '<div class="gap-s"></div>' +
        '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px">' +
          '<div class="tip">' + (M.schoolConfig().wordCountTip || 'Word count tolerance: ±10%. If you are further off than that, Task Achievement is reduced by one band.') + '</div>' +
          '<div class="tip">Almost every task lists three <strong>content points</strong> (the three bullet points in the task). Cover each one, usually in its own body paragraph.</div>' +
          '<div class="tip"><strong>Register</strong> means how formal or casual your language is. Compare a letter to a company with a message to a friend.</div>' +
        '</div>' +
        '<div class="tip mt-5">Practise with real exams too. The tasks on this site are written in the Matura style. The official past papers are in the BMB download area at <a href="https://www.matura.gv.at/downloads" target="_blank" rel="noopener">matura.gv.at/downloads</a>.</div>' +
        '<div class="gap"></div>' +
        sectionLabel('How you are graded – the four criteria', { id: 'criteria', label: 'The four criteria' }) +
        '<p class="lead-sm mb-5">Each text is rated with the official scale: four criteria, each scored <strong>0–10</strong> and weighted equally. A weaker criterion can be balanced by a stronger one.</p>' +
        '<div class="grid g-auto-240">' +
          M.assessmentCriteria().map((c, i) =>
            '<div class="card" style="border-top:3px solid var(--primary)">' +
              '<div style="font-weight:300;font-size:1.6rem;margin-bottom:8px">0' + (i + 1) + '</div>' +
              '<div style="font-weight:600;margin-bottom:3px">' + c.name + '</div>' +
              '<div lang="de" style="font-size:.75rem;color:var(--text-muted);margin-bottom:11px;letter-spacing:.32px">' + c.german + '</div>' +
              '<div style="font-size:.875rem;color:var(--text-secondary);line-height:1.55">' + c.detail + '</div>' +
            '</div>').join('') +
        '</div>' +
        '<div class="gap-s"></div>' +
        '<div class="tip warn"><strong>VETO rule:</strong> if a text does not address the set task at all (an off-topic or clearly pre-prepared text that ignores the actual prompt), Task Achievement is rated 0 and the other three criteria are not assessed. Writing in the wrong text type alone does not trigger this. Read every task twice.</div>' +
        '<div class="tip warn"><strong>Don&rsquo;t play it safe with grammar.</strong> A text built only on simple sentences cannot reach the upper Range bands, even if every sentence is correct. Work in a passive, a conditional or a relative clause where it fits naturally.</div>' +
        '<div class="gap"></div>' +
        sectionLabel('What the bands mean (simplified)', { id: 'bands', label: 'What the bands mean' }) +
        '<div class="acc">' + d.assessment.bands.map((b, i) =>
          '<div class="acc-item' + (i === 0 ? ' open' : '') + '"><button class="acc-head" data-action="acc" aria-expanded="' + (i === 0 ? 'true' : 'false') + '"><span class="pm">+</span><span>' + b.band + ' · ' + b.label + '</span></button>' +
          '<div class="acc-body"><p style="font-size:.9rem;color:var(--text-secondary);line-height:1.6;padding-top:10px">' + b.desc + '</p></div></div>').join('') +
        '</div>' +
        '<p class="text-xs muted mt-3">Simplified from the official B2 assessment scale (BMB, 2023 revision). The scale describes bands 0, 2, 4, 6, 8 and 10. The odd-numbered bands (1, 3, 5, 7, 9) are for texts between two descriptions. Your teachers grade with the full official scale.</p>' +
        '<div class="gap"></div>' +
        sectionLabel('From bands to your grade', { id: 'grade', label: 'Your grade' }) +
        gradeBlock() +
        '<div class="gap"></div>' +
        sectionLabel('The 8 most expensive mistakes', { id: 'mistakes', label: 'The 8 expensive mistakes' }) +
        '<p class="lead-sm mb-4">Each one is a habit you can change.</p>' +
        '<div class="tbl-wrap" tabindex="0" role="group" aria-label="Table (scroll sideways on small screens)"><table class="tbl"><thead><tr><th>Mistake</th><th>What it costs</th><th>The fix</th></tr></thead><tbody>' +
          SRDP.mistakes.map(r => '<tr><td>' + r[0] + '</td><td style="color:var(--red)">' + r[1] + '</td><td>→ ' + r[2] + '</td></tr>').join('') +
        '</tbody></table></div>' +
        '<div class="page-end"></div>' +
      '</div>' +
    '</div>';
  },
};

/* ─── TEXT TYPE PAGES ─────────────────────────────────────── */
const typeTabs = {};
const TYPE_EXAMPLES = SRDP.typeExamples;
const SECOND_MODELS = SRDP.secondModels;
function secondModelBox(m) {
  return '<div class="gap-s"></div>' +
    '<div class="acc"><div class="acc-item"><button class="acc-head" data-action="acc" aria-expanded="false"><span class="pm">+</span><span>A second model text (a different topic)</span></button>' +
    '<div class="acc-body">' +
      '<h3 class="sm-title">' + esc(m.title) + '</h3>' +
      '<div class="sm-meta">' + esc(m.meta) + '</div>' +
      '<div class="sm-text">' + m.paras.map(function(p){ return '<p' + (p.mono ? ' class="mono-line"' : '') + '>' + esc(p.t).replace(/\n/g, '<br>') + '</p>'; }).join('') + '</div>' +
      '<div class="tip mt-4">' + esc(m.tip) + '</div>' +
    '</div></div></div>';
}

/* "Practise this text type": drei passende Aufgaben + Wege zu Task bank, Self-check, Mock exam */
function practiseBlock(t) {
  const list = (M.tbPrompts ? M.tbPrompts() : []).filter(x => x.p.type === t.id);
  if (!list.length) return '';
  const pick = list.slice(0, 3);
  return '<div class="gap-s"></div>' +
    '<section class="practise-box no-print" id="sec-practise" data-toc-anchor="Practise" aria-labelledby="practiseH">' +
      '<h2 class="section-label" id="practiseH">Practise this text type</h2>' +
      '<p class="lead-sm mb-4">Pick a task, write it, then let the self-check look at your draft. ' + (list.length > 3 ? 'The task bank has ' + list.length + ' ' + esc(t.name.toLowerCase()) + ' tasks.' : '') + '</p>' +
      '<div class="acc">' + pick.map(x =>
        '<div class="acc-item"><button class="acc-head" data-action="acc" aria-expanded="false"><span class="pm">+</span><span>' + esc(x.p.topic) + '</span><span class="sub">~' + x.p.length + ' words</span></button>' +
        '<div class="acc-body">' + (M.taskCard ? M.taskCard(x.p, x.i, { inAcc: true }) : '') + '</div></div>').join('') +
      '</div>' +
      '<div class="row-wrap mt-4">' +
        '<button class="btn btn-ghost" data-action="tb-show-type" data-type="' + t.id + '">All ' + esc(t.name.toLowerCase()) + ' tasks <span aria-hidden="true">&rarr;</span></button>' +
        '<a class="btn btn-ghost" href="#timer">Mock exam <span aria-hidden="true">&rarr;</span></a>' +
      '</div>' +
    '</section>';
}

function typePage(typeId) {
  const t = SRDP.textTypes.find(x => x.id === typeId);
  const col = TYPE_COLORS[t.color];
  const typeOrder = M.typesForSchool();
  const typeIdx = typeOrder.findIndex(x => x.id === typeId);
  const nextType = typeIdx >= 0 && typeIdx < typeOrder.length - 1 ? typeOrder[typeIdx + 1] : null;
  const quizzes = (SRDP.quizzes[typeId] || []).filter(q => !q.schools || q.schools.indexOf(M.school()) >= 0);
  const tab = typeTabs[typeId] || 'guide';
  const tabs = [
    ['guide', 'Guide'], ['model', 'Model text'], ['phrases', 'Phrases'],
  ];
  if (typeId === 'email') tabs.push(['subtypes', 'Sub-types']);
  tabs.push(['quiz', 'Quiz (' + quizzes.length + ')']);
  tabs.push(['dnd', 'Build the text']);

  let body = '';
  if (tab === 'guide') {
    body = sectionLabel('Layout', { id: 'layout', label: 'Layout' }) +
      '<div class="layout-box" style="border-left-color:' + col + '">' +
        t.layout.map(r => '<div><span class="part">' + esc(r.part) + '</span>' + (r.note ? ' <span class="note">– ' + esc(r.note) + '</span>' : '') + '</div>').join('') +
      '</div><div class="gap-s"></div>' +
      sectionLabel('Do&rsquo;s and don&rsquo;ts', { id: 'dos', label: 'Do\u2019s and don\u2019ts' }) + ddCols(t.dos, t.donts) +
      (TYPE_EXAMPLES[typeId] ?
        '<div class="gap-s"></div>' +
        '<div class="acc" id="sec-example" data-toc-anchor="Example"><div class="acc-item"><button class="acc-head" data-action="acc" aria-expanded="false"><span class="pm">+</span><span>Weaker and stronger: an example</span></button>' +
        '<div class="acc-body">' +
          '<div class="grid g-2" style="margin-top:12px">' +
            '<div class="dd-col dont"><h3>Weaker</h3><p style="font-size:.9rem;line-height:1.55;color:var(--text-secondary);font-style:italic">&ldquo;' + esc(TYPE_EXAMPLES[typeId].weak) + '&rdquo;</p></div>' +
            '<div class="dd-col do"><h3>Stronger</h3><p style="font-size:.9rem;line-height:1.55;color:var(--text-secondary);font-style:italic">&ldquo;' + esc(TYPE_EXAMPLES[typeId].strong) + '&rdquo;</p></div>' +
          '</div>' +
          '<p class="text-base muted mt-4"><strong class="text-strong">Why it matters: </strong>' + esc(TYPE_EXAMPLES[typeId].why) + '</p>' +
        '</div></div></div>'
      : '') +
      '<div class="gap-s"></div>' +
      '<div class="tip" id="sec-tip" data-toc-anchor="Key tip" style="border-left-color:' + col + '"><strong>Key tip · </strong>' + esc(t.tip) + '</div>' +
      (t.noPdf ? '' :
        '<div class="gap-s"></div>' +
        '<div class="no-print" id="sec-pdf" data-toc-anchor="PDF" style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">' +'<a class="btn btn-primary" href="/pdf/' + typeId + '.pdf" target="_blank" rel="noopener">Download this guide as a PDF <span>&darr;</span></a>' +'<span class="text-sm muted">The whole guide as a PDF, for revising on paper.</span>' +'</div>');
  } else if (tab === 'model') {
    body = (typeId === 'blog' ? '<div class="tip" style="margin-bottom:16px">This model is a blog <strong>post</strong>. A blog <strong>comment</strong> works differently: no title, and the first sentence refers to the post it responds to (see the Key tip on the Guide tab).</div>' : '') + '<div style="margin-bottom:14px;font-size:1rem;color:var(--text)"><strong>' + esc(t.modelText.title) + '</strong></div>' + modelBox(t.modelText) + (SECOND_MODELS[typeId] ? secondModelBox(SECOND_MODELS[typeId]) : '') + (M.honestModel ? M.honestModel(typeId) : '');
  } else if (tab === 'phrases') {
    body = phraseGroups(t.phrases) +
      '<div style="font-size:.75rem;color:var(--text-muted);border-top:1px solid var(--border);padding-top:14px;letter-spacing:.32px">Click any phrase to copy it. The full searchable collection lives in the <a href="#phrasebank">phrase bank</a>.</div>';
  } else if (tab === 'subtypes' && typeId === 'email') {
    body = '<p style="font-size:.9375rem;color:var(--text-secondary);margin-bottom:20px;line-height:1.55">At B2, the e-mail task is usually formal and falls into one of four sub-types. Open the one your task asks for; each comes with phrases and a model text.</p>' +
      '<div class="acc">' + SRDP.emailSubTypes.map(st =>
        '<div class="acc-item"><button class="acc-head" data-action="acc" aria-expanded="false"><span class="pm">+</span><span>' + st.name + '</span></button>' +
        '<div class="acc-body">' +
          '<p style="font-size:.9375rem;color:var(--text-secondary);margin:10px 0 18px;line-height:1.55">' + esc(st.purpose) + '</p>' +
          '<div class="layout-box" style="border-left-color:' + col + ';margin-bottom:18px;font-size:.8125rem;line-height:1.7">' + esc(st.layoutNotes) + '</div>' +
          ddCols(st.dos, st.donts) + '<div style="height:18px"></div>' +
          st.phrases.map(g => '<div style="margin-bottom:16px"><div style="font-size:.75rem;color:var(--text-muted);margin-bottom:9px;letter-spacing:.32px">' + esc(g.category) + '</div>' + chips(g.items) + '</div>').join('') +
          '<div class="tip" style="border-left-color:' + col + ';margin-top:10px"><strong>Key tip · </strong>' + esc(st.tip) + '</div>' +
          (st.modelText
            ? '<div style="height:22px"></div><div style="font-size:.875rem;font-weight:600;margin-bottom:10px">Model text: ' + esc(st.modelText.title) + '</div>' + modelBox(st.modelText)
            : '<div style="margin-top:14px;font-size:.8125rem;color:var(--text-muted)">' + esc(st.modelNote || '') + '</div>') +
        '</div></div>').join('') +
      '</div>' +
      '<div class="gap-s"></div>' +
      '<div class="grid g-2">' +
        '<div class="card"><div style="font-weight:600;color:var(--blue);margin-bottom:6px">Dear Sir or Madam,</div><div>→ Yours faithfully,</div><div style="font-size:.75rem;color:var(--text-muted);margin-top:4px">Name unknown</div></div>' +
        '<div class="card"><div style="font-weight:600;color:var(--green);margin-bottom:6px">Dear Mr / Ms [Name],</div><div>→ Yours sincerely,</div><div style="font-size:.75rem;color:var(--text-muted);margin-top:4px">Name known</div></div>' +
      '</div>';
  } else if (tab === 'quiz') {
    body = '<div data-quiz-host="' + typeId + '"></div>';
  } else if (tab === 'dnd') {
    body = '<p style="font-size:.9375rem;color:var(--text-secondary);margin-bottom:18px;line-height:1.5">Put these sentences into the correct structural order. Drag them on a computer, or use the ▲▼ buttons on any device, including your phone.</p>' +
      '<div data-dnd-host="' + typeId + '"></div>';
  }

  return '<div class="page">' +
    '<div class="page-head"><div class="inner">' +
      '<div class="eyebrow"><span style="width:10px;height:10px;background:' + col + '"></span>Text type · ' + esc(qfBadge(t)) + '</div>' +
      '<h1 class="title">The ' + esc(t.name.toLowerCase()) + '</h1>' +
      '<p class="lead">' + esc(t.tagline) + '</p>' +
      '<div class="tabs">' + tabs.map(tb => '<button class="tab' + (tab === tb[0] ? ' active' : '') + '" data-action="type-tab" data-type="' + typeId + '" data-tab="' + tb[0] + '">' + tb[1] + '</button>').join('') + '</div>' +
    '</div></div>' +
    '<div class="wrap"><div class="gap-s"></div>' +
      '<div class="grid g-auto-150" style="margin-bottom:38px">' +
        t.quickFacts.map(f => '<div class="card" style="padding:15px 16px"><div style="font-size:.75rem;color:var(--text-muted);margin-bottom:6px;letter-spacing:.32px">' + esc(f.label) + '</div><div style="font-size:.9375rem;font-weight:600">' + esc(f.label === 'Word count' ? qfWordCount(t) : f.value) + '</div></div>').join('') +
      '</div>' +
      body +
      ((tab === 'guide' || tab === 'model') ? practiseBlock(t) : '') +
      '<div class="gap-s"></div>' +
      '<div class="row-wrap type-foot">' +
        '<a class="btn btn-ghost" href="#overview"><span aria-hidden="true">&larr;</span> Overview</a>' +
        (nextType ? '<a class="btn btn-ghost" href="#' + nextType.id + '">Next: ' + esc(nextType.name) + ' <span>&rarr;</span></a>' : '') +
      '</div>' +
      '<div class="page-end"></div>' +
    '</div>' +
  '</div>';
}
SRDP.textTypes.forEach(t => {
  PAGES[t.id] = {
    title: t.name, track: t.id,
    render() { return typePage(t.id); },
    wire() {
      const tab = typeTabs[t.id] || 'guide';
      if (tab === 'model') { const pr = M.progress(); pr[t.id] = Object.assign({}, pr[t.id], { visited: true, model: true }); M.store('mwg_progress', pr); }
      if (tab === 'quiz') {
        const qz = (SRDP.quizzes[t.id] || []).filter(q => !q.schools || q.schools.indexOf(M.school()) >= 0);
        if (qz.length) {
          if (!M.quizStates[t.id] || M.quizStates[t.id]._stale) M.initQuiz(t.id, qz, (score, total) => { if (score >= Math.ceil(total * 0.6)) M.markQuiz(t.id); });
          const host = M.$('[data-quiz-host="' + t.id + '"]');
          if (host) host.innerHTML = M.quizHTML(t.id);
        }
      }
      if (tab === 'dnd') {
        if (SRDP.dndSets[t.id]) { M.initDnd(t.id, SRDP.dndSets[t.id]); M.repaintDnd(t.id); }
      }
    },
  };
});
window.MWG.typeTabs = typeTabs;
})();
