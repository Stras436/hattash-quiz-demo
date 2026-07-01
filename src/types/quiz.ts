export type QuestionCategory = 'معلومات عامة' | 'لغة عربية' | 'منطق وتركيز' | 'علوم مبسطة' | 'مهارات رقمية عامة';

export interface Question {
  id: number;
  category: QuestionCategory;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizProgress {
  studentName: string;
  answers: Record<number, number>;
  currentQuestionIndex: number;
  timeRemaining: number;
  startedAt: string;
  completed: boolean;
}

export interface QuizResult {
  studentName: string;
  score: number;
  total: number;
  percentage: number;
  correct: number;
  wrong: number;
  unanswered: number;
  answers: Record<number, number>;
  completedAt: string;
}
