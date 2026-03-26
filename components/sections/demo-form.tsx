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
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);

  const set = (k: keyof typeof form) => (
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }))
  );

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

  const inputCls = `w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3
                    text-white text-[14px] placeholder:text-white/25
                    focus:outline-none focus:border-green-400/50 focus:bg-[#0a0a0a]
                    transition-[border-color] duration-150`;

  return (
    <section id="demo" className="py-24 px-[6%] bg-black">
      <div className="max-w-6xl mx-auto">

        <FadeUp className="text-center mb-14">
          <div className="inline-block text-white/30 text-[11px] font-medium tracking-[.2em]
                          uppercase mb-4 px-3 py-1 rounded-full border border-white/8">
            {t("demo_eyebrow")}
          </div>
          <h2 className="text-white font-extrabold text-[clamp(28px,5vw,44px)] leading-tight">
            {t("demo_h2")}
          </h2>
        </FadeUp>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Points */}
          <FadeUp delay={0.1}>
            <div className="flex flex-col gap-6">
              {points.map((p) => (
                <div key={p.tKey} className="flex gap-4">
                  <div className="text-[24px] flex-shrink-0 mt-0.5">{p.icon}</div>
                  <div>
                    <div className="text-white font-semibold text-[15px] mb-1">{t(p.tKey)}</div>
                    <div className="text-white/40 text-[13px] leading-relaxed">{t(p.dKey)}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Form card */}
          <FadeUp delay={0.15}>
            <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-8
                             shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]">
              {success ? (
                <div className="text-center py-8">
                  <div className="text-[48px] mb-4">✅</div>
                  <p className="text-white font-semibold text-[17px] mb-2">{t("demo_success")}</p>
                  <p className="text-white/40 text-[13px]">{t("demo_note")}</p>
                </div>
              ) : (
                <>
                  <h3 className="text-white font-bold text-[19px] mb-1">{t("demo_form_h")}</h3>
                  <p className="text-white/40 text-[13px] mb-6">{t("demo_form_sub")}</p>

                  <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-white/50 text-[12px] font-medium">{t("demo_fname")}</label>
                        <input type="text" required value={form.firstName} onChange={set("firstName")}
                          placeholder="สมหญิง / Jane" className={inputCls} />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-white/50 text-[12px] font-medium">{t("demo_lname")}</label>
                        <input type="text" required value={form.lastName} onChange={set("lastName")}
                          placeholder="ใจดี / Smith" className={inputCls} />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-white/50 text-[12px] font-medium">{t("demo_email")}</label>
                      <input type="email" required value={form.email} onChange={set("email")}
                        placeholder="you@example.com" className={inputCls} />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-white/50 text-[12px] font-medium">{t("demo_social")}</label>
                      <input type="text" required value={form.social} onChange={set("social")}
                        placeholder="@yourhandle" className={inputCls} />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-white/50 text-[12px] font-medium">{t("demo_role")}</label>
                      <select required value={form.role} onChange={set("role")}
                        className={inputCls + " cursor-pointer"}>
                        <option value="" disabled>—</option>
                        {(["demo_role1","demo_role2","demo_role3","demo_role4","demo_role5"] as const).map((k) => (
                          <option key={k} value={t(k)}>{t(k)}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-white/50 text-[12px] font-medium">{t("demo_concern")}</label>
                      <textarea rows={3} value={form.concern} onChange={set("concern")}
                        placeholder={t("demo_concern_ph")}
                        className={inputCls + " resize-none"} />
                    </div>

                    {error && (
                      <p className="text-red-400 text-[12px] text-center">{error}</p>
                    )}

                    <button type="submit" disabled={loading}
                      className="w-full bg-green-400 text-black font-bold text-[15px]
                                 py-3.5 rounded-xl transition-all duration-200
                                 hover:bg-green-300 hover:-translate-y-0.5
                                 hover:shadow-[0_8px_24px_rgba(74,222,128,0.3)]
                                 disabled:opacity-50 disabled:cursor-not-allowed
                                 disabled:hover:transform-none">
                      {loading ? "…" : t("demo_submit")}
                    </button>

                    <p className="text-white/25 text-[11px] text-center leading-relaxed">
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
