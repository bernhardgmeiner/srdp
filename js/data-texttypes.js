/* ════════════════════════════════════════════════════════════
   SRDP Matura Writing Guide – Content Data (Part 1: text types)
   ════════════════════════════════════════════════════════════ */
window.SRDP = {};

SRDP.textTypes = [
  /* ─── ESSAY ─────────────────────────────────────────────── */
  {
    id: 'essay', name: 'Essay', tagline: 'Argue your position with evidence',
    color: 'purple', badge: 'B2 · the long task (~400 words)', schools: ['ahs'],
    quickFacts: [
      { label: 'Word count', value: '~400 words (360–440)' },
      { label: 'Register', value: 'Formal' },
      { label: 'Title', value: 'Required' },
      { label: 'Structure', value: '~5 paragraphs' },
    ],
    layout: [
      { part: 'Title', note: 'clear and relevant – not necessarily catchy' },
      { part: 'Introduction', note: '~80 words – hook + state your opinion clearly' },
      { part: 'Body paragraph 1', note: '~80 words – bullet point 1' },
      { part: 'Body paragraph 2', note: '~80 words – bullet point 2' },
      { part: 'Body paragraph 3', note: '~80 words – bullet point 3' },
      { part: 'Conclusion', note: '~80 words – summarise + restate opinion in different words' },
    ],
    dos: [
      'Write in a formal style throughout',
      'Make your opinion clear from the introduction',
      'Start each paragraph with a topic sentence',
      'Use generalisations, not personal anecdotes',
      'Use formal linking words: However, Nevertheless, Moreover, Furthermore',
      'Vary sentence length – mix short and long',
      'Use complex grammar: passive voice, conditionals, relative clauses',
      'You may mention a counter-argument – but then refute it',
    ],
    donts: [
      "No contractions (don't, can't, it's)",
      'No colloquial or slang expressions',
      'No overly emotional language',
      'No personal anecdotes ("When I was 12…") – use general or hypothetical examples',
      'No over-generalisation ("All politicians are liars.")',
      'No simple linking words as your only connectors (and, but, because)',
      'No very short sentences one after another',
      'No statistics without context',
    ],
    phrases: [
      { category: 'Giving your opinion (without overusing "I")',
        items: ['It is (firmly) believed that…', 'One can argue that…', 'Many people are convinced that…', 'As far as many people are concerned,…', 'It is often argued that…'] },
      { category: 'When you do use "I"',
        items: ['In my opinion/view,…', 'I am inclined to believe that…', 'I (firmly) believe that…', 'I am (not) convinced that…'] },
      { category: 'Adding arguments',
        items: ['Furthermore,…', 'Moreover,…', 'In addition to this,…', 'What is more,…', 'Not only… but also…'] },
      { category: 'Introducing the other side',
        items: ['One should, nevertheless, consider…', 'The other side of the coin is that…', 'On the other hand,…', 'Admittedly,…'] },
      { category: 'Conclusions',
        items: ['Taking these points into consideration,…', 'All of this points to the conclusion that…', 'On balance, we can safely say that…', 'The arguments presented prove that…'] },
    ],
    tip: 'An essay should make the reader think. It is fact-based and formal. An article should make the reader feel. An essay uses generalisations; a blog uses personal anecdotes.',
    modelText: {
      title: 'The Hidden Cost of Fast Fashion', wordCount: '~400', register: 'Formal',
      paragraphs: [
        {
          text: 'Have you ever stopped to think about where your clothes actually come from? The fashion industry has grown dramatically over the past two decades, with consumers now purchasing around 60% more clothing than they did in 2000. In my opinion, the environmental and social damage caused by fast fashion far outweighs the benefit of cheap clothing.',
          annotations: [
            { span: 'Have you ever stopped to think about where your clothes actually come from?', type: 'special', label: 'Rhetorical question hook' },
            { span: 'In my opinion, the environmental and social damage caused by fast fashion far outweighs the benefit of cheap clothing.', type: 'content', label: 'Thesis – opinion stated clearly' },
          ]
        },
        {
          text: 'To begin with, the environmental impact of fast fashion is severe. The production of cheap garments requires enormous amounts of water and energy, and releases toxic chemicals into rivers and soil. According to the United Nations Environment Programme, the fashion industry is responsible for an estimated 2 to 8 per cent of global carbon emissions, alongside a significant share of industrial water pollution. Furthermore, most of these garments end up in landfill within a year of purchase. In addition, synthetic fabrics such as polyester are made from fossil fuels and shed tiny microplastics with every single wash. These particles flow into rivers and oceans, enter the food chain, and have even been detected in human blood.',
          annotations: [
            { span: 'To begin with, the environmental impact of fast fashion is severe.', type: 'content', label: 'Topic sentence (Point)' },
            { span: 'According to the United Nations Environment Programme', type: 'language', label: 'Evidence introducer' },
            { span: 'Furthermore,', type: 'language', label: 'B2 linking word' },
            { span: 'synthetic fabrics such as polyester are made from fossil fuels', type: 'content', label: 'Evidence developed in detail' },
          ]
        },
        {
          text: 'Equally alarming are the working conditions in the factories that produce these clothes. Workers in countries such as Bangladesh and Cambodia are often forced to work twelve-hour shifts for wages that barely cover basic living costs. The Rana Plaza factory collapse in 2013, which killed over 1,100 garment workers, exposed the dangerous reality behind bargain-priced T-shirts. Despite promises of reform, investigations continue to reveal unsafe conditions. Independent investigations have also uncovered widespread child labour and the violent suppression of trade unions. While shoppers in Europe enjoy an endless supply of cheap outfits, the people who actually make them are denied safety, a living wage and basic security.',
          annotations: [
            { span: 'which killed over 1,100 garment workers,', type: 'language', label: 'Relative clause – adds detail elegantly' },
            { span: 'Despite', type: 'language', label: 'B2 contrasting linker' },
            { span: 'While shoppers in Europe enjoy an endless supply of cheap outfits', type: 'language', label: 'Contrast carries the argument' },
          ]
        },
        {
          text: 'Admittedly, some argue that fast fashion makes trendy clothing accessible to people who cannot afford designer brands. While this may be true to some extent, it does not justify an industry built on exploitation and pollution. Affordable clothing can exist without disposable clothing. A number of clothing brands have shown that durable, fairly produced garments do not have to be expensive.',
          annotations: [
            { span: 'Admittedly,', type: 'special', label: 'Counter-argument acknowledged' },
            { span: 'While this may be true to some extent,', type: 'special', label: 'Counter-argument refuted' },
          ]
        },
        {
          text: 'Taking these points into consideration, it is clear that the true cost of fast fashion is paid not by consumers, but by workers and the planet. If we genuinely want to address the climate crisis, we must start by rethinking our relationship with the clothes we wear. Consumers can make a genuine difference by buying less, choosing quality over quantity and repairing what they already own.',
          annotations: [
            { span: 'Taking these points into consideration,', type: 'language', label: 'Conclusion linker' },
            { span: 'If we genuinely want to address the climate crisis,', type: 'language', label: 'Conditional – complex structure' },
            { span: 'buying less, choosing quality over quantity', type: 'content', label: 'Concrete call to action' },
          ]
        },
      ]
    },
  },

  /* ─── ARTICLE ───────────────────────────────────────────── */
  {
    id: 'article', name: 'Article', tagline: 'Write for real readers',
    color: 'blue', badge: 'Long or short task', schools: ['ahs', 'bhs'],
    quickFacts: [
      { label: 'Word count', value: '~250 or ~400 words' },
      { label: 'Register', value: 'Depends on the audience' },
      { label: 'Title', value: 'Required – catchy!' },
      { label: 'Structure', value: '~5 paragraphs' },
    ],
    layout: [
      { part: 'Catchy title', note: 'rhetorical question, alliteration, bold statement' },
      { part: 'Introduction', note: "~50 words – grab the reader's attention immediately" },
      { part: 'Body paragraph 1', note: '~50–80 words – bullet point 1' },
      { part: 'Body paragraph 2', note: '~50–80 words – bullet point 2' },
      { part: 'Body paragraph 3', note: '~50–80 words – bullet point 3' },
      { part: 'Conclusion', note: '~50 words – leave the reader thinking' },
    ],
    dos: [
      'Know your audience (teenagers? general public? experts?)',
      'Use rhetorical questions to engage readers',
      'Address the reader directly ("you")',
      'Talk about personal experiences and emotions',
      'Use a topic sentence for each paragraph',
      'Write a conclusion that leaves something to think about',
      'Make the opening paragraph irresistible',
      'Use exclamation marks and direct speech if the register allows it',
    ],
    donts: [
      "Don't be overly emotional or dramatic",
      "Don't forget who you're writing for",
      "Don't write a boring title",
      'Don\'t write like a formal report (no "It is believed that…")',
      "Don't ignore the publication context given in the task",
    ],
    phrases: [
      { category: 'Openings',
        items: ['Have you ever…?', 'Do you remember the first time that…?', 'Are you one of those people who…?', 'There is nothing worse than…'] },
      { category: 'Engaging throughout',
        items: ['Can you imagine…?', 'If you ask me,…', 'You may not agree with me, but…', 'I will never forget the time when…', 'To be honest, it scares me when I think that…'] },
      { category: 'Conclusions',
        items: ['So next time you…', 'The question is not whether… but when.', "Perhaps it's time we all…", "Food for thought, isn't it?"] },
    ],
    tip: 'Key difference – report vs. article: a report only informs. An article makes the reader feel; it is personal, emotional and engaging. Always check WHERE the article will appear – a school magazine needs a different voice than a serious newspaper.',
    modelText: {
      title: 'Screens Off, Life On?', wordCount: '~250', register: 'Semi-formal (school magazine)',
      paragraphs: [
        {
          text: 'Are you one of those people who check their phones within five minutes of waking up? If so, you are definitely not alone. A recent experiment at our school challenged students to give up their phones for an entire week. The results were surprising.',
          annotations: [
            { span: 'Are you one of those people who check their phones within five minutes of waking up?', type: 'special', label: 'Rhetorical question – grabs reader immediately' },
            { span: 'The results were surprising.', type: 'special', label: 'Hook – reader wants to know more' },
          ]
        },
        {
          text: 'When the experiment started, most participants felt anxious and disconnected. Several students admitted they instinctively reached into their pockets dozens of times a day. "I didn\'t even realise how addicted I was," one participant told me. However, by day three the first cracks began to show: a handful of students started talking during breaks instead of reaching for their phones. By the middle of the week, the mood had completely changed. Students who normally sat in silence were suddenly chatting, laughing and swapping stories at every break.',
          annotations: [
            { span: '"I didn\'t even realise how addicted I was,"', type: 'special', label: 'Direct speech – suits articles, NOT reports' },
            { span: 'However,', type: 'language', label: 'B2 linking word' },
            { span: 'the mood had completely changed', type: 'special', label: 'Turning point in the story' },
          ]
        },
        {
          text: 'The most striking change was in the social atmosphere. Without screens to hide behind, students had to look at each other and hold real conversations. I know this sounds old-fashioned, but it genuinely felt different – warmer, somehow. Teachers noticed the difference too, reporting fewer disruptions and more engagement. One classmate of mine, usually glued to her screen, ended up organising a lunchtime card tournament that half the year joined.',
          annotations: [
            { span: 'I know this sounds old-fashioned, but it genuinely felt different – warmer, somehow.', type: 'special', label: 'Personal voice – suits articles, NOT reports' },
          ]
        },
        {
          text: 'So, would I recommend a phone detox? Absolutely, even if only for a few days. You might be surprised by what you notice when you finally look up from that little screen. Honestly, the hardest part was not giving up the phone. It was admitting just how much I had been missing.',
          annotations: [
            { span: 'So, would I recommend a phone detox?', type: 'language', label: 'Rhetorical question to conclude' },
            { span: 'You might be surprised by what you notice', type: 'special', label: 'Conclusion – leaves reader thinking' },
          ]
        },
      ]
    },
  },

  /* ─── REPORT ────────────────────────────────────────────── */
  {
    id: 'report', name: 'Report', tagline: 'Present findings and recommend action',
    color: 'orange', badge: 'Long or short task', schools: ['ahs', 'bhs'],
    quickFacts: [
      { label: 'Word count', value: '~250 or ~400 words' },
      { label: 'Register', value: 'Formal, objective, neutral' },
      { label: 'Title', value: 'Subject line + section headings' },
      { label: 'Structure', value: 'Header + sections' },
    ],
    layout: [
      { part: 'Date:', note: '[date]' },
      { part: 'From:', note: '[your name / role]' },
      { part: 'Subject:', note: '[clear, descriptive title]' },
      { part: 'Introduction', note: '~50–80 words – state purpose and data source' },
      { part: 'Section + heading', note: '~50–80 words – main point 1, under its own heading' },
      { part: 'Section + heading', note: '~50–80 words – main point 2, under its own heading' },
      { part: 'Conclusion / Recommendations', note: '~50–80 words – summarise + suggest action' },
    ],
    dos: [
      'Present and analyse facts, not personal opinions',
      'Be neutral, concise, and to the point',
      'Use the passive voice where appropriate',
      'Include specific data when referencing surveys/statistics – you may invent realistic figures',
      'End with clear recommendations or suggestions',
      'Make it the most visually organised text on your paper',
      'Use linking words to show language proficiency',
    ],
    donts: [
      "Don't give personal opinions in the main body",
      "Don't repeat information across sections",
      "Don't write anything that isn't relevant",
      "Don't forget the Date / From / Subject header",
      "Don't forget section headings",
      "Don't use emotional or informal language",
    ],
    phrases: [
      { category: 'Introduction',
        items: ['As requested, I have prepared a report on…', 'The aim of this report is to…', 'This report examines/compares…', 'The data was collected through…'] },
      { category: 'Presenting data',
        items: ['Twenty per cent of the people asked…', 'The majority of respondents…', 'One out of five stated that…', 'It is generally felt that…', 'A large proportion of those interviewed…'] },
      { category: 'Conclusion / Recommendations',
        items: ['On the basis of these findings,…', 'I would therefore recommend/suggest that…', 'It would seem that… is the best option.', 'In view of this, one can recommend…', 'It would also be advisable to…'] },
    ],
    tip: 'The report is the most visually distinctive text type. Examiners notice the headings immediately. Every section needs one, no exceptions.',
    modelText: {
      title: 'Survey Results – Student Stress Levels', wordCount: '~250', register: 'Formal',
      paragraphs: [
        {
          text: 'Date: 15 March 2026\nFrom: Anna Gruber, Student Council\nSubject: Survey Results – Student Stress Levels',
          isHeader: true,
          annotations: [
            { span: 'Date: 15 March 2026\nFrom: Anna Gruber, Student Council\nSubject: Survey Results – Student Stress Levels', type: 'structure', label: 'Header – Date, From, Subject all required' },
          ]
        },
        {
          text: 'Introduction\nThis report presents the findings of a survey on stress levels conducted among 85 students in years 7 and 8. The aim is to identify the main causes of stress and suggest possible measures. The survey was carried out anonymously over a two-week period in February and consisted of ten questions on workload, sleep and support services.',
          annotations: [
            { span: 'Introduction', type: 'structure', label: 'Section heading' },
            { span: 'The aim is to identify the main causes of stress and suggest possible measures.', type: 'content', label: 'States purpose of report' },
            { span: 'carried out anonymously', type: 'language', label: 'Passive – objective method' },
          ]
        },
        {
          text: 'Key Findings\nThe majority of respondents (72%) reported feeling stressed on a regular basis. Exams and homework deadlines were identified as the primary sources of pressure. In addition, 45% mentioned sleep problems connected to school-related anxiety. Only 18% were aware of the school\'s existing counselling services. When asked about the timing of stress, students pointed clearly to the weeks before exams. Notably, girls reported higher stress levels than boys, although both groups named similar causes.',
          annotations: [
            { span: 'The majority of respondents (72%)', type: 'language', label: 'Report language – cite data precisely' },
            { span: 'were identified as', type: 'language', label: 'Passive voice – objective tone' },
            { span: 'In addition,', type: 'language', label: 'B2 linking word' },
            { span: 'Notably, girls reported higher stress levels than boys', type: 'language', label: 'Precise reporting of data' },
          ]
        },
        {
          text: 'Recommendations\nOn the basis of these findings, I would recommend introducing a weekly "no-homework day" and promoting the counselling service through posters and assemblies. It would also be advisable to schedule exams more evenly across the term to reduce pressure peaks. Finally, teachers could be encouraged to coordinate test dates through a shared online calendar so that deadlines do not pile up in the same week.',
          annotations: [
            { span: 'Recommendations', type: 'structure', label: 'Every section gets its own heading' },
            { span: 'On the basis of these findings,', type: 'language', label: 'Conclusion linker for reports' },
            { span: 'I would recommend', type: 'special', label: 'Recommendation – required in every report' },
            { span: 'It would also be advisable to', type: 'language', label: 'Formal suggestion phrase' },
          ]
        },
        {
          text: 'Conclusion\nIn summary, stress is widespread among younger students and is closely linked to exams and homework. If these recommendations are put into practice, the school could noticeably improve both student wellbeing and academic results.',
          annotations: [
            { span: 'Conclusion', type: 'structure', label: 'Optional final section' },
            { span: 'If these recommendations are put into practice', type: 'language', label: 'Conditional – formal close' },
          ]
        },
      ]
    },
  },

  /* ─── BLOG ──────────────────────────────────────────────── */
  {
    id: 'blog', name: 'Blog', tagline: 'Personal voice, invite interaction',
    color: 'green', badge: 'Post or comment', schools: ['ahs', 'bhs'],
    quickFacts: [
      { label: 'Word count', value: '~250 or ~400 words' },
      { label: 'Register', value: 'Informal to semi-formal' },
      { label: 'Title', value: 'Post only (not a comment)' },
      { label: 'Key feature', value: 'Personal, invite comments' },
    ],
    layout: [
      { part: 'Username', note: '' },
      { part: 'Date / time', note: '' },
      { part: 'Title', note: 'post only – attention-grabbing' },
      { part: 'Introduction', note: '~50 words – hook the reader, introduce topic' },
      { part: 'Body paragraphs 1–3', note: '~50–80 words each – one bullet point per paragraph' },
      { part: 'Conclusion', note: '~50 words – wrap up + invite readers to comment' },
    ],
    dos: [
      'Write in a personal, engaging voice',
      'Share personal experiences and opinions freely',
      'Address the reader directly ("you")',
      'Encourage readers to comment (blog post)',
      'Reference the original post in your opening (blog comment)',
      "Contractions are OK (don't, I'm, it's)",
      'Be original and show personality',
      'Shorter paragraphs work well here',
    ],
    donts: [
      "Don't write like a report (too formal)",
      "Don't forget to invite comments (blog post)",
      "Don't forget to reference the original post (blog comment)",
      "Don't be rude or offensive – remember it's public",
      'Don\'t use academic phrases like "It is widely believed that…"',
    ],
    phrases: [
      { category: 'Blog post openers',
        items: ['It took me ages to figure this out, but…', "So, here's what I've been thinking about…", "You won't believe what happened to me…", 'OK so hear me out –'] },
      { category: 'Blog comment openers',
        items: ["Hi [name], I've just seen your blog on…", 'I stumbled across your post and…', 'This really resonated with me because…'] },
      { category: 'Engaging the reader',
        items: ['What do you think?', "I'd love to hear your thoughts on this.", 'Let me know in the comments!', 'Has anyone else experienced this?', 'Am I the only one who…?'] },
    ],
    tip: 'For a blog COMMENT, your very first sentence should refer to the original post, ideally by name: "Hi Jeff, I stumbled across your blog on overtourism and it really made me think…"',
    modelText: {
      title: 'Why I Quit Instagram for a Month (And What Happened Next)', wordCount: '~250', register: 'Informal',
      paragraphs: [
        {
          text: 'by max_adventures · 22 March 2026, 19:34\n\nWhy I Quit Instagram for a Month (And What Happened Next)',
          isHeader: true,
          annotations: [
            { span: 'by max_adventures · 22 March 2026, 19:34', type: 'structure', label: 'Username + date/time – required for blog' },
          ]
        },
        {
          text: 'OK so hear me out – I know everyone talks about digital detoxes these days, but I actually went through with it. Last month I deleted Instagram from my phone. Cold turkey. No "screen time limits", no "I\'ll just check once a day" – gone. And honestly? It was weird. My friends genuinely thought I had lost my mind. One of them actually asked if I was okay, as if deleting an app were some kind of cry for help.',
          annotations: [
            { span: 'OK so hear me out –', type: 'special', label: 'Informal, personal tone – contractions OK' },
            { span: 'And honestly? It was weird.', type: 'special', label: 'Short sentence for effect – works in blogs' },
          ]
        },
        {
          text: 'The first few days were rough. I kept unlocking my phone and staring at the empty space where the app used to be. I realised I\'d been scrolling for about two hours every single day. That\'s basically the same as watching a movie. Every. Day. But after about a week, something clicked. I started reading before bed again. By the end of the second week, I had finished an entire book, the first one in months, and somehow my brain felt quieter and less twitchy.',
          annotations: [
            { span: 'basically', type: 'language', label: 'Informal register – fine for blogs' },
            { span: 'Every. Day.', type: 'special', label: 'Stylistic fragmentation – very blog-appropriate' },
            { span: 'my brain felt quieter and less twitchy', type: 'special', label: 'Vivid personal detail' },
          ]
        },
        {
          text: 'So, am I back on Instagram now? Yeah, I am. But I use it differently: maybe 20 minutes a day, max. The month off taught me it\'s just a tool, and I\'d been treating it like a lifestyle. Have any of you tried something like this? I\'d love to hear your stories in the comments! If you have ever felt like your phone owns you instead of the other way round, maybe give it a try. Worst case, you waste a weekend. Best case, you get a little piece of your life back.',
          annotations: [
            { span: 'Have any of you tried something like this? I\'d love to hear your stories in the comments!', type: 'special', label: 'Call to comment – REQUIRED for blog posts' },
          ]
        },
      ]
    },
  },

  /* ─── E-MAIL ────────────────────────────────────────────── */
  {
    id: 'email', name: 'E-Mail', tagline: 'Clear purpose, proper format',
    color: 'red', badge: 'Usually the short task', schools: ['ahs', 'bhs'],
    quickFacts: [
      { label: 'Word count', value: '~250 words (225–275)' },
      { label: 'Register', value: 'Formal' },
      { label: 'Subject line', value: 'Required' },
      { label: 'Sign-off', value: 'Yours faithfully / sincerely' },
    ],
    layout: [
      { part: 'To:', note: "[recipient's email]" },
      { part: 'From:', note: '[your email]' },
      { part: 'Date:', note: '[date]' },
      { part: 'Subject:', note: '[clear and descriptive]' },
      { part: 'Dear Sir or Madam, / Dear Mr/Ms [Name],', note: '' },
      { part: 'Introduction', note: 'state why you are writing in the first sentence' },
      { part: 'Body paragraphs 1–3', note: 'one bullet point per paragraph' },
      { part: 'Conclusion', note: 'restate purpose, expected response' },
      { part: 'Yours faithfully, / Yours sincerely,', note: 'faithfully = name unknown; sincerely = name known' },
    ],
    dos: [
      'Include all header elements (To, From, Date, Subject)',
      'State your reason for writing in the first sentence',
      'Use formal language – no slang',
      "Use full forms (do not instead of don't)",
      'Leave a blank line between paragraphs',
      'Match greeting to closing (Dear Sir → Yours faithfully)',
      'Use "softer" verbs when criticising: I would like to point out, it seems to me',
    ],
    donts: [
      'No contractions in formal e-mails',
      'No emojis or emoticons',
      'No casual greetings (Hey, Hi there)',
      "Don't use an unprofessional e-mail address",
      "Don't forget a subject line",
      "Don't mix up faithfully/sincerely",
    ],
    phrases: [
      { category: 'Complaint openers',
        items: ['I am writing to express my dissatisfaction with…', 'I am writing to complain about…', 'I would like to draw your attention to…', 'I was appalled to find…'] },
      { category: 'Application openers',
        items: ['I am writing to apply for the position of… as advertised in…', 'I am writing with reference to your advertisement…', 'I believe I am suitable for the position as I…'] },
      { category: 'Letter to the editor openers',
        items: ['I am writing in response to the article on…, which appeared in… on [date].', 'I have just read your article on… and I feel I must respond.', 'You raised some issues which I feel strongly about.'] },
      { category: 'Closings (all sub-types)',
        items: ['I look forward to hearing from you at your earliest convenience.', 'I look forward to receiving the information requested.', 'I am available for an interview at your convenience.', 'Thank you for your cooperation in correcting this matter.'] },
    ],
    tip: 'Faithfully vs. sincerely: "Dear Sir/Madam" (name unknown) → Yours faithfully. "Dear Mr/Ms Brown" (name known) → Yours sincerely. Getting this wrong is an instant flag for examiners.',
    modelText: {
      title: 'Complaint regarding Summer Language Course in Brighton', wordCount: '~250', register: 'Formal',
      paragraphs: [
        {
          text: 'To: info@globalenglish.example\nFrom: sarah.berger@email.example\nDate: 10 April 2026\nSubject: Complaint regarding Summer Language Course in Brighton',
          isHeader: true,
          annotations: [
            { span: 'To: info@globalenglish.example\nFrom: sarah.berger@email.example\nDate: 10 April 2026\nSubject: Complaint regarding Summer Language Course in Brighton', type: 'structure', label: 'Header – all 4 elements required' },
          ]
        },
        {
          text: 'Dear Sir or Madam,\n\nI am writing to express my dissatisfaction with the two-week language course I attended at your Brighton school from 1 to 14 July 2025. Although your website promised small class sizes and experienced teachers, my experience was far from what had been advertised. I had specifically chosen your school because of these promises, so the reality on arrival was a serious disappointment.',
          annotations: [
            { span: 'Dear Sir or Madam,', type: 'structure', label: 'Formal greeting (name unknown)' },
            { span: 'I am writing to express my dissatisfaction with', type: 'language', label: 'Set phrase – complaint opener' },
            { span: 'Although', type: 'language', label: 'Concession – B2 linking' },
            { span: 'far from what had been advertised', type: 'language', label: 'Formal understatement – effective in complaints' },
          ]
        },
        {
          text: 'To begin with, the classes had up to 22 students, which made individual attention impossible. Furthermore, our teacher changed three times during the course, and the final replacement had no formal teaching qualification. As a result, several students felt they had not improved at all. On top of this, the afternoon activities advertised in the brochure were cancelled twice without notice. When I raised these problems with the reception staff, I was simply told that nothing could be done, and none of the staff seemed willing to take responsibility. To make matters worse, the written complaint I handed in during the course was never answered.',
          annotations: [
            { span: 'Furthermore,', type: 'language', label: 'B2 linking word' },
            { span: 'As a result,', type: 'language', label: 'Cause-effect linker' },
            { span: 'On top of this', type: 'language', label: 'Adds a further complaint' },
          ]
        },
        {
          text: 'I would therefore like to request a partial refund of the course fees, as the services provided did not match the description on your website. I look forward to hearing from you within 14 days. Should I not receive a satisfactory response, I will have no choice but to share my experience on public review platforms.\n\nYours faithfully,\nSarah Berger',
          annotations: [
            { span: 'I would therefore like to request', type: 'special', label: 'Clear, specific demand' },
            { span: 'I look forward to hearing from you within 14 days.', type: 'language', label: 'Sets a deadline – professional and firm' },
            { span: 'Yours faithfully,', type: 'structure', label: 'Correct sign-off (Dear Sir → faithfully)' },
            { span: 'Should I not receive a satisfactory response', type: 'language', label: 'Formal conditional – firm but polite' },
          ]
        },
      ]
    },
  },
  /* ─── LEAFLET (BHS) ─────────────────────────────────────────── */
  {
    id: 'leaflet', name: 'Leaflet', tagline: 'Inform and persuade at a glance',
    color: 'purple', badge: 'BHS · „Broschüre“ · informs & persuades', schools: ['bhs'],
    quickFacts: [
      { label: 'Word count', value: '~250 words' },
      { label: 'Register', value: 'Persuasive, reader-friendly' },
      { label: 'Title', value: 'Required – plus subheadings' },
      { label: 'Key feature', value: 'Headed sections + call to action' },
    ],
    layout: [
      { part: 'Main title', note: 'names the offer or event clearly – and makes people want to read on' },
      { part: 'Short intro / hook', note: '~30–40 words – say what this is and why it matters to the reader' },
      { part: 'Subheading + section 1', note: 'one benefit or block of information under its own heading' },
      { part: 'Subheading + section 2', note: 'the next point – short, scannable, one idea per section' },
      { part: 'Subheading + section 3 (optional)', note: 'a further point if the word count allows' },
      { part: 'Call to action', note: 'tell the reader the one thing to do next (come, sign up, get in touch)' },
      { part: 'Practical details', note: 'date, time, place, price, website, phone – the facts people need' },
    ],
    dos: [
      'Give it a clear title and break the text into short, headed sections',
      'Know exactly who the leaflet is for and write straight to them',
      'Sell the benefits, not just the facts – why should the reader care?',
      'Keep sections short and scannable – a leaflet is read standing up, not studied',
      'Address the reader directly ("you") and use imperatives: come along, find out more',
      'End with a clear call to action – the one thing you want the reader to do',
      'Add the practical details: date, time, place, price, how to get in touch',
      'Match the register to the audience, but keep it accessible – not slang, not bureaucratic',
    ],
    donts: [
      "Don't write it as one long, unbroken block of text – a leaflet is broken into short, headed sections",
      "Don't drop the subheadings – they are what make it a leaflet at a glance",
      "Don't tell a personal story from your own life – a leaflet informs, it does not confess (that is a blog)",
      "Don't weigh arguments for and against – a leaflet promotes one thing, it does not debate it",
      "Don't slip into slang or txt-speak – persuasive is fine, sloppy is not",
      "Don't forget the call to action and the contact details – a leaflet with no next step is just decoration",
    ],
    phrases: [
      { category: 'Attention-grabbing openers',
        items: ['Looking for something to do this summer?', 'Ever wondered what goes on behind our doors?', 'New to the area? Here is where to start.', 'Something new is coming to your town – and everyone is welcome.', 'Good news for anyone who loves…'] },
      { category: 'Describing & persuading',
        items: ['Whether you are a complete beginner or already experienced,…', 'There really is something for everyone.', 'It is easier – and cheaper – than you might think.', 'Best of all, it is completely free.', 'No experience needed – just come as you are.'] },
      { category: 'Direct address & calls to action',
        items: ['Come along and see for yourself.', 'Sign up today – places are limited.', 'Bring a friend and make a day of it.', 'Find out more on our website.', 'Do not miss out.'] },
      { category: 'Practical information & closings',
        items: ['When: Saturday, 14 June, from 10 a.m.', 'Where: the main hall, Hauptstraße 1.', 'Entry is free. / Tickets: €5.', 'For more information, visit www.…', 'Questions? Call us on… or drop by any weekday.'] },
    ],
    tip: 'A leaflet (called a „Broschüre“ on the official task sheet) is not one long block of prose. It informs AND persuades a target audience, and the layout does half the work: a clear title, short headed sections, direct address and a call to action. Picture the reader holding it at a bus stop – everything has to land in seconds. Keep the register persuasive but clean: warmer than a report, cleaner than a blog. You write the text only – a title, headed sections and a call to action, never drawings or layout.',
    modelText: {
      title: 'Open Day at Schulzentrum Seetal – See Your Future in Action',
      wordCount: '~250', register: 'Persuasive',
      paragraphs: [
        {
          text: 'Open Day at Schulzentrum Seetal – See Your Future in Action',
          isHeader: true,
          annotations: [
            { span: 'Open Day at Schulzentrum Seetal – See Your Future in Action', type: 'structure', label: 'Main title – names the event and sells it' },
          ]
        },
        {
          text: 'Not sure what to do after secondary school? Spend a morning with us and find out. On Saturday, 7 November, our whole school opens its doors: workshops, real projects and students who are happy to show you around. Come and see what studying here is actually like, with no pressure and no entrance test.',
          annotations: [
            { span: 'Not sure what to do after secondary school?', type: 'special', label: 'Question aimed straight at the reader' },
            { span: 'workshops, real projects and students who are happy to show you around', type: 'content', label: 'Sells the benefit, not just the facts' },
          ]
        },
        {
          text: 'Try Before You Choose\nInstead of reading about our courses, you can try them. In our workshops you can build a small circuit, plan a three-course menu or design a marketing campaign, all in a single morning. Teachers and senior students work alongside you, so there is no way to get it wrong.',
          annotations: [
            { span: 'Try Before You Choose', type: 'structure', label: 'Subheading – breaks the text into scannable sections' },
            { span: 'build a small circuit, plan a three-course menu or design a marketing campaign', type: 'content', label: 'Concrete, appealing detail' },
          ]
        },
        {
          text: 'Meet the People, Not Just the Building\nWant to know what life here is really like? Ask the people who live it. Current students will show you the labs and workshops and answer your questions about lessons, homework and life after graduation.',
          annotations: [
            { span: 'Meet the People, Not Just the Building', type: 'structure', label: 'Second subheading – parallel and benefit-led' },
            { span: 'Ask the people who live it.', type: 'language', label: 'Direct address keeps the reader involved' },
          ]
        },
        {
          text: 'Something for Every Interest\nWhether you are drawn to technology, business or hospitality, there is a taster session waiting for you. Try your hand at coding, run a mini pop-up shop, or cook a small dish in our training kitchen. You will leave knowing which path actually suits you, not just which one sounds good in a brochure.',
          annotations: [
            { span: 'Whether you are drawn to technology, business or hospitality', type: 'content', label: 'Speaks to HTL, HAK and HLW readers alike' },
            { span: 'Try your hand at coding, run a mini pop-up shop, or cook a small dish', type: 'special', label: 'Concrete, varied activities keep it persuasive' },
          ]
        },
        {
          text: 'Come and See for Yourself\nBring your parents, bring a friend, bring your questions. Entry is free and no registration is needed.\n\nWhen: Saturday, 7 November, 9 a.m. to 1 p.m.\nWhere: Schulzentrum Seetal, Bildungsweg 1, 1234 Seetal\nMore information: www.schulzentrum-seetal.example',
          annotations: [
            { span: 'Come and See for Yourself', type: 'special', label: 'Call to action – tells the reader exactly what to do' },
            { span: 'Bring your parents, bring a friend, bring your questions.', type: 'language', label: 'Imperatives + repetition – persuasive leaflet style' },
            { span: 'When: Saturday, 7 November, 9 a.m. to 1 p.m.\nWhere: Schulzentrum Seetal, Bildungsweg 1, 1234 Seetal\nMore information: www.schulzentrum-seetal.example', type: 'structure', label: 'Practical details – the facts people need' },
          ]
        },
      ]
    },
  },
];

