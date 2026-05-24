import { Lightbulb, FlaskConical, BarChart2, Database } from 'lucide-react';
import ModuleCard from '@/components/module/ModuleCard';
import type { ModuleSlug, SectionSlug } from '@/types/content';
import type { LucideIcon } from 'lucide-react';

const sections: { slug: SectionSlug; label: string }[] = [
  { slug: 'introduction', label: 'Introduction' },
  { slug: 'core-concepts', label: 'Core Concepts' },
  { slug: 'worked-examples', label: 'Worked Examples' },
  { slug: 'interview-examples', label: 'Interview Examples' },
  { slug: 'practice-questions', label: 'Practice Questions' },
];

interface ModuleMeta {
  slug: ModuleSlug;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  tags: string[];
}

const moduleMeta: ModuleMeta[] = [
  {
    slug: 'product-sense',
    title: 'Product Sense',
    description:
      'Learn to think like a PM — diagnose metric drops, design features, evaluate trade-offs, and tell compelling stories with data.',
    icon: Lightbulb,
    color: 'bg-amber-500',
    tags: ['Metrics', 'Root cause', 'Trade-offs'],
  },
  {
    slug: 'experimentation',
    title: 'Experimentation',
    description:
      'Master A/B testing end-to-end: hypothesis design, sample size calculation, guardrail metrics, and interpreting results under uncertainty.',
    icon: FlaskConical,
    color: 'bg-[#aa3bff]',
    tags: ['A/B testing', 'Power', 'p-values'],
  },
  {
    slug: 'statistics',
    title: 'Statistics',
    description:
      'Build the statistical intuition interviewers expect — probability, distributions, hypothesis testing, regression, and Bayesian thinking.',
    icon: BarChart2,
    color: 'bg-sky-500',
    tags: ['Probability', 'Inference', 'Regression'],
  },
  {
    slug: 'sql',
    title: 'SQL',
    description:
      'Go beyond basic queries — window functions, CTEs, self-joins, and data modeling patterns that appear in real DS interviews.',
    icon: Database,
    color: 'bg-emerald-500',
    tags: ['Window functions', 'CTEs', 'Joins'],
  },
];

export default function Home() {
  return (
    <div className="py-14">
      {/* Hero */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Ace your{' '}
          <span className="text-[#aa3bff]">Product Data Science</span>{' '}
          interview
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-gray-500 dark:text-gray-400">
          Structured prep across the four domains that matter most — from core
          concepts to real interview examples.
        </p>
      </div>

      {/* Module grid */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {moduleMeta.map((mod) => (
          <ModuleCard key={mod.slug} {...mod} sections={sections} />
        ))}
      </div>
    </div>
  );
}


