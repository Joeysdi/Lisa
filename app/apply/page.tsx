"use client";

import { useState } from "react";
import { useLocale } from "@/lib/locale-context";
import { Button } from "@/components/ui/button";

const CATEGORIES = ["fashion", "beauty", "lifestyle", "sports", "other"] as const;

export default function ApplyPage() {
  const { t } = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [socialHandle, setSocialHandle] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [pricingTier, setPricingTier] = useState("");

  function toggleCategory(cat: string) {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (categories.length === 0) {
      setError("Select at least one content category.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, socialHandle, role, bio, categories, pricingTier }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-black min-h-screen flex flex-col items-center justify-center px-8 text-center">
        <p className="font-mono text-[10px] tracking-[.2em] uppercase text-white/30 mb-6">
          {t("apply_eyebrow")}
        </p>
        <h1 className="font-display font-light text-4xl text-white mb-4">
          {t("apply_success_h")}
        </h1>
        <p className="font-sans text-white/50 text-sm max-w-sm mb-10">
          {t("apply_success_sub")}
        </p>
        <a
          href="/"
          className="font-mono text-[10px] tracking-[.15em] uppercase text-white/40 hover:text-white transition-colors"
        >
          {t("apply_back")} →
        </a>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-xl mx-auto px-8 py-24">
        {/* Header */}
        <p className="font-mono text-[10px] tracking-[.2em] uppercase text-white/30 mb-6">
          {t("apply_eyebrow")}
        </p>
        <h1 className="font-display font-light text-4xl sm:text-5xl text-white mb-2">
          {t("apply_h1_1")}{" "}
          <span className="text-white/30">{t("apply_h1_2")}</span>
        </h1>
        <p className="font-sans text-white/50 text-sm mt-4 mb-12 leading-relaxed">
          {t("apply_sub")}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-7">
          {/* Full name */}
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] tracking-[.15em] uppercase text-white/40">
              {t("apply_name")} *
            </label>
            <input
              required
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-transparent border border-white/15 text-white text-sm px-4 py-3 focus:outline-none focus:border-white/40 transition-colors"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] tracking-[.15em] uppercase text-white/40">
              {t("apply_email")} *
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border border-white/15 text-white text-sm px-4 py-3 focus:outline-none focus:border-white/40 transition-colors"
            />
          </div>

          {/* Social handle */}
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] tracking-[.15em] uppercase text-white/40">
              {t("apply_social")} *
            </label>
            <input
              required
              type="text"
              value={socialHandle}
              onChange={(e) => setSocialHandle(e.target.value)}
              className="bg-transparent border border-white/15 text-white text-sm px-4 py-3 focus:outline-none focus:border-white/40 transition-colors"
            />
          </div>

          {/* Role */}
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] tracking-[.15em] uppercase text-white/40">
              {t("apply_role")} *
            </label>
            <select
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-black border border-white/15 text-white text-sm px-4 py-3 focus:outline-none focus:border-white/40 transition-colors"
            >
              <option value="" disabled />
              <option value="model">{t("apply_role_model")}</option>
              <option value="actor">{t("apply_role_actor")}</option>
              <option value="influencer">{t("apply_role_infl")}</option>
              <option value="other">{t("apply_role_other")}</option>
            </select>
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] tracking-[.15em] uppercase text-white/40">
              {t("apply_bio")} *
            </label>
            <p className="text-white/25 text-xs font-sans">{t("apply_bio_hint")}</p>
            <textarea
              required
              maxLength={300}
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="bg-transparent border border-white/15 text-white text-sm px-4 py-3 focus:outline-none focus:border-white/40 transition-colors resize-none"
            />
            <p className="text-white/20 text-[10px] font-mono text-right">{bio.length}/300</p>
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-3">
            <label className="font-mono text-[10px] tracking-[.15em] uppercase text-white/40">
              {t("apply_cats")} *
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const key = `apply_cat_${cat}` as const;
                const active = categories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    className={`font-mono text-[10px] tracking-[.12em] uppercase px-3 py-1.5 border transition-colors
                      ${active
                        ? "border-white text-white bg-white/10"
                        : "border-white/15 text-white/35 hover:border-white/35 hover:text-white/60"
                      }`}
                  >
                    {t(key)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pricing tier */}
          <div className="flex flex-col gap-3">
            <label className="font-mono text-[10px] tracking-[.15em] uppercase text-white/40">
              {t("apply_pricing")} *
            </label>
            {(["standard", "premium", "custom"] as const).map((tier) => {
              const labelKey = `apply_tier_${tier === "standard" ? "std" : tier === "premium" ? "prem" : "custom"}` as const;
              return (
                <label key={tier} className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="pricingTier"
                    value={tier}
                    required
                    checked={pricingTier === tier}
                    onChange={() => setPricingTier(tier)}
                    className="mt-0.5 accent-white"
                  />
                  <span className="font-sans text-sm text-white/60 group-hover:text-white/80 transition-colors">
                    {t(labelKey)}
                  </span>
                </label>
              );
            })}
          </div>

          {error && (
            <p className="font-sans text-sm text-red-400">{error}</p>
          )}

          <Button
            variant="primary"
            type="submit"
            disabled={loading}
            className="w-full justify-center mt-2"
          >
            {loading ? "…" : t("apply_submit")}
          </Button>
        </form>
      </div>
    </div>
  );
}
