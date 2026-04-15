"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useWaitlistFlow } from "@/components/landing/waitlist/WaitlistFlowContext";

const nav = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Why it matters", href: "#why-it-matters" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function LandingHeader() {
  const [open, setOpen] = useState(false);
  const { openWaitlist } = useWaitlistFlow();

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/80 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a
          href="#"
          className="text-lg font-semibold tracking-tight text-neutral-950 transition hover:text-neutral-700"
        >
          TenantFlo
        </a>

        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-neutral-600 transition hover:text-neutral-950"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 md:flex">
            <a
              href="#book-demo"
              className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-800 shadow-sm shadow-neutral-900/5 transition hover:border-neutral-300 hover:bg-neutral-50"
            >
              Book demo
            </a>
            <button
              type="button"
              onClick={openWaitlist}
              className="rounded-full bg-neutral-950 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-neutral-900/20 transition hover:bg-neutral-800"
            >
              Join waitlist
            </button>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-neutral-200 p-2 text-neutral-800 transition hover:bg-neutral-50 md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-neutral-100 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-neutral-700"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-neutral-100 pt-4">
              <a
                href="#book-demo"
                className="rounded-xl border border-neutral-200 px-4 py-3 text-center text-sm font-medium text-neutral-800"
                onClick={() => setOpen(false)}
              >
                Book demo
              </a>
              <button
                type="button"
                className="w-full rounded-xl bg-neutral-950 px-4 py-3 text-center text-sm font-medium text-white"
                onClick={() => {
                  setOpen(false);
                  openWaitlist();
                }}
              >
                Join waitlist
              </button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
