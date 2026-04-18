import { Check } from "lucide-react";
import { SectionLabel } from "./SectionLabel";

const freeFeatures = [
  "Basic inquiry capture",
  "Limited activity visibility",
  "Early access features",
];

const proFeatures = [
  "Instant auto-replies",
  "Lead capture",
  "Viewing follow-up",
  "Lost opportunity visibility",
];

export function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-24 border-b border-neutral-100 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionLabel>Pricing</SectionLabel>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
          Simple pricing for faster leasing follow-up
        </h2>
        <p className="mt-4 max-w-2xl text-pretty text-base font-medium leading-relaxed text-neutral-700 sm:text-lg">
          Recover just one renter, and this pays for itself.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm shadow-neutral-900/5 transition hover:shadow-md">
            <p className="text-sm font-semibold text-neutral-500">Free</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">
              $0
            </p>
            <ul className="mt-8 flex flex-1 flex-col gap-3">
              {freeFeatures.map((f) => (
                <li key={f} className="flex gap-3 text-sm text-neutral-600">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400"
                    aria-hidden
                  />
                  {f}
                </li>
              ))}
            </ul>
          </article>

          <article className="relative flex flex-col overflow-hidden rounded-2xl border-2 border-neutral-900 bg-white p-8 shadow-[0_24px_60px_-16px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_70px_-16px_rgba(15,23,42,0.16)]">
            <div className="absolute right-6 top-6 rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-800">
              Most popular
            </div>
            <p className="text-sm font-semibold text-neutral-500">Pro</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">
              $24.99<span className="text-lg font-medium text-neutral-500">/month</span>
            </p>
            <ul className="mt-8 flex flex-1 flex-col gap-3">
              {proFeatures.map((f) => (
                <li key={f} className="flex gap-3 text-sm text-neutral-600">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                    aria-hidden
                  />
                  {f}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div id="book-demo" className="mt-10 flex scroll-mt-28 justify-center">
          <a
            href="#book-demo"
            className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-neutral-900/20 transition hover:bg-neutral-800"
          >
            Book demo
          </a>
        </div>
      </div>
    </section>
  );
}
