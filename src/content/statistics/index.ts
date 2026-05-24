import type { Module } from '@/types/content';

export const statisticsModule: Module = {
  slug: 'statistics',
  title: 'Statistics',
  description:
    'Build the statistical intuition interviewers expect — probability, distributions, hypothesis testing, regression, and Bayesian thinking.',
  icon: 'BarChart2',
  introduction: {
    overview:
      'Statistics underpins every quantitative decision in product development. A strong DS candidate can reason fluently about probability, distributions, and inference — and explain these concepts to non-statisticians.',
    whyItMatters:
      'Statistics questions appear in screening rounds and technical interviews alike. Interviewers test both conceptual understanding and the ability to apply it to ambiguous real-world problems.',
    whatYoullLearn: [
      'Apply probability rules to real product scenarios',
      'Choose the right hypothesis test for a given situation',
      'Interpret confidence intervals and avoid common misconceptions',
      'Explain the central limit theorem and why it matters for A/B testing',
      'Reason about Bayesian vs. frequentist approaches',
    ],
  },
  coreConcepts: {
    concepts: [
      {
        heading: 'Central Limit Theorem',
        body: 'The CLT states that the sampling distribution of the mean approaches a normal distribution as sample size grows, regardless of the population distribution. This justifies using z-tests and t-tests for large samples and underpins the validity of A/B test statistics.',
        callout: 'Rule of thumb: n ≥ 30 is often cited, but heavily skewed distributions require larger samples.',
      },
      {
        heading: 'Type I and Type II errors',
        body: 'A Type I error (false positive) is rejecting H₀ when it is true — controlled by α. A Type II error (false negative) is failing to reject H₀ when it is false — controlled by β. Power = 1 − β. There is always a trade-off: reducing α increases β for a fixed sample size.',
      },
      {
        heading: 'Confidence intervals',
        body: 'A 95% CI means that if you repeated the experiment many times, 95% of the constructed intervals would contain the true parameter. It does NOT mean there is a 95% chance the true value is in this particular interval.',
        callout: 'The "95% chance the true value is in this interval" interpretation is a common and costly mistake in interviews.',
      },
    ],
  },
  workedExamples: {
    examples: [
      {
        title: 'Comparing two conversion rates',
        context: 'Control: 1,200 conversions / 10,000 users (12%). Treatment: 1,350 conversions / 10,000 users (13.5%). Is the difference statistically significant at α=0.05?',
        steps: [
          'State H₀: p_control = p_treatment. H₁: p_control ≠ p_treatment (two-sided).',
          'Calculate pooled proportion: p̂ = (1200+1350)/(10000+10000) = 0.1275.',
          'Calculate standard error: SE = √(p̂(1−p̂)(1/n₁ + 1/n₂)) = √(0.1275×0.8725×0.0002) ≈ 0.00471.',
          'Compute z-statistic: z = (0.135 − 0.12) / 0.00471 ≈ 3.18.',
          'Compare to z_α/2 = 1.96. Since 3.18 > 1.96, reject H₀.',
        ],
        answer: 'The 1.5pp lift is statistically significant (z=3.18, p≈0.001). With 10,000 users per variant, the experiment was well-powered to detect this effect.',
        tags: ['Two-proportion z-test', 'Hypothesis testing'],
      },
    ],
  },
  interviewExamples: {
    scenarios: [
      {
        title: 'Explain p-values to a non-technical PM',
        context: 'Your PM asks: "The experiment is significant with p=0.03 — does that mean there\'s a 97% chance our feature works?"',
        steps: [
          'Acknowledge the intuition: "I understand why it feels that way — it\'s a common interpretation."',
          'Give the correct definition: "A p-value of 0.03 means: if our feature had zero effect, we\'d see a result this extreme or more extreme only 3% of the time by chance."',
          'Explain what it doesn\'t mean: "It doesn\'t tell us the probability that the feature works — that would require a Bayesian approach with a prior."',
          'Reframe practically: "What it does tell us is that our result is unlikely to be a fluke, so we have enough evidence to ship — subject to the effect size being meaningful."',
        ],
        answer: 'This answer scores highly because it corrects the misconception without being condescending, uses an accessible analogy, and pivots to practical decision-making — which is what PMs care about.',
        tags: ['p-values', 'Communication', 'Bayesian'],
      },
    ],
  },
  practiceQuestions: {
    questions: [
      {
        id: 'stat-q1',
        question: 'What is the difference between a confidence interval and a credible interval?',
        hint: 'Think about the frequentist vs. Bayesian interpretation of probability.',
        answer: 'A confidence interval is frequentist: 95% of intervals constructed this way contain the true parameter (a statement about the procedure, not this specific interval). A credible interval is Bayesian: given the data and prior, there is a 95% posterior probability that the parameter lies in this range (a statement about the parameter given the data).',
        difficulty: 'medium',
        tags: ['Bayesian', 'Frequentist', 'Intervals'],
      },
    ],
  },
};