/* ─── SCHOOL TYPES (AHS / BHS) ──────────────────────────────────
   Sprachteil UND Bewertungsraster sind für AHS und BHS identisch
   (SRDP Assessment Scale B2, Revision 2023, gültig ab Herbsttermin 2024 –
   Kriterium 2 heißt bei beiden „Coherence and Cohesion").
   Verschieden sind nur: Aufgabenanzahl (2 vs. 3), Zeit (120 vs. 195 min),
   Textsorten (Essay nur AHS, Leaflet nur BHS), die Wörterbuch-Regel
   und dass die BHS kein „Language in Use" als eigene Säule prüft. */
SRDP.schools = {
  ahs: {
    id: 'ahs', label: 'AHS', long: 'AHS',
    eyebrow: 'AHS Schriftliche Reifeprüfung · English B2',
    brandTag: 'English Writing · B2 · AHS',
    tasksWord: 'two', taskCount: 2,
    timeStat: '120 min', timeStatSub: 'total writing time',
    tasksStat: '2 tasks', tasksStatSub: '~400 + ~250 words',
    overviewIntro: 'You have <strong style="color:var(--text)">120 minutes</strong> for <strong style="color:var(--text)">two tasks</strong>: one longer (~400 words, at B2 usually the essay) and one shorter (~250 words). Writing is one of four equally weighted sections of the written exam, alongside Reading, Listening and Language in Use.',
    timeSplitTip: 'Time split that works: ~65 min for the 400-word task (incl. 5–10 min planning) · ~40 min for the 250-word task · the rest for proofreading both. Write your finishing times on the task sheet before you start.',
    wordCountTip: 'Word count tolerance: ±10%. That is 360–440 words for 400-word tasks and 225–275 for 250-word tasks. If you are further off than that, Task Achievement is reduced by one band.',
    dictionary: 'At AHS, dictionaries and reference works – electronic ones included – are not allowed anywhere in the standardised exam. That is less scary than it sounds: the tasks are built so that B2 vocabulary is enough, and when a word will not come, paraphrase it – the grid rewards that.',
    provisional: false,
  },
  bhs: {
    id: 'bhs', label: 'BHS', long: 'BHS',
    eyebrow: 'BHS Reife- und Diplomprüfung · English B2',
    brandTag: 'English Writing · B2 · BHS',
    tasksWord: 'three', taskCount: 3,
    timeStat: '195 min', timeStatSub: 'total writing time',
    tasksStat: '3 tasks', tasksStatSub: '~250 words each',
    overviewIntro: 'The BHS Writing section has <strong style="color:var(--text)">three tasks</strong>, usually around 250 words each (each task states its own target, ±10%), and you get <strong style="color:var(--text)">195 minutes</strong>. Writing is one of three sections of the written exam, alongside Reading and Listening – there is no separate Language in Use section. One BHS perk: (electronic) dictionaries are allowed, but only during the Writing section. The text types are article, report, blog, e-mail and leaflet – no essay.',
    timeSplitTip: 'Time split that works: three tasks in 195 minutes is roughly 55–60 minutes each, planning included. Read every prompt twice, note your finishing times on the task sheet, and keep about 10 minutes at the end to proofread all three.',
    wordCountTip: 'Word count tolerance: ±10%. Each task states its own target (usually around 250 words, so 225–275). If you are further off than that, Task Achievement is reduced by one band.',
    dictionary: 'At BHS, (electronic) dictionaries are allowed – but only during the Writing section, not in Reading or Listening. Even so, the tasks are built so that B2 vocabulary is enough; when a word will not come, paraphrase it.',
    provisional: false,
  },
};

