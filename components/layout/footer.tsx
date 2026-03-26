"use client";

import { useLocale } from "@/lib/locale-context";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="bg-black border-t border-white/6 py-16 flex flex-col items-center">
      <div className="w-full max-w-7xl px-8">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="mb-4">
              <div className="text-white font-bold text-xs tracking-[.25em] uppercase font-sans">LISA</div>
              <div className="text-white/25 text-[9px] tracking-[.15em] uppercase font-sans mt-1">
                MODELING PROTECTION
              </div>
            </div>
            <p className="text-white/20 text-xs leading-relaxed mt-4 max-w-[180px] font-sans">
              {t("foot_tagline")}
            </p>
            <div className="flex gap-2 mt-5">
              {["𝕏", "in", "◻", "▶"].map((icon, i) => (
                <a key={i} href="#"
                   className="w-8 h-8 border border-white/8 flex items-center justify-center
                              text-white/20 hover:text-white/50 hover:border-white/20
                              text-xs transition-all duration-150">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[9px] tracking-[.3em] uppercase text-white/25 mb-5 font-sans">
              {t("foot_col1")}
            </h4>
            <div className="flex flex-col gap-3">
              {["Starter — Free", "Pro — $49/mo", "Enterprise", "API"].map(item => (
                <a key={item} href="#pricing"
                   className="text-white/20 hover:text-white/50 text-xs tracking-[.05em] font-sans transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-[9px] tracking-[.3em] uppercase text-white/25 mb-5 font-sans">
              {t("foot_col2")}
            </h4>
            <div className="flex flex-col gap-3">
              {["Blog", "Newsroom", "FAQ", "API Docs", "System Status"].map(item => (
                <a key={item} href="#"
                   className="text-white/20 hover:text-white/50 text-xs tracking-[.05em] font-sans transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[9px] tracking-[.3em] uppercase text-white/25 mb-5 font-sans">
              {t("foot_col3")}
            </h4>
            <div className="flex flex-col gap-3">
              {["About", "Careers", "Contact", "Partners"].map(item => (
                <a key={item} href="#"
                   className="text-white/20 hover:text-white/50 text-xs tracking-[.05em] font-sans transition-colors">
                  {item}
                </a>
              ))}
              <a href="#demo"
                 className="text-white/20 hover:text-white/50 text-xs tracking-[.05em] font-sans transition-colors">
                {t("nav_demo")}
              </a>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-start
                        sm:items-center justify-between gap-4">
          <span className="text-white/15 text-[10px] font-mono">{t("foot_copy")}</span>
          <div className="flex flex-wrap gap-5">
            {(["foot_privacy", "foot_biometric", "foot_terms", "foot_aup"] as const).map(k => (
              <a key={k} href="#"
                 className="text-white/15 hover:text-white/40 text-[10px] font-mono transition-colors">
                {t(k)}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
