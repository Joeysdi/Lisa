"use client";

import { FadeUp } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";

export function HowItWorks() {
  const { t } = useLocale();

  const steps = [
    {
      num: "01",
      title: t("how_s1_t"),
      desc:  t("how_s1_d"),
      chips: t("how_s1_chips").split(" · "),
    },
    {
      num: "02",
      title: t("how_s2_t"),
      desc:  t("how_s2_d"),
      chips: t("how_s2_chips").split(" · "),
    },
    {
      num: "03",
      title: t("how_s3_t"),
      desc:  t("how_s3_d"),
      chips: t("how_s3_chips").split(" · "),
    },
    {
      num: "04",
      title: t("how_s4_t"),
      desc:  t("how_s4_d"),
      chips: t("how_s4_chips").split(" · "),
    },
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

        {/* Full-width steps */}
        <div className="mt-12">
          {steps.map((s, i) => (
            <FadeUp key={s.num} delay={i * 0.08}>
              <div className="border-t border-white/6 py-8">
                {/* Title row */}
                <div className="flex items-center gap-4 mb-5">
                  <span className="font-mono text-[10px] text-white/20 shrink-0 tabular-nums">{s.num}</span>
                  <div className="w-5 h-px bg-white/15 shrink-0" />
                  <h3 className="font-sans font-medium text-white text-base shrink-0">{s.title}</h3>
                  <div className="flex-1 h-px bg-white/8" />
                </div>
                {/* Body */}
                <div className="pl-12">
                  <p className="text-white/45 text-sm font-sans leading-relaxed mb-5">{s.desc}</p>
                  <div className="flex flex-wrap gap-6">
                    {s.chips.map(c => (
                      <span key={c} className="font-mono text-[10px] text-white/25 tracking-[.15em] uppercase">
                        {c}
                      </span>
                    ))}
                  </div>
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
