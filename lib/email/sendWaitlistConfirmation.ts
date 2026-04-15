import { Resend } from "resend";

export type WaitlistConfirmationParams = {
  /** Email the user signed up with (always shown in copy; may differ from delivery `to` in dev). */
  signupEmail: string;
  source: "landing" | "quiz";
};

const DEFAULT_FROM_DEV = "TenantFlo <onboarding@resend.dev>";

/** Resend test domain: only the account owner inbox is allowed as `to` unless you verify a domain. */
function isResendTestFrom(from: string): boolean {
  const lower = from.toLowerCase();
  return (
    lower.includes("@resend.dev") ||
    lower.includes("onboarding@resend.dev")
  );
}

function getResendFrom(): string | null {
  const configured = process.env.RESEND_FROM_EMAIL?.trim();
  if (configured) {
    return configured;
  }
  if (process.env.NODE_ENV !== "production") {
    return DEFAULT_FROM_DEV;
  }
  console.warn(
    "[waitlist] RESEND_FROM_EMAIL is not set. Confirmation emails are skipped in production until you add a verified-domain sender (e.g. TenantFlo <hello@yourdomain.com>).",
  );
  return null;
}

const DEV_INBOX_DEFAULT = "kiosklink2026@gmail.com";

/**
 * Dev inbox relay: **only** when `NODE_ENV === "development"` (local `next dev`).
 * Production / preview: always `to = signupEmail` when the sender is not Resend test mail.
 */
function resolveDeliveryTo(
  signupEmail: string,
  from: string,
): { to: string; relayed: boolean; skip: boolean } {
  const intended = signupEmail.trim().toLowerCase();
  const isDev = process.env.NODE_ENV === "development";

  if (isDev) {
    const dev = (
      process.env.WAITLIST_DEV_INBOX?.trim() || DEV_INBOX_DEFAULT
    ).toLowerCase();
    return {
      to: dev,
      relayed: dev !== intended,
      skip: false,
    };
  }

  if (isResendTestFrom(from)) {
    console.error(
      "[waitlist] Skipping confirmation: `from` uses Resend test mail (e.g. onboarding@resend.dev), which cannot deliver to arbitrary signups. Set RESEND_FROM_EMAIL to a verified domain (e.g. TenantFlo <hello@tenantflo.co>).",
    );
    return { to: intended, relayed: false, skip: true };
  }

  return { to: intended, relayed: false, skip: false };
}

function buildRelayNoticeRow(signupEmail: string): string {
  return `
                <tr>
                  <td style="padding:0 32px 16px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fffbeb;border:1px solid #fde68a;border-radius:12px;">
                      <tr>
                        <td style="padding:14px 16px;">
                          <p style="margin:0;font-size:13px;line-height:1.5;color:#92400e;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
                            <strong>Routing note:</strong> this confirmation was sent to a test inbox because of Resend domain settings. The signup email on file is <strong style="color:#78350f;">${signupEmail.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</strong>.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>`;
}

