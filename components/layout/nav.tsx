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
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[6%] h-16
                    transition-all duration-300
                    ${scrolled
                      ? "bg-black/95 backdrop-blur-2xl border-b border-white/8 shadow-[0_1px_0_rgba(255,255,255,0.04)]"
                      : "bg-black/80 backdrop-blur-xl border-b border-white/5"
                    }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 select-none">
          <div className="w-8 h-8 bg-white rounded-[7px] flex items-center justify-center
                          text-black font-black text-[15px] flex-shrink-0">
            L
          </div>
          <div className="leading-tight">
            <div className="text-white font-extrabold text-[15px] tracking-[-0.2px]">
              Lisa Modeling Protection
            </div>
            <div className="text-white/40 text-[9px] tracking-[0.5px] font-normal">
              AI LIKENESS DEFENSE
            </div>
          </div>
        </a>

        {/* Desktop center links */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-white/50 hover:text-white text-[14px] font-medium
                         px-3.5 py-[7px] rounded-[7px] transition-all duration-150
                         hover:bg-white/6"
            >
              {t(l.labelKey)}
            </a>
          ))}
        </div>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-2.5">
          <button
            onClick={toggle}
            className="text-white/40 hover:text-white text-[12px] font-mono tracking-wider
                       px-2.5 py-1 rounded-md border border-white/10 hover:border-white/25
                       transition-all duration-150"
          >
            {t("lang_switch")}
          </button>
          <a
            href="#demo"
            className="text-white/50 hover:text-white text-[14px] font-medium
                       px-3 py-2 rounded-[7px] transition-all duration-150"
          >
            {t("nav_signin")}
          </a>
          <a
            href="#demo"
            className="bg-white text-black text-[14px] font-bold px-5 py-[9px]
                       rounded-lg transition-all duration-200 hover:bg-white/90
                       hover:-translate-y-px"
          >
            {t("nav_demo")}
          </a>
        </div>

        {/* Mobile hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggle}
            className="text-white/40 hover:text-white text-[11px] font-mono
                       px-2 py-1 rounded border border-white/10"
          >
            {t("lang_switch")}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex flex-col gap-[5px] p-1.5 cursor-pointer"
            aria-label="Menu"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={
                  open
                    ? i === 1
                      ? { opacity: 0 }
                      : i === 0
                      ? { rotate: 45, y: 7 }
                      : { rotate: -45, y: -7 }
                    : { rotate: 0, y: 0, opacity: 1 }
                }
                transition={{ duration: 0.2 }}
                className="block w-5 h-[1.5px] bg-white/50 rounded-full"
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-40 overflow-hidden
                       bg-black/98 backdrop-blur-2xl border-b border-white/8"
          >
            <div className="flex flex-col px-[6%] py-4 gap-0.5">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={close}
                  className="text-white/60 hover:text-white text-[15px] font-medium
                             py-3 border-b border-white/5 last:border-0
                             transition-colors duration-150"
                >
                  {t(l.labelKey)}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-2">
                <a
                  href="#demo"
                  onClick={close}
                  className="text-white/50 hover:text-white text-[14px] py-2 text-center"
                >
                  {t("nav_signin")}
                </a>
                <a
                  href="#demo"
                  onClick={close}
                  className="bg-white text-black text-[14px] font-bold
                             py-3 rounded-lg text-center"
                >
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
