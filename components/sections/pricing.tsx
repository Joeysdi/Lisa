"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FadeUp, StaggerParent, StaggerChild } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";

// USD pricing
const PRO_MONTHLY = 49;
const PRO_ANNUAL  = 39;

type CheckItem = { text: string; ok: boolean };

function Check({ ok }: { ok: boolean }) {
  return (
    <span className={ok ? "text-green-400" : "text-white/15"}>
      {ok ? "✓" : "×"}
    </span>
  );
}

export function Pricing() {
  const { t } = useLocale();
  const [annual, setAnnual] = useState(false);

  const freeFeatures: CheckItem[] = [
    { text: "Face & voice monitoring",          ok: true  },
    { text: "Weekly scan reports",              ok: true  },
    { text: "Suspicious content alerts",        ok: true  },
    { text: "Manual removal requests",          ok: true  },
    { text: "Personal dashboard",               ok: true  },
    { text: "Automated DMCA",                   ok: false },
    { text: "Deepfake & AI detection",          ok: false },
    { text: "Dark Web scanning",                ok: false },
  ];

  const proFeatures: CheckItem[] = [
    { text: "Everything in Free",               ok: true },
    { text: "Real-time scanning & alerts",      ok: true },
    { text: "Automated DMCA enforcement",       ok: true },
    { text: "Deepfake & AI content detection",  ok: true },
    { text: "Voice cloning protection",         ok: true },
    { text: "Dark Web scanning",                ok: true },
    { text: "Monthly threat reports",           ok: true },
    { text: "Priority support team",            ok: true },
  ];

  const entFeatures: CheckItem[] = [
    { text: "Everything in Pro",                ok: true },
    { text: "Unlimited talent management",      ok: true },
    { text: "Developer API access",             ok: true },
    { text: "Custom licensing workflows",       ok: true },
    { text: "White-label reporting",            ok: true },
    { text: "SLA-backed removal guarantee",     ok: true },
    { text: "Dedicated account manager",        ok: true },
    { text: "Legal team access",                ok: true },
  ];

  // Comparison table rows
  const tableRows = [
    ["Face monitoring",          "✓", "✓", "✓"],
    ["Voice monitoring",         "✓", "✓", "✓"],
    ["Scan frequency",      "Weekly", "Real-time", "Real-time"],
    ["Auto DMCA removal",        "—", "✓", "✓"],
    ["Deepfake detection",        "—", "✓", "✓"],
    ["Voice cloning detection",   "—", "✓", "✓"],
    ["Dark Web scanning",         "—", "✓", "✓"],
    ["Licensing tools",           "—", "Basic", "Full"],
    ["API access",                "—", "—", "✓"],
    ["Multi-talent management",   "—", "—", "✓"],
  ];

  return (
    <section id="pricing" className="py-24 px-[6%] bg-black">
      <div className="max-w-6xl mx-auto">

        <FadeUp className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
          <div>
            <div className="text-white/30 text-[11px] font-medium tracking-[.2em]
                            uppercase mb-4 inline-block px-3 py-1 rounded-full border border-white/8">
              {t("pricing_eyebrow")}
            </div>
            <h2 className="text-white font-extrabold text-[clamp(28px,5vw,44px)] leading-tight">
              {t("pricing_h2_1")}<br />{t("pricing_h2_2")}
            </h2>
          </div>
          <p className="text-white/40 text-[14px] leading-relaxed max-w-xs">{t("pricing_sub")}</p>
        </FadeUp>

        {/* Toggle */}
        <FadeUp delay={0.1} className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-1 bg-white/5 border border-white/10
                          rounded-full p-1">
            {[false, true].map((isAnnual) => (
              <button
                key={String(isAnnual)}
                onClick={() => setAnnual(isAnnual)}
                className={`relative px-5 py-2 rounded-full text-[13px] font-medium
                            transition-all duration-200
                            ${annual === isAnnual
                              ? "text-black"
                              : "text-white/40 hover:text-white/70"}`}
              >
                {annual === isAnnual && (
                  <motion.div
                    layoutId="pill"
                    className="absolute inset-0 bg-white rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">
                  {isAnnual
                    ? `${t("pricing_annual")} — ${t("pricing_save")}`
                    : t("pricing_monthly")}
                </span>
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Plans */}
        <StaggerParent className="grid md:grid-cols-3 gap-5 mb-16">
          {/* Free */}
          <StaggerChild>
            <div className="bg-[#0f0f0f] border border-white/8 rounded-2xl p-6 flex flex-col gap-4">
              <div>
                <div className="text-white/40 text-[11px] font-semibold tracking-wider uppercase mb-1">
                  {t("tier_free_name")}
                </div>
                <div className="text-white font-semibold text-[15px] mb-3">{t("tier_free_for")}</div>
                <div className="text-white font-extrabold text-[36px] leading-none mb-1">
                  {t("tier_free_price")}{" "}
                  <span className="text-white/35 text-[16px] font-normal">{t("tier_free_cycle")}</span>
                </div>
                <div className="text-white/30 text-[12px]">{t("tier_free_note")}</div>
              </div>
              <p className="text-white/40 text-[13px] leading-relaxed border-t border-white/6 pt-4">
                {t("tier_free_desc")}
              </p>
              <ul className="flex flex-col gap-2.5 flex-1">
                {freeFeatures.map((f) => (
                  <li key={f.text} className="flex items-center gap-2.5 text-[13px]">
                    <Check ok={f.ok} />
                    <span className={f.ok ? "text-white/70" : "text-white/25"}>{f.text}</span>
                  </li>
                ))}
              </ul>
              <a href="#demo"
                className="block text-center border border-white/15 text-white/70
                           text-[14px] font-semibold py-3 rounded-xl
                           hover:border-white/30 hover:text-white transition-all duration-150">
                {t("tier_free_cta")}
              </a>
            </div>
          </StaggerChild>

          {/* Pro */}
          <StaggerChild>
            <div className="relative bg-[#0f0f0f] border border-green-400/40 rounded-2xl p-6
                             flex flex-col gap-4 shadow-[0_0_40px_rgba(74,222,128,0.08)]">
              <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl
                               bg-gradient-to-r from-transparent via-green-400/60 to-transparent" />
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-green-400 text-black text-[10px] font-extrabold
                                  tracking-wider px-3 py-1 rounded-full whitespace-nowrap">
                  {t("tier_pro_badge")}
                </span>
              </div>
              <div>
                <div className="text-green-400/70 text-[11px] font-semibold tracking-wider
                                uppercase mb-1 mt-2">
                  {t("tier_pro_name")}
                </div>
                <div className="text-white font-semibold text-[15px] mb-3">{t("tier_pro_for")}</div>
                <div className="text-white font-extrabold text-[36px] leading-none mb-1">
                  ${annual ? PRO_ANNUAL : PRO_MONTHLY}
                  <span className="text-white/35 text-[16px] font-normal">
                    {" "}{annual ? t("tier_pro_cycle_a") : t("tier_pro_cycle_m")}
                  </span>
                </div>
                <div className="text-white/30 text-[12px]">{t("tier_pro_note")}</div>
              </div>
              <p className="text-white/40 text-[13px] leading-relaxed border-t border-white/6 pt-4">
                {t("tier_pro_desc")}
              </p>
              <ul className="flex flex-col gap-2.5 flex-1">
                {proFeatures.map((f) => (
                  <li key={f.text} className="flex items-center gap-2.5 text-[13px]">
                    <Check ok={f.ok} />
                    <span className="text-white/70">{f.text}</span>
                  </li>
                ))}
              </ul>
              <a href="#demo"
                className="block text-center bg-green-400 text-black text-[14px] font-bold
                           py-3 rounded-xl hover:bg-green-300 transition-colors duration-150">
                {t("tier_pro_cta")}
              </a>
            </div>
          </StaggerChild>

          {/* Enterprise */}
          <StaggerChild>
            <div className="bg-[#0f0f0f] border border-white/8 rounded-2xl p-6 flex flex-col gap-4">
              <div>
                <div className="text-white/40 text-[11px] font-semibold tracking-wider uppercase mb-1">
                  {t("tier_ent_name")}
                </div>
                <div className="text-white font-semibold text-[15px] mb-3">{t("tier_ent_for")}</div>
                <div className="text-white font-extrabold text-[36px] leading-none mb-1">
                  {t("tier_ent_price")}
                </div>
                <div className="text-white/30 text-[12px]">{t("tier_ent_note")}</div>
              </div>
              <p className="text-white/40 text-[13px] leading-relaxed border-t border-white/6 pt-4">
                {t("tier_ent_desc")}
              </p>
              <ul className="flex flex-col gap-2.5 flex-1">
                {entFeatures.map((f) => (
                  <li key={f.text} className="flex items-center gap-2.5 text-[13px]">
                    <Check ok={f.ok} />
                    <span className={f.ok ? "text-white/70" : "text-white/25"}>{f.text}</span>
                  </li>
                ))}
              </ul>
              <a href="#demo"
                className="block text-center border border-white/15 text-white/70
                           text-[14px] font-semibold py-3 rounded-xl
                           hover:border-white/30 hover:text-white transition-all duration-150">
                {t("tier_ent_cta")}
              </a>
            </div>
          </StaggerChild>
        </StaggerParent>

        {/* Comparison table */}
        <FadeUp delay={0.2}>
          <div className="overflow-x-auto rounded-2xl border border-white/8">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="text-left px-5 py-3.5 text-white/30 font-medium text-[11px]
                                  tracking-wider uppercase w-1/2">Feature</th>
                  <th className="px-4 py-3.5 text-white/40 font-medium text-[12px]">Free</th>
                  <th className="px-4 py-3.5 text-green-400 font-medium text-[12px]">Pro</th>
                  <th className="px-4 py-3.5 text-white/40 font-medium text-[12px]">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map(([feat, f, p, e], i) => (
                  <tr key={feat}
                    className={`border-b border-white/5 last:border-0
                      ${i % 2 === 0 ? "bg-white/[0.01]" : ""}`}>
                    <td className="px-5 py-3 text-white/55">{feat}</td>
                    <td className="px-4 py-3 text-center text-white/30 font-mono">{f}</td>
                    <td className="px-4 py-3 text-center text-green-400 font-mono">{p}</td>
                    <td className="px-4 py-3 text-center text-white/30 font-mono">{e}</td>
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
