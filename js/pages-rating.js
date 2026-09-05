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
const LEVELS = [
  { lvl: 'C1', tag: 'above the exam', desc: 'Fluent and precise well beyond what the Matura asks: complex ideas handled smoothly, idiomatic, register shifted at will, the important points made to stand out. Errors are rare and hard to spot.' },
  { lvl: 'B2', tag: 'your target', desc: 'Clear and detailed across a range of topics: arguments developed and weighed up, a few complex structures, reasonably accurate. Occasional errors still slip through, but they never block the message.' },
  { lvl: 'B1', tag: 'not quite there', desc: 'Short, simple and personal: familiar topics, ideas strung into a plain linear chain, reasons given only briefly, and noticeable mother-tongue influence throughout.' },
];

/* "Appropriate" (Coherence) vs "correct" (Accuracy): own examples */
const APPROP = [
  { s: 'In contrary, online shops are often cheaper.', ok: 'As a signal of contrast it is placed exactly right, so it helps the flow.', no: 'But the phrase is wrong. Here English wants In contrast; keep On the contrary for directly contradicting a claim.' },
  { s: 'I cycle to school, beside it is faster.', ok: 'The link adds a second reason, which is what the sentence needs.', no: 'The correct linker is besides; beside means "next to".' },
  { s: 'Despite of the cost, the trip was worth it.', ok: 'The contrast marker sits in the right spot and joins the ideas cleanly.', no: 'It is either despite or in spite of, never despite of.' },
];

/* ─── the worked examples ─────────────────────────────────────
   type must match a text-type id (drives colour + school filter).  */
