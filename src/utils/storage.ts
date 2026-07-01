import type { QuizProgress, QuizResult } from '../types/quiz';

const PROGRESS_KEY = 'hattash_quiz_progress';
const RESULT_KEY = 'hattash_quiz_result';

const safeParse = <T>(value: string | null): T | null => {
  if (!value) return null;
  try { return JSON.parse(value) as T; } catch { return null; }
};

export const loadProgress = () => safeParse<QuizProgress>(localStorage.getItem(PROGRESS_KEY));
export const saveProgress = (progress: QuizProgress) => localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
export const clearProgress = () => localStorage.removeItem(PROGRESS_KEY);
export const loadResult = () => safeParse<QuizResult>(localStorage.getItem(RESULT_KEY));
export const saveResult = (result: QuizResult) => localStorage.setItem(RESULT_KEY, JSON.stringify(result));
export const clearResult = () => localStorage.removeItem(RESULT_KEY);
