/* ════════════════════════════════════════════════════════════
   Content Data (Part 3: practice, exam day, drag & drop)
   ════════════════════════════════════════════════════════════ */

/* ─── SPOT THE MISTAKES ────────────────────────────────────── */
SRDP.spotTexts = [
  { id: 'textA', title: 'Text A — "Essay" by a student',
    text: `Hey guys! So there's been a lot of talk about banning phones in schools lately. I think it's a terrible idea and here's why.

When my school tried a phone ban last year, I was so annoyed. I couldn't text my mum when I needed to, and honestly, it made me feel anxious. My best friend Lea had the same problem – she told me she felt "cut off from the world".

Also, phones can be really useful for learning. There's loads of apps that help with languages and maths. So why would you take that away?

To sum up, phone bans are dumb. Schools should trust students more!!!`,
    errors: [
      { mark: '"Hey guys!"', fix: 'Colloquial greeting. Essays are formal. No direct address.' },
      { mark: "Contractions (there's, here's, it's, couldn't)", fix: 'Not allowed in formal essays.' },
      { mark: 'Personal anecdote ("When my school tried…")', fix: 'Essays use general/hypothetical examples, not personal stories.' },
      { mark: '"loads of apps"', fix: 'Colloquial. Use: "a large number of applications".' },
      { mark: '"phone bans are dumb"', fix: 'Slang/emotive. Use: "banning phones is unlikely to be effective".' },
      { mark: '"!!!"', fix: 'Exclamation marks are inappropriate in formal essays.' },
      { mark: 'No title', fix: 'Essays require a title.' },
    ],
    verdict: 'This reads like a blog post. Wrong register throughout.' },
  { id: 'textB', title: 'Text B — "Report" by a student',
    text: `To: The Principal
From: Student Council
Subject: Canteen Food

Dear Sir, I am writing to tell you about what students think about our canteen food. I personally believe the food is terrible and many of my friends agree. The pizza is always cold and the salad looks disgusting.

Another thing that really annoys me is the prices. Everything has become so expensive lately! A simple sandwich costs almost 4 euros, which is outrageous.

In conclusion, our canteen needs a complete makeover. The school should fire the catering company and find a new one.`,
    errors: [
      { mark: 'Missing Date in header', fix: 'Reports require Date, From, and Subject.' },
      { mark: '"Dear Sir,"', fix: "Reports don't have greetings. That's for emails/letters." },
      { mark: 'No section headings', fix: 'Every report section needs a clear heading.' },
      { mark: '"I personally believe", "really annoys me"', fix: 'Reports present objective findings. Use data: "72% of respondents rated the food quality as poor".' },
      { mark: '"disgusting", "outrageous"', fix: 'Emotional language. Reports are neutral.' },
      { mark: '"fire the catering company"', fix: 'Too aggressive. Use: "It would be advisable to review the current catering contract."' },
    ],
    verdict: 'This reads like a personal complaint letter, not a report.' },
  { id: 'textC', title: 'Text C — "Letter to the Editor" by a student',
    text: `To: editor@dailynews.example
From: mike99@email.example
Date: 5 March 2026
Subject: Your article about school uniforms

Hi there,

I read your article about school uniforms and I think you're totally wrong. Uniforms are great because everyone looks the same and nobody gets bullied for wearing cheap clothes.

That's basically it. Hope you'll print my letter.

Cheers,
Mike`,
    errors: [
      { mark: '"Hi there"', fix: 'Too informal. Use: "Dear Sir or Madam," or "Dear Editor,".' },
      { mark: "Contractions (you're, that's)", fix: 'Not appropriate in formal letters to the editor.' },
      { mark: 'No article reference', fix: 'Must state the article title, publication, and date.' },
      { mark: '"totally wrong"', fix: 'Too blunt. Use: "I am afraid I must respectfully disagree."' },
      { mark: 'Only one argument', fix: 'The task gives 3 bullet points; each needs a full paragraph.' },
      { mark: '"Cheers,"', fix: 'Informal sign-off. Must be: "Yours faithfully,".' },
      { mark: 'First name only ("Mike")', fix: 'Must give full name and town/city.' },
    ],
    verdict: 'Wrong register, missing structural elements.' },
  { id: 'textD', title: 'Text D — "Blog comment" by a student',
    text: `The Question of Remote Learning

It is widely acknowledged that remote learning has become a significant phenomenon in contemporary education. This comment will examine the advantages and disadvantages of this development.

Firstly, it must be noted that remote learning offers considerable flexibility. Furthermore, empirical studies have demonstrated that some students achieve superior results in domestic environments.

Taking these points into consideration, it can be concluded that remote learning constitutes a valuable addition to traditional schooling.

Yours faithfully,
Thomas Maier`,
    errors: [
      { mark: 'A title ("The Question of Remote Learning")', fix: "Blog comments have no title — that's for blog posts." },
      { mark: 'No reference to the original post', fix: 'A comment MUST open by referencing the post: "Hi Sarah, I just read your post on remote learning…"' },
      { mark: '"It is widely acknowledged that…", "empirical studies have demonstrated"', fix: 'Academic essay language. Comments are personal and conversational.' },
      { mark: '"This comment will examine…"', fix: 'Announcing your structure is essay style — and even there it is weak.' },
      { mark: 'No personal experience or voice', fix: 'Blogs live on personality: "When my school went remote, I…"' },
      { mark: '"Yours faithfully," + full name', fix: "Comments don't have a formal sign-off. A username is enough." },
    ],
    verdict: 'A five-paragraph essay in disguise. Wrong genre from the first line.' },
  { id: 'textE', title: 'Text E — "E-mail of application" by a student',
    text: `To: jobs@sportcamp.example
From: partyking2008@email.example
Date: 2 May 2026
Subject: job

Hey!

I saw you're looking for people for your summer camp. I really need the money because I want to buy a scooter, so I'm writing to you. I'm pretty good with kids I guess, my little brother is okay with me.

I can't work Mondays btw.

See ya,
Felix`,
    errors: [
      { mark: '"partyking2008@email.example"', fix: 'Unprofessional address — use a neutral one (firstname.lastname@…).' },
      { mark: 'Subject: "job"', fix: 'Too vague. Name the position: "Application for Summer Camp Counsellor".' },
      { mark: '"Hey!"', fix: 'Formal greeting required: "Dear Sir or Madam," or the name from the ad.' },
      { mark: '"I really need the money because I want to buy a scooter"', fix: 'Focus on what you offer, not what you want to gain.' },
      { mark: '"I\'m pretty good with kids I guess"', fix: 'Sell yourself professionally: "I have experience looking after children and…"' },
      { mark: 'Contractions + "btw" + "See ya,"', fix: 'No contractions, no chat abbreviations. Sign off: "Yours faithfully, Felix [surname]".' },
      { mark: 'No qualifications, no availability for interview', fix: 'Applications need concrete skills/experience and a closing offer ("I am available for an interview…").' },
    ],
    verdict: 'Friendly chat message, not an application. The register alone would sink it.' },
];