const EXAMPLES = [
  /* 1 · ESSAY (AHS): competent, mid-range, position a touch soft */
  {
    id: 'essay', type: 'essay', target: 400, register: 'formal',
    taskLine: 'Essay · argue a case for a formal reader',
    prompt: 'Some teenagers take on a part-time job while they are still at school. Write an essay in which you discuss whether this is a good idea. In your essay you should: weigh up what students can gain from working; consider the problems a job can cause; explain what would make it work.',
    horizon: [
      'The purpose is to persuade a formal reader, so a clear position (for, against or "it depends") should be visible early.',
      'All three prompts need real development with reasons or examples, not just a mention.',
      'An essay stays fairly formal: personal stories can appear, but not as the main evidence, and contractions are out of place.',
    ],
    text: [
      { t: 'Should teenagers work while they are still at school?' },
      { t: 'More and more teenagers today have a part-time job alongside school, working in supermarkets, cafés or as babysitters at the weekend. For some families the extra money is welcome, while others worry that a job takes too much energy away from learning. Is it really a good idea to work before you have even finished school? In my opinion, a small job can teach a great deal, as long as it does not take over.' },
      { t: 'The most obvious advantage is that young people learn responsibility. When you have to be at work on time, deal with real customers and handle your own money, you grow up quickly. These are skills that no classroom can teach in the same way. A friend of mine started working in a bakery on Saturdays, and within a few months she was far more organised and confident than before. On top of that, earning your own money makes you appreciate its value, instead of simply asking your parents for more.' },
      { t: 'On the other hand, a job can easily become too much. A teenager who works several evenings a week has less time for homework, sport and sleep. If the job starts to affect their grades, then clearly something has gone wrong, because school still has to come first at this age. There is also the danger that some students only chase the money and lose interest in their education.' },
      { t: 'Moreover, the type of work matters a lot. A few calm hours in a shop are very different from a stressful job that keeps a teenager on their feet until late at night. Schools and parents could help by giving young people advices about their rights, so that nobody is exploited. Everyone have the right to fair treatment, even a sixteen-year-old with their first contract.' },
      { t: 'All in all, I believe that working during school can be a valuable experience, but only in small doses. A few hours a week build character and independence; much more than that can quickly do more harm than good. The goal should be balance, not a wage packet earned at any price. In the end, it depends of the individual student and how well they manage their time.' },
    ],
    ratings: {
      TA: { band: 6, points: [
        'The purpose here, persuading the reader, is met, and a valid position is there ("a small job can teach a great deal, as long as it does not take over"). The problem is placement, not the stance: it lands in the last clause of a long sentence, where a short, assertive thesis would hit harder.',
        'All three prompts are covered, yet unevenly: the first is developed well, while the second ("problems") is thinner and the third drifts into a new idea (the type of work).',
        'The personal anecdote ("A friend of mine ... in a bakery") leans a little informal for an essay, though it sits alongside general reasoning. Title and conclusion do their job.',
      ] },
      CC: { band: 7, points: [
        'One clear line of argument runs through the text, one idea per paragraph, each opened by a topic sentence.',
        'A varied, well-placed set of linkers ("while", "On the other hand", "Moreover", "All in all") guides the reader.',
        'A couple of transitions are looser, and the fourth paragraph sits slightly apart from the argument, which keeps this out of the top band.',
      ] },
      LR: { band: 7, points: [
        'Good topic vocabulary for the task ("responsibility", "appreciate its value", "exploited", "fair treatment", "in small doses").',
        'A range of structures (when-clauses, conditionals, relative clauses like "A teenager who works ..."), with only occasional repetition.',
        'Register is mostly formal, pulled down a touch by the chatty anecdote rather than by word choice.',
      ] },
      LA: { band: 6, points: [
        'Control is generally solid and nothing blocks understanding, which keeps the text clearly at B2.',
        'But there are clear, repeated slips: "advices" (uncountable), "Everyone have" (subject–verb), and "it depends of" (wrong preposition).',
        'These are non-systematic and easy to fix, exactly the kind of error that separates a 6 from an 8 here.',
      ] },
    },
    holistic: 'A competent, readable essay that argues its case and is easy to follow. Two things hold it back: the position could be sharper from the very first paragraph, and the second and third prompts deserve the same development as the first. The grammar slips ("advices", "Everyone have", "depends of") are the cheap, trainable kind. Clean those up and the whole text moves up a band.',
  },

  /* 2 · ARTICLE (all): good, but over the word limit, TA penalty */
  {
    id: 'article', type: 'article', target: 250, register: 'semi-formal',
    taskLine: 'Article · for the online school magazine',
    prompt: 'Your school tried a "no-phone week". Write an article about it for the international page of your online school magazine. In your article you should: describe how students reacted at first; explain what the week changed; suggest whether the school should do it again.',
    horizon: [
      'An article has to pull the reader in and hold them: a hook, a lively voice, direct address or the odd rhetorical question.',
      'The three prompts should each get a clear stretch of the text; a bare list of reactions is not enough.',
      'Word count matters here: this one runs long, and more than 10% over the target costs a Task Achievement band before any language is judged.',
    ],
    text: [
      { t: 'The Week Our School Switched Off' },
      { t: 'Imagine walking into school on Monday and being told to hand in your phone until Friday. Panic? That is exactly what most of us felt when our headteacher announced the first ever "unplugged week". A few days later, almost nobody wanted it to end.' },
      { t: 'At the beginning, the mood was terrible. During the breaks we did not know what to do with our hands, and some students admitted they felt genuinely nervous without their screens. The group chats fell silent, and more than one person kept reaching in an empty pocket out of pure habit.' },
      { t: 'But something changed after the second day. People actually started talking to each other again. Suddenly the schoolyard was full of noise: card games, football, real conversations. For the first time in ages, I saw people laughing at something in front of them and not on a screen in their hand. Teachers said we were more focused in class, and, honestly, most of us slept better too. It turned out that the thing we were most afraid to lose was the thing we needed a break from.' },
      { t: 'Of course, nobody is saying we should throw our phones away forever. They are useful, and we are not going to pretend otherwise. But maybe an unplugged afternoon now and then would do us all good. A whole week had sounded impossible at first, yet a single phone-free lunch break sounds almost easy. Why not try one a week and see what happens? You might be surprised who you end up talking to.' },
      { t: 'So, would I do it again? Absolutely. Sometimes you have to switch something off to notice what was there all along.' },
    ],
    taBeforePenalty: 7,
    wordNote: 'This article runs past the +10% limit for a ~250-word task, over 275 words. By the rule written into the grid, that alone drops Task Achievement one whole band: a 7 becomes a 6, before a single language point is even judged.',
    ratings: {
      TA: { band: 6, points: [
        'Judged on content and conventions alone this is a 7: a strong hook ("hand in your phone until Friday"), a real article voice, direct address and a rhetorical question, and all three prompts covered.',
        'The length is the problem. At around 280 words it is over the +10% line (275 for a ~250 task), so the band drops to 6. See the note below.',
        'The suggestion prompt is handled nicely and concretely ("one phone-free lunch break ... a week"), which is what keeps the underlying task work strong.',
      ] },
      CC: { band: 6, points: [
        'The order of ideas is clear and the paragraphs are well shaped, with a genuine turning point ("But something changed after the second day").',
        'Inside the second paragraph the reactions are mostly listed rather than linked, which reads a little flat.',
        'A limited but appropriate set of connectors ("Of course", "yet", "So") does the job without much variety.',
      ] },
      LR: { band: 6, points: [
        'Enough range for the task, with some lively phrasing ("out of pure habit", "what was there all along").',
        '"phone(s)" and "screen(s)" repeat noticeably, and there are only a few complex structures.',
        'Register is well judged for an article, informal but controlled, which is exactly right here.',
      ] },
      LA: { band: 6, points: [
        'Control is high and the one real slip ("reaching in an empty pocket" → "into") is genuinely isolated.',
        'What keeps this at a solid B2 rather than higher is that the text rarely reaches for the complex structures where accuracy is really tested. The sentences stay fairly simple, so there is little subordination or tense-shifting to get wrong.',
        'Here the ceiling is set by ambition rather than by mistakes: the top accuracy descriptors talk about control of complex structures, and this text hardly attempts any. Range takes the bigger hit for that (see above); under Accuracy it simply means there is no evidence for an 8.',
      ] },
    },
    holistic: 'A genuinely enjoyable article that sounds like a person, not a template. The voice alone would earn a 7 for task work. It is the word count that quietly costs it: trimming a dozen words would have handed back the band it loses. The single most useful habit this text points to is not grammar at all, but counting your words and cutting on purpose.',
  },

  /* 3 · REPORT (all): the strong anchor */
  {
    id: 'report', type: 'report', target: 250, register: 'formal',
    taskLine: 'Report · for a decision-maker',
    prompt: 'Your school is reviewing its after-school clubs. Write a report for the student council. In your report you should: outline how satisfied students are with the current clubs; describe the main problems; recommend improvements for next year.',
    horizon: [
      'A report is factual and impersonal, written for someone who has to decide something.',
      'It should look like a report at first glance: a short header, clear section headings (meaningful, not numbered), and data presented plainly.',
      'The recommendations must follow logically from the findings, not appear from nowhere.',
    ],
    text: [
      { t: 'Date: 5 May 2026\nTo: The Student Council\nFrom: Mara Toth, 7B\nSubject: Survey on the school’s after-school clubs', mono: true },
      { t: 'Introduction\nThis report presents the findings of a survey on the school’s after-school clubs. A total of 96 students from the sixth and seventh years took part. Its aim is to establish how satisfied students are and to recommend improvements for next year.' },
      { t: 'Findings\nThe response was mixed. On the positive side, 74% of those asked said they enjoyed the club they attended, and the sports clubs in particular were praised for being well organised. However, almost half of the students reported that the club they wanted was either full or not offered at all. A recurring complaint concerned timing: many clubs take place on the same two afternoons, which forces students to choose between them. Language and music clubs were the most frequently requested additions. A smaller group also asked for a debating club, although interest in it was mostly limited to the senior years.' },
      { t: 'Recommendations\nIn the light of these findings, three steps would be advisable. First, the most popular clubs should be spread more evenly across the week. Second, the school should consider adding at least one language club and one music club. Finally, a short online sign-up at the start of term would make it easier to judge demand in advance.' },
      { t: 'Conclusion\nTo conclude, students clearly value the club programme but are held back by limited choice and clashing times. A more balanced timetable and a few new options would allow far more of them to take part.' },
    ],
    ratings: {
      TA: { band: 8, points: [
        'The purpose is fully met: it informs the decision-makers and recommends action. The header is complete and the register stays impersonal throughout.',
        'All three prompts are developed with actual figures ("74%", "almost half"), and the sections carry clear, meaningful headings that are correctly not numbered.',
        'A shade more supporting detail in the recommendations would be the only route to a 10.',
      ] },
      CC: { band: 8, points: [
        'Logically ordered and clearly signposted; each section is a coherent block.',
        'Cohesion is handled well ("On the positive side", "However", "In the light of these findings", "To conclude").',
        'Firmly in the upper band; only the slightly formulaic transitions keep it off 10.',
      ] },
      LR: { band: 7, points: [
        'Appropriately formal, report-style vocabulary ("a recurring complaint", "advisable", "judge demand in advance").',
        'Some complex structures appear, such as the passive ("should be spread") and a relative clause ("which forces students to choose").',
        'Solid rather than wide range; a little more variety would lift it further.',
      ] },
      LA: { band: 8, points: [
        'A high degree of control; errors are rare and nothing disturbs the reading.',
        'Percentages, punctuation and sentence structure are all handled cleanly.',
        'The accuracy a report needs is clearly there.',
      ] },
    },
    holistic: 'This is what the structure buys you. The text looks like a report before you read a word of it, stays factual, and lets its recommendations grow straight out of the data. It is not linguistically flashy, and it does not need to be. A useful reminder that on some text types, doing the conventions properly is most of the battle.',
  },

  /* 4 · BLOG (all): brilliant voice, task control lags (the "band raten" trap) */
  {
    id: 'blog', type: 'blog', target: 250, register: 'informal',
    taskLine: 'Blog · a personal post (not a comment)',
    prompt: 'Write a post for your personal blog about a habit you decided to change. In your post you should: explain why you decided to change it; describe how it went; say whether you would recommend it to others.',
    horizon: [
      'A blog post lives on its voice: personal, informal, contractions welcome, the reader spoken to directly.',
      'Even so, all three prompts still have to be developed. A great story that skips the "would you recommend it?" point loses task marks.',
      'Watch the trap: dazzling language and full task achievement are scored separately. One can be high while the other is not.',
    ],
    text: [
      { t: 'by mia_writes · 3 May 2026\n\nThirty Days Without the Scroll', mono: true },
      { t: 'I still remember the exact moment I decided to quit. It was 2 a.m., my eyes hurt, and I had just watched a total stranger reorganise their fridge for the fourth time. Something in me snapped. That night I deleted every social media app from my phone and promised myself thirty days without the endless scroll.' },
      { t: 'The first few days were honestly pathetic. My thumb kept opening the empty space where the apps used to be, like a dog nosing at a bowl that is not there any more. I felt weirdly out of the loop, convinced that something important was happening without me. Spoiler: it was not. The world carried on being exactly as boring and as wonderful as before, and somehow it managed without my likes.' },
      { t: 'What nobody warns you about is the sheer amount of time you suddenly have. I read two whole books. I called my grandmother. I went for long, aimless walks and actually noticed things: the light, the traffic, other people’s ridiculous dogs. By the end of the month I felt calmer than I had in years, as though someone had finally turned the volume of my brain down to a bearable level.' },
      { t: 'So, thirty days on, am I free forever? Not quite. I have put two apps back, but on my laptop only. Try it yourself. You might hate the first week, but stay with it.' },
    ],
    ratings: {
      TA: { band: 6, points: [
        'Unmistakably a blog post, and two of the three prompts land beautifully: why she quit (the 2 a.m. moment) and how it went (the empty space where the apps used to be, the two books, the calmer brain).',
        'The third prompt (would you recommend it?) is dealt with in two rushed lines ("Try it yourself ... stay with it") with no real reasons, and that is what caps the band at 6.',
        'A classic case: nothing is wrong with the writing, but one content point is left underdeveloped.',
      ] },
      CC: { band: 7, points: [
        'A strong narrative line, one clear stage per paragraph, easy to follow from the decision to the aftermath.',
        'Cohesion is mostly carried by the storytelling and pronouns rather than by a wide range of connectors.',
        'The jump to the short final paragraph is slightly abrupt, which keeps it just below the top.',
      ] },
      LR: { band: 9, points: [
        'A wide, confident range: idiom ("out of the loop"), imagery ("like a dog nosing at a bowl"), and controlled variety of structure.',
        'Register is spot on for the text type and never slips.',
        'This is the standout criterion; the writer clearly has language to spare.',
      ] },
      LA: { band: 7, points: [
        'A high degree of control across some ambitious sentences; the reading is never disturbed.',
        'It is not quite flawless enough for the top band, but real errors are genuinely hard to find.',
        'Comfortably B2, and it supports rather than undercuts the strong range.',
      ] },
    },
    holistic: 'The voice is the star: this writer can really write. But the grid rewards the task, and the "would you recommend it?" prompt is handled in two lines while the story gets all the love. It is the clearest lesson on the page: Range can sit at 9 while Task Achievement sits at 6, and both are fair. Spend one of those brilliant sentences on the missing content point next time.',
  },

  /* 5 · EMAIL (all): does its job, held down by accuracy + register slips */
  {
    id: 'email', type: 'email', target: 250, register: 'formal',
    taskLine: 'E-mail · a formal enquiry',
    prompt: 'You have seen an advert for a summer English course abroad. Write an e-mail to the language school. In your e-mail you should: say why you are interested; ask about the accommodation and the group size; ask about the free-time programme.',
    horizon: [
      'The reason for writing belongs in the first line, and the greeting and sign-off must pair up correctly.',
      'The register is formal-neutral: no contractions, no casual "really".',
      'The questions should be specific and each properly developed, not just listed.',
    ],
    text: [
      { t: 'To: info@brightoncollege.example\nFrom: felix.wagner@email.example\nDate: 12 May 2026\nSubject: Question about your summer course', mono: true },
      { t: 'Dear Sir or Madam,\n\nI am writing because I saw your advertisement for a summer English course on your website, and I am very interested in taking part this July. I am a seventeen-year-old student from Austria and I would like to improve my English before my final year at school. Your summer programme was recommended to me by a classmate who took part last year and found it genuinely worthwhile.' },
      { t: 'Before I apply, there are a few things I would like to know. First, I would be grateful if you could tell me whether the course includes accommodation with a host family, as I have never stayed abroad on my own before. Secondly, could you let me know how big the groups are? I learn much better in a small class where the teacher has time for everyone.' },
      { t: 'I would also like to ask about the free-time programme. Your website mentions excursions, but it doesn’t say whether they cost extra, so any informations about prices would be really helpful. It would also be good to know whether the excursions take place at the weekend or during lesson time. Also, do the students get a certificate at the end.' },
      { t: 'I would be very thankful for a quick answer, because the application deadline is soon and I still have to organise my flights. I look forward to hearing from you.\n\nYours faithfully,\nFelix Wagner' },
    ],
    ratings: {
      TA: { band: 7, points: [
        'The purpose is clear from the first line and all three prompts are addressed; the greeting and sign-off pair correctly ("Dear Sir or Madam" → "Yours faithfully").',
        'The subject line is vague ("Question about your summer course") and lifts the wording of the task rather than naming the point.',
        'The certificate question is dropped in almost as an afterthought instead of being developed like the others.',
      ] },
      CC: { band: 7, points: [
        'Well organised into clear paragraphs, one purpose each, with a proper opening and closing.',
        'Sequencing is handled ("First", "Secondly", "also"), if a little mechanically.',
        'The line of the message is easy to follow throughout.',
      ] },
      LR: { band: 6, points: [
        'Adequate range for an enquiry ("grateful", "accommodation", "host family", "excursions", "deadline").',
        '"I would like to" recurs, and a contraction ("it doesn’t say") plus the casual "really" ("really helpful") pull the register below the formal norm an enquiry needs, with "very thankful" sitting where "grateful" would fit better.',
        'Enough language to do the job, without much to spare.',
      ] },
      LA: { band: 6, points: [
        'Control is generally solid and nothing is misread, which keeps it clearly at B2.',
        'The clear slips are "any informations" (uncountable) and the missing question mark on "do the students get a certificate at the end". That is a handful, not a pattern.',
        'The casual "really" and the contraction "it doesn’t say" cost marks too, but under register (Range), not here, so accuracy holds at 6.',
      ] },
    },
    holistic: 'The e-mail does its job: the reader knows exactly what Felix wants, and the greeting/sign-off pairing is textbook. What holds it back is polish: an uncountable-noun error, a missing question mark, and a casual "really" and "doesn’t" drifting into a formal message. The content is there; the last proofreading pass is not.',
  },

  /* 6 · LEAFLET (BHS): solid, a bit article-ish */
  {
    id: 'leaflet', type: 'leaflet', target: 250, register: 'persuasive',
    taskLine: 'Leaflet · promote and inform',
    prompt: 'Your school is holding an open day for future students and their families. Write a leaflet about it. In your leaflet you should: make people want to come; explain what visitors can see and do; give the practical details.',
    horizon: [
      'A leaflet has to sell in seconds: a catchy title, benefit-led subheadings, the reader addressed directly, and a clear call to action.',
      'It informs as well as persuades, so a short block of practical details (when / where / how) is expected.',
      'The voice should be punchy; the risk is drifting into flat, article-like description.',
    ],
    text: [
      { t: 'Open Day at HAK Seestadt – Come and See for Yourself' },
      { t: 'Choosing the right school is a big decision, and the best way to make it is to visit. On Saturday, 15 March, HAK Seestadt opens its doors to future students and their families. Whatever you want to know about us, this is the day to find out. Come along, take a look around, and picture yourself here.' },
      { t: 'See Where You Would Learn\nTake a guided tour of our classrooms, computer labs and the brand-new library. Current students will show you around and answer your questions honestly – no sales talk, just real experience. You will also see our sports hall and the busy student common room, where school life really happens.' },
      { t: 'Meet the Teachers and Try It Out\nSit in on short taster lessons in business, languages and IT. Our teachers will explain how our school prepare you for both further study and the world of work. There is also a stand where you can pick up information about scholarships. Bring your questions about subjects, timetables and exchange terms abroad, and someone will have the answer.' },
      { t: 'Bring the Whole Family\nThere is something for everyone. While you explore, parents can enjoy coffee and cake in the school café, no registration is needed. Admission is free, so just turn up. Whether this is already your first choice or you are only starting to look, one morning here will tell you more than any brochure.' },
      { t: 'When: Saturday, 15 March, 9 a.m. – 2 p.m.\nWhere: HAK Seestadt, Seepromenade 4\nMore: www.hak-seestadt.example', mono: true },
    ],
    ratings: {
      TA: { band: 7, points: [
        'The conventions are nearly all there: a title with a hook, benefit-led subheadings, direct address ("Come and See for Yourself"), a call to action and a details block.',
        'The opening ("Choosing the right school is a big decision") reads a touch flat and article-like rather than punchy, softening the sell.',
        'All three prompts are covered, and the practical information is complete and clearly set out.',
      ] },
      CC: { band: 6, points: [
        'Clearly organised into headed blocks, which suits the text type and is easy to scan.',
        'Within the sections the sentences are mostly listed rather than linked, so the flow is a little choppy.',
        'For a leaflet that is partly acceptable, but it keeps Coherence at a 6.',
      ] },
      LR: { band: 6, points: [
        'Appropriate persuasive phrasing ("opens its doors", "no sales talk", "taster lessons", "something for everyone").',
        'Range is adequate but not wide, and "school" and "students" repeat.',
        'Enough to persuade, without real richness.',
      ] },
      LA: { band: 6, points: [
        'Generally accurate and always clear, but two slips stand out.',
        'A subject–verb error ("how our school prepare you") and a comma splice ("in the school café, no registration is needed").',
        'The errors are minor and non-systematic, so accuracy stays at a solid B2.',
      ] },
    },
    holistic: 'A capable leaflet that does most things right: it looks the part, speaks to the reader and ends with the details someone actually needs. To push it higher, the opening should hit faster and harder, leading with what visitors gain rather than a general truth about choosing schools. The two grammar slips are a quick proofreading fix.',
  },
];

