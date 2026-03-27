"use client";

import { FadeUp } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";

export function IntroBlock() {
  const { t } = useLocale();

  return (
    <section className="bg-white py-20 border-t border-black/8">
      <div className="w-full max-w-6xl mx-auto px-8">
        <FadeUp>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">

            {/* Left */}
            <div>
              <span className="text-[10px] tracking-[.3em] uppercase font-mono text-black/30 mb-4 block">
                {t("intro_eyebrow")}
              </span>
              <h2
                className="font-display font-light text-black"
                style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}
              >
                {t("intro_h2")}
              </h2>
            </div>

            {/* Right */}
            <div className="flex flex-col gap-5">
              <p className="text-black/60 text-base font-sans leading-relaxed">
                {t("intro_p1")}
              </p>
              <p className="text-black/60 text-base font-sans leading-relaxed">
                {t("intro_p2")}
              </p>
              <a
                href="#demo"
                className="text-blue-600 text-sm font-sans font-medium hover:underline underline-offset-2 mt-2 inline-block"
              >
                {t("intro_cta")}
              </a>
            </div>

          </div>
        </FadeUp>
      </div>
    </section>
  );
}
