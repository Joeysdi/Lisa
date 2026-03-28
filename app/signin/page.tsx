"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createSupabaseBrowserClient();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin;

    const { error: err } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${siteUrl}/auth/callback` },
    });

    if (err) {
      setError(err.message);
      setLoading(false);
    } else {
      setSent(true);
    }
  }

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center px-5 sm:px-8">
      <div className="w-full max-w-sm">
        {/* Wordmark */}
        <div className="mb-12 flex items-center gap-3">
          <span className="text-white font-bold text-xs tracking-[.4em] uppercase">LISA</span>
          <span className="w-px h-4 bg-white/15" />
          <span className="text-[9px] tracking-[.2em] uppercase text-white/40 font-sans">
            PROTECTION
          </span>
        </div>

        {sent ? (
          <div>
            <p className="text-white font-display text-2xl font-light mb-3">
              Check your email
            </p>
            <p className="text-white/40 text-sm font-sans leading-relaxed">
              We sent a magic link to <span className="text-white/70">{email}</span>. Click it to sign in.
            </p>
          </div>
        ) : (
          <>
            <p className="text-white font-display text-2xl font-light mb-2">
              Sign in
            </p>
            <p className="text-white/40 text-sm font-sans mb-8">
              Enter your email to receive a magic link.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full bg-white/5 border border-white/12 text-white placeholder-white/25
                           text-sm font-sans px-4 py-3 outline-none focus:border-white/30
                           transition-colors"
              />

              {error && (
                <p className="text-red-400 text-xs font-mono">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-sans font-medium text-[10px]
                           tracking-[.08em] py-4 uppercase rounded-full
                           hover:bg-white/90 transition-colors
                           disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? "Sending…" : "Send magic link"}
              </button>
            </form>

            <p className="mt-6 text-white/25 text-xs font-sans text-center">
              No account needed — just enter your email.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
