"use client";

import { motion } from "framer-motion";
import { StaggerParent, StaggerChild } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";

const aiTools = ["Midjourney", "Stable Diffusion", "Sora", "DALL·E", "Kling"];

function ScanGraphic() {
  const rings = [360, 280, 200, 120, 50];
  const opacities = [0.04, 0.05, 0.07, 0.1, 0.15];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Concentric rings */}
      {rings.map((size, i) => (
        <div
          key={size}
          className="absolute rounded-full border border-white"
          style={{
            width: size,
            height: size,
            opacity: opacities[i],
          }}
        />
      ))}

      {/* Crosshair lines */}
      <div className="absolute w-full h-px bg-white/8" />
      <div className="absolute w-px h-full bg-white/8" />

      {/* Rotating scanner arm */}
      <div className="absolute" style={{ width: 180, height: 180 }}>
        <motion.div
          className="absolute top-1/2 left-1/2 h-px bg-gradient-to-r from-white/25 to-transparent"
          style={{
            width: 180,
            transformOrigin: "left center",
            marginTop: -0.5,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Center dot */}
      <div className="relative w-1.5 h-1.5 rounded-full bg-white/40" />
    </div>
  );
}

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="min-h-screen bg-black flex flex-col overflow-hidden">

      {/* Main content */}
      <div className="flex-1 flex items-center max-w-7xl mx-auto w-full px-8 pt-24 pb-20">
        <div className="flex w-full items-center gap-16">

          {/* Left */}
          <StaggerParent className="flex flex-col lg:w-[55%]">

            {/* Eyebrow */}
            <StaggerChild>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-px bg-white/20" />
                <span className="text-[10px] tracking-[.3em] uppercase font-sans text-white/30">
                  MODELING PROTECTION
                </span>
              </div>
            </StaggerChild>

            {/* H1 */}
            <StaggerChild>
              <h1
                className="font-display font-light leading-[0.92] tracking-[-0.02em] mb-6"
                style={{ fontSize: "clamp(56px, 9vw, 120px)" }}
              >
                <span className="block text-white">{t("hero_h1_1")}</span>
                <span className="block italic text-white/40">{t("hero_h1_2")}</span>
              </h1>
            </StaggerChild>

            {/* Sub */}
            <StaggerChild>
              <p className="text-white/65 text-lg max-w-sm font-sans mt-2 mb-10 leading-relaxed">
                {t("hero_sub")}
              </p>
            </StaggerChild>

            {/* CTAs */}
            <StaggerChild>
              <div className="flex flex-col sm:flex-row items-start gap-3">
                <a href="#demo"
                   className="border border-white text-white uppercase text-[10px] tracking-[.15em]
                              px-7 py-3.5 hover:bg-white hover:text-black transition-all whitespace-nowrap">
                  {t("hero_cta1")}
                </a>
                <a href="#how"
                   className="border border-white/20 text-white/50 uppercase text-[10px] tracking-[.15em]
                              px-7 py-3.5 hover:border-white/50 hover:text-white transition-all whitespace-nowrap">
                  {t("hero_cta2")}
                </a>
              </div>
            </StaggerChild>

          </StaggerParent>

          {/* Right — scan graphic */}
          <div className="hidden lg:block lg:w-[45%] lg:h-[480px] relative">
            <ScanGraphic />
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-white/6 w-full">
        <div className="max-w-7xl mx-auto w-full px-8 py-5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white/60" />
            </span>
            <span className="text-white/25 text-[11px] font-sans">{t("hero_live")}</span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            {aiTools.map(tool => (
              <span key={tool} className="text-white/15 text-[11px] tracking-[.08em] font-sans">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
