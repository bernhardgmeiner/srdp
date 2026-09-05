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
PAGES.home = {
  title: 'Home',
  render() {
    const prog = M.progress();
    const navFlat = [];
    M.NAV.forEach(sec => sec.items.forEach(it => { if (it.id !== 'home') navFlat.push(it); }));
    const trackable = navFlat.map(it => it.id);
    const visited = trackable.filter(id => prog[id] && prog[id].visited).length;
    const quizIds = M.typesForSchool().map(t => t.id).concat('final');
    const quizzes = quizIds.filter(id => prog[id] && prog[id].quiz).length;
    const pct = Math.round((visited / trackable.length) * 100);
    const next = navFlat.find(it => !(prog[it.id] && prog[it.id].visited)) || null;
    return '<div class="page">' +
      '<div class="page-head" style="padding-bottom:56px"><div class="inner" style="max-width:1100px">' +
        '<div class="eyebrow"><span lang="de">' + esc(M.schoolConfig().eyebrow || 'Schriftliche Reifeprüfung · English B2') + ' (<a href="https://www.bernhardgmeiner.com" target="_blank" rel="noopener">Bernhard Gmeiner</a>)</span></div>' +
        '<h1 class="title" style="font-size:clamp(2.3rem,5.5vw,4.4rem);max-width:880px">Don&rsquo;t panic, it&rsquo;s just the Matura.</h1>' +
        '<p class="lead">Everything you need for the ' + (M.schoolConfig().tasksWord || 'two') + ' writing tasks of the English Matura. Start with the overview, or jump straight to the text type you are practising this week.</p>' +'<p lang="de" style="font-size:.9375rem;color:var(--text-muted);max-width:620px;margin:-14px 0 26px;line-height:1.5">Diese Seite hilft bei der Vorbereitung auf die schriftliche Englisch-Matura (' + esc(M.schoolConfig().label || 'AHS') + ', B2). Alle Lerninhalte sind auf Englisch.</p>' +
        '<div style="display:flex;gap:1px;flex-wrap:wrap">' +
          '<a class="btn btn-primary" href="#overview" style="min-width:200px">Start with the overview <span>→</span></a>' +
          '<a class="btn btn-ghost" href="#' + ((M.typesForSchool()[0] || {}).id || 'article') + '" style="min-width:170px">Jump to the ' + esc(((M.typesForSchool()[0] || {}).name || 'text types').toLowerCase()) + ' <span>→</span></a>' +
        '</div>' +
      '</div></div>' +
      '<div class="wrap" style="max-width:1100px">' +
        (M.homeHint ? M.homeHint(visited > 0 ? 'Your progress: ' + visited + '/' + trackable.length + ' sections · ' + quizzes + '/' + quizIds.length + ' quizzes' : '', next) : '') +
        '<div class="gap-s"></div>' +
        sectionLabel('How to use this guide') +
        '<p style="font-size:1rem;color:var(--text-secondary);line-height:1.6;max-width:680px;margin-bottom:22px">New here? These four steps are the short version. Follow them in order, or jump straight to whatever you are practising this week.</p>' +
        '<div class="grid g-auto-240">' +
          [
            ['overview', '01', 'Read the overview', 'How the Writing section works and how your texts are graded.'],
            [((M.typesForSchool()[0] || {}).id || 'article'), '02', 'Pick a text type', 'Each text type has a guide, a model text, phrases and a quiz.'],
            ['selfcheck', '03', 'Draft and self-check', 'Paste your text in for instant checks on length, register and conventions.'],
            ['taskbank', '04', 'Practise for real', 'Matura-style prompts in the Task bank, then test yourself in the Practice zone.'],
          ].map(function(s, si){ var stepCols = ['var(--blue)', 'var(--purple)', 'var(--green)', 'var(--orange)']; return '<a class="card link" href="#' + s[0] + '" style="text-decoration:none;border-left:3px solid ' + stepCols[si] + '">' +
              '<div style="font-weight:300;font-size:1.7rem;line-height:1;color:var(--primary);margin-bottom:12px">' + s[1] + '</div>' +
              '<div style="font-weight:600;font-size:1rem;color:var(--text);margin-bottom:7px">' + s[2] + '</div>' +
              '<div style="font-size:.875rem;color:var(--text-muted);line-height:1.5">' + s[3] + '</div>' +
              '<div class="go">Open <span>&rarr;</span></div>' +
            '</a>'; }).join('') +
        '</div>' +
        '<div style="margin-top:16px;display:flex;align-items:center;gap:14px;flex-wrap:wrap">' +
          '<button class="btn btn-ghost" data-action="start-tour">Take the guided tour <span>&rarr;</span></button>' +
          '<span style="font-size:.8125rem;color:var(--text-muted)">A two-minute walkthrough of every section. You can stop any time.</span>' +
        '</div>' +
        '' +
        '<div class="gap-s"></div>' +
        sectionLabel('The Writing section at a glance') +
        '<div class="grid g-auto-150">' +
          [[(M.schoolConfig().timeStat || '120 min'), (M.schoolConfig().timeStatSub || 'total writing time')], [(M.schoolConfig().tasksStat || '2 tasks'), (M.schoolConfig().tasksStatSub || '~400 + ~250 words')], ['4 × 0–10', 'equally weighted criteria'], ['±10%', 'word count tolerance']].map(s =>
            '<div class="card"><div class="stat-v">' + s[0] + '</div><div class="stat-l">' + s[1] + '</div></div>').join('') +
        '</div>' +
        '<div class="gap"></div>' +
        sectionLabel('The text types') +
        '<div class="grid g-auto-280">' +
          M.typesForSchool().map(t => {
            const p = M.progress()[t.id];
            return '<a class="card link" href="#' + t.id + '" style="text-decoration:none;border-left:3px solid ' + TYPE_COLORS[t.color] + '">' +
              '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">' +
                '<span style="display:inline-flex;align-items:center;gap:8px;font-size:.875rem;font-weight:600;color:var(--text)"><span style="width:10px;height:10px;background:' + TYPE_COLORS[t.color] + '"></span>' + t.name + '</span>' +
                (p && p.quiz ? '<span style="font-size:.75rem;color:var(--green)">✓ quiz done</span>' : p && p.visited ? '<span style="font-size:.75rem;color:var(--text-muted)">read</span>' : '') +
              '</div>' +
              '<div style="font-size:1rem;color:var(--text);margin-bottom:8px;line-height:1.4">' + esc(t.tagline) + '</div>' +
              '<div style="font-size:.875rem;color:var(--text-muted)">' + esc(qfWordCount(t)) + ' · ' + esc(t.quickFacts[1].value) + '</div>' +
              '<div class="go">Open guide <span>→</span></div>' +
            '</a>';
          }).join('') +
        '</div>' +
        '<div class="gap"></div>' +
        sectionLabel('Practise') +
        '<div class="grid g-auto-220">' +
          [
            ['paragraphs', 'Paragraph writing', 'The four-layer paragraph, step by step'],
            ['taskbank', 'Task bank', 'Matura-style tasks with input material for every text type'],
            ['selfcheck', 'Self-check studio', 'Paste your text, get instant convention checks'],
            ['practice', 'Practice zone', 'Spot mistakes, fix the register, final quiz'],
          ].map(t =>
            '<a class="card link" href="#' + t[0] + '" style="text-decoration:none">' +
              '<div style="font-size:1.15rem;color:var(--text);margin-bottom:8px;line-height:1.33">' + t[1] + '</div>' +
              '<div style="font-size:.875rem;color:var(--text-muted);line-height:1.5">' + t[2] + '</div>' +
              '<div class="go">Open <span>→</span></div>' +
            '</a>').join('') +
        '</div>' +
        '<div class="gap"></div>' +
        sectionLabel('Reference') +
        '<div class="grid g-auto-220">' +
          [
            ['phrasebank', 'Phrase bank', 'Exam-ready phrases, one-click copy'],
            ['topicvocab', 'Topic vocabulary', 'Collocations for the most common Matura topics'],
            ['grammar', 'Grammar kit', 'The 14 classic Austrian mistakes'],
            ['checklist', 'Writing checklist', 'Self-assess before you put your pen down'],
          ].map(t =>
            '<a class="card link" href="#' + t[0] + '" style="text-decoration:none">' +
              '<div style="font-size:1.15rem;color:var(--text);margin-bottom:8px;line-height:1.33">' + t[1] + '</div>' +
              '<div style="font-size:.875rem;color:var(--text-muted);line-height:1.5">' + t[2] + '</div>' +
              '<div class="go">Open <span>→</span></div>' +
            '</a>').join('') +
        '</div>' +
        '<div class="gap"></div>' +
        sectionLabel('Common pitfalls that cost the most marks') +
        '<p style="font-size:.875rem;color:var(--text-muted);margin:-6px 0 16px;max-width:620px">A quick selection. The <a href="#overview">overview</a> has the full list of the eight most expensive mistakes. The good news: every one of these is a cheap fix once you can name it.</p>' +
        '<div class="grid g-auto-280">' +
          [
            ['Missing a bullet point', 'Task Achievement drops sharply'],
            ['Lifting from the prompt', 'Range score suffers'],
            ['Only simple grammar', 'Range stays in the low bands'],
            ['Wrong text type register', 'Formal style in a blog = penalty'],
            ['Word count off by >±10%', 'Task Achievement drops one band'],
            ['Skipping proofreading', 'Errors you would catch in 3 minutes'],
          ].map(w =>
            '<div class="card" style="border-left:3px solid var(--red)"><div style="font-size:.9375rem;font-weight:600;color:var(--text);margin-bottom:4px">' + w[0] + '</div><div style="font-size:.875rem;color:var(--text-muted)">' + w[1] + '</div></div>').join('') +
        '</div>' +
        '<div style="height:72px"></div>' +
      '</div>' +
    '</div>';
  },
};

