"use client";

import { motion } from "framer-motion";
import { StaggerParent, StaggerChild } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";

const aiTools = ["Midjourney", "Stable Diffusion", "Sora", "DALL·E", "Kling"];

function ScanGraphic() {
  const rings = [760, 620, 490, 370, 260, 160, 80];
  const opacities = [0.03, 0.04, 0.055, 0.07, 0.09, 0.12, 0.16];

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
      {/* Concentric rings */}
      {rings.map((size, i) => (
        <div
          key={size}
          className="absolute rounded-full border border-white"
          style={{ width: size, height: size, opacity: opacities[i] }}
        />
      ))}

      {/* Crosshair */}
      <div className="absolute w-full h-px bg-white/5" />
      <div className="absolute w-px h-full bg-white/5" />

      {/* Sweep gradient */}
      <div className="absolute" style={{ width: 380, height: 380 }}>
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 75%, rgba(255,255,255,0.06) 100%)",
            transformOrigin: "center",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Scanner arm */}
      <div className="absolute" style={{ width: 380, height: 380 }}>
        <motion.div
          className="absolute top-1/2 left-1/2 h-px"
          style={{
            width: 190,
            background: "linear-gradient(to right, rgba(255,255,255,0.35), transparent)",
            transformOrigin: "left center",
            marginTop: -0.5,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Tick marks on outer ring */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <div
          key={angle}
          className="absolute"
          style={{
            width: 760,
            height: 760,
            transform: `rotate(${angle}deg)`,
          }}
        >
          <div
            className="absolute bg-white/20"
            style={{ width: 6, height: 1, top: "50%", left: 0, marginTop: -0.5 }}
          />
        </div>
      ))}

      {/* Center dot */}
      <div className="relative w-2 h-2 rounded-full bg-white/30 z-10" />
    </div>
  );
}

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="min-h-screen bg-black flex flex-col overflow-hidden relative">

      {/* Radar background */}
      <ScanGraphic />

      {/* Radial fade so text is always readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, transparent 30%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* Main content — centered */}
      <div className="relative z-10 flex-1 flex items-center justify-center w-full px-8 pt-28 pb-20">
        <StaggerParent className="flex flex-col items-center text-center max-w-3xl mx-auto">

          {/* Eyebrow */}
          <StaggerChild>
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="w-8 h-px bg-white/20" />
              <span className="text-[10px] tracking-[.35em] uppercase font-sans text-white/35">
                MODELING PROTECTION
              </span>
              <div className="w-8 h-px bg-white/20" />
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
            <p className="text-white/60 text-lg max-w-md font-sans mb-12 leading-relaxed">
              {t("hero_sub")}
            </p>
          </StaggerChild>

          {/* CTAs */}
          <StaggerChild>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="#demo"
                 className="bg-white text-black font-sans font-medium text-sm
                            px-8 py-3.5 rounded-full hover:bg-white/90 transition-colors whitespace-nowrap">
                {t("hero_cta1")}
              </a>
              <a href="#how"
                 className="border border-white/25 text-white/65 font-sans text-sm
                            px-8 py-3.5 rounded-full hover:border-white/55 hover:text-white
                            transition-all whitespace-nowrap">
                {t("hero_cta2")}
              </a>
            </div>
          </StaggerChild>

        </StaggerParent>
      </div>

      {/* Bottom strip */}
      <div className="relative z-10 border-t border-white/6 w-full">
        <div className="max-w-7xl mx-auto w-full px-8 py-5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white/60" />
            </span>
            <span className="text-white/35 text-xs font-sans">{t("hero_live")}</span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            {aiTools.map(tool => (
              <span key={tool} className="text-white/20 text-xs tracking-[.06em] font-sans">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
