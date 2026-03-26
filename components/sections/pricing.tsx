"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FadeUp, StaggerParent, StaggerChild } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";

const PRO_MONTHLY = 49;
const PRO_ANNUAL  = 39;

function Check({ ok }: { ok: boolean }) {
  return (
    <span className={`text-[12px] font-mono ${ok ? "text-white" : "text-white/15"}`}>
      {ok ? "✓" : "×"}
    </span>
  );
}

export function Pricing() {
  const { t } = useLocale();
  const [annual, setAnnual] = useState(false);

  const freeFeatures  = [
    { text: "Face & voice monitoring",         ok: true  },
    { text: "Weekly scan reports",             ok: true  },
    { text: "Suspicious content alerts",       ok: true  },
    { text: "Manual removal requests",         ok: true  },
    { text: "Personal dashboard",              ok: true  },
    { text: "Automated DMCA",                  ok: false },
    { text: "Deepfake & AI detection",         ok: false },
    { text: "Dark Web scanning",               ok: false },
  ];
  const proFeatures   = [
    { text: "Everything in Free",              ok: true },
    { text: "Real-time scanning & alerts",     ok: true },
    { text: "Automated DMCA enforcement",      ok: true },
    { text: "Deepfake & AI detection",         ok: true },
    { text: "Voice cloning protection",        ok: true },
    { text: "Dark Web scanning",               ok: true },
    { text: "Monthly threat reports",          ok: true },
    { text: "Priority support",                ok: true },
  ];
  const entFeatures   = [
    { text: "Everything in Pro",               ok: true },
    { text: "Unlimited talent management",     ok: true },
    { text: "Developer API access",            ok: true },
    { text: "Custom licensing workflows",      ok: true },
    { text: "White-label reporting",           ok: true },
    { text: "SLA removal guarantee",           ok: true },
    { text: "Dedicated account manager",       ok: true },
    { text: "Legal team access",               ok: true },
  ];

  const tableRows = [
    ["Face monitoring",         "✓",        "✓",          "✓"       ],
    ["Voice monitoring",        "✓",        "✓",          "✓"       ],
    ["Scan frequency",          "Weekly",   "Real-time",  "Real-time"],
    ["Auto DMCA removal",       "—",        "✓",          "✓"       ],
    ["Deepfake detection",      "—",        "✓",          "✓"       ],
    ["Voice clone detection",   "—",        "✓",          "✓"       ],
    ["Dark Web scanning",       "—",        "✓",          "✓"       ],
    ["Licensing tools",         "—",        "Basic",      "Full"    ],
    ["API access",              "—",        "—",          "✓"       ],
    ["Multi-talent mgmt",       "—",        "—",          "✓"       ],
  ];

  return (
    <section id="pricing" className="py-28 px-6 md:px-12 bg-black">
      <div className="max-w-6xl mx-auto">

        <FadeUp className="flex flex-col sm:flex-row justify-between items-start
                           sm:items-end gap-6 mb-12">
          <div>
            <p className="text-white/25 text-[11px] font-mono tracking-[.2em] uppercase mb-4">
              {t("pricing_eyebrow")}
            </p>
            <h2 className="text-white font-extrabold text-[clamp(28px,5vw,48px)]
                           leading-tight tracking-[-1px]">
              {t("pricing_h2_1")}{" "}
              <span className="text-white/30">{t("pricing_h2_2")}</span>
            </h2>
          </div>
          <p className="text-white/30 text-[14px] leading-relaxed max-w-xs">{t("pricing_sub")}</p>
        </FadeUp>

        {/* Toggle */}
        <FadeUp delay={0.05} className="flex justify-start mb-10">
          <div className="inline-flex items-center gap-1 border border-white/8 rounded-xl p-1">
            {[false, true].map((isAnnual) => (
              <button key={String(isAnnual)} onClick={() => setAnnual(isAnnual)}
                className={`relative px-5 py-2 rounded-lg text-[13px] font-medium
                            transition-all duration-200
                            ${annual === isAnnual ? "text-black" : "text-white/30 hover:text-white/60"}`}>
                {annual === isAnnual && (
                  <motion.div layoutId="pill"
                    className="absolute inset-0 bg-white rounded-lg"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                )}
                <span className="relative">
                  {isAnnual ? `${t("pricing_annual")} — ${t("pricing_save")}` : t("pricing_monthly")}
                </span>
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Plans */}
        <StaggerParent className="grid md:grid-cols-3 gap-4 mb-14">

          {/* Free */}
          <StaggerChild>
            <div className="flex flex-col gap-5 p-6 rounded-2xl border border-white/8 bg-[#0a0a0a]">
              <div>
                <div className="text-white/30 text-[11px] font-mono tracking-[.12em] uppercase mb-1">
                  {t("tier_free_name")}
                </div>
                <div className="text-white font-medium text-[15px] mb-4">{t("tier_free_for")}</div>
                <div className="font-extrabold text-[40px] leading-none text-white mb-1 tracking-[-1px]">
                  {t("tier_free_price")}
                  <span className="text-white/25 text-[16px] font-normal tracking-normal ml-1">
                    {t("tier_free_cycle")}
                  </span>
                </div>
                <div className="text-white/20 text-[12px] font-mono">{t("tier_free_note")}</div>
              </div>
              <p className="text-white/30 text-[13px] leading-relaxed pt-4 border-t border-white/5">
                {t("tier_free_desc")}
              </p>
              <ul className="flex flex-col gap-2.5 flex-1">
                {freeFeatures.map((f) => (
                  <li key={f.text} className="flex items-center gap-2.5 text-[13px]">
                    <Check ok={f.ok} />
                    <span className={f.ok ? "text-white/60" : "text-white/18"}>{f.text}</span>
                  </li>
                ))}
              </ul>
              <a href="#demo"
                className="block text-center border border-white/12 text-white/50
                           text-[14px] font-semibold py-3 rounded-xl
                           hover:border-white/25 hover:text-white/80
                           transition-all duration-150">
                {t("tier_free_cta")}
              </a>
            </div>
          </StaggerChild>

          {/* Pro — highlighted */}
          <StaggerChild>
            <div className="relative flex flex-col gap-5 p-6 rounded-2xl border border-white/20
                             bg-white/[0.06] shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset]">
              <div className="absolute -top-3 left-6">
                <span className="bg-white text-black text-[10px] font-extrabold
                                  tracking-[.08em] px-3 py-1 rounded-full">
                  {t("tier_pro_badge")}
                </span>
              </div>
              <div>
                <div className="text-white/50 text-[11px] font-mono tracking-[.12em] uppercase
                                mb-1 mt-2">{t("tier_pro_name")}</div>
                <div className="text-white font-medium text-[15px] mb-4">{t("tier_pro_for")}</div>
                <div className="font-extrabold text-[40px] leading-none text-white mb-1 tracking-[-1px]">
                  ${annual ? PRO_ANNUAL : PRO_MONTHLY}
                  <span className="text-white/30 text-[16px] font-normal tracking-normal ml-1">
                    {annual ? t("tier_pro_cycle_a") : t("tier_pro_cycle_m")}
                  </span>
                </div>
                <div className="text-white/30 text-[12px] font-mono">{t("tier_pro_note")}</div>
              </div>
              <p className="text-white/35 text-[13px] leading-relaxed pt-4 border-t border-white/8">
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
                className="block text-center bg-white text-black text-[14px] font-bold
                           py-3 rounded-xl hover:bg-white/88 transition-colors duration-150">
                {t("tier_pro_cta")}
              </a>
            </div>
          </StaggerChild>

          {/* Enterprise */}
          <StaggerChild>
            <div className="flex flex-col gap-5 p-6 rounded-2xl border border-white/8 bg-[#0a0a0a]">
              <div>
                <div className="text-white/30 text-[11px] font-mono tracking-[.12em] uppercase mb-1">
                  {t("tier_ent_name")}
                </div>
                <div className="text-white font-medium text-[15px] mb-4">{t("tier_ent_for")}</div>
                <div className="font-extrabold text-[40px] leading-none text-white mb-1 tracking-[-1px]">
                  {t("tier_ent_price")}
                </div>
                <div className="text-white/20 text-[12px] font-mono">{t("tier_ent_note")}</div>
              </div>
              <p className="text-white/30 text-[13px] leading-relaxed pt-4 border-t border-white/5">
                {t("tier_ent_desc")}
              </p>
              <ul className="flex flex-col gap-2.5 flex-1">
                {entFeatures.map((f) => (
                  <li key={f.text} className="flex items-center gap-2.5 text-[13px]">
                    <Check ok={f.ok} />
                    <span className="text-white/60">{f.text}</span>
                  </li>
                ))}
              </ul>
              <a href="#demo"
                className="block text-center border border-white/12 text-white/50
                           text-[14px] font-semibold py-3 rounded-xl
                           hover:border-white/25 hover:text-white/80
                           transition-all duration-150">
                {t("tier_ent_cta")}
              </a>
            </div>
          </StaggerChild>
        </StaggerParent>

        {/* Comparison table */}
        <FadeUp delay={0.15}>
          <div className="overflow-x-auto rounded-2xl border border-white/6">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-white/6">
                  <th className="text-left px-5 py-3.5 text-white/20 font-mono text-[10px]
                                  tracking-[.12em] uppercase w-1/2">Feature</th>
                  <th className="px-4 py-3.5 text-white/25 font-mono text-[11px]">Free</th>
                  <th className="px-4 py-3.5 text-white font-mono text-[11px]">Pro</th>
                  <th className="px-4 py-3.5 text-white/25 font-mono text-[11px]">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map(([feat, f, p, e], i) => (
                  <tr key={feat}
                    className={`border-b border-white/4 last:border-0
                      ${i % 2 === 0 ? "" : "bg-white/[0.015]"}`}>
                    <td className="px-5 py-3 text-white/40 text-[13px]">{feat}</td>
                    <td className="px-4 py-3 text-center text-white/20 font-mono text-[12px]">{f}</td>
                    <td className="px-4 py-3 text-center text-white font-mono text-[12px] font-semibold">{p}</td>
                    <td className="px-4 py-3 text-center text-white/20 font-mono text-[12px]">{e}</td>
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
