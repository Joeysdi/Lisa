"use client";

import { FadeUp, StaggerParent, StaggerChild } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";
import { Button } from "@/components/ui/button";

const steps = [
  { num: "01", tKey: "earn_step1_t", dKey: "earn_step1_d" },
  { num: "02", tKey: "earn_step2_t", dKey: "earn_step2_d" },
  { num: "03", tKey: "earn_step3_t", dKey: "earn_step3_d" },
  { num: "04", tKey: "earn_step4_t", dKey: "earn_step4_d" },
] as const;

export function CreatorEarn() {
  const { t } = useLocale();

  return (
    <section id="creator-earn" className="bg-black py-24 border-t border-white/6 flex flex-col items-center">
      <div className="w-full max-w-5xl px-8 flex flex-col items-center">

        {/* A. Section header */}
        <FadeUp className="text-center max-w-2xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="font-mono text-white/20 text-xs">05</span>
            <div className="w-8 h-px bg-white/10" />
            <span className="text-[10px] tracking-[.35em] uppercase text-white/30 font-sans">
              {t("earn_eyebrow")}
            </span>
          </div>
          <h2
            className="font-display font-light text-white"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            {t("earn_h2_1")}{" "}
            <span className="text-white/35">{t("earn_h2_2")}</span>
          </h2>
          <p className="font-sans text-white/45 text-sm mt-4">
            {t("earn_sub")}
          </p>
        </FadeUp>

        {/* B. Four steps grid */}
        <StaggerParent className="w-full max-w-4xl mt-14 pt-10 border-t border-white/6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ num, tKey, dKey }) => (
              <StaggerChild
                key={num}
                className="px-6 py-4 [&:not(:last-child)]:border-r [&:not(:last-child)]:border-white/6"
              >
                <span className="font-mono text-white/20 text-xs mb-4 block">{num}</span>
                <p className="font-display font-light text-white" style={{ fontSize: "22px" }}>
                  {t(tKey)}
                </p>
                <p className="font-sans text-white/45 text-sm mt-2">{t(dKey)}</p>
              </StaggerChild>
            ))}
          </div>
        </StaggerParent>

        {/* C. Revenue split bar */}
        <FadeUp className="w-full max-w-2xl mt-14 pt-10 border-t border-white/6">
          <span className="font-mono text-[10px] text-white/30 tracking-[.15em] uppercase mb-4 block">
            {t("earn_split_label")}
          </span>
          <div className="flex w-full border border-white/12 overflow-hidden">
            <div className="w-3/4 bg-white flex items-center justify-center py-5 px-4">
              <span className="font-mono text-[11px] text-black tracking-wider">
                {t("earn_split_you")}
              </span>
            </div>
            <div className="w-1/4 border-l border-white/12 flex items-center justify-center py-5 px-4">
              <span className="font-mono text-[11px] text-white/50 tracking-wider">
                {t("earn_split_lisa")}
              </span>
            </div>
          </div>
        </FadeUp>

        {/* D. Stat strip */}
        <FadeUp className="w-full max-w-4xl mt-10">
          <div className="flex flex-wrap gap-x-8 gap-y-3 justify-center">
            {(["earn_stat1", "earn_stat2", "earn_stat3"] as const).map(key => (
              <span key={key} className="font-mono text-[10px] text-white/30 tracking-[.15em] uppercase">
                {t(key)}
              </span>
            ))}
          </div>
        </FadeUp>

        {/* E. CTA band */}
        <FadeUp className="w-full max-w-4xl mt-14 pt-10 border-t border-white/6">
          <div className="border border-white/12 px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="font-mono text-[9px] text-white/25 tracking-[.2em] uppercase mb-2">
                {t("earn_cta_sub")}
              </p>
              <p className="font-display font-light italic text-white" style={{ fontSize: "clamp(20px, 3vw, 28px)" }}>
                {t("earn_cta")}
              </p>
            </div>
            <Button variant="outline" href="#get-started" size="sm">
              {t("earn_cta")}
            </Button>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}
