import type { RiskBand } from "./quizData";
import { getResultCopy } from "./quizData";
import { QuizCard } from "./QuizCard";

type QuizResultProps = {
  band: RiskBand;
  /** Primary actions (e.g. waitlist form) shown below the impact line. */
  children?: React.ReactNode;
};

export function QuizResult({ band, children }: QuizResultProps) {
  const { headline, body } = getResultCopy(band);

  return (
    <QuizCard className="border-neutral-200 shadow-[0_28px_70px_-28px_rgba(15,23,42,0.18)]">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
          Your snapshot
        </p>
        <h3 className="mt-4 text-balance text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
          {headline}
        </h3>
        <p className="mx-auto mt-4 max-w-md text-pretty text-base leading-relaxed text-neutral-600">
          {body}
        </p>
        <div className="mx-auto mt-8 max-w-lg rounded-xl border border-neutral-100 bg-neutral-50/80 px-4 py-3 text-sm font-medium text-neutral-800">
          Even a few missed renters can turn into hundreds in lost rent.
        </div>
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </QuizCard>
  );
}
