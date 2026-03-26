"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FadeUp, StaggerParent, StaggerChild } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";

const PRO_M = 49, PRO_A = 39;

function Check({ ok }: { ok: boolean }) {
  return <span className={`text-xs font-mono shrink-0 ${ok?"text-white":"text-white/15"}`}>{ok?"✓":"×"}</span>;
}

const freeFeats = [
  {t:"Face & voice monitoring",ok:true},{t:"Weekly scan reports",ok:true},
  {t:"Suspicious content alerts",ok:true},{t:"Manual removal requests",ok:true},
  {t:"Personal dashboard",ok:true},{t:"Automated DMCA",ok:false},
  {t:"Deepfake & AI detection",ok:false},{t:"Dark Web scanning",ok:false},
];
const proFeats = [
  {t:"Everything in Free",ok:true},{t:"Real-time scanning & alerts",ok:true},
  {t:"Automated DMCA enforcement",ok:true},{t:"Deepfake & AI detection",ok:true},
  {t:"Voice cloning protection",ok:true},{t:"Dark Web scanning",ok:true},
  {t:"Monthly threat reports",ok:true},{t:"Priority support",ok:true},
];
const entFeats = [
  {t:"Everything in Pro",ok:true},{t:"Unlimited talent management",ok:true},
  {t:"Developer API access",ok:true},{t:"Custom licensing workflows",ok:true},
  {t:"White-label reporting",ok:true},{t:"SLA removal guarantee",ok:true},
  {t:"Dedicated account manager",ok:true},{t:"Legal team access",ok:true},
];
const tableRows = [
  ["Face monitoring","✓","✓","✓"],["Voice monitoring","✓","✓","✓"],
  ["Scan frequency","Weekly","Real-time","Real-time"],["Auto DMCA","—","✓","✓"],
  ["Deepfake detection","—","✓","✓"],["Voice cloning","—","✓","✓"],
  ["Dark Web","—","✓","✓"],["Licensing tools","—","Basic","Full"],
  ["API access","—","—","✓"],["Multi-talent","—","—","✓"],
];

