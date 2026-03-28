import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ checkout?: string }>;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/signin");

  const email = session.user.email ?? "";

  // Look up plan in signups table
  const { data: signup } = await supabase
    .from("signups")
    .select("plan")
    .eq("email", email)
    .maybeSingle();

  const plan: string = signup?.plan ?? "free";
  const isPro = plan === "pro";

  const params = await searchParams;
  const justUpgraded = params.checkout === "success";

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Nav strip */}
      <header className="border-b border-white/8 px-5 sm:px-8 h-16 flex items-center justify-between max-w-7xl mx-auto">
        <a href="/" className="flex items-center gap-3 select-none">
          <span className="text-white font-bold text-xs tracking-[.4em] uppercase">LISA</span>
          <span className="w-px h-4 bg-white/15" />
          <span className="text-[9px] tracking-[.2em] uppercase text-white/40 font-sans hidden sm:block">
            PROTECTION
          </span>
        </a>
        <span className="text-white/30 text-xs font-mono">{email}</span>
      </header>

      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10 sm:py-16 flex flex-col gap-8">

        {justUpgraded && (
          <div className="border border-white/15 bg-white/5 px-6 py-4 font-sans text-sm text-white/80">
            Welcome to Lisa Pro — your protection is now active.
          </div>
        )}

        {/* Plan status */}
        <div className="border border-white/8 p-6">
          <p className="text-[9px] tracking-[.3em] uppercase text-white/30 font-sans mb-2">
            Current plan
          </p>
          <div className="flex items-center gap-3">
            <span className="font-display font-light text-3xl text-white">
              {isPro ? "Pro" : "Free"}
            </span>
            {isPro && (
              <span className="bg-white text-black text-[9px] font-mono tracking-[.15em] px-2 py-0.5 uppercase">
                ACTIVE
              </span>
            )}
          </div>
        </div>

        {/* Monitoring status */}
        <div className="border border-white/8 p-6">
          <p className="text-[9px] tracking-[.3em] uppercase text-white/30 font-sans mb-4">
            Monitoring status
          </p>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-2 h-2 rounded-full bg-white/30 animate-pulse" />
            <span className="text-white/60 font-sans text-sm">
              First scan in progress…
            </span>
          </div>
          <p className="text-white/25 text-xs font-mono">
            Your account is queued for activation. The team will be in touch within 1–2 business days.
          </p>
        </div>

        {/* Upload prompt */}
        <div className="border border-white/8 p-6">
          <p className="text-[9px] tracking-[.3em] uppercase text-white/30 font-sans mb-2">
            Next step
          </p>
          <p className="text-white/60 font-sans text-sm mb-4">
            Upload a reference photo so we can start building your likeness fingerprint.
          </p>
          <a
            href="/#demo"
            className="inline-flex items-center gap-2 border border-white/20 text-white/60
                       hover:border-white/40 hover:text-white text-[10px] tracking-[.08em]
                       uppercase font-sans px-6 py-3 transition-colors"
          >
            Try the face demo →
          </a>
        </div>

        {/* Upgrade CTA for Free users */}
        {!isPro && (
          <div className="border border-white/8 bg-white/[0.02] p-6">
            <p className="text-[9px] tracking-[.3em] uppercase text-white/30 font-sans mb-2">
              Upgrade to Pro
            </p>
            <p className="text-white/60 font-sans text-sm mb-4">
              Get real-time scanning, automated DMCA takedowns, deepfake detection, and Dark Web monitoring.
            </p>
            <a
              href="/#pricing"
              className="inline-flex items-center gap-2 bg-white text-black
                         text-[10px] tracking-[.08em] uppercase font-sans font-medium
                         px-6 py-3 rounded-full hover:bg-white/90 transition-colors"
            >
              See pricing →
            </a>
          </div>
        )}

      </div>
    </main>
  );
}
