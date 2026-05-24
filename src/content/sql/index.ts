import type { Module } from '@/types/content';

export const sqlModule: Module = {
  slug: 'sql',
  title: 'SQL',
  description:
    'Go beyond basic queries — window functions, CTEs, self-joins, and data modeling patterns that appear in real DS interviews.',
  icon: 'Database',
  introduction: {
    overview:
      'SQL is the lingua franca of data. In DS interviews, you are expected to write clean, efficient queries — and to reason about data modeling, query performance, and edge cases.',
    whyItMatters:
      'Almost every DS interview includes a SQL coding question. Strong candidates write readable, well-structured queries using modern SQL features and explain their reasoning as they go.',
    whatYoullLearn: [
      'Write window functions for ranking, running totals, and lag/lead analysis',
      'Use CTEs to structure complex multi-step queries',
      'Identify and handle NULLs, duplicates, and edge cases correctly',
      'Model common product analytics tables (events, users, sessions)',
      'Optimise queries by understanding how joins and aggregations are executed',
    ],
  },
  coreConcepts: {
    concepts: [
      {
        heading: 'Window functions',
        body: 'Window functions compute a value for each row using a "window" of related rows, without collapsing the result set like GROUP BY. Common functions: ROW_NUMBER(), RANK(), DENSE_RANK(), LAG(), LEAD(), SUM() OVER(), AVG() OVER(). The PARTITION BY clause defines the window; ORDER BY controls the ordering within it.',
        callout: 'ROW_NUMBER() assigns a unique rank even for ties. RANK() leaves gaps after ties. DENSE_RANK() does not leave gaps — know the difference.',
      },
      {
        heading: 'CTEs (Common Table Expressions)',
        body: 'A CTE (WITH clause) defines a named temporary result set you can reference in the main query. Use CTEs to break complex queries into readable steps — one CTE per logical transformation. Recursive CTEs can traverse hierarchies like org charts or follower graphs.',
      },
      {
        heading: 'NULL handling',
        body: 'NULL represents an unknown value. Any comparison with NULL (=, !=, >, <) evaluates to NULL, not TRUE or FALSE. Use IS NULL / IS NOT NULL to filter NULLs. Aggregations (SUM, AVG, COUNT) ignore NULLs — COUNT(*) counts all rows, COUNT(col) counts non-NULL values.',
        callout: 'Forgetting NULL handling is one of the most common SQL interview mistakes. Always consider: can this column be NULL?',
      },
    ],
  },
  workedExamples: {
    examples: [
      {
        title: 'Find the second-highest salary per department',
        context: 'You have a table: employees(id, name, department, salary). Return the employee(s) with the second-highest salary in each department.',
        steps: [
          'Use DENSE_RANK() to rank employees within each department by salary descending.',
          'Wrap in a CTE to keep the query readable.',
          'Filter to rank = 2 in the outer query.',
          'Use DENSE_RANK (not ROW_NUMBER) so that tied salaries share the same rank — two employees with the same top salary both rank 1, making the next unique salary rank 2.',
        ],
        answer: `WITH ranked AS (
  SELECT *, DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rnk
  FROM employees
)
SELECT id, name, department, salary
FROM ranked
WHERE rnk = 2;`,
        tags: ['Window functions', 'DENSE_RANK', 'CTE'],
      },
    ],
  },
  interviewExamples: {
    scenarios: [
      {
        title: 'Calculate 7-day rolling retention',
        context: 'You have a table: events(user_id, event_date). Define Day-7 retention as: a user who was active on day 0 is also active on day 7. Write a query to calculate the Day-7 retention rate for each cohort date.',
        steps: [
          'Find each user\'s first active date (cohort date) with MIN(event_date).',
          'Join the events table back to itself on user_id where the second event_date = first_date + 7.',
          'Group by cohort date and compute: COUNT(retained_users) / COUNT(cohort_users).',
          'Handle NULLs from the LEFT JOIN — users with no day-7 event will have a NULL second date.',
        ],
        answer: `WITH cohorts AS (
  SELECT user_id, MIN(event_date) AS cohort_date
  FROM events
  GROUP BY user_id
),
retained AS (
  SELECT c.user_id, c.cohort_date
  FROM cohorts c
  JOIN events e ON c.user_id = e.user_id
    AND e.event_date = c.cohort_date + INTERVAL '7 days'
)
SELECT
  c.cohort_date,
  COUNT(DISTINCT c.user_id) AS cohort_size,
  COUNT(DISTINCT r.user_id) AS retained,
  ROUND(COUNT(DISTINCT r.user_id)::numeric / COUNT(DISTINCT c.user_id), 4) AS retention_rate
FROM cohorts c
LEFT JOIN retained r ON c.user_id = r.user_id
GROUP BY c.cohort_date
ORDER BY c.cohort_date;`,
        tags: ['Retention', 'Cohort analysis', 'Self-join'],
      },
    ],
  },
  practiceQuestions: {
    questions: [
      {
        id: 'sql-q1',
        question: 'Given a table sessions(session_id, user_id, started_at, ended_at), write a query to find all users who had two consecutive sessions with less than 5 minutes between them.',
        hint: 'Use LAG() or a self-join to compare each session with the previous one for the same user.',
        answer: `WITH ordered AS (
  SELECT *,
    LAG(ended_at) OVER (PARTITION BY user_id ORDER BY started_at) AS prev_ended_at
  FROM sessions
)
SELECT DISTINCT user_id
FROM ordered
WHERE started_at - prev_ended_at < INTERVAL '5 minutes';`,
        difficulty: 'medium',
        tags: ['LAG', 'Window functions', 'Self-join'],
      },
      {
        id: 'sql-q2',
        question: 'What is the difference between WHERE and HAVING? When would you use each?',
        hint: 'Think about when each clause is evaluated in the query execution order.',
        answer: 'WHERE filters rows before aggregation — it operates on individual rows and cannot reference aggregate functions. HAVING filters groups after aggregation — it can reference aggregate functions like SUM(), COUNT(). Use WHERE to filter raw data; use HAVING to filter the results of a GROUP BY.',
        difficulty: 'easy',
        tags: ['WHERE', 'HAVING', 'Aggregation'],
      },
    ],
  },
};
