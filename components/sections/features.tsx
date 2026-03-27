"use client";

import { FadeUp } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";

type BulletKey =
  | "feat_1_t" | "feat_2_t" | "feat_3_t"
  | "feat_4_t" | "feat_5_t"
  | "feat_6_t" | "feat_7_t" | "feat_8_t"
  | "feat_sub4_b1" | "feat_sub4_b2" | "feat_sub4_b3";

const subsections: {
  tKey: "feat_sub1_t" | "feat_sub2_t" | "feat_sub3_t" | "feat_sub4_t";
  introKey: "feat_sub1_intro" | "feat_sub2_intro" | "feat_sub3_intro" | "feat_sub4_intro";
  bullets: BulletKey[];
}[] = [
  {
    tKey: "feat_sub1_t",
    introKey: "feat_sub1_intro",
    bullets: ["feat_1_t", "feat_2_t", "feat_3_t"],
  },
  {
    tKey: "feat_sub2_t",
    introKey: "feat_sub2_intro",
    bullets: ["feat_4_t", "feat_5_t"],
  },
  {
    tKey: "feat_sub3_t",
    introKey: "feat_sub3_intro",
    bullets: ["feat_8_t", "feat_7_t", "feat_6_t"],
  },
  {
    tKey: "feat_sub4_t",
    introKey: "feat_sub4_intro",
    bullets: ["feat_sub4_b1", "feat_sub4_b2", "feat_sub4_b3"],
  },
];

export function Features() {
  const { t } = useLocale();

  return (
    <section id="features" className="bg-white py-24 border-t border-black/8">
      <div className="w-full max-w-6xl mx-auto px-8">

        <FadeUp className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-black/15 text-xs">03</span>
            <div className="w-8 h-px bg-black/10" />
            <span className="text-[10px] tracking-[.3em] uppercase text-black/25 font-sans">CAPABILITIES</span>
          </div>
          <h2
            className="font-display font-light text-black mb-3"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            {t("feat_h2_1")}{" "}
            <span className="text-black/35">{t("feat_h2_2")}</span>
          </h2>
          <p className="text-black/40 text-base font-sans leading-relaxed max-w-lg">
            {t("feat_sub")}
          </p>
        </FadeUp>

        {/* 4 subsections */}
        {subsections.map((sub, i) => (
          <FadeUp key={sub.tKey} delay={i * 0.07}>
            <div className="border-t border-black/8 py-12 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12">

              {/* Left */}
              <div>
                <div
                  className="font-display font-light text-black mb-2"
                  style={{ fontSize: "clamp(20px, 2.5vw, 28px)" }}
                >
                  {t(sub.tKey)}
                </div>
                <p className="text-black/45 text-sm font-sans leading-relaxed">
                  {t(sub.introKey)}
                </p>
              </div>

              {/* Right */}
              <div className="flex flex-col gap-3">
                {sub.bullets.map((bKey) => (
                  <div key={bKey} className="flex items-start gap-3">
                    <span className="w-4 h-px bg-black/20 shrink-0 mt-[0.6em]" />
                    <span className="text-black/60 text-sm font-sans leading-relaxed">
                      {t(bKey)}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </FadeUp>
        ))}
        <div className="border-t border-black/8" />

      </div>
    </section>
  );
}
