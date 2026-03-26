"use client";

import { motion } from "framer-motion";
import { StaggerParent, StaggerChild } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";

const aiTools = ["Midjourney", "Stable Diffusion", "Sora", "DALL·E", "Kling"];

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center
                        text-center px-6 pt-24 pb-20 overflow-hidden bg-black">

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none"
           style={{
             backgroundImage: "linear-gradient(rgba(255,255,255,0.024) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.024) 1px, transparent 1px)",
             backgroundSize: "80px 80px",
           }} />

      {/* Radial vignette over grid */}
      <div className="absolute inset-0 pointer-events-none
                      bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_30%,#000_100%)]" />

      <StaggerParent className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">

        {/* Live pill */}
        <StaggerChild>
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full
                          border border-white/10 bg-white/[0.04]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full
                               bg-white opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
            </span>
            <span className="text-white/55 text-[13px]">{t("hero_live")}</span>
          </div>
        </StaggerChild>

        {/* Headline */}
        <StaggerChild>
          <h1 className="font-extrabold text-[clamp(40px,8vw,80px)] leading-[1.02]
                         tracking-[-2px] text-white">
            {t("hero_h1_1")}{" "}
            <br className="hidden sm:block" />
            <span className="text-white/40">{t("hero_h1_2")}</span>
          </h1>
        </StaggerChild>

        {/* Subtext */}
        <StaggerChild>
          <p className="text-white/40 text-[clamp(15px,2vw,18px)] leading-relaxed max-w-lg">
            {t("hero_sub")}
          </p>
        </StaggerChild>

        {/* CTAs */}
        <StaggerChild>
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
            <a href="#demo"
               className="bg-white text-black font-bold text-[14px]
                          px-7 py-3.5 rounded-xl transition-all duration-200
                          hover:bg-white/88 hover:-translate-y-0.5
                          hover:shadow-[0_8px_24px_rgba(255,255,255,0.15)]">
              {t("hero_cta1")}
            </a>
            <a href="#how"
               className="text-white/45 hover:text-white font-medium text-[14px]
                          px-6 py-3.5 rounded-xl border border-white/10
                          hover:border-white/25 transition-all duration-200">
              {t("hero_cta2")} →
            </a>
          </div>
        </StaggerChild>

        {/* Trust bar */}
        <StaggerChild>
          <div className="mt-6 flex flex-col items-center gap-3">
            <p className="text-white/20 text-[10px] font-medium tracking-[.25em] uppercase">
              {t("hero_trust")}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {aiTools.map((tool) => (
                <span key={tool}
                  className="px-3 py-1.5 rounded-lg border border-white/6
                             text-white/25 text-[12px] font-medium">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </StaggerChild>

      </StaggerParent>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
}
