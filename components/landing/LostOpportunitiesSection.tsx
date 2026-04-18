import { Clock3, DollarSign, MessageSquareX, PhoneMissed } from "lucide-react";
import { SectionLabel } from "./SectionLabel";

const stats = [
  {
    label: "Missed calls this week",
    value: "6",
    icon: PhoneMissed,
    accent: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    label: "Late replies",
    value: "4",
    icon: Clock3,
    accent: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    label: "Unanswered inquiries",
    value: "2",
    icon: MessageSquareX,
    accent: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    label: "Estimated rent at risk",
    value: "$1,240",
    icon: DollarSign,
    accent: "text-emerald-700",
    bg: "bg-emerald-50",
  },
];

export function LostOpportunitiesSection() {
  return (
    <section className="relative overflow-hidden border-b border-neutral-100 py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_100%_0%,rgba(15,23,42,0.05),transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionLabel>Visibility</SectionLabel>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
          Where you&apos;re losing renters — and don&apos;t see it.
        </h2>
        <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-neutral-600">
          Most teams know they are missing inquiries. Very few can see the real
          pattern. TenantFlo helps surface missed calls, slow replies, unanswered
          inquiries, and estimated rent at risk.
        </p>

        <div className="mt-12 rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_28px_70px_-20px_rgba(15,23,42,0.15)] sm:p-10">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-neutral-100 pb-8">
            <div>
              <p className="text-sm font-medium text-neutral-500">
                Leasing leakage snapshot
              </p>
              <p className="mt-1 text-lg font-semibold text-neutral-950">
                Last 7 days · Portfolio view
              </p>
            </div>
            <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
              Sample metrics
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="group rounded-xl border border-neutral-100 bg-neutral-50/50 p-5 transition hover:border-neutral-200 hover:bg-white hover:shadow-md"
              >
                <div
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${s.bg} ${s.accent}`}
                >
                  <s.icon className="h-5 w-5" aria-hidden />
                </div>
                <p className="mt-4 text-xs font-medium uppercase tracking-wide text-neutral-500">
                  {s.label}
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950 transition group-hover:scale-[1.02]">
                  {s.value}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-neutral-500 sm:text-left">
            Turn invisible leasing leakage into something your team can actually
            see and improve.
          </p>
        </div>
      </div>
    </section>
  );
}
