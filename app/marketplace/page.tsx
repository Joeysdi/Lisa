"use client";

import { useState } from "react";
import { useLocale } from "@/lib/locale-context";
import { Button } from "@/components/ui/button";

const CREATORS = [
  { id: 1, name: "Namfon S.",    role: "Model",      cats: ["fashion", "lifestyle"], tier: "Premium",  verified: true },
  { id: 2, name: "Krit T.",      role: "Actor",       cats: ["fashion", "sports"],   tier: "Standard", verified: true },
  { id: 3, name: "Ploy W.",      role: "Influencer",  cats: ["beauty", "lifestyle"], tier: "Custom",   verified: true },
  { id: 4, name: "Ariya M.",     role: "Model",       cats: ["beauty", "fashion"],   tier: "Premium",  verified: true },
  { id: 5, name: "Thanakorn P.", role: "Actor",       cats: ["sports", "lifestyle"], tier: "Standard", verified: true },
  { id: 6, name: "Lena K.",      role: "Influencer",  cats: ["lifestyle", "beauty"], tier: "Premium",  verified: true },
];

const TIER_RANGE: Record<string, string> = {
  Standard: "from $99/campaign",
  Premium:  "from $300/campaign",
  Custom:   "negotiate per project",
};

const FILTERS = ["all", "fashion", "beauty", "lifestyle", "sports"] as const;
type Filter = (typeof FILTERS)[number];

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function MarketplacePage() {
  const { t } = useLocale();
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [reqSuccess, setReqSuccess] = useState(false);
  const [reqLoading, setReqLoading] = useState(false);
  const [reqError, setReqError] = useState("");

  const [brandName, setBrandName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [campaignBrief, setCampaignBrief] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [creatorType, setCreatorType] = useState("");

  const filtered =
    activeFilter === "all"
      ? CREATORS
      : CREATORS.filter((c) => c.cats.includes(activeFilter));

  const filterLabelKey = (f: Filter): Parameters<typeof t>[0] => {
    if (f === "all") return "mkt_filter_all";
    if (f === "fashion") return "mkt_filter_fashion";
    if (f === "beauty") return "mkt_filter_beauty";
    if (f === "lifestyle") return "mkt_filter_life";
    return "mkt_filter_sports";
  };

  async function handleCampaignSubmit(e: React.FormEvent) {
    e.preventDefault();
    setReqError("");
    setReqLoading(true);
    try {
      const res = await fetch("/api/campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brandName, contactEmail, campaignBrief, budgetRange, creatorType }),
      });
      if (!res.ok) throw new Error();
      setReqSuccess(true);
    } catch {
      setReqError("Something went wrong. Please try again.");
    } finally {
      setReqLoading(false);
    }
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero band */}
      <section className="bg-black py-14 sm:py-20 px-5 sm:px-8 text-center">
        <p className="font-mono text-[10px] tracking-[.2em] uppercase text-white/30 mb-6">
          {t("mkt_eyebrow")}
        </p>
        <h1 className="font-display font-light text-4xl sm:text-5xl text-white mb-4">
          {t("mkt_h1_1")}{" "}
          <span className="text-white/30">{t("mkt_h1_2")}</span>
        </h1>
        <p className="font-sans text-white/50 text-sm max-w-xl mx-auto mb-10 leading-relaxed">
          {t("mkt_sub")}
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Button variant="outline" size="sm" href="/apply">
            {t("mkt_cta_creator")}
          </Button>
          <Button variant="primary" size="sm" href="#request">
            {t("mkt_cta_brand")}
          </Button>
        </div>
      </section>

      {/* Filter bar */}
      <div className="bg-white border-b border-black/8 sticky top-[60px] z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 flex gap-1 overflow-x-auto">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`font-mono text-[10px] tracking-[.15em] uppercase px-4 py-4 whitespace-nowrap transition-colors
                ${activeFilter === f ? "text-black border-b-2 border-black" : "text-black/40 hover:text-black"}`}
            >
              {t(filterLabelKey(f))}
            </button>
          ))}
        </div>
      </div>

      {/* Creator grid */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((creator) => (
            <div
              key={creator.id}
              className="border border-black/8 p-6 hover:border-black/20 transition-colors"
            >
              {/* Avatar */}
              <div className="w-16 h-16 bg-black/5 font-mono text-xs flex items-center justify-center text-black/25 mb-4">
                {initials(creator.name)}
              </div>

              {/* Name + role */}
              <h3 className="font-display font-light text-black text-lg leading-tight">
                {creator.name}
              </h3>
              <p className="font-mono text-[9px] tracking-[.2em] uppercase text-black/35 mt-1 mb-3">
                {creator.role}
              </p>

              {/* Category tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {creator.cats.map((cat) => (
                  <span
                    key={cat}
                    className="text-[10px] font-sans text-black/45 border border-black/8 px-2 py-0.5"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* Verified + tier */}
              <div className="flex items-center gap-2 mb-4">
                {creator.verified && (
                  <span className="font-mono text-[9px] text-black/30">
                    ✓ {t("mkt_card_verified")}
                  </span>
                )}
              </div>
              <p className="font-mono text-[10px] text-black/45 mb-5">
                {creator.tier} tier · {TIER_RANGE[creator.tier]}
              </p>

              <Button variant="outline-dark" size="sm" href="#request">
                {t("mkt_card_cta")}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Request band */}
      <section id="request" className="bg-black py-14 sm:py-20 px-5 sm:px-8 mt-8">
        <div className="max-w-xl mx-auto">
          <p className="font-mono text-[10px] tracking-[.2em] uppercase text-white/30 mb-4">
            {t("mkt_req_eyebrow")}
          </p>
          <h2 className="font-display font-light text-3xl sm:text-4xl text-white mb-3">
            {t("mkt_req_h2")}
          </h2>
          <p className="font-sans text-white/50 text-sm mb-10 leading-relaxed">
            {t("mkt_req_sub")}
          </p>

          {reqSuccess ? (
            <p className="font-sans text-white/70 text-sm border border-white/15 px-6 py-4">
              {t("mkt_req_success")}
            </p>
          ) : (
            <form onSubmit={handleCampaignSubmit} className="flex flex-col gap-5">
              {/* Brand name */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] tracking-[.15em] uppercase text-white/40">
                  {t("mkt_req_brand")} *
                </label>
                <input
                  required
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="bg-transparent border border-white/15 text-white text-sm px-4 py-3 focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>

              {/* Contact email */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] tracking-[.15em] uppercase text-white/40">
                  {t("mkt_req_email")} *
                </label>
                <input
                  required
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="bg-transparent border border-white/15 text-white text-sm px-4 py-3 focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>

              {/* Campaign brief */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] tracking-[.15em] uppercase text-white/40">
                  {t("mkt_req_brief")}
                </label>
                <textarea
                  rows={4}
                  value={campaignBrief}
                  onChange={(e) => setCampaignBrief(e.target.value)}
                  className="bg-transparent border border-white/15 text-white text-sm px-4 py-3 focus:outline-none focus:border-white/40 transition-colors resize-none"
                />
              </div>

              {/* Budget range */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] tracking-[.15em] uppercase text-white/40">
                  {t("mkt_req_budget")}
                </label>
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="bg-black border border-white/15 text-white text-sm px-4 py-3 focus:outline-none focus:border-white/40 transition-colors"
                >
                  <option value=""></option>
                  <option value="under-1k">Under $1,000</option>
                  <option value="1k-5k">$1,000 – $5,000</option>
                  <option value="5k-20k">$5,000 – $20,000</option>
                  <option value="20k+">$20,000+</option>
                </select>
              </div>

              {/* Creator type */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] tracking-[.15em] uppercase text-white/40">
                  {t("mkt_req_type")}
                </label>
                <select
                  value={creatorType}
                  onChange={(e) => setCreatorType(e.target.value)}
                  className="bg-black border border-white/15 text-white text-sm px-4 py-3 focus:outline-none focus:border-white/40 transition-colors"
                >
                  <option value=""></option>
                  <option value="model">Model</option>
                  <option value="actor">Actor</option>
                  <option value="influencer">Influencer / Creator</option>
                  <option value="any">Any</option>
                </select>
              </div>

              {reqError && (
                <p className="font-sans text-sm text-red-400">{reqError}</p>
              )}

              <Button
                variant="primary"
                type="submit"
                disabled={reqLoading}
                className="w-full justify-center mt-2"
              >
                {reqLoading ? "…" : t("mkt_req_submit")}
              </Button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
