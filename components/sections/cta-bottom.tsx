"use client";

import { FadeUp } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";
import { Button } from "@/components/ui/button";

export function CtaBottom() {
  const { t } = useLocale();

  return (
    <section className="bg-surface-dark py-32 border-t border-white/6 relative overflow-hidden flex flex-col items-center">
      <div className="w-full max-w-4xl px-6 sm:px-8 text-center">
        <FadeUp>
          {/* Live indicator */}
          <div className="flex items-center justify-center gap-2 mb-10">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white/60" />
            </span>
            <span className="text-white/35 text-xs font-sans">{t("hero_live")}</span>
          </div>

          <h2
            className="font-display font-light text-white leading-tight mb-6"
            style={{ fontSize: "clamp(38px, 7vw, 68px)" }}
          >
            {t("cta_h2_1")}{" "}
            <span className="text-white/30">{t("cta_h2_2")}</span>
          </h2>
          <p className="text-white/55 text-lg leading-relaxed max-w-lg mx-auto mb-10 text-center font-sans">
            {t("cta_sub")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" href="#demo" className="w-full sm:w-auto">
              {t("cta_btn1")}
            </Button>
            <Button variant="outline" href="#demo" className="w-full sm:w-auto">
              {t("cta_btn2")}
            </Button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
