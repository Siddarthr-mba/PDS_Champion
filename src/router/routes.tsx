import { Routes, Route } from 'react-router-dom';
import Shell from '@/components/layout/Shell';
import ModuleLayout from '@/components/layout/ModuleLayout';
import Home from '@/pages/Home';
import ModulePage from '@/pages/ModulePage';

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
        <Route index element={<ModulePage />} />
      </Route>

      <Route
        path="/experimentation"
        element={<ModuleLayout moduleSlug="experimentation" moduleTitle="Experimentation" />}
      >
        <Route index element={<ModulePage />} />
      </Route>

      <Route
        path="/statistics"
        element={<ModuleLayout moduleSlug="statistics" moduleTitle="Statistics" />}
      >
        <Route index element={<ModulePage />} />
      </Route>

      <Route
        path="/sql"
        element={<ModuleLayout moduleSlug="sql" moduleTitle="SQL" />}
      >
        <Route index element={<ModulePage />} />
      </Route>
    </Routes>
  );
}

