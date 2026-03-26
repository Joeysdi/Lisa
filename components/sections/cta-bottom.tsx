"use client";

import { FadeUp } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";

export function CtaBottom() {
  const { t } = useLocale();

  return (
    <section className="bg-[#050505] py-32 relative overflow-hidden flex flex-col items-center">
      <div className="absolute top-0 left-0 right-0 h-px
                      bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="w-full max-w-3xl px-6 sm:px-8 text-center">
        <FadeUp>
          <h2 className="text-white font-extrabold text-[clamp(38px,7vw,68px)]
                         leading-[1.02] tracking-tight mb-6">
            {t("cta_h2_1")}{" "}
            <span className="text-white/30">{t("cta_h2_2")}</span>
          </h2>
          <p className="text-white/55 text-xl leading-relaxed max-w-lg mx-auto mb-10 text-center">
            {t("cta_sub")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#demo"
               className="inline-flex items-center justify-center bg-white text-black font-sans
                          font-medium text-sm px-8 py-3.5 rounded-full w-full sm:w-auto
                          transition-colors duration-200 hover:bg-white/90">
              {t("cta_btn1")}
            </a>
            <a href="#demo"
               className="inline-flex items-center justify-center text-white/55 hover:text-white
                          font-sans font-medium text-sm px-8 py-3.5 rounded-full w-full sm:w-auto
                          border border-white/20 hover:border-white/45 transition-all duration-200">
              {t("cta_btn2")}
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
