"use client";

import { FadeUp, StaggerParent, StaggerChild } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";

const press = ["Vogue", "Forbes", "Rolling Stone", "TechCrunch", "Hollywood Reporter", "Wired"];

export function Testimonials() {
  const { t } = useLocale();

  const cards = [
    {
      q: "proof_q1" as const,
      n: "proof_n1" as const,
      r: "proof_r1" as const,
      av: "S",
      platform: "INSTAGRAM",
    },
    {
      q: "proof_q2" as const,
      n: "proof_n2" as const,
      r: "proof_r2" as const,
      av: "M",
      platform: "ADULT SITES",
    },
    {
      q: "proof_q3" as const,
      n: "proof_n3" as const,
      r: "proof_r3" as const,
      av: "J",
      platform: "AGENCY",
    },
  ];

  return (
    <section id="proof" className="bg-[#050505] py-24 flex flex-col items-center">
      <div className="w-full max-w-6xl px-8">

        {/* Header */}
        <FadeUp className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-white/15 text-xs">04</span>
            <div className="w-8 h-px bg-white/10" />
            <span className="text-[10px] tracking-[.3em] uppercase text-white/25 font-sans">
              {t("proof_eyebrow")}
            </span>
          </div>
          <h2
            className="font-display font-light text-white"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            {t("proof_h2")}
          </h2>
        </FadeUp>

        {/* Testimonial cards */}
        <StaggerParent className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {cards.map(c => (
            <StaggerChild key={c.n}>
              <div className="border border-white/6 bg-black p-7 flex flex-col gap-5 h-full">
                {/* Platform badge */}
                <span className="self-start border border-white/10 text-white/30 font-mono
                                 text-[10px] tracking-[.15em] px-2.5 py-1">
                  {c.platform}
                </span>

                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-white/45 text-xs">★</span>
                  ))}
                </div>

                {/* Quote */}
                <p className="font-display italic text-white/65 text-base leading-relaxed flex-1">
                  &ldquo;{t(c.q)}&rdquo;
                </p>

                <div className="border-t border-white/5" />

                {/* Author */}
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
                  className="text-white/30 hover:text-white/55 text-xs tracking-widest font-sans
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
