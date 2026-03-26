"use client";

import { StaggerParent, StaggerChild } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";
import { Button } from "@/components/ui/button";

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="min-h-screen bg-black flex flex-col overflow-hidden relative">

      {/* Main content — left-aligned editorial */}
      <div className="relative z-10 flex-1 flex items-end w-full px-8 sm:px-16 pt-40 pb-20">
        <StaggerParent className="flex flex-col items-start max-w-6xl w-full">

          {/* Eyebrow */}
          <StaggerChild>
            <div className="mb-8">
              <span className="text-[10px] tracking-[.35em] uppercase font-sans text-white/30">
                MODELING PROTECTION
              </span>
            </div>
          </StaggerChild>

          {/* H1 */}
          <StaggerChild>
            <h1
              className="font-display font-light leading-[0.88] tracking-[-0.02em] mb-10"
              style={{ fontSize: "clamp(72px, 11vw, 160px)" }}
            >
              <span className="block text-white">{t("hero_h1_1")}</span>
              <span className="block italic text-white/30">{t("hero_h1_2")}</span>
            </h1>
          </StaggerChild>

          {/* Sub + CTAs — side by side on larger screens */}
          <StaggerChild>
            <div className="flex flex-col sm:flex-row sm:items-end gap-8 sm:gap-16">
              <p className="text-white/50 text-base max-w-xs font-sans leading-relaxed">
                {t("hero_sub")}
              </p>
              <div className="flex items-center gap-3 shrink-0">
                <Button variant="primary" href="#demo" className="whitespace-nowrap">
                  {t("hero_cta1")}
                </Button>
                <Button variant="outline" href="#how" className="whitespace-nowrap">
                  {t("hero_cta2")}
                </Button>
              </div>
            </div>
          </StaggerChild>

        </StaggerParent>
      </div>

      {/* Bottom strip */}
      <div className="relative z-10 border-t border-white/6 w-full">
        <div className="max-w-7xl mx-auto w-full px-8 sm:px-16 py-5 flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white/60" />
          </span>
          <span className="text-white/30 text-xs font-sans">{t("hero_live")}</span>
        </div>
      </div>

    </section>
  );
}
