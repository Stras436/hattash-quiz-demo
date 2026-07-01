export function ProgressBar({ value }: { value: number }) {
  return <div className="progress" aria-label="نسبة التقدم"><span style={{ width: `${Math.min(100, Math.max(0, value))}%` }} /></div>;
}
