/* ════════════════════════════════════════════════════════════
   SRDP Matura Writing Guide – Content Data (Part 5: Grade like an examiner)
   All model texts and commentary were WRITTEN FOR THIS SITE as realistic
   B2-style examples. They are not real candidates' work and are not copied
   from any publication.
   ════════════════════════════════════════════════════════════ */

SRDP.ratingLevels = [
  { lvl: 'C1', tag: 'above the exam', desc: 'Fluent and precise, well above what the Matura asks. The writer handles complex ideas smoothly, uses idioms naturally, changes register easily and makes the important points stand out. Errors are rare and hard to find.' },
  { lvl: 'B2', tag: 'your target', desc: 'Clear and detailed on many topics. Arguments are developed and compared, there are some complex structures, and the text is mostly accurate. Some errors are still there, but they never stop the reader from understanding.' },
  { lvl: 'B1', tag: 'not quite there', desc: 'Short, simple and personal, on familiar topics. Ideas come one after the other in a simple list, reasons are short, and the writer’s first language often shows through.' },
];


SRDP.ratingApprop = [
  { s: 'In contrary, online shops are often cheaper.', ok: 'It signals a contrast in the right place, so it helps the reader follow.', no: 'The phrase itself is wrong. Here you need In contrast. Use On the contrary only when you say the opposite of a claim you have just made.' },
  { s: 'I cycle to school, beside it is faster.', ok: 'The linking word adds a second reason, and that is what the sentence needs.', no: 'The correct linking word is besides. Beside means "next to".' },
  { s: 'Despite of the cost, the trip was worth it.', ok: 'The contrast word is in the right place and joins the two ideas.', no: 'Write despite or in spite of. Despite of does not exist.' },
];


