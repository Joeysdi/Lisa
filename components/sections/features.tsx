"use client";

import { motion } from "framer-motion";
import { FadeUp, StaggerParent, StaggerChild } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";

const features = [
  { icon:"🔬", tKey:"feat_1_t" as const, dKey:"feat_1_d" as const, tagKey:"feat_1_tag" as const },
  { icon:"🤖", tKey:"feat_2_t" as const, dKey:"feat_2_d" as const, tagKey:"feat_2_tag" as const },
  { icon:"🎤", tKey:"feat_3_t" as const, dKey:"feat_3_d" as const, tagKey:"feat_3_tag" as const },
  { icon:"⚡", tKey:"feat_4_t" as const, dKey:"feat_4_d" as const, tagKey:"feat_4_tag" as const },
  { icon:"📜", tKey:"feat_5_t" as const, dKey:"feat_5_d" as const, tagKey:"feat_5_tag" as const },
  { icon:"📊", tKey:"feat_6_t" as const, dKey:"feat_6_d" as const, tagKey:"feat_6_tag" as const },
  { icon:"🌐", tKey:"feat_7_t" as const, dKey:"feat_7_d" as const, tagKey:"feat_7_tag" as const },
  { icon:"🔔", tKey:"feat_8_t" as const, dKey:"feat_8_d" as const, tagKey:"feat_8_tag" as const },
  { icon:"🤝", tKey:"feat_9_t" as const, dKey:"feat_9_d" as const, tagKey:"feat_9_tag" as const },
];

export function Features() {
  const { t } = useLocale();

  return (
    <section id="features" className="bg-black py-28 flex flex-col items-center">
      <div className="w-full max-w-6xl px-6 sm:px-8">

        <FadeUp className="text-center mb-14">
          <p className="text-white/25 text-xs font-mono tracking-[.2em] uppercase mb-3">
            {t("feat_eyebrow")}
          </p>
          <h2 className="text-white font-extrabold text-[clamp(28px,5vw,48px)] leading-tight tracking-tight">
            {t("feat_h2_1")}{" "}
            <span className="text-white/30">{t("feat_h2_2")}</span>
          </h2>
          <p className="text-white/30 text-sm sm:text-base mt-3 max-w-md mx-auto leading-relaxed text-center">
            {t("feat_sub")}
          </p>
        </FadeUp>

        <StaggerParent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px
                                   bg-white/5 rounded-2xl overflow-hidden border border-white/5">
          {features.map(f => (
            <StaggerChild key={f.tKey}>
              <motion.div whileHover={{ backgroundColor:"rgba(255,255,255,0.04)" }}
                transition={{ duration:0.15 }}
                className="bg-black p-6 flex flex-col gap-3 h-full text-left">
                <div className="text-2xl mb-1">{f.icon}</div>
                <div className="font-semibold text-white text-sm">{t(f.tKey)}</div>
                <div className="text-white/35 text-xs leading-relaxed flex-1">{t(f.dKey)}</div>
                <span className="inline-block text-[10px] font-mono tracking-wider
                                  text-white/30 border border-white/8 px-2.5 py-1 rounded-md
                                  self-start mt-1">
                  {t(f.tagKey)}
                </span>
              </motion.div>
            </StaggerChild>
          ))}
        </StaggerParent>

      </div>
    </section>
  );
}
