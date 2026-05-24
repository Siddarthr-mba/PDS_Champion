import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import type { ModuleSlug } from '@/types/content';

const modules: { slug: ModuleSlug; label: string }[] = [
  { slug: 'product-sense', label: 'Product Sense' },
  { slug: 'experimentation', label: 'Experimentation' },
  { slug: 'statistics', label: 'Statistics' },
  { slug: 'sql', label: 'SQL' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/90">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#aa3bff] text-xs font-black text-white">
            P
          </span>
          PDS Champion
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {modules.map(({ slug, label }) => {
            const active = pathname.startsWith(`/${slug}`);
            return (
              <Link
                key={slug}
                to={`/${slug}`}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-purple-50 text-[#aa3bff] dark:bg-purple-950/40 dark:text-purple-300'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="border-t border-gray-200 bg-white px-4 pb-3 dark:border-gray-800 dark:bg-gray-950 md:hidden">
          {modules.map(({ slug, label }) => {
            const active = pathname.startsWith(`/${slug}`);
            return (
              <Link
                key={slug}
                to={`/${slug}`}
                onClick={() => setMenuOpen(false)}
                className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'text-[#aa3bff] dark:text-purple-300'
                    : 'text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