/* ─── helpers ────────────────────────────────────────────────── */
function wordCount(ex) {
  return ex.text.filter(p => !p.mono).map(p => p.t).join(' ').trim().split(/\s+/).filter(Boolean).length;
}
function total(ex) { return CRIT.reduce((s, c) => s + ex.ratings[c.id].band, 0); }
function typeMeta(id) { return ((window.SRDP && SRDP.textTypes) || []).find(t => t.id === id) || {}; }

function compareMsg(guess, awarded) {
  const d = guess - awarded;
  const between = BANDS.indexOf(awarded) === -1;
  if (d === 0) return 'Bang on. That is the band the rater panel agreed on (' + awarded + '/10).';
  if (between && Math.abs(d) === 1) return 'As close as the buttons allow: the panel landed on ' + awarded + '/10, an in-between level raters use for a text between two descriptions.';
  if (Math.abs(d) <= 2) return d > 0
    ? 'Close. The panel placed it just below your guess, at ' + awarded + '/10.'
    : 'Close. The panel placed it just above your guess, at ' + awarded + '/10.';
  return d > 0
    ? 'You were generous here. The panel saw more problems than your guess suggested (' + awarded + '/10).'
    : 'You were strict here. The panel rewarded this more than you did (' + awarded + '/10).';
}

