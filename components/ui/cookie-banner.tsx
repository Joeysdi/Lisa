"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "@/lib/locale-context";

export function CookieBanner() {
  const { t } = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("lisa_cookies");
    if (!accepted) {
      const t = setTimeout(() => setVisible(true), 1800);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("lisa_cookies", "1");
    setVisible(false);
  };
  const decline = () => {
    localStorage.setItem("lisa_cookies", "0");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-lg
                     bg-[#111] border border-white/12 rounded-2xl px-5 py-4
                     shadow-[0_8px_32px_rgba(0,0,0,0.6)]
                     flex flex-col sm:flex-row items-start sm:items-center gap-3"
        >
          <p className="text-white/60 text-[13px] leading-relaxed flex-1">
            {t("cookie_text")}{" "}
            <a href="#" className="text-white/80 underline hover:text-white">Privacy Policy</a>.
          </p>
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={decline}
              className="text-white/40 hover:text-white text-[13px] font-medium
                         px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/25
                         transition-all duration-150"
            >
              {t("cookie_decline")}
            </button>
            <button
              onClick={accept}
              className="bg-white text-black text-[13px] font-bold
                         px-4 py-1.5 rounded-lg hover:bg-white/90
                         transition-colors duration-150"
            >
              {t("cookie_accept")}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
