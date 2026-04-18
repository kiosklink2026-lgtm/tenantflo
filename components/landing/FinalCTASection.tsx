import { ArrowRight } from "lucide-react";
import { JoinWaitlistTrigger } from "@/components/landing/waitlist/JoinWaitlistTrigger";

export function FinalCTASection() {
  return (
    <section id="final-cta" className="scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-b from-neutral-50 to-white px-6 py-16 shadow-[0_28px_70px_-24px_rgba(15,23,42,0.15)] sm:px-12 sm:py-20">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-neutral-200/40 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-neutral-100/80 blur-3xl"
            aria-hidden
          />
          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
              Every delayed reply costs you.
            </h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-neutral-600">
              If a renter reaches out and nobody responds quickly, the opportunity
              is already slipping away. TenantFlo helps you respond faster without
              adding more operational chaos.
            </p>
            <div className="mt-10 flex w-full max-w-xl flex-col items-stretch gap-3 sm:mx-auto sm:max-w-2xl">
              <a
                href="#book-demo"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-neutral-900/20 transition hover:bg-neutral-800 sm:w-auto sm:self-center"
              >
                Book demo
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <JoinWaitlistTrigger className="inline-flex w-full items-center justify-center rounded-full border border-neutral-200 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 shadow-sm transition hover:border-neutral-300 hover:bg-neutral-50 sm:w-auto sm:self-center">
                Join waitlist
              </JoinWaitlistTrigger>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
