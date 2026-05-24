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
          <Shell hero={
            <div className="px-4">
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Ace your Product Data Science Interview
              </h1>
              <p className="mx-auto mt-3 max-w-xl text-base text-white/70">
                Structured prep across the four domains that matter most.
              </p>
            </div>
          }>
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