function modelTextBox(ex) {
  return '<div class="ex-model">' +
    ex.text.map(function (p, i) {
      const head = i === 0 && !p.mono;
      return '<p class="ex-p' + (p.mono ? ' mono' : '') + (head ? ' ex-title' : '') + '">' + esc(p.t).replace(/\n/g, '<br>') + '</p>';
    }).join('') +
    '</div>' +
    '<div class="ex-meta">≈ ' + wordCount(ex) + ' words · ' + esc(ex.register) + ' register · target ' + ex.target + '</div>';
}

function critBlock(ex, c) {
  const r = ex.ratings[c.id];
  const isTA = c.id === 'TA';
  return '<div class="ex-crit" data-awarded="' + r.band + '" data-crit="' + c.id + '">' +
    '<div class="ex-crit-top"><span class="ex-crit-name">' + c.name + '</span>' +
      '<span class="ex-crit-ask">What band would you give?</span></div>' +
    '<div class="ex-seg" role="group" aria-label="Your band for ' + esc(c.name) + ': tap a band to reveal the verdict">' +
      BANDS.map(function (b, bi) { return '<button class="rate-btn" type="button" aria-pressed="false" aria-label="Guess band ' + b + '" tabindex="' + (bi === 0 ? '0' : '-1') + '" data-action="ex-guess" data-band="' + b + '">' + b + '</button>'; }).join('') +
    '</div>' +
    '<div class="ex-hint" data-hint>Tap a band to reveal the panel&rsquo;s verdict.</div>' +
    '<div class="ex-verdict" hidden aria-live="polite">' +
      '<div class="ex-vband">Rater panel: <b>' + r.band + '</b>/10' +
        (isTA && ex.taBeforePenalty ? ' <span class="ex-pen">← was ' + ex.taBeforePenalty + ' before the word-count penalty</span>' : '') + '</div>' +
      '<div class="ex-compare"></div>' +
      '<ul class="ex-reasons">' + r.points.map(p => '<li>' + esc(p) + '</li>').join('') + '</ul>' +
      (isTA && ex.wordNote ? '<div class="ex-wordnote">' + esc(ex.wordNote) + '</div>' : '') +
    '</div>' +
  '</div>';
}

