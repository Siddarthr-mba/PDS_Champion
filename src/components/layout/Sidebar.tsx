import { NavLink } from 'react-router-dom';
import type { ModuleSlug, SectionSlug } from '@/types/content';

const sections: { slug: SectionSlug; label: string }[] = [
  { slug: 'introduction', label: 'Introduction' },
  { slug: 'core-concepts', label: 'Core Concepts' },
  { slug: 'worked-examples', label: 'Worked Examples' },
  { slug: 'interview-examples', label: 'Interview Examples' },
  { slug: 'practice-questions', label: 'Practice Questions' },
];

interface SidebarProps {
  moduleSlug: ModuleSlug;
  moduleTitle: string;
}

export default function Sidebar({ moduleSlug, moduleTitle }: SidebarProps) {
  return (
    <aside className="hidden w-56 shrink-0 lg:block">
      <div className="sticky top-20 space-y-1">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
          {moduleTitle}
        </p>
        {sections.map(({ slug, label }) => (
          <NavLink
            key={slug}
            to={`/${moduleSlug}/${slug}`}
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-purple-50 text-[#aa3bff] dark:bg-purple-950/40 dark:text-purple-300'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
