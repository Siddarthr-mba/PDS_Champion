import { useState } from 'react';
import { ChevronDown, Lightbulb } from 'lucide-react';
import type { PracticeQuestions } from '@/types/content';

interface Props {
  data: PracticeQuestions;
}

const difficultyStyles: Record<'easy' | 'medium' | 'hard', string> = {
  easy: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-amber-100 text-amber-700',
  hard: 'bg-red-100 text-red-700',
};

interface QuestionCardProps {
  question: PracticeQuestions['questions'][number];
  index: number;
}

function QuestionCard({ question, index }: QuestionCardProps) {
  const [hintOpen, setHintOpen] = useState(false);
  const [answerOpen, setAnswerOpen] = useState(false);

  return (
    <article className="rounded-2xl border border-gray-200 bg-white">
      <div className="p-6">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-xs font-bold text-gray-400">Q{index + 1}</span>
          <span className={`rounded-full px-2 py-0.5 text-xs font-bold capitalize ${difficultyStyles[question.difficulty]}`}>
            {question.difficulty}
          </span>
          {question.tags?.map((tag) => (
            <span key={tag} className="rounded-full bg-[#f4f6f9] px-2 py-0.5 text-xs font-medium text-[#1e3461]/70">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-sm font-semibold leading-relaxed text-[#1e3461]">
          {question.question}
        </p>
      </div>

      <div className="space-y-px border-t border-gray-200">
        {question.hint && (
          <button
            type="button"
            onClick={() => setHintOpen((o) => !o)}
            className="flex w-full items-center gap-2 px-6 py-3 text-left text-xs font-bold text-[#f7941d] transition-colors hover:bg-[#f7941d]/5"
          >
            <Lightbulb className="h-3.5 w-3.5" />
            {hintOpen ? 'Hide hint' : 'Show hint'}
            <ChevronDown className={`ml-auto h-3.5 w-3.5 transition-transform ${hintOpen ? 'rotate-180' : ''}`} />
          </button>
        )}
        {hintOpen && question.hint && (
          <div className="bg-[#f7941d]/5 px-6 py-3">
            <p className="text-xs leading-relaxed text-gray-700">{question.hint}</p>
          </div>
        )}

        <button
          type="button"
          onClick={() => setAnswerOpen((o) => !o)}
          className="flex w-full items-center gap-2 px-6 py-3 text-left text-xs font-bold text-[#1e3461] transition-colors hover:bg-[#1e3461]/5"
        >
          {answerOpen ? 'Hide answer' : 'Reveal answer'}
          <ChevronDown className={`ml-auto h-3.5 w-3.5 transition-transform ${answerOpen ? 'rotate-180' : ''}`} />
        </button>
        {answerOpen && (
          <div className="rounded-b-2xl border-t border-[#1e3461]/10 bg-[#1e3461]/5 px-6 py-4">
            <p className="text-sm leading-relaxed text-[#1e3461]">{question.answer}</p>
          </div>
        )}
      </div>
    </article>
  );
}

export default function PracticeQuestionsSection({ data }: Props) {
  const counts = data.questions.reduce(
    (acc, q) => { acc[q.difficulty]++; return acc; },
    { easy: 0, medium: 0, hard: 0 },
  );

  return (
    <div className="space-y-8 py-4">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#f7941d]">
          Practice Questions
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#1e3461]">
          Test your knowledge
        </h1>
      </div>

      <div className="flex flex-wrap gap-4 rounded-2xl border border-gray-200 bg-white p-4">
        <div className="text-center">
          <p className="text-2xl font-extrabold text-[#1e3461]">{data.questions.length}</p>
          <p className="text-xs font-medium text-gray-400">Total</p>
        </div>
        {(['easy', 'medium', 'hard'] as const).map((d) => (
          <div key={d} className="text-center">
            <p className={`text-2xl font-extrabold ${d === 'easy' ? 'text-emerald-600' : d === 'medium' ? 'text-amber-600' : 'text-red-600'}`}>
              {counts[d]}
            </p>
            <p className="text-xs capitalize font-medium text-gray-400">{d}</p>
          </div>
        ))}
      </div>

      <div className="space-y-5">
        {data.questions.map((q, i) => (
          <QuestionCard key={q.id} question={q} index={i} />
        ))}
      </div>
    </div>
  );
}
