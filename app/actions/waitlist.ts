"use server";

import { sendWaitlistAdminNotify } from "@/lib/email/sendWaitlistAdminNotify";
import { sendWaitlistConfirmation } from "@/lib/email/sendWaitlistConfirmation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type WaitlistState = {
  ok: boolean;
  message: string;
};

/** Shown for every successful signup (new or duplicate). Never expose internals. */
const WAITLIST_SUCCESS_MESSAGE =
  "You're on the list. We'll be in touch soon.";

export async function joinWaitlist(
  _prevState: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  try {
    const raw = formData.get("email");
    const email =
      typeof raw === "string" ? raw.trim().toLowerCase() : "";

    if (!email) {
      return { ok: false, message: "Please enter your email." };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { ok: false, message: "Please enter a valid email address." };
    }

    const supabase = createSupabaseServerClient();
    if (!supabase) {
      return {
        ok: false,
        message:
          "Waitlist is not configured. Set NEXT_PUBLIC_SUPABASE_URL and a public Supabase key (NEXT_PUBLIC_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY).",
      };
    }

    const sourceRaw = formData.get("source");
    const source =
      typeof sourceRaw === "string" && sourceRaw.trim() === "quiz"
        ? "quiz"
        : "landing";

    let quiz_score: number | null = null;
    let quiz_risk: string | null = null;

    if (source === "quiz") {
      const scoreRaw = formData.get("quiz_score");
      const riskRaw = formData.get("quiz_risk");
      const parsed =
        typeof scoreRaw === "string" ? Number.parseInt(scoreRaw, 10) : NaN;
      if (!Number.isNaN(parsed) && parsed >= 0 && parsed <= 15) {
        quiz_score = parsed;
      }
      const risk =
        typeof riskRaw === "string" ? riskRaw.trim().toLowerCase() : "";
      if (risk === "low" || risk === "medium" || risk === "high") {
        quiz_risk = risk;
      }
    }

    const payload: {
      email: string;
      source: string;
      quiz_score?: number;
      quiz_risk?: string;
    } = { email, source };

    if (source === "quiz") {
      if (quiz_score !== null) payload.quiz_score = quiz_score;
      if (quiz_risk !== null) payload.quiz_risk = quiz_risk;
    }

    const { error } = await supabase.from("waitlist").insert(payload);

    if (error) {
      if (error.code === "23505") {
        console.info("[waitlist] Duplicate signup (ignored insert)", {
          email,
          source,
        });
        return { ok: true, message: WAITLIST_SUCCESS_MESSAGE };
      }
      console.error("[waitlist] Supabase insert failed:", error);
      return {
        ok: false,
        message: "Something went wrong. Please try again in a moment.",
      };
    }

    console.info("[waitlist] Lead saved", { email, source });

    try {
      await sendWaitlistConfirmation({
        signupEmail: email,
        source: source === "quiz" ? "quiz" : "landing",
      });
    } catch (emailError) {
      console.error("[waitlist] Confirmation email error:", emailError);
    }

    try {
      await sendWaitlistAdminNotify({
        signupEmail: email,
        source,
        quiz_score,
        quiz_risk,
      });
    } catch (notifyError) {
      console.error("[waitlist] Admin notify error:", notifyError);
    }

    return { ok: true, message: WAITLIST_SUCCESS_MESSAGE };
  } catch (error) {
    console.error("[waitlist] Unexpected error:", error);
    return {
      ok: false,
      message: "Something went wrong. Please try again in a moment.",
    };
  }
}
