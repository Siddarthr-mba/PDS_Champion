import type { Module } from '@/types/content';

export const productSenseModule: Module = {
  slug: 'product-sense',
  title: 'Product Sense',
  description:
    'Learn to think like a PM — diagnose metric drops, design features, evaluate trade-offs, and tell compelling stories with data.',
  icon: 'Lightbulb',
  introduction: {
    overview:
      'Product sense questions test your ability to think holistically about a product — understanding user needs, business goals, and data signals together. You are expected to diagnose problems, prioritise features, and communicate recommendations clearly to stakeholders who may not be data experts.',
    whyItMatters:
      'Product sense is tested in virtually every DS role at a consumer tech company. Interviewers want to see that you can go beyond analysis to drive product decisions. Strong product sense separates candidates who can "do the analysis" from those who can change what the product does.',
    whatYoullLearn: [
      'Structure a metric deep-dive using a systematic framework',
      'Diagnose a metric drop across internal and external causes',
      'Evaluate feature ideas against user needs and business impact',
      'Design a metric framework (north star, supporting, guardrail)',
      'Communicate trade-offs clearly to non-technical audiences',
      'Apply the AARRR and HEART frameworks to real product problems',
    ],
  },
  coreConcepts: {
    concepts: [
      {
        heading: 'The metric deep-dive framework',
        body: 'When a metric moves unexpectedly, work through: (1) Confirm the data is correct, (2) Check if the change is global or segmented, (3) Separate internal causes (feature launch, bug, experiment) from external causes (competitor, seasonality, news), (4) Identify the mechanism — is it supply, demand, or conversion?, (5) Recommend next steps.',
        callout: 'Always start by confirming the data is correct before drawing conclusions. A logging bug causes more false alarms than any product issue.',
      },
      {
        heading: 'North star metric',
        body: 'The north star metric (NSM) captures the core value a product delivers to users — it should correlate with long-term business success. Examples: Spotify → monthly active streamers, Airbnb → nights booked, Slack → messages sent per DAU. The NSM guides prioritisation and is the primary metric in most experiments.',
        callout: 'A good NSM is measurable, actionable, and not easily gameable. Avoid vanity metrics like total registrations.',
      },
      {
        heading: 'AARRR funnel (Pirate Metrics)',
        body: 'Dave McClure\'s framework structures user lifecycle into: Acquisition (how users find you), Activation (first value moment), Retention (do they come back?), Revenue (do they pay?), Referral (do they tell others?). Each stage has distinct metrics and levers. Knowing where the funnel leaks directs where to invest.',
      },
      {
        heading: 'HEART framework',
        body: 'Google\'s HEART framework structures UX metrics: Happiness (satisfaction scores), Engagement (frequency/depth of use), Adoption (new users trying a feature), Retention (returning users), Task success (completion rate, error rate). Pair each HEART category with a goal, signal, and metric.',
      },
      {
        heading: 'Trade-off thinking',
        body: 'Every product decision involves trade-offs. Common axes: short-term revenue vs. long-term retention, growth vs. monetisation, personalisation vs. privacy, speed vs. quality. Interviewers want to see you surface the trade-off explicitly, quantify the impact where possible, and recommend based on the company\'s current strategic priority.',
      },
      {
        heading: 'Counter-metrics and guardrails',
        body: 'Optimising a single metric often harms another. Guardrail metrics are chosen to detect regressions you must not cause. For example, optimising for engagement could harm user wellbeing — add a session length guardrail. Always pair a primary metric with at least one counter-metric.',
      },
    ],
  },
  workedExamples: {
    examples: [
      {
        title: 'Instagram stories views dropped 10% week-over-week',
        context: 'You are a DS at Instagram. Your PM flags that stories views are down 10% vs. last week. Walk through your investigation.',
        steps: [
          'Verify the data: check for logging errors, instrumentation changes, or timezone issues that could cause a spurious drop.',
          'Check if the drop is global or segmented: is it all users, a specific platform (iOS/Android/web), a geo, or a user cohort? Segment by platform, geography, new vs. returning users, and account age.',
          'Check for internal causes: was there a recent product change, A/B test assignment shift, or infrastructure issue in the past 7 days? Pull the deployment log.',
          'Check for external causes: are there competitor launches (e.g. TikTok feature update), holidays, news events, or App Store changes that could explain reduced usage?',
          'Identify the mechanism: is reach down (fewer stories posted by creators)? Is consumption down (fewer views per story)? Is session frequency down? Each mechanism implies a different fix.',
          'Formulate a hypothesis and next steps: if creator posting is down, investigate what changed for creators. If consumption is down, look at the feed algorithm, stories placement, or notification changes.',
        ],
        answer:
          'A structured root-cause analysis: data quality → segmentation → internal causes → external causes → mechanism → recommendation. This demonstrates rigour and prevents jumping to incorrect conclusions.',
        tags: ['Metric drop', 'Root cause', 'Segmentation'],
      },
      {
        title: 'Designing success metrics for a new Spotify podcast feature',
        context: 'Spotify is launching a new "Podcast Clips" feature — short 60-second audio clips from podcasts surfaced in the home feed. Design a metric framework to evaluate its success.',
        steps: [
          'Clarify the goal: is this primarily for podcast discovery, retention, or engagement? Assume the goal is to increase podcast listener hours (connects to revenue and advertiser value).',
          'Define the north star: incremental podcast listener hours attributable to the Clips feature.',
          'Add activation metrics: clip play rate (clips played / clips shown), clip completion rate (listened > 50%), podcast follow rate from clips.',
          'Add retention metrics: do users who engaged with a clip return to full podcasts within 7 days? 30-day podcast retention for clip-engaged users vs. control.',
          'Add guardrail metrics: music listening hours (ensure clips don\'t cannibalise music), home feed skip rate (ensure clips don\'t degrade feed quality), session length for users who only see clips.',
          'Add a counter-metric for creator satisfaction: do podcasters see more followers and streams from clip-exposed audiences?',
        ],
        answer:
          'A layered metric framework: north star (podcast hours) + activation (clip play/complete/follow rates) + retention (7-day podcast return) + guardrails (music hours, feed quality). This shows you think about the full user journey and business impact, not just feature-level vanity metrics.',
        tags: ['Metric design', 'North star', 'Guardrails'],
      },
      {
        title: 'Prioritising three feature ideas for LinkedIn',
        context: 'LinkedIn is considering: (A) AI resume suggestions, (B) Job application tracking dashboard, (C) Salary benchmarking for job seekers. You have resources for one. How do you prioritise?',
        steps: [
          'Clarify the strategic goal: LinkedIn\'s revenue comes primarily from Talent Solutions (recruiter subscriptions) and Premium (job seeker subscriptions). Features that increase Premium conversion or job seeker success reinforce both sides of the marketplace.',
          'Estimate reach: how many users would each feature affect? AI resume suggestions affect all Premium users actively job seeking. Application tracking affects active job seekers only. Salary benchmarking has broader appeal including passive candidates.',
          'Estimate impact: which feature most directly moves Premium conversion, retention, or job placement rate — LinkedIn\'s ultimate north star for job seekers?',
          'Estimate effort: AI features tend to be high effort. A tracking dashboard is moderate. Salary benchmarking requires data partnerships and validation.',
          'Apply the RICE framework: (Reach × Impact × Confidence) / Effort. Salary benchmarking likely wins — high reach, clear value, moderate effort, builds a unique data moat.',
          'Consider risks: salary benchmarking may create friction with enterprise customers (recruiters) who prefer information asymmetry. Flag this trade-off explicitly.',
        ],
        answer:
          'Salary benchmarking — highest RICE score plus strategic differentiation. However, flag the recruiter friction risk and suggest a phased rollout with guardrails on recruiter satisfaction. This answer shows structured prioritisation, not just intuition.',
        tags: ['Prioritisation', 'RICE', 'Trade-offs'],
      },
    ],
  },
  interviewExamples: {
    scenarios: [
      {
        title: 'How would you measure the success of Facebook Marketplace?',
        context: 'You\'re the DS for Facebook Marketplace. What metrics would you use to evaluate its health?',
        steps: [
          'Clarify the goal: is this about health monitoring (ongoing), post-launch evaluation, or a specific feature? Assume ongoing health.',
          'Define the funnel: Awareness → Browse → List item → Contact seller → Complete transaction.',
          'Choose a north star: GMV (gross merchandise value) or number of successful transactions — both reflect real value exchange.',
          'Add supporting metrics: listing creation rate, contact-to-transaction rate, time-to-sale, repeat buyer rate, repeat seller rate.',
          'Add guardrail metrics: spam/fraud rate, unresolved dispute rate, user complaint rate, response time (seller to buyer).',
          'Segment by category (electronics vs. furniture vs. clothing) since each has different velocity and fraud risk.',
        ],
        answer:
          'Funnel-based metric design covering north star (GMV / transactions), supporting metrics (listing rate, conversion, repeat use), guardrails (fraud, disputes), and segmentation. Interviewers reward candidates who connect metrics back to the business goal and think about data quality signals.',
        tags: ['Metric design', 'North star', 'Funnel'],
      },
      {
        title: 'Spotify\'s weekly active listeners dropped 8% last Monday',
        context: 'You wake up to a Slack alert: WAL is down 8% vs. the same Monday last week. Your VP wants an explanation in 2 hours. What do you do?',
        steps: [
          'First 10 minutes — data quality: check if the logging pipeline had any failures, delays, or schema changes. An 8% drop on a specific day is a common symptom of a data issue, not always a product issue.',
          'Next — segment: is the drop on iOS, Android, web, or all platforms? Is it in a specific geography? Is it new users, returning users, or both? A geo-specific drop may indicate a connectivity or App Store issue.',
          'Check the deployment log: did any feature ship on Friday or over the weekend? Did an A/B test change its allocation?',
          'Check external signals: was there a public holiday in a major market (US, Germany, Sweden)? Did a major competitor launch something?',
          'Quantify: 8% of WAL. At Spotify\'s scale, that is millions of users. Even a 1% logging error could explain it. Calculate the absolute number to calibrate urgency.',
          'Draft a structured update: "We observed an 8% WAL drop. We have ruled out data logging issues. The drop is concentrated on Android in [market]. It correlates with a push notification change shipped on Saturday. We are investigating further and expect root cause confirmation by [time]."',
        ],
        answer:
          'This answer scores highly because it demonstrates calmness under pressure, data-first thinking, systematic segmentation, and clear communication structure. Interviewers at Spotify and similar companies run this exact scenario to test crisis response.',
        tags: ['Metric drop', 'Communication', 'Crisis response'],
      },
      {
        title: 'Should Instagram add a "dislike" button?',
        context: 'A PM proposes adding a dislike button to Instagram Reels. As the DS, how do you evaluate this?',
        steps: [
          'Clarify the proposed goal: is this for content quality signals (improve recommendation), creator feedback, or user expression?',
          'Identify user benefits: viewers get to express negative sentiment; the algorithm gets a stronger signal for "don\'t show me this."',
          'Identify risks: creator backlash (dislikes are psychologically harmful and could reduce posting), potential for coordinated harassment, and the "YouTube problem" where dislikes become a pile-on tool.',
          'Consider alternatives: a "not interested" button provides algorithmic signal without public shaming. Long-press feedback (already exists on some platforms) is less visible.',
          'Define a measurement plan: if tested, primary metric = recommendation quality (reduced skip rate, increased watch time). Guardrails = creator posting frequency, mental health signals (if available), harassment reports.',
          'Recommendation: I would not ship a visible dislike count. I would test a private "not interested" signal and measure algorithm quality lift vs. a "dislike" variant.',
        ],
        answer:
          'This answer demonstrates product thinking beyond the data: you surface user psychology, creator ecosystem health, and competitive precedent (YouTube), then propose a data-driven way to test the underlying goal without the downside. Interviewers want to see you push back on the premise when appropriate.',
        tags: ['Feature evaluation', 'Trade-offs', 'Experiment design'],
      },
    ],
  },
  practiceQuestions: {
    questions: [
      {
        id: 'ps-q1',
        question: 'Spotify\'s weekly active listeners dropped 8% last Monday. Walk through how you\'d investigate.',
        hint: 'Start with data quality before exploring causes. Structure your answer as: data → segmentation → internal → external → mechanism.',
        answer: 'Follow the metric deep-dive framework: (1) Verify data integrity (logging, pipeline), (2) Segment by platform/geo/cohort to isolate the scope, (3) Check internal causes (recent releases, experiments), (4) Check external causes (competitor, public holiday), (5) Identify mechanism (is it reach, session frequency, or session length?).',
        difficulty: 'medium',
        tags: ['Metric drop', 'Root cause'],
      },
      {
        id: 'ps-q2',
        question: 'Design a north star metric and metric framework for Duolingo.',
        hint: 'Think about what "success" means for a language learning app. Is it learning outcomes, engagement, or something else?',
        answer: 'North star: Daily Active Learners (users who complete at least one lesson per day) — captures the habit formation that drives retention and eventual subscription. Supporting metrics: lesson completion rate, streak length, XP earned per session. Guardrails: lesson skip rate (don\'t gamify at the expense of learning), subscription cancellation rate. Counter: self-reported learning progress surveys.',
        difficulty: 'medium',
        tags: ['Metric design', 'North star'],
      },
      {
        id: 'ps-q3',
        question: 'LinkedIn\'s "People You May Know" (PYMK) feature has high connection request volume but low acceptance rates. What would you investigate and how might you improve it?',
        hint: 'High volume + low acceptance suggests relevance is low. Think about the signals used for recommendation and what "good" looks like.',
        answer: 'Investigate: (1) Segment acceptance rate by relationship type — mutual connections, same company, same school, etc. (2) Check if low-quality signals (e.g. phone contacts) are dominating recommendations. (3) Analyse user feedback on rejected suggestions. Improvements: weight mutual connections and shared context more heavily, add "how you know them" context below suggestions, reduce volume per session to prioritise quality. Measure: acceptance rate, connection-to-message rate (are accepted connections valuable?), long-term network value of new connections.',
        difficulty: 'hard',
        tags: ['Recommendation', 'Product improvement'],
      },
      {
        id: 'ps-q4',
        question: 'What is a guardrail metric? Give an example of a primary metric and its guardrail for an e-commerce checkout optimisation experiment.',
        hint: 'A guardrail metric catches regressions you must not cause, even if the primary metric improves.',
        answer: 'A guardrail metric is a metric you monitor to ensure a product change doesn\'t cause unacceptable harm to another dimension of the product. Example: Primary metric = checkout conversion rate (% of cart views that become purchases). Guardrail metrics = (1) average order value (a conversion lift from showing only cheap items would be misleading), (2) return rate (higher conversion could come from misleading product descriptions), (3) customer support contacts (faster checkout shouldn\'t increase confusion).',
        difficulty: 'easy',
        tags: ['Guardrail metrics', 'Experimentation'],
      },
      {
        id: 'ps-q5',
        question: 'TikTok\'s time-spent metric is growing, but user satisfaction surveys are declining. How do you reconcile this and what would you recommend?',
        hint: 'This is a classic engagement vs. wellbeing tension. Think about what each metric is actually measuring.',
        answer: 'Time-spent and satisfaction can diverge when content is addictive but not meaningful — often called the "passive scroll" problem. Investigation: segment time-spent by content type (passive scroll vs. intentional search vs. social interaction) and correlate each with satisfaction scores. If passive scroll time is growing but interactive/intentional usage is flat, the algorithm may be optimising for short-term engagement at the cost of long-term user value. Recommendation: introduce a "meaningful engagement" composite metric (comments, shares, saves weighted higher than passive views) as a secondary optimisation target alongside time-spent.',
        difficulty: 'hard',
        tags: ['Engagement', 'Wellbeing', 'Metric conflict'],
      },
    ],
  },
};
