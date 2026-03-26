"use client";

import { FadeUp, StaggerParent, StaggerChild } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";

const press = ["Vogue", "Forbes", "Rolling Stone", "TechCrunch", "Hollywood Reporter", "Wired"];

const topStats = [
  { n: "50,000+", l: "Models Protected" },
  { n: "2.8M",    l: "Daily Scans" },
  { n: "< 24h",   l: "Average Removal" },
];

export function Testimonials() {
  const { t } = useLocale();

  const cards = [
    { q:"proof_q1" as const, n:"proof_n1" as const, r:"proof_r1" as const, av:"S" },
    { q:"proof_q2" as const, n:"proof_n2" as const, r:"proof_r2" as const, av:"M" },
    { q:"proof_q3" as const, n:"proof_n3" as const, r:"proof_r3" as const, av:"J" },
  ];

  return (
    <section id="proof" className="bg-[#050505] py-24 flex flex-col items-center">
      <div className="w-full max-w-6xl px-8">

        {/* Stats row */}
        <FadeUp>
          <div className="grid grid-cols-3 gap-8 mb-16 pb-16 border-b border-white/6">
            {topStats.map(s => (
              <div key={s.l} className="text-center">
                <div
                  className="font-display font-light text-white"
                  style={{ fontSize: "clamp(36px, 6vw, 72px)" }}
                >
                  {s.n}
                </div>
                <div className="text-[10px] tracking-[.25em] uppercase text-white/25 font-sans mt-2">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Testimonial cards */}
        <StaggerParent className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {cards.map(c => (
            <StaggerChild key={c.n}>
              <div className="border border-white/6 bg-black p-7 flex flex-col gap-5 h-full">
                <div className="flex gap-0.5">
                  {Array.from({length:5}).map((_,i) => (
                    <span key={i} className="text-white/45 text-xs">★</span>
                  ))}
                </div>
                <p className="font-display italic text-white/65 text-base leading-relaxed flex-1">
                  &ldquo;{t(c.q)}&rdquo;
                </p>
                <div className="border-t border-white/5" />
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border border-white/12 flex items-center
                                   justify-center text-white/40 text-xs font-bold shrink-0">
                    {c.av}
                  </div>
                  <div>
                    <div className="text-white font-sans font-medium text-sm">{t(c.n)}</div>
                    <div className="text-white/40 text-xs font-mono mt-0.5">{t(c.r)}</div>
                  </div>
                </div>
              </div>
            </StaggerChild>
          ))}
        </StaggerParent>

        {/* Press */}
        <FadeUp delay={0.1}>
          <div className="mt-14 pt-10 border-t border-white/5 text-center">
            <p className="text-[9px] tracking-[.3em] uppercase text-white/15 mb-6 font-sans">As seen in</p>
            <div className="flex flex-wrap justify-center gap-8">
              {press.map(p => (
                <span key={p}
                  className="text-white/12 hover:text-white/30 text-xs tracking-widest font-sans
                             transition-colors cursor-default">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}
