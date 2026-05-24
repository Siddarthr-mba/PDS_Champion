import type { InterviewExamples } from '@/types/content';

interface Props {
  data: InterviewExamples;
}

export default function InterviewExamplesSection({ data }: Props) {
  return (
    <div className="space-y-8 py-4">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#f7941d]">
          Interview Examples
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#1e3461]">
          Real interview scenarios
        </h1>
      </div>

      <div className="space-y-8">
        {data.scenarios.map((scenario, i) => (
          <article
            key={i}
            className="rounded-2xl border border-gray-200 bg-white"
          >
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    Scenario {i + 1}
                  </span>
                  <h2 className="mt-0.5 text-base font-bold text-[#1e3461]">
                    {scenario.title}
                  </h2>
                </div>
                {scenario.tags && scenario.tags.length > 0 && (
                  <div className="flex shrink-0 flex-wrap gap-1">
                    {scenario.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#f7941d]/10 px-2 py-0.5 text-xs font-semibold text-[#f7941d]"
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
                  Interviewer prompt
                </p>
                <p className="mt-1 text-sm italic leading-relaxed text-gray-700">
                  "{scenario.context}"
                </p>
              </div>

              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-400">
                  Strong answer — step by step
                </p>
                <ol className="space-y-3">
                  {scenario.steps.map((step, j) => (
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
                  Why this answer lands
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[#1e3461]">
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
