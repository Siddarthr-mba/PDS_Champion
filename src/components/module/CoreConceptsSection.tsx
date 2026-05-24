import type { CoreConcepts } from '@/types/content';

interface Props {
  data: CoreConcepts;
}

export default function CoreConceptsSection({ data }: Props) {
  return (
    <div className="space-y-8 py-4">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#aa3bff]">
          Core Concepts
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Key ideas to know cold
        </h1>
      </div>

      <div className="space-y-5">
        {data.concepts.map((concept, i) => (
          <article
            key={i}
            className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
          >
            {concept.heading && (
              <h2 className="mb-3 text-base font-bold text-gray-900 dark:text-white">
                {concept.heading}
              </h2>
            )}
            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {concept.body}
            </p>
            {concept.callout && (
              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-900/40 dark:bg-amber-950/30">
                <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">
                  💡 {concept.callout}
                </p>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
