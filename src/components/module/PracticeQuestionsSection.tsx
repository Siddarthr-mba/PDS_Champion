import { useState } from 'react';
import { ChevronDown, Lightbulb } from 'lucide-react';
import type { PracticeQuestions } from '@/types/content';

interface Props {
  data: PracticeQuestions;
}

const difficultyStyles: Record<'easy' | 'medium' | 'hard', string> = {
  easy: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
  medium: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
  hard: 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300',
};

interface QuestionCardProps {
  question: PracticeQuestions['questions'][number];
  index: number;
}

function QuestionCard({ question, index }: QuestionCardProps) {
  const [hintOpen, setHintOpen] = useState(false);
  const [answerOpen, setAnswerOpen] = useState(false);

  return (
    <article className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      {/* Question header */}
      <div className="p-6">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-400">Q{index + 1}</span>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${difficultyStyles[question.difficulty]}`}
          >
            {question.difficulty}
          </span>
          {question.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-sm font-medium leading-relaxed text-gray-900 dark:text-white">
          {question.question}
        </p>
      </div>

      {/* Actions */}
      <div className="space-y-px border-t border-gray-200 dark:border-gray-800">
        {/* Hint */}
        {question.hint && (
          <button
            type="button"
            onClick={() => setHintOpen((o) => !o)}
            className="flex w-full items-center gap-2 px-6 py-3 text-left text-xs font-semibold text-amber-600 transition-colors hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/20"
          >
            <Lightbulb className="h-3.5 w-3.5" />
            {hintOpen ? 'Hide hint' : 'Show hint'}
            <ChevronDown
              className={`ml-auto h-3.5 w-3.5 transition-transform ${hintOpen ? 'rotate-180' : ''}`}
            />
          </button>
        )}
        {hintOpen && question.hint && (
          <div className="bg-amber-50 px-6 py-3 dark:bg-amber-950/20">
            <p className="text-xs leading-relaxed text-amber-800 dark:text-amber-200">
              {question.hint}
            </p>
          </div>
        )}

        {/* Answer */}
        <button
          type="button"
          onClick={() => setAnswerOpen((o) => !o)}
          className="flex w-full items-center gap-2 px-6 py-3 text-left text-xs font-semibold text-[#aa3bff] transition-colors hover:bg-purple-50 dark:hover:bg-purple-950/20"
        >
          {answerOpen ? 'Hide answer' : 'Reveal answer'}
          <ChevronDown
            className={`ml-auto h-3.5 w-3.5 transition-transform ${answerOpen ? 'rotate-180' : ''}`}
          />
        </button>
        {answerOpen && (
          <div className="rounded-b-2xl border-t border-purple-100 bg-purple-50 px-6 py-4 dark:border-purple-900/40 dark:bg-purple-950/30">
            <p className="text-sm leading-relaxed text-purple-900 dark:text-purple-100">
              {question.answer}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}

export default function PracticeQuestionsSection({ data }: Props) {
  const counts = data.questions.reduce(
    (acc, q) => {
      acc[q.difficulty]++;
      return acc;
    },
    { easy: 0, medium: 0, hard: 0 },
  );

  return (
    <div className="space-y-8 py-4">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#aa3bff]">
          Practice Questions
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Test your knowledge
        </h1>
      </div>

      {/* Stats bar */}
      <div className="flex flex-wrap gap-4 rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-2xl font-extrabold text-gray-900 dark:text-white">
            {data.questions.length}
          </p>
          <p className="text-xs text-gray-500">Total</p>
        </div>
        {(['easy', 'medium', 'hard'] as const).map((d) => (
          <div key={d} className="text-center">
            <p className={`text-2xl font-extrabold ${
              d === 'easy' ? 'text-emerald-600' : d === 'medium' ? 'text-amber-600' : 'text-red-600'
            }`}>
              {counts[d]}
            </p>
            <p className="text-xs capitalize text-gray-500">{d}</p>
          </div>
        ))}
      </div>

      {/* Questions */}
      <div className="space-y-5">
        {data.questions.map((q, i) => (
          <QuestionCard key={q.id} question={q} index={i} />
        ))}
      </div>
    </div>
  );
}
