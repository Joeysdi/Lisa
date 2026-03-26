"use client";

import { useState, FormEvent } from "react";
import { FadeUp } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";

const points = [
  { tKey:"demo_pt1_t" as const, dKey:"demo_pt1_d" as const },
  { tKey:"demo_pt2_t" as const, dKey:"demo_pt2_d" as const },
  { tKey:"demo_pt3_t" as const, dKey:"demo_pt3_d" as const },
  { tKey:"demo_pt4_t" as const, dKey:"demo_pt4_d" as const },
];

export function DemoForm() {
  const { t } = useLocale();
  const [form, setForm] = useState({ firstName:"", lastName:"", email:"", social:"", role:"", concern:"" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error,   setError]   = useState<string|null>(null);

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) =>
      setForm(f => ({...f, [k]: e.target.value}));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault(); setLoading(true); setError(null);
    try {
      const res = await fetch("/api/demo", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form)});
      if (!res.ok) { const d = await res.json(); throw new Error(d.error ?? "Submission failed"); }
      setSuccess(true);
    } catch(err) { setError(err instanceof Error ? err.message : "Something went wrong"); }
    finally { setLoading(false); }
  };

  const inputClass = `w-full bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-3.5
                      text-white text-sm placeholder:text-white/25
                      focus:outline-none focus:border-white/35 focus:bg-white/[0.06]
                      transition-all duration-150`;

  return (
    <section id="demo" className="bg-[#050505] py-32 flex flex-col items-center">
      <div className="w-full max-w-6xl px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* Left */}
          <FadeUp delay={0.05} className="flex flex-col">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-white/20" />
              <span className="text-[10px] tracking-[.3em] uppercase font-sans text-white/30">GET STARTED</span>
            </div>

            {/* Headline */}
            <h2
              className="font-display font-light italic text-white"
              style={{ fontSize: "clamp(40px, 5.5vw, 72px)" }}
            >
              {t("demo_h2")}
            </h2>

            {/* Subtext */}
            <p className="text-white/45 text-base mt-5 max-w-xs font-sans leading-relaxed">
              {t("demo_form_sub")}
            </p>

            {/* Value points */}
            <div className="mt-14 flex flex-col gap-8">
              {points.map((p) => (
                <div key={p.tKey} className="flex gap-4">
                  <div className="w-px bg-white/12 shrink-0 mt-1" />
                  <div>
                    <div className="text-white font-sans text-base font-medium leading-snug">{t(p.tKey)}</div>
                    <div className="text-white/45 text-sm leading-relaxed mt-1.5 font-sans">{t(p.dKey)}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Right — form */}
          <FadeUp delay={0.1}>
            {success ? (
              <div className="text-center py-20">
                <div className="text-white/50 font-mono text-3xl mb-6">✓</div>
                <p className="text-white font-semibold text-lg mb-3 font-sans">{t("demo_success")}</p>
                <p className="text-white/35 text-sm font-sans">{t("demo_note")}</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-5">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs tracking-[.15em] uppercase text-white/35 font-sans">
                      {t("demo_fname")}
                    </label>
                    <input type="text" required value={form.firstName} onChange={set("firstName")}
                      placeholder="Jane" className={inputClass} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs tracking-[.15em] uppercase text-white/35 font-sans">
                      {t("demo_lname")}
                    </label>
                    <input type="text" required value={form.lastName} onChange={set("lastName")}
                      placeholder="Smith" className={inputClass} />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-[.15em] uppercase text-white/35 font-sans">
                    {t("demo_email")}
                  </label>
                  <input type="email" required value={form.email} onChange={set("email")}
                    placeholder="you@example.com" className={inputClass} />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-[.15em] uppercase text-white/35 font-sans">
                    {t("demo_social")}
                  </label>
                  <input type="text" required value={form.social} onChange={set("social")}
                    placeholder="@yourhandle" className={inputClass} />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-[.15em] uppercase text-white/35 font-sans">
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
                  <label className="text-xs tracking-[.15em] uppercase text-white/35 font-sans">
                    {t("demo_concern")}
                  </label>
                  <textarea rows={3} value={form.concern} onChange={set("concern")}
                    placeholder={t("demo_concern_ph")}
                    className={inputClass + " resize-none"} />
                </div>

                {error && (
                  <p className="text-white/50 text-sm text-center border border-white/10 rounded-2xl py-3 font-sans">
                    {error}
                  </p>
                )}

                <button type="submit" disabled={loading}
                  className="w-full bg-white text-black font-sans font-medium text-sm
                             py-4 mt-2 rounded-full hover:bg-white/90 transition-colors
                             disabled:opacity-40 disabled:cursor-not-allowed">
                  {loading ? "…" : t("demo_submit")}
                </button>

                <p className="text-white/25 text-xs text-center leading-relaxed font-sans">
                  {t("demo_note")}
                </p>

              </form>
            )}
          </FadeUp>

        </div>
      </div>
    </section>
  );
}
