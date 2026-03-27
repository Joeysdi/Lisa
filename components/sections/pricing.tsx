"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FadeUp, StaggerParent, StaggerChild } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";
import { Button } from "@/components/ui/button";

const PRO_M = 49, PRO_A = 39;

function Check({ ok, dark }: { ok: boolean; dark?: boolean }) {
  if (dark) {
    return <span className={`text-xs font-mono shrink-0 ${ok ? "text-white" : "text-white/15"}`}>{ok ? "✓" : "×"}</span>;
  }
  return <span className={`text-xs font-mono shrink-0 ${ok ? "text-black" : "text-black/15"}`}>{ok ? "✓" : "×"}</span>;
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
  ["Scan frequency","Weekly","Real-time","Real-time"],
  ["Auto DMCA","—","✓","✓"],
  ["Deepfake detection","—","✓","✓"],
  ["Dark Web","—","✓","✓"],
  ["API access","—","—","✓"],
];

export function Pricing() {
  const { t } = useLocale();
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="bg-white py-24 border-t border-black/8 flex flex-col items-center">
      <div className="w-full max-w-6xl px-8">

        <FadeUp className="mb-12">
          {/* Section marker */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-black/15 text-xs">05</span>
            <div className="w-8 h-px bg-black/10" />
            <span className="text-[10px] tracking-[.3em] uppercase text-black/25 font-sans">PRICING</span>
          </div>
          <h2
            className="font-display font-light text-black"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            {t("pricing_h2_1")}{" "}
            <span className="text-black/35">{t("pricing_h2_2")}</span>
          </h2>
          <p className="text-black/35 text-sm mt-3 max-w-sm font-sans">{t("pricing_sub")}</p>
        </FadeUp>

        {/* Toggle */}
        <FadeUp delay={0.05} className="flex justify-start mb-10 mt-6">
          <div className="inline-flex border border-black/12 p-0.5">
            {[false, true].map(isA => (
              <button key={String(isA)} onClick={() => setAnnual(isA)}
                className={`relative px-5 py-2 text-xs font-sans transition-all duration-200
                  ${annual === isA ? "text-white" : "text-black/40 hover:text-black/70"}`}>
                {annual === isA && (
                  <motion.div layoutId="pill" className="absolute inset-0 bg-black"
                    transition={{ type:"spring", stiffness:400, damping:30 }} />
                )}
                <span className="relative">
                  {isA ? `${t("pricing_annual")} — ${t("pricing_save")}` : t("pricing_monthly")}
                </span>
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Plans */}
        <StaggerParent className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

          {/* Free */}
          <StaggerChild>
            <div className="flex flex-col gap-4 p-7 bg-stone-50 border border-black/8 h-full">
              <div>
                <p className="text-[9px] tracking-[.3em] uppercase text-black/35 font-sans mb-2">{t("tier_free_name")}</p>
                <p className="text-black font-sans font-medium text-sm mb-3">{t("tier_free_for")}</p>
                <p className="font-display font-light text-5xl text-black leading-none mb-1">
                  {t("tier_free_price")}
                  <span className="text-black/25 text-sm font-sans font-normal ml-2">{t("tier_free_cycle")}</span>
                </p>
                <p className="text-black/25 text-xs font-mono">{t("tier_free_note")}</p>
              </div>
              <p className="text-black/30 text-xs leading-relaxed pt-3 border-t border-black/6 font-sans">{t("tier_free_desc")}</p>
              <ul className="flex flex-col gap-2.5 flex-1">
                {freeFeats.map(f => (
                  <li key={f.t} className="flex items-center gap-2.5 text-sm text-left font-sans">
                    <Check ok={f.ok} />
                    <span className={f.ok ? "text-black/70" : "text-black/25"}>{f.t}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline-dark" href="#demo" className="w-full justify-center">
                {t("tier_free_cta")}
              </Button>
            </div>
          </StaggerChild>

          {/* Pro */}
          <StaggerChild>
            <div className="flex flex-col gap-4 p-7 bg-black text-white h-full">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[9px] tracking-[.3em] uppercase text-white/40 font-sans">{t("tier_pro_name")}</p>
                  <span className="text-[10px] font-sans text-white/55 border border-white/15 px-2 py-0.5">
                    {t("tier_pro_badge")}
                  </span>
                </div>
                <p className="text-white font-sans font-medium text-sm mb-3">{t("tier_pro_for")}</p>
                <p className="font-display font-light text-5xl text-white leading-none mb-1">
                  ${annual ? PRO_A : PRO_M}
                  <span className="text-white/30 text-sm font-sans font-normal ml-2">
                    {annual ? t("tier_pro_cycle_a") : t("tier_pro_cycle_m")}
                  </span>
                </p>
                <p className="text-white/30 text-xs font-mono">{t("tier_pro_note")}</p>
              </div>
              <p className="text-white/35 text-xs leading-relaxed pt-3 border-t border-white/8 font-sans">{t("tier_pro_desc")}</p>
              <ul className="flex flex-col gap-2.5 flex-1">
                {proFeats.map(f => (
                  <li key={f.t} className="flex items-center gap-2.5 text-sm text-left font-sans">
                    <Check ok={f.ok} dark />
                    <span className="text-white/80">{f.t}</span>
                  </li>
                ))}
              </ul>
              <Button variant="primary" href="#demo" className="w-full justify-center">
                {t("tier_pro_cta")}
              </Button>
            </div>
          </StaggerChild>

          {/* Enterprise */}
          <StaggerChild>
            <div className="flex flex-col gap-4 p-7 bg-stone-50 border border-black/8 h-full">
              <div>
                <p className="text-[9px] tracking-[.3em] uppercase text-black/35 font-sans mb-2">{t("tier_ent_name")}</p>
                <p className="text-black font-sans font-medium text-sm mb-3">{t("tier_ent_for")}</p>
                <p className="font-display font-light text-5xl text-black leading-none mb-1">{t("tier_ent_price")}</p>
                <p className="text-black/25 text-xs font-mono">{t("tier_ent_note")}</p>
              </div>
              <p className="text-black/30 text-xs leading-relaxed pt-3 border-t border-black/6 font-sans">{t("tier_ent_desc")}</p>
              <ul className="flex flex-col gap-2.5 flex-1">
                {entFeats.map(f => (
                  <li key={f.t} className="flex items-center gap-2.5 text-sm text-left font-sans">
                    <Check ok={f.ok} />
                    <span className="text-black/70">{f.t}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline-dark" href="#demo" className="w-full justify-center">
                {t("tier_ent_cta")}
              </Button>
            </div>
          </StaggerChild>

        </StaggerParent>

        <p className="text-black/35 text-xs font-mono mt-8 mb-4 text-center">
          {t("pricing_guarantee_note")}
        </p>

        {/* Comparison table */}
        <FadeUp delay={0.1}>
          <p className="font-mono text-[10px] text-black/25 mb-3">
            Key differences only — all plans include face &amp; voice monitoring.
          </p>
          <div className="overflow-x-auto border border-black/8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/8">
                  <th className="text-left px-5 py-3.5 text-black/30 font-mono text-[10px] tracking-wider uppercase w-1/2">Feature</th>
                  <th className="px-4 py-3.5 text-black/30 font-mono text-[10px]">Free</th>
                  <th className="px-4 py-3.5 text-black font-semibold font-mono text-[10px]">Pro</th>
                  <th className="px-4 py-3.5 text-black/30 font-mono text-[10px]">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map(([feat,f,p,e]) => (
                  <tr key={feat}
                    className="border-b border-black/5 last:border-0 hover:bg-black/[0.02] transition-colors">
                    <td className="px-5 py-4 text-black/40 font-sans">{feat}</td>
                    <td className="px-4 py-4 text-center text-black/25 font-mono">{f}</td>
                    <td className="px-4 py-4 text-center text-black font-mono font-semibold">{p}</td>
                    <td className="px-4 py-4 text-center text-black/25 font-mono">{e}</td>
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
