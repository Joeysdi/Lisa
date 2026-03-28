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
      const { sendApplyConfirmation } = await import("@/lib/emails");
      await sendApplyConfirmation(resend, email as string, fullName as string);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
