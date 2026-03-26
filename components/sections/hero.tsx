"use client";

import { motion } from "framer-motion";
import { StaggerParent, StaggerChild } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";

const aiTools = ["Midjourney", "Stable Diffusion", "Sora", "DALL·E", "Kling"];

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="relative min-h-screen bg-black overflow-hidden pt-24 pb-24
                        flex flex-col items-center justify-center">
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage:"linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
        backgroundSize:"80px 80px",
      }} />
      <div className="absolute inset-0 pointer-events-none
                      bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,transparent_20%,#000_100%)]" />

      <div className="relative z-10 w-full max-w-4xl px-6 sm:px-8 text-center">
        <StaggerParent className="flex flex-col items-center gap-7">

          <StaggerChild>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                            border border-white/10 bg-white/[0.04]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
              </span>
              <span className="text-white/50 text-xs">{t("hero_live")}</span>
            </div>
          </StaggerChild>

          <StaggerChild>
            <h1 className="font-extrabold text-[clamp(40px,8vw,80px)] leading-[1.02]
                           tracking-tight text-white">
              {t("hero_h1_1")}{" "}
              <span className="text-white/35">{t("hero_h1_2")}</span>
            </h1>
          </StaggerChild>

          <StaggerChild>
            <p className="text-white/40 text-base sm:text-lg leading-relaxed max-w-lg mx-auto">
              {t("hero_sub")}
            </p>
          </StaggerChild>

          <StaggerChild>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="#demo"
                 className="inline-flex items-center justify-center bg-white text-black
                            font-semibold text-sm px-7 py-3 rounded-xl w-full sm:w-auto
                            transition-all duration-200 hover:bg-white/88 hover:-translate-y-px
                            hover:shadow-[0_6px_20px_rgba(255,255,255,0.12)]">
                {t("hero_cta1")}
              </a>
              <a href="#how"
                 className="inline-flex items-center justify-center text-white/45 hover:text-white
                            font-medium text-sm px-7 py-3 rounded-xl w-full sm:w-auto
                            border border-white/10 hover:border-white/25 transition-all duration-200">
                {t("hero_cta2")} →
              </a>
            </div>
          </StaggerChild>

          <StaggerChild>
            <div className="flex flex-col items-center gap-3 mt-2">
              <p className="text-white/20 text-[10px] font-mono tracking-[.25em] uppercase">
                {t("hero_trust")}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {aiTools.map(tool => (
                  <span key={tool}
                    className="px-3 py-1.5 rounded-lg border border-white/6
                               text-white/25 text-xs">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </StaggerChild>

        </StaggerParent>
      </div>

      <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y:[0,6,0] }} transition={{ duration:2, repeat:Infinity }}>
        <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
}
