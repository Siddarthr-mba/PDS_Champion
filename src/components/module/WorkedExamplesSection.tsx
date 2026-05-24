import type { WorkedExamples } from '@/types/content';

interface Props {
  data: WorkedExamples;
}

export default function WorkedExamplesSection({ data }: Props) {
  return (
    <div className="space-y-8 py-4">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#aa3bff]">
          Worked Examples
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Step-by-step solutions
        </h1>
      </div>

      <div className="space-y-8">
        {data.examples.map((example, i) => (
          <article
            key={i}
            className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
          >
            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                    Example {i + 1}
                  </span>
                  <h2 className="mt-0.5 text-base font-bold text-gray-900 dark:text-white">
                    {example.title}
                  </h2>
                </div>
                {example.tags && example.tags.length > 0 && (
                  <div className="flex shrink-0 flex-wrap gap-1">
                    {example.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-5 p-6">
              {/* Context */}
              <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800/50">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Scenario
                </p>
                <p className="mt-1 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  {example.context}
                </p>
              </div>

              {/* Steps */}
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Solution
                </p>
                <ol className="space-y-3">
                  {example.steps.map((step, j) => (
                    <li key={j} className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#aa3bff]/10 text-xs font-bold text-[#aa3bff]">
                        {j + 1}
                      </span>
                      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Answer */}
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 dark:border-emerald-900/40 dark:bg-emerald-950/30">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                  Conclusion
                </p>
                <p className="mt-1 text-sm leading-relaxed text-emerald-800 dark:text-emerald-200">
                  {example.answer}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
