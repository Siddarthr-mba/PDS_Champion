import type { CoreConcepts } from '@/types/content';

interface Props {
  data: CoreConcepts;
}

export default function CoreConceptsSection({ data }: Props) {
  return (
    <div className="space-y-8 py-4">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#f7941d]">
          Core Concepts
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#1e3461]">
          Key ideas to know cold
        </h1>
      </div>

      <div className="space-y-5">
        {data.concepts.map((concept, i) => (
          <article
            key={i}
            className="rounded-2xl border border-gray-200 bg-white p-6"
          >
            {concept.heading && (
              <h2 className="mb-3 text-base font-bold text-[#1e3461]">
                {concept.heading}
              </h2>
            )}
            <p className="text-sm leading-relaxed text-gray-700">
              {concept.body}
            </p>
            {concept.callout && (
              <div className="mt-4 rounded-xl border border-[#f7941d]/30 bg-[#f7941d]/10 px-4 py-3">
                <p className="text-xs font-semibold text-[#1e3461]">
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
