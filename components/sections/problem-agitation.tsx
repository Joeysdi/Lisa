"use client";

import { FadeUp, StaggerParent, StaggerChild } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";

const consequences = [
  { num: "01", tKey: "prob_1_t" as const, dKey: "prob_1_d" as const },
  { num: "02", tKey: "prob_2_t" as const, dKey: "prob_2_d" as const },
  { num: "03", tKey: "prob_3_t" as const, dKey: "prob_3_d" as const },
];

export function ProblemAgitation() {
  const { t } = useLocale();

  return (
    <section className="bg-white py-24 md:py-32 flex flex-col items-center">
      <div className="w-full max-w-6xl px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — headline */}
          <FadeUp>
            <blockquote
              className="font-display italic font-light leading-tight text-black"
              style={{ fontSize: "clamp(32px, 4.5vw, 56px)" }}
            >
              {t("prob_h2_line1")}
              <br />
              {t("prob_h2_line2")}
              <br />
              <span className="text-black/35">{t("prob_h2_line3")}</span>
            </blockquote>
            <p className="text-black/45 text-base mt-8 max-w-sm font-sans leading-relaxed">
              {t("prob_sub")}
            </p>
          </FadeUp>

          {/* Right — consequence blocks */}
          <StaggerParent className="flex flex-col divide-y divide-black/8">
            {consequences.map(c => (
              <StaggerChild key={c.tKey}>
                <div className="py-7 flex gap-5">
                  <span className="font-mono text-[10px] text-black/20 shrink-0 mt-0.5 w-6">{c.num}</span>
                  <div>
                    <div className="font-sans font-semibold text-sm text-black mb-2">{t(c.tKey)}</div>
                    <div className="text-black/50 text-sm leading-relaxed font-sans">{t(c.dKey)}</div>
                  </div>
                </div>
              </StaggerChild>
            ))}
          </StaggerParent>

        </div>
      </div>
    </section>
  );
}
