import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ModuleSlug, SectionSlug } from '@/types/content';

interface ModuleCardProps {
  slug: ModuleSlug;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;       // Tailwind bg color class for the icon well
  tags: string[];
  sections: { slug: SectionSlug; label: string }[];
}

export default function ModuleCard({
  slug,
  title,
  description,
  icon: Icon,
  color,
  tags,
  sections,
}: ModuleCardProps) {
  return (
    <article className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      {/* Icon + title */}
      <div className="mb-4 flex items-start gap-4">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${color}`}>
          <Icon className="h-5 w-5 text-white" strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-lg font-bold leading-snug text-gray-900 dark:text-white">
            {title}
          </h2>
          <div className="mt-1 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="mb-5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        {description}
      </p>

      {/* Section list */}
      <ul className="mb-6 space-y-1.5">
        {sections.map(({ slug: sectionSlug, label }) => (
          <li key={sectionSlug}>
            <Link
              to={`/${slug}/${sectionSlug}`}
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300 dark:bg-gray-600" />
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-auto">
        <Link
          to={`/${slug}/introduction`}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
        >
          Start learning
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
