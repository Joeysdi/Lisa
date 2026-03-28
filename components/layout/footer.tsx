"use client";

import { useLocale } from "@/lib/locale-context";

const socialIcons = [
  {
    label: "X",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="relative bg-black border-t border-white/6 py-16 flex flex-col items-center overflow-hidden">

      {/* Background watermark */}
      <div className="absolute bottom-0 right-0 pointer-events-none select-none overflow-hidden">
        <span
          className="font-display font-light text-white/[0.03]"
          style={{ fontSize: "clamp(120px, 18vw, 220px)", lineHeight: 1 }}
        >
          LISA
        </span>
      </div>

      <div className="relative w-full max-w-7xl px-5 sm:px-8">

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
              {socialIcons.map(({ label, svg }) => (
                <a key={label} href="#" aria-label={label}
                   className="w-8 h-8 border border-white/8 flex items-center justify-center
                              text-white/20 hover:text-white/50 hover:border-white/20
                              transition-all duration-150
                              focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50">
                  {svg}
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
                   className="text-white/20 hover:text-white/50 text-xs tracking-[.05em] font-sans transition-colors
                              focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50">
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
                   className="text-white/20 hover:text-white/50 text-xs tracking-[.05em] font-sans transition-colors
                              focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50">
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
                   className="text-white/20 hover:text-white/50 text-xs tracking-[.05em] font-sans transition-colors
                              focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50">
                  {item}
                </a>
              ))}
              <a href="#demo"
                 className="text-white/20 hover:text-white/50 text-xs tracking-[.05em] font-sans transition-colors
                            focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50">
                {t("nav_demo")}
              </a>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-start
                        sm:items-center justify-between gap-4">
          <span className="text-white/20 text-[10px] font-mono">{t("foot_copy")}</span>
          <div className="flex flex-wrap gap-3 sm:gap-5">
            {(["foot_privacy", "foot_biometric", "foot_terms", "foot_aup"] as const).map(k => (
              <a key={k} href="#"
                 className="text-white/20 hover:text-white/40 text-[10px] font-mono transition-colors
                            focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50">
                {t(k)}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
