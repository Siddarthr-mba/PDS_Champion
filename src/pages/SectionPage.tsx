import { useParams, Navigate } from 'react-router-dom';
import { modules } from '@/content';
import type { ModuleSlug, SectionSlug } from '@/types/content';
import IntroductionSection from '@/components/module/IntroductionSection';
import CoreConceptsSection from '@/components/module/CoreConceptsSection';
import WorkedExamplesSection from '@/components/module/WorkedExamplesSection';
import InterviewExamplesSection from '@/components/module/InterviewExamplesSection';
import PracticeQuestionsSection from '@/components/module/PracticeQuestionsSection';

const VALID_SECTIONS: SectionSlug[] = [
  'introduction',
  'core-concepts',
  'worked-examples',
  'interview-examples',
  'practice-questions',
];

export default function SectionPage() {
  const { module: moduleSlug, section: sectionSlug } = useParams<{
    module: ModuleSlug;
    section: SectionSlug;
  }>();

  const mod = modules.find((m) => m.slug === moduleSlug);

  if (!mod || !sectionSlug || !VALID_SECTIONS.includes(sectionSlug)) {
    return <Navigate to="/" replace />;
  }

  switch (sectionSlug) {
    case 'introduction':
      return (
        <IntroductionSection data={mod.introduction} moduleTitle={mod.title} />
      );
    case 'core-concepts':
      return <CoreConceptsSection data={mod.coreConcepts} />;
    case 'worked-examples':
      return <WorkedExamplesSection data={mod.workedExamples} />;
    case 'interview-examples':
      return <InterviewExamplesSection data={mod.interviewExamples} />;
    case 'practice-questions':
      return <PracticeQuestionsSection data={mod.practiceQuestions} />;
  }
}
