import type { Module } from '@/types/content';

export const experimentationModule: Module = {
  slug: 'experimentation',
  title: 'Experimentation',
  description:
    'Master A/B testing end-to-end: hypothesis design, sample size calculation, guardrail metrics, and interpreting results under uncertainty.',
  icon: 'FlaskConical',
  introduction: {
    overview:
      'Experimentation is the gold standard for causal inference in product development. A/B tests let you measure the true impact of a change — isolating it from seasonality, user mix shifts, and other confounders. As a Product Data Scientist, you are expected to design, analyse, and communicate experiments rigorously.',
    whyItMatters:
      'Nearly every DS interview at a product company includes at least one experiment design or analysis question. Interviewers use these questions to test statistical rigour, product intuition, and your ability to communicate nuance to non-technical stakeholders.',
    whatYoullLearn: [
      'Formulate a hypothesis and choose the right randomisation unit',
      'Calculate minimum detectable effect and required sample size',
      'Select primary, secondary, and guardrail metrics',
      'Detect and handle novelty effects, network effects, and interference',
      'Interpret p-values, confidence intervals, and practical significance',
      'Communicate experiment results to cross-functional partners',
    ],
  },
  coreConcepts: {
    concepts: [
      {
        heading: 'Hypothesis formulation',
        body: 'Every experiment starts with a falsifiable null hypothesis (H₀) and an alternative (H₁). H₀ typically states no difference between control and treatment. You reject H₀ when the p-value falls below your significance threshold (α), most commonly 0.05.',
        callout: 'Always state the direction of your hypothesis before running the test — two-sided tests have lower power for the same sample size.',
      },
      {
        heading: 'Randomisation unit',
        body: 'The unit of randomisation (user, session, device, page) must match the unit of analysis to avoid inflated false-positive rates. User-level randomisation is preferred when the treatment has lasting effects; session-level is acceptable for stateless features.',
      },
      {
        heading: 'Sample size and power',
        body: 'Power (1−β) is the probability of detecting a real effect. Standard practice is 80% power at α=0.05. Required sample size grows with smaller MDE, lower baseline conversion, and higher variance. Use the formula n = (z_α/2 + z_β)² × 2σ² / δ² per variant.',
        callout: 'Peeking at results early and stopping when p < 0.05 inflates your false-positive rate — use sequential testing or pre-register your stopping rule.',
      },
      {
        heading: 'Metric selection',
        body: 'Identify one primary metric that maps directly to the hypothesis, several secondary metrics to understand mechanism, and guardrail metrics (e.g. latency, revenue) to catch regressions. A successful experiment improves the primary metric without harming guardrails.',
      },
      {
        heading: 'Sample ratio mismatch (SRM)',
        body: 'SRM occurs when the observed ratio of users assigned to treatment vs. control differs significantly from the configured ratio. Causes: buggy assignment logic, bot traffic filtered differently across variants, server-side errors dropping treatment users. SRM invalidates the experiment — any observed effect may be due to the biased sample, not the treatment.',
        callout: 'Always check SRM before interpreting results. Use a chi-squared test: expected 50,000 per variant, observed 50,000 control / 48,500 treatment → p < 0.0001. Reject and rerun.',
      },
      {
        heading: 'Novelty and primacy effects',
        body: 'Novelty effect: users interact with a new UI element simply because it is new, inflating early treatment metrics. Primacy effect: users have learned habits from the old UI, causing early underperformance of the treatment. Both effects distort short-term experiment results. Mitigation: run the experiment long enough (typically 2–4 weeks) for effects to stabilise, and plot daily metrics to diagnose.',
      },
      {
        heading: 'Multivariate testing (MVT)',
        body: 'MVT tests multiple variables simultaneously (e.g. button colour AND copy AND position). Full factorial designs test all combinations but require large samples. Fractional factorial designs reduce sample requirements but cannot estimate all interaction effects. Use MVT when you have sufficient traffic and want to understand variable interactions.',
      },
    ],
  },
  workedExamples: {
    examples: [
      {
        title: 'Redesigning the checkout button',
        context:
          'Your PM wants to test changing the checkout CTA from "Proceed to payment" to "Buy now". The current checkout conversion rate is 12%. You want to detect a 1 percentage-point lift with 80% power at α=0.05.',
        steps: [
          'Define H₀: conversion(treatment) = conversion(control). H₁: conversion(treatment) > conversion(control). Use a one-sided test since you only care about improvement.',
          'Calculate MDE: δ = 0.01 (1pp lift on 12% baseline). σ² ≈ p(1−p) = 0.12×0.88 = 0.1056.',
          'Apply sample size formula: n ≈ (1.645 + 0.842)² × 2 × 0.1056 / 0.01² ≈ 13,100 users per variant.',
          'Set the experiment to run for 2 weeks to capture weekly seasonality and reach sample size.',
          'Check SRM on day 1 — confirm ~50/50 split within noise.',
          'After 2 weeks: treatment = 13.1%, control = 12.0%. p = 0.031 < 0.05. Reject H₀.',
        ],
        answer:
          'The "Buy now" button increased checkout conversion by ~1.1pp (p=0.031). The lift is statistically significant and practically meaningful — at current traffic, this represents ~4,400 additional conversions per month. Recommend shipping.',
        tags: ['Conversion', 'Sample size', 'One-sided test'],
      },
      {
        title: 'Detecting and handling a novelty effect',
        context:
          'You launch an experiment on a new home feed design. After day 3, treatment shows +8% sessions. But by day 14, the difference has narrowed to +1.5% (p=0.08). What is happening and what do you recommend?',
        steps: [
          'Plot daily metric (sessions) separately for treatment and control over the 14 days. If treatment was high in days 1–3 then converged to control, this is a novelty effect.',
          'Confirm: segment by new vs. returning users. Returning users who saw the old design first are most prone to novelty effects.',
          'Exclude the first 3–7 days and re-run the analysis on the "steady state" period (days 7–14). If the effect disappears, the initial lift was entirely novelty.',
          'Check the sample size for the steady-state period only — it may now be underpowered.',
        ],
        answer:
          'The +8% was a novelty effect, not a genuine improvement. The steady-state effect (+1.5%, p=0.08) is not statistically significant. Recommendation: do not ship the new design based on this experiment. Consider running a longer experiment (4 weeks) or testing with only new users who have no prior exposure.',
        tags: ['Novelty effect', 'Time series', 'Segmentation'],
      },
      {
        title: 'Diagnosing a sample ratio mismatch',
        context:
          'Your experiment was configured for a 50/50 split. After 1 week: control = 52,300, treatment = 48,900. You run a chi-squared test. What do you conclude?',
        steps: [
          'Calculate the expected count: (52,300 + 48,900) / 2 = 50,600 per variant.',
          'Chi-squared statistic: χ² = (52300−50600)²/50600 + (48900−50600)²/50600 = 57.1 + 57.1 ≈ 114.',
          'With df = 1, χ²_critical at p=0.001 is 10.8. Our χ² = 114 >> 10.8 → SRM confirmed.',
          'Investigate causes: check if treatment has higher error rates (users dropped from treatment on errors), bot filtering differences, or a bug in the assignment logic.',
          'Do NOT interpret the experiment results until the SRM is resolved.',
        ],
        answer:
          'SRM is confirmed with extremely high confidence. The experiment is invalid. The 3,400 "missing" treatment users were likely dropped due to a bug (e.g. the new feature threw an error for certain device types, causing those users to fall back to control). Fix the bug, reset the experiment, and rerun.',
        tags: ['SRM', 'Chi-squared', 'Data quality'],
      },
    ],
  },
  interviewExamples: {
    scenarios: [
      {
        title: 'You see a statistically significant drop in DAU after a feature launch',
        context:
          'We launched a new onboarding flow last week and the experiment shows DAU is down 3% in treatment (p=0.02). The PM is surprised — they expected an improvement. How do you investigate?',
        steps: [
          'Check for SRM: verify the treatment/control split matches the configured ratio. An SRM suggests a technical issue, not a real effect.',
          'Segment by user cohort: new vs. returning users. Onboarding changes disproportionately affect new users — a drop here might reflect a worse new-user experience.',
          'Check secondary metrics: is engagement (sessions per user, time on app) also down, or just DAU? A DAU drop with stable engagement per session might indicate fewer re-activations, not a worse experience.',
          'Look at the novelty/primacy window: if the drop flattens after day 3, it may be a primacy effect (users surprised by the change) that self-resolves.',
          'Inspect the funnel: where in onboarding are users dropping off? Use a funnel breakdown to isolate the problematic step.',
        ],
        answer:
          'This answer demonstrates structured debugging: you start with data quality (SRM), then segment to isolate the effect, then use secondary metrics to understand mechanism. Interviewers reward candidates who resist jumping to conclusions and instead propose a systematic investigation plan.',
        tags: ['DAU', 'Debugging', 'Segmentation'],
      },
      {
        title: 'How do you design an experiment when you can\'t randomise at the user level?',
        context:
          'You want to test a new pricing page. But your company\'s infrastructure only supports randomisation at the page-visit level, not user level. What are the risks and how do you address them?',
        steps: [
          'Identify the problem: session-level randomisation means the same user can see both treatment and control on different visits, violating the assumption that each unit receives only one treatment.',
          'Quantify the contamination risk: if most users visit the pricing page once, contamination is low. If repeat visitors are common, the effect estimate is biased.',
          'Analyse: use "first-exposure" analysis — assign each user to the variant they first saw and analyse only that assignment. Discard subsequent visits from the same user.',
          'Check for carry-over effects: even with first-exposure analysis, users may remember the first version they saw. Plot treatment effect over visit order.',
          'If possible, implement a cookie-based user-level assignment even if the infrastructure is session-based — store the assignment in a cookie on first visit.',
        ],
        answer:
          'This answer shows systems thinking — you identify the limitation, quantify the bias risk, and propose a practical mitigation (first-exposure analysis + cookies). Interviewers at companies with legacy infrastructure ask this exact question to test whether you can work within constraints.',
        tags: ['Randomisation unit', 'Contamination', 'Carry-over effects'],
      },
    ],
  },
  practiceQuestions: {
    questions: [
      {
        id: 'exp-q1',
        question:
          'You want to test a new recommendation algorithm. The current CTR is 5% and you want to detect a 0.5pp lift. Estimate the sample size you need per variant (80% power, α=0.05, two-sided).',
        hint: 'Use n ≈ (z_α/2 + z_β)² × 2σ² / δ² where σ² ≈ p(1−p) for a proportion.',
        answer:
          'σ² = 0.05 × 0.95 = 0.0475. δ = 0.005. z_α/2 = 1.96, z_β = 0.842. n ≈ (1.96+0.842)² × 2 × 0.0475 / 0.005² ≈ (7.85 × 0.095) / 0.000025 ≈ 29,830 per variant (~60k total).',
        difficulty: 'medium',
        tags: ['Sample size', 'Power'],
      },
      {
        id: 'exp-q2',
        question:
          'Your experiment shows a statistically significant result after 3 days, but you planned to run it for 2 weeks. Should you stop early? Why or why not?',
        hint: 'Think about what "peeking" does to your Type I error rate.',
        answer:
          'No. Stopping early because p < 0.05 inflates the false-positive rate well above 5% — the threshold only holds if you check once at the pre-specified end date. If early stopping is needed, use a sequential testing method (e.g. always-valid p-values, mSPRT) that controls error rates under continuous monitoring.',
        difficulty: 'easy',
        tags: ['Peeking', 'Type I error'],
      },
      {
        id: 'exp-q3',
        question:
          'You are testing a new social feed ranking algorithm. Why might standard A/B testing give you biased results, and how would you address this?',
        hint: 'Consider how treatment and control users might interact with each other.',
        answer:
          'Social feeds create network interference: a treated user\'s feed changes affect the content available to control users (e.g. different posts surface, engagement signals change). This violates the SUTVA assumption. Solutions include cluster-based randomisation (randomise at the social cluster level), ego-network randomisation, or using a holdout of completely isolated users. You should also measure spillover directly.',
        difficulty: 'hard',
        tags: ['Network effects', 'SUTVA', 'Cluster randomisation'],
      },
      {
        id: 'exp-q4',
        question: 'What is a holdout group and when would you use one instead of a standard A/B test?',
        hint: 'Think about situations where you need to measure long-term cumulative impact.',
        answer: 'A holdout group is a small percentage of users (e.g. 5–10%) permanently excluded from a feature or set of features. Unlike an A/B test with a defined end date, holdouts persist indefinitely to measure the long-term cumulative impact of shipping decisions. Use holdouts when: (1) features have long-term effects that A/B tests miss (e.g. email frequency), (2) you want to measure the combined value of many small shipped improvements over a quarter, (3) you need a clean baseline unaffected by any product changes.',
        difficulty: 'medium',
        tags: ['Holdout', 'Long-term effects', 'Causal inference'],
      },
      {
        id: 'exp-q5',
        question: 'Your experiment on a new checkout flow shows a significant improvement in conversion (+2pp), but your revenue metric shows a non-significant −0.5% change. How do you interpret and what do you recommend?',
        hint: 'Think about what could cause conversion to go up while revenue stays flat or goes down.',
        answer: 'This is a meaningful conflict. Possible explanations: (1) The new flow is more permissive — it converts more users but they are lower-intent and buy cheaper items, so revenue per conversion fell. (2) The new flow has higher cart abandonment post-conversion (e.g. payment errors). (3) The revenue metric is underpowered — revenue is noisy, and a −0.5% change may be within the confidence interval. Recommendation: do not ship yet. Investigate revenue per converted user and average order value. If revenue per converter is also down, the conversion lift is a hollow win. Run longer or apply CUPED to revenue to improve power.',
        difficulty: 'hard',
        tags: ['Metric conflict', 'Revenue', 'Decision-making'],
      },
    ],
  },
};
