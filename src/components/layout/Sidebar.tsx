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
        <p className="mb-3 px-3 text-xs font-bold uppercase tracking-widest text-[#1e3461]/50">
          {moduleTitle}
        </p>
        {sections.map(({ slug, label }) => (
          <NavLink
            key={slug}
            to={`/${moduleSlug}/${slug}`}
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#1e3461] text-white'
                  : 'text-[#1e3461] hover:bg-[#1e3461]/10'
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
