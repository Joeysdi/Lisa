"use client";

import { FadeUp } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";

export function CtaBottom() {
  const { t } = useLocale();

  return (
    <section className="relative py-32 px-6 md:px-12 overflow-hidden bg-[#050505]">

      {/* Subtle top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px
                      bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <FadeUp>
          <h2 className="text-white font-extrabold text-[clamp(36px,7vw,64px)]
                         leading-[1.02] tracking-[-2px] mb-6">
            {t("cta_h2_1")}{" "}
            <span className="text-white/30">{t("cta_h2_2")}</span>
          </h2>
          <p className="text-white/35 text-[16px] leading-relaxed max-w-lg mx-auto mb-10">
            {t("cta_sub")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#demo"
               className="bg-white text-black font-bold text-[14px]
                          px-8 py-4 rounded-xl transition-all duration-200
                          hover:bg-white/88 hover:-translate-y-0.5
                          hover:shadow-[0_8px_32px_rgba(255,255,255,0.12)]">
              {t("cta_btn1")}
            </a>
            <a href="#demo"
               className="text-white/35 hover:text-white/70 font-medium text-[14px]
                          px-6 py-4 rounded-xl border border-white/8
                          hover:border-white/20 transition-all duration-200">
              {t("cta_btn2")}
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
