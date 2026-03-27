"use client";

import { useCallback, useRef, useState } from "react";
import { useLocale } from "@/lib/locale-context";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/ui/motion";
import type { TranslationKey } from "@/lib/i18n";

// ── Types ─────────────────────────────────────────────────────────────────────

type State = "idle" | "loading" | "analyzing" | "results" | "no-face" | "error";

interface FaceResult {
  faceCount: number;
  confidence: number;    // 0–100
  age: number;
  expressionKey: TranslationKey;
  expressionScore: number; // 0–100
}

// Maps face-api expression keys → i18n TranslationKey
const EXPR_MAP: Record<string, TranslationKey> = {
  happy:     "face_expr_happy",
  neutral:   "face_expr_neutral",
  sad:       "face_expr_sad",
  angry:     "face_expr_angry",
  fearful:   "face_expr_fearful",
  disgusted: "face_expr_disgusted",
  surprised: "face_expr_surprised",
};

// ── Component ─────────────────────────────────────────────────────────────────

export function FaceDemo() {
  const { t } = useLocale();
  const [state, setState] = useState<State>("idle");
  const [result, setResult] = useState<FaceResult | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loadMsg, setLoadMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeUrlRef = useRef<string | null>(null);

  // ── Reset ──────────────────────────────────────────────────────────────────

  const reset = useCallback(() => {
    if (activeUrlRef.current) {
      URL.revokeObjectURL(activeUrlRef.current);
      activeUrlRef.current = null;
    }
    setPreviewUrl(null);
    setResult(null);
    setState("idle");
    setLoadMsg("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  // ── Process ────────────────────────────────────────────────────────────────

  const processFile = useCallback(
    async (file: File) => {
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        setState("error");
        return;
      }
      if (file.size > 4 * 1024 * 1024) {
        setState("error");
        return;
      }

      const url = URL.createObjectURL(file);
      activeUrlRef.current = url;
      setPreviewUrl(url);
      setState("loading");
      setLoadMsg(t("face_loading") as string);

      try {
        const faceapi = await import("@vladmandic/face-api");

        // Load all three models in parallel (browser-cached after first visit)
        await Promise.all([
          faceapi.nets.tinyFaceDetector.isLoaded
            ? Promise.resolve()
            : faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
          faceapi.nets.ageGenderNet.isLoaded
            ? Promise.resolve()
            : faceapi.nets.ageGenderNet.loadFromUri("/models"),
          faceapi.nets.faceExpressionNet.isLoaded
            ? Promise.resolve()
            : faceapi.nets.faceExpressionNet.loadFromUri("/models"),
        ]);

        setLoadMsg(t("face_analyzing") as string);
        setState("analyzing");

        const img = await new Promise<HTMLImageElement>((resolve, reject) => {
          const el = new Image();
          el.onload = () => resolve(el);
          el.onerror = reject;
          el.src = url;
        });

        const detections = await faceapi
          .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions({ scoreThreshold: 0.4 }))
          .withAgeAndGender()
          .withFaceExpressions();

        if (!detections || detections.length === 0) {
          setState("no-face");
          return;
        }

        // Pick the highest-confidence face
        const best = detections.reduce((a, b) =>
          a.detection.score > b.detection.score ? a : b
        );

        // Dominant expression
        const expEntries = Object.entries(best.expressions) as [string, number][];
        const [topKey, topScore] = expEntries.reduce((a, b) => (a[1] > b[1] ? a : b));

        setResult({
          faceCount: detections.length,
          confidence: Math.round(best.detection.score * 100),
          age: Math.round(best.age),
          expressionKey: EXPR_MAP[topKey] ?? "face_expr_neutral",
          expressionScore: Math.round(topScore * 100),
        });
        setState("results");
      } catch (err) {
        console.error("[FaceDemo]", err);
        setState("error");
      }
    },
    [t]
  );

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (files?.[0]) processFile(files[0]);
    },
    [processFile]
  );

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <section className="bg-black border-t border-white/6 py-24 flex justify-center">
      <div className="max-w-2xl w-full px-8">

        {/* Header */}
        <FadeUp>
          <div className="text-center mb-12">
            <span className="text-[10px] tracking-[.35em] uppercase font-sans text-white/35 mb-6 block">
              {t("face_eyebrow")}
            </span>
            <h2
              className="font-display font-light text-white mb-4 tracking-[-0.02em]"
              style={{ fontSize: "clamp(30px, 4vw, 52px)" }}
            >
              {t("face_h2")}
            </h2>
            <p className="text-white/50 text-sm font-sans leading-relaxed max-w-md mx-auto">
              {t("face_sub")}
            </p>
          </div>
        </FadeUp>

        {/* State: idle — upload zone */}
        {state === "idle" && (
          <FadeUp delay={0.1}>
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleFiles(e.dataTransfer.files);
              }}
              onClick={() => fileInputRef.current?.click()}
              className={[
                "border-2 border-dashed cursor-pointer transition-all duration-200",
                "flex flex-col items-center justify-center gap-4 py-20 px-8",
                isDragging
                  ? "border-white/40 bg-white/5"
                  : "border-white/15 hover:border-white/30 hover:bg-white/[0.025]",
              ].join(" ")}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
              <CameraIcon />
              <div className="text-center">
                <p className="text-white/60 text-sm font-sans">{t("face_drop")}</p>
                <p className="text-white/25 text-[11px] font-mono mt-2 tracking-wider">{t("face_hint")}</p>
              </div>
            </div>
          </FadeUp>
        )}

        {/* State: loading / analyzing */}
        {(state === "loading" || state === "analyzing") && (
          <div className="flex flex-col items-center justify-center gap-6 py-20">
            <div className="w-9 h-9 border border-white/15 border-t-white/50 rounded-full animate-spin" />
            <p className="text-white/40 text-sm font-sans tracking-wide">{loadMsg}</p>
          </div>
        )}

        {/* State: results */}
        {state === "results" && result && (
          <FadeUp>
            <div className="flex flex-col gap-8">

              {/* Thumbnail + headline */}
              <div className="flex items-center gap-5">
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt=""
                    className="w-16 h-16 object-cover flex-shrink-0 border border-white/10"
                  />
                )}
                <div>
                  <p className="font-mono text-[9px] text-white/25 tracking-[.3em] mb-1.5">
                    {t("face_complete")}
                  </p>
                  <p
                    className="font-display font-light text-white leading-tight"
                    style={{ fontSize: "clamp(20px, 2.5vw, 28px)" }}
                  >
                    {(t("face_detected") as string).replace("{n}", String(result.faceCount))}
                    {result.faceCount > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {/* Data rows */}
              <div className="border border-white/10 divide-y divide-white/6">
                <DataRow
                  label={t("face_confidence") as string}
                  value={`${result.confidence}%`}
                />
                <DataRow
                  label={t("face_age") as string}
                  value={`${Math.max(1, result.age - 3)}–${result.age + 3} yrs`}
                />
                <DataRow
                  label={t("face_expression") as string}
                  value={`${t(result.expressionKey)} · ${result.expressionScore}%`}
                />
                <DataRow
                  label={t("face_signature") as string}
                  value={t("face_sig_val") as string}
                />
              </div>

              {/* Threat callout */}
              <div className="border-l-2 border-white/12 pl-5 py-0.5">
                <p className="text-white/50 text-sm font-sans leading-relaxed">
                  {t("face_threat")}
                </p>
              </div>

              {/* CTA */}
              <div className="flex flex-col items-center gap-4 text-center pt-2">
                <p className="text-white/35 text-xs font-sans max-w-sm leading-relaxed">
                  {t("face_cta_sub")}
                </p>
                <Button variant="primary" href="#get-started" size="sm">
                  Start free →
                </Button>
                <button
                  onClick={reset}
                  className="text-white/25 text-[11px] font-sans hover:text-white/50 transition-colors tracking-wide"
                >
                  {t("face_try_again")}
                </button>
              </div>
            </div>
          </FadeUp>
        )}

        {/* State: no-face */}
        {state === "no-face" && (
          <div className="flex flex-col items-center justify-center gap-6 py-16 text-center">
            <SadFaceIcon />
            <p className="text-white/50 text-sm font-sans max-w-xs">{t("face_noface")}</p>
            <RetryButton onClick={reset} label={t("face_retry") as string} />
          </div>
        )}

        {/* State: error */}
        {state === "error" && (
          <div className="flex flex-col items-center justify-center gap-6 py-16 text-center">
            <p className="text-white/50 text-sm font-sans">{t("face_err_file")}</p>
            <RetryButton onClick={reset} label={t("face_retry") as string} />
          </div>
        )}

      </div>
    </section>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5">
      <span className="font-mono text-[10px] text-white/30 tracking-wider uppercase">{label}</span>
      <span className="font-mono text-[11px] text-white/75">{value}</span>
    </div>
  );
}

function RetryButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="text-white/30 text-[11px] font-sans hover:text-white/60 transition-colors border border-white/15 hover:border-white/30 px-6 py-2"
    >
      {label}
    </button>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function CameraIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white/25"
      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
    </svg>
  );
}

function SadFaceIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white/25"
      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
    </svg>
  );
}
