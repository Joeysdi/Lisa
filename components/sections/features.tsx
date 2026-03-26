"use client";

import { FadeUp, StaggerParent, StaggerChild } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";

const pillars = [
  {
    tKey: "feat_pillar1_t" as const,
    dKey: "feat_pillar1_d" as const,
    features: [
      { tKey: "feat_1_t" as const, num: "01" },
      { tKey: "feat_2_t" as const, num: "02" },
      { tKey: "feat_3_t" as const, num: "03" },
    ],
  },
  {
    tKey: "feat_pillar2_t" as const,
    dKey: "feat_pillar2_d" as const,
    features: [
      { tKey: "feat_4_t" as const, num: "04" },
      { tKey: "feat_5_t" as const, num: "05" },
    ],
  },
  {
    tKey: "feat_pillar3_t" as const,
    dKey: "feat_pillar3_d" as const,
    features: [
      { tKey: "feat_7_t" as const, num: "07" },
      { tKey: "feat_8_t" as const, num: "08" },
      { tKey: "feat_6_t" as const, num: "06" },
    ],
  },
];

export function Features() {
  const { t } = useLocale();

  return (
    <section id="features" className="bg-white py-24 flex flex-col items-center">
      <div className="w-full max-w-6xl px-8">

        <FadeUp className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-black/15 text-xs">02</span>
            <div className="w-8 h-px bg-black/10" />
            <span className="text-[10px] tracking-[.3em] uppercase text-black/25 font-sans">CAPABILITIES</span>
          </div>
          <h2
            className="font-display font-light text-black"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            {t("feat_h2_1")}{" "}
            <span className="text-black/35">{t("feat_h2_2")}</span>
          </h2>
        </FadeUp>

        {/* 3 Pillar cards */}
        <StaggerParent className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/5 mb-px">
          {pillars.map(p => (
            <StaggerChild key={p.tKey}>
              <div className="bg-white p-8 flex flex-col gap-5 h-full">
                <div>
                  <div
                    className="font-display font-light text-black mb-1"
                    style={{ fontSize: "clamp(22px, 2.5vw, 30px)" }}
                  >
                    {t(p.tKey)}
                  </div>
                  <div className="text-black/40 text-sm font-sans leading-relaxed">{t(p.dKey)}</div>
                </div>
                <div className="flex flex-col gap-2.5 border-t border-black/6 pt-5 mt-auto">
                  {p.features.map(f => (
                    <div key={f.tKey} className="flex items-center gap-2.5">
                      <span className="font-mono text-[10px] text-black/20 w-6 shrink-0">{f.num}</span>
                      <span className="text-black/60 text-sm font-sans">{t(f.tKey)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </StaggerChild>
          ))}
        </StaggerParent>

        {/* Enterprise card — full-width horizontal */}
        <FadeUp delay={0.1}>
          <div className="bg-stone-50 border border-black/8 border-t-2 border-t-black/15
                          p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex-1">
              <div className="text-[9px] tracking-[.3em] uppercase text-black/30 font-sans mb-2">
                ENTERPRISE
              </div>
              <div
                className="font-display font-light text-black mb-1"
                style={{ fontSize: "clamp(18px, 2vw, 24px)" }}
              >
                {t("feat_enterprise_t")}
              </div>
              <div className="text-black/45 text-sm font-sans leading-relaxed max-w-lg">
                {t("feat_enterprise_d")}
              </div>
            </div>
            <a href="#demo"
               className="shrink-0 border border-black/25 text-black/60 text-xs font-sans font-medium
                          px-6 py-3 rounded-full hover:border-black/50 hover:text-black
                          transition-colors whitespace-nowrap">
              {t("tier_ent_cta")}
            </a>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}
