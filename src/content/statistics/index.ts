import type { Module } from '@/types/content';

export const statisticsModule: Module = {
  slug: 'statistics',
  title: 'Statistics',
  description:
    'Build the statistical intuition interviewers expect — probability, distributions, hypothesis testing, regression, and Bayesian thinking.',
  icon: 'BarChart2',
  introduction: {
    overview:
      'Statistics underpins every quantitative decision in product development. A strong DS candidate can reason fluently about probability, distributions, inference, and regression — and explain these concepts to non-statisticians in plain language. You\'ll be expected to apply these ideas to product scenarios, not just recite textbook definitions.',
    whyItMatters:
      'Statistics questions appear in screening rounds and technical interviews alike. Interviewers test both conceptual understanding and the ability to apply it to ambiguous real-world problems. Weak statistical reasoning is one of the most common reasons otherwise strong candidates are rejected.',
    whatYoullLearn: [
      'Apply probability rules to real product scenarios',
      'Choose the right hypothesis test for a given situation',
      'Interpret confidence intervals and avoid common misconceptions',
      'Explain the central limit theorem and why it matters for A/B testing',
      'Understand regression coefficients, assumptions, and diagnostics',
      'Reason about Bayesian vs. frequentist approaches',
      'Handle variance reduction techniques like CUPED',
    ],
  },
  coreConcepts: {
    concepts: [
      {
        heading: 'Central Limit Theorem',
        body: 'The CLT states that the sampling distribution of the mean approaches a normal distribution as sample size grows, regardless of the population distribution. This justifies using z-tests and t-tests for large samples and is the mathematical foundation for A/B testing — even when the underlying metric (e.g. revenue per user) is highly skewed.',
        callout: 'Rule of thumb: n ≥ 30 is often cited, but heavily skewed distributions (e.g. revenue with outliers) may require n > 1,000. Bootstrap the distribution if in doubt.',
      },
      {
        heading: 'Type I and Type II errors',
        body: 'A Type I error (false positive, α) is rejecting H₀ when it is true — you see an effect that isn\'t real. A Type II error (false negative, β) is failing to reject H₀ when it is false — you miss a real effect. Power = 1 − β. There is always a trade-off: reducing α without increasing sample size raises β.',
        callout: 'In product settings, the cost of a Type I error (shipping a bad feature) and a Type II error (missing a good feature) are both real. Choose α based on these costs, not just convention.',
      },
      {
        heading: 'Confidence intervals',
        body: 'A 95% CI means that if you repeated the experiment many times, 95% of the constructed intervals would contain the true parameter. It does NOT mean there is a 95% chance the true value is in this particular interval — that probability is either 0 or 1 (the true value is fixed).',
        callout: 'The "95% chance the true value is in this interval" interpretation is a Bayesian credible interval, not a frequentist CI. Mixing these up is a common and costly interview mistake.',
      },
      {
        heading: 'Variance reduction: CUPED',
        body: 'CUPED (Controlled-experiment Using Pre-Experiment Data) reduces metric variance by subtracting the portion of variance explained by a pre-experiment covariate (e.g. pre-experiment revenue). Lower variance → smaller required sample size for the same power. CUPED is widely used at Netflix, Booking.com, and Microsoft.',
        callout: 'CUPED does not change the expected treatment effect — it only reduces noise. The regression coefficient θ is estimated from pre-experiment data.',
      },
      {
        heading: 'Linear regression assumptions (LINE)',
        body: 'For OLS regression to produce valid inference: (L) Linear relationship between X and y, (I) Independence of residuals, (N) Normal distribution of residuals (for small samples), (E) Equal variance of residuals (homoscedasticity). Violating these affects standard errors and p-values, not necessarily the point estimates.',
      },
      {
        heading: 'Simpson\'s Paradox',
        body: 'A trend that appears in aggregated data can reverse when the data is segmented. Classic example: a drug appears to help in the overall population but harms each subgroup separately, because a confounding variable (severity of illness) correlates with both treatment assignment and outcome. Always segment before concluding.',
        callout: 'Simpson\'s Paradox is a favourite interview question. Recognising it requires asking: "Is there a confounding variable that affects both the treatment assignment and the outcome?"',
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
          'Calculate pooled proportion: p̂ = (1200+1350)/(10000+10000) = 2550/20000 = 0.1275.',
          'Calculate standard error: SE = √(p̂(1−p̂)(1/n₁ + 1/n₂)) = √(0.1275 × 0.8725 × 0.0002) ≈ 0.00471.',
          'Compute z-statistic: z = (0.135 − 0.12) / 0.00471 ≈ 3.18.',
          'Compare to z_α/2 = 1.96. Since |3.18| > 1.96, reject H₀ at α=0.05.',
          'Compute 95% CI: (0.135−0.12) ± 1.96×0.00471 = 0.015 ± 0.009 = [0.006, 0.024].',
        ],
        answer: 'The 1.5pp lift is statistically significant (z=3.18, p≈0.001). The 95% CI [0.6pp, 2.4pp] tells us the effect is practically meaningful. With 10,000 users per variant, the experiment was well-powered to detect this effect.',
        tags: ['Two-proportion z-test', 'Hypothesis testing', 'CI'],
      },
      {
        title: 'Diagnosing Simpson\'s Paradox in a medical study',
        context: 'A hospital reports: overall recovery rate with Drug A = 83%, Drug B = 75%. But for mild cases: A = 93%, B = 87%. For severe cases: A = 73%, B = 69%. The hospital recommends Drug A. Is this correct?',
        steps: [
          'Calculate the counts: suppose mild cases A: 700/750, B: 100/? and severe cases A: 200/? This is the standard setup where each subgroup shows A > B but the mix differs.',
          'Check if the subgroup sizes are balanced: if Drug A was mostly given to mild cases (easier to treat) while Drug B was mostly given to severe cases, the aggregate will be misleading.',
          'Confirm the paradox: in each severity stratum, A outperforms B. The aggregate is misleading because severity (a confounder) determines both treatment assignment and outcome.',
          'Correct analysis: within each stratum (mild, severe), Drug A does better. The aggregate comparison is confounded by case severity.',
        ],
        answer: 'Drug A is genuinely better within each subgroup. The aggregate comparison is misleading because more severe cases were assigned to Drug B. The correct conclusion is to use the stratified results. This is a textbook Simpson\'s Paradox — controlled by stratification or regression adjustment.',
        tags: ['Simpson\'s Paradox', 'Confounding', 'Segmentation'],
      },
      {
        title: 'Using CUPED to reduce variance in a revenue experiment',
        context: 'You are running an experiment on a checkout feature. Revenue per user is very noisy (high variance). You have 4 weeks of pre-experiment revenue per user. How do you apply CUPED?',
        steps: [
          'Compute the covariate: for each user, record their pre-experiment revenue (X_i).',
          'Estimate θ: regress post-experiment revenue (Y_i) on pre-experiment revenue (X_i). θ = Cov(Y, X) / Var(X).',
          'Compute the adjusted metric: Ỹ_i = Y_i − θ(X_i − mean(X)). This removes the variance explained by pre-experiment behaviour.',
          'Run the standard t-test on Ỹ_i instead of Y_i.',
          'The variance reduction factor ≈ 1 − ρ², where ρ is the correlation between pre and post revenue. If ρ = 0.6, variance drops by 36%, and required sample size drops by 36%.',
        ],
        answer: 'CUPED leverages historical data to reduce noise without changing the unbiased estimate of the treatment effect. A variance reduction of 20–50% is common for revenue metrics, enabling faster or more sensitive experiments.',
        tags: ['CUPED', 'Variance reduction', 'Regression'],
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
          'Give the correct definition: "A p-value of 0.03 means: if our feature had zero effect, we\'d see a result this extreme or more extreme only 3% of the time by chance alone."',
          'Explain what it doesn\'t mean: "It doesn\'t give us the probability that the feature works — that would require a Bayesian approach with a prior belief about how likely features are to work in general."',
          'Reframe practically: "What p=0.03 tells us is that our result is unlikely to be a random fluke given the sample size we ran. Combined with a meaningful effect size, we have enough evidence to ship."',
          'Add nuance: "That said, p-values can be misleading if we peeked at the data early, ran multiple tests, or had a small effect that\'s statistically but not practically significant."',
        ],
        answer: 'This answer scores highly because it corrects the misconception without being condescending, adds useful context about what p-values don\'t tell you, and pivots to practical decision-making. Always end stat explanations with "so what does this mean for our decision?"',
        tags: ['p-values', 'Communication', 'Bayesian'],
      },
      {
        title: 'You observe a significant result, but the effect size is tiny. Do you ship?',
        context: 'Your experiment ran for 6 weeks with 2M users per variant. You see p=0.001 for a 0.02% improvement in conversion rate. The PM is excited. Should you ship?',
        steps: [
          'Statistical significance ≠ practical significance. With 2M users, the experiment has enormous power — even a 0.01% effect would be detectable.',
          'Calculate the business impact: 0.02% × current conversion rate × revenue per conversion × annual volume. If the absolute impact is $50K/year, it may not justify ongoing maintenance costs.',
          'Check the confidence interval: if the CI is [0.005%, 0.035%], the true effect could be near zero.',
          'Weigh the cost: does the feature add technical debt, slow down the codebase, or require ongoing PM attention? What is the opportunity cost vs. other features?',
          'Recommendation: statistical significance is a necessary but not sufficient condition to ship. The decision also requires practical significance, business impact, and opportunity cost analysis.',
        ],
        answer: 'This answer demonstrates mature statistical thinking — you recognise that large samples detect tiny effects, and you pivot to business impact and opportunity cost. This is the answer that gets candidates to the next round.',
        tags: ['Practical significance', 'Decision-making', 'Effect size'],
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
      {
        id: 'stat-q2',
        question: 'You run an A/B test and observe p=0.04. Before the test, you had decided to run it for 2 weeks. At day 10, p was already 0.03. A colleague suggests stopping early. What do you do and why?',
        hint: 'Think about what "peeking" does to the Type I error rate.',
        answer: 'Do not stop early. Peeking and stopping when p < 0.05 inflates the false-positive rate — with repeated peeking, the effective α can exceed 20% even though you set α=0.05. The p-value threshold only controls Type I error if you check once at the pre-specified end date. If early stopping is genuinely needed, use a sequential testing method (mSPRT, always-valid p-values) that is designed for continuous monitoring.',
        difficulty: 'easy',
        tags: ['Peeking', 'Type I error', 'Sequential testing'],
      },
      {
        id: 'stat-q3',
        question: 'Explain Simpson\'s Paradox with a product analytics example.',
        hint: 'Think about a situation where an overall metric trend looks different from the trend within each segment.',
        answer: 'Example: Overall DAU is up 5%, and you declare success. But when you segment by platform, DAU is down on iOS (−2%) and flat on Android (+0%). The aggregate growth came entirely from a shift in user mix — more Android users (who have lower absolute DAU) joined the platform, inflating the aggregate. The real story is iOS is declining. Simpson\'s Paradox occurs when a confounding variable (here: platform mix) correlates with both the grouping and the outcome. Always segment before concluding.',
        difficulty: 'medium',
        tags: ['Simpson\'s Paradox', 'Segmentation', 'Confounding'],
      },
      {
        id: 'stat-q4',
        question: 'What is the Law of Large Numbers and how does it differ from the Central Limit Theorem?',
        hint: 'Both deal with sample size, but they make different claims.',
        answer: 'The Law of Large Numbers (LLN) says that as n → ∞, the sample mean converges to the population mean — it guarantees accuracy of estimation. The Central Limit Theorem (CLT) says that the sampling distribution of the mean becomes approximately normal as n grows — it justifies using normal-based tests and confidence intervals. LLN is about point estimation; CLT is about the distribution of estimates.',
        difficulty: 'medium',
        tags: ['LLN', 'CLT', 'Probability'],
      },
      {
        id: 'stat-q5',
        question: 'You have a metric with very high variance (e.g. revenue per user, which is 0 for most users and very large for a few). What techniques would you use to run a valid A/B test on it?',
        hint: 'Think about what high variance does to your required sample size, and what you can do to reduce it.',
        answer: 'Options: (1) CUPED — subtract variance explained by pre-experiment revenue, reducing variance by ρ². (2) Capping/winsorising outliers — cap revenue at the 99th percentile before analysis, reducing variance at the cost of some bias. (3) Use a ratio metric — revenue per active user instead of revenue per all users, if most zeros are inactive users. (4) Log-transform — reduces skew but changes the estimand. (5) Increase sample size — brute force, but often infeasible for high-value metrics. CUPED + winsorising is the industry-standard combination.',
        difficulty: 'hard',
        tags: ['CUPED', 'Variance reduction', 'High-variance metrics'],
      },
    ],
  },
};
