import { SectionLabel } from "./SectionLabel";

export function MoneyLossSection() {
  return (
    <section
      id="why-it-matters"
      className="scroll-mt-24 border-b border-neutral-100 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionLabel>Why it matters</SectionLabel>
        <p className="mt-3 max-w-3xl text-xl font-semibold leading-snug tracking-tight text-neutral-950 sm:text-2xl">
          You don&apos;t lose renters because of pricing. You lose them because
          you&apos;re too late.
        </p>
        <h2 className="mt-6 max-w-3xl text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
          One missed renter can cost more than your software bill.
        </h2>
        <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-neutral-600">
          A few extra vacancy days add up quickly. TenantFlo helps shrink the gap
          between inquiry and response—across calls, messages, and forms.
        </p>

        <div className="mt-12 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_24px_60px_-16px_rgba(15,23,42,0.12)]">
          <div className="grid divide-y divide-neutral-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="p-8 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Monthly rent
              </p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
                $2,000
              </p>
            </div>
            <div className="p-8 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Extra delay
              </p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
                5 days
              </p>
            </div>
            <div className="relative p-8 sm:p-10">
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-white sm:rounded-none" />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Estimated loss
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
                  $333
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-neutral-100 bg-neutral-50/60 px-8 py-5 sm:px-10">
            <p className="text-sm leading-relaxed text-neutral-600">
              That is from one missed renter on one unit. Across multiple listings,
              the loss compounds fast.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
