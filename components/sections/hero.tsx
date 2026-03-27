"use client";

import { FadeUp } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";
import { Button } from "@/components/ui/button";

export function Hero() {
  const { t } = useLocale();

  const stats = [
    t("hero_stat1"),
    t("hero_stat2"),
    t("hero_stat3"),
    t("hero_stat4"),
  ];

  return (
    <section className="min-h-[58vh] bg-black flex flex-col overflow-hidden relative">

      {/* Main content — left aligned */}
      <div className="relative z-10 flex-1 flex items-start px-8 pt-32 pb-16">
        <FadeUp className="flex flex-col items-start text-left max-w-6xl w-full mx-auto">

          {/* Eyebrow */}
          <span className="text-[10px] tracking-[.35em] uppercase font-sans text-white/35 mb-8 block">
            MODELING PROTECTION
          </span>

          {/* H1 */}
          <h1
            className="font-display font-light leading-[0.9] tracking-[-0.02em] mb-8 text-white"
            style={{ fontSize: "clamp(42px, 6vw, 80px)" }}
          >
            <span className="block">{t("hero_h1_1")}</span>
            <span className="block italic text-white/40">{t("hero_h1_2")}</span>
          </h1>

          {/* Sub */}
          <p className="text-white/55 text-base max-w-lg font-sans leading-relaxed mb-10">
            {t("hero_sub")}
          </p>

          {/* Single CTA */}
          <Button variant="accent" href="#demo">{t("hero_cta1")}</Button>

        </FadeUp>
      </div>

      {/* Bottom stats strip */}
      <div className="relative z-10 border-t border-white/6 w-full">
        <div className="max-w-6xl mx-auto w-full px-8 py-5 flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-40" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500/60" />
          </span>
          {stats.map((s, i) => (
            <span key={s} className="text-white/30 text-xs font-mono tracking-[.12em]">
              {s}{i < stats.length - 1 && <span className="text-white/15 mx-1">·</span>}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
