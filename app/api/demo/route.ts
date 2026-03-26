import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { firstName, lastName, email, social, role } = body as Record<string, string>;

    if (!firstName || !lastName || !email || !social || !role) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    // TODO: integrate email delivery (Resend) or Supabase insert
    console.log("[demo-request]", { firstName, lastName, email, social, role });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
