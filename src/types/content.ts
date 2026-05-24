export type ModuleSlug = 'product-sense' | 'experimentation' | 'statistics' | 'sql';

export type SectionSlug =
  | 'introduction'
  | 'core-concepts'
  | 'worked-examples'
  | 'interview-examples'
  | 'practice-questions';

export interface ContentBlock {
  heading?: string;
  body: string;
  callout?: string;
}

export interface Example {
  title: string;
  context: string;
  steps: string[];
  answer: string;
  tags?: string[];
}

export interface PracticeQuestion {
  id: string;
  question: string;
  hint?: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags?: string[];
}

export interface Introduction {
  overview: string;
  whyItMatters: string;
  whatYoullLearn: string[];
}

export interface CoreConcepts {
  concepts: ContentBlock[];
}

export interface WorkedExamples {
  examples: Example[];
}

export interface InterviewExamples {
  scenarios: Example[];
}

export interface PracticeQuestions {
  questions: PracticeQuestion[];
}

export interface Module {
  slug: ModuleSlug;
  title: string;
  description: string;
  icon: string;
  introduction: Introduction;
  coreConcepts: CoreConcepts;
  workedExamples: WorkedExamples;
  interviewExamples: InterviewExamples;
  practiceQuestions: PracticeQuestions;
}
