import { Gauge, Puzzle, Zap } from "lucide-react";

const items = [
  {
    title: "Works with your current workflow",
    body: "Designed to support how leasing teams already communicate.",
    icon: Puzzle,
  },
  {
    title: "Simple to understand",
    body: "No bloated features. Just faster follow-up and better visibility.",
    icon: Gauge,
  },
  {
    title: "Built for action",
    body: "See what is being missed and what to do next.",
    icon: Zap,
  },
];

export function ObjectionSection() {
  return (
    <section className="border-b border-neutral-100 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
          No heavy setup. No complicated CRM migration.
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-neutral-200/80 bg-white p-7 shadow-sm shadow-neutral-900/5 transition hover:border-neutral-300 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-900 text-white">
                <item.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-neutral-950">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
