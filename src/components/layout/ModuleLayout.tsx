import { Outlet } from 'react-router-dom';
import type { ModuleSlug } from '@/types/content';
import Shell from './Shell';
import Sidebar from './Sidebar';

interface ModuleLayoutProps {
  moduleSlug: ModuleSlug;
  moduleTitle: string;
}

export default function ModuleLayout({ moduleSlug, moduleTitle }: ModuleLayoutProps) {
  return (
    <Shell hero={
      <div className="px-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {moduleTitle}
        </h1>
      </div>
    }>
      <div className="flex gap-8 py-8">
        <Sidebar moduleSlug={moduleSlug} moduleTitle={moduleTitle} />
        <main className="min-w-0 flex-1">
          <Outlet context={{ moduleSlug }} />
        </main>
      </div>
    </Shell>
  );
}
