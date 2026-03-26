"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";

const panels = [
  {
    title: "SCAN OVERVIEW",
    badge: "กำลังสแกน / Scanning",
    content: (
      <div className="space-y-3">
        {[
          { label: "Instagram", w: 88 },
          { label: "TikTok",    w: 73 },
          { label: "X / Twitter", w: 95 },
          { label: "Reddit",    w: 61 },
          { label: "Telegram",  w: 44 },
          { label: "Dark Web",  w: 29 },
        ].map((b) => (
          <div key={b.label} className="flex items-center gap-3">
            <span className="text-white/50 text-[11px] w-20 flex-shrink-0">{b.label}</span>
            <div className="flex-1 h-1.5 rounded-full bg-white/8 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-green-400"
                initial={{ width: 0 }}
                animate={{ width: `${b.w}%` }}
                transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
              />
            </div>
            <span className="text-green-400 text-[11px] font-mono w-8 text-right">{b.w}%</span>
          </div>
        ))}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {[
            { l: "สแกนวันนี้ / Scanned", v: "2.8M",  c: "text-white" },
            { l: "ตรงกัน / Matches",    v: "2,841", c: "text-white" },
            { l: "ละเมิด / Violations", v: "17",    c: "text-red-400" },
            { l: "ลบแล้ว / Removed",    v: "14",    c: "text-green-400" },
          ].map((s) => (
            <div key={s.l} className="bg-white/4 rounded-lg p-2.5">
              <div className="text-white/35 text-[9px] mb-1 leading-tight">{s.l}</div>
              <div className={`font-mono font-bold text-[18px] ${s.c}`}>{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "FLAGGED CONTENT",
    badge: "3 รายการใหม่ / 3 New",
    content: (
      <div className="space-y-2">
        {[
          { dot: "#f87171", text: "Deepfake video — Telegram @leaks2026", time: "2m ago" },
          { dot: "#fbbf24", text: "Unauthorized photo — adult site",       time: "18m ago" },
          { dot: "#f87171", text: "AI image — Reddit r/deepfakes",         time: "1h ago" },
          { dot: "#4ade80", text: "Licensed use — brand campaign",         time: "3h ago" },
          { dot: "#4ade80", text: "Authorized repost — agency account",    time: "5h ago" },
        ].map((r) => (
          <div key={r.text} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: r.dot }} />
            <span className="text-white/70 text-[12px] flex-1 leading-tight">{r.text}</span>
            <span className="text-white/30 text-[10px] whitespace-nowrap">{r.time}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "CONTENT REVIEW",
    badge: "รอคุณตัดสิน / Awaiting approval",
    content: (
      <div>
        <div className="text-white/30 text-[10px] font-semibold tracking-widest mb-2">
          DETECTED — DEEPFAKE VIDEO
        </div>
        <div className="flex gap-1.5 mb-3">
          {[
            { label: "AI GENERATED", bg: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
            { label: "HIGH RISK",    bg: "bg-red-500/20 text-red-400 border-red-500/30" },
            { label: "TELEGRAM",     bg: "bg-white/8 text-white/50 border-white/10" },
          ].map((tag) => (
            <span key={tag.label}
              className={`text-[9px] font-bold tracking-wider px-2 py-0.5 rounded
                          border ${tag.bg}`}>
              {tag.label}
            </span>
          ))}
        </div>
        <div className="text-white/40 text-[11px] leading-relaxed mb-4">
          Channel: @leaks2026 · ~8,400 views<br />
          Shares: 312 · Accuracy: 98.7%<br />
          First detected: 2 minutes ago
        </div>
        <div className="flex gap-2">
          <button className="flex-1 bg-red-500/15 border border-red-500/30 text-red-400
                             text-[12px] font-bold py-2.5 rounded-lg hover:bg-red-500/25
                             transition-colors duration-150">
            ⚡ Remove
          </button>
          <button className="flex-1 bg-white/5 border border-white/10 text-white/50
                             text-[12px] font-bold py-2.5 rounded-lg hover:bg-white/10
                             transition-colors duration-150">
            ✓ Allow
          </button>
        </div>
      </div>
    ),
  },
  {
    title: "TAKEDOWN TRACKER",
    badge: "3 รายการดำเนินอยู่ / 3 Active",
    content: (
      <div className="space-y-2.5">
        {[
          { icon: "🎬", name: "Deepfake video — Telegram",  plat: "Sent 2h ago",  badge: "Sent",    bc: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
          { icon: "📸", name: "Stolen photo — adult site",  plat: "Sent 18h ago", badge: "✓ Done",  bc: "bg-green-500/15 text-green-400 border-green-500/30" },
          { icon: "🖼️", name: "AI image — Reddit",          plat: "Sent 1h ago",  badge: "Pending", bc: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30" },
          { icon: "🎤", name: "Voice clone — TikTok",       plat: "Sent 3d ago",  badge: "✓ Done",  bc: "bg-green-500/15 text-green-400 border-green-500/30" },
        ].map((r) => (
          <div key={r.name} className="flex items-center gap-3">
            <span className="text-[18px]">{r.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-white/70 text-[12px] font-medium truncate">{r.name}</div>
              <div className="text-white/30 text-[10px]">{r.plat}</div>
            </div>
            <span className={`text-[9px] font-bold tracking-wider px-2 py-0.5
                              rounded border whitespace-nowrap ${r.bc}`}>
              {r.badge}
            </span>
          </div>
        ))}
        <div className="mt-3 pt-3 border-t border-white/8 text-white/30 text-[11px]">
          ⚡ Average removal: <span className="text-white/60 font-medium">21 hours</span>
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
    timerRef.current = setInterval(() => {
      setActive((a) => (a + 1) % 4);
    }, 4200);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStep = (i: number) => {
    setActive(i);
    startTimer();
  };

  const steps = [
    { num: "01", t: t("how_s1_t"), d: t("how_s1_d") },
    { num: "02", t: t("how_s2_t"), d: t("how_s2_d") },
    { num: "03", t: t("how_s3_t"), d: t("how_s3_d") },
    { num: "04", t: t("how_s4_t"), d: t("how_s4_d") },
  ];

  return (
    <section id="how" className="py-24 px-[6%] bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">

        <FadeUp className="text-center mb-16">
          <div className="inline-block text-white/30 text-[11px] font-medium tracking-[.2em]
                          uppercase mb-4 px-3 py-1 rounded-full border border-white/8">
            {t("how_eyebrow")}
          </div>
          <h2 className="text-white font-extrabold text-[clamp(28px,5vw,44px)] leading-tight mb-4">
            {t("how_h2")}
          </h2>
          <p className="text-white/45 text-[15px] max-w-md mx-auto">{t("how_sub")}</p>
        </FadeUp>

        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* Steps */}
          <div className="flex flex-col gap-3">
            {steps.map((s, i) => (
              <button
                key={i}
                onClick={() => handleStep(i)}
                className={`text-left rounded-xl p-5 border transition-all duration-200
                  ${active === i
                    ? "bg-white/6 border-white/15 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset]"
                    : "bg-white/2 border-white/5 hover:bg-white/4 hover:border-white/10"}`}
              >
                <div className="flex items-start gap-4">
                  <span className={`font-mono text-[12px] font-bold flex-shrink-0 mt-0.5
                    ${active === i ? "text-green-400" : "text-white/20"}`}>
                    {s.num}
                  </span>
                  <div>
                    <div className={`font-semibold text-[15px] mb-1 transition-colors
                      ${active === i ? "text-white" : "text-white/50"}`}>
                      {s.t}
                    </div>
                    <div className="text-white/35 text-[13px] leading-relaxed">{s.d}</div>
                  </div>
                </div>
                {/* Progress bar */}
                {active === i && (
                  <motion.div
                    className="mt-3 h-px bg-gradient-to-r from-green-400 to-transparent"
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
            <div className="rounded-2xl border border-white/10 bg-[#0f0f0f] p-5
                            shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset]">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[11px] text-white/40 tracking-[.12em]">
                  {panels[active].title}
                </span>
                <span className="text-[10px] text-green-400 bg-green-400/10 border border-green-400/20
                                  px-2 py-0.5 rounded-full font-medium">
                  {panels[active].badge}
                </span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }}
                >
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
