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

        {/* Quote */}
        <FadeUp>
          <blockquote
            className="font-display italic font-light leading-tight text-black/80 mb-16"
            style={{ fontSize: "clamp(36px, 5vw, 60px)" }}
          >
            &ldquo;{t("stmt_quote")}&rdquo;
          </blockquote>
        </FadeUp>

        {/* Mono stat strip */}
        <FadeUp delay={0.08}>
          <div className="flex flex-wrap justify-center gap-10">
            {stats.map(s => (
              <span key={s.l} className="font-mono text-[10px] text-black/35 tracking-[.15em] uppercase">
                {s.n} {s.l}
              </span>
            ))}
          </div>
        </FadeUp>

      </div>
    </section>
  );
}
