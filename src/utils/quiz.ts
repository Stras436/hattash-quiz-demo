import { questions } from '../data/questions';
import type { QuizResult } from '../types/quiz';

export const formatTime = (seconds: number) => {
  const safeSeconds = Math.max(0, seconds);
  const minutes = Math.floor(safeSeconds / 60).toString().padStart(2, '0');
  const remaining = (safeSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remaining}`;
};

export const calculateResult = (studentName: string, answers: Record<number, number>): QuizResult => {
  const correct = questions.filter((q) => answers[q.id] === q.correctAnswer).length;
  const unanswered = questions.filter((q) => answers[q.id] === undefined).length;
  const wrong = questions.length - correct - unanswered;
  const percentage = Math.round((correct / questions.length) * 100);
  return { studentName, score: correct, total: questions.length, percentage, correct, wrong, unanswered, answers, completedAt: new Date().toISOString() };
};

export const getEvaluation = (percentage: number) => {
  if (percentage >= 90) return 'ممتاز جدًا! أداء يدل على تركيز وفهم عميق.';
  if (percentage >= 75) return 'جيد جدًا! أنت قريب من الإتقان مع مراجعة بسيطة.';
  if (percentage >= 60) return 'جيد، واصل التدريب وراجع الأسئلة التي أخطأت فيها.';
  return 'تحتاج إلى مزيد من التدريب، ابدأ بالمراجعة ثم أعد المحاولة.';
};
