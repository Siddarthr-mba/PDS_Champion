import type { Module } from '@/types/content';

export const productSenseModule: Module = {
  slug: 'product-sense',
  title: 'Product Sense',
  description:
    'Learn to think like a PM — diagnose metric drops, design features, evaluate trade-offs, and tell compelling stories with data.',
  icon: 'Lightbulb',
  introduction: {
    overview:
      'Product sense questions test your ability to think holistically about a product — understanding user needs, business goals, and data signals together. You are expected to diagnose problems, prioritise features, and communicate recommendations clearly.',
    whyItMatters:
      'Product sense is tested in virtually every DS role at a consumer tech company. Interviewers want to see that you can go beyond analysis to drive product decisions.',
    whatYoullLearn: [
      'Structure a metric deep-dive using a systematic framework',
      'Diagnose a metric drop across internal and external causes',
      'Evaluate feature ideas against user needs and business impact',
      'Communicate trade-offs clearly to non-technical audiences',
    ],
  },
  coreConcepts: {
    concepts: [
      {
        heading: 'The metric deep-dive framework',
        body: 'When a metric moves unexpectedly, work through: (1) Confirm the data is correct, (2) Check if the change is global or segmented, (3) Separate internal causes (feature launch, bug) from external causes (competitor, seasonality), (4) Identify the mechanism, (5) Recommend next steps.',
        callout: 'Always start by confirming the data is correct before drawing conclusions.',
      },
      {
        heading: 'HEART framework',
        body: 'Google\'s HEART framework structures UX metrics: Happiness (satisfaction), Engagement (frequency/depth of use), Adoption (new users), Retention (returning users), Task success (completion rate). Use it to define metrics for any product area.',
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
          'Check if the drop is global or segmented: is it all users, a specific platform (iOS/Android/web), a geo, or a user cohort?',
          'Check for internal causes: was there a recent product change, A/B test assignment shift, or infrastructure issue in the past 7 days?',
          'Check for external causes: are there competitor launches, holidays, or news events that could explain reduced usage?',
          'Identify the mechanism: is reach down (fewer stories posted), consumption down (fewer views per story), or both?',
        ],
        answer:
          'A structured root-cause analysis covering data quality → segmentation → internal causes → external causes → mechanism. This framework demonstrates rigour and prevents jumping to incorrect conclusions.',
        tags: ['Metric drop', 'Root cause', 'Segmentation'],
      },
    ],
  },
  interviewExamples: {
    scenarios: [
      {
        title: 'How would you measure the success of Facebook Marketplace?',
        context: 'You\'re the DS for Facebook Marketplace. What metrics would you use to evaluate its health?',
        steps: [
          'Clarify the goal: is this about health monitoring (ongoing), post-launch evaluation, or a specific feature?',
          'Define the funnel: Awareness → Browse → List item → Contact seller → Complete transaction.',
          'Choose a north star: GMV (gross merchandise value) or number of successful transactions.',
          'Add supporting metrics: listing creation rate, contact-to-transaction rate, time-to-sale, repeat buyer rate.',
          'Add guardrail metrics: spam/fraud rate, user complaints, response time.',
        ],
        answer:
          'This answer demonstrates a funnel-based approach to metric design, covering the north star, supporting metrics, and guardrails. Interviewers reward candidates who connect metrics back to the business goal.',
        tags: ['Metric design', 'North star', 'Funnel'],
      },
    ],
  },
  practiceQuestions: {
    questions: [
      {
        id: 'ps-q1',
        question: 'Spotify\'s weekly active listeners dropped 8% last Monday. Walk through how you\'d investigate.',
        hint: 'Start with data quality before exploring causes.',
        answer: 'Follow the metric deep-dive framework: (1) Verify data integrity, (2) Segment by platform/geo/cohort, (3) Check internal causes (releases, experiments), (4) Check external causes (competitor, news), (5) Identify mechanism (reach vs. consumption drop).',
        difficulty: 'medium',
        tags: ['Metric drop', 'Root cause'],
      },
    ],
  },
};
