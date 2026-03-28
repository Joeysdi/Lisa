import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, role } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    if (!role || typeof role !== "string") {
      return NextResponse.json({ error: "Role is required" }, { status: 400 });
    }

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const { supabase } = await import("@/lib/supabase");
      await supabase.from("signups").insert({ email, role, source: "landing" });
    } else {
      console.log("[signup]", { email, role, ts: new Date().toISOString() });
    }

    if (process.env.RESEND_API_KEY) {
      const { resend } = await import("@/lib/resend");
      const { sendSignupWelcome, sendAdminNotification } = await import("@/lib/emails");

      await sendSignupWelcome(resend, email);

      if (role === "model" || role === "actor") {
        await sendAdminNotification(resend, email, role);
      }
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
