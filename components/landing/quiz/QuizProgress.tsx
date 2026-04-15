type QuizProgressProps = {
  current: number;
  total: number;
};

export function QuizProgress({ current, total }: QuizProgressProps) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs font-medium text-neutral-500">
        <span>
          Question {current} of {total}
        </span>
        <span className="tabular-nums text-neutral-400">{pct}%</span>
      </div>
      <div
        className="mt-2 h-1 overflow-hidden rounded-full bg-neutral-100"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`Question ${current} of ${total}`}
      >
        <div
          className="h-full rounded-full bg-neutral-900 transition-[width] duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
