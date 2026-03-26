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

      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[700px] h-[700px] rounded-full opacity-[0.07]
                        bg-[radial-gradient(circle,#4ade80_0%,transparent_70%)]" />
        <div className="absolute bottom-0 left-1/4
                        w-[400px] h-[400px] rounded-full opacity-[0.04]
                        bg-[radial-gradient(circle,#4ade80_0%,transparent_70%)]" />
      </div>

      <StaggerParent className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">

        {/* Live pill */}
        <StaggerChild>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                          border border-white/12 bg-white/5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full
                               bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            <span className="text-white/70 text-[13px] font-medium">{t("hero_live")}</span>
          </div>
        </StaggerChild>

        {/* Headline */}
        <StaggerChild>
          <h1 className="font-extrabold text-[clamp(36px,7vw,72px)] leading-[1.05]
                         tracking-tight text-white">
            {t("hero_h1_1")}{" "}
            <span className="text-green-400">{t("hero_h1_2")}</span>
          </h1>
        </StaggerChild>

        {/* Subtext */}
        <StaggerChild>
          <p className="text-white/55 text-[clamp(15px,2vw,18px)] leading-relaxed max-w-xl">
            {t("hero_sub")}
          </p>
        </StaggerChild>

        {/* CTAs */}
        <StaggerChild>
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
            <a
              href="#demo"
              className="bg-green-400 text-black font-bold text-[15px]
                         px-7 py-3.5 rounded-xl transition-all duration-200
                         hover:bg-green-300 hover:-translate-y-0.5
                         hover:shadow-[0_8px_24px_rgba(74,222,128,0.35)]"
            >
              {t("hero_cta1")}
            </a>
            <a
              href="#how"
              className="text-white/60 hover:text-white font-medium text-[15px]
                         px-6 py-3.5 rounded-xl border border-white/12
                         hover:border-white/25 transition-all duration-200"
            >
              {t("hero_cta2")} →
            </a>
          </div>
        </StaggerChild>

        {/* Trust bar */}
        <StaggerChild>
          <div className="mt-4 flex flex-col items-center gap-3">
            <p className="text-white/25 text-[11px] font-medium tracking-widest uppercase">
              {t("hero_trust")}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {aiTools.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1.5 rounded-lg border border-white/8 bg-white/4
                             text-white/35 text-[12px] font-medium"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </StaggerChild>

      </StaggerParent>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
}
