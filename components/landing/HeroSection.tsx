import { JoinWaitlistTrigger } from "@/components/landing/waitlist/JoinWaitlistTrigger";
import {
  ArrowRight,
  Calendar,
  PhoneMissed,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-neutral-100">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(15,23,42,0.06),transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Built for property managers
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
              You&apos;re losing renters before you even reply.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-neutral-600 sm:text-xl">
              Calls, texts, and inquiries come in when your team is busy. If you
              don&apos;t respond instantly, they move on. TenantFlo replies,
              captures, and organizes every renter interaction automatically.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#book-demo"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-neutral-900/15 transition hover:bg-neutral-800 hover:shadow-xl hover:shadow-neutral-900/20"
              >
                Book demo
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <JoinWaitlistTrigger className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 shadow-sm shadow-neutral-900/5 transition hover:border-neutral-300 hover:bg-neutral-50">
                Join waitlist
              </JoinWaitlistTrigger>
            </div>
            <p className="mt-8 text-sm text-neutral-500">
              Works with your phone • No new system to learn • Setup in minutes
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <div className="relative h-[420px] sm:h-[460px]">
              <div
                className="absolute left-2 top-6 w-[92%] rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.12)] transition duration-500 hover:-translate-y-0.5 sm:left-4"
                style={{ transform: "rotate(-2deg)" }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                      <PhoneMissed className="h-5 w-5" aria-hidden />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-950">
                        Missed call
                      </p>
                      <p className="text-xs text-neutral-500">
                        Renter · Maple Ave unit
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-neutral-600">
                    Just now
                  </span>
                </div>
                <div className="mt-4 h-px w-full bg-neutral-100" />
                <p className="mt-3 text-xs text-neutral-500">
                  High-intent call — no voicemail left
                </p>
              </div>

              <div className="absolute right-0 top-[88px] w-[94%] rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-[0_24px_60px_-12px_rgba(15,23,42,0.14)] transition duration-500 hover:-translate-y-0.5 sm:top-[100px]">
                <div className="flex items-center gap-2 text-emerald-700">
                  <Sparkles className="h-4 w-4" aria-hidden />
                  <p className="text-sm font-semibold">Instant auto-reply sent</p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  “Thanks for reaching out — we can help today. Reply YES to get
                  available times.”
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs text-neutral-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-line" />
                  SMS · Delivered in seconds
                </div>
              </div>

              <div
                className="absolute left-1 top-[210px] w-[88%] rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-[0_18px_45px_-12px_rgba(15,23,42,0.1)] transition duration-500 hover:-translate-y-0.5 sm:left-6 sm:top-[230px]"
                style={{ transform: "rotate(1.5deg)" }}
              >
                <div className="flex items-center gap-2">
                  <UserRound className="h-4 w-4 text-neutral-500" aria-hidden />
                  <p className="text-sm font-semibold text-neutral-950">
                    Lead captured
                  </p>
                </div>
                <p className="mt-1 text-xs text-neutral-500">
                  Name, channel, and inquiry logged automatically
                </p>
              </div>

              <div className="absolute bottom-0 right-2 w-[90%] rounded-2xl border border-emerald-200/80 bg-gradient-to-b from-emerald-50/90 to-white p-5 shadow-[0_24px_60px_-12px_rgba(5,150,105,0.2)] animate-float-soft sm:right-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-emerald-800/80">
                      Viewing link sent
                    </p>
                    <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-neutral-950">
                      <Calendar className="h-4 w-4 text-emerald-700" aria-hidden />
                      Tomorrow · 2:30 PM
                    </p>
                  </div>
                  <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
                </div>
                <div className="mt-4 rounded-xl border border-emerald-100 bg-white/80 px-3 py-2.5">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-500">
                    Estimated rent protected
                  </p>
                  <p className="mt-1 text-2xl font-semibold tracking-tight text-neutral-950">
                    $2,000<span className="text-sm font-normal text-neutral-500">/mo</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
