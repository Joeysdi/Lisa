"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/locale-context";

export function ThreatTicker() {
  const { t } = useLocale();

  const row1Items = t("ticker_row1").split("·").map(s => s.trim()).filter(Boolean);
  const row2Items = t("ticker_row2").split("·").map(s => s.trim()).filter(Boolean);

  // Repeat items to ensure seamless loop
  const row1 = [...row1Items, ...row1Items, ...row1Items, ...row1Items];
  const row2 = [...row2Items, ...row2Items, ...row2Items, ...row2Items];

  return (
    <div className="bg-black border-t border-b border-white/6 py-3 overflow-hidden select-none">
      {/* Row 1 — left */}
      <div className="overflow-hidden mb-2">
        <motion.div
          className="flex gap-6 whitespace-nowrap"
          animate={{ x: [0, -1600] }}
          transition={{ duration: 35, ease: "linear", repeat: Infinity }}
        >
          {row1.map((item, i) => (
            <span key={i} className="font-mono text-[10px] text-white/35 shrink-0 flex items-center gap-2">
              <span className="w-px h-2.5 bg-white/15 inline-block" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Row 2 — right (opposite direction) */}
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-6 whitespace-nowrap"
          animate={{ x: [-1600, 0] }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        >
          {row2.map((item, i) => (
            <span key={i} className="font-mono text-[10px] text-white/20 shrink-0 flex items-center gap-2">
              <span className="w-px h-2.5 bg-white/10 inline-block" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
