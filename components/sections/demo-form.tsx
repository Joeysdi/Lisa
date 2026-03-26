"use client";

import { useState, FormEvent } from "react";
import { FadeUp } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";

const points = [
  { icon: "🎯", tKey: "demo_pt1_t" as const, dKey: "demo_pt1_d" as const },
  { icon: "⚡", tKey: "demo_pt2_t" as const, dKey: "demo_pt2_d" as const },
  { icon: "🔒", tKey: "demo_pt3_t" as const, dKey: "demo_pt3_d" as const },
  { icon: "👥", tKey: "demo_pt4_t" as const, dKey: "demo_pt4_d" as const },
];

export function DemoForm() {
  const { t } = useLocale();
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    social: "", role: "", concern: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error ?? "Submission failed");
      }
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = `w-full bg-black border border-white/8 rounded-xl px-4 py-3
                    text-white text-[14px] placeholder:text-white/18
                    focus:outline-none focus:border-white/25
                    transition-[border-color] duration-150`;

  return (
    <section id="demo" className="py-28 px-6 md:px-12 bg-black">
      <div className="max-w-6xl mx-auto">

        <FadeUp className="mb-14">
          <p className="text-white/25 text-[11px] font-mono tracking-[.2em] uppercase mb-4">
            {t("demo_eyebrow")}
          </p>
          <h2 className="text-white font-extrabold text-[clamp(28px,5vw,48px)]
                         leading-tight tracking-[-1px]">
            {t("demo_h2")}
          </h2>
        </FadeUp>

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Value points */}
          <FadeUp delay={0.1} className="flex flex-col gap-8">
            {points.map((p) => (
              <div key={p.tKey} className="flex gap-4">
                <div className="text-[22px] flex-shrink-0">{p.icon}</div>
                <div>
                  <div className="text-white font-semibold text-[15px] mb-1.5">{t(p.tKey)}</div>
                  <div className="text-white/35 text-[13px] leading-relaxed">{t(p.dKey)}</div>
                </div>
              </div>
            ))}
          </FadeUp>

          {/* Form */}
          <FadeUp delay={0.12}>
            <div className="rounded-2xl border border-white/8 p-8 bg-[#0a0a0a]">
              {success ? (
                <div className="text-center py-10">
                  <div className="text-[40px] mb-5">✓</div>
                  <p className="text-white font-semibold text-[17px] mb-2">{t("demo_success")}</p>
                  <p className="text-white/30 text-[13px]">{t("demo_note")}</p>
                </div>
              ) : (
                <>
                  <h3 className="text-white font-bold text-[20px] mb-1.5 tracking-[-0.3px]">
                    {t("demo_form_h")}
                  </h3>
                  <p className="text-white/30 text-[13px] mb-7">{t("demo_form_sub")}</p>

                  <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-white/35 text-[12px] font-mono">{t("demo_fname")}</label>
                        <input type="text" required value={form.firstName} onChange={set("firstName")}
                          placeholder="Jane" className={inputCls} />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-white/35 text-[12px] font-mono">{t("demo_lname")}</label>
                        <input type="text" required value={form.lastName} onChange={set("lastName")}
                          placeholder="Smith" className={inputCls} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-white/35 text-[12px] font-mono">{t("demo_email")}</label>
                      <input type="email" required value={form.email} onChange={set("email")}
                        placeholder="you@example.com" className={inputCls} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-white/35 text-[12px] font-mono">{t("demo_social")}</label>
                      <input type="text" required value={form.social} onChange={set("social")}
                        placeholder="@yourhandle" className={inputCls} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-white/35 text-[12px] font-mono">{t("demo_role")}</label>
                      <select required value={form.role} onChange={set("role")}
                        className={inputCls + " cursor-pointer"}>
                        <option value="" disabled>—</option>
                        {(["demo_role1","demo_role2","demo_role3","demo_role4","demo_role5"] as const).map((k) => (
                          <option key={k} value={t(k)}>{t(k)}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-white/35 text-[12px] font-mono">{t("demo_concern")}</label>
                      <textarea rows={3} value={form.concern} onChange={set("concern")}
                        placeholder={t("demo_concern_ph")}
                        className={inputCls + " resize-none"} />
                    </div>

                    {error && (
                      <p className="text-white/60 text-[12px] text-center border border-white/10
                                    rounded-lg py-2">{error}</p>
                    )}

                    <button type="submit" disabled={loading}
                      className="w-full bg-white text-black font-bold text-[14px]
                                 py-3.5 rounded-xl transition-all duration-200
                                 hover:bg-white/88 hover:-translate-y-0.5
                                 disabled:opacity-40 disabled:cursor-not-allowed
                                 disabled:hover:transform-none">
                      {loading ? "…" : t("demo_submit")}
                    </button>
                    <p className="text-white/18 text-[11px] text-center leading-relaxed">
                      {t("demo_note")}
                    </p>
                  </form>
                </>
              )}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
