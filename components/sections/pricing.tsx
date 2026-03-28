"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FadeUp, StaggerParent, StaggerChild } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";
import { Button } from "@/components/ui/button";

const PRO_M = 49, PRO_A = 39;

const featureRows = [
  // Pro-exclusive rows first (makes Pro look more powerful vs Free at a glance)
  { label: "Real-time scanning",         free: false, pro: true,  ent: true  },
  { label: "Automated DMCA",            free: false, pro: true,  ent: true  },
  { label: "Deepfake & AI detection",   free: false, pro: true,  ent: true  },
  { label: "Voice cloning protection",  free: false, pro: true,  ent: true  },
  { label: "Dark Web scanning",         free: false, pro: true,  ent: true  },
  { label: "Priority support",          free: false, pro: true,  ent: true  },
  // Shared rows follow
  { label: "Face & voice monitoring",    free: true,  pro: true,  ent: true  },
  { label: "Weekly scan reports",        free: true,  pro: true,  ent: true  },
  { label: "Suspicious content alerts",  free: true,  pro: true,  ent: true  },
  { label: "Personal dashboard",         free: true,  pro: true,  ent: true  },
  { label: "Likeness marketplace (add-on)", free: false, pro: true,  ent: true  },
  // Enterprise-only rows
  { label: "Unlimited talent mgmt",     free: false, pro: false, ent: true  },
  { label: "Developer API access",      free: false, pro: false, ent: true  },
  { label: "White-label reporting",     free: false, pro: false, ent: true  },
  { label: "Legal team access",         free: false, pro: false, ent: true  },
];

function Cell({ ok }: { ok: boolean }) {
  return (
    <td className="px-4 py-4 text-center font-mono text-sm">
      {ok
        ? <span className="text-black">✓</span>
        : <span className="text-black/15">—</span>
      }
    </td>
  );
}

export function Pricing() {
  const { t } = useLocale();
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="bg-white py-24 border-t border-black/8 flex flex-col items-center">
      <div className="w-full max-w-5xl px-8">

        <FadeUp className="mb-12 text-center">
          {/* Section marker */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="font-mono text-black/15 text-xs">04</span>
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
        </FadeUp>

        {/* Toggle */}
        <FadeUp delay={0.05} className="flex justify-center mb-10">
          <div className="inline-flex bg-black/5 rounded-full p-1 gap-1">
            {[false, true].map(isA => (
              <button key={String(isA)} onClick={() => setAnnual(isA)}
                style={{ padding: "14px 32px", fontSize: "12px", letterSpacing: "0.06em" }}
                className={`relative font-sans rounded-full transition-all duration-200
                  ${annual === isA ? "text-white" : "text-black/45 hover:text-black/70"}`}>
                {annual === isA && (
                  <motion.div layoutId="pill" className="absolute inset-0 bg-black rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                )}
                <span className="relative">
                  {isA ? t("pricing_annual_label") : t("pricing_monthly")}
                </span>
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Feature comparison table */}
        <FadeUp delay={0.08}>
          <div className="overflow-x-auto border border-black/8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/8">
                  {/* Feature label col */}
                  <th className="text-left px-5 py-5 w-1/2" />

                  {/* Free */}
                  <th className="px-4 py-5 text-center align-top">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-[9px] tracking-[.3em] uppercase text-black/35 font-sans">{t("tier_free_name")}</span>
                      <span className="font-display font-light text-3xl text-black leading-none">{t("tier_free_price")}</span>
                      <span className="text-black/25 text-xs font-mono">{t("tier_free_cycle")}</span>
                      <Button variant="outline-dark" href="#get-started" size="sm" className="mt-2 w-full justify-center">
                        {t("tier_free_cta")}
                      </Button>
                    </div>
                  </th>

                  {/* Pro */}
                  <th className="px-4 py-5 text-center align-top bg-black/[0.03]">
                    <div className="flex flex-col items-center gap-2">
                      <span className="bg-black text-white text-[9px] font-mono tracking-[.15em] px-2 py-0.5 uppercase">
                        {t("tier_pro_badge")}
                      </span>
                      <span className="text-[9px] tracking-[.3em] uppercase text-black/35 font-sans">{t("tier_pro_name")}</span>
                      <span className="font-display font-light text-3xl text-black leading-none">
                        ${annual ? PRO_A : PRO_M}
                      </span>
                      <span className="text-black/25 text-xs font-mono">
                        {annual ? t("tier_pro_cycle_a") : t("tier_pro_cycle_m")}
                      </span>
                      <Button variant="primary" href="#get-started" size="sm" className="mt-2 w-full justify-center">
                        {t("tier_pro_cta")}
                      </Button>
                      <p className="font-mono text-[9px] tracking-[.1em] uppercase text-black/30 text-center leading-relaxed">
                        {t("trust_gdpr")} · {t("trust_no_sell")} · {t("trust_encrypted")}
                      </p>
                      <div className="mt-2 border border-black/12 px-3 py-1.5 w-full text-center">
                        <span className="font-mono text-[9px] tracking-[.15em] text-black/35 uppercase">
                          {t("pricing_addon_badge")}
                        </span>
                      </div>
                    </div>
                  </th>

                  {/* Enterprise */}
                  <th className="px-4 py-5 text-center align-top">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-[9px] tracking-[.3em] uppercase text-black/35 font-sans">{t("tier_ent_name")}</span>
                      <span className="font-display font-light text-3xl text-black leading-none">{t("tier_ent_price")}</span>
                      <span className="text-black/25 text-xs font-mono">{t("tier_ent_note")}</span>
                      <Button variant="outline-dark" href="#get-started" size="sm" className="mt-2 w-full justify-center">
                        {t("tier_ent_cta")}
                      </Button>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {featureRows.map(row => (
                  <tr key={row.label} className="border-b border-black/5 last:border-0 hover:bg-black/[0.015] transition-colors">
                    <td className="px-5 py-4 text-black/55 font-sans">{row.label}</td>
                    <Cell ok={row.free} />
                    <td className="px-4 py-4 text-center font-mono text-sm bg-black/[0.03]">
                      {row.pro
                        ? <span className="text-black">✓</span>
                        : <span className="text-black/15">—</span>
                      }
                    </td>
                    <Cell ok={row.ent} />
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
