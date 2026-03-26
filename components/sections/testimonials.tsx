"use client";

import { FadeUp, StaggerParent, StaggerChild } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";

const press = ["Vogue", "Forbes", "Rolling Stone", "TechCrunch", "Hollywood Reporter", "Wired"];

export function Testimonials() {
  const { t } = useLocale();

  const cards = [
    { q: "proof_q1" as const, n: "proof_n1" as const, r: "proof_r1" as const, avatar: "ส" },
    { q: "proof_q2" as const, n: "proof_n2" as const, r: "proof_r2" as const, avatar: "ม" },
    { q: "proof_q3" as const, n: "proof_n3" as const, r: "proof_r3" as const, avatar: "จ" },
  ];

  return (
    <section id="proof" className="py-24 px-[6%] bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">

        <FadeUp className="text-center mb-14">
          <div className="inline-block text-white/30 text-[11px] font-medium tracking-[.2em]
                          uppercase mb-4 px-3 py-1 rounded-full border border-white/8">
            {t("proof_eyebrow")}
          </div>
          <h2 className="text-white font-extrabold text-[clamp(28px,5vw,44px)] leading-tight">
            {t("proof_h2")}
          </h2>
        </FadeUp>

        <StaggerParent className="grid sm:grid-cols-3 gap-5 mb-14">
          {cards.map((c) => (
            <StaggerChild key={c.n}>
              <div className="bg-[#0f0f0f] border border-white/8 rounded-2xl p-6 flex flex-col gap-4
                               hover:border-white/14 transition-[border-color] duration-200">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-[14px]">★</span>
                  ))}
                </div>
                <p className="text-white/60 text-[13px] leading-relaxed flex-1">
                  &ldquo;{t(c.q)}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-white/6">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center
                                   text-white font-bold text-[15px] flex-shrink-0">
                    {c.avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-[14px]">{t(c.n)}</div>
                    <div className="text-white/35 text-[11px]">{t(c.r)}</div>
                  </div>
                </div>
              </div>
            </StaggerChild>
          ))}
        </StaggerParent>

        {/* Press row */}
        <FadeUp delay={0.2}>
          <div className="border-t border-white/6 pt-10">
            <p className="text-white/20 text-[10px] font-medium tracking-[.2em] uppercase
                          text-center mb-6">
              As seen in
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {press.map((p) => (
                <span key={p}
                  className="text-white/20 hover:text-white/40 font-semibold text-[14px]
                             transition-colors duration-150 cursor-default">
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
