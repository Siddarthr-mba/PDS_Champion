import { CheckCircle2 } from 'lucide-react';
import type { Introduction } from '@/types/content';

interface Props {
  data: Introduction;
  moduleTitle: string;
}

export default function IntroductionSection({ data, moduleTitle }: Props) {
  return (
    <div className="space-y-10 py-4">
      {/* Header */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#aa3bff]">
          Introduction
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          {moduleTitle}
        </h1>
      </div>

      {/* Overview */}
      <section>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {data.overview}
        </p>
      </section>

      {/* Why it matters */}
      <section className="rounded-2xl border border-purple-200 bg-purple-50 p-6 dark:border-purple-900/50 dark:bg-purple-950/30">
        <h2 className="mb-2 text-base font-bold text-purple-900 dark:text-purple-300">
          Why it matters in interviews
        </h2>
        <p className="text-sm leading-relaxed text-purple-800 dark:text-purple-200">
          {data.whyItMatters}
        </p>
      </section>

      {/* What you'll learn */}
      <section>
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          What you'll learn
        </h2>
        <ul className="space-y-3">
          {data.whatYoullLearn.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#aa3bff]" />
              <span className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
