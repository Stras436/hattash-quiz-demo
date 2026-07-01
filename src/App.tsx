import { useEffect, useMemo, useState } from 'react';
import { Layout } from './components/Layout';
import { ProgressBar } from './components/ProgressBar';
import { QUIZ_DURATION_SECONDS, questions } from './data/questions';
import type { QuizProgress, QuizResult } from './types/quiz';
import { calculateResult, formatTime, getEvaluation } from './utils/quiz';
import { clearProgress, clearResult, loadProgress, loadResult, saveProgress, saveResult } from './utils/storage';
import './styles.css';

type Page = 'home' | 'start' | 'quiz' | 'result' | 'review';

const blankProgress = (studentName = ''): QuizProgress => ({ studentName, answers: {}, currentQuestionIndex: 0, timeRemaining: QUIZ_DURATION_SECONDS, startedAt: new Date().toISOString(), completed: false });

function App() {
  const [page, setPage] = useState<Page>('home');
  const [progress, setProgress] = useState<QuizProgress>(() => loadProgress() ?? blankProgress());
  const [result, setResult] = useState<QuizResult | null>(() => loadResult());
  const [hasSavedAttempt, setHasSavedAttempt] = useState(false);
  const current = questions[progress.currentQuestionIndex] ?? questions[0];

  useEffect(() => { const saved = loadProgress(); setHasSavedAttempt(Boolean(saved && !saved.completed)); }, []);
  useEffect(() => { if (page === 'quiz') saveProgress(progress); }, [progress, page]);
  useEffect(() => {
    if (page !== 'quiz') return;
    if (progress.timeRemaining <= 0) { finishQuiz(true); return; }
    const timer = window.setInterval(() => setProgress((p) => ({ ...p, timeRemaining: p.timeRemaining - 1 })), 1000);
    return () => window.clearInterval(timer);
  }, [page, progress.timeRemaining]);

  const answeredCount = useMemo(() => questions.filter((q) => progress.answers[q.id] !== undefined).length, [progress.answers]);
  const unanswered = questions.filter((q) => progress.answers[q.id] === undefined);

  const startNew = (name = '') => { clearResult(); setResult(null); const next = blankProgress(name.trim()); setProgress(next); saveProgress(next); setPage('quiz'); setHasSavedAttempt(false); };
  const resume = () => { const saved = loadProgress(); if (saved) { setProgress(saved); setPage('quiz'); } };
  const finishQuiz = (force = false) => {
    if (!force && unanswered.length > 0 && !window.confirm(`لديك ${unanswered.length} سؤال/أسئلة غير مجابة. هل تريد إنهاء الاختبار الآن؟`)) return;
    const nextResult = calculateResult(progress.studentName, progress.answers);
    saveResult(nextResult); saveProgress({ ...progress, completed: true }); setResult(nextResult); setPage('result'); setHasSavedAttempt(false);
  };
  const reset = () => { clearProgress(); clearResult(); setProgress(blankProgress()); setResult(null); setHasSavedAttempt(false); setPage('home'); };

  return <Layout>
    {page === 'home' && <section className="hero card"><p className="eyebrow">تجربة محلية</p><h1>منصة هتّاش التعليمية</h1><p className="tagline">تأسيس قوي | فهم عميق | تفوق مستمر</p>{hasSavedAttempt && <div className="resume"><strong>لديك اختبار غير مكتمل.</strong><div><button onClick={resume}>متابعة الاختبار</button><button className="ghost" onClick={() => { clearProgress(); setHasSavedAttempt(false); setPage('start'); }}>بدء اختبار جديد</button></div></div>}<div className="quiz-card"><div><h2>الاختبار التجريبي الأول</h2><p>اختبار متنوع لقياس المعلومات العامة واللغة والتركيز والعلوم والمهارات الرقمية.</p><ul><li>{questions.length} سؤالًا</li><li>المدة: 10 دقائق</li><li>تصحيح فوري ومراجعة تفصيلية</li></ul></div><button onClick={() => setPage('start')}>ابدأ الاختبار</button></div></section>}

    {page === 'start' && <section className="card narrow"><h1>بداية الاختبار</h1><label>اسم الطالب <span>(اختياري)</span><input value={progress.studentName} onChange={(e) => setProgress((p) => ({ ...p, studentName: e.target.value }))} placeholder="اكتب اسمك هنا" /></label><div className="instructions"><h2>تعليمات مختصرة</h2><p>سيظهر سؤال واحد في كل مرة. يمكنك الانتقال بين الأسئلة، وسيتم حفظ تقدمك محليًا إذا أغلقت الصفحة.</p><p>عدد الأسئلة: <strong>{questions.length}</strong> — مدة الاختبار: <strong>10 دقائق</strong></p></div><button onClick={() => startNew(progress.studentName)}>بدء الاختبار</button><button className="ghost" onClick={() => setPage('home')}>العودة للرئيسية</button></section>}

    {page === 'quiz' && current && <section className="card quiz"><div className="quiz-head"><div><strong>السؤال {progress.currentQuestionIndex + 1} من {questions.length}</strong><p>{answeredCount} إجابة محفوظة</p></div><div className="timer">{formatTime(progress.timeRemaining)}</div></div><ProgressBar value={(answeredCount / questions.length) * 100} /><div className="jump-list">{questions.map((q, index) => <button key={q.id} className={index === progress.currentQuestionIndex ? 'active' : progress.answers[q.id] !== undefined ? 'answered' : ''} onClick={() => setProgress((p) => ({ ...p, currentQuestionIndex: index }))}>{index + 1}</button>)}</div><p className="category">{current.category}</p><h1>{current.text}</h1><div className="options">{current.options.map((option, index) => <button key={option} className={progress.answers[current.id] === index ? 'selected' : ''} onClick={() => setProgress((p) => ({ ...p, answers: { ...p.answers, [current.id]: index } }))}>{option}</button>)}</div><div className="actions"><button className="ghost" disabled={progress.currentQuestionIndex === 0} onClick={() => setProgress((p) => ({ ...p, currentQuestionIndex: p.currentQuestionIndex - 1 }))}>السابق</button>{progress.currentQuestionIndex < questions.length - 1 ? <button onClick={() => setProgress((p) => ({ ...p, currentQuestionIndex: p.currentQuestionIndex + 1 }))}>التالي</button> : <button onClick={() => finishQuiz(false)}>إنهاء الاختبار</button>}</div></section>}

    {page === 'result' && (result ?? loadResult()) && <ResultPage result={(result ?? loadResult())!} onReview={() => setPage('review')} onRetry={() => startNew(progress.studentName)} onHome={reset} />}
    {page === 'review' && (result ?? loadResult()) && <ReviewPage result={(result ?? loadResult())!} onResult={() => setPage('result')} onHome={reset} />}
  </Layout>;
}

