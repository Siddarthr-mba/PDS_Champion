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
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      {/* Main bar */}
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-3 items-center px-4 sm:px-6">

        {/* LEFT — PrepVector logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/prepvector-logo.jpeg"
              alt="PrepVector"
              className="h-9 w-auto object-contain"
            />
          </Link>
        </div>

        {/* CENTER — Product name */}
        <div className="flex justify-center">
          <Link to="/" className="text-center">
            <span className="block text-lg font-bold leading-tight tracking-tight text-[#1e3461]">
              PDS Champion
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-widest text-[#f7941d]">
              by PrepVector
            </span>
          </Link>
        </div>

        {/* RIGHT — Module nav (desktop) */}
        <nav className="hidden items-center justify-end gap-1 md:flex">
          {modules.map(({ slug, label }) => {
            const active = pathname.startsWith(`/${slug}`);
            return (
              <Link
                key={slug}
                to={`/${slug}`}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                  active
                    ? 'bg-[#1e3461] text-white'
                    : 'text-[#1e3461] hover:bg-[#1e3461]/10'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT — Mobile toggle */}
        <div className="flex justify-end md:hidden">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-md text-[#1e3461] hover:bg-[#1e3461]/10"
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
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav className="border-t border-gray-200 bg-white px-4 pb-3 md:hidden">
          {modules.map(({ slug, label }) => {
            const active = pathname.startsWith(`/${slug}`);
            return (
              <Link
                key={slug}
                to={`/${slug}`}
                onClick={() => setMenuOpen(false)}
                className={`block rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? 'text-[#f7941d]'
                    : 'text-[#1e3461] hover:text-[#f7941d]'
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
