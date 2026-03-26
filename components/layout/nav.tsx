"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "@/lib/locale-context";

const navLinks = [
  { href: "#features", labelKey: "nav_features" as const },
  { href: "#how",      labelKey: "nav_how"      as const },
  { href: "#pricing",  labelKey: "nav_pricing"  as const },
  { href: "#faq",      labelKey: "nav_faq"      as const },
];

export function Nav() {
  const { t, toggle } = useLocale();
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled ? "bg-black/98 backdrop-blur-2xl border-b border-white/6" : "bg-transparent"}`}>
        <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">

          {/* Logo */}
          <a href="#" className="flex items-center gap-3 select-none shrink-0">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center
                            text-black font-black text-sm">L</div>
            <span className="text-white font-bold text-base tracking-tight hidden sm:block">
              Lisa <span className="text-white/30 font-normal">Modeling Protection</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href}
                 className="text-white/40 hover:text-white text-sm font-medium
                            px-4 py-2 rounded-lg transition-colors duration-150">
                {t(l.labelKey)}
              </a>
            ))}
          </div>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={toggle}
              className="text-white/35 hover:text-white text-xs font-mono tracking-widest
                         px-3 py-2 rounded-lg border border-white/10 hover:border-white/25
                         transition-all duration-150">
              {t("lang_switch")}
            </button>
            <a href="#demo"
               className="text-white/40 hover:text-white text-sm px-4 py-2.5
                          transition-colors duration-150">
              {t("nav_signin")}
            </a>
            <a href="#demo"
               className="bg-white text-black text-sm font-bold px-6 py-2.5
                          rounded-xl transition-all duration-200 hover:bg-white/88
                          hover:-translate-y-px">
              {t("nav_demo")}
            </a>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <button onClick={toggle}
              className="text-white/35 text-xs font-mono px-2.5 py-1.5 rounded-lg
                         border border-white/10 transition-all duration-150">
              {t("lang_switch")}
            </button>
            <button onClick={() => setOpen((o) => !o)} aria-label="Menu"
              className="flex flex-col gap-[5px] p-2">
              {[0, 1, 2].map((i) => (
                <motion.span key={i}
                  animate={open
                    ? i === 1 ? { opacity: 0 } : i === 0 ? { rotate: 45, y: 7 } : { rotate: -45, y: -7 }
                    : { rotate: 0, y: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="block w-5 h-[1.5px] bg-white/50 rounded-full" />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed top-16 left-0 right-0 z-40 overflow-hidden
                       bg-black/99 border-b border-white/6">
            <div className="w-full max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                   className="text-white/55 hover:text-white text-base font-medium
                              py-3 border-b border-white/5 last:border-0 transition-colors">
                  {t(l.labelKey)}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-2.5">
                <a href="#demo" onClick={() => setOpen(false)}
                   className="text-white/40 text-sm py-2 text-center">{t("nav_signin")}</a>
                <a href="#demo" onClick={() => setOpen(false)}
                   className="bg-white text-black text-sm font-bold py-3 rounded-xl text-center">
                  {t("nav_demo")}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
