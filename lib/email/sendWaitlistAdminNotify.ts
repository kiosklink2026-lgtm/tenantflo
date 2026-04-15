import { Resend } from "resend";

type AdminNotifyParams = {
  signupEmail: string;
  source: string;
  quiz_score?: number | null;
  quiz_risk?: string | null;
};

function getFromAddress(): string | null {
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  if (from) return from;
  if (process.env.NODE_ENV !== "production") {
    return "TenantFlo <onboarding@resend.dev>";
  }
  return null;
}

/**
 * Optional internal alert when WAITLIST_NOTIFY_EMAIL is set.
 * Failures are logged only; never thrown.
 */
export async function sendWaitlistAdminNotify(
  params: AdminNotifyParams,
): Promise<void> {
  const to = process.env.WAITLIST_NOTIFY_EMAIL?.trim();
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = getFromAddress();

  if (!to || !apiKey || !from) {
    return;
  }

  const lines = [
    `New waitlist signup`,
    ``,
    `Email: ${params.signupEmail}`,
    `Source: ${params.source}`,
  ];
  if (params.quiz_score != null) {
    lines.push(`Quiz score: ${params.quiz_score}`);
  }
  if (params.quiz_risk) {
    lines.push(`Quiz risk: ${params.quiz_risk}`);
  }

  const text = lines.join("\n");
  const html = `<pre style="font-family:ui-monospace,monospace;font-size:13px;line-height:1.5;color:#18181b;">${text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")}</pre>`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `New TenantFlo waitlist signup — ${params.signupEmail}`,
      text,
      html,
    });
    if (error) {
      console.error("[waitlist] Admin notify Resend error:", error);
    } else {
      console.info("[waitlist] Admin notify sent", { to });
    }
  } catch (e) {
    console.error("[waitlist] Admin notify failed:", e);
  }
}
