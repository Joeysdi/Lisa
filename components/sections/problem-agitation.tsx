"use client";

import { FadeUp } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";

const threats = [
  { num: "01", tKey: "threat_1_t" as const, dKey: "threat_1_d" as const },
  { num: "02", tKey: "threat_2_t" as const, dKey: "threat_2_d" as const },
  { num: "03", tKey: "threat_3_t" as const, dKey: "threat_3_d" as const },
  { num: "04", tKey: "threat_4_t" as const, dKey: "threat_4_d" as const },
  { num: "05", tKey: "threat_5_t" as const, dKey: "threat_5_d" as const },
];

export function ProblemAgitation() {
  const { t } = useLocale();

  return (
    <section className="bg-black py-24 border-t border-white/6">
      <div className="w-full max-w-6xl mx-auto px-8">

        {/* Header */}
        <FadeUp className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-white/15 text-xs">01</span>
            <div className="w-8 h-px bg-white/10" />
            <span className="text-[10px] tracking-[.3em] uppercase text-white/25 font-sans">
              {t("chal_eyebrow")}
            </span>
          </div>
          <h2
            className="font-display font-light text-white mb-4"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            {t("chal_h2")}
          </h2>
          <p className="text-white/45 text-base font-sans leading-relaxed max-w-lg">
            {t("prob_sub")}
          </p>
        </FadeUp>

        {/* Numbered threat list */}
        <div>
          {threats.map((threat, i) => (
            <FadeUp key={threat.num} delay={i * 0.06}>
              <div className="flex items-baseline gap-6 py-8 border-t border-white/6">
                <span className="font-mono text-white/20 text-xs w-8 shrink-0">{threat.num}</span>
                <div>
                  <h3
                    className="font-display font-light text-white mb-2"
                    style={{ fontSize: "clamp(20px, 2.5vw, 28px)" }}
                  >
                    {t(threat.tKey)}
                  </h3>
                  <p className="text-white/50 text-sm font-sans leading-relaxed">
                    {t(threat.dKey)}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
          <div className="border-t border-white/6" />
        </div>

      </div>
    </section>
  );
}