/* ─── REGISTER GYM ─────────────────────────────────────────── */
SRDP.registerGym = [
  { informal: "So, I just heard about these new changes and honestly? I'm not happy.", formal: 'I am writing to express my concern about the proposed changes.', hint: 'Complaint / e-mail opener' },
  { informal: 'We all know that social media can mess with your head.', formal: 'It is widely acknowledged that social media can have a negative impact on mental health.', hint: 'Essay-style generalisation' },
  { informal: "Plus, loads of people in the survey said they weren't happy either.", formal: 'Furthermore, the data suggests that a significant proportion of respondents were dissatisfied.', hint: 'Report language' },
  { informal: 'Honestly, the school should just change this. What do you guys think?', formal: 'I would therefore recommend that the school administration reconsider this policy.', hint: 'Recommendation' },
  { informal: 'Let me know what you think in the comments!', formal: 'I look forward to hearing from you at your earliest convenience.', hint: 'Closing formula' },
  { informal: "The hotel room was gross and the staff couldn't care less.", formal: 'The room was not up to the standard advertised, and the staff appeared unwilling to address our concerns.', hint: 'Complaint body' },
  { informal: "You guys should totally hire me, I'm great with kids.", formal: 'I believe I am well suited to this position, as I have considerable experience working with children.', hint: 'Application' },
  { informal: "Anyway, that's why I think it's a bad idea.", formal: 'Taking these points into consideration, this proposal appears unlikely to succeed.', hint: 'Conclusion' },
];

