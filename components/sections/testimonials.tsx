"use client";

import { FadeUp, StaggerParent, StaggerChild } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";

const press = ["Vogue","Forbes","Rolling Stone","TechCrunch","Hollywood Reporter","Wired"];

export function Testimonials() {
  const { t } = useLocale();

  const cards = [
    { q:"proof_q1" as const, n:"proof_n1" as const, r:"proof_r1" as const, av:"S" },
    { q:"proof_q2" as const, n:"proof_n2" as const, r:"proof_r2" as const, av:"M" },
    { q:"proof_q3" as const, n:"proof_n3" as const, r:"proof_r3" as const, av:"J" },
  ];

  return (
    <section id="proof" className="bg-[#050505] py-28">
      <div className="w-full max-w-6xl mx-auto px-6 sm:px-8">

        <FadeUp className="mb-14">
          <p className="text-white/25 text-xs font-mono tracking-[.2em] uppercase mb-3">
            {t("proof_eyebrow")}
          </p>
          <h2 className="text-white font-extrabold text-[clamp(30px,5vw,52px)]
                         leading-tight tracking-tight">
            {t("proof_h2")}
          </h2>
        </FadeUp>

        <StaggerParent className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
          {cards.map((c) => (
            <StaggerChild key={c.n}>
              <div className="flex flex-col gap-5 p-6 rounded-2xl border border-white/6
                               bg-black hover:border-white/12 transition-[border-color] duration-200">
                <div className="flex gap-0.5">
                  {Array.from({length:5}).map((_,i) => (
                    <span key={i} className="text-white/25 text-sm">★</span>
                  ))}
                </div>
                <p className="text-white/50 text-sm leading-relaxed flex-1">
                  &ldquo;{t(c.q)}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center
                                   justify-center text-white/50 font-bold text-base shrink-0">
                    {c.av}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{t(c.n)}</div>
                    <div className="text-white/30 text-xs mt-0.5">{t(c.r)}</div>
                  </div>
                </div>
              </div>
            </StaggerChild>
          ))}
        </StaggerParent>

        <FadeUp delay={0.1}>
          <div className="border-t border-white/5 pt-10">
            <p className="text-white/15 text-[10px] font-mono tracking-[.25em] uppercase
                          text-center mb-7">As seen in</p>
            <div className="flex flex-wrap justify-center gap-8">
              {press.map((p) => (
                <span key={p}
                  className="text-white/15 hover:text-white/35 font-semibold text-sm
                             transition-colors duration-150 cursor-default tracking-tight">
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
