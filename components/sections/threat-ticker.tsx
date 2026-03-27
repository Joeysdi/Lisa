"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/locale-context";

export function ThreatTicker() {
  const { t } = useLocale();

  const items = t("ticker_row1").split("·").map(s => s.trim()).filter(Boolean);
  const row = [...items, ...items, ...items, ...items];

  return (
    <div className="bg-black border-t border-b border-white/6 py-3 overflow-hidden select-none">
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: [0, -1800] }}
          transition={{ duration: 60, ease: "linear", repeat: Infinity }}
        >
          {row.map((item, i) => (
            <span key={i} className="font-mono text-[10px] text-white/20 shrink-0 flex items-center gap-3">
              <span className="w-px h-2 bg-white/10 inline-block" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
