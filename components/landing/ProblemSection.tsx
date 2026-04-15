import { EyeOff, PhoneMissed, Timer } from "lucide-react";
import { SectionLabel } from "./SectionLabel";

const cards = [
  {
    title: "Missed calls",
    body: "High-intent renters call first. If nobody answers, they move to the next listing.",
    icon: PhoneMissed,
  },
  {
    title: "Slow follow-up",
    body: "A delayed reply often means the conversation never starts.",
    icon: Timer,
  },
  {
    title: "Invisible revenue loss",
    body: "Every missed prospect can turn into more vacancy and more lost rent.",
    icon: EyeOff,
  },
];

export function ProblemSection() {
  return (
    <section className="border-b border-neutral-100 bg-neutral-50/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionLabel>The problem</SectionLabel>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
          Speed wins the renter.
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-600">
          The best listing does not always win. The first reply usually does. When
          a renter inquiry is missed or delayed, the result is simple: less
          conversation, more vacancy, and lost rent that nobody measures clearly.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              className="group rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm shadow-neutral-900/5 transition hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md hover:shadow-neutral-900/8"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-neutral-800 transition group-hover:bg-neutral-900 group-hover:text-white">
                <card.icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-neutral-950">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
