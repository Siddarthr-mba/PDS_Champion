import { CheckCircle2 } from 'lucide-react';
import type { Introduction } from '@/types/content';

interface Props {
  data: Introduction;
  moduleTitle: string;
}

export default function IntroductionSection({ data, moduleTitle }: Props) {
  return (
    <div className="space-y-10 py-4">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#f7941d]">
          Introduction
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#1e3461] sm:text-4xl">
          {moduleTitle}
        </h1>
      </div>

      <section>
        <p className="text-lg leading-relaxed text-gray-700">
          {data.overview}
        </p>
      </section>

      <section className="rounded-2xl border border-[#1e3461]/20 bg-[#1e3461]/5 p-6">
        <h2 className="mb-2 text-base font-bold text-[#1e3461]">
          Why it matters in interviews
        </h2>
        <p className="text-sm leading-relaxed text-[#1e3461]/80">
          {data.whyItMatters}
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-bold text-[#1e3461]">
          What you'll learn
        </h2>
        <ul className="space-y-3">
          {data.whatYoullLearn.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#f7941d]" />
              <span className="text-sm leading-relaxed text-gray-700">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