/* ─── DRAG & DROP SETS ─────────────────────────────────────── */
SRDP.dndSets = {
  essay: [
    { text: 'There is no doubt that climate change poses one of the greatest challenges of our time.', role: 'Introduction / thesis' },
    { text: 'To begin with, the environmental consequences of rising temperatures are already visible.', role: 'Topic sentence (paragraph 1)' },
    { text: 'A recent study by NASA confirms that global temperatures have risen by 1.1°C since 1880.', role: 'Evidence / example' },
    { text: 'Furthermore, the economic cost of inaction far outweighs the cost of prevention.', role: 'Second argument' },
    { text: 'Taking these points into consideration, it is clear that we must act now.', role: 'Conclusion' },
  ],
  article: [
    { text: 'Have you ever tried going a whole week without your phone?', role: 'Opening hook — rhetorical question' },
    { text: 'The most surprising result was how much more time we all suddenly had.', role: 'Topic sentence' },
    { text: '"I never thought I\'d miss it so much," one classmate admitted.', role: 'Direct speech' },
    { text: 'However, by day three, most of us had started to feel surprisingly peaceful.', role: 'Contrasting sentence' },
    { text: "So, could you do it? I'd love to hear your thoughts in the comments below.", role: 'Conclusion — leaves reader thinking' },
  ],
  report: [
    { text: 'The aim of this report is to present the findings of a survey on student wellbeing.', role: 'Introduction — states purpose' },
    { text: 'Key Findings', role: 'Section heading' },
    { text: 'The majority of respondents (68%) reported feeling stressed before exams.', role: 'Data presentation' },
    { text: 'Furthermore, 43% stated that they were unaware of available support services.', role: 'Additional finding' },
    { text: 'On the basis of these findings, I would recommend introducing regular wellbeing check-ins.', role: 'Recommendation' },
  ],
  blog: [
    { text: "OK, so here's something I never thought I'd say: I deleted Instagram. For a whole month.", role: 'Personal opening hook' },
    { text: 'The first three days were honestly awful. I kept reaching for my phone out of habit.', role: 'First body paragraph' },
    { text: 'But then something weird happened — I started sleeping better and feeling less anxious.', role: 'Turning point' },
    { text: 'By the end of the month, I had read two books and started going for evening walks.', role: 'Positive outcome' },
    { text: 'So, what do you think? Have you ever tried a digital detox? Let me know below!', role: 'Conclusion — invites comments' },
  ],
  email: [
    { text: 'To: info@hotel-vienna.example | Subject: Complaint regarding stay on 5 April', role: 'E-mail header' },
    { text: 'I am writing to express my dissatisfaction with the service I received during my recent stay.', role: 'Opening — states purpose' },
    { text: 'To begin with, the room had not been cleaned prior to my arrival, which was unacceptable.', role: 'First complaint point' },
    { text: 'Furthermore, despite requesting a non-smoking room, I was placed in a room that smelled of smoke.', role: 'Second complaint point' },
    { text: 'I would therefore like to request a partial refund.\n\nYours faithfully,\nMax Huber', role: 'Demand + sign-off' },
  ],
  leaflet: [
    { text: 'Skate Jam – Roll Up to the Biggest Session of the Year', role: 'Main title – names the event and makes people want to read on' },
    { text: 'Grab your board and head to the Seetal skate park this summer. One day, three ramps, live music and prizes for every ability.', role: 'Hook / intro – grabs attention and says what it is about' },
    { text: 'Ride the New Ramps\nOur brand-new mini-ramp and rebuilt half-pipe are ready for you, whether you are landing your first ollie or your fiftieth kickflip.', role: 'Information section 1 – a benefit under its own subheading' },
    { text: 'More Than Just Skating\nGrab a burger from the food stall, cool off with free water, and enter our best-trick contest to win real skate gear.', role: 'Information section 2 – a second benefit block, scannable' },
    { text: 'Get Involved\nEntry is free and open to all ages – just bring a helmet.\nWhen: Saturday, 11 July, from 11 a.m.\nWhere: Seetal Skate Park, Uferweg 3', role: 'Call to action + practical details – what to do and the facts' },
  ],
};

/* ─── AI FEEDBACK PROMPT TEMPLATE ──────────────────────────── */
SRDP.aiPromptTemplate = (typeName, length, task, text) => `You are an experienced Austrian English teacher assessing a practice text for the standardised written Reife- und Diplomprüfung (SRDP), English B2, text type: ${typeName}, target length: about ${length} words.

THE TASK THE STUDENT WAS GIVEN:
${task || '(no task provided — assess the text on text-type conventions alone)'}

THE STUDENT'S TEXT:
"""
${text}
"""

Please assess the text using the four official SRDP criteria, each on a 0–10 scale:
1. Task Achievement (Erfüllung der Aufgabenstellung) — content points covered? text type conventions (layout, title/greeting/sign-off, register)? length?
2. Coherence & Cohesion — structure, paragraphing, linking devices
3. Lexical & Structural Range — variety of vocabulary and structures, complex forms, no lifting from the prompt
4. Lexical & Structural Accuracy — grammar, word choice, spelling, punctuation

Format your answer like this:
- A score (x/10) for each criterion with a 2–3 sentence justification
- The 5 most important errors as a table: quote → correction → one-line explanation
- Three concrete things to do differently next time
- One thing the student already does well

Be honest but encouraging. Do not rewrite the whole text.`;
