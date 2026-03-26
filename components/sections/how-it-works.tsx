"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";

const panels = [
  {
    title: "SCAN OVERVIEW", badge: "Live",
    content: (
      <div className="space-y-3">
        {[["Instagram",88],["TikTok",73],["X / Twitter",95],["Reddit",61],["Telegram",44],["Dark Web",29]].map(([l,w]) => (
          <div key={String(l)} className="flex items-center gap-3">
            <span className="text-white/35 text-xs font-mono w-20 shrink-0">{l}</span>
            <div className="flex-1 h-px bg-white/8 overflow-hidden">
              <motion.div className="h-full bg-white"
                initial={{ width:0 }} animate={{ width:`${w}%` }}
                transition={{ duration:1.2, ease:[0.4,0,0.2,1], delay:0.2 }} />
            </div>
            <span className="text-white/35 text-xs font-mono w-8 text-right">{w}%</span>
          </div>
        ))}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {[["Scanned","2.8M"],["Matches","2,841"],["Violations","17"],["Removed","14"]].map(([l,v]) => (
            <div key={String(l)} className="border border-white/6 p-3">
              <div className="text-white/25 text-[10px] font-mono uppercase tracking-wider mb-1">{l}</div>
              <div className="font-mono font-bold text-xl text-white">{v}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "FLAGGED CONTENT", badge: "3 New",
    content: (
      <div className="divide-y divide-white/5">
        {[
          ["bg-white","Deepfake video — Telegram @leaks2026","2m ago"],
          ["bg-white/50","Unauthorized photo — adult site","18m ago"],
          ["bg-white","AI image — Reddit r/deepfakes","1h ago"],
          ["bg-white/20","Licensed use — brand campaign","3h ago"],
          ["bg-white/20","Authorized repost — agency account","5h ago"],
        ].map(([dot,text,time]) => (
          <div key={String(text)} className="flex items-center gap-3 py-3">
            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />
            <span className="text-white/60 text-sm flex-1 leading-tight">{text}</span>
            <span className="text-white/20 text-xs font-mono shrink-0">{time}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "CONTENT REVIEW", badge: "Awaiting approval",
    content: (
      <div>
        <div className="text-white/20 text-[10px] font-mono tracking-[.15em] mb-3">DETECTED — DEEPFAKE VIDEO</div>
        <div className="flex gap-1.5 flex-wrap mb-4">
          {[["AI GENERATED","border-white/15 text-white/45"],["HIGH RISK","border-white/15 text-white/45"],["TELEGRAM","border-white/8 text-white/25"]].map(([l,s]) => (
            <span key={String(l)} className={`text-[10px] font-bold tracking-wider px-2 py-0.5 border ${s}`}>{l}</span>
          ))}
        </div>
        <div className="text-white/30 text-sm leading-loose mb-5 font-mono">
          Channel: @leaks2026 · ~8,400 views<br/>Shares: 312 · Accuracy: 98.7%<br/>Detected: 2 min ago
        </div>
        <div className="flex gap-2">
          <button className="flex-1 bg-white text-black text-xs font-semibold py-2.5
                             hover:bg-white/88 transition-colors">Remove</button>
          <button className="flex-1 border border-white/12 text-white/40 text-xs font-semibold
                             py-2.5 hover:border-white/25 transition-colors">Allow</button>
        </div>
      </div>
    ),
  },
  {
    title: "TAKEDOWN TRACKER", badge: "3 Active",
    content: (
      <div className="space-y-4">
        {[
          ["Vid","Deepfake video — Telegram","2h ago","Sent","border-white/12 text-white/40"],
          ["Img","Stolen photo — adult site","18h ago","Done","border-white/15 text-white/70"],
          ["AI","AI image — Reddit","1h ago","Pending","border-white/8 text-white/25"],
          ["Aud","Voice clone — TikTok","3d ago","Done","border-white/15 text-white/70"],
        ].map(([icon,name,time,badge,bs]) => (
          <div key={String(name)} className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-white/20 w-6 shrink-0">{icon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-white/60 text-sm font-medium truncate">{name}</div>
              <div className="text-white/20 text-xs font-mono">{time}</div>
            </div>
            <span className={`text-[10px] font-semibold px-2 py-1 border shrink-0 ${bs}`}>{badge}</span>
          </div>
        ))}
        <div className="pt-2 border-t border-white/6 text-white/25 text-xs font-mono">
          Avg removal: <span className="text-white/50">21 hours</span>
        </div>
      </div>
    ),
  },
];

export function HowItWorks() {
  const { t } = useLocale();
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>|null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActive(a => (a+1)%4), 4200);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { startTimer(); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, []);

  const steps = [
    { num:"01", t:t("how_s1_t"), d:t("how_s1_d") },
    { num:"02", t:t("how_s2_t"), d:t("how_s2_d") },
    { num:"03", t:t("how_s3_t"), d:t("how_s3_d") },
    { num:"04", t:t("how_s4_t"), d:t("how_s4_d") },
  ];

  return (
    <section id="how" className="bg-[#050505] py-24 flex flex-col items-center">
      <div className="w-full max-w-6xl px-8">

        <FadeUp className="mb-12">
          {/* Section marker */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-white/15 text-xs">01</span>
            <div className="w-8 h-px bg-white/10" />
            <span className="text-[10px] tracking-[.3em] uppercase text-white/25 font-sans">PROCESS</span>
          </div>
          <h2
            className="font-display font-light text-white"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            {t("how_h2")}
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-14">

          {/* Steps */}
          <div className="flex flex-col">
            {steps.map((s,i) => (
              <button key={i} onClick={() => { setActive(i); startTimer(); }}
                className={`text-left transition-all duration-200
                  ${active===i
                    ? "bg-white/[0.04] border-l-2 border-l-white pl-5 pr-5 py-5"
                    : "border-l-2 border-l-white/8 pl-5 pr-5 py-4 hover:bg-white/[0.02]"
                  }`}>
                <div className="flex items-start gap-4">
                  <span className={`font-mono text-[10px] shrink-0 mt-0.5 transition-colors
                    ${active===i ? "text-white" : "text-white/20"}`}>{s.num}</span>
                  <div className="text-left">
                    <div className={`font-sans font-medium text-sm mb-1 transition-colors
                      ${active===i ? "text-white" : "text-white/35"}`}>{s.t}</div>
                    <div className="text-white/20 text-xs leading-relaxed">{s.d}</div>
                  </div>
                </div>
                {active===i && (
                  <motion.div className="h-px bg-white/20 mt-3"
                    initial={{ scaleX:0 }} animate={{ scaleX:1 }}
                    transition={{ duration:4.2 }} style={{ transformOrigin:"left" }} />
                )}
              </button>
            ))}
          </div>

          {/* Panel */}
          <div className="bg-black border border-white/8 p-6">
            <div className="flex items-center justify-between mb-5">
              <span className="font-mono text-[10px] text-white/25 tracking-[.15em]">{panels[active].title}</span>
              <span className="text-[10px] text-white/40 border border-white/8 px-2.5 py-1 font-mono">
                {panels[active].badge}
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={active}
                initial={{ opacity:0, y:4 }} animate={{ opacity:1, y:0 }}
                exit={{ opacity:0, y:-4 }} transition={{ duration:0.18 }}>
                {panels[active].content}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
