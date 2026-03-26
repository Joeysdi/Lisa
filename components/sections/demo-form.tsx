"use client";

import { useState, FormEvent } from "react";
import { FadeUp } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";

const points = [
  { icon:"🎯", tKey:"demo_pt1_t" as const, dKey:"demo_pt1_d" as const },
  { icon:"⚡", tKey:"demo_pt2_t" as const, dKey:"demo_pt2_d" as const },
  { icon:"🔒", tKey:"demo_pt3_t" as const, dKey:"demo_pt3_d" as const },
  { icon:"👥", tKey:"demo_pt4_t" as const, dKey:"demo_pt4_d" as const },
];

export function DemoForm() {
  const { t } = useLocale();
  const [form, setForm] = useState({ firstName:"",lastName:"",email:"",social:"",role:"",concern:"" });
  const [loading,setLoading] = useState(false);
  const [success,setSuccess] = useState(false);
  const [error,  setError]   = useState<string|null>(null);

  const set = (k:keyof typeof form) =>
    (e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) =>
      setForm(f => ({...f,[k]:e.target.value}));

  const onSubmit = async (e:FormEvent) => {
    e.preventDefault(); setLoading(true); setError(null);
    try {
      const res = await fetch("/api/demo",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
      if(!res.ok){const d=await res.json();throw new Error(d.error??"Submission failed");}
      setSuccess(true);
    } catch(err){ setError(err instanceof Error ? err.message : "Something went wrong"); }
    finally{ setLoading(false); }
  };

  const input = `w-full bg-[#050505] border border-white/8 rounded-xl px-4 py-3.5 text-white
                 text-base placeholder:text-white/20 focus:outline-none focus:border-white/25
                 transition-[border-color] duration-150`;

  return (
    <section id="demo" className="bg-black py-28">
      <div className="w-full max-w-6xl mx-auto px-6 sm:px-8">

        <FadeUp className="mb-14">
          <p className="text-white/25 text-xs font-mono tracking-[.2em] uppercase mb-3">{t("demo_eyebrow")}</p>
          <h2 className="text-white font-extrabold text-[clamp(30px,5vw,52px)] leading-tight tracking-tight">
            {t("demo_h2")}
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Value points */}
          <FadeUp delay={0.05} className="flex flex-col gap-8">
            {points.map((p) => (
              <div key={p.tKey} className="flex gap-4">
                <span className="text-2xl shrink-0">{p.icon}</span>
                <div>
                  <div className="text-white font-semibold text-base mb-1.5">{t(p.tKey)}</div>
                  <div className="text-white/35 text-sm leading-relaxed">{t(p.dKey)}</div>
                </div>
              </div>
            ))}
          </FadeUp>

          {/* Form card */}
          <FadeUp delay={0.1}>
            <div className="rounded-2xl border border-white/8 p-8 bg-[#0a0a0a]">
              {success ? (
                <div className="text-center py-10">
                  <div className="text-4xl mb-5">✓</div>
                  <p className="text-white font-semibold text-lg mb-2">{t("demo_success")}</p>
                  <p className="text-white/30 text-sm">{t("demo_note")}</p>
                </div>
              ) : (
                <>
                  <h3 className="text-white font-bold text-xl mb-1.5">{t("demo_form_h")}</h3>
                  <p className="text-white/30 text-sm mb-7">{t("demo_form_sub")}</p>
                  <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-white/35 text-xs font-mono tracking-wider">{t("demo_fname")}</label>
                        <input type="text" required value={form.firstName} onChange={set("firstName")}
                          placeholder="Jane" className={input} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-white/35 text-xs font-mono tracking-wider">{t("demo_lname")}</label>
                        <input type="text" required value={form.lastName} onChange={set("lastName")}
                          placeholder="Smith" className={input} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-white/35 text-xs font-mono tracking-wider">{t("demo_email")}</label>
                      <input type="email" required value={form.email} onChange={set("email")}
                        placeholder="you@example.com" className={input} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-white/35 text-xs font-mono tracking-wider">{t("demo_social")}</label>
                      <input type="text" required value={form.social} onChange={set("social")}
                        placeholder="@yourhandle" className={input} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-white/35 text-xs font-mono tracking-wider">{t("demo_role")}</label>
                      <select required value={form.role} onChange={set("role")} className={input+" cursor-pointer"}>
                        <option value="" disabled>—</option>
                        {(["demo_role1","demo_role2","demo_role3","demo_role4","demo_role5"] as const).map(k=>(
                          <option key={k} value={t(k)}>{t(k)}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-white/35 text-xs font-mono tracking-wider">{t("demo_concern")}</label>
                      <textarea rows={3} value={form.concern} onChange={set("concern")}
                        placeholder={t("demo_concern_ph")} className={input+" resize-none"} />
                    </div>
                    {error && (
                      <p className="text-white/50 text-sm text-center border border-white/8
                                    rounded-xl py-2.5">{error}</p>
                    )}
                    <button type="submit" disabled={loading}
                      className="w-full bg-white text-black font-bold text-base py-4 rounded-xl
                                 transition-all duration-200 hover:bg-white/88 hover:-translate-y-0.5
                                 disabled:opacity-40 disabled:cursor-not-allowed mt-2">
                      {loading ? "…" : t("demo_submit")}
                    </button>
                    <p className="text-white/18 text-xs text-center leading-relaxed">{t("demo_note")}</p>
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
