import { Inbox, MessageCircle, UserPlus, Video } from "lucide-react";
import { SectionLabel } from "./SectionLabel";

const steps = [
  {
    step: "1",
    title: "A renter reaches out",
    body: "Phone call, form submission, or listing inquiry.",
    icon: Inbox,
  },
  {
    step: "2",
    title: "TenantFlo responds instantly",
    body: "An automatic reply acknowledges the inquiry right away.",
    icon: MessageCircle,
  },
  {
    step: "3",
    title: "The lead is captured",
    body: "Contact details and message history stay organized.",
    icon: UserPlus,
  },
  {
    step: "4",
    title: "The renter moves forward",
    body: "Send a viewing link and keep the conversation moving.",
    icon: Video,
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 border-b border-neutral-100 bg-neutral-50/40 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionLabel>How it works</SectionLabel>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
          From missed call to booked viewing in minutes.
        </h2>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, i) => (
            <article
              key={item.step}
              className="relative rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm shadow-neutral-900/5 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              {i < steps.length - 1 ? (
                <div
                  className="pointer-events-none absolute -right-3 top-1/2 hidden h-px w-6 bg-gradient-to-r from-neutral-200 to-transparent lg:block"
                  aria-hidden
                />
              ) : null}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-400">
                  Step {item.step}
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900 text-white">
                  <item.icon className="h-5 w-5" aria-hidden />
                </div>
              </div>
              <h3 className="mt-5 text-base font-semibold text-neutral-950">
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
