"use client";

import { motion } from "framer-motion";
import { StaggerParent, StaggerChild } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";

const aiTools = ["Midjourney", "Stable Diffusion", "Sora", "DALL·E", "Kling"];

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center
                        bg-black overflow-hidden pt-24 pb-24">

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
        backgroundSize: "80px 80px",
      }} />
      <div className="absolute inset-0 pointer-events-none
                      bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,transparent_20%,#000_100%)]" />

      {/* Centered content column */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 sm:px-8 text-center">
        <StaggerParent className="flex flex-col items-center gap-7">

          {/* Live pill */}
          <StaggerChild>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full
                            border border-white/10 bg-white/[0.04]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full
                                 bg-white opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
              </span>
              <span className="text-white/50 text-sm">{t("hero_live")}</span>
            </div>
          </StaggerChild>

          {/* Headline */}
          <StaggerChild>
            <h1 className="font-extrabold text-[clamp(42px,8vw,80px)] leading-[1.02]
                           tracking-[-2px] text-white">
              {t("hero_h1_1")}{" "}
              <span className="text-white/35">{t("hero_h1_2")}</span>
            </h1>
          </StaggerChild>

          {/* Sub */}
          <StaggerChild>
            <p className="text-white/40 text-lg leading-relaxed max-w-xl">
              {t("hero_sub")}
            </p>
          </StaggerChild>

          {/* CTAs */}
          <StaggerChild>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
              <a href="#demo"
                 className="inline-flex items-center justify-center bg-white text-black
                            font-bold text-base px-8 py-4 rounded-xl w-full sm:w-auto
                            transition-all duration-200 hover:bg-white/88
                            hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,255,255,0.12)]">
                {t("hero_cta1")}
              </a>
              <a href="#how"
                 className="inline-flex items-center justify-center text-white/45
                            hover:text-white font-medium text-base px-8 py-4 rounded-xl
                            w-full sm:w-auto border border-white/10 hover:border-white/25
                            transition-all duration-200">
                {t("hero_cta2")} →
              </a>
            </div>
          </StaggerChild>

          {/* Trust bar */}
          <StaggerChild>
            <div className="flex flex-col items-center gap-3 mt-4">
              <p className="text-white/20 text-xs font-mono tracking-[.25em] uppercase">
                {t("hero_trust")}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {aiTools.map((tool) => (
                  <span key={tool}
                    className="px-3.5 py-2 rounded-lg border border-white/6
                               text-white/25 text-sm">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </StaggerChild>

        </StaggerParent>
      </div>

      {/* Scroll pulse */}
      <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
}
