import type { Resend } from "resend";

const FROM = "Lisa <noreply@lisaprotect.ai>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "";

export async function sendSignupWelcome(resend: Resend, email: string) {
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "You're on the Lisa list",
    html: `
      <p>Hi,</p>
      <p>You're on the list. We'll be in touch when your monitoring is active.</p>
      <p>— The Lisa team</p>
    `,
  });
}

export async function sendApplyConfirmation(
  resend: Resend,
  email: string,
  fullName: string,
) {
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Application received — Lisa Creator Marketplace",
    html: `
      <p>Hi ${fullName},</p>
      <p>Application received. We'll review and respond within 3–5 days.</p>
      <p>— The Lisa team</p>
    `,
  });
}

export async function sendProWelcome(resend: Resend, email: string) {
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Welcome to Lisa Pro",
    html: `
      <p>Hi,</p>
      <p>Your Lisa Pro subscription is active. Your protection starts now.</p>
      <p>Sign in to your dashboard to see your monitoring status: ${process.env.NEXT_PUBLIC_SITE_URL}/dashboard</p>
      <p>— The Lisa team</p>
    `,
  });
}

export async function sendAdminNotification(
  resend: Resend,
  email: string,
  role: string,
) {
  if (!ADMIN_EMAIL) return;
  await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `New Pro-intent signup: ${email}`,
    text: `New Pro-intent signup: ${email} — role: ${role} — action required.`,
  });
}

export async function sendAdminProAlert(
  resend: Resend,
  email: string,
  plan: string,
) {
  if (!ADMIN_EMAIL) return;
  await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `New Pro subscriber: ${email}`,
    text: `New Pro subscriber: ${email} — ${plan} — action required.`,
  });
}
