import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, socialHandle, role, bio, categories, pricingTier } =
      body as Record<string, string | string[]>;

    if (!fullName || !email || !role || !bio || !pricingTier) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }
    if (!categories || (Array.isArray(categories) && categories.length === 0)) {
      return NextResponse.json({ error: "Select at least one category" }, { status: 400 });
    }

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const { supabase } = await import("@/lib/supabase");
      await supabase.from("creator_applications").insert({
        full_name: fullName,
        email,
        social_handle: socialHandle,
        role,
        bio,
        categories,
        pricing_tier: pricingTier,
      });
    } else {
      console.log("[apply]", { fullName, email, socialHandle, role, bio, categories, pricingTier });
    }

    if (process.env.RESEND_API_KEY) {
      const { resend } = await import("@/lib/resend");
      await resend.emails.send({
        from: "Lisa <noreply@lisa-modeling-protection.vercel.app>",
        to: email as string,
        subject: "Application received — Lisa Creator Marketplace",
        html: `<p>Hi ${fullName},</p><p>We've received your application and will review it within 3–5 business days.</p><p>— The Lisa team</p>`,
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
