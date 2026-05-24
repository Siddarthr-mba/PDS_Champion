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
        heading: 'Common pitfalls',
        body: 'Network effects occur when treatment and control users interact (social features). Novelty effects inflate early results for any visible UI change. Sample ratio mismatch (SRM) indicates a broken randomisation pipeline and invalidates results.',
        callout: 'Always run a pre-experiment A/A test or check the assignment ratio before analysing results.',
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
    ],
  },
};
