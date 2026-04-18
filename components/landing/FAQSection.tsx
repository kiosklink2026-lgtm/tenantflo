import { SectionLabel } from "./SectionLabel";

const faqs = [
  {
    q: "Does this replace our CRM?",
    a: "No. TenantFlo is a communication layer: faster replies, capture, and visibility—not a full CRM replacement.",
  },
  {
    q: "Do we need to change how we work?",
    a: "No. TenantFlo fits how your team already handles calls, texts, and inquiries.",
  },
  {
    q: "Is this only for phone calls?",
    a: "No. It supports renter outreach across calls, messages, forms, and listing inquiries.",
  },
  {
    q: "Can tenant issues or complaints be logged too?",
    a: "Yes—TenantFlo can capture and organize renter-reported issues so nothing gets missed. It is not a full maintenance management platform; it is focused on communication, triage, and follow-through.",
  },
  {
    q: "How fast can we get started?",
    a: "The goal is fast setup with minimal friction—minutes, not a multi-week rollout.",
  },
  {
    q: "Is this for landlords too?",
    a: "It is built primarily for property managers and leasing teams, but smaller operators may also benefit.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="scroll-mt-24 border-b border-neutral-100 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionLabel>FAQ</SectionLabel>
        <h2 className="sr-only">Frequently asked questions</h2>

        <div className="mt-10 divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white px-1 shadow-sm shadow-neutral-900/5">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group px-5 py-1 first:rounded-t-2xl last:rounded-b-2xl open:bg-neutral-50/80"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-neutral-950 transition marker:content-none [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 transition group-open:rotate-45 group-open:border-neutral-300">
                  <span className="text-lg leading-none">+</span>
                </span>
              </summary>
              <p className="pb-4 text-sm leading-relaxed text-neutral-600">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
