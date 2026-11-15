/* ════════════════════════════════════════════════════════════
   SRDP Matura Guide – Content Data (Part 6: Speaking, oral exam B2)
   Practice tasks for the oral Matura in the paired form:
   Individual Long Turn (about 5 minutes) + Paired Activity (about 10 minutes).
   Every task was WRITTEN FOR THIS SITE. None is a real exam task and none
   comes from a school's task pool.
   Charts: real figures from Eurostat (CC BY 4.0), retrieved 2026-11-15.
   The raw download sits in _dev/speaking/eurostat_raw_2026-11-15.json.
   Pictures: AI-generated and labelled as such on the page.
   Stored without end punctuation: bullets and options. The page adds
   commas and the full stop when it shows a task.
   ════════════════════════════════════════════════════════════ */

SRDP.speaking = {
  schema: 'oral/1',
  updated: '2026-11-15',

  /* seconds; marks = when to move on to bullet 2 and bullet 3 */
  timing: { prepOptions: [10, 15, 20, 30], prepDefault: 10, longTurn: 300, longTurnMax: 360, marks: [60, 180], paired: 600, pairedNarrow: 420, reading: 60 },

  topics: [
    /* ─── 1 ─────────────────────────────────────────────── */
    {
      id: 'school', name: 'School and Education',
      keyAspects: ['school types and school systems', 'tests, grades and pressure', 'learning outside the classroom', 'digital tools in lessons', 'leaving school early', 'what makes a good teacher', 'life after school'],
      guiding: [
        'What should every student know or be able to do at the end of school?',
        'How do tests and grades change the way students learn?',
        'What can you learn on a school trip that you cannot learn in a classroom?',
        'What can make school hard to finish for some young people?',
        'How has technology changed lessons since you started school?',
        'What would you change about your school if you were the head teacher?',
      ],
      selfCheck: [
        'Can I describe how the Austrian school system works, with the right words for school types and exams?',
        'Can I explain why some students do well at school and others drop out?',
        'Can I say what I would change about school and give reasons?',
      ],
      longTurns: [
        {
          id: 'school-lt1', aspect: 'Leaving school early',
          intro: 'Give a five-minute talk on the topic of school and education in which you',
          bullets: [
            { stage: 'reproduction', text: 'interpret the information in the chart' },
            { stage: 'transfer', text: 'outline some of the reasons why young people leave education early' },
            { stage: 'reflection', text: 'suggest measures that schools could take to keep students in education' },
          ],
          input: { type: 'chart', chart: 'school-early-leavers' },
        },
        {
          id: 'school-lt2', aspect: 'Learning outside the classroom',
          intro: 'Give a five-minute talk on the topic of school and education in which you',
          bullets: [
            { stage: 'reproduction', text: 'contrast the two pictures' },
            { stage: 'transfer', text: 'explain what students can learn outside the classroom that is hard to learn in a lesson' },
            { stage: 'reflection', text: 'evaluate whether school trips and projects are worth the time and money' },
          ],
          input: { type: 'images', images: ['school-lt2-1', 'school-lt2-2'] },
        },
      ],
      paired: [
        {
          id: 'school-pa1', aspect: 'Student wellbeing',
          short: 'Extra money for student wellbeing: which two ideas?',
          scenario: 'Your school has been given extra money to improve the wellbeing of its students. The head teacher has asked you and the other members of the student council which two ideas you support.',
          options: [
            'setting up a quiet room for breaks',
            'inviting a school counsellor to come in once a week',
            'organising a sports and games day every term',
            'offering a free healthy breakfast once a week',
            'starting a mentoring scheme for younger students',
          ],
          closing: 'Try to agree on two.', minutes: 10,
        },
        {
          id: 'school-pa2', aspect: 'A better school day',
          short: 'Changing the school day: which two changes would help students most?',
          scenario: 'The parents and teachers at your school want to change the school day. Before they decide, they have asked students which changes would help them most.',
          options: [
            'starting lessons an hour later',
            'doing homework in supervised study time at school',
            'having a longer lunch break with clubs and sports',
            'working on projects one day a week',
            'teaching in 90-minute blocks instead of 50-minute lessons',
          ],
          closing: 'Try to agree on two.', minutes: 10,
        },
      ],
    },

    /* ─── 2 ─────────────────────────────────────────────── */
    {
      id: 'media', name: 'Media and Communication',
      keyAspects: ['how people follow the news', 'social media', 'fake news and fact-checking', 'advertising and influencers', 'privacy and personal data', 'phones in everyday life', 'newspapers, radio and television'],
      guiding: [
        'Where do you get your news from, and how do you know it is true?',
        'Why do false stories spread so quickly online?',
        'How does social media change the way friends and families talk to each other?',
        'What do influencers and advertisers want from their audience?',
        'Which information about yourself would you never share online, and why?',
        'Do we still need newspapers and public broadcasters?',
      ],
      selfCheck: [
        'Can I describe my own media habits and compare them with those of older people?',
        'Can I explain how misinformation spreads and how to check a story?',
        'Can I give my opinion on rules for phones and social media, with reasons?',
      ],
      longTurns: [
        {
          id: 'media-lt1', aspect: 'Young people and the news',
          intro: 'Give a five-minute talk on the topic of media and communication in which you',
          bullets: [
            { stage: 'reproduction', text: 'interpret the information in the chart' },
            { stage: 'transfer', text: 'outline some of the reasons why social networks are more popular with young people than news sites' },
            { stage: 'reflection', text: 'evaluate whether social networks are a good place for young people to get their news' },
          ],
          input: { type: 'chart', chart: 'media-online-by-age' },
        },
        {
          id: 'media-lt2', aspect: 'Always online',
          intro: 'Give a five-minute talk on the topic of media and communication in which you',
          bullets: [
            { stage: 'reproduction', text: 'describe what the picture shows' },
            { stage: 'transfer', text: 'analyse how smartphones influence the way families and friends communicate' },
            { stage: 'reflection', text: 'suggest rules for phone use that families or groups of friends could agree on' },
          ],
          input: { type: 'images', images: ['media-lt2-1'] },
        },
      ],
      paired: [
        {
          id: 'media-pa1', aspect: 'News for students',
          short: 'A news page for the school magazine: which two ideas?',
          scenario: 'Your school magazine wants to start a news page that students will actually read. The editors have collected five ideas and have asked for your opinion.',
          options: [
            'a weekly "true or false?" quiz about stories in the news',
            'short video reports made by students',
            'interviews with people from your town who are in the news',
            'a column that explains one big story in simple words',
            'a page for comments and letters from readers',
          ],
          closing: 'Try to agree on two.', minutes: 10,
        },
        {
          id: 'media-pa2', aspect: 'Media week at the youth centre',
          short: 'Media week at the youth centre: which two workshops?',
          scenario: 'The youth centre in your town is planning a media week for teenagers. There is time for two workshops, and the organisers have asked you to help them choose.',
          options: [
            'spotting fake news and manipulated pictures',
            'making a podcast episode',
            'protecting your privacy on social media',
            'dealing with hate comments and cyberbullying',
            'finding out how influencers earn their money',
          ],
          closing: 'Try to agree on two.', minutes: 10,
        },
      ],
    },

    /* ─── 3 ─────────────────────────────────────────────── */
    {
      id: 'environment', name: 'Nature and Environment',
      keyAspects: ['climate change', 'waste and recycling', 'energy and transport', 'green spaces in towns and cities', 'protecting animals and plants', 'what we buy and throw away', 'what individuals, schools and governments can do'],
      guiding: [
        'Which environmental problem do you notice most where you live?',
        'Why is it so hard for people to change their habits?',
        'Where in your town is the heat hardest to bear in summer, and why?',
        'Who can do more for the climate: individuals, companies or governments?',
        'What happens to the things you throw away?',
        'Which habit would you find hardest to change for the climate, and why?',
      ],
      selfCheck: [
        'Can I describe one environmental problem with the right vocabulary and an example?',
        'Can I explain causes and effects, for example of waste or of heat in cities?',
        'Can I suggest realistic solutions and say who should pay for them?',
      ],
      longTurns: [
        {
          id: 'environment-lt1', aspect: 'Waste and recycling',
          intro: 'Give a five-minute talk on the topic of nature and the environment in which you',
          bullets: [
            { stage: 'reproduction', text: 'interpret the information in the chart' },
            { stage: 'transfer', text: 'analyse how shopping habits and packaging influence how much waste a household produces' },
            { stage: 'reflection', text: 'suggest steps that households and shops could take to reduce waste' },
          ],
          input: { type: 'chart', chart: 'environment-waste' },
        },
        {
          id: 'environment-lt2', aspect: 'Hot summers in the city',
          intro: 'Give a five-minute talk on the topic of nature and the environment in which you',
          bullets: [
            { stage: 'reproduction', text: 'contrast the two pictures' },
            { stage: 'transfer', text: 'explain why heat is a problem for people who live in cities' },
            { stage: 'reflection', text: 'give your own opinion on whether parking spaces in towns and cities should be turned into green spaces, supporting it with examples' },
          ],
          input: { type: 'images', images: ['environment-lt2-1', 'environment-lt2-2'] },
        },
      ],
      paired: [
        {
          id: 'environment-pa1', aspect: 'A greener school',
          short: 'Money for a greener school: which two projects?',
          scenario: 'Your town council has offered money to make your school and the area around it greener. Students have been asked to choose the two best projects.',
          options: [
            'planting trees in the school grounds',
            'building a covered bike shelter',
            'closing the school street to cars before lessons',
            'setting up a vegetable garden',
            'installing drinking fountains to replace plastic bottles',
          ],
          closing: 'Try to agree on two.', minutes: 10,
        },
        {
          id: 'environment-pa2', aspect: 'A climate-friendly class trip',
          short: 'A climate-friendly class trip: which two things matter most?',
          scenario: 'Your class is planning a trip at the end of the school year and wants it to be as climate-friendly as possible. Your teacher has asked you to decide which two things matter most.',
          options: [
            'travelling by train instead of by plane',
            'getting around by bike and public transport at the destination',
            'staying in a hostel with an eco-label',
            'eating only vegetarian meals during the trip',
            'donating money to a tree-planting project',
          ],
          closing: 'Try to agree on two.', minutes: 10,
        },
      ],
    },

    /* ─── 4 ─────────────────────────────────────────────── */
    {
      id: 'work', name: 'Work and Career',
      keyAspects: ['choosing a career', 'applications and job interviews', 'summer jobs and work experience', 'youth unemployment', 'working from home', 'work and free time', 'skills for the jobs of the future', 'equal pay'],
      guiding: [
        'What matters most to you in a job: money, security, free time or meaning?',
        'What do employers look for when they hire someone for a first job?',
        'What can you learn from a summer job?',
        'How will the world of work be different when you are forty?',
        'Is university still the best way into a good job?',
        'Would you like to work from home? Why or why not?',
      ],
      selfCheck: [
        'Can I talk about my own plans for the future and explain my choice?',
        'Can I explain why it is often hard for young people to find their first job, and what that means for them?',
        'Can I weigh up the advantages and disadvantages of working while still at school?',
      ],
      longTurns: [
        {
          id: 'work-lt1', aspect: 'Youth unemployment in Europe',
          intro: 'Give a five-minute talk on the topic of work and career in which you',
          bullets: [
            { stage: 'reproduction', text: 'interpret the information in the chart' },
            { stage: 'transfer', text: 'discuss the effects that being unemployed can have on a young person\'s life' },
            { stage: 'reflection', text: 'suggest measures that governments and companies could take to help young people into work' },
          ],
          input: { type: 'chart', chart: 'work-youth-unemployment' },
        },
        {
          id: 'work-lt2', aspect: 'First jobs',
          intro: 'Give a five-minute talk on the topic of work and career in which you',
          bullets: [
            { stage: 'reproduction', text: 'summarise what the two people say in their statements' },
            { stage: 'transfer', text: 'discuss the advantages and disadvantages of working while you are still at school' },
            { stage: 'reflection', text: 'give your own opinion on what makes a good job, supporting it with examples' },
          ],
          input: { type: 'statements', statements: [
            { who: 'Lena, 17 (invented)', text: 'My summer job in an ice-cream shop taught me more than a whole year at school.' },
            { who: 'David, 18 (invented)', text: 'School is my job. I need my free time, and my parents agree.' },
          ] },
        },
      ],
      paired: [
        {
          id: 'work-pa1', aspect: 'Getting ready for working life',
          short: 'A course for school leavers: which two workshops?',
          scenario: 'The job centre in your region is planning a free one-day course for school leavers. There is time for two workshops, and the organisers have asked young people which ones would help most.',
          options: [
            'knowing your rights as a young employee',
            'practising a job interview with feedback',
            'managing your first salary and a bank account',
            'meeting local employers who talk about their jobs',
            'solving problems together in a team',
          ],
          closing: 'Try to agree on two.', minutes: 10,
        },
        {
          id: 'work-pa2', aspect: 'A week of work experience',
          short: 'A week of work experience: which two things make it useful?',
          scenario: 'Your school is planning a week of work experience for all 16-year-olds. The head teacher wants to know what students think would make this week useful.',
          options: [
            'letting students choose the company themselves',
            'setting personal goals for the week beforehand',
            'having a teacher visit each student at work',
            'asking employers for written feedback',
            'telling the class about the week afterwards',
          ],
          closing: 'Try to agree on two.', minutes: 10,
        },
      ],
    },

    /* ─── 5 ─────────────────────────────────────────────── */
    {
      id: 'tech', name: 'Modern Technologies',
      keyAspects: ['artificial intelligence', 'smartphones and apps', 'robots and automation', 'online safety and privacy', 'technology at school', 'technology and jobs', 'who controls new technology'],
      guiding: [
        'Which piece of technology could you not live without, and why?',
        'What do you use AI tools for, and what don\'t you use them for?',
        'Which jobs can machines do better than people, and which can they not do?',
        'How do you protect your data and your accounts?',
        'Should there be an age limit for social media or AI tools?',
        'Does technology make us more independent or more dependent?',
      ],
      selfCheck: [
        'Can I describe how I use technology in an ordinary week?',
        'Can I explain how AI and automation might change school and work?',
        'Can I argue for or against rules for technology, such as rules for AI at school?',
      ],
      longTurns: [
        {
          id: 'tech-lt1', aspect: 'AI tools in everyday life',
          intro: 'Give a five-minute talk on the topic of modern technologies in which you',
          bullets: [
            { stage: 'reproduction', text: 'interpret the information in the chart' },
            { stage: 'transfer', text: 'outline some of the reasons why young people use AI tools more than older people' },
            { stage: 'reflection', text: 'evaluate whether AI tools make people better or worse at thinking for themselves' },
          ],
          input: { type: 'chart', chart: 'tech-ai-by-age' },
        },
        {
          id: 'tech-lt2', aspect: 'Robots at work',
          intro: 'Give a five-minute talk on the topic of modern technologies in which you',
          bullets: [
            { stage: 'reproduction', text: 'describe what the picture shows' },
            { stage: 'transfer', text: 'speculate on which jobs robots and computers might take over in the next twenty years' },
            { stage: 'reflection', text: 'give your own opinion on whether automation is a threat or an opportunity for your generation' },
          ],
          input: { type: 'images', images: ['tech-lt2-1'] },
        },
      ],
      paired: [
        {
          id: 'tech-pa1', aspect: 'Rules for AI at school',
          short: 'Rules for AI tools at school: which two proposals?',
          scenario: 'Your school wants clear rules for the use of AI tools. A group of students, parents and teachers has collected five proposals and has asked for your opinion.',
          options: [
            'allowing AI tools for homework if students say how they used them',
            'writing all graded texts by hand in class',
            'teaching every class how to use AI tools well',
            'giving all students access to the same AI tool at school',
            'asking students to explain their homework in a short talk',
          ],
          closing: 'Try to agree on two.', minutes: 10,
        },
        {
          id: 'tech-pa2', aspect: 'Helping older people with technology',
          short: 'Helping older people with technology: which two projects?',
          scenario: 'Your town wants to help older people who find smartphones and computers difficult. The town council has asked students to run two projects and wants to know which ones you would choose.',
          options: [
            'weekly smartphone help sessions at the library',
            'video-call afternoons in a local care home',
            'a workshop on spotting fake messages and online scams',
            'a buddy scheme that pairs students with older neighbours',
            'short how-to videos made by students',
          ],
          closing: 'Try to agree on two.', minutes: 10,
        },
      ],
    },

    /* ─── 6 ─────────────────────────────────────────────── */
    {
      id: 'food', name: 'Food and Health',
      keyAspects: ['eating habits', 'fast food and ready meals', 'school meals', 'sport and exercise', 'sleep and stress', 'advertising for food and drinks', 'the role of schools and families'],
      guiding: [
        'What does a typical day of eating look like for young people in Austria?',
        'Why do many people eat fast food, although they know it is often unhealthy?',
        'How do sleep, stress and exercise affect how well you learn?',
        'Who decides what young people eat: parents, schools, companies or young people themselves?',
        'Should unhealthy food be more expensive?',
        'What could your school do to help students live more healthily?',
      ],
      selfCheck: [
        'Can I describe typical eating and exercise habits of young people, with examples?',
        'Can I explain why many people find it hard to eat healthily?',
        'Can I give my opinion on who is responsible for young people\'s health?',
      ],
      longTurns: [
        {
          id: 'food-lt1', aspect: 'Fruit every day?',
          intro: 'Give a five-minute talk on the topic of food and health in which you',
          bullets: [
            { stage: 'reproduction', text: 'interpret the information in the chart' },
            { stage: 'transfer', text: 'outline some of the reasons why almost half of the people in Austria do not eat fruit every day' },
            { stage: 'reflection', text: 'argue for or against making fruit cheaper and sugary snacks more expensive' },
          ],
          input: { type: 'chart', chart: 'food-fruit' },
        },
        {
          id: 'food-lt2', aspect: 'Lunch break',
          intro: 'Give a five-minute talk on the topic of food and health in which you',
          bullets: [
            { stage: 'reproduction', text: 'contrast the two pictures' },
            { stage: 'transfer', text: 'explain why fast food is popular with many young people' },
            { stage: 'reflection', text: 'give your own opinion on who is responsible for what young people eat, supporting it with examples' },
          ],
          input: { type: 'images', images: ['food-lt2-1', 'food-lt2-2'] },
        },
      ],
      paired: [
        {
          id: 'food-pa1', aspect: 'A health week for teenagers',
          short: 'A health week for teenagers: which two events?',
          scenario: 'Your town is organising a health week for teenagers. There is room in the programme for two more events, and the organisers have asked young people to choose.',
          options: [
            'a cooking class with a professional chef',
            'a workshop on sleep and stress',
            'a five-kilometre fun run through the town',
            'a talk by a doctor about energy drinks',
            'a market stall where you can taste regional food',
          ],
          closing: 'Try to agree on two.', minutes: 10,
        },
        {
          id: 'food-pa2', aspect: 'A better school canteen',
          short: 'More students in the canteen: which two changes first?',
          scenario: 'The company that runs your school canteen wants more students to eat there. It has asked the student council which two changes students would like to see first.',
          options: [
            'offering a vegetarian main dish every day',
            'letting students order their meal online to avoid queues',
            'letting students vote on the weekly menu',
            'using more regional and seasonal food',
            'making the dining room a nicer place to sit',
          ],
          closing: 'Try to agree on two.', minutes: 10,
        },
      ],
    },
  ],

  /* ─── Charts: real figures, rounded where noted ─────────────
     type 'bars'    = one row per label
     type 'grouped' = categories, each with one bar per series */
  charts: {
    'school-early-leavers': {
      title: 'Early leavers from education and training',
      subtitle: 'Share of all 18- to 24-year-olds, in %',
      type: 'grouped', unit: '%', decimals: 1, max: 12,
      categories: ['2015', '2020', '2025'],
      series: [
        { name: 'Austria', values: [7.3, 8.1, 10.0] },
        { name: 'EU average', values: [11.0, 10.0, 9.1] },
      ],
      note: 'Early leavers are 18- to 24-year-olds who have finished at most lower secondary school (in Austria: no completed apprenticeship, BMS or Matura) and were not in education or training in the four weeks before the survey. The survey changed slightly in 2021. Austria\'s figure was 8.1 in 2024, so most of the rise to 10.0 happened in one year.',
      source: 'Eurostat, edat_lfse_14', period: '2015 to 2025', retrieved: '2026-11-15', licence: 'CC BY 4.0',
      url: 'https://ec.europa.eu/eurostat/databrowser/view/edat_lfse_14/default/table?lang=en',
    },
    'media-online-by-age': {
      title: 'What people do online, by age',
      subtitle: 'EU, 2025: share of all people in each age group, in %',
      type: 'grouped', unit: '%', decimals: 0, max: 100,
      categories: ['16 to 24', '35 to 44', '65 to 74'],
      series: [
        { name: 'use social networks', values: [90, 78, 34] },
        { name: 'read news sites or online newspapers', values: [61, 74, 52] },
      ],
      note: 'Activities in the three months before the survey. Figures are rounded.',
      source: 'Eurostat, isoc_ci_ac_i', period: '2025', retrieved: '2026-11-15', licence: 'CC BY 4.0',
      url: 'https://ec.europa.eu/eurostat/databrowser/view/isoc_ci_ac_i/default/table?lang=en',
    },
    'environment-waste': {
      title: 'Municipal waste per person',
      subtitle: '2024: kilograms per person',
      type: 'grouped', unit: 'kg', decimals: 0, max: 800,
      categories: ['Austria', 'Germany', 'EU average'],
      series: [
        { name: 'waste produced', values: [775, 616, 513] },
        { name: 'of this: recycled or composted', values: [471, 425, 253] },
      ],
      note: 'Municipal waste is waste from households and similar waste from shops, offices and public buildings. Countries do not all count it in the same way: since 2020 Austria has counted more waste from businesses, and its figure jumped from 588 kg (2019) to 834 kg (2020). The EU figures are estimates by Eurostat.',
      source: 'Eurostat, env_wasmun', period: '2024', retrieved: '2026-11-15', licence: 'CC BY 4.0',
      url: 'https://ec.europa.eu/eurostat/databrowser/view/env_wasmun/default/table?lang=en',
    },
    'work-youth-unemployment': {
      title: 'Youth unemployment in Europe',
      subtitle: '2025: unemployment rate of 15- to 24-year-olds, in %',
      type: 'bars', unit: '%', decimals: 1, max: 26,
      rows: [['Sweden', 24.3], ['Italy', 20.6], ['EU average', 15.2], ['Austria', 11.5], ['Czechia', 10.4], ['Germany', 7.1]],
      highlight: ['Austria', 'EU average'],
      note: 'The rate is the share of unemployed people among those young people who have a job or are looking for one. Students who are not looking for work are not counted. Students who are looking for a part-time job are counted, which is one reason why the rate is high in Sweden. It does not mean that a quarter of all young Swedes are unemployed.',
      source: 'Eurostat, une_rt_a', period: '2025', retrieved: '2026-11-15', licence: 'CC BY 4.0',
      url: 'https://ec.europa.eu/eurostat/databrowser/view/une_rt_a/default/table?lang=en',
    },
    'tech-ai-by-age': {
      title: 'Who uses generative AI tools?',
      subtitle: 'Austria, 2025: share of each age group, in %',
      type: 'bars', unit: '%', decimals: 0, max: 80,
      rows: [['16 to 24', 73], ['25 to 34', 60], ['35 to 44', 47], ['45 to 54', 35], ['55 to 64', 19], ['65 to 74', 9]],
      note: 'People who used a generative AI tool (for example a chatbot) in the three months before the survey. Figures are rounded.',
      source: 'Eurostat, isoc_ai_iaiu', period: '2025', retrieved: '2026-11-15', licence: 'CC BY 4.0',
      url: 'https://ec.europa.eu/eurostat/databrowser/view/isoc_ai_iaiu/default/table?lang=en',
    },
    'food-fruit': {
      title: 'How often do people in Austria eat fruit?',
      subtitle: '2025: share of all people aged 16 and over, in %',
      type: 'bars', unit: '%', decimals: 0, max: 45,
      rows: [['twice a day or more', 13], ['once a day', 41], ['4 to 6 times a week', 18], ['1 to 3 times a week', 22], ['less than once a week', 5], ['never', 2]],
      note: 'Fresh fruit only. Figures are rounded, so they add up to 101.',
      source: 'Eurostat, ilc_hch11', period: '2025', retrieved: '2026-11-15', licence: 'CC BY 4.0',
      url: 'https://ec.europa.eu/eurostat/databrowser/view/ilc_hch11/default/table?lang=en',
    },
  },

  /* ─── Pictures: AI-generated. pending:true = file not delivered yet;
     the page then shows a labelled box with the description instead. ─── */
  images: {
    'school-lt2-1': { file: 'speaking/img/school-lt2-1.webp', ai: true, pending: true, alt: 'A classroom seen from the back: girls and boys of about 16 are sitting in rows at their desks and looking at a male teacher who is writing on the board.' },
    'school-lt2-2': { file: 'speaking/img/school-lt2-2.webp', ai: true, pending: true, alt: 'A mixed group of students of about 16 are kneeling beside a small stream. They are taking water samples and writing down their results while a female teacher watches.' },
    'media-lt2-1': { file: 'speaking/img/media-lt2-1.webp', ai: true, pending: true, alt: 'Three generations are sitting at a dinner table: a grandmother, a father and two teenagers. The food is in front of them, but everyone except the grandmother is looking at a phone.' },
    'environment-lt2-1': { file: 'speaking/img/environment-lt2-1.webp', ai: true, pending: true, alt: 'A city square on a hot summer day: stone paving, parked cars, no trees and no shade. Only a few people are crossing it.' },
    'environment-lt2-2': { file: 'speaking/img/environment-lt2-2.webp', ai: true, pending: true, alt: 'A city square on a hot summer day with large trees, grass and a fountain. People are sitting on benches in the shade, and children are cooling their hands and feet at the edge of the fountain.' },
    'tech-lt2-1': { file: 'speaking/img/tech-lt2-1.webp', ai: true, pending: true, alt: 'A service robot on wheels is carrying plates of food to a table in a restaurant. A waitress is standing nearby and watching, and the guests, a mixed group of older and younger adults, look surprised.' },
    'food-lt2-1': { file: 'speaking/img/food-lt2-1.webp', ai: true, pending: true, alt: 'A tray in a school canteen with a freshly cooked meal: rice with vegetables, a small salad, an apple and a glass of water.' },
    'food-lt2-2': { file: 'speaking/img/food-lt2-2.webp', ai: true, pending: true, alt: 'A tray in a fast-food restaurant with a burger, a large portion of chips and a soft drink in a paper cup.' },
  },

  /* ─── Phrases ───────────────────────────────────────────── */
  toolkits: {
    longturn: [
      { category: 'Introducing your topic and your plan', items: ['I\'m going to talk about …', 'My topic is …, and I\'d like to focus on …', 'First I\'ll look at the chart, then I\'ll talk about the reasons, and at the end I\'ll give my own view.'] },
      { category: 'Starting from a chart', items: ['The chart shows …', 'According to the chart, …', 'The highest figure is …, and the lowest is …', 'What stands out is that …', 'Compared with …, … is much higher.', 'Between … and … the figure went up from … to …'] },
      { category: 'Starting from a picture', items: ['In the picture I can see …', 'In the foreground there is …, and in the background …', 'The picture was probably taken in …', 'The people look as if they are …', 'The two pictures have one thing in common: …', 'The main difference is that …'] },
      { category: 'Starting from two statements', items: ['The two statements show different views on …', '… says that …, while … thinks that …', 'What they have in common is …'] },
      { category: 'Moving on to the next bullet', items: ['So much for the chart. Let me move on to the reasons.', 'This brings me to my second point.', 'Now I\'d like to move on to my own opinion.'] },
      { category: 'Giving reasons and examples', items: ['One reason is that …', 'This is mainly because …', 'A good example of this is …', 'Take … for example.', 'I know this from my own experience: …'] },
      { category: 'Giving your own view', items: ['In my view, …, because …', 'As far as I\'m concerned, …', 'I\'m convinced that …', 'I\'m not sure that … is the right way.', 'Some people argue that …, but I think …'] },
      { category: 'Being careful with a claim', items: ['It seems to me that …', 'To some extent, …', 'I would say that …', 'This is probably true for …, but not for …'] },
      { category: 'Buying time', items: ['Let me think about that for a second.', 'How shall I put it?', 'What I\'m trying to say is …', 'Let me put it another way.'] },
      { category: 'Finishing', items: ['To sum up, …', 'All in all, …', 'If I had to pick one point, it would be …', 'That is why I think …'] },
    ],
    paired: [
      { category: 'Getting started', items: ['Shall we go through the options one by one?', 'Which of these do you find most useful?', 'Let\'s start with the first one.'] },
      { category: 'Asking your partner', items: ['What do you think about …?', 'How do you feel about …?', 'What\'s your take on that?', 'Do you agree?'] },
      { category: 'Reacting to your partner', items: ['That\'s a good point.', 'I see what you mean.', 'I hadn\'t thought of that.', 'Right, and that would also …'] },
      { category: 'Building on an idea', items: ['That ties in with what you said about …', 'To add to that, …', 'Another advantage would be …'] },
      { category: 'Disagreeing politely', items: ['I see it slightly differently.', 'I get your point, but …', 'I\'m not so sure about that, because …', 'Don\'t you think that …?'] },
      { category: 'Checking that you understand', items: ['So you\'re saying that …, is that right?', 'Sorry, what do you mean by …?', 'Could you explain that again?'] },
      { category: 'Taking and giving the turn', items: ['Could I just add something here?', 'Sorry to interrupt, but …', 'Go ahead.', 'Sorry, you were saying?'] },
      { category: 'Coming to a decision', items: ['We\'ve got about three minutes left. Which two do we go for?', 'So we can rule out …, can\'t we?', 'Shall we agree on …?', 'Let\'s go for these two then.', 'So we\'ve decided on … and …, because …'] },
      { category: 'If you cannot agree', items: ['We don\'t fully agree on this one.', 'Can you live with … as our second choice?', 'Let\'s agree to differ on …, but we both think … should be one of our two.'] },
    ],
  },

  /* ─── Listening back: observable yes/no questions. "Yes" is always the good answer. ─── */
  checks: {
    longturn: [
      { id: 'left', q: 'I moved on to bullet 2 after about one minute (not before 0:45 and not after 1:30).' },
      { id: 'all3', q: 'I talked about all three bullets.' },
      { id: 'example', q: 'I gave at least one concrete example.' },
      { id: 'opinion', q: 'I said what I think and gave a reason.' },
      { id: 'words', q: 'I did not use the same word (for example good, bad, important) more than three times.' },
      { id: 'ending', q: 'I finished with a clear last sentence.' },
      { id: 'time', q: 'I kept talking for at least four and a half minutes.' },
    ],
    paired: [
      { id: 'balance', q: 'We both spoke about the same amount.' },
      { id: 'react', q: 'We reacted to what the other person said.' },
      { id: 'options', q: 'We said something about each of the five options.' },
      { id: 'reasons', q: 'We gave reasons for our opinions.' },
      { id: 'decision', q: 'Before the time was up, we said out loud what we had decided, with reasons.' },
    ],
    /* for the partner who listens during a Long Turn in the mock exam */
    listener: [
      'Did your partner talk about all three bullets?',
      'Did your partner give at least one example?',
      'Did your partner say what they think and why?',
      'Did your partner keep talking without long silences?',
    ],
    bullet3: [
      'I gave my own opinion.',
      'I gave a reason or an example for it.',
    ],
    frames: [
      'In my view, …, because …',
      'If schools / we / the government …, then …',
      'Some people argue that …, but I think … for two reasons.',
      'One thing I would change is … This would …',
    ],
  },

  /* help for the exercise "Write down 30 seconds": typical B2 slips, each with a link into the grammar kit */
  slipTypes: [
    { label: 'Verb tense', hint: 'yesterday I go → yesterday I went' },
    { label: 'Third person -s', hint: 'she think → she thinks' },
    { label: 'Articles', hint: 'the nature → nature' },
    { label: 'Word order', hint: 'I like very much it → I like it very much' },
    { label: 'Prepositions', hint: 'depends from → depends on' },
    { label: 'False friends', hint: 'I became a present → I got a present' },
    { label: 'Repeated words', hint: 'good, bad, a lot, very: try useful, harmful, plenty of, extremely' },
  ],

  /* ─── Explanations (page "speakingguide") ───────────────── */
  guide: {
    checked: '2026-11-15',
    exam: {
      lead: 'In the paired form, two candidates take the oral exam together. Each of you gives a talk on your own. After that, the two of you discuss a task together.',
      steps: [
        { t: 'Topic area for your talk', time: 'before', d: 'You draw two topic areas and choose one of them. Your partner does the same.' },
        { t: 'Preparation', time: 'at least 10 min', d: 'You both prepare at the same time, each for your own talk. No aids are allowed: no dictionary and no phone.' },
        { t: 'Individual Long Turn, candidate 1', time: 'about 5 min', d: 'You speak on your own about a chart, one or two pictures or two statements and work through three bullets. The examiner interrupts as little as possible.' },
        { t: 'Individual Long Turn, candidate 2', time: 'about 5 min', d: 'Your partner gives their talk on their own topic.' },
        { t: 'Topic area for the Paired Activity', time: 'short', d: 'Three topic areas are drawn. The two topic areas of your talks are no longer in the pool. Each of you may cross one out. If you both cross out the same one, the examiner decides.' },
        { t: 'Paired Activity', time: 'about 10 min', d: 'You have a little time to read the task, but no time to prepare. Then you discuss five options with your partner and try to agree on two.' },
      ],
      after: [
        'Both parts count the same.',
        'Each of you gets your own grade, even though you talk together.',
        'Your school publishes the list of topic areas for your class by the end of November. Your teachers write the tasks.',
      ],
      otherForm: 'Not every class uses the paired form. In the standard form you prepare for at least 15 minutes, and after your talk you speak with the examiner instead of a classmate. Your school announces in the first eight weeks of your final year which form your class will have. Ask your teacher.',
      minimum: 'On 7 October 2026 the government announced a minimum threshold of 30 per cent for the oral exam as well as the written one. When it starts and how it is calculated has not been published yet.',
      minimumUrl: 'https://www.bundeskanzleramt.gv.at/bundeskanzleramt/nachrichten-der-bundesregierung/2026/10/proell-wiederkehr-holzleitner-bundesregierung-bringt-reformen-im-bildungsbereich-auf-den-weg.html',
      sources: [
        { label: 'Prüfungsordnung AHS (RIS)', url: 'https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=20007845', lang: 'de' },
        { label: 'Structure of the oral exam in modern languages (BMB, PDF)', url: 'https://www.bmb.gv.at/dam/jcr:653eea73-298c-493b-af9e-47532f04dd16/mrp_lfsp_struktur.pdf', lang: 'de' },
      ],
    },
    prep: {
      lead: 'Ten minutes is not long. Use the time for a plan you can talk from. A written text does not help you: you will not have time to finish it, and reading it out does not sound like natural speech, which is what examiners want to hear.',
      steps: [
        { time: 'Minute 0 to 1', t: 'Read the task', d: 'Read the aspect and the three bullets twice. Look at the chart, the picture or the statements and decide what you will say about them in your first minute.' },
        { time: 'Minute 1 to 7', t: 'Keywords for each bullet', d: 'Write no more than six words for each bullet. Add one example to each bullet: a person, a place, a number, something that happened to you.' },
        { time: 'Minute 7 to 9', t: 'First sentence and bridges', d: 'Decide how you will start and how you will move from one bullet to the next. Two short phrases are enough.' },
        { time: 'Minute 9 to 10', t: 'Last sentence', d: 'Decide on your last sentence now. A talk that ends clearly sounds finished, even if you had to leave something out.' },
      ],
      tips: [
        'Give bullet 1 about one minute. Bullets 2 and 3 are where you can show what you can do with the language.',
        'Keywords, not sentences. If you write full sentences, you will read them out.',
        'If you go blank during your talk, look at your next keyword and start a new sentence.',
      ],
    },
    criteria: {
      lead: 'Your examiners use observation sheets with four criteria. Each one is rated in bands from 0 to 10, and band 6 describes the minimum for B2. The grade itself is decided by the exam board. The descriptions below are written in this site\'s own words. They are not the official wording.',
      items: [
        { name: 'Task achievement', de: 'Erfüllung der Aufgabenstellung', d: 'You deal with all three bullets in your talk, and with the situation and the options in the Paired Activity. What you say fits the task. You develop your points with reasons and examples instead of only listing them, and you use the time you are given.' },
        { name: 'Fluency and interaction', de: 'Flüssigkeit und Interaktion', d: 'You keep talking at a steady pace. Short pauses to think are normal; long silences and many restarts are what examiners notice. In the Paired Activity you react to your partner, ask questions and help the conversation move towards a decision.' },
        { name: 'Range of spoken language', de: 'Spektrum gesprochener Sprache', d: 'You have enough words and structures for the topic and can say things in more than one way. If you can\'t think of a word, you describe what you mean and carry on.' },
        { name: 'Accuracy of spoken language', de: 'Richtigkeit gesprochener Sprache', d: 'Your grammar, your choice of words and your pronunciation are correct enough for listeners to follow you without effort. Mistakes happen at B2. What counts is that they do not get in the way.' },
      ],
      watch: { label: 'Rated sample performances (University of Innsbruck, page in German)', url: 'https://www.uibk.ac.at/en/ifd/languages/ltrgi/resources/speaking-performances/', note: 'Four videos of students in simulated oral exams at B2, with the bands that expert raters gave them (band 7 to band 10) and their reasons. They show what a strong B2 performance sounds like.' },
    },
    why: {
      lead: 'This trainer has no AI in it and gives you no score. That is on purpose.',
      points: [
        { t: 'Your voice stays with you', d: 'Your browser makes the recording on your device. The site has no upload function, so the person who runs the site cannot hear it. If you save a recording as a file, it goes wherever your downloads go. On a shared computer, delete your recordings when you are done.' },
        { t: 'No scores from a machine', d: 'A score from software looks exact, but it does not tell you what your examiners will hear. You listen to yourself and answer questions that examiners also ask themselves. That is slower, and you learn more from it.' },
        { t: 'The exam has no AI either', d: 'In the exam there are you, your partner, the examiners, a task and a clock. The trainer adds only a recorder, so that you can listen to yourself.' },
      ],
    },
  },

  /* ─── Model transcripts: tasks that are NOT in the practice pool ───
     Level: a solid B2 candidate, not a native speaker. */
  models: {
    longturn: {
      topic: 'Travel and Tourism', aspect: 'Holidays near and far',
      intro: 'Give a five-minute talk on the topic of travel and tourism in which you',
      bullets: ['summarise what the two people say in their statements', 'outline some of the reasons why travelling abroad is so popular with young people', 'give your own opinion on whether people should fly less, supporting it with examples'],
      statements: [
        { who: 'Mia, 17 (invented)', text: 'Why fly for hours? Last summer I went hiking in the mountains with my friends, and it was the best holiday I\'ve ever had.' },
        { who: 'Jonas, 18 (invented)', text: 'I want to see the world while I\'m young. You don\'t learn much about other cultures in your own country.' },
      ],
      moves: [
        { label: 'Opening', note: 'Topic and plan in two sentences. The listener knows what is coming.', text: 'My topic is travel and tourism, and I\'m going to talk about holidays near and far. First I\'ll look at the two statements, then I\'ll talk about why so many young people want to travel abroad, and at the end I\'ll tell you what I think about flying.' },
        { label: 'Bullet 1', note: 'Reports both statements in her own words and sums up the contrast in one sentence. About one minute.', text: 'So, the two statements. Mia and Jonas have quite different ideas about holidays. Mia says you don\'t need to fly for hours to have a good time. She went hiking in the mountains with her friends last summer, and for her it was the best holiday ever. Jonas sees it the other way round. He wants to see the world while he is young, and he thinks you can\'t learn much about other cultures if you stay in your own country. So one of them is happy close to home, and the other one wants to go as far away as possible.' },
        { label: 'Bridge', note: 'One sentence that leads to the next bullet.', text: 'That brings me to my second point: why is travelling abroad so popular with people my age?' },
        { label: 'Bullet 2', note: 'Three numbered reasons (first, second, third), each with a concrete example (her cousin in Japan, a friend\'s trip to Lisbon, a cheap flight to Barcelona), and one extra point at the end.', text: 'I think there are three main reasons. The first one is simply curiosity. When you grow up in a small country like Austria, you want to know what life is like somewhere else: the food, the language, the way people live. My cousin, for example, spent three weeks in Japan last summer, and she still talks about how different everything was, from the trains to the way people say hello. The second reason is social media. Every day we see pictures of beaches in Thailand or streets in New York, and of course you start to think, I want to go there too. A friend of mine booked a trip to Lisbon only because she had seen so many videos about it. And the third reason is the price. Flights have become very cheap. Sometimes a flight to Barcelona costs less than a train ticket to the other end of Austria, which is a bit crazy if you think about it. And, well, there is one more thing. After the Matura many people want a break before they start university or a job, so they travel for a few weeks or even months.' },
        { label: 'Bridge', note: 'Announces the opinion part and repeats the question from the task.', text: 'Now let me come to the last point, my own opinion. Should people fly less?' },
        { label: 'Bullet 3', note: 'A clear answer, a reason, the other side, her own experience and three concrete proposals. This is the longest part of the talk.', text: 'In my view, yes, they should, but I wouldn\'t ban flying. Flying is one of the worst things one person can do to the climate, and many flights are only for short holidays. On the other hand, I understand Jonas. You really learn something when you travel. Two years ago I spent two weeks with a host family in Ireland, and I spoke more English there than in a whole year at school. So for me the answer is somewhere in the middle. For short trips in Europe we should take the train. Of course, the train is not always easy. It often takes longer, and if you don\'t book early, it can be more expensive. But if you count the time you spend getting to the airport and waiting there, the difference is often smaller than people think. From Austria you can reach Italy, Germany or Hungary in a few hours, and with a night train you even save a night in a hotel. And if you fly far away, then you should stay longer and not go to another continent for only one week. I also think governments should make train tickets cheaper and flights more expensive. At the moment flying is often cheaper than the train, and most people just go for the cheapest option.' },
        { label: 'Ending', note: 'Sums up in two sentences and ends on one clear point.', text: 'To sum up, Mia and Jonas are both right in a way. Travelling teaches you a lot, but we can\'t go on flying like this. If I had to pick one point, it would be this: go by train when you can, and only fly when it\'s really worth it.' },
      ],
      notice: [
        'She leaves the statements after about a minute and spends most of her time on bullets 2 and 3.',
        'Her reasons come with examples: a cousin, a friend, a price. In the opinion part she adds her own stay in Ireland.',
        'Her opinion is clear, and she also shows that she understands the other side.',
        'The language is solid B2 and sounds spoken: "a bit crazy", "and, well", some short, simple sentences.',
      ],
    },
    paired: {
      topic: 'Free Time', aspect: 'More for teenagers in our town',
      scenario: 'Your town wants to offer teenagers more to do in their free time. The council has money for two projects and has asked young people for their opinion.',
      options: ['opening a youth café', 'building a skate park', 'giving teenagers free entry to the swimming pool', 'setting up a rehearsal room for bands', 'opening the school gym for sport in the evening'],
      closing: 'Try to agree on two.',
      turns: [
        { who: 'A', label: 'Organising the talk', text: 'OK, shall we go through the options one by one first and then decide?' },
        { who: 'B', label: 'Asking your partner', text: 'Yes, good idea. Let\'s start with the youth café. What do you think about it?' },
        { who: 'A', label: 'Opinion with a reason', text: 'I like it, to be honest. At the moment there is no place where we can just sit and talk without spending much money. In winter that\'s a real problem.' },
        { who: 'B', label: 'Agreeing and adding', text: 'That\'s true. And a café could be used for other things as well, for example concerts or game nights. So it\'s more than one project, in a way.' },
        { who: 'A', label: 'Reacting, then moving on', text: 'I hadn\'t thought of that. What about the skate park?' },
        { who: 'B', label: 'Disagreeing politely', text: 'Hmm, I\'m not so sure about that one. It\'s great for people who skate, but that\'s a small group. And nobody can use it when it rains.' },
        { who: 'A', label: 'Answering with a question', text: 'I get your point, but don\'t you think a skate park gets people out of the house? Many of us sit in front of a screen all day.' },
        { who: 'B', label: 'Comparing two options', text: 'Fair enough, but sport in the school gym would do the same, and for more people. The gym is already there, so it would be cheap as well.' },
        { who: 'A', label: 'Checking that you understand', text: 'So you\'re saying the gym is the better choice for sport, is that right?' },
        { who: 'B', label: 'Confirming', text: 'Exactly.' },
        { cut: 'They discuss the swimming pool and the rehearsal room in the same way.' },
        { who: 'A', label: 'Watching the time', text: 'We\'ve got about two minutes left. Which two do we go for?' },
        { who: 'B', label: 'Making a proposal', text: 'For me the café is a must. Do you agree?' },
        { who: 'A', label: 'Proposing and checking', text: 'Yes, definitely. And for the second one I\'d go for the gym, because it\'s cheap and it\'s for everybody. Can you live with that, even without the rehearsal room?' },
        { who: 'B', label: 'Giving way, with a reason', text: 'I\'d still like the rehearsal room, but I can see that fewer people would use it. OK, let\'s go for the café and the gym.' },
        { who: 'A', label: 'Stating the decision', text: 'Great. So we\'ve decided on the youth café, because it gives us a place to meet all year round, and on sport in the school gym, because it\'s cheap and open to everyone.' },
      ],
      notice: [
        'They agree at the start on how to work through the task.',
        'Nearly every turn picks up what the partner has just said.',
        'They disagree about the skate park and stay polite.',
        'One of them watches the time, and they say their decision out loud, with reasons.',
      ],
    },
  },
};
