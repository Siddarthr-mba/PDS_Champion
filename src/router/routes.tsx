import { Routes, Route } from 'react-router-dom';
import Shell from '@/components/layout/Shell';
import ModuleLayout from '@/components/layout/ModuleLayout';
import Home from '@/pages/Home';
import SectionPage from '@/pages/SectionPage';

const MODULE_LANDING = (
  <div className="py-8 text-sm text-gray-500">
    Select a section from the sidebar to get started.
  </div>
);

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Shell>
            <Home />
          </Shell>
        }
      />

      <Route
        path="/product-sense"
        element={<ModuleLayout moduleSlug="product-sense" moduleTitle="Product Sense" />}
      >
        <Route index element={MODULE_LANDING} />
        <Route path=":section" element={<SectionPage />} />
      </Route>

      <Route
        path="/experimentation"
        element={<ModuleLayout moduleSlug="experimentation" moduleTitle="Experimentation" />}
      >
        <Route index element={MODULE_LANDING} />
        <Route path=":section" element={<SectionPage />} />
      </Route>

      <Route
        path="/statistics"
        element={<ModuleLayout moduleSlug="statistics" moduleTitle="Statistics" />}
      >
        <Route index element={MODULE_LANDING} />
        <Route path=":section" element={<SectionPage />} />
      </Route>

      <Route
        path="/sql"
        element={<ModuleLayout moduleSlug="sql" moduleTitle="SQL" />}
      >
        <Route index element={MODULE_LANDING} />
        <Route path=":section" element={<SectionPage />} />
      </Route>
    </Routes>
  );
}

