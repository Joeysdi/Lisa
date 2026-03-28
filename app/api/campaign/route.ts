import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { brandName, contactEmail, campaignBrief, budgetRange, creatorType } =
      body as Record<string, string>;

    if (!brandName || !contactEmail) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const { supabase } = await import("@/lib/supabase");
      await supabase.from("campaign_requests").insert({
        brand_name: brandName,
        contact_email: contactEmail,
        campaign_brief: campaignBrief,
        budget_range: budgetRange,
        creator_type: creatorType,
      });
    } else {
      console.log("[campaign]", { brandName, contactEmail, campaignBrief, budgetRange, creatorType });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
