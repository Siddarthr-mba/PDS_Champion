import type { WorkedExamples } from '@/types/content';

interface Props {
  data: WorkedExamples;
}

export default function WorkedExamplesSection({ data }: Props) {
  return (
    <div className="space-y-8 py-4">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#f7941d]">
          Worked Examples
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#1e3461]">
          Step-by-step solutions
        </h1>
      </div>

      <div className="space-y-8">
        {data.examples.map((example, i) => (
          <article
            key={i}
            className="rounded-2xl border border-gray-200 bg-white"
          >
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    Example {i + 1}
                  </span>
                  <h2 className="mt-0.5 text-base font-bold text-[#1e3461]">
                    {example.title}
                  </h2>
                </div>
                {example.tags && example.tags.length > 0 && (
                  <div className="flex shrink-0 flex-wrap gap-1">
                    {example.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#f4f6f9] px-2 py-0.5 text-xs font-medium text-[#1e3461]/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-5 p-6">
              <div className="rounded-xl bg-[#f4f6f9] p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                  Scenario
                </p>
                <p className="mt-1 text-sm leading-relaxed text-gray-700">
                  {example.context}
                </p>
              </div>

              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-400">
                  Solution
                </p>
                <ol className="space-y-3">
                  {example.steps.map((step, j) => (
                    <li key={j} className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f7941d]/15 text-xs font-bold text-[#f7941d]">
                        {j + 1}
                      </span>
                      <p className="text-sm leading-relaxed text-gray-700">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-xl border border-[#1e3461]/20 bg-[#1e3461]/5 px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wide text-[#1e3461]/60">
                  Conclusion
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[#1e3461]">
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
