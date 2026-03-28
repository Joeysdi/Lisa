"use client";

import { FadeUp } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";

const press = ["Vogue", "Forbes", "Rolling Stone", "TechCrunch", "Hollywood Reporter", "Wired"];

export function Testimonials() {
  const { t } = useLocale();

  const quotes = [
    {
      q: "proof_q1" as const,
      n: "proof_n1" as const,
      r: "proof_r1" as const,
      platform: "INSTAGRAM",
    },
    {
      q: "proof_q2" as const,
      n: "proof_n2" as const,
      r: "proof_r2" as const,
      platform: "ADULT SITES",
    },
    {
      q: "proof_q3" as const,
      n: "proof_n3" as const,
      r: "proof_r3" as const,
      platform: "AGENCY",
    },
  ];

  return (
    <section id="proof" className="bg-surface-dark py-16 sm:py-24 border-t border-white/6 flex flex-col items-center">
      <div className="w-full max-w-6xl px-5 sm:px-8">

        {/* Header */}
        <FadeUp className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="font-mono text-white/15 text-xs">03</span>
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

        {/* Pull-quote stack */}
        <div className="max-w-3xl divide-y divide-white/6">
          {quotes.map((c, i) => (
            <FadeUp key={c.n} delay={i * 0.07}>
              <div className="py-10">
                <p
                  className="font-display italic text-white/75 leading-snug mb-6"
                  style={{ fontSize: "clamp(20px, 2.5vw, 28px)" }}
                >
                  &ldquo;{t(c.q)}&rdquo;
                </p>
                <p className="font-mono text-[10px] text-white/30 tracking-[.12em]">
                  — {t(c.n)} · {t(c.r)} · {c.platform}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Press */}
        <FadeUp delay={0.1}>
          <div className="mt-14 pt-10 border-t border-white/6 text-center">
            <p className="text-[9px] tracking-[.3em] uppercase text-white/15 mb-6 font-sans">As seen in</p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
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