SRDP.ratingExamples = [
  /* 1 · ESSAY (AHS): competent, mid-range, position a touch soft */
  {
    id: 'essay', type: 'essay', target: 400, register: 'formal',
    taskLine: 'Essay · give and support an opinion for a formal reader',
    prompt: 'Some teenagers take on a part-time job while they are still at school. Write an essay in which you discuss whether this is a good idea. In your essay you should: weigh up what students can gain from working; consider the problems a job can cause; explain what would make it work.',
    horizon: [
      'The purpose is to persuade a formal reader. A clear position (for, against or "it depends") should be visible early.',
      'All three content points need reasons or examples. Just mentioning them is not enough.',
      'An essay is fairly formal. Argue mainly with general and hypothetical examples. A short personal example is fine, but not as your main evidence. Avoid contractions.',
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
        'The text persuades the reader and has a clear position ("a small job can teach a great deal, as long as it does not take over"). The position itself is fine. It just comes at the very end of the first paragraph. A short, clear statement of opinion earlier would be stronger.',
        'All three content points are covered, but not equally well. The first (what students gain) is well developed. The second (problems) is shorter, and the third (what would make it work) moves on to a new idea, the type of work.',
        'The personal example ("A friend of mine ... in a bakery") is a little informal for an essay. It is fine here because general arguments come first. The title and the conclusion work well.',
      ] },
      CC: { band: 7, points: [
        'The argument is easy to follow. Each paragraph has one idea and starts with a topic sentence.',
        'Different linking words in the right places ("while", "On the other hand", "Moreover", "All in all") guide the reader.',
        'Some links between paragraphs are weaker, and the fourth paragraph does not connect closely to the main argument. That keeps it out of the top bands.',
      ] },
      LR: { band: 7, points: [
        'Good vocabulary for the topic ("responsibility", "appreciate its value", "exploited", "fair treatment", "in small doses").',
        'Different structures (when-clauses, conditionals, relative clauses like "A teenager who works ...") and little repetition.',
        'The register is mostly formal. Only the personal example about the friend sounds a bit less formal.',
      ] },
      LA: { band: 6, points: [
        'The language is mostly correct and the reader always understands. This keeps the text clearly at B2.',
        'There are some clear mistakes: "advices" (advice is uncountable), "Everyone have" (subject–verb agreement) and "it depends of" (it should be depends on).',
        'They are not systematic and easy to fix. Without them, this text could get an 8 for Accuracy.',
      ] },
    },
    holistic: 'A good essay that argues its case and is easy to follow. Two things hold it back. The position should be clear earlier in the first paragraph, and the second and third content points need as much development as the first. The grammar mistakes ("advices", "Everyone have", "depends of") are easy to practise and avoid. Without them, the Accuracy band would be higher.',
  },

  /* 2 · ARTICLE (all): good, but over the word limit, TA penalty */
  {
    id: 'article', type: 'article', target: 250, register: 'semi-formal',
    taskLine: 'Article · for the online school magazine',
    prompt: 'Your school tried a "no-phone week". Write an article about it for the international page of your online school magazine. In your article you should: describe how students reacted at first; explain what the week changed; suggest whether the school should do it again.',
    horizon: [
      'An article has to catch the reader\'s interest and keep it: an interesting opening, a lively style, direct address and maybe one or two rhetorical questions.',
      'Each of the three content points needs its own part of the text. A short list of reactions is not enough.',
      'Watch the word count. This text is long, and more than 10% over the target costs one band in Task Achievement.',
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
    wordNote: 'This article has 282 words. For a 250-word task the limit is 275 words (+10%). Because the text is longer, Task Achievement drops one band: a 7 becomes a 6.',
    ratings: {
      TA: { band: 6, points: [
        'For content and text type alone this is a 7. It has a strong opening ("hand in your phone until Friday"), sounds like a real article, uses direct address and rhetorical questions, and covers all three content points.',
        'The problem is the length. With 282 words it is over the limit of 275 words (+10% of 250), so the band drops to 6. See the note below.',
        'The third content point (should the school do it again?) gets a clear, concrete idea: "a single phone-free lunch break" and "Why not try one a week".',
      ] },
      CC: { band: 6, points: [
        'The order of ideas is clear and the paragraphs are well built, with a clear turning point ("But something changed after the second day").',
        'In the paragraph about the first reactions, the sentences are mostly listed one after the other and hardly linked.',
        'There are only a few linking words ("Of course", "yet", "So"). They are used correctly, but there is little variety.',
      ] },
      LR: { band: 6, points: [
        'Enough range for the task, with some lively phrases ("out of pure habit", "what was there all along").',
        'Some words come back several times ("phone", "screen", "unplugged"), and there are only a few complex structures.',
        'The register suits an article: informal, but still controlled.',
      ] },
      LA: { band: 6, points: [
        'The language is very accurate. There is only one real mistake ("reaching in an empty pocket" should be "into").',
        'Still, the band stays at 6 because the text uses very few complex structures. Most sentences are fairly simple, so there are few chances to make mistakes.',
        'The higher Accuracy bands ask for correct complex structures, and this text hardly tries any. Range loses more for this (see above). Under Accuracy it only means that there is no evidence for an 8.',
      ] },
    },
    holistic: 'An enjoyable article that sounds like a real person wrote it. For content and style alone, Task Achievement would be a 7. The word count costs one band: cutting seven words would have been enough to keep the 7. So count your words at the end and cut where you can.',
  },

  /* 3 · REPORT (all): the strong anchor */
  {
    id: 'report', type: 'report', target: 250, register: 'formal',
    taskLine: 'Report · for a decision-maker',
    prompt: 'Your school is reviewing its after-school clubs. Write a report for the student council. In your report you should: outline how satisfied students are with the current clubs; describe the main problems; recommend improvements for next year.',
    horizon: [
      'A report gives facts in an impersonal way, for someone who has to make a decision.',
      'It should look like a report at first sight: a short header, clear headings that say what each section is about, and facts or figures presented simply. Headings do not need numbers.',
      'The recommendations must follow from the findings.',
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
        'The text does what the task asks: it informs the student council and recommends what to do. The header is complete and the register stays impersonal.',
        'All three content points are developed with figures ("74%", "almost half"), and each section has a clear heading.',
        'For a 10, the recommendations would need a little more detail.',
      ] },
      CC: { band: 8, points: [
        'The order is logical and easy to follow. Each section stays on its topic.',
        'Good linking words connect the ideas ("On the positive side", "However", "In the light of these findings", "To conclude").',
        'Some of these phrases are standard formulas. That keeps the band at 8.',
      ] },
      LR: { band: 7, points: [
        'Formal vocabulary that suits a report ("A recurring complaint", "advisable", "judge demand in advance").',
        'There are some complex structures, for example the passive ("should be spread") and a relative clause ("which forces students to choose").',
        'The range is good but not wide. More variety would bring a higher band.',
      ] },
      LA: { band: 8, points: [
        'Very accurate. Errors are rare and never get in the way of reading.',
        'Percentages, punctuation and sentence structure are all correct.',
        'The text is as accurate as a good report needs to be.',
      ] },
    },
    holistic: 'This text shows how much a clear structure helps. It looks like a report before you read it, stays factual and bases its recommendations on the survey results. The language is good but simple, and that is enough here. With some text types, following the conventions carefully already helps your Task Achievement band a lot.',
  },

  /* 4 · BLOG (all): brilliant voice, task control lags (the "band raten" trap) */
  {
    id: 'blog', type: 'blog', target: 250, register: 'informal',
    taskLine: 'Blog · a personal post (not a comment)',
    prompt: 'Write a post for your personal blog about a habit you decided to change. In your post you should: explain why you decided to change it; describe how it went; say whether you would recommend it to others.',
    horizon: [
      'A blog post needs a personal voice. It is informal, contractions are fine, and it speaks to the reader directly.',
      'All three content points still have to be developed. A great story with no real answer to the third content point (would you recommend it?) loses marks in Task Achievement.',
      'Be careful: very good language and Task Achievement are rated separately. One can be high while the other is low.',
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
        'This is clearly a blog post, and two of the three content points are very well done: why she stopped (the 2 a.m. moment) and how it went (the empty space where the apps used to be, the two books, feeling calmer).',
        'The third content point (would you recommend it?) gets only two short sentences ("Try it yourself ... stay with it") and no real reasons. That is why the band is 6.',
        'This happens often: the writing is good, but one content point is not developed enough.',
      ] },
      CC: { band: 7, points: [
        'The story is easy to follow from the decision to the end of the month. Each paragraph is one stage.',
        'The text is held together mainly by the order of the story and by pronouns. It uses few linking words.',
        'The change to the short last paragraph is a bit sudden. That keeps it out of the top bands.',
      ] },
      LR: { band: 9, points: [
        'A wide range, used with confidence: an idiom ("out of the loop"), a comparison ("like a dog nosing at a bowl") and many different structures.',
        'The register is right for a blog post from start to finish.',
        'This is the strongest criterion. The writer knows a lot of English.',
      ] },
      LA: { band: 7, points: [
        'Even the long, difficult sentences are very accurate, and nothing gets in the way of reading.',
        'Real errors are hard to find, but the text is not perfect enough for the top bands.',
        'Clearly B2, and the accuracy fits the strong range.',
      ] },
    },
    holistic: 'The best thing about this text is its voice: this writer can really write. But Task Achievement looks at the task, and the third content point (would you recommend it?) gets only two lines while the story gets most of the space. So Range can be 9 while Task Achievement is 6, and both bands are fair. Next time, use a few of those good sentences for the third content point.',
  },

  /* 5 · EMAIL (all): does its job, held down by accuracy + register slips */
  {
    id: 'email', type: 'email', target: 250, register: 'formal',
    taskLine: 'E-mail · a formal enquiry',
    prompt: 'You have seen an advert for a summer English course abroad. Write an e-mail to the language school. In your e-mail you should: say why you are interested; ask about the accommodation and the group size; ask about the free-time programme.',
    horizon: [
      'The reason for writing belongs in the first line, and the greeting and sign-off must match.',
      'The register is formal or neutral: no contractions and no casual words such as "really".',
      'Each question should be specific and developed. A list of questions is not enough.',
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
        'The purpose is clear from the first line and all three content points are covered. The greeting and sign-off match ("Dear Sir or Madam" → "Yours faithfully").',
        'The subject line ("Question about your summer course") is vague. It repeats words from the task and does not say what exactly Felix wants to know.',
        'The extra question about a certificate comes at the very end and is not developed like the others.',
      ] },
      CC: { band: 7, points: [
        'Clear paragraphs, each with one purpose, and a proper opening and ending.',
        'Linking words show the order ("First", "Secondly", "also"), though they feel a little mechanical.',
        'The message is easy to follow from start to finish.',
      ] },
      LR: { band: 6, points: [
        'Enough vocabulary for an enquiry ("grateful", "accommodation", "host family", "excursions", "deadline").',
        '"I would like to" comes up several times. The contraction "it doesn’t say" and the casual "really helpful" are too informal for an enquiry, and "grateful" would fit better than "very thankful".',
        'Enough language for the task, but not much more.',
      ] },
      LA: { band: 6, points: [
        'The language is mostly correct and nothing is misunderstood. This keeps it clearly at B2.',
        'There are two clear mistakes: "any informations" (information is uncountable) and the missing question mark after "do the students get a certificate at the end". There are only a few mistakes like these, and they do not repeat.',
        'The casual "really" and the contraction "it doesn’t say" are register problems. They count under Range, so Accuracy stays at 6.',
      ] },
    },
    holistic: 'The e-mail does its job. The reader knows exactly what Felix wants, and the greeting and sign-off are correct. Small things hold it back: a mistake with an uncountable noun, a missing question mark, and the informal "really" and "doesn’t" in a formal message. The content is complete. A careful last proofreading would fix most of these problems.',
  },

  /* 6 · LEAFLET (BHS): solid, a bit article-ish */
  {
    id: 'leaflet', type: 'leaflet', target: 250, register: 'persuasive',
    taskLine: 'Leaflet · advertise and inform',
    prompt: 'Your school is holding an open day for future students and their families. Write a leaflet about it. In your leaflet you should: make people want to come; explain what visitors can see and do; give the practical details.',
    horizon: [
      'A leaflet has to catch the reader\'s interest quickly: a catchy title, subheadings that say what the reader gets, direct address and a clear call to action.',
      'It informs as well as persuades, so readers expect a short block of practical details (when, where, how).',
      'The style should be lively and direct. A typical problem is a calm, general description that sounds like an article.',
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
        'Almost all leaflet features are there: a catchy title, subheadings that say what visitors get, direct address ("Come and See for Yourself"), a call to action and a block with the details.',
        'The opening ("Choosing the right school is a big decision") is general and sounds a bit like an article. It does not make the reader want to come straight away.',
        'All three content points are covered, and the practical information is complete and clear.',
      ] },
      CC: { band: 6, points: [
        'The text is organised in blocks with headings. That suits a leaflet and is easy to scan.',
        'Inside the sections, the sentences mostly follow one another without linking words, so the text does not flow very well.',
        'In a leaflet this is partly acceptable, but it keeps Coherence and Cohesion at 6.',
      ] },
      LR: { band: 6, points: [
        'Suitable persuasive phrases ("opens its doors", "no sales talk", "taster lessons", "something for everyone").',
        'The range is good enough but not wide, and "school" and "students" come up many times.',
        'The language is enough to persuade, but there is not much variety.',
      ] },
      LA: { band: 6, points: [
        'Mostly accurate and always clear, but there are two mistakes.',
        'A subject–verb mistake ("how our school prepare you") and two sentences joined with only a comma ("in the school café, no registration is needed").',
        'The mistakes are small and not systematic, so Accuracy stays at a solid B2.',
      ] },
    },
    holistic: 'A good leaflet that does most things right. It looks like a leaflet, speaks to the reader and ends with the details visitors need. For a higher band, the opening should start with what visitors get on the day. The general sentence about choosing a school is weaker. The two grammar mistakes are easy to find when you proofread.',
  },
];

