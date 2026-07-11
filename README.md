# Hello Kazakhstan

Marketing site for **Hello Kazakhstan**, a local, owner-run tour operator in Almaty.
Single-page React + Vite site, mobile-first, no backend — the primary conversion is a
WhatsApp **Book now** link.

## Run it

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # typecheck + production build to /dist
npm run preview  # preview the production build
```

Requires Node 18+ (built on Node 22).

## What's inside

- **React + Vite + TypeScript**, CSS Modules + CSS custom-property design tokens. No UI kit; light bundle (~62 kB gzip JS).
- **Design system** lives in [`src/styles/tokens.css`](src/styles/tokens.css) — color, spacing, radii, elevation, type. Components reference tokens, never raw hex.
- **i18n** with a working language switcher: EN (full), RU, 中文, العربية. Arabic flips the whole layout to RTL via `dir="rtl"` + CSS logical properties.
- **Accessible**: semantic landmarks, skip link, keyboard focus-visible states, `aria` on toggles/menus, alt text on imagery, reduced-motion support (the marquee freezes).
- **Placeholders, not real photos**: the `PhotoPlaceholder` component renders warm gradient stand-ins. Search the source for `TODO` to find every spot to drop in real photography and the real WhatsApp number.

## File structure

```
src/
  components/   Button, Pill, Badge, Rating, PhotoPlaceholder, SectionHeading,
                TourCard, TrustStrip, Marquee, Hero, Nav, Footer,
                LanguageSwitcher, icons
  sections/     HeroSection, TrustSection, ToursSection, MarqueeBand,
                WhyChooseSection, AboutSection, ReviewsSection, CTASection
  data/         tours.ts (catalogue), copy.ts (WhatsApp link, socials, nav)
  styles/       tokens.css (design tokens), globals.css (reset + utilities)
  i18n/         types.ts, en.ts, ru.ts, zh.ts, ar.ts, index.tsx (provider/hooks)
  App.tsx       assembles the page
  main.tsx      entry — wraps App in <I18nProvider>
```
