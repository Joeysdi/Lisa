"use client";

import { FadeUp, StaggerParent, StaggerChild } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";

const press = ["Vogue", "Forbes", "Rolling Stone", "TechCrunch", "Hollywood Reporter", "Wired"];

export function Testimonials() {
  const { t } = useLocale();

  const cards = [
    { q: "proof_q1" as const, n: "proof_n1" as const, r: "proof_r1" as const, avatar: "S" },
    { q: "proof_q2" as const, n: "proof_n2" as const, r: "proof_r2" as const, avatar: "M" },
    { q: "proof_q3" as const, n: "proof_n3" as const, r: "proof_r3" as const, avatar: "J" },
  ];

  return (
    <section id="proof" className="py-28 px-6 md:px-12 bg-[#050505]">
      <div className="max-w-6xl mx-auto">

        <FadeUp className="mb-14">
          <p className="text-white/25 text-[11px] font-mono tracking-[.2em] uppercase mb-4">
            {t("proof_eyebrow")}
          </p>
          <h2 className="text-white font-extrabold text-[clamp(28px,5vw,48px)]
                         leading-tight tracking-[-1px]">
            {t("proof_h2")}
          </h2>
        </FadeUp>

        <StaggerParent className="grid sm:grid-cols-3 gap-5 mb-16">
          {cards.map((c) => (
            <StaggerChild key={c.n}>
              <div className="flex flex-col gap-5 p-6 rounded-2xl border border-white/6
                               bg-[#0a0a0a] hover:border-white/12 transition-[border-color] duration-200">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-white/30 text-[13px]">★</span>
                  ))}
                </div>
                <p className="text-white/50 text-[13px] leading-relaxed flex-1">
                  &ldquo;{t(c.q)}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  <div className="w-9 h-9 rounded-full border border-white/10 flex items-center
                                   justify-center text-white/60 font-bold text-[14px] flex-shrink-0">
                    {c.avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-[14px]">{t(c.n)}</div>
                    <div className="text-white/30 text-[11px]">{t(c.r)}</div>
                  </div>
                </div>
              </div>
            </StaggerChild>
          ))}
        </StaggerParent>

        {/* Press row */}
        <FadeUp delay={0.15}>
          <div className="border-t border-white/5 pt-10">
            <p className="text-white/15 text-[10px] font-mono tracking-[.25em] uppercase
                          text-center mb-7">As seen in</p>
            <div className="flex flex-wrap justify-center gap-8">
              {press.map((p) => (
                <span key={p}
                  className="text-white/15 hover:text-white/35 font-semibold text-[14px]
                             tracking-tight transition-colors duration-150 cursor-default">
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