function buildWaitlistConfirmationHtml(
  source: "landing" | "quiz",
  signupEmail: string,
  showRelayNotice: boolean,
): string {
  const quizRow =
    source === "quiz"
      ? `
                <tr>
                  <td style="padding:12px 32px 0;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 8px;">
                      <tr>
                        <td style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:12px;padding:14px 16px;">
                          <p style="margin:0;font-size:13px;font-weight:600;color:#065f46;letter-spacing:0.02em;">Quick check saved</p>
                          <p style="margin:6px 0 0;font-size:14px;line-height:1.5;color:#047857;">We stored your responses with this signup so nothing is lost.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>`
      : "";

  const relayRow = showRelayNotice ? buildRelayNoticeRow(signupEmail) : "";

  const safeSignup = signupEmail
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");

  return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>TenantFlo</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background:#e8e8ea;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;">
  <div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">
    You are on the TenantFlo waitlist — faster follow-up for leasing teams is coming.
  </div>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#e8e8ea;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px;">
          <tr>
            <td style="border-radius:20px;overflow:hidden;background:#ffffff;box-shadow:0 25px 50px -12px rgba(15,23,42,0.18);border:1px solid #e4e4e7;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td width="70%" height="4" style="background:#0a0a0a;font-size:0;line-height:0;">&nbsp;</td>
                  <td width="30%" height="4" style="background:#059669;font-size:0;line-height:0;">&nbsp;</td>
                </tr>
              </table>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#0a0a0a;background:linear-gradient(145deg,#0a0a0a 0%,#18181b 55%,#0a0a0a 100%);">
                <tr>
                  <td style="padding:36px 32px 32px;">
                    <p style="margin:0 0 10px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:#a1a1aa;">
                      TenantFlo
                    </p>
                    <h1 style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:28px;font-weight:600;letter-spacing:-0.03em;line-height:1.15;color:#fafafa;">
                      You are on the list
                    </h1>
                    <p style="margin:14px 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:16px;line-height:1.55;color:#a1a1aa;max-width:440px;">
                      Revenue protection for leasing teams — respond faster, capture more renter demand.
                    </p>
                  </td>
                </tr>
              </table>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding:24px 32px 0;">
                    <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:14px;line-height:1.5;color:#71717a;">
                      Signup email on file
                    </p>
                    <p style="margin:6px 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:16px;font-weight:600;color:#18181b;">
                      ${safeSignup}
                    </p>
                  </td>
                </tr>
                ${relayRow}
                <tr>
                  <td style="padding:36px 32px 8px;">
                    <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:17px;line-height:1.6;color:#3f3f46;">
                      Thanks for joining the waitlist. We are building something sharp for property managers who are tired of losing renters to slow follow-up.
                    </p>
                  </td>
                </tr>
                ${quizRow}
                <tr>
                  <td style="padding:8px 32px 0;">
                    <p style="margin:0 0 20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:15px;line-height:1.6;color:#52525b;">
                      When early access opens, you will be among the first to try it — no spam, no noise.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 32px 28px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fafafa;border:1px solid #f4f4f5;border-radius:14px;">
                      <tr>
                        <td style="padding:20px 22px;">
                          <p style="margin:0 0 14px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#71717a;">
                            What happens next
                          </p>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                              <td width="28" valign="top" style="padding:0 0 12px;">
                                <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="width:22px;height:22px;background:#0a0a0a;border-radius:6px;text-align:center;line-height:22px;font-size:12px;color:#fff;font-weight:700;">1</td></tr></table>
                              </td>
                              <td valign="top" style="padding:0 0 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:14px;line-height:1.5;color:#3f3f46;">
                                <strong style="color:#18181b;">Watch your inbox</strong> for one or two short updates as we ship.
                              </td>
                            </tr>
                            <tr>
                              <td width="28" valign="top" style="padding:0 0 12px;">
                                <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="width:22px;height:22px;background:#0a0a0a;border-radius:6px;text-align:center;line-height:22px;font-size:12px;color:#fff;font-weight:700;">2</td></tr></table>
                              </td>
                              <td valign="top" style="padding:0 0 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:14px;line-height:1.5;color:#3f3f46;">
                                <strong style="color:#18181b;">Early access</strong> when the product is ready for your workflow.
                              </td>
                            </tr>
                            <tr>
                              <td width="28" valign="top">
                                <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="width:22px;height:22px;background:#059669;border-radius:6px;text-align:center;line-height:22px;font-size:12px;color:#fff;font-weight:700;">✓</td></tr></table>
                              </td>
                              <td valign="top" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:14px;line-height:1.5;color:#3f3f46;">
                                <strong style="color:#18181b;">Questions anytime</strong> — reply to this email or write <a href="mailto:hello@tenantflo.com" style="color:#0a0a0a;font-weight:600;text-decoration:none;border-bottom:1px solid #d4d4d8;">hello@tenantflo.com</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 32px 36px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="height:1px;background-color:#e4e4e7;font-size:0;line-height:0;">&nbsp;</td>
                      </tr>
                    </table>
                    <p style="margin:20px 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:14px;color:#71717a;">
                      With appreciation,<br />
                      <span style="color:#18181b;font-weight:600;">The TenantFlo team</span>
                    </p>
                  </td>
                </tr>
              </table>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#fafafa;border-top:1px solid #f4f4f5;">
                <tr>
                  <td style="padding:22px 32px;text-align:center;">
                    <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:12px;line-height:1.6;color:#a1a1aa;">
                      TenantFlo · Built for property managers &amp; leasing teams<br />
                      <a href="mailto:hello@tenantflo.com" style="color:#52525b;text-decoration:none;font-weight:500;">hello@tenantflo.com</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <p style="margin:20px 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:11px;line-height:1.5;color:#a1a1aa;text-align:center;max-width:480px;">
          You received this because you joined the TenantFlo waitlist.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
}

/**
 * Sends confirmation to the resolved recipient. Never throws.
 * Returns whether Resend reported success.
 */
export async function sendWaitlistConfirmation(
  params: WaitlistConfirmationParams,
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.warn("[waitlist] RESEND_API_KEY missing; skipping confirmation email.");
    return false;
  }

  const from = getResendFrom();
  if (!from) {
    return false;
  }

  const { signupEmail, source } = params;
  const { to, relayed, skip } = resolveDeliveryTo(signupEmail, from);

  console.info("[waitlist] confirmation routing", {
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
    from,
    signupEmail,
    finalTo: to,
    relayed,
    skip,
  });

  if (skip) {
    return false;
  }

  const quizNote =
    source === "quiz"
      ? " We saved your quick check results with your signup."
      : "";

  const subject = "You are in — TenantFlo waitlist confirmed";
  const text = [
    `You are on the TenantFlo waitlist`,
    ``,
    `Signup email: ${signupEmail}`,
    relayed ? `(This message was delivered to a test inbox because of Resend configuration.)` : "",
    ``,
    `Thanks for raising your hand.${quizNote}`,
    ``,
    `We are building revenue protection for leasing teams: faster responses, fewer missed renters, less invisible leakage.`,
    ``,
    `What happens next:`,
    `1) We will send a short note when there is something meaningful to share.`,
    `2) You will get early access when the product is ready for your workflow.`,
    `3) Questions? Reply to this email or write hello@tenantflo.com`,
    ``,
    `— The TenantFlo team`,
  ]
    .filter(Boolean)
    .join("\n");

  const html = buildWaitlistConfirmationHtml(
    source,
    signupEmail,
    relayed,
  );

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      text,
      html,
    });
    if (error) {
      console.error("[waitlist] Resend API error:", error);
      return false;
    }
    console.info("[waitlist] Confirmation email sent via Resend", {
      nodeEnv: process.env.NODE_ENV,
      from,
      signupEmail,
      finalTo: to,
      relayed,
    });
    return true;
  } catch (e) {
    console.error("[waitlist] Confirmation email exception:", e);
    return false;
  }
}
