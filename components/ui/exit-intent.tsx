"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/lib/locale-context";
import { Button } from "@/components/ui/button";

type Status = "idle" | "loading" | "success" | "error";

export function ExitIntent() {
  const { t } = useLocale();
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    function show() {
      if (sessionStorage.getItem("exitIntentShown")) return;
      sessionStorage.setItem("exitIntentShown", "1");
      setVisible(true);
    }

    // Desktop: mouse moves toward browser chrome
    function onMouseLeave(e: MouseEvent) {
      if (e.clientY < 20) show();
    }

    // Mobile: back button press intent
    function onPopState() {
      show();
    }

    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setVisible(false);
    }
    if (visible) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visible]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role: "exit_intent" }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center px-6"
          onClick={(e) => { if (e.target === e.currentTarget) setVisible(false); }}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 12 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="relative bg-black border border-white/10 w-full max-w-md px-8 py-10 flex flex-col items-center text-center"
          >
            {/* Dismiss */}
            <button
              onClick={() => setVisible(false)}
              className="absolute top-4 right-5 text-white/30 hover:text-white/70 text-xl font-light transition-colors"
              aria-label="Close"
            >
              ×
            </button>

            {status === "success" ? (
              <p className="text-white/70 font-sans text-sm">{t("demo_success")}</p>
            ) : (
              <>
                <h2
                  className="font-display font-light text-white mb-3 leading-snug"
                  style={{ fontSize: "clamp(22px, 3vw, 30px)" }}
                >
                  {t("exit_h")}
                </h2>
                <p className="text-white/50 text-sm font-sans mb-8 leading-relaxed">
                  {t("exit_sub")}
                </p>

                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={t("exit_email_placeholder") as string}
                    className="w-full bg-transparent border border-white/15 px-4 py-3 text-sm text-white
                               placeholder:text-white/25 font-sans focus:outline-none focus:border-white/40
                               transition-colors"
                  />
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full justify-center"
                    style={{ paddingTop: "14px", paddingBottom: "14px", fontSize: "11px", letterSpacing: "0.08em" }}
                  >
                    {status === "loading" ? "…" : t("gs_submit")}
                  </Button>
                </form>

                {status === "error" && (
                  <p className="text-white/40 text-xs font-sans mt-3">Something went wrong. Please try again.</p>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
