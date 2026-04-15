"use client";

import { submitContact, type ContactState } from "@/app/actions/contact";
import { Loader2, Mail } from "lucide-react";
import { useActionState } from "react";
import { SectionLabel } from "./SectionLabel";

const CONTACT_EMAIL = "hello@tenantflo.com";
const initial: ContactState = { ok: false, message: "" };

export function ContactSection() {
  const [state, formAction, pending] = useActionState(submitContact, initial);

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-b border-neutral-100 bg-neutral-50/40 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl">
          <SectionLabel>Contact</SectionLabel>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
            Contact us
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-neutral-600">
            Questions about TenantFlo, partnerships, or press — send a note
            below or reach us directly by email.
          </p>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-900 shadow-sm transition hover:border-neutral-300 hover:bg-neutral-50"
          >
            <Mail className="h-4 w-4 text-neutral-500" aria-hidden />
            {CONTACT_EMAIL}
          </a>

          <div className="mt-10 rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.1)] sm:p-8">
            <h3 className="text-lg font-semibold text-neutral-950">
              Send a message
            </h3>
            <p className="mt-1 text-sm text-neutral-500">
              We typically reply within one to two business days.
            </p>

            <form action={formAction} className="mt-6 flex flex-col gap-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-neutral-800"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={120}
                  disabled={pending}
                  placeholder="Your name"
                  className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white focus:ring-2 focus:ring-neutral-950/10 disabled:opacity-60"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-neutral-800"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={pending}
                  placeholder="you@company.com"
                  className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white focus:ring-2 focus:ring-neutral-950/10 disabled:opacity-60"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-neutral-800"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  maxLength={4000}
                  disabled={pending}
                  placeholder="How can we help?"
                  className="mt-1.5 w-full resize-y rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white focus:ring-2 focus:ring-neutral-950/10 disabled:opacity-60"
                />
              </div>
              <button
                type="submit"
                disabled={pending}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-neutral-900/15 transition hover:bg-neutral-800 disabled:pointer-events-none disabled:opacity-60"
              >
                {pending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    Sending…
                  </>
                ) : (
                  "Send message"
                )}
              </button>
            </form>

            {state.message ? (
              <p
                role="status"
                className={`mt-4 text-sm font-medium ${
                  state.ok ? "text-emerald-700" : "text-red-600"
                }`}
              >
                {state.message}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
