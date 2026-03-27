"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FadeUp } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";
import { Button } from "@/components/ui/button";

const PRO_M = 49, PRO_A = 39;

const allFeatures = [
  { label: "Face & voice monitoring",     free: true,  pro: true,  ent: true  },
  { label: "Weekly scan reports",         free: true,  pro: true,  ent: true  },
  { label: "Suspicious content alerts",   free: true,  pro: true,  ent: true  },
  { label: "Personal dashboard",          free: true,  pro: true,  ent: true  },
  { label: "Real-time scanning",          free: false, pro: true,  ent: true  },
  { label: "Automated DMCA enforcement",  free: false, pro: true,  ent: true  },
  { label: "Deepfake & AI detection",     free: false, pro: true,  ent: true  },
  { label: "Voice cloning protection",    free: false, pro: true,  ent: true  },
  { label: "Dark Web scanning",           free: false, pro: true,  ent: true  },
  { label: "Priority support",            free: false, pro: true,  ent: true  },
  { label: "Unlimited talent management", free: false, pro: false, ent: true  },
  { label: "Developer API access",        free: false, pro: false, ent: true  },
  { label: "White-label reporting",       free: false, pro: false, ent: true  },
  { label: "Legal team access",           free: false, pro: false, ent: true  },
];

const tableRows = [
  ["Scan frequency",   "Weekly",    "Real-time", "Real-time"],
  ["Auto DMCA",        "—",         "✓",         "✓"        ],
  ["Deepfake detect",  "—",         "✓",         "✓"        ],
  ["Dark Web",         "—",         "✓",         "✓"        ],
  ["API access",       "—",         "—",         "✓"        ],
];

function Dot({ ok }: { ok: boolean }) {
  return ok
    ? <span className="text-black/70 font-sans text-sm select-none">✓</span>
    : <span className="text-black/12 font-sans text-sm select-none">—</span>;
}

export function Pricing() {
  const { t } = useLocale();
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="bg-white py-24 border-t border-black/8">
      <div className="w-full max-w-6xl mx-auto px-8">

        {/* Header */}
        <FadeUp className="mb-10">
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
        <FadeUp delay={0.04} className="flex justify-start mb-10">
          <div className="inline-flex border border-black/12 p-0.5 rounded-full">
            {([false, true] as const).map(isA => (
              <button key={String(isA)} onClick={() => setAnnual(isA)}
                className={`relative px-5 py-2 text-xs font-sans transition-all duration-200 rounded-full
                  ${annual === isA ? "text-white" : "text-black/40 hover:text-black/70"}`}>
                {annual === isA && (
                  <motion.div layoutId="pricing-pill" className="absolute inset-0 bg-black rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                )}
                <span className="relative">
                  {isA ? `${t("pricing_annual")} — ${t("pricing_save")}` : t("pricing_monthly")}
                </span>
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Feature-first pricing table */}
        <FadeUp delay={0.07}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/8">
                  {/* Empty feature label column */}
                  <th className="py-8 pr-6 text-left w-[40%]" />

                  {/* Starter */}
                  <th className="py-8 px-4 text-center align-top">
                    <div className="flex flex-col items-center gap-2.5">
                      <span className="text-[9px] tracking-[.3em] uppercase text-black/30 font-sans">
                        {t("tier_free_name")}
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-display font-light text-black"
                          style={{ fontSize: "clamp(26px, 2.8vw, 38px)" }}>
                          {t("tier_free_price")}
                        </span>
                        <span className="text-black/25 text-xs font-sans">{t("tier_free_cycle")}</span>
                      </div>
                      <span className="text-black/20 text-[10px] font-mono">{t("tier_free_note")}</span>
                      <Button variant="outline-dark" size="sm" href="#demo" className="mt-2 px-5">
                        {t("tier_free_cta")}
                      </Button>
                    </div>
                  </th>

                  {/* Pro */}
                  <th className="py-8 px-4 text-center align-top">
                    <div className="flex flex-col items-center gap-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] tracking-[.3em] uppercase text-black/30 font-sans">
                          {t("tier_pro_name")}
                        </span>
                        <span className="text-[9px] font-sans text-black/35 border border-black/12 px-1.5 py-0.5 rounded-full">
                          {t("tier_pro_badge")}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-display font-light text-black"
                          style={{ fontSize: "clamp(26px, 2.8vw, 38px)" }}>
                          ${annual ? PRO_A : PRO_M}
                        </span>
                        <span className="text-black/25 text-xs font-sans">
                          {annual ? t("tier_pro_cycle_a") : t("tier_pro_cycle_m")}
                        </span>
                      </div>
                      <span className="text-black/20 text-[10px] font-mono">{t("tier_pro_note")}</span>
                      <Button variant="accent" size="sm" href="#demo" className="mt-2 px-5">
                        {t("tier_pro_cta")}
                      </Button>
                    </div>
                  </th>

                  {/* Enterprise */}
                  <th className="py-8 px-4 text-center align-top">
                    <div className="flex flex-col items-center gap-2.5">
                      <span className="text-[9px] tracking-[.3em] uppercase text-black/30 font-sans">
                        {t("tier_ent_name")}
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-display font-light text-black"
                          style={{ fontSize: "clamp(26px, 2.8vw, 38px)" }}>
                          {t("tier_ent_price")}
                        </span>
                      </div>
                      <span className="text-black/20 text-[10px] font-mono">{t("tier_ent_note")}</span>
                      <Button variant="outline-dark" size="sm" href="#demo" className="mt-2 px-5">
                        {t("tier_ent_cta")}
                      </Button>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {allFeatures.map(({ label, free, pro, ent }) => (
                  <tr key={label}
                    className="border-b border-black/5 last:border-0 hover:bg-black/[0.015] transition-colors">
                    <td className="py-3 pr-6 text-black/45 text-sm font-sans">{label}</td>
                    <td className="py-3 px-4 text-center"><Dot ok={free} /></td>
                    <td className="py-3 px-4 text-center"><Dot ok={pro} /></td>
                    <td className="py-3 px-4 text-center"><Dot ok={ent} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeUp>

        {/* Guarantee note */}
        <p className="text-black/30 text-xs font-mono mt-8 mb-12 text-center">
          {t("pricing_guarantee_note")}
        </p>

        {/* Secondary comparison table */}
        <FadeUp delay={0.1}>
          <p className="font-mono text-[10px] text-black/25 mb-3">
            Key differences only — all plans include face &amp; voice monitoring.
          </p>
          <div className="overflow-x-auto border border-black/8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/8">
                  <th className="text-left px-5 py-3.5 text-black/30 font-mono text-[10px] tracking-wider uppercase w-1/2">
                    Feature
                  </th>
                  <th className="px-4 py-3.5 text-black/30 font-mono text-[10px]">Free</th>
                  <th className="px-4 py-3.5 text-black font-semibold font-mono text-[10px]">Pro</th>
                  <th className="px-4 py-3.5 text-black/30 font-mono text-[10px]">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map(([feat, f, p, e]) => (
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