/* ─── OVERVIEW & GRADING ──────────────────────────────────── */
PAGES.overview = {
  title: 'Overview & grading', track: 'overview',
  render() {
    const d = SRDP;
    return '<div class="page">' +
      pageHead('Learn', 'Overview &amp; grading', 'How the Writing section works and how your texts are graded. Ten minutes here saves you marks everywhere else.') +
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
          '<div class="tip">Almost every task gives three content points. Address each one – in its own body paragraph, and follow whatever your task sheet actually lists.</div>' +
          '<div class="tip"><strong>Register</strong> = how formal or casual your language is – the difference between a letter to a company and a message to a friend.</div>' +
        '</div>' +
        '<div class="tip" style="margin-top:18px">Want the real thing? The tasks on this site are Matura-style, written for practice. The officially released past exam papers live in the BMB download area at <a href="https://www.matura.gv.at/downloads" target="_blank" rel="noopener">matura.gv.at/downloads</a> – same format, real exams.</div>' +
        '<div class="gap"></div>' +
        sectionLabel('How you are graded – the four criteria', { id: 'criteria', label: 'The four criteria' }) +
        '<p style="font-size:1.05rem;color:var(--text-secondary);line-height:1.55;margin-bottom:22px;max-width:720px">Each text is rated with the official analytic scale: four independent criteria, each scored <strong style="color:var(--text)">0–10</strong> and equally weighted – weaker areas can be compensated for by stronger ones.</p>' +
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
        '<div style="margin-top:10px;font-size:.75rem;color:var(--text-muted)">Simplified from the official B2 rating scale (BMB, 2023 revision). The grid describes levels 0, 2, 4, 6, 8 and 10; the odd levels in between are for texts that sit between two descriptions. Your teachers grade with the full official scale.</div>' +
        '<div class="gap"></div>' +
        sectionLabel('The 8 most expensive mistakes', { id: 'mistakes', label: 'The 8 expensive mistakes' }) +
        '<p style="font-size:.9375rem;color:var(--text-secondary);line-height:1.55;margin:-4px 0 16px;max-width:680px">None of these is a talent problem. Each one is a habit you can train away in an afternoon.</p>' +
        '<div class="tbl-wrap" tabindex="0" role="group" aria-label="Table (scroll sideways on small screens)"><table class="tbl"><thead><tr><th>Mistake</th><th>What it costs</th><th>The fix</th></tr></thead><tbody>' +
          [
            ['Writing only 2 of 3 bullet points', 'Task Achievement drops sharply', 'Tick off each bullet as you write it'],
            ['Ignoring the text type&rsquo;s rules (e.g. a report without headings)', 'Task Achievement drops – conventions are part of the criterion', 'Check the Layout box in the guide before you start'],
            ['Copying words from the prompt or the input material', 'Range drops – lifted language is not your language', 'Rephrase, then interpret: what does the figure mean for your point?'],
            ['Word count off by more than ±10%', 'Task Achievement drops one band', 'Count your words. Practise estimating.'],
            ['Formal style in a blog (or vice versa)', 'Wrong register = lower Task Achievement', 'Ask: formal or informal? Then commit.'],
            ['Only simple linking words', 'Low Coherence score', 'Use the B2 linking words table'],
            ['No topic sentences', 'Paragraphs feel random, weak Coherence', 'First sentence of each paragraph = the point'],
            ['Forgetting to proofread', 'Errors you would catch in 3 minutes', 'Always save 5–10 min at the end'],
          ].map(r => '<tr><td>' + r[0] + '</td><td style="color:var(--red)">' + r[1] + '</td><td>→ ' + r[2] + '</td></tr>').join('') +
        '</tbody></table></div>' +
        '<div style="height:72px"></div>' +
      '</div>' +
    '</div>';
  },
};

