"use client";

import { FadeUp } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";

export function HowItWorks() {
  const { t } = useLocale();

  const steps = [
    { num: "01", title: t("how_s1_t"), desc: t("how_s1_d") },
    { num: "02", title: t("how_s2_t"), desc: t("how_s2_d") },
    { num: "03", title: t("how_s3_t"), desc: t("how_s3_d") },
    { num: "04", title: t("how_s4_t"), desc: t("how_s4_d") },
  ];

  const stats = [
    { key: "how_stat1" as const },
    { key: "how_stat2" as const },
    { key: "how_stat3" as const },
  ];

  return (
    <section id="how" className="bg-surface-dark py-24 border-t border-white/6 flex flex-col items-center">
      <div className="w-full max-w-6xl px-8">

        <FadeUp className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-white/15 text-xs">01</span>
            <div className="w-8 h-px bg-white/10" />
            <span className="text-[10px] tracking-[.3em] uppercase text-white/25 font-sans">PROCESS</span>
          </div>
          <h2
            className="font-display font-light text-white"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            {t("how_h2")}
          </h2>
        </FadeUp>

        {/* Steps */}
        <div className="mt-12">
          {steps.map((s, i) => (
            <FadeUp key={s.num} delay={i * 0.08}>
              <div className="border-t border-white/6 py-12 grid grid-cols-[64px_1fr] sm:grid-cols-[96px_1fr] gap-8 sm:gap-16">
                {/* Step number */}
                <span
                  className="font-display font-light text-white/10 leading-none select-none"
                  style={{ fontSize: "clamp(48px, 5vw, 72px)" }}
                >
                  {s.num}
                </span>
                {/* Content */}
                <div className="pt-1">
                  <h3 className="font-sans font-medium text-white text-xl mb-4 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-white/50 text-base font-sans leading-loose max-w-2xl">
                    {s.desc}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
          <div className="border-t border-white/6" />
        </div>

        {/* Stats strip */}
        <FadeUp delay={0.1} className="mt-14 pt-10 border-t border-white/6">
          <div className="flex flex-wrap gap-8 justify-start">
            {stats.map(s => (
              <span key={s.key} className="font-mono text-[10px] text-white/35 tracking-[.15em]">
                {t(s.key)}
              </span>
            ))}
          </div>
        </FadeUp>

      </div>
    </section>
  );
}
