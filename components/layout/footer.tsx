"use client";

import { useLocale } from "@/lib/locale-context";

const serviceLinks = [
  { href: "#pricing", labelKey: "tier_free_name" as const },
  { href: "#pricing", labelKey: "tier_pro_name"  as const },
  { href: "#pricing", labelKey: "tier_ent_name"  as const },
];

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="bg-[#000] border-t border-white/8 pt-16 pb-10 px-[6%]">
      <div className="max-w-6xl mx-auto">
        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-white rounded-[7px] flex items-center justify-center
                              text-black font-black text-[15px]">
                L
              </div>
              <div className="leading-tight">
                <div className="text-white font-extrabold text-[14px]">Lisa Modeling Protection</div>
                <div className="text-white/40 text-[9px] tracking-[0.5px]">AI LIKENESS DEFENSE</div>
              </div>
            </div>
            <p className="text-white/40 text-[13px] leading-relaxed mb-5">
              {t("foot_tagline")}
            </p>
            <div className="flex gap-3">
              {["𝕏", "in", "◻", "▶"].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg border border-white/10 flex items-center
                             justify-center text-white/40 hover:text-white hover:border-white/30
                             text-[13px] transition-all duration-150"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-[14px] mb-4">{t("foot_col1")}</h4>
            <div className="flex flex-col gap-2.5">
              {serviceLinks.map((l) => (
                <a key={l.href + l.labelKey} href={l.href}
                   className="text-white/40 hover:text-white text-[13px] transition-colors duration-150">
                  {t(l.labelKey)}
                </a>
              ))}
              <a href="#" className="text-white/40 hover:text-white text-[13px] transition-colors duration-150">
                API
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold text-[14px] mb-4">{t("foot_col2")}</h4>
            <div className="flex flex-col gap-2.5">
              {["Blog", "News", "FAQ", "API Docs", "Status"].map((item) => (
                <a key={item} href="#"
                   className="text-white/40 hover:text-white text-[13px] transition-colors duration-150">
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-[14px] mb-4">{t("foot_col3")}</h4>
            <div className="flex flex-col gap-2.5">
              {["About", "Careers", "Contact", "Partners"].map((item) => (
                <a key={item} href="#"
                   className="text-white/40 hover:text-white text-[13px] transition-colors duration-150">
                  {item}
                </a>
              ))}
              <a href="#demo"
                 className="text-white/40 hover:text-white text-[13px] transition-colors duration-150">
                {t("nav_demo")}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-start
                        sm:items-center justify-between gap-4">
          <span className="text-white/30 text-[12px]">{t("foot_copy")}</span>
          <div className="flex flex-wrap gap-4">
            {(["foot_privacy", "foot_biometric", "foot_terms", "foot_aup"] as const).map((k) => (
              <a key={k} href="#"
                 className="text-white/30 hover:text-white/60 text-[12px] transition-colors duration-150">
                {t(k)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
