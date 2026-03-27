"use client";

import { useState } from "react";
import { FadeUp } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";
import { Button } from "@/components/ui/button";

type Status = "idle" | "loading" | "success" | "error";

export function GetStarted() {
  const { t } = useLocale();
  const [email, setEmail]   = useState("");
  const [role,  setRole]    = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="get-started" className="bg-black py-32 border-t border-white/6 flex flex-col items-center">
      <div className="w-full max-w-2xl px-8">

        <FadeUp className="w-full text-center">
          <span className="text-[10px] tracking-[.35em] uppercase font-sans text-white/30 mb-6 block text-center">
            {t("gs_eyebrow")}
          </span>
          <h2
            className="font-display font-light italic text-white mb-4 text-center"
            style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
          >
            {t("gs_h2")}
          </h2>
          <p className="text-white/45 text-sm font-sans mb-10 text-center">{t("gs_sub")}</p>
        </FadeUp>

        {status === "success" ? (
          <FadeUp className="w-full text-center">
            <p className="text-white/70 font-sans text-sm text-center">{t("demo_success")}</p>
          </FadeUp>
        ) : (
          <FadeUp delay={0.05} className="w-full flex flex-col items-center">
            <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t("demo_email")}
                className="w-full bg-transparent border border-white/15 px-4 py-3 text-sm text-white
                           placeholder:text-white/25 font-sans focus:outline-none focus:border-white/40
                           transition-colors"
              />
              <select
                required
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full bg-black border border-white/15 px-4 py-3 text-sm text-white
                           font-sans focus:outline-none focus:border-white/40 transition-colors
                           appearance-none"
              >
                <option value="" disabled>{t("demo_role")}</option>
                <option value="model">{t("demo_role1")}</option>
                <option value="actor">{t("demo_role2")}</option>
                <option value="agency">{t("demo_role3")}</option>
                <option value="brand">{t("demo_role4")}</option>
                <option value="other">{t("demo_role5")}</option>
              </select>
              <Button
                variant="primary"
                type="submit"
                disabled={status === "loading"}
                className="w-full justify-center"
                style={{ paddingTop: "18px", paddingBottom: "18px", fontSize: "11px", letterSpacing: "0.08em" }}
              >
                {status === "loading" ? "…" : t("gs_submit")}
              </Button>
            </form>
            {status === "error" && (
              <p className="text-white/40 text-xs font-sans mt-3 text-center">Something went wrong. Please try again.</p>
            )}
            <p className="text-white/25 text-xs font-sans mt-6 text-center">{t("gs_privacy")}</p>
          </FadeUp>
        )}

      </div>
    </section>
  );
}
