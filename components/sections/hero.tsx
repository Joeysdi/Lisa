"use client";

import { StaggerParent, StaggerChild } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";
import { Button } from "@/components/ui/button";

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="min-h-screen bg-black flex flex-col overflow-hidden relative">

      {/* Main content — centered */}
      <div className="relative z-10 flex-1 flex items-center justify-center w-full px-8 pt-28 pb-20">
        <StaggerParent className="flex flex-col items-center text-center max-w-3xl mx-auto">

          {/* Eyebrow */}
          <StaggerChild>
            <div className="mb-10">
              <span className="text-[10px] tracking-[.35em] uppercase font-sans text-white/35">
                MODELING PROTECTION
              </span>
            </div>
          </StaggerChild>

          {/* H1 */}
          <StaggerChild>
            <h1
              className="font-display font-light leading-[0.9] tracking-[-0.02em] mb-8"
              style={{ fontSize: "clamp(64px, 10vw, 130px)" }}
            >
              <span className="block text-white">{t("hero_h1_1")}</span>
              <span className="block italic text-white/35">{t("hero_h1_2")}</span>
            </h1>
          </StaggerChild>

          {/* Sub */}
          <StaggerChild>
            <p className="text-white/55 text-lg max-w-md font-sans mb-12 leading-relaxed">
              {t("hero_sub")}
            </p>
          </StaggerChild>

          {/* CTAs */}
          <StaggerChild>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button variant="primary" href="#demo" className="whitespace-nowrap">
                {t("hero_cta1")}
              </Button>
              <Button variant="outline" href="#how" className="whitespace-nowrap">
                {t("hero_cta2")}
              </Button>
            </div>
          </StaggerChild>

        </StaggerParent>
      </div>

      {/* Bottom strip */}
      <div className="relative z-10 border-t border-white/6 w-full">
        <div className="max-w-7xl mx-auto w-full px-8 py-5 flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white/60" />
          </span>
          <span className="text-white/35 text-xs font-sans">{t("hero_live")}</span>
        </div>
      </div>

    </section>
  );
}