/* ─── E-MAIL SUB-TYPES ─────────────────────────────────────── */
SRDP.emailSubTypes = [
  {
    id: 'complaint', name: 'Letter / E-Mail of Complaint',
    purpose: 'You are unhappy with a product, service, or experience and you want something done about it. Stay firm but professional, never aggressive.',
    layoutNotes: 'Use the standard email header (To/From/Date/Subject). State your reason in the first sentence. Describe problems clearly in the body. End with a specific, reasonable demand.',
    dos: [
      'State clearly what went wrong and when',
      'Include specific details (dates, names, amounts)',
      'Make a clear, reasonable demand in the conclusion',
      'Use formal, measured language – firm but not rude',
      'Set a deadline for a response if appropriate',
    ],
    donts: [
      'Don\'t use emotional language ("terrible", "disgusting", "outrageous")',
      "Don't threaten legal action unless you mean it",
      "Don't be vague about what you want",
      "Don't forget to sign off correctly",
    ],
    phrases: [
      { category: 'Opening', items: ['I am writing to express my dissatisfaction with…', 'I am writing to complain about…', 'I would like to draw your attention to a serious problem regarding…', 'I feel I must bring to your attention…'] },
      { category: 'Describing the problem', items: ['…was not what we had been led to expect', 'It was not up to the standard advertised.', 'To make matters worse,…', 'We were extremely disappointed to find that…', 'The situation was further complicated by the fact that…'] },
      { category: 'Making demands', items: ['I would like you to refund my money.', 'I expect a full explanation for this situation.', 'Unless I receive a satisfactory reply within 14 days, I will be forced to…', 'I would be grateful if you could rectify this matter immediately.', 'I am requesting a partial refund of…'] },
      { category: 'Closing', items: ['I look forward to hearing from you at your earliest convenience.', 'I trust this matter will be dealt with promptly.', 'Thank you for your cooperation in correcting this matter.'] },
    ],
    tip: 'The complaint letter tests your ability to be assertive without being rude. "I am writing to express my dissatisfaction" is far more effective than "Your service was awful." Examiners reward measured, professional tone.',
    modelNote: 'The full model text on the "Model text" tab of the e-mail guide is a complaint – study it there.',
  },
  {
    id: 'application', name: 'Letter / E-Mail of Application',
    purpose: 'You are applying for a job, internship, volunteer position, or course. Be specific and confident, and show the employer why you are the right person.',
    layoutNotes: "Standard email header. First paragraph: what you're applying for and where you saw it. Middle: your qualifications and relevant experience. Final paragraph: express enthusiasm and availability for interview.",
    dos: [
      "State exactly what position you're applying for in the first sentence",
      'Mention where you saw the advertisement',
      'Be specific about your qualifications and experience',
      'Explain why YOU are suitable (not just what you want)',
      'Express enthusiasm without being over-the-top',
      'Offer to provide further information or attend an interview',
    ],
    donts: [
      "Don't be too modest – sell yourself professionally",
      "Don't focus only on what you want to gain",
      "Don't use contractions or informal language",
      "Don't forget to mention the attached CV if relevant",
      "Don't write a generic letter – tailor it to the specific job",
    ],
    phrases: [
      { category: 'Opening', items: ['I am writing to apply for the position of… as advertised in…', 'I am writing with reference to your advertisement for…', 'Having seen your advertisement in…, I would like to apply for…'] },
      { category: 'Qualifications & experience', items: ['I am currently a [age]-year-old student at…', 'My qualifications include…', 'For the past [time], I have…', 'I gained valuable experience while…', 'As you can see from my attached CV,…'] },
      { category: 'Suitability', items: ['I believe I am suitable for this position as I…', 'I consider myself to be enthusiastic, hard-working, and reliable.', 'My experience in… has prepared me well for…', 'I have developed strong skills in… through my work at…'] },
      { category: 'Closing', items: ['I am available for an interview at your convenience.', 'I look forward to discussing my application further.', 'Please do not hesitate to contact me if you require any further information.', 'I would welcome the opportunity to contribute to your organisation.'] },
    ],
    tip: 'Tense tip: use present simple for current skills ("I am a reliable person"), past simple for past experience ("I worked for…"), present perfect for ongoing activities ("I have been studying…"). Mixing these correctly shows B2 grammar range.',
    modelText: {
      title: 'Application for Summer Camp Counsellor', wordCount: '~250', register: 'Formal',
      paragraphs: [
        {
          text: 'To: recruitment@lakesidecamps.example\nFrom: lukas.steiner@email.example\nDate: 3 May 2026\nSubject: Application for Summer Camp Counsellor',
          isHeader: true,
          annotations: [
            { span: 'Subject: Application for Summer Camp Counsellor', type: 'structure', label: 'Subject names the exact position' },
          ]
        },
        {
          text: 'Dear Ms Carter,\n\nI am writing to apply for the position of summer camp counsellor at Lakeside Camps, as advertised on your website on 28 April. As an 18-year-old secondary school student with experience in youth work, I believe I would be a valuable addition to your team. Working with children has been part of my life for years, and a summer at Lakeside Camps would be the perfect next step.',
          annotations: [
            { span: 'Dear Ms Carter,', type: 'structure', label: 'Name known → will close with "Yours sincerely"' },
            { span: 'I am writing to apply for the position of summer camp counsellor at Lakeside Camps, as advertised on your website on 28 April.', type: 'language', label: 'Position + where you saw the ad – first sentence' },
          ]
        },
        {
          text: 'For the past two years, I have been a volunteer leader in a local scout group, where I plan weekly activities for children aged eight to twelve. This has taught me how to organise games, resolve conflicts calmly and take responsibility for the safety of a group. In addition, I have completed a first-aid course and speak fluent German and English. Last summer I also helped run a two-week day camp for forty children, where I was responsible for planning the daily schedule and supervising swimming sessions, often for groups of twenty or more.',
          annotations: [
            { span: 'For the past two years, I have been', type: 'language', label: 'Present perfect – ongoing experience' },
            { span: 'This has taught me how to organise games, resolve conflicts calmly and take responsibility', type: 'content', label: 'Skills linked to the job – not just listed' },
            { span: 'responsible for planning the daily schedule', type: 'content', label: 'Concrete, relevant responsibility' },
          ]
        },
        {
          text: 'I would welcome the opportunity to bring my energy and experience to Lakeside Camps this summer. I am available for an online interview at your convenience and would be happy to provide references. Please find my CV attached. I love being outdoors, and I would like to help children enjoy the kind of great summer I had at camp myself.\n\nYours sincerely,\nLukas Steiner',
          annotations: [
            { span: 'I am available for an online interview at your convenience', type: 'language', label: 'Standard closing move for applications' },
            { span: 'Yours sincerely,', type: 'structure', label: 'Correct: name known → sincerely' },
          ]
        },
      ]
    },
  },
  {
    id: 'editor', name: 'Letter to the Editor',
    purpose: 'You respond to an article or comment published in a newspaper or magazine. You must reference the original publication, then agree or disagree with the arguments made. This is one of the most frequently tested sub-types.',
    layoutNotes: 'Standard email header (To: editor@publication.example). Greeting: "Dear Sir or Madam," or "Dear Editor,". FIRST SENTENCE must name the article, publication, and date. Sign off with Yours faithfully + full name + town/city.',
    dos: [
      'Name the article, publication, and date in your first sentence',
      'Take a clear position (agree, disagree, or partially agree)',
      'Support your view with arguments, examples, or personal experience',
      'Make your argument local or personal – explain why it affects you',
      'End with a call to action or appeal to other readers',
      'Include your town/city after your name',
    ],
    donts: [
      "Don't forget to reference the original article – this is essential",
      'Don\'t use a name-based greeting ("Dear Mr. Johnson") – you don\'t know the editor',
      "Don't write without a clear position",
      "Don't use contractions or informal language",
      'Don\'t close with "Yours sincerely" – it must be "Yours faithfully"',
    ],
    phrases: [
      { category: 'Opening – reference the article', items: ['I am writing in response to the article entitled "…", which appeared in… on [date].', 'I have just read your article on… and feel I must respond.', "I am writing with reference to the article published in last month's issue of… .", 'Your recent article on… raises issues which I feel strongly about.'] },
      { category: 'Agreeing', items: ['I completely agree with the view expressed in your article that…', 'I was pleased to read your article on…, as it reflects my own experience.', 'It is certainly true that…', 'The author makes an excellent point when they argue that…'] },
      { category: 'Disagreeing', items: ['I am afraid I must respectfully disagree with the position expressed.', 'While I understand the argument, I cannot agree that…', 'The author fails to consider…', 'It is simply not true that…', 'While I completely agree that…, I cannot accept…'] },
      { category: 'Conclusion / Call to action', items: ['I sincerely hope that… will reconsider this position.', "May I draw your readers' attention to…", 'What we must do is ensure that…', 'I urge your readers to…', 'I hope this letter will contribute to a wider debate on this issue.'] },
    ],
    tip: 'Make it personal and local: explain WHY you care about this issue and how it affects your community. Examiners notice when a writer actually cares about the topic.',
    modelText: {
      title: 'Re: "Why Teenagers Should Not Have Part-Time Jobs"', wordCount: '~250', register: 'Formal',
      paragraphs: [
        {
          text: 'To: editor@viennaherald.example\nFrom: julia.brunner@email.example\nDate: 12 February 2026\nSubject: Re: "Why Teenagers Should Not Have Part-Time Jobs"',
          isHeader: true,
          annotations: [
            { span: 'To: editor@viennaherald.example', type: 'structure', label: 'Addressed to the editor' },
          ]
        },
        {
          text: 'Dear Sir or Madam,\n\nI am writing in response to the article entitled "Why Teenagers Should Not Have Part-Time Jobs", which appeared in the Vienna Herald on 8 February. While the author raises some valid concerns, I cannot accept the conclusion that part-time work harms young people. As a sixteen-year-old who works part-time myself, I feel the article overlooks the very people it claims to protect.',
          annotations: [
            { span: 'I am writing in response to the article entitled "Why Teenagers Should Not Have Part-Time Jobs", which appeared in the Vienna Herald on 8 February.', type: 'special', label: 'REQUIRED: article + publication + date in sentence one' },
            { span: 'While the author raises some valid concerns, I cannot accept', type: 'content', label: 'Clear position – partial disagreement' },
            { span: 'I feel the article overlooks the very people it claims to protect', type: 'special', label: 'Personal stake stated early' },
          ]
        },
        {
          text: 'It is certainly true that schoolwork must come first. However, the article fails to consider what a few hours of work each week actually teach you about responsibility, time management and handling your own money. Speaking from my own experience as a student who works four hours every Saturday, my grades have not suffered – if anything, I have learned to organise my week far more effectively. Many of my classmates juggle a weekend job with school and sport without any drop in their marks. What they gain instead is confidence and a sense of independence that no classroom can teach, along with a first, valuable taste of real working life.',
          annotations: [
            { span: 'However, the article fails to consider', type: 'language', label: 'Formal disagreement phrase' },
            { span: 'Speaking from my own experience as a student who works four hours every Saturday', type: 'special', label: 'Personal, local angle – strengthens the letter' },
            { span: 'confidence and a sense of independence that no classroom can teach', type: 'content', label: 'Counter-argument developed' },
          ]
        },
        {
          text: 'Instead of warning parents about part-time jobs, we should be discussing how to make them fair and compatible with school. I urge your readers, especially employers, to offer young people flexible positions with reasonable hours. A balanced approach would serve teenagers far better than a blanket ban.\n\nYours faithfully,\nJulia Brunner, Vienna',
          annotations: [
            { span: 'I urge your readers, especially employers, to', type: 'language', label: 'Call to action – strong ending' },
            { span: 'Yours faithfully,\nJulia Brunner, Vienna', type: 'structure', label: 'Faithfully + full name + city' },
          ]
        },
      ]
    },
  },
  {
    id: 'enquiry', name: 'E-Mail of Enquiry / Requesting Information',
    purpose: 'You want information about something – a product, a service, a course, an event, or a programme. You must be specific about what information you need.',
    layoutNotes: 'Standard email header. State your purpose in the first sentence. Use indirect questions ("I would like to know whether…" rather than "Is there…?") for a more formal tone. Each paragraph covers one information request.',
    dos: [
      'State clearly who you are and why you are writing in the first sentence',
      'Use indirect questions for formal register',
      'Be specific – ask for exactly the information you need',
      'Group related questions in the same paragraph',
      'Thank the recipient in advance',
    ],
    donts: [
      "Don't ask too many questions at once (3 is usually enough)",
      'Don\'t use direct questions aggressively ("Tell me about…")',
      "Don't forget to say what you will do with the information",
      "Don't use contractions",
    ],
    phrases: [
      { category: 'Opening', items: ['I am writing to enquire about…', 'I would like to request further information about…', 'I am writing on behalf of… to enquire whether…', 'Having seen your advertisement for…, I am writing to find out more details about…'] },
      { category: 'Asking questions (indirect form)', items: ['I would like to know whether…', 'Could you please tell me…?', 'I would be grateful if you could inform me of…', 'I would appreciate it if you could clarify…', 'I was wondering whether it might be possible to…'] },
      { category: 'Closing', items: ['I look forward to receiving the information requested.', 'I would appreciate a prompt reply, as I need to make arrangements by…', 'Please do not hesitate to contact me if you require any further information.', 'I look forward to hearing from you.'] },
    ],
    tip: 'Indirect questions ("I would like to know whether…") are more formal than direct questions ("Is there…?"). Use them throughout and the examiner sees solid B2 control of register and grammar.',
    modelText: {
      title: 'Enquiry about Volunteer Programme in Scotland', wordCount: '~230', register: 'Formal',
      paragraphs: [
        {
          text: 'To: info@highlandvolunteers.example\nFrom: paul.wagner@email.example\nDate: 20 January 2026\nSubject: Enquiry about Volunteer Programme in Scotland',
          isHeader: true,
          annotations: [
            { span: 'Subject: Enquiry about Volunteer Programme in Scotland', type: 'structure', label: 'Clear, descriptive subject line' },
          ]
        },
        {
          text: 'Dear Sir or Madam,\n\nI am writing to enquire about the four-week conservation volunteer programme in the Scottish Highlands, which I found on your website. I am an 18-year-old student from Austria and I am planning to spend part of my summer doing meaningful work abroad. I am particularly interested in projects involving woodland restoration and the protection of native wildlife.',
          annotations: [
            { span: 'I am writing to enquire about', type: 'language', label: 'Set phrase – enquiry opener' },
            { span: 'I am an 18-year-old student from Austria', type: 'content', label: 'Says who you are – gives context' },
          ]
        },
        {
          text: 'First of all, I would like to know whether the programme is open to participants without previous experience in conservation work. Furthermore, could you please tell me what kind of accommodation is provided and whether meals are included in the participation fee? Finally, I would be grateful if you could inform me of the total costs and the application deadline for July. I would also appreciate some information about the typical daily routine and whether volunteers are given any free time to explore the surrounding area. Knowing this in advance would help me decide whether the programme is the right fit.',
          annotations: [
            { span: 'I would like to know whether', type: 'language', label: 'Indirect question – formal register' },
            { span: 'could you please tell me what kind of accommodation is provided', type: 'language', label: 'Indirect question – note the word order' },
            { span: 'I would be grateful if you could inform me of', type: 'language', label: 'Very formal request phrase' },
            { span: 'whether volunteers are given any free time', type: 'language', label: 'Polite indirect question' },
          ]
        },
        {
          text: 'I would appreciate a prompt reply, as I need to make my travel arrangements by the end of February. Thank you very much in advance for your help. In addition, I would be grateful for the contact details of a former participant who might be willing to share their experience.\n\nYours faithfully,\nPaul Wagner',
          annotations: [
            { span: 'I would appreciate a prompt reply, as I need to make my travel arrangements by the end of February.', type: 'language', label: 'Polite urgency + reason' },
          ]
        },
      ]
    },
  },
];
