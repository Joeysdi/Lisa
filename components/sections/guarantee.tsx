"use client";

import { FadeUp } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";
import { Button } from "@/components/ui/button";

export function Guarantee() {
  const { t } = useLocale();

  const badges = [
    "guarantee_badge1" as const,
    "guarantee_badge2" as const,
    "guarantee_badge3" as const,
  ];

  return (
    <section className="bg-surface-dark py-32 border-t border-white/6 flex flex-col items-center">
      <div className="w-full max-w-2xl px-8 text-center">
        <FadeUp>
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-12">
            <span className="text-[10px] tracking-[.35em] uppercase text-white/25 font-sans">
              {t("guarantee_eyebrow")}
            </span>
          </div>

          {/* Headline */}
          <h2
            className="font-display italic font-light text-white leading-tight mb-8"
            style={{ fontSize: "clamp(34px, 5vw, 60px)" }}
          >
            {t("guarantee_h2_1")}
            <br />
            <span className="text-white/40">{t("guarantee_h2_2")}</span>
          </h2>

          {/* Body */}
          <p className="text-white/55 text-base leading-relaxed font-sans mb-10">
            {t("guarantee_sub")}
          </p>

          {/* Badge chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {badges.map(key => (
              <span key={key}
                className="border border-white/12 text-white/35 font-mono text-[10px]
                           tracking-[.15em] px-4 py-2">
                {t(key)}
              </span>
            ))}
          </div>

          {/* CTA */}
          <Button variant="primary" href="#demo">
            {t("guarantee_cta")}
          </Button>
        </FadeUp>
      </div>
    </section>
  );
}