function ResultPage({ result, onReview, onRetry, onHome }: { result: QuizResult; onReview: () => void; onRetry: () => void; onHome: () => void }) {
  return <section className="card result"><h1>نتيجة الاختبار</h1>{result.studentName && <p>الطالب: <strong>{result.studentName}</strong></p>}<div className="score">{result.score} / {result.total}<span>{result.percentage}%</span></div><div className="stats"><span>صحيحة: {result.correct}</span><span>خاطئة: {result.wrong}</span><span>غير مجابة: {result.unanswered}</span></div><p className="evaluation">{getEvaluation(result.percentage)}</p><div className="actions"><button onClick={onReview}>مراجعة الإجابات</button><button className="ghost" onClick={onRetry}>إعادة الاختبار</button><button className="ghost" onClick={onHome}>العودة للرئيسية</button></div></section>;
}

function ReviewPage({ result, onResult, onHome }: { result: QuizResult; onResult: () => void; onHome: () => void }) {
  return <section className="review"><div className="review-header"><h1>مراجعة الإجابات</h1><div><button onClick={onResult}>النتيجة</button><button className="ghost" onClick={onHome}>الرئيسية</button></div></div>{questions.map((q) => { const chosen = result.answers[q.id]; const isCorrect = chosen === q.correctAnswer; return <article className="card review-item" key={q.id}><p className="category">{q.category}</p><h2>{q.id}. {q.text}</h2><p>اختيار الطالب: <strong>{chosen === undefined ? 'لم تتم الإجابة' : q.options[chosen]}</strong></p><p>الإجابة الصحيحة: <strong>{q.options[q.correctAnswer]}</strong></p><p className={isCorrect ? 'correct' : 'wrong'}>{isCorrect ? 'إجابة صحيحة' : 'إجابة خاطئة أو غير مجابة'}</p><p className="explanation">التفسير: {q.explanation}</p></article>; })}</section>;
}

export default App;
