"use client";

import { motion } from "framer-motion";
import { FadeUp, StaggerParent, StaggerChild } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";

const features = [
  { num:"01", tKey:"feat_1_t" as const, dKey:"feat_1_d" as const, tagKey:"feat_1_tag" as const },
  { num:"02", tKey:"feat_2_t" as const, dKey:"feat_2_d" as const, tagKey:"feat_2_tag" as const },
  { num:"03", tKey:"feat_3_t" as const, dKey:"feat_3_d" as const, tagKey:"feat_3_tag" as const },
  { num:"04", tKey:"feat_4_t" as const, dKey:"feat_4_d" as const, tagKey:"feat_4_tag" as const },
  { num:"05", tKey:"feat_5_t" as const, dKey:"feat_5_d" as const, tagKey:"feat_5_tag" as const },
  { num:"06", tKey:"feat_6_t" as const, dKey:"feat_6_d" as const, tagKey:"feat_6_tag" as const },
  { num:"07", tKey:"feat_7_t" as const, dKey:"feat_7_d" as const, tagKey:"feat_7_tag" as const },
  { num:"08", tKey:"feat_8_t" as const, dKey:"feat_8_d" as const, tagKey:"feat_8_tag" as const },
  { num:"09", tKey:"feat_9_t" as const, dKey:"feat_9_d" as const, tagKey:"feat_9_tag" as const },
];

export function Features() {
  const { t } = useLocale();

  return (
    <section id="features" className="bg-white py-24 flex flex-col items-center">
      <div className="w-full max-w-6xl px-8">

        <FadeUp className="mb-14">
          {/* Section marker */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-black/15 text-xs">02</span>
            <div className="w-8 h-px bg-black/10" />
            <span className="text-[10px] tracking-[.3em] uppercase text-black/25 font-sans">CAPABILITIES</span>
          </div>
          <h2
            className="font-display font-light text-black"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            {t("feat_h2_1")}{" "}
            <span className="text-black/35">{t("feat_h2_2")}</span>
          </h2>
        </FadeUp>

        <StaggerParent className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/5">
          {features.map(f => (
            <StaggerChild key={f.tKey}>
              <motion.div
                whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                transition={{ duration: 0.15 }}
                className="bg-white p-8 flex flex-col gap-4 h-full">
                <div className="font-mono text-[10px] text-black/20 tracking-wider">{f.num}</div>
                <div className="font-sans font-semibold text-sm text-black">{t(f.tKey)}</div>
                <div className="text-black/40 text-xs leading-relaxed flex-1">{t(f.dKey)}</div>
                <div className="text-[9px] tracking-[.2em] uppercase text-black/25 border-t border-black/6 pt-4 mt-auto font-sans">
                  {t(f.tagKey)}
                </div>
              </motion.div>
            </StaggerChild>
          ))}
        </StaggerParent>

      </div>
    </section>
  );
}