function exampleCard(ex, idx, n) {
  const tt = typeMeta(ex.type);
  const col = M.TYPE_COLORS[tt.color] || 'var(--primary)';
  const tot = total(ex);
  const label = esc((tt.name || ex.type).replace(/^The\s+/i, ''));
  return '<div class="ex-card" id="ex-' + ex.id + '" style="--exc:' + col + '">' +
    '<h3 class="ex-h"><span class="ex-dot"></span>Example ' + (idx + 1) + ' of ' + n + ': ' + label + '</h3>' +
    '<div class="ex-tag">' + esc(ex.taskLine) + '</div>' +
    '<div class="ex-task"><div class="ex-task-h">The task</div><p>' + esc(ex.prompt) + '</p></div>' +
    '<div class="acc"><div class="acc-item open"><button class="acc-head" data-action="acc" aria-expanded="true"><span class="pm">+</span><span>What the examiner pictures before reading</span></button>' +
      '<div class="acc-body"><ul class="ex-horizon">' + ex.horizon.map(h => '<li>' + esc(h) + '</li>').join('') + '</ul></div></div></div>' +
    modelTextBox(ex) +
    '<div class="ex-crits">' + CRIT.map(c => critBlock(ex, c)).join('') + '</div>' +
    '<div class="acc ex-holi"><div class="acc-item"><button class="acc-head" data-action="acc" aria-expanded="false"><span class="pm">+</span><span>Overall verdict</span><span class="sub">reveal after you grade</span></button>' +
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
        '<span class="mid">vs panel</span>' +
        '<span class="pan" data-pan>?</span>' +
        '<span class="gap" data-gap></span></div>';
    }).join('') +
    '<div class="ex-sb-tot" data-tot>Grade all four criteria above to compare your total with the panel’s.</div>' +
    '<div class="ex-sb-sum" data-sum></div>' +
  '</div>';
}
function updateScoreboard(card) {
  const crits = $$('.ex-crit', card);
  let graded = 0, yourSum = 0, panelSum = 0, exact = 0, near = 0;
  crits.forEach(function (cr) {
    const panel = +cr.dataset.awarded;
    panelSum += panel;
    const row = card.querySelector('.ex-sb-row[data-brk="' + cr.dataset.crit + '"]');
    if (!row) return;
    const sel = cr.querySelector('.rate-btn.sel');
    if (!sel) return;
    const g = +sel.dataset.band, diff = g - panel;
    graded++; yourSum += g;
    if (diff === 0) exact++;
    if (Math.abs(diff) <= 1) near++;
    row.querySelector('[data-you]').textContent = g;
    row.querySelector('[data-pan]').textContent = panel;
    const gap = row.querySelector('[data-gap]');
    gap.textContent = diff === 0 ? 'spot on' : (diff > 0 ? '+' + diff + ' too high' : diff + ' too low');
    gap.className = 'gap ' + (diff === 0 ? 'g-ok' : Math.abs(diff) <= 1 ? 'g-near' : 'g-far');
    row.classList.add('done');
  });
  const totEl = card.querySelector('[data-tot]'), sumEl = card.querySelector('[data-sum]');
  if (graded < 4) {
    if (totEl) totEl.textContent = 'Graded ' + graded + ' of 4. Grade all four to compare your total with the panel’s.';
    if (sumEl) sumEl.textContent = '';
  } else {
    if (totEl) totEl.innerHTML = 'Your total: <b>' + yourSum + '</b> · Panel: <b>' + panelSum + '</b> / 40';
    if (sumEl) sumEl.textContent = 'You matched the panel exactly on ' + exact + ' of 4, and came within one band on ' + near + ' of 4.';
  }
}

