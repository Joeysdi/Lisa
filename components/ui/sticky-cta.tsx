"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/lib/locale-context";
import { Button } from "@/components/ui/button";

export function StickyCta() {
  const { t } = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setVisible(scrolled > 0.4);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-white/10 px-6 py-4 flex items-center justify-between"
        >
          <span className="font-mono text-[10px] tracking-[.1em] uppercase text-white/50">
            {t("sticky_cta_label")}
          </span>
          <Button variant="primary" href="#get-started" size="sm">
            {t("hero_cta1")}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
