import type { Module } from '@/types/content';

export const sqlModule: Module = {
  slug: 'sql',
  title: 'SQL',
  description:
    'Go beyond basic queries — window functions, CTEs, self-joins, and data modeling patterns that appear in real DS interviews.',
  icon: 'Database',
  introduction: {
    overview:
      'SQL is the lingua franca of data. In DS interviews, you are expected to write clean, efficient queries — and to reason about data modeling, query performance, and edge cases. Most interviews include at least one live coding challenge where you write SQL from scratch, often under time pressure.',
    whyItMatters:
      'Almost every DS interview includes a SQL coding question. Strong candidates write readable, well-structured queries using modern SQL features (window functions, CTEs), explain their reasoning as they go, and proactively handle edge cases like NULLs and duplicates.',
    whatYoullLearn: [
      'Write window functions for ranking, running totals, and lag/lead analysis',
      'Use CTEs to structure complex multi-step queries',
      'Identify and handle NULLs, duplicates, and edge cases correctly',
      'Model common product analytics tables (events, users, sessions)',
      'Calculate retention, funnel, and cohort metrics in SQL',
      'Optimise queries by understanding how joins and aggregations are executed',
    ],
  },
  coreConcepts: {
    concepts: [
      {
        heading: 'Window functions',
        body: 'Window functions compute a value for each row using a "window" of related rows, without collapsing the result set like GROUP BY. Common functions: ROW_NUMBER(), RANK(), DENSE_RANK(), LAG(), LEAD(), SUM() OVER(), AVG() OVER(). The PARTITION BY clause defines the window group; ORDER BY controls the ordering within it.',
        callout: 'ROW_NUMBER() assigns a unique rank even for ties. RANK() leaves gaps after ties. DENSE_RANK() does not leave gaps — interviewers test all three. Know them cold.',
      },
      {
        heading: 'CTEs (Common Table Expressions)',
        body: 'A CTE (WITH clause) defines a named temporary result set you can reference in the main query. Use CTEs to break complex queries into readable steps — one CTE per logical transformation. Multiple CTEs can be chained. Recursive CTEs can traverse hierarchies like org charts or follower graphs.',
        callout: 'In an interview, always use CTEs over nested subqueries. They are dramatically easier to read, debug, and extend — which interviewers value.',
      },
      {
        heading: 'NULL handling',
        body: 'NULL represents an unknown value. Any comparison with NULL (=, !=, >, <) evaluates to NULL, not TRUE or FALSE. Use IS NULL / IS NOT NULL to filter NULLs. Aggregations (SUM, AVG, COUNT) ignore NULLs — COUNT(*) counts all rows, COUNT(col) counts non-NULL values of col.',
        callout: 'Forgetting NULL handling is one of the most common SQL interview mistakes. Always ask yourself: "Can this column be NULL? What should happen if it is?"',
      },
      {
        heading: 'JOIN types',
        body: 'INNER JOIN: returns only matching rows from both tables. LEFT JOIN: returns all rows from the left table, NULL for non-matching right rows. RIGHT JOIN: same but reversed. FULL OUTER JOIN: all rows from both. CROSS JOIN: Cartesian product. Self-joins join a table to itself (e.g. find employee–manager pairs).',
        callout: 'In product analytics, LEFT JOIN is by far the most common. Use it when you want to preserve all users/events, even those without a matching record in the joined table.',
      },
      {
        heading: 'Funnel analysis pattern',
        body: 'To compute funnel conversion in SQL: for each stage, count distinct users who completed that step. Use CASE WHEN or subqueries to assign each user a boolean flag per step, then aggregate. A SUM(CASE WHEN ... THEN 1 ELSE 0 END) per stage, divided by the first stage count, gives conversion rates.',
      },
      {
        heading: 'Retention pattern',
        body: 'Day-N retention = % of users active on day 0 who are also active on day N. Pattern: (1) Find each user\'s first active date, (2) LEFT JOIN events on user_id where event_date = first_date + N days, (3) COUNT distinct retained users / COUNT distinct cohort users. Use date arithmetic carefully — different databases use different syntax (INTERVAL, DATEADD, +N).',
      },
    ],
  },
  workedExamples: {
    examples: [
      {
        title: 'Find the second-highest salary per department',
        context: 'Table: employees(id, name, department, salary). Return the employee(s) with the second-highest salary in each department. Handle ties correctly.',
        steps: [
          'Use DENSE_RANK() to rank employees within each department by salary descending. DENSE_RANK ensures tied salaries share the same rank.',
          'Wrap in a CTE to keep the query readable.',
          'Filter to rank = 2 in the outer query.',
          'Note: ROW_NUMBER() would give arbitrary results for ties; RANK() would skip rank 2 if two employees are tied for first. DENSE_RANK() is correct here.',
        ],
        answer: `WITH ranked AS (
  SELECT
    id,
    name,
    department,
    salary,
    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rnk
  FROM employees
)
SELECT id, name, department, salary
FROM ranked
WHERE rnk = 2;`,
        tags: ['Window functions', 'DENSE_RANK', 'CTE'],
      },
      {
        title: 'Calculate Day-7 retention by cohort',
        context: 'Table: events(user_id, event_date). Define Day-7 retention as: a user who was active on their first day (cohort date) is also active exactly 7 days later. Return retention rate per cohort date.',
        steps: [
          'Find each user\'s cohort date (first active date) using MIN(event_date) grouped by user_id.',
          'LEFT JOIN the events table back to itself on user_id where the second event_date = cohort_date + 7 days.',
          'Group by cohort_date and compute: COUNT(DISTINCT retained_user_id) / COUNT(DISTINCT cohort_user_id).',
          'Use LEFT JOIN (not INNER JOIN) so users without a day-7 event produce a NULL, which COUNT(DISTINCT) ignores — preserving them in the denominator.',
        ],
        answer: `WITH cohorts AS (
  SELECT user_id, MIN(event_date) AS cohort_date
  FROM events
  GROUP BY user_id
),
retained AS (
  SELECT c.user_id, c.cohort_date
  FROM cohorts c
  JOIN events e
    ON c.user_id = e.user_id
    AND e.event_date = c.cohort_date + INTERVAL '7 days'
)
SELECT
  c.cohort_date,
  COUNT(DISTINCT c.user_id)   AS cohort_size,
  COUNT(DISTINCT r.user_id)   AS retained_d7,
  ROUND(
    COUNT(DISTINCT r.user_id)::numeric / NULLIF(COUNT(DISTINCT c.user_id), 0),
    4
  ) AS retention_rate
FROM cohorts c
LEFT JOIN retained r ON c.user_id = r.user_id
GROUP BY c.cohort_date
ORDER BY c.cohort_date;`,
        tags: ['Retention', 'Cohort analysis', 'LEFT JOIN'],
      },
      {
        title: 'Build a 3-step funnel: view → add to cart → purchase',
        context: 'Table: events(user_id, event_type, event_date). event_type can be "view_product", "add_to_cart", "purchase". Calculate the overall conversion rate at each funnel step.',
        steps: [
          'For each user, determine whether they performed each event type using MAX(CASE WHEN ...).',
          'Aggregate across all users with SUM() to count how many users reached each stage.',
          'Divide each stage count by the first stage count for the conversion rate.',
          'Use NULLIF in the denominator to avoid divide-by-zero errors.',
        ],
        answer: `WITH user_funnel AS (
  SELECT
    user_id,
    MAX(CASE WHEN event_type = 'view_product'  THEN 1 ELSE 0 END) AS viewed,
    MAX(CASE WHEN event_type = 'add_to_cart'   THEN 1 ELSE 0 END) AS added,
    MAX(CASE WHEN event_type = 'purchase'      THEN 1 ELSE 0 END) AS purchased
  FROM events
  GROUP BY user_id
)
SELECT
  SUM(viewed)                                                        AS viewers,
  SUM(added)                                                         AS adders,
  SUM(purchased)                                                     AS purchasers,
  ROUND(SUM(added)::numeric     / NULLIF(SUM(viewed), 0), 4)         AS view_to_cart,
  ROUND(SUM(purchased)::numeric / NULLIF(SUM(added), 0), 4)          AS cart_to_purchase,
  ROUND(SUM(purchased)::numeric / NULLIF(SUM(viewed), 0), 4)         AS overall_conversion
FROM user_funnel;`,
        tags: ['Funnel', 'CASE WHEN', 'Aggregation'],
      },
    ],
  },
  interviewExamples: {
    scenarios: [
      {
        title: 'Find users who made purchases on 3 or more consecutive days',
        context: 'Table: purchases(user_id, purchase_date). Find all users who made at least one purchase on 3 or more consecutive calendar days.',
        steps: [
          'Remove duplicate purchase dates per user using SELECT DISTINCT user_id, purchase_date.',
          'Use ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY purchase_date) to assign a sequential row number to each purchase date per user.',
          'Subtract the row number from the date: purchase_date − ROW_NUMBER(). Consecutive dates will produce the same difference (this is the classic "gaps and islands" trick).',
          'Group by user_id and this difference-key, count rows per group. Groups with COUNT ≥ 3 are consecutive sequences of 3+ days.',
          'Return DISTINCT user_ids from those groups.',
        ],
        answer: `WITH deduped AS (
  SELECT DISTINCT user_id, purchase_date FROM purchases
),
numbered AS (
  SELECT
    user_id,
    purchase_date,
    purchase_date - ROW_NUMBER() OVER (
      PARTITION BY user_id ORDER BY purchase_date
    ) * INTERVAL '1 day' AS grp
  FROM deduped
)
SELECT DISTINCT user_id
FROM numbered
GROUP BY user_id, grp
HAVING COUNT(*) >= 3;`,
        tags: ['Consecutive days', 'Gaps and islands', 'Window functions'],
      },
      {
        title: 'Month-over-month revenue growth using LAG',
        context: 'Table: orders(order_id, user_id, revenue, order_date). Write a query to show monthly revenue and the month-over-month percentage change.',
        steps: [
          'Aggregate revenue by month using DATE_TRUNC(\'month\', order_date).',
          'Use LAG() OVER (ORDER BY month) to get the previous month\'s revenue.',
          'Compute % change: (current − previous) / previous × 100.',
          'Handle the first month where LAG returns NULL.',
        ],
        answer: `WITH monthly AS (
  SELECT
    DATE_TRUNC('month', order_date) AS month,
    SUM(revenue)                    AS monthly_revenue
  FROM orders
  GROUP BY 1
)
SELECT
  month,
  monthly_revenue,
  LAG(monthly_revenue) OVER (ORDER BY month) AS prev_month_revenue,
  ROUND(
    (monthly_revenue - LAG(monthly_revenue) OVER (ORDER BY month))
    / NULLIF(LAG(monthly_revenue) OVER (ORDER BY month), 0) * 100,
    2
  ) AS pct_change
FROM monthly
ORDER BY month;`,
        tags: ['LAG', 'MoM growth', 'Revenue'],
      },
    ],
  },
  practiceQuestions: {
    questions: [
      {
        id: 'sql-q1',
        question: 'Given a table sessions(session_id, user_id, started_at, ended_at), write a query to find all users who had two consecutive sessions with less than 5 minutes between them.',
        hint: 'Use LAG() to compare each session\'s start time with the previous session\'s end time for the same user.',
        answer: `WITH ordered AS (
  SELECT *,
    LAG(ended_at) OVER (PARTITION BY user_id ORDER BY started_at) AS prev_ended_at
  FROM sessions
)
SELECT DISTINCT user_id
FROM ordered
WHERE started_at - prev_ended_at < INTERVAL '5 minutes'
  AND prev_ended_at IS NOT NULL;`,
        difficulty: 'medium',
        tags: ['LAG', 'Window functions'],
      },
      {
        id: 'sql-q2',
        question: 'What is the difference between WHERE and HAVING? When would you use each?',
        hint: 'Think about when each clause is evaluated in the query execution order.',
        answer: 'WHERE filters rows before aggregation — it operates on individual rows and cannot reference aggregate functions. HAVING filters groups after aggregation — it can reference aggregate functions like SUM(), COUNT(). Use WHERE to filter raw data; use HAVING to filter the results of a GROUP BY. Example: WHERE event_type = \'click\' filters individual events; HAVING COUNT(*) > 10 filters users with more than 10 clicks.',
        difficulty: 'easy',
        tags: ['WHERE', 'HAVING', 'Aggregation'],
      },
      {
        id: 'sql-q3',
        question: 'Write a query to find the top 3 products by revenue in each product category, including ties.',
        hint: 'You need a ranking function that handles ties. DENSE_RANK() or RANK()? Think about which one to use.',
        answer: `WITH ranked AS (
  SELECT
    product_id,
    category,
    SUM(revenue) AS total_revenue,
    DENSE_RANK() OVER (PARTITION BY category ORDER BY SUM(revenue) DESC) AS rnk
  FROM orders
  GROUP BY product_id, category
)
SELECT product_id, category, total_revenue
FROM ranked
WHERE rnk <= 3
ORDER BY category, rnk;`,
        difficulty: 'medium',
        tags: ['DENSE_RANK', 'Window functions', 'Top-N'],
      },
      {
        id: 'sql-q4',
        question: 'You have a users table and an events table. Write a query to find users who signed up in the last 30 days but have never logged an event.',
        hint: 'Think about how to find users NOT present in another table. There are multiple approaches.',
        answer: `-- Option 1: LEFT JOIN
SELECT u.user_id
FROM users u
LEFT JOIN events e ON u.user_id = e.user_id
WHERE u.signup_date >= CURRENT_DATE - INTERVAL '30 days'
  AND e.user_id IS NULL;

-- Option 2: NOT EXISTS (often more readable)
SELECT user_id
FROM users u
WHERE signup_date >= CURRENT_DATE - INTERVAL '30 days'
  AND NOT EXISTS (
    SELECT 1 FROM events e WHERE e.user_id = u.user_id
  );`,
        difficulty: 'easy',
        tags: ['LEFT JOIN', 'NOT EXISTS', 'Anti-join'],
      },
      {
        id: 'sql-q5',
        question: 'Calculate the 7-day rolling average of daily active users (DAU) for the past 90 days.',
        hint: 'Use a window function with ROWS BETWEEN to define the rolling window.',
        answer: `WITH daily_dau AS (
  SELECT
    event_date,
    COUNT(DISTINCT user_id) AS dau
  FROM events
  WHERE event_date >= CURRENT_DATE - INTERVAL '90 days'
  GROUP BY event_date
)
SELECT
  event_date,
  dau,
  AVG(dau) OVER (
    ORDER BY event_date
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ) AS rolling_7d_avg
FROM daily_dau
ORDER BY event_date;`,
        difficulty: 'medium',
        tags: ['Rolling average', 'Window functions', 'DAU'],
      },
      {
        id: 'sql-q6',
        question: 'Write a query to detect users who churned — defined as users who were active in month M-2 but not in month M-1.',
        hint: 'You need to compare activity across two different time windows per user. A self-join or CTEs comparing two monthly aggregations work well.',
        answer: `WITH monthly_active AS (
  SELECT
    user_id,
    DATE_TRUNC('month', event_date) AS activity_month
  FROM events
  GROUP BY 1, 2
),
prev_month AS (
  SELECT user_id FROM monthly_active
  WHERE activity_month = DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '2 months'
),
curr_month AS (
  SELECT user_id FROM monthly_active
  WHERE activity_month = DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '1 month'
)
SELECT p.user_id
FROM prev_month p
LEFT JOIN curr_month c ON p.user_id = c.user_id
WHERE c.user_id IS NULL;`,
        difficulty: 'hard',
        tags: ['Churn', 'Anti-join', 'Cohort analysis'],
      },
    ],
  },
};
