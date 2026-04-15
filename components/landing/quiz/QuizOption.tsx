import { Check } from "lucide-react";

type QuizOptionProps = {
  label: string;
  selected: boolean;
  disabled?: boolean;
  onSelect: () => void;
};

export function QuizOption({
  label,
  selected,
  disabled,
  onSelect,
}: QuizOptionProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      className={`group relative flex w-full items-center gap-3 rounded-2xl border px-4 py-4 text-left text-sm font-medium leading-snug text-neutral-900 shadow-sm transition sm:px-5 sm:py-5 sm:text-base ${
        selected
          ? "border-neutral-900 bg-neutral-50 ring-2 ring-neutral-900/10"
          : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50/80 hover:shadow-md"
      } disabled:pointer-events-none disabled:opacity-60`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-neutral-500 transition ${
          selected
            ? "border-neutral-900 bg-neutral-900 text-white"
            : "border-neutral-200 bg-white group-hover:border-neutral-300"
        }`}
        aria-hidden
      >
        {selected ? (
          <Check className="h-4 w-4" strokeWidth={2.5} />
        ) : (
          <span className="block h-2 w-2 rounded-full bg-neutral-200 group-hover:bg-neutral-300" />
        )}
      </span>
      <span className="flex-1 pr-2">{label}</span>
    </button>
  );
}