export function Pricing() {
  const { t } = useLocale();
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="bg-black py-28 flex flex-col items-center">
      <div className="w-full max-w-4xl px-6 sm:px-8">

        <FadeUp className="text-center mb-12">
          <p className="text-white/25 text-xs font-mono tracking-[.2em] uppercase mb-3">{t("pricing_eyebrow")}</p>
          <h2 className="text-white font-extrabold text-[clamp(28px,5vw,48px)] leading-tight tracking-tight">
            {t("pricing_h2_1")}{" "}
            <span className="text-white/30">{t("pricing_h2_2")}</span>
          </h2>
          <p className="text-white/30 text-sm mt-3 max-w-sm mx-auto">{t("pricing_sub")}</p>
        </FadeUp>

        {/* Toggle */}
        <FadeUp delay={0.05} className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-1 border border-white/8 rounded-xl p-1">
            {[false,true].map(isA => (
              <button key={String(isA)} onClick={() => setAnnual(isA)}
                className={`relative px-5 py-2 rounded-lg text-xs font-medium transition-all duration-200
                  ${annual===isA ? "text-black" : "text-white/30 hover:text-white/60"}`}>
                {annual===isA && (
                  <motion.div layoutId="pill" className="absolute inset-0 bg-white rounded-lg"
                    transition={{type:"spring",stiffness:400,damping:30}} />
                )}
                <span className="relative">
                  {isA ? `${t("pricing_annual")} — ${t("pricing_save")}` : t("pricing_monthly")}
                </span>
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Plans */}
        <StaggerParent className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">

          <StaggerChild>
            <div className="flex flex-col gap-4 p-6 rounded-2xl border border-white/8 bg-[#0a0a0a] h-full">
              <div>
                <p className="text-white/30 text-[10px] font-mono tracking-wider uppercase mb-2">{t("tier_free_name")}</p>
                <p className="text-white font-medium text-sm mb-3">{t("tier_free_for")}</p>
                <p className="font-extrabold text-4xl text-white leading-none tracking-tight mb-1">
                  {t("tier_free_price")}
                  <span className="text-white/25 text-sm font-normal ml-1">{t("tier_free_cycle")}</span>
                </p>
                <p className="text-white/20 text-xs font-mono">{t("tier_free_note")}</p>
              </div>
              <p className="text-white/30 text-xs leading-relaxed pt-3 border-t border-white/5">{t("tier_free_desc")}</p>
              <ul className="flex flex-col gap-2.5 flex-1">
                {freeFeats.map(f => (
                  <li key={f.t} className="flex items-center gap-2.5 text-xs text-left">
                    <Check ok={f.ok} /><span className={f.ok?"text-white/60":"text-white/18"}>{f.t}</span>
                  </li>
                ))}
              </ul>
              <a href="#demo"
                className="block text-center border border-white/12 text-white/50 text-xs font-semibold
                           py-3 rounded-xl hover:border-white/25 hover:text-white/80 transition-all">
                {t("tier_free_cta")}
              </a>
            </div>
          </StaggerChild>

          <StaggerChild>
            <div className="relative flex flex-col gap-4 p-6 rounded-2xl border border-white/20
                             bg-white/[0.06] h-full shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset]">
              <div className="absolute -top-3 left-5">
                <span className="bg-white text-black text-[10px] font-extrabold tracking-wide
                                  px-3 py-1 rounded-full">{t("tier_pro_badge")}</span>
              </div>
              <div className="mt-2">
                <p className="text-white/50 text-[10px] font-mono tracking-wider uppercase mb-2">{t("tier_pro_name")}</p>
                <p className="text-white font-medium text-sm mb-3">{t("tier_pro_for")}</p>
                <p className="font-extrabold text-4xl text-white leading-none tracking-tight mb-1">
                  ${annual?PRO_A:PRO_M}
                  <span className="text-white/30 text-sm font-normal ml-1">
                    {annual?t("tier_pro_cycle_a"):t("tier_pro_cycle_m")}
                  </span>
                </p>
                <p className="text-white/30 text-xs font-mono">{t("tier_pro_note")}</p>
              </div>
              <p className="text-white/35 text-xs leading-relaxed pt-3 border-t border-white/8">{t("tier_pro_desc")}</p>
              <ul className="flex flex-col gap-2.5 flex-1">
                {proFeats.map(f => (
                  <li key={f.t} className="flex items-center gap-2.5 text-xs text-left">
                    <Check ok={f.ok} /><span className="text-white/70">{f.t}</span>
                  </li>
                ))}
              </ul>
              <a href="#demo"
                className="block text-center bg-white text-black text-xs font-semibold
                           py-3 rounded-xl hover:bg-white/88 transition-colors">
                {t("tier_pro_cta")}
              </a>
            </div>
          </StaggerChild>

          <StaggerChild>
            <div className="flex flex-col gap-4 p-6 rounded-2xl border border-white/8 bg-[#0a0a0a] h-full">
              <div>
                <p className="text-white/30 text-[10px] font-mono tracking-wider uppercase mb-2">{t("tier_ent_name")}</p>
                <p className="text-white font-medium text-sm mb-3">{t("tier_ent_for")}</p>
                <p className="font-extrabold text-4xl text-white leading-none tracking-tight mb-1">{t("tier_ent_price")}</p>
                <p className="text-white/20 text-xs font-mono">{t("tier_ent_note")}</p>
              </div>
              <p className="text-white/30 text-xs leading-relaxed pt-3 border-t border-white/5">{t("tier_ent_desc")}</p>
              <ul className="flex flex-col gap-2.5 flex-1">
                {entFeats.map(f => (
                  <li key={f.t} className="flex items-center gap-2.5 text-xs text-left">
                    <Check ok={f.ok} /><span className="text-white/60">{f.t}</span>
                  </li>
                ))}
              </ul>
              <a href="#demo"
                className="block text-center border border-white/12 text-white/50 text-xs font-semibold
                           py-3 rounded-xl hover:border-white/25 hover:text-white/80 transition-all">
                {t("tier_ent_cta")}
              </a>
            </div>
          </StaggerChild>

        </StaggerParent>

        {/* Table */}
        <FadeUp delay={0.1}>
          <div className="overflow-x-auto rounded-2xl border border-white/6">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/6">
                  <th className="text-left px-5 py-3.5 text-white/20 font-mono text-[10px] tracking-wider uppercase w-1/2">Feature</th>
                  <th className="px-4 py-3.5 text-white/25 font-mono text-[10px]">Free</th>
                  <th className="px-4 py-3.5 text-white font-mono text-[10px]">Pro</th>
                  <th className="px-4 py-3.5 text-white/25 font-mono text-[10px]">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map(([feat,f,p,e],i) => (
                  <tr key={feat} className={`border-b border-white/4 last:border-0 ${i%2===0?"":"bg-white/[0.012]"}`}>
                    <td className="px-5 py-3 text-white/40">{feat}</td>
                    <td className="px-4 py-3 text-center text-white/20 font-mono">{f}</td>
                    <td className="px-4 py-3 text-center text-white font-mono font-semibold">{p}</td>
                    <td className="px-4 py-3 text-center text-white/20 font-mono">{e}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}
