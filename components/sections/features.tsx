"use client";

import { motion } from "framer-motion";
import { FadeUp, StaggerParent, StaggerChild } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";

const featureData = [
  { icon: "🔬", tKey: "feat_1_t" as const, dKey: "feat_1_d" as const, tagKey: "feat_1_tag" as const },
  { icon: "🤖", tKey: "feat_2_t" as const, dKey: "feat_2_d" as const, tagKey: "feat_2_tag" as const },
  { icon: "🎤", tKey: "feat_3_t" as const, dKey: "feat_3_d" as const, tagKey: "feat_3_tag" as const },
  { icon: "⚡", tKey: "feat_4_t" as const, dKey: "feat_4_d" as const, tagKey: "feat_4_tag" as const },
  { icon: "📜", tKey: "feat_5_t" as const, dKey: "feat_5_d" as const, tagKey: "feat_5_tag" as const },
  { icon: "📊", tKey: "feat_6_t" as const, dKey: "feat_6_d" as const, tagKey: "feat_6_tag" as const },
  { icon: "🌐", tKey: "feat_7_t" as const, dKey: "feat_7_d" as const, tagKey: "feat_7_tag" as const },
  { icon: "🔔", tKey: "feat_8_t" as const, dKey: "feat_8_d" as const, tagKey: "feat_8_tag" as const },
  { icon: "🤝", tKey: "feat_9_t" as const, dKey: "feat_9_d" as const, tagKey: "feat_9_tag" as const },
];

export function Features() {
  const { t } = useLocale();

  return (
    <section id="features" className="py-24 px-[6%] bg-black">
      <div className="max-w-6xl mx-auto">

        <FadeUp className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-14">
          <div>
            <div className="text-white/30 text-[11px] font-medium tracking-[.2em]
                            uppercase mb-4 inline-block px-3 py-1 rounded-full border border-white/8">
              {t("feat_eyebrow")}
            </div>
            <h2 className="text-white font-extrabold text-[clamp(28px,5vw,44px)] leading-tight">
              {t("feat_h2_1")}<br />
              {t("feat_h2_2")}
            </h2>
          </div>
          <p className="text-white/40 text-[14px] leading-relaxed max-w-xs sm:max-w-sm sm:text-right">
            {t("feat_sub")}
          </p>
        </FadeUp>

        <StaggerParent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featureData.map((f) => (
            <StaggerChild key={f.tKey}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.15 }}
                className="bg-[#0f0f0f] border border-white/8 rounded-2xl p-6
                           hover:border-green-400/25 hover:shadow-[0_8px_24px_rgba(74,222,128,0.08)]
                           transition-[border-color,box-shadow] duration-200 group cursor-default"
              >
                <div className="text-[28px] mb-4">{f.icon}</div>
                <div className="font-semibold text-white text-[15px] mb-2">{t(f.tKey)}</div>
                <div className="text-white/40 text-[13px] leading-relaxed mb-4">{t(f.dKey)}</div>
                <span className="inline-block text-[10px] font-semibold tracking-wider
                                  text-green-400/70 bg-green-400/8 border border-green-400/15
                                  px-2.5 py-1 rounded-full">
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
