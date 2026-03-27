# Lisa Modeling Protection — Project Context

## What this is
Lisa Modeling Protection is an AI-powered SaaS platform that protects models, creators, and public figures from deepfakes, unauthorized likeness use, and voice cloning. It detects violations across the web (including Dark Web/Telegram), fires automated DMCA takedowns, and provides a dashboard for monitoring.

**Live site:** https://lisa-modeling-protection.vercel.app/
**GitHub:** https://github.com/Joeysdi/Lisa
**Vercel project:** joeysdis-projects/lisa-modeling-protection

## Deployment
Push to GitHub → Vercel auto-deploys. No manual deploy steps needed.

## Tech stack
- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Fonts:** DM Sans (sans-serif body), Lora (display/headings)

## Project structure
```
app/
  page.tsx          — main landing page, composes all sections
  layout.tsx        — root layout, fonts, metadata, LocaleProvider
  globals.css
  api/demo/         — demo form submission API route

components/
  sections/         — one file per page section
    hero.tsx
    statement.tsx
    how-it-works.tsx
    features.tsx
    testimonials.tsx
    pricing.tsx
    faq.tsx
    demo-form.tsx
    cta-bottom.tsx
  layout/
    nav.tsx
    footer.tsx
  ui/
    motion.tsx       — shared Framer Motion primitives (FadeUp, StaggerParent, StaggerChild)
    progress-bar.tsx
    cookie-banner.tsx

lib/
  i18n.ts           — ALL copy/text lives here (Thai + English translations)
  locale-context.tsx — React context + useLocale() hook
```

## Internationalization (i18n)
- Default locale: **Thai (th)**
- Secondary locale: **English (en)**
- All user-facing strings are in `lib/i18n.ts` under `translations.th` and `translations.en`
- Components consume copy via `const { t } = useLocale()` — never hardcode text in components
- When adding new copy, add both `th` and `en` keys to `lib/i18n.ts`

## Business model / pricing
| Tier | Price | Target |
|------|-------|--------|
| Starter (Free) | $0 forever | Everyone — basic monitoring |
| Pro | $49/mo or $39/mo billed annually | Individual models & creators |
| Enterprise | Custom | Agencies managing multiple talent |

Key Pro features: real-time scanning, automated DMCA, deepfake/AI detection, voice cloning protection, Dark Web monitoring.

## Design system
- **Palette:** Black (`#000`) and white (`#fff`) only — stone-50 for light card backgrounds
- **Typography:** `font-display` = Lora (headings, large text), `font-sans` = DM Sans (body, UI)
- **Buttons:** Flat bordered rectangles, uppercase small-caps tracking, no border-radius
- **Motion:** Entry animations via `FadeUp`, `StaggerParent`/`StaggerChild` from `components/ui/motion.tsx`
- **Section structure:** Section marker (monospaced number + eyebrow label) → h2 → subtext → content

## Key product features (for copy accuracy)
1. Face recognition through occlusion (cropped, filtered, poorly lit images)
2. AI & Deepfake detection (Midjourney, Stable Diffusion, Sora, DALL·E, Kling)
3. Voice cloning protection
4. Automated DMCA enforcement
5. Likeness licensing control
6. Unified dashboard
7. Dark Web + private channel monitoring
8. Real-time alerts (email, SMS, push)
9. Agency portal (bulk management)
