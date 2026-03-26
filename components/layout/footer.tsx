"use client";

import { useLocale } from "@/lib/locale-context";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="bg-black border-t border-white/5 py-16 flex flex-col items-center">
      <div className="w-full max-w-4xl px-6 sm:px-8">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center
                              text-black font-black text-sm shrink-0">L</div>
              <div>
                <div className="text-white font-bold text-sm">Lisa</div>
                <div className="text-white/25 text-[9px] font-mono tracking-wider">MODELING PROTECTION</div>
              </div>
            </div>
            <p className="text-white/25 text-sm leading-relaxed mb-5">{t("foot_tagline")}</p>
            <div className="flex gap-2.5">
              {["𝕏","in","◻","▶"].map((icon,i) => (
                <a key={i} href="#"
                   className="w-9 h-9 rounded-xl border border-white/8 flex items-center
                              justify-center text-white/25 hover:text-white/60
                              hover:border-white/20 text-sm transition-all duration-150">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white/60 font-semibold text-sm mb-5">{t("foot_col1")}</h4>
            <div className="flex flex-col gap-3">
              {["Starter — Free","Pro — $49/mo","Enterprise","API"].map(item=>(
                <a key={item} href="#pricing"
                   className="text-white/25 hover:text-white/60 text-sm transition-colors">{item}</a>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white/60 font-semibold text-sm mb-5">{t("foot_col2")}</h4>
            <div className="flex flex-col gap-3">
              {["Blog","Newsroom","FAQ","API Docs","System Status"].map(item=>(
                <a key={item} href="#"
                   className="text-white/25 hover:text-white/60 text-sm transition-colors">{item}</a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white/60 font-semibold text-sm mb-5">{t("foot_col3")}</h4>
            <div className="flex flex-col gap-3">
              {["About","Careers","Contact","Partners"].map(item=>(
                <a key={item} href="#"
                   className="text-white/25 hover:text-white/60 text-sm transition-colors">{item}</a>
              ))}
              <a href="#demo" className="text-white/25 hover:text-white/60 text-sm transition-colors">
                {t("nav_demo")}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-start
                        sm:items-center justify-between gap-4">
          <span className="text-white/18 text-xs font-mono">{t("foot_copy")}</span>
          <div className="flex flex-wrap gap-5">
            {(["foot_privacy","foot_biometric","foot_terms","foot_aup"] as const).map(k=>(
              <a key={k} href="#"
                 className="text-white/18 hover:text-white/40 text-xs transition-colors">{t(k)}</a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
