"use client";

import { useLocale } from "@/lib/locale-context";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="bg-black border-t border-white/5 pt-16 pb-10 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center
                              text-black font-black text-[13px]">L</div>
              <div>
                <div className="text-white font-bold text-[14px] tracking-[-0.2px]">Lisa</div>
                <div className="text-white/25 text-[9px] tracking-[0.5px] font-mono">
                  MODELING PROTECTION
                </div>
              </div>
            </div>
            <p className="text-white/25 text-[13px] leading-relaxed mb-5">{t("foot_tagline")}</p>
            <div className="flex gap-2.5">
              {["𝕏", "in", "◻", "▶"].map((icon, i) => (
                <a key={i} href="#"
                   className="w-8 h-8 rounded-lg border border-white/8 flex items-center
                              justify-center text-white/25 hover:text-white/60
                              hover:border-white/20 text-[13px] transition-all duration-150">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white/60 font-semibold text-[13px] mb-4 tracking-[-0.1px]">
              {t("foot_col1")}
            </h4>
            <div className="flex flex-col gap-2.5">
              {["Starter — Free", "Pro — $49/mo", "Enterprise"].map((item) => (
                <a key={item} href="#pricing"
                   className="text-white/25 hover:text-white/60 text-[13px]
                              transition-colors duration-150">
                  {item}
                </a>
              ))}
              <a href="#" className="text-white/25 hover:text-white/60 text-[13px] transition-colors">
                API
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white/60 font-semibold text-[13px] mb-4 tracking-[-0.1px]">
              {t("foot_col2")}
            </h4>
            <div className="flex flex-col gap-2.5">
              {["Blog", "Newsroom", "FAQ", "API Docs", "System Status"].map((item) => (
                <a key={item} href="#"
                   className="text-white/25 hover:text-white/60 text-[13px]
                              transition-colors duration-150">
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white/60 font-semibold text-[13px] mb-4 tracking-[-0.1px]">
              {t("foot_col3")}
            </h4>
            <div className="flex flex-col gap-2.5">
              {["About", "Careers", "Contact", "Partners"].map((item) => (
                <a key={item} href="#"
                   className="text-white/25 hover:text-white/60 text-[13px]
                              transition-colors duration-150">
                  {item}
                </a>
              ))}
              <a href="#demo"
                 className="text-white/25 hover:text-white/60 text-[13px] transition-colors">
                {t("nav_demo")}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-7 flex flex-col sm:flex-row items-start
                        sm:items-center justify-between gap-4">
          <span className="text-white/18 text-[12px] font-mono">{t("foot_copy")}</span>
          <div className="flex flex-wrap gap-5">
            {(["foot_privacy","foot_biometric","foot_terms","foot_aup"] as const).map((k) => (
              <a key={k} href="#"
                 className="text-white/18 hover:text-white/40 text-[12px]
                            transition-colors duration-150">
                {t(k)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
