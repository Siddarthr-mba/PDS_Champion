import type { InterviewExamples } from '@/types/content';

interface Props {
  data: InterviewExamples;
}

export default function InterviewExamplesSection({ data }: Props) {
  return (
    <div className="space-y-8 py-4">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#aa3bff]">
          Interview Examples
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Real interview scenarios
        </h1>
      </div>

      <div className="space-y-8">
        {data.scenarios.map((scenario, i) => (
          <article
            key={i}
            className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
          >
            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                    Scenario {i + 1}
                  </span>
                  <h2 className="mt-0.5 text-base font-bold text-gray-900 dark:text-white">
                    {scenario.title}
                  </h2>
                </div>
                {scenario.tags && scenario.tags.length > 0 && (
                  <div className="flex shrink-0 flex-wrap gap-1">
                    {scenario.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-600 dark:bg-purple-950/40 dark:text-purple-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-5 p-6">
              {/* Interviewer prompt */}
              <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800/50">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Interviewer prompt
                </p>
                <p className="mt-1 text-sm italic leading-relaxed text-gray-700 dark:text-gray-300">
                  "{scenario.context}"
                </p>
              </div>

              {/* Strong answer walkthrough */}
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Strong answer — step by step
                </p>
                <ol className="space-y-3">
                  {scenario.steps.map((step, j) => (
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

              {/* What makes this answer strong */}
              <div className="rounded-xl border border-purple-200 bg-purple-50 px-4 py-3 dark:border-purple-900/40 dark:bg-purple-950/30">
                <p className="text-xs font-semibold uppercase tracking-wide text-purple-700 dark:text-purple-400">
                  Why this answer lands
                </p>
                <p className="mt-1 text-sm leading-relaxed text-purple-800 dark:text-purple-200">
                  {scenario.answer}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
