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

  return (
    <section id="how" className="bg-surface-dark py-24 border-t border-white/6 flex flex-col items-center">
      <div className="w-full max-w-6xl px-8">

        <FadeUp className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-white/15 text-xs">02</span>
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

        {/* Steps — two-column layout */}
        <div className="mt-12">
          {steps.map((s, i) => (
            <FadeUp key={s.num} delay={i * 0.07}>
              <div className="border-t border-white/6 py-10">
                <div className="grid grid-cols-[80px_1fr] gap-6 items-start">
                  <span className="font-mono text-white/20 tabular-nums pt-1"
                    style={{ fontSize: "clamp(24px, 3vw, 36px)" }}>
                    {s.num}
                  </span>
                  <div>
                    <h3
                      className="font-display font-light text-white mb-3"
                      style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
                    >
                      {s.title}
                    </h3>
                    <p className="text-white/55 text-base font-sans leading-relaxed max-w-2xl">
                      {s.desc}
                    </p>
                  </div>
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