/* ─── the interaction (self-wired; no global dispatch needed) ─── */
function onGuess(btn) {
  const seg = btn.closest('.ex-seg');
  const crit = btn.closest('.ex-crit');
  if (!seg || !crit) return;
  const awarded = +crit.dataset.awarded;
  const guess = +btn.dataset.band;
  $$('.rate-btn', seg).forEach(function (x) {
    const on = x === btn;
    x.classList.toggle('sel', on);
    x.setAttribute('aria-pressed', on ? 'true' : 'false');
    x.tabIndex = on ? 0 : -1;
  });
  const hint = crit.querySelector('[data-hint]');
  if (hint) hint.style.display = 'none';
  const v = crit.querySelector('.ex-verdict');
  if (v) v.hidden = false;
  const cmp = crit.querySelector('.ex-compare');
  if (cmp) cmp.textContent = compareMsg(guess, awarded);
  if (M.announce) M.announce('Rater panel gave ' + awarded + ' out of 10. ' + compareMsg(guess, awarded));
  const card = btn.closest('.ex-card');
  if (card) updateScoreboard(card);
}

/* ─── styles (scoped; inline is allowed by the CSP style-src) ─── */
const STYLE = '<style>' +
  '.ex-lead{font-size:1.05rem;color:var(--text-secondary);line-height:1.6;max-width:720px;margin-bottom:8px}' +
  '.ex-process{border:1px solid var(--border);background:var(--surface-1);padding:4px 22px 14px;margin-bottom:8px}' +
  '.ex-process ol{margin:0;padding-left:20px}' +
  '.ex-process li{margin:12px 0;font-size:.95rem;line-height:1.6;color:var(--text-secondary)}' +
  '.ex-process li b{color:var(--text)}' +
  '.ex-approp{border:1px solid var(--border);border-left:3px solid var(--primary);padding:14px 20px;margin-bottom:8px}' +
  '.ex-approp .row{padding:10px 0;border-top:1px solid var(--border)}' +
  '.ex-approp .row:first-of-type{border-top:none}' +
  '.ex-approp .q{font-family:var(--font-mono);font-size:.85rem;color:var(--text);margin-bottom:6px}' +
  '.ex-approp .v{font-size:.9rem;line-height:1.5;margin:2px 0}' +
  '.ex-approp .v.ok{color:var(--green)}.ex-approp .v.no{color:var(--red)}' +
  '.ex-approp .v b{font-family:var(--font-mono);font-weight:400}' +
  '.ex-card{border:1px solid var(--border);border-top:4px solid var(--exc);padding:20px 22px 24px;margin:22px 0}' +
  '.ex-tag{display:flex;align-items:center;gap:8px;font-size:.72rem;letter-spacing:.4px;text-transform:uppercase;color:var(--text-muted);margin-bottom:14px}' +
  '.ex-dot{width:9px;height:9px;background:var(--exc);flex-shrink:0}' +
  '.ex-task{background:var(--surface-1);border:1px solid var(--border);padding:12px 16px;margin-bottom:14px}' +
  '.ex-task-h{font-size:.72rem;letter-spacing:.4px;text-transform:uppercase;color:var(--text-muted);margin-bottom:5px}' +
  '.ex-task p{margin:0;font-size:.92rem;line-height:1.55;color:var(--text)}' +
  '.ex-model{border:1px solid var(--border);padding:16px 18px;margin:14px 0 6px}' +
  '.ex-p{margin:0 0 11px;font-size:.95rem;line-height:1.65;color:var(--text)}' +
  '.ex-p.mono{font-family:var(--font-mono);font-size:.8rem;line-height:1.75;color:var(--text-secondary)}' +
  '.ex-p.ex-title{font-weight:600;font-size:1.02rem}' +
  '.ex-meta{font-size:.74rem;color:var(--text-muted);letter-spacing:.3px;margin-bottom:6px}' +
  '.ex-crits{margin-top:12px}' +
  '.ex-crit{border-top:1px solid var(--border);padding:16px 0}' +
  '.ex-crit-top{display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:6px;margin-bottom:9px}' +
  '.ex-crit-name{font-weight:600;font-size:.98rem}' +
  '.ex-crit-ask{font-size:.78rem;color:var(--text-muted)}' +
  '.ex-verdict{margin-top:12px;border-left:3px solid var(--exc);padding:4px 0 4px 14px}' +
  '.ex-vband{font-size:.95rem;margin-bottom:4px}.ex-vband b{font-size:1.1rem}' +
  '.ex-pen{font-family:var(--font-mono);font-size:.72rem;color:var(--red);letter-spacing:.2px}' +
  '.ex-compare{font-size:.9rem;color:var(--text-secondary);margin-bottom:8px;min-height:1px}' +
  '.ex-reasons{margin:0;padding-left:18px}' +
  '.ex-reasons li{font-size:.9rem;line-height:1.55;color:var(--text-secondary);margin:5px 0}' +
  '.ex-wordnote{margin-top:10px;font-size:.85rem;line-height:1.5;color:var(--text);background:color-mix(in srgb,var(--red) 9%,transparent);border:1px solid color-mix(in srgb,var(--red) 30%,transparent);padding:9px 12px}' +
  '.ex-horizon{margin:8px 0 0;padding-left:18px}' +
  '.ex-horizon li{font-size:.9rem;line-height:1.55;color:var(--text-secondary);margin:6px 0}' +
  '.ex-holi{margin-top:14px}' +
  '.ex-holi-p{font-size:.95rem;line-height:1.65;color:var(--text-secondary);padding-top:10px;margin:0}' +
  '.ex-total{margin-top:10px;font-size:.9rem;color:var(--text)}' +
  '.ex-sb{margin-top:14px;border-top:1px solid var(--border);padding-top:12px}' +
  '.ex-sb-h{font-size:.78rem;letter-spacing:.4px;text-transform:uppercase;color:var(--text-muted);margin-bottom:8px}' +
  '.ex-sb-row{display:flex;align-items:baseline;gap:8px;padding:5px 0;font-size:.9rem;flex-wrap:wrap}' +
  '.ex-sb-row .lab{flex:1 1 180px;color:var(--text)}' +
  '.ex-sb-row .you,.ex-sb-row .pan{font-family:var(--font-mono);font-weight:600;min-width:16px;text-align:center}' +
  '.ex-sb-row .mid{font-size:.72rem;color:var(--text-muted)}' +
  '.ex-sb-row .gap{font-family:var(--font-mono);font-size:.8rem;margin-left:auto}' +
  '.ex-sb-row .gap.g-ok{color:var(--green)}.ex-sb-row .gap.g-near{color:var(--text-secondary)}.ex-sb-row .gap.g-far{color:var(--orange)}' +
  '.ex-sb-row:not(.done) .you,.ex-sb-row:not(.done) .pan{color:var(--text-muted);font-weight:400}' +
  '.ex-sb-tot{margin-top:10px;font-size:.9rem;color:var(--text)}' +
  '.ex-sb-sum{margin-top:5px;font-size:.85rem;color:var(--text-secondary)}' +
  '.ex-lvl-tag{font-family:var(--font-mono);font-size:.72rem;color:var(--text-muted)}' +
  '.ex-seg{display:inline-flex;border:1px solid var(--border-strong);flex-wrap:wrap}' +
  '.ex-h{display:flex;align-items:center;gap:9px;font-size:1rem;font-weight:600;margin:0 0 4px}' +
  '.ex-hint{font-size:.8rem;color:var(--text-muted);margin-top:7px}' +
  '@media(max-width:480px){.ex-seg .rate-btn{padding-top:12px;padding-bottom:12px}}' +
  '</style>';

