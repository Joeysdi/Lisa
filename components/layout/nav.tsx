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
      <nav className={`fixed top-0 left-0 right-0 z-50 flex flex-col items-center
                       transition-all duration-300
                       ${scrolled ? "bg-black/98 backdrop-blur-2xl border-b border-white/6" : "bg-transparent"}`}>
        <div className="w-full max-w-6xl px-6 sm:px-8 h-16 flex items-center justify-between">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 select-none shrink-0">
            <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center
                            text-black font-black text-xs">L</div>
            <span className="text-white font-bold text-sm hidden sm:block">
              Lisa <span className="text-white/30 font-normal">Modeling Protection</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href}
                 className="text-white/40 hover:text-white text-xs font-medium
                            px-3.5 py-2 rounded-lg transition-colors duration-150">
                {t(l.labelKey)}
              </a>
            ))}
          </div>

          {/* Right */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <button onClick={toggle}
              className="text-white/30 hover:text-white text-[11px] font-mono tracking-widest
                         px-2.5 py-1.5 rounded-lg border border-white/10 hover:border-white/25
                         transition-all duration-150">
              {t("lang_switch")}
            </button>
            <a href="#demo"
               className="text-white/35 hover:text-white text-xs px-3 py-2 transition-colors">
              {t("nav_signin")}
            </a>
            <a href="#demo"
               className="bg-white text-black text-xs font-semibold px-5 py-2
                          rounded-lg transition-all duration-200 hover:bg-white/88
                          hover:-translate-y-px whitespace-nowrap">
              {t("nav_demo")}
            </a>
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden items-center gap-2">
            <button onClick={toggle}
              className="text-white/30 text-[10px] font-mono px-2 py-1.5 rounded-md
                         border border-white/10 transition-all duration-150">
              {t("lang_switch")}
            </button>
            <button onClick={() => setOpen(o => !o)} aria-label="Menu"
              className="flex flex-col gap-1.5 p-2">
              {[0,1,2].map(i => (
                <motion.span key={i}
                  animate={open ? i===1?{opacity:0}:i===0?{rotate:45,y:6}:{rotate:-45,y:-6} : {rotate:0,y:0,opacity:1}}
                  transition={{ duration:0.18 }}
                  className="block w-4 h-px bg-white/50 rounded-full" />
              ))}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity:0, height:0 }}
            animate={{ opacity:1, height:"auto" }}
            exit={{ opacity:0, height:0 }}
            transition={{ duration:0.2 }}
            className="fixed top-16 left-0 right-0 z-40 overflow-hidden
                       bg-black/99 border-b border-white/6 flex flex-col items-center">
            <div className="w-full max-w-6xl px-6 py-4 flex flex-col gap-0.5">
              {navLinks.map(l => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                   className="text-white/50 hover:text-white text-sm font-medium
                              py-3 border-b border-white/5 last:border-0 transition-colors">
                  {t(l.labelKey)}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-2">
                <a href="#demo" onClick={() => setOpen(false)}
                   className="text-white/35 text-xs py-2 text-center">{t("nav_signin")}</a>
                <a href="#demo" onClick={() => setOpen(false)}
                   className="w-full bg-white text-black text-sm font-semibold px-5 py-3 rounded-xl text-center">
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
