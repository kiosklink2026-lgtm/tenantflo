"use client";

import { joinWaitlist, type WaitlistState } from "@/app/actions/waitlist";
import type { RiskBand } from "@/components/landing/quiz/quizData";
import { ArrowRight, Loader2, Mail } from "lucide-react";
import { useRef, useState } from "react";

const waitlistInitial: WaitlistState = { ok: false, message: "" };

export function JoinWaitlistConfirmForm({
  email,
  score,
  band,
  onClose,
}: {
  email: string;
  score: number;
  band: RiskBand;
  onClose: () => void;
}) {
  const [state, setState] = useState<WaitlistState>(waitlistInitial);
  const [pending, setPending] = useState(false);
  const stateRef = useRef(state);
  stateRef.current = state;

  async function onAction(formData: FormData) {
    setPending(true);
    try {
      const next = await joinWaitlist(stateRef.current, formData);
      setState(next);
    } catch {
      setState({
        ok: false,
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50/80 p-5 text-left sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
        Waitlist signup
      </p>
      <p className="mt-2 text-sm text-neutral-600">
        We will send early access and product updates to:
      </p>
      <p className="mt-2 flex items-center gap-2 break-all text-base font-semibold text-neutral-950">
        <Mail className="h-4 w-4 shrink-0 text-neutral-400" aria-hidden />
        {email}
      </p>

      <form action={onAction} className="mt-6">
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="source" value="quiz" />
        <input type="hidden" name="quiz_score" value={String(score)} />
        <input type="hidden" name="quiz_risk" value={band} />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-neutral-950 py-3.5 text-sm font-semibold text-white shadow-lg shadow-neutral-900/20 transition hover:bg-neutral-800 disabled:pointer-events-none disabled:opacity-60"
        >
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Joining waitlist…
            </>
          ) : (
            <>
              Join waitlist
              <ArrowRight className="h-4 w-4" aria-hidden />
            </>
          )}
        </button>
      </form>

      <p className="mt-3 text-center text-xs text-neutral-500">
        No spam. Early access only.
      </p>

      {state.message ? (
        <p
          role="status"
          className={`mt-4 text-center text-sm font-medium ${
            state.ok ? "text-emerald-700" : "text-red-600"
          }`}
        >
          {state.message}
        </p>
      ) : null}

      {state.ok ? (
        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-full border border-neutral-200 bg-white py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50"
        >
          Done
        </button>
      ) : null}
    </div>
  );
}
