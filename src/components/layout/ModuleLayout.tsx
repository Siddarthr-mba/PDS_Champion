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
    <Shell>
      <div className="flex gap-8 py-8">
        <Sidebar moduleSlug={moduleSlug} moduleTitle={moduleTitle} />
        <main className="min-w-0 flex-1">
          <Outlet context={{ moduleSlug }} />
        </main>
      </div>
    </Shell>
  );
}
