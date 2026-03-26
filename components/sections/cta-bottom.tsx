"use client";

import { FadeUp } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";

export function CtaBottom() {
  const { t } = useLocale();

  return (
    <section className="relative py-28 px-[6%] overflow-hidden bg-black">
      {/* Green glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[800px] h-[400px] pointer-events-none
                      bg-[radial-gradient(ellipse,rgba(74,222,128,0.06)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <FadeUp>
          <h2 className="text-white font-extrabold text-[clamp(32px,6vw,56px)] leading-tight mb-6">
            {t("cta_h2_1")}{" "}
            <span className="text-green-400">{t("cta_h2_2")}</span>
          </h2>
          <p className="text-white/45 text-[16px] leading-relaxed max-w-lg mx-auto mb-10">
            {t("cta_sub")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#demo"
              className="bg-green-400 text-black font-bold text-[15px]
                         px-8 py-4 rounded-xl transition-all duration-200
                         hover:bg-green-300 hover:-translate-y-0.5
                         hover:shadow-[0_8px_32px_rgba(74,222,128,0.4)]"
            >
              {t("cta_btn1")}
            </a>
            <a
              href="#demo"
              className="text-white/55 hover:text-white font-medium text-[15px]
                         px-6 py-4 rounded-xl border border-white/12
                         hover:border-white/25 transition-all duration-200"
            >
              {t("cta_btn2")}
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
