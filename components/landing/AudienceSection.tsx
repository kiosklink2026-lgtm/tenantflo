import { Building2, Layers, Users } from "lucide-react";

const audiences = [
  {
    title: "Small property managers",
    body: "Stay responsive without adding more admin work.",
    icon: Building2,
  },
  {
    title: "Growing leasing teams",
    body: "Standardize follow-up and reduce lead leakage.",
    icon: Users,
  },
  {
    title: "Multi-unit operators",
    body: "Get visibility across inquiries, response times, and booking flow.",
    icon: Layers,
  },
];

export function AudienceSection() {
  return (
    <section className="border-b border-neutral-100 bg-neutral-50/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
          Built for busy property managers and leasing teams.
        </h2>
        <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-neutral-600">
          Whether you manage a handful of units or a growing portfolio, TenantFlo
          helps you respond faster—so renter demand does not quietly walk away.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {audiences.map((a) => (
            <article
              key={a.title}
              className="rounded-2xl border border-neutral-200/80 bg-white p-7 shadow-sm shadow-neutral-900/5 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-800">
                <a.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-neutral-950">
                {a.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {a.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
