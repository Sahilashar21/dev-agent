// Dev Agent - Types

// Roadmap paths
export type TopicPath =
  | 'html'
  | 'css'
  | 'javascript'
  | 'react'
  | 'libraries'
  | 'styling'
  | 'node'
  | 'express'
  | 'database'
  | 'authentication'
  | 'api'
  | 'errorHandling'
  | 'frontend'
  | 'backend'
  | 'devops'
  | 'security'
  | 'architecture'
  | 'deploy'
  | 'arrays'
  | 'strings'
  | 'recursion'
  | 'linkedlists'
  | 'trees'
  | 'graphs'
  | 'dp';

export interface TopicData {
  title: string;
  description: string;
  learn: string[];
  realWorld: string;
  project: string;
  links: { label: string; url: string }[];
}

export interface RoadmapStep {
  title: string;
  description: string;
  path: TopicPath;
}

// Navigation stack params (React Navigation v6)
// types.ts
export type RootStackParamList = {
  Home: undefined;
  Roadmap: { topic: string };
  Quiz: { quizId: string };
  QuizAdmin: undefined;
  AddQuiz: undefined;
  ViewQuizzes: undefined;
  QuizDetails: { quizId: string };
  QuizQuestions: { quizId: string }; // ✅ Required param
  TutorChatbot: undefined;
  DSAMastery: undefined;
  Tutorials: undefined;
  News: undefined;
  QuizHome: undefined;
};
