"use client";

import { StaggerParent, StaggerChild } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";
import { Button } from "@/components/ui/button";

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="min-h-screen bg-black flex flex-col overflow-hidden relative">

      {/* Main content — vertically centered */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-8 pt-24 pb-16">
        <StaggerParent className="flex flex-col items-center text-center max-w-4xl w-full mx-auto">

          {/* Eyebrow */}
          <StaggerChild>
            <span className="text-[10px] tracking-[.35em] uppercase font-sans text-white/35 mb-8 block">
              MODELING PROTECTION
            </span>
          </StaggerChild>

          {/* H1 */}
          <StaggerChild>
            <div className="flex flex-col gap-0 mb-8 tracking-[-0.02em]"
                 style={{ fontSize: "clamp(52px, 7vw, 96px)" }}>
              <span className="font-display font-light leading-none text-white">{t("hero_h1_1")}</span>
              <span className="font-display font-light leading-snug italic text-white/40"
                    style={{ marginTop: "-0.19em" }}>{t("hero_h1_2")}</span>
            </div>
          </StaggerChild>

          {/* Sub */}
          <StaggerChild>
            <p className="text-white/55 text-base max-w-md font-sans leading-relaxed mb-10">
              {t("hero_sub")}
            </p>
          </StaggerChild>

          {/* CTA */}
          <StaggerChild>
            <Button variant="primary" href="#get-started"
              style={{ padding: "8px 16px", fontSize: "11px", letterSpacing: "0.08em" }}>
              {t("hero_cta1")}
            </Button>
          </StaggerChild>

        </StaggerParent>
      </div>

      {/* Bottom strip — 4 static stats */}
      <div className="relative z-10 border-t border-white/6 w-full">
        <div className="max-w-6xl mx-auto w-full px-8 py-5 flex flex-wrap gap-x-8 gap-y-2">
          {([t("hero_stat1"), t("hero_stat2"), t("hero_stat3"), t("hero_stat4")] as string[]).map(s => (
            <span key={s} className="font-mono text-[10px] text-white/30 tracking-[.15em]">{s}</span>
          ))}
        </div>
      </div>

    </section>
  );
}