/* ─── the page ───────────────────────────────────────────────── */
const page = {
  title: 'Grade like an examiner',
  track: 'examiner',
  render: function () {
    const allowed = M.typesForSchool().map(t => t.id);
    const exs = EXAMPLES.filter(e => allowed.indexOf(e.type) >= 0);

    const process =
      '<div class="ex-process"><ol>' +
        '<li><b>First they picture the answer.</b> Before reading yours, the examiner sketches what a solid B2 response to <em>this</em> task needs: its purpose, its reader, the three content points, the conventions of the text type. That sketch becomes the yardstick.</li>' +
        '<li><b>They rate one criterion at a time.</b> Each of the four is judged on its own, often in its own reading pass. The same text can sit at 8 for Range and 6 for Accuracy, which is normal and not a contradiction.</li>' +
        '<li><b>Task Achievement goes first.</b> It carries the veto: a text that ignores the set task scores 0 there and the other three are not marked at all. So task comes before language.</li>' +
        '<li><b>A band is a judgement, not an average.</b> Some descriptors count for more than others. In Task Achievement, developing the content points matters more than the title. Nobody adds the descriptors up and divides; they weigh what counts and place the text.</li>' +
        '<li><b>Length is part of Task Achievement.</b> More than 10% over or under the target, and Task Achievement drops one whole band, before a single language point is judged.</li>' +
      '</ol></div>';

    const levels =
      '<div class="tbl-wrap" tabindex="0" role="group" aria-label="B1, B2 and C1 compared (scroll sideways on small screens)"><table class="tbl"><thead><tr><th scope="col">Level</th><th scope="col">What it reads like</th></tr></thead><tbody>' +
        LEVELS.map(l => '<tr><td style="white-space:nowrap"><b>' + l.lvl + '</b> <span class="ex-lvl-tag">' + esc(l.tag) + '</span></td><td>' + esc(l.desc) + '</td></tr>').join('') +
      '</tbody></table></div>' +
      '<p style="font-size:.85rem;color:var(--text-muted);margin-top:10px;max-width:720px">Everything on this site aims at the middle row. Glancing up to C1 shows why B2 does not have to be perfect; glancing down to B1 shows what "not quite B2 yet" actually looks like.</p>';

    const approp =
      '<p class="ex-lead">Two criteria can judge the very same word. <strong style="color:var(--text)">Coherence and Cohesion</strong> asks whether a linking word <em>fits</em>. <strong style="color:var(--text)">Accuracy</strong> asks whether it is <em>correct English</em>. A word can pass one and fail the other, and it is then counted under both: once as a plus, once as a minus.</p>' +
      '<div class="ex-approp">' +
        APPROP.map(a => '<div class="row"><div class="q">“' + esc(a.s) + '”</div>' +
          '<div class="v ok">✓ Cohesion: ' + esc(a.ok) + '</div>' +
          '<div class="v no">✗ Accuracy: ' + esc(a.no) + '</div></div>').join('') +
      '</div>' +
      '<p style="font-size:.9rem;color:var(--text-secondary);margin-top:10px;max-width:720px">So reach for linking words freely, since they lift your Coherence score. Then, when you proofread, check their <em>form</em>, because the same words are counted again under Accuracy.</p>';

    return pageHead(
      'Learn',
      'Grade like an examiner',
      'Reading about the four criteria is one thing. Watching them land on a real text is another. Here is how a rater actually works, with a set of texts for you to grade yourself before the panel shows its hand.'
    ) +
    '<div class="wrap" id="exRoot">' +
      STYLE +
      '<div class="gap-s"></div>' +
      sectionLabel('How an examiner reads your text', { id: 'process', label: 'How an examiner reads' }) +
      process +
      '<div class="gap"></div>' +
      sectionLabel('B1, B2, C1 at a glance', { id: 'levels', label: 'B1 / B2 / C1' }) +
      '<p class="ex-lead">The exam wants proof of B2. It helps to know what sits just below and just above it.</p>' +
      levels +
      '<div class="gap"></div>' +
      sectionLabel('“Right” and “correct” are not the same', { id: 'appropriate', label: 'Right vs correct' }) +
      approp +
      '<div class="gap"></div>' +
      sectionLabel('Now grade these yourself', { id: 'examples', label: 'Grade these yourself' }) +
      '<p class="ex-lead">Each text below is written in the B2 style, with the kind of strengths and slips real exam texts have. For every criterion, commit to a band first, then reveal what a rater panel decided, and why. The gap between your guess and theirs is where the learning is.</p>' +
      '<p style="font-size:.9rem;color:var(--text-secondary);margin:0 0 6px;max-width:720px">The buttons show the six described levels (0, 2, 4, 6, 8, 10). Raters also use the in-between levels (1, 3, 5, 7, 9) for a text that sits between two descriptions, so a few verdicts land on an odd number the buttons don&rsquo;t show. That is normal.</p>' +
      '<p style="font-size:.8rem;color:var(--text-muted);margin-bottom:6px">These texts were written for this site as realistic examples. They are not real candidates’ work.</p>' +
      '<nav class="ex-jump no-print" aria-label="Jump to an example">' + exs.map(function (ex, i) { const tt = typeMeta(ex.type); return '<button class="pt-chip" type="button" data-scroll-to="ex-' + ex.id + '">' + (i + 1) + ' · ' + esc((tt.name || ex.type).replace(/^The\s+/i, '')) + '</button>'; }).join('') + '</nav>' +
      exs.map(function (ex, i) { return exampleCard(ex, i, exs.length); }).join('') +
      '<div style="height:72px"></div>' +
    '</div>';
  },
  wire: function () {
    const root = document.getElementById('exRoot');
    if (!root) return;
    root.addEventListener('click', function (e) {
      const b = e.target.closest('[data-action="ex-guess"]');
      if (b) onGuess(b);
    });
    root.addEventListener('keydown', function (e) {
      const seg = e.target.closest && e.target.closest('.ex-seg');
      if (!seg) return;
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].indexOf(e.key) === -1) return;
      e.preventDefault();
      const btns = Array.prototype.slice.call(seg.querySelectorAll('.rate-btn'));
      const i = btns.indexOf(e.target);
      let n;
      if (e.key === 'Home') n = 0;
      else if (e.key === 'End') n = btns.length - 1;
      else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = Math.min(btns.length - 1, i + 1);
      else n = Math.max(0, i - 1);
      btns.forEach(function (b, bi) { b.tabIndex = bi === n ? 0 : -1; });
      btns[n].focus();
    });
  },
};

window.PAGES = window.PAGES || {};
window.PAGES.examiner = page;
})();
