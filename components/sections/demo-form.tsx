"use client";

import { useState, FormEvent } from "react";
import { FadeUp } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";
import { Button } from "@/components/ui/button";

const points = [
  { tKey:"demo_pt1_t" as const, dKey:"demo_pt1_d" as const },
  { tKey:"demo_pt2_t" as const, dKey:"demo_pt2_d" as const },
  { tKey:"demo_pt3_t" as const, dKey:"demo_pt3_d" as const },
  { tKey:"demo_pt4_t" as const, dKey:"demo_pt4_d" as const },
];

export function DemoForm() {
  const { t } = useLocale();

  const [form, setForm] = useState({ email: "", role: "", social: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string|null>(null);

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) =>
      setForm(f => ({...f, [k]: e.target.value}));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault(); setLoading(true); setError(null);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error ?? "Submission failed"); }
      setSuccess(true);
    } catch(err) { setError(err instanceof Error ? err.message : "Something went wrong"); }
    finally { setLoading(false); }
  };

  const inputClass = `w-full bg-white/[0.04] border border-white/10 px-5 py-3.5
                      text-white text-sm placeholder:text-white/25
                      focus:outline-none focus:border-white/35 focus:bg-white/[0.06]
                      focus-visible:ring-1 focus-visible:ring-white/30
                      transition-all duration-150`;

  return (
    <section id="demo" className="bg-surface-dark py-32 border-t border-white/6">
      <div className="w-full max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left — heading + value props */}
          <FadeUp>
            <span className="text-[10px] tracking-[.3em] uppercase font-sans text-white/30 mb-6 block">
              {t("demo_eyebrow")}
            </span>
            <h2
              className="font-display font-light italic text-white mb-10"
              style={{ fontSize: "clamp(30px, 4vw, 52px)" }}
            >
              {t("demo_split_h1")}
            </h2>
            <div className="flex flex-col gap-6">
              {points.map(p => (
                <div key={p.tKey} className="flex gap-3">
                  <div className="w-px bg-white/12 shrink-0 mt-1" />
                  <div>
                    <div className="text-white font-sans text-sm font-medium leading-snug">{t(p.tKey)}</div>
                    <div className="text-white/40 text-xs leading-relaxed mt-1 font-sans">{t(p.dKey)}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Right — single form */}
          <FadeUp delay={0.08}>
            {success ? (
              <div className="py-12">
                <div className="text-white/50 font-mono text-3xl mb-6">✓</div>
                <p className="text-white font-semibold text-lg mb-2 font-sans">{t("demo_success")}</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-5">

                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-[.15em] uppercase text-white/45 font-sans">
                    {t("demo_email")}
                  </label>
                  <input type="email" required value={form.email} onChange={set("email")}
                    placeholder="you@example.com" className={inputClass} />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-[.15em] uppercase text-white/45 font-sans">
                    {t("demo_role")}
                  </label>
                  <select required value={form.role} onChange={set("role")}
                    className={inputClass + " cursor-pointer"}
                    style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
                    <option value="" disabled style={{ background: "#111" }}>—</option>
                    {(["demo_role1","demo_role2","demo_role3","demo_role4","demo_role5"] as const).map(k => (
                      <option key={k} value={t(k)} style={{ background: "#111" }}>{t(k)}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-[.15em] uppercase text-white/45 font-sans">
                    {t("demo_social")}
                  </label>
                  <input type="text" value={form.social} onChange={set("social")}
                    placeholder="@yourhandle" className={inputClass} />
                </div>

                {error && (
                  <p className="text-white/50 text-sm text-center border border-white/10 py-3 font-sans">
                    {error}
                  </p>
                )}

                <Button variant="accent" type="submit" disabled={loading}
                  className="w-full justify-center mt-2">
                  {loading ? "…" : t("demo_submit_accent")}
                </Button>

                <div className="flex items-center justify-center gap-3 mt-1">
                  <a href="#" className="text-white/35 text-xs font-sans hover:text-white/60 transition-colors">
                    {t("demo_split_h2")}
                  </a>
                </div>

                <p className="text-white/20 text-xs font-sans text-center">{t("demo_note")}</p>
              </form>
            )}
          </FadeUp>

        </div>
      </div>
    </section>
  );
}
