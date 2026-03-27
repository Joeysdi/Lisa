"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "@/lib/locale-context";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#features", labelKey: "nav_features" as const },
  { href: "#how",      labelKey: "nav_how"      as const },
  { href: "#pricing",  labelKey: "nav_pricing"  as const },
  { href: "#faq",      labelKey: "nav_faq"      as const },
];

export function Nav() {
  const { t, toggle } = useLocale();
  const [open,        setOpen]      = useState(false);
  const [scrolled,    setScrolled]  = useState(false);
  const [activeHref,  setActiveHref] = useState<string>("");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navLinks.forEach(({ href }) => {
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveHref(href); },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-nav flex flex-col items-center
                       transition-all duration-300
                       ${scrolled ? "bg-black/85 backdrop-blur-md border-b border-white/8" : "bg-transparent"}`}>
        <div className="w-full max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">

          {/* Wordmark */}
          <a href="#"
             className="flex items-center gap-3 select-none shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50">
            <span className="text-white font-bold text-xs tracking-[.4em] uppercase">LISA</span>
            <span className="w-px h-4 bg-white/15" />
            <span className="text-[9px] tracking-[.2em] uppercase text-white/40 font-sans hidden sm:block">
              PROTECTION
            </span>
          </a>

          {/* Desktop center links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href}
                 className={`text-xs tracking-[.12em] uppercase transition-colors duration-150 font-sans
                            focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50
                            ${activeHref === l.href ? "text-white/80" : "text-white/50 hover:text-white"}`}>
                {t(l.labelKey)}
              </a>
            ))}
          </div>

          {/* Right */}
          <div className="hidden lg:flex items-center gap-5 shrink-0">
            <button onClick={toggle}
              className="text-white/30 hover:text-white text-[10px] font-mono tracking-widest
                         transition-colors duration-150
                         focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50">
              {t("lang_switch")}
            </button>
            <a href="#demo"
               className="text-white/35 hover:text-white text-[11px] tracking-[.1em] uppercase transition-colors
                          focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50">
              {t("nav_signin")}
            </a>
            <Button variant="primary" size="sm" href="#get-started"
              style={{ padding: "10px 28px", fontSize: "11px", letterSpacing: "0.06em" }}>
              {t("nav_cta")}
            </Button>
          </div>

          {/* Mobile right */}
          <div className="flex lg:hidden items-center gap-3">
            <button onClick={toggle}
              className="text-white/30 text-[10px] font-mono tracking-widest transition-colors
                         focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50">
              {t("lang_switch")}
            </button>
            <button onClick={() => setOpen(o => !o)} aria-label="Menu"
              className="flex flex-col gap-[5px] p-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50">
              <motion.span
                animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.18 }}
                className="block w-5 h-px bg-white/60" />
              <motion.span
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.18 }}
                className="block w-5 h-px bg-white/60" />
              <motion.span
                animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.18 }}
                className="block w-5 h-px bg-white/60" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-menu bg-black flex flex-col justify-center px-8">

            <nav className="flex flex-col">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                   className="font-display font-light text-5xl text-white/80 hover:text-white
                              border-b border-white/8 py-6 transition-colors
                              focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50">
                  {t(l.labelKey)}
                </a>
              ))}
            </nav>

            <div className="mt-12 flex flex-col gap-4">
              <a href="#demo" onClick={() => setOpen(false)}
                 className="text-white/35 text-sm text-center tracking-[.1em] uppercase
                            focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50">
                {t("nav_signin")}
              </a>
              <Button variant="primary" href="#get-started" className="w-full justify-center py-4 text-sm"
                onClick={() => setOpen(false)}>
                {t("nav_cta")}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
