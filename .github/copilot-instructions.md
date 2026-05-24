# Copilot Instructions — PDS Champion

## Project Overview

**PDS Champion** is a static educational platform for Product Data Science (PDS) interview preparation. It has no backend, database, or authentication — all content is authored directly in the codebase.

## Stack

- **React 18** with **TypeScript** (strict mode)
- **Vite** — build tool and dev server
- **TailwindCSS** — utility-first styling
- **React Router v6** — client-side routing (static, no server-side rendering)

## Commands

```bash
npm run dev        # Start Vite dev server
npm run build      # Production build (outputs to dist/)
npm run preview    # Preview the production build locally
npm run lint       # Run ESLint
```

## Architecture

### Modules

The platform has four learning modules, each with identical internal structure:

| Module | Slug |
|---|---|
| Product Sense | `product-sense` |
| Experimentation | `experimentation` |
| Statistics | `statistics` |
| SQL | `sql` |

Each module exposes five section types:

1. `introduction` — high-level overview
2. `core-concepts` — key ideas and definitions
3. `worked-examples` — step-by-step solved problems
4. `interview-examples` — real-world interview scenarios with annotated answers
5. `practice-questions` — unsolved questions (reveal-on-demand answers)

### Folder Structure

```
src/
  components/        # Shared, reusable UI components
    ui/              # Primitive components (Button, Card, Badge, etc.)
    layout/          # Shell, Navbar, Sidebar, Footer
    module/          # ModuleCard, SectionNav, ProgressBar, etc.
  pages/             # Route-level page components
    Home.tsx
    modules/
      [ModulePage].tsx   # One file per module
  content/           # Static content, co-located with modules
    product-sense/
    experimentation/
    statistics/
    sql/
  hooks/             # Custom React hooks
  types/             # Shared TypeScript interfaces and enums
  utils/             # Pure helper functions
  router/            # React Router config (routes.tsx)
  styles/            # Global CSS / Tailwind base overrides
```

### Routing Convention

Routes follow the pattern: `/:module/:section`

```
/                         → Home (module overview cards)
/product-sense            → Module landing page
/product-sense/introduction
/product-sense/core-concepts
/product-sense/worked-examples
/product-sense/interview-examples
/product-sense/practice-questions
```

## Key Conventions

### TypeScript

- Strict mode is enabled — no `any`, no implicit `any`, no non-null assertion shortcuts.
- Define shared types in `src/types/`. Import them explicitly; avoid re-declaring inline.
- Use `interface` for object shapes, `type` for unions and utility types.

### Components

- All components are functional with explicit `React.FC<Props>` typing.
- Keep components small and single-purpose. Extract sub-components if JSX exceeds ~80 lines.
- Place shared primitives in `src/components/ui/`. Never duplicate a primitive inline.
- Props interfaces are defined in the same file as the component (no separate `.types.ts` unless shared).

### Content

- Content lives in `src/content/[module]/` as TypeScript objects (not markdown files).
- Each section type has a typed schema defined in `src/types/content.ts`.
- Practice questions include a `question`, `hint` (optional), and `answer` field; answers are hidden by default and revealed on user interaction.

#### Content Schema (`src/types/content.ts`)

```ts
export type ModuleSlug = 'product-sense' | 'experimentation' | 'statistics' | 'sql';

export type SectionSlug =
  | 'introduction'
  | 'core-concepts'
  | 'worked-examples'
  | 'interview-examples'
  | 'practice-questions';

// Shared building blocks
export interface ContentBlock {
  heading?: string;
  body: string;          // plain text or inline markdown
  callout?: string;      // tip/note highlighted separately
}

export interface Example {
  title: string;
  context: string;       // problem setup / scenario
  steps: string[];       // ordered explanation steps
  answer: string;        // final answer / conclusion
  tags?: string[];       // e.g. ['A/B test', 'p-value']
}

export interface PracticeQuestion {
  id: string;            // unique within the module, e.g. 'exp-q1'
  question: string;
  hint?: string;
  answer: string;        // revealed on demand — never shown by default
  difficulty: 'easy' | 'medium' | 'hard';
  tags?: string[];
}

// Per-section shapes
export interface Introduction {
  overview: string;
  whyItMatters: string;
  whatYoullLearn: string[];
}

export interface CoreConcepts {
  concepts: ContentBlock[];
}

export interface WorkedExamples {
  examples: Example[];
}

export interface InterviewExamples {
  scenarios: Example[];   // same shape as WorkedExample but interview-framed
}

export interface PracticeQuestions {
  questions: PracticeQuestion[];
}

// Top-level module definition
export interface Module {
  slug: ModuleSlug;
  title: string;
  description: string;
  icon: string;                    // Lucide icon name
  introduction: Introduction;
  coreConcepts: CoreConcepts;
  workedExamples: WorkedExamples;
  interviewExamples: InterviewExamples;
  practiceQuestions: PracticeQuestions;
}
```

Each module file exports a single `Module` object:

```ts
// src/content/experimentation/index.ts
import type { Module } from '@/types/content';

export const experimentationModule: Module = {
  slug: 'experimentation',
  title: 'Experimentation',
  // ...
};
```

All four modules are re-exported from `src/content/index.ts` as an array for easy iteration on the Home page.

### Styling

- Use Tailwind utility classes exclusively — avoid writing custom CSS unless unavoidable.
- Design language: modern, clean, inspired by PrepVector branding (bold typography, high-contrast cards, accent colors with generous white space).
- All layouts must be responsive and mobile-first. Use Tailwind's `sm:`, `md:`, `lg:` breakpoints.
- Dark/light mode support via Tailwind's `dark:` variant if implemented.

### Static Site Constraints

- No API calls, no `fetch`, no environment secrets.
- All data is imported at build time from `src/content/`.
- Navigation state (current module/section) is managed entirely via React Router URL params.
