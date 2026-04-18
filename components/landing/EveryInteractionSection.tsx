import { ClipboardList, Inbox, PhoneMissed } from "lucide-react";

const channels = [
  {
    title: "Missed call",
    body: "Instant SMS reply sent.",
    icon: PhoneMissed,
  },
  {
    title: "Message or inquiry",
    body: "Captured in one inbox.",
    icon: Inbox,
  },
  {
    title: "Tenant issue or complaint",
    body: "Logged, categorized, prioritized.",
    icon: ClipboardList,
  },
];

/**
 * Positions TenantFlo as communication capture + triage—not full operations software.
 */
export function EveryInteractionSection() {
  return (
    <section
      className="border-b border-neutral-100 bg-white py-20 sm:py-28"
      aria-labelledby="every-interaction-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2
          id="every-interaction-heading"
          className="max-w-3xl text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl"
        >
          Every renter interaction. Handled instantly.
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {channels.map((c) => (
            <article
              key={c.title}
              className="rounded-2xl border border-neutral-200/80 bg-neutral-50/40 p-7 shadow-sm shadow-neutral-900/5 transition hover:-translate-y-0.5 hover:border-neutral-200 hover:bg-white hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-800">
                <c.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-neutral-950">
                {c.title}
              </h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-neutral-600">
                {c.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
