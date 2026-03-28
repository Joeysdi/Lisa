"use client";

import { useLocale } from "@/lib/locale-context";

function TickerRow({ text, direction }: { text: string; direction: "left" | "right" }) {
  // Duplicate the text so the loop is seamless
  const content = `${text}  ${text}`;
  const animClass = direction === "left" ? "animate-ticker-left" : "animate-ticker-right";

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <span className={`inline-block font-mono text-[10px] tracking-[.1em] text-white/25 ${animClass}`}>
        {content}
      </span>
    </div>
  );
}

export function ThreatTicker() {
  const { t } = useLocale();

  return (
    <div className="bg-black border-y border-white/6 py-3 overflow-hidden select-none">
      <style>{`
        @keyframes ticker-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes ticker-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-ticker-left  { animation: ticker-left  60s linear infinite; }
        .animate-ticker-right { animation: ticker-right 60s linear infinite; }
      `}</style>
      <TickerRow text={t("ticker_row1")} direction="left" />
      <div className="mt-1.5" />
      <TickerRow text={t("ticker_row2")} direction="right" />
    </div>
  );
}
