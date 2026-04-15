type QuizCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function QuizCard({ children, className = "" }: QuizCardProps) {
  return (
    <div
      className={`rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.12)] sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
}
