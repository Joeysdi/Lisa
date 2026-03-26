"use client";

import { FadeUp } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";

const stats = [
  { n: "50,000+", l: "Models Protected" },
  { n: "2.8M",    l: "Daily Scans" },
  { n: "< 24h",   l: "Avg. Removal" },
  { n: "99.2%",   l: "Success Rate" },
];

export function Statement() {
  const { t } = useLocale();

  return (
    <section className="bg-white py-24 md:py-32 flex flex-col items-center">
      <div className="w-full max-w-4xl px-8 text-center">

        {/* Top rule */}
        <FadeUp>
          <div className="w-16 h-px bg-black/15 mx-auto mb-12" />
        </FadeUp>

        {/* Quote */}
        <FadeUp delay={0.05}>
          <blockquote
            className="font-display italic font-light leading-tight text-black/80 mb-12"
            style={{ fontSize: "clamp(26px, 4vw, 48px)" }}
          >
            &ldquo;{t("stmt_quote")}&rdquo;
          </blockquote>
        </FadeUp>

        {/* Bottom rule */}
        <FadeUp delay={0.1}>
          <div className="w-16 h-px bg-black/15 mx-auto mb-16" />
        </FadeUp>

        {/* Stats */}
        <FadeUp delay={0.15}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-2xl mx-auto">
            {stats.map(s => (
              <div key={s.l} className="text-center">
                <div
                  className="font-display font-light text-black"
                  style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
                >
                  {s.n}
                </div>
                <div className="text-xs tracking-[.15em] uppercase text-black/50 font-sans mt-2">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

      </div>
    </section>
  );
}