/* ─── TEXT TYPE PAGES ─────────────────────────────────────── */
const typeTabs = {};
const TYPE_EXAMPLES = {
  essay: { weak: 'Social media has many advantages and disadvantages for young people today.', strong: 'For teenagers, the real cost of social media is not screen time. It is a slowly shrinking attention span.', why: 'A strong essay opens each paragraph with one clear, arguable point. The weaker version lists everything and commits to nothing, so the examiner cannot follow your line of argument.' },
  article: { weak: 'In this article I am going to tell you about the advantages of doing sport.', strong: 'Ask anyone who has hit the wall at kilometre 30: running is at least half a mental game.', why: 'An article has to pull the reader in. Announcing your plan reads flat, while a concrete hook makes someone want to read on. That is exactly what the task rewards.' },
  report: { weak: 'I really think the school canteen is terrible and nobody likes it.', strong: 'Under heading 2, Findings: 68 per cent of the 120 students surveyed rated the canteen food as poor or very poor.', why: 'A report stays factual and impersonal and presents its evidence under clear headings. Personal outbursts cost you marks for register and task achievement.' },
  blog: { weak: 'One should carefully consider the various advantages before deciding to take a gap year.', strong: 'I used to think a gap year was just an expensive way to put off real life. Then I took one, and it changed my mind.', why: 'Blogs work through a personal, informal voice with contractions and a short story. Formal phrasing like one should consider is formal register dropped into the wrong text type.' },
  email: { weak: 'Hi! Your headphones broke after two days and I want my money back, thanks.', strong: 'Dear Sir or Madam, I am writing to request a refund for the headphones I bought on 3 May, which stopped working after two days.', why: 'A formal e-mail names its purpose in the first line and keeps a polite, formal register throughout. The casual version would be marked down for register and tone.' },
  leaflet: { weak: 'This leaflet provides information about the annual town festival taking place in the market square.', strong: 'Live music, free food and the whole town in one square: the Seetal Festival is back, and you are invited.', why: 'A leaflet has to grab a reader holding it for two seconds at a bus stop. The weak version describes itself like a report and gives no reason to care. The strong version leads with the benefits and speaks straight to the reader, which is exactly what a persuasive leaflet does.' },
};
const SECOND_MODELS = {
  essay: { title:'Should smartphones be banned in schools?', meta:'~400 words · formal', tip:'This second example has no colour labels on purpose. Try to spot the thesis in the introduction, the topic sentence of each body paragraph, the counter-argument and the forward-looking conclusion yourself.', paras:[{ t:'Few objects divide a school as quickly as the smartphone. Some teachers would happily collect every device at the school gate; others hand out tablets and expect us to look things up in seconds. My own view sits between the two. A blanket ban is a mistake: phones cause genuine problems in class, but pretending they do not exist solves nothing, and the realistic option is to control when and how they are used.', mono:false },{ t:'The case for banning phones is easy to understand. A single buzzing notification can pull a whole row of students out of a lesson, and anyone who has sat in a class where half the room is watching TikTok under the desk knows how quickly attention drains away. Cheating has become simpler, too: an answer is only a quick search away. Several schools that locked phones in pouches during the day have reported calmer corridors and livelier conversations at break. These are not small gains, and they deserve to be taken seriously.', mono:false },{ t:'Even so, the device that causes the trouble is also a genuinely useful tool. In our biology lessons we photograph experiments, scan a code to open a quiz, and check unfamiliar words in seconds. A student who has forgotten a deadline can look it up; one who finds reading hard can have a text read aloud. Banning the phone outright throws all of this away, and it teaches nothing about self-control. Teenagers who never manage their phones at school simply postpone that struggle until later.', mono:false },{ t:'Supporters of a full ban often reply that teenagers cannot be trusted to regulate themselves, and there is some truth in that. Willpower rarely wins against a well-designed app. The better answer, though, is to build in structure. Phones can stay switched off and out of sight by default, and come out only for a clear purpose when a teacher asks for them. Rules that we help to write are far harder to resent than ones simply imposed from above.', mono:false },{ t:'On balance, I remain convinced that banning smartphones treats a symptom while ignoring the cause. My generation will carry these devices into every job and every waiting room for the rest of our lives. A school that shows us how to switch off, focus, and then use the tool on purpose gives us something a locked pouch never can.', mono:false }] },
  article: { title:'Why learning a language is worth the struggle', meta:'~250 words · semi-formal', tip:'This second example has no colour labels. Try to spot the catchy opening question, the personal voice, and the way each paragraph develops one clear idea yourself.', paras:[{ t:'Have you ever given up on a language because the grammar felt impossible? You are not alone. But after spending a summer working in Italy with barely any Italian, I am convinced that pushing through the hard part is one of the most rewarding things a teenager can do.', mono:false },{ t:'The obvious benefit is communication. Once I could order food, ask for directions and joke with my colleagues, a whole country opened up to me. Suddenly I was not just a tourist staring helplessly at a menu. Now I could actually take part. I will never forget the afternoon an elderly shopkeeper, delighted that a foreigner was even trying, spent twenty minutes teaching me the local word for delicious. That single afternoon taught me more than a month of vocabulary lists ever could.', mono:false },{ t:'What surprised me more, though, was what it did to my confidence. Every small conversation I survived made the next one a little easier. I slowly realised that making mistakes was not really embarrassing. It was just part of the process. By the end of the summer, the language had stopped feeling like a school subject and started feeling like a tool I actually owned.', mono:false },{ t:'So if you are ever tempted to quit, my advice is simple: keep going, and look for chances to use the language in real life, even when it feels awkward. The struggle is temporary, but the doors a second language opens stay open for good.', mono:false }] },
  report: { title:'Report on the use of the school library', meta:'~250 words · formal', tip:'This second example has no colour labels. Try to spot the header, the clear section headings, the precise data and the recommendations yourself.', paras:[{ t:'Date: 8 May 2026\nFrom: Tom Pichler, Student Council\nSubject: Survey on the Use of the School Library', mono:true },{ t:'Aim of the survey\nThis report presents the results of a survey on how students use the school library. A total of 110 students from years 5 to 8 took part. The aim is to find out why the library is so often empty and to suggest practical improvements.', mono:false },{ t:'How students use the library\nThe results were revealing. While 78% of respondents said they valued having a library, only 21% visited it more than once a month. The main reasons given were limited opening hours and a lack of quiet study space. Interestingly, students in the upper years were far more likely to use the library than younger ones, who tended to study at home. In addition, many were unaware that e-books could be borrowed free of charge. When asked what would bring them in more often, most pointed to comfortable seating and a wider choice of books.', mono:false },{ t:'Suggested improvements\nOn the basis of these findings, it would be advisable to extend the opening hours into the early afternoon and to create a separate silent study area. Furthermore, the e-book service should be promoted more actively, for example through posters and a short presentation in each class. It would also be worth repeating the survey after one term to measure the effect.', mono:false },{ t:'Conclusion\nIn summary, students clearly value the library but rarely use it. With longer hours, a dedicated quiet zone and better promotion, it could once again become a valuable part of school life.', mono:false }] },
  blog: { title:'What three months without takeaway taught me', meta:'~250 words · informal', tip:'This second example has no colour labels. Try to spot the username line, the chatty personal voice, the short punchy sentences and the call to comment yourself.', paras:[{ t:'by leo_cooks · 14 April 2026, 18:20\n\nWhat Three Months Without Takeaway Taught Me', mono:true },{ t:'Confession time: until March, I ordered food about four times a week. Pizza, sushi, burgers, you name it. Then my mum challenged me to cook every single meal myself for three months, and I said yes mostly to prove her wrong. My friends laughed. My brother even started a betting pool on how long I would last, and the longest guess was nine days. Spoiler: I did not starve, and he lost ten euros.', mono:false },{ t:'Week one was a disaster. I burnt rice, undercooked chicken and somehow set off the smoke alarm twice. But here is the thing nobody tells you: cooking gets easier scarily fast. By week three I could throw together a curry without even checking the recipe, and it actually tasted good. Somewhere around week six, I even started to enjoy it. There is something weirdly satisfying about eating a meal you made with your own two hands, even if half of it is slightly burnt.', mono:false },{ t:'The biggest surprise, though, was not the food. It was the money. I worked out that I had saved almost 200 euros, just by not tapping that little delivery button. Will I order takeaway again? Sure, and I did, last Friday. But now it feels like a treat instead of a lazy default. Have you ever tried a challenge like this? Tell me how it went in the comments!', mono:false }] },
  email: { title:'Complaint about a faulty online order', meta:'~250 words · formal', tip:'This second example has no colour labels. Try to spot the four-part header, the formal greeting, the specific complaint, the clear request and the matching sign-off yourself.', paras:[{ t:'To: support@techstore.example\nFrom: julia.berger@email.example\nDate: 22 April 2026\nSubject: Faulty Wireless Headphones (Order #48217)', mono:true },{ t:'Dear Sir or Madam,\n\nI am writing to complain about a pair of wireless headphones I ordered from your website on 5 April. Although the product was advertised as new and fully functional, it developed a serious fault within only three days of use. As I had been looking forward to using them for my daily commute, the disappointment was considerable.', mono:false },{ t:'To be specific, the right earpiece stopped working completely, and the battery now lasts barely an hour despite a full charge. I have carefully followed the troubleshooting steps on your website, but unfortunately none of them solved the problem. I should add that this is the second item from your shop to develop a fault within a month, which has understandably shaken my confidence in the products you sell. Naturally, I expected an item advertised as new to last considerably longer than a few days of normal use.', mono:false },{ t:'Before contacting you in writing, I had already telephoned your customer service line twice, on 9 and 14 April, but on both occasions I was merely promised a callback that never arrived. As the headphones are clearly defective, I would therefore like to request either a full refund or a replacement of the same model. Given that the order is still well within its warranty period, I trust this can be resolved quickly. I have attached a copy of my order confirmation and look forward to your reply within 14 days.\n\nYours faithfully,\nJulia Berger', mono:false }] },
  leaflet: { title:'Recycle Right – The New Kerbside Scheme for Seetal', meta:'~250 words · persuasive', tip:'This second example has no colour labels on purpose. Try to spot the catchy title, the benefit-led subheadings, the direct address, the call to action and the block of practical details yourself.', paras:[{ t:'Recycle Right – The New Kerbside Scheme for Seetal', mono:false },{ t:'Good news for the planet and for your Saturday mornings: from Monday, 7 September, Seetal collects your recycling straight from your doorstep. No more trips to the bottle bank in the rain, no more overflowing cupboards under the sink. Here is everything you need to know.', mono:false },{ t:'Three Bins, One Simple System\nYou will receive three colour-coded bins: blue for paper, yellow for plastic and metal, and green for glass. Just sort as you go and wheel them out on collection day; the lorry comes every second Monday, and a fridge magnet with all the dates is included. Every correctly sorted bin helps keep our lakes and forests clean.', mono:false },{ t:'What Goes Where?\nNot sure if that yoghurt pot counts? Every bin comes with a clear sticker showing what belongs inside, and our website has a quick search tool for the tricky items. When in doubt, look it up rather than guessing – one wrong item can spoil a whole load.', mono:false },{ t:'Start Today – It Costs You Nothing\nThe scheme is completely free for every household in Seetal. Sign up online in two minutes and your bins arrive within a week. Anyone without internet access can simply call the town office, and we will register you over the phone. Do it before the September rush and help us make Seetal the greenest town in the valley.', mono:false },{ t:'Collection starts: Monday, 7 September\nSign up: www.seetal-recycelt.example\nQuestions: call the town office on 01 234 5678', mono:true }] },
};
function secondModelBox(m) {
  return '<div class="gap-s"></div>' +
    '<div class="acc"><div class="acc-item"><button class="acc-head" data-action="acc" aria-expanded="false"><span class="pm">+</span><span>A second model text (a different topic)</span></button>' +
    '<div class="acc-body">' +
      '<div style="font-weight:600;font-size:.95rem;margin:12px 0 3px">' + esc(m.title) + '</div>' +
      '<div style="font-size:.75rem;color:var(--text-muted);margin-bottom:14px;letter-spacing:.32px">' + esc(m.meta) + '</div>' +
      '<div style="font-size:.95rem;line-height:1.65;color:var(--text)">' + m.paras.map(function(p){ return '<p style="margin-bottom:12px' + (p.mono ? ';font-family:var(--font-mono);font-size:.8125rem;line-height:1.8' : '') + '">' + esc(p.t).replace(/\n/g, '<br>') + '</p>'; }).join('') + '</div>' +
      '<div class="tip" style="margin-top:14px">' + esc(m.tip) + '</div>' +
    '</div></div></div>';
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
        '<div class="acc" id="sec-example" data-toc-anchor="Weaker vs. stronger"><div class="acc-item"><button class="acc-head" data-action="acc" aria-expanded="false"><span class="pm">+</span><span>See it in action: weaker vs. stronger</span></button>' +
        '<div class="acc-body">' +
          '<div class="grid g-2" style="margin-top:12px">' +
            '<div class="dd-col dont"><h3>Weaker</h3><p style="font-size:.9rem;line-height:1.55;color:var(--text-secondary);font-style:italic">&ldquo;' + esc(TYPE_EXAMPLES[typeId].weak) + '&rdquo;</p></div>' +
            '<div class="dd-col do"><h3>Stronger</h3><p style="font-size:.9rem;line-height:1.55;color:var(--text-secondary);font-style:italic">&ldquo;' + esc(TYPE_EXAMPLES[typeId].strong) + '&rdquo;</p></div>' +
          '</div>' +
          '<p style="font-size:.875rem;color:var(--text-muted);line-height:1.6;margin-top:14px"><strong style="color:var(--text)">Why it matters: </strong>' + esc(TYPE_EXAMPLES[typeId].why) + '</p>' +
        '</div></div></div>'
      : '') +
      '<div class="gap-s"></div>' +
      '<div class="tip" id="sec-tip" data-toc-anchor="Key tip" style="border-left-color:' + col + '"><strong>Key tip · </strong>' + esc(t.tip) + '</div>' +
      (t.noPdf ? '' :
        '<div class="gap-s"></div>' +
        '<div class="no-print" id="sec-pdf" data-toc-anchor="PDF" style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">' +'<a class="btn btn-primary" href="/pdf/' + typeId + '.pdf" target="_blank" rel="noopener">Download this guide as a PDF <span>&darr;</span></a>' +'<span style="font-size:.8125rem;color:var(--text-muted)">A clean, printable PDF of this whole guide, ready to revise from on paper.</span>' +'</div>');
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
      '<div class="gap-s"></div>' +
      '<div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;border-top:1px solid var(--border);padding-top:20px">' +
        '<a class="btn btn-ghost" href="#overview"><span>&larr;</span> Back to overview</a>' +
        (nextType ? '<a class="btn btn-ghost" href="#' + nextType.id + '">Next: ' + esc(nextType.name) + ' <span>&rarr;</span></a>' : '') +
      '</div>' +
      '<div style="height:72px"></div>' +
    '</div>' +
  '</div>';
}
SRDP.textTypes.forEach(t => {
  PAGES[t.id] = {
    title: t.name, track: t.id,
    render() { return typePage(t.id); },
    wire() {
      const tab = typeTabs[t.id] || 'guide';
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
