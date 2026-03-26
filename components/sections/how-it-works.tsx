"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";

const panels = [
  {
    title: "SCAN OVERVIEW",
    badge: "Live",
    content: (
      <div className="space-y-3">
        {[
          { label: "Instagram",   w: 88 },
          { label: "TikTok",      w: 73 },
          { label: "X / Twitter", w: 95 },
          { label: "Reddit",      w: 61 },
          { label: "Telegram",    w: 44 },
          { label: "Dark Web",    w: 29 },
        ].map((b) => (
          <div key={b.label} className="flex items-center gap-3">
            <span className="text-white/35 text-[11px] w-20 flex-shrink-0 font-mono">{b.label}</span>
            <div className="flex-1 h-px rounded-full bg-white/8 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${b.w}%` }}
                transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
              />
            </div>
            <span className="text-white/40 text-[11px] font-mono w-8 text-right">{b.w}%</span>
          </div>
        ))}
        <div className="grid grid-cols-2 gap-2 mt-5">
          {[
            { l: "Scanned today", v: "2.8M",  dim: false },
            { l: "Matches",       v: "2,841", dim: false },
            { l: "Violations",    v: "17",    dim: false },
            { l: "Removed",       v: "14",    dim: false },
          ].map((s) => (
            <div key={s.l} className="rounded-xl border border-white/6 p-3">
              <div className="text-white/25 text-[9px] font-mono uppercase tracking-wider mb-1">{s.l}</div>
              <div className="font-mono font-bold text-[20px] text-white">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "FLAGGED CONTENT",
    badge: "3 New",
    content: (
      <div className="space-y-0 divide-y divide-white/5">
        {[
          { dot: "bg-white",       label: "●", text: "Deepfake video — Telegram @leaks2026", time: "2m ago" },
          { dot: "bg-white/50",    label: "●", text: "Unauthorized photo — adult site",       time: "18m ago" },
          { dot: "bg-white",       label: "●", text: "AI image — Reddit r/deepfakes",         time: "1h ago" },
          { dot: "bg-white/20",    label: "○", text: "Licensed use — brand campaign",         time: "3h ago" },
          { dot: "bg-white/20",    label: "○", text: "Authorized repost — agency account",    time: "5h ago" },
        ].map((r) => (
          <div key={r.text} className="flex items-center gap-3 py-3">
            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${r.dot}`} />
            <span className="text-white/60 text-[12px] flex-1 leading-tight">{r.text}</span>
            <span className="text-white/20 text-[10px] font-mono whitespace-nowrap">{r.time}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "CONTENT REVIEW",
    badge: "Action needed",
    content: (
      <div>
        <div className="text-white/20 text-[9px] font-mono font-semibold tracking-[.15em] mb-3">
          DETECTED — DEEPFAKE VIDEO
        </div>
        <div className="flex gap-1.5 flex-wrap mb-4">
          {[
            { label: "AI GENERATED", style: "border-white/20 text-white/50" },
            { label: "HIGH RISK",    style: "border-white/20 text-white/50" },
            { label: "TELEGRAM",     style: "border-white/10 text-white/30" },
          ].map((tag) => (
            <span key={tag.label}
              className={`text-[9px] font-bold tracking-[.1em] px-2 py-0.5
                          rounded border ${tag.style}`}>
              {tag.label}
            </span>
          ))}
        </div>
        <div className="text-white/30 text-[12px] leading-loose mb-5 font-mono">
          Channel: @leaks2026 · ~8,400 views<br />
          Shares: 312 · Accuracy: 98.7%<br />
          Detected: 2 minutes ago
        </div>
        <div className="flex gap-2">
          <button className="flex-1 bg-white text-black text-[12px] font-bold
                             py-2.5 rounded-lg hover:bg-white/88 transition-colors duration-150">
            Remove
          </button>
          <button className="flex-1 border border-white/12 text-white/40
                             text-[12px] font-bold py-2.5 rounded-lg hover:border-white/25
                             transition-colors duration-150">
            Allow
          </button>
        </div>
      </div>
    ),
  },
  {
    title: "TAKEDOWN TRACKER",
    badge: "3 Active",
    content: (
      <div className="space-y-3">
        {[
          { icon: "🎬", name: "Deepfake video — Telegram",  time: "2h ago",  badge: "Sent",     bs: "border-white/15 text-white/45" },
          { icon: "📸", name: "Stolen photo — adult site",  time: "18h ago", badge: "✓ Done",   bs: "border-white/15 text-white" },
          { icon: "🖼️", name: "AI image — Reddit",          time: "1h ago",  badge: "Pending",  bs: "border-white/10 text-white/30" },
          { icon: "🎤", name: "Voice clone — TikTok",       time: "3d ago",  badge: "✓ Done",   bs: "border-white/15 text-white" },
        ].map((r) => (
          <div key={r.name} className="flex items-center gap-3">
            <span className="text-[16px] flex-shrink-0">{r.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-white/60 text-[12px] font-medium truncate">{r.name}</div>
              <div className="text-white/20 text-[10px] font-mono">{r.time}</div>
            </div>
            <span className={`text-[9px] font-bold tracking-[.08em] px-2 py-0.5
                              rounded border whitespace-nowrap ${r.bs}`}>
              {r.badge}
            </span>
          </div>
        ))}
        <div className="pt-3 border-t border-white/6 text-white/25 text-[11px] font-mono">
          Avg removal: <span className="text-white/50">21 hours</span>
        </div>
      </div>
    ),
  },
];

export function HowItWorks() {
  const { t } = useLocale();
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActive((a) => (a + 1) % 4), 4200);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStep = (i: number) => { setActive(i); startTimer(); };

  const steps = [
    { num: "01", t: t("how_s1_t"), d: t("how_s1_d") },
    { num: "02", t: t("how_s2_t"), d: t("how_s2_d") },
    { num: "03", t: t("how_s3_t"), d: t("how_s3_d") },
    { num: "04", t: t("how_s4_t"), d: t("how_s4_d") },
  ];

  return (
    <section id="how" className="py-28 px-6 md:px-12 bg-[#050505]">
      <div className="max-w-6xl mx-auto">

        <FadeUp className="mb-16">
          <p className="text-white/25 text-[11px] font-mono tracking-[.2em] uppercase mb-4">
            {t("how_eyebrow")}
          </p>
          <h2 className="text-white font-extrabold text-[clamp(28px,5vw,48px)]
                         leading-tight tracking-[-1px]">
            {t("how_h2")}
          </h2>
        </FadeUp>

        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* Steps */}
          <div className="flex flex-col gap-2">
            {steps.map((s, i) => (
              <button key={i} onClick={() => handleStep(i)}
                className={`text-left rounded-xl p-5 border transition-all duration-200
                  ${active === i
                    ? "bg-white/[0.04] border-white/12"
                    : "bg-transparent border-transparent hover:border-white/6"}`}>
                <div className="flex items-start gap-4">
                  <span className={`font-mono text-[11px] font-bold flex-shrink-0 mt-0.5
                    ${active === i ? "text-white" : "text-white/15"}`}>
                    {s.num}
                  </span>
                  <div>
                    <div className={`font-semibold text-[15px] mb-1 transition-colors
                      ${active === i ? "text-white" : "text-white/35"}`}>
                      {s.t}
                    </div>
                    <div className="text-white/25 text-[13px] leading-relaxed">{s.d}</div>
                  </div>
                </div>
                {active === i && (
                  <motion.div
                    className="mt-3 h-px bg-white/40"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 4.2 }}
                    style={{ transformOrigin: "left" }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Panel */}
          <div className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-white/8 bg-[#0a0a0a] p-6">
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-[10px] text-white/25 tracking-[.15em]">
                  {panels[active].title}
                </span>
                <span className="text-[10px] text-white/50 border border-white/10
                                  px-2 py-0.5 rounded-full font-mono">
                  {panels[active].badge}
                </span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={active}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}>
                  {panels[active].content}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
