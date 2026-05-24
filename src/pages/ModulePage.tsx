import { useOutletContext, Navigate } from 'react-router-dom';
import { modules } from '@/content';
import type { ModuleSlug } from '@/types/content';
import IntroductionSection from '@/components/module/IntroductionSection';
import CoreConceptsSection from '@/components/module/CoreConceptsSection';
import WorkedExamplesSection from '@/components/module/WorkedExamplesSection';
import InterviewExamplesSection from '@/components/module/InterviewExamplesSection';
import PracticeQuestionsSection from '@/components/module/PracticeQuestionsSection';

export default function ModulePage() {
  const { moduleSlug } = useOutletContext<{ moduleSlug: ModuleSlug }>();
  const mod = modules.find((m) => m.slug === moduleSlug);

  if (!mod) return <Navigate to="/" replace />;

  return (
    <div className="space-y-16">
      <section id="introduction">
        <IntroductionSection data={mod.introduction} moduleTitle={mod.title} />
      </section>
      <section id="core-concepts">
        <CoreConceptsSection data={mod.coreConcepts} />
      </section>
      <section id="worked-examples">
        <WorkedExamplesSection data={mod.workedExamples} />
      </section>
      <section id="interview-examples">
        <InterviewExamplesSection data={mod.interviewExamples} />
      </section>
      <section id="practice-questions">
        <PracticeQuestionsSection data={mod.practiceQuestions} />
      </section>
    </div>
  );
}
