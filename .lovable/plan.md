# VideoMorph — Playful Frontend-Only Video Converter

A fully simulated, frontend-only site with three routes, a bright lime/white design system, GSAP-powered motion, and zero backend. Everything (upload, conversion, download) is faked with delightful UI.

## Scope

- Frontend only. No Lovable Cloud, no server functions, no real file handling.
- Fully responsive, light-mode only.
- Ready for future backend integration (converter logic isolated behind a mock service module with a clean interface).

## Design System (`src/styles.css`)

Rewrite tokens for a bright playful theme (all oklch):

- `--background` white (#FFFFFF)
- `--card` #FAFAFA, `--secondary` #F4F4F4
- `--foreground` #111111
- New tokens: `--lime` (#B9FF4D), `--lime-bright` (#72FF57), `--sunny` (yellow accent), `--ink` (#111)
- `--gradient-lime`, `--shadow-float` (soft, big)
- Huge radii: bump `--radius` to `1.25rem`; utilities rely on `rounded-3xl` / `rounded-[2rem]`
- Register lime/lime-bright/sunny/ink in `@theme inline` so `bg-lime`, `text-ink`, etc. work
- Global cursor-follower glow via a fixed div + GSAP quickTo
- Dark mode block removed / unused

## Routes

```
src/routes/
  __root.tsx          navbar + cursor glow + scroll progress + <Outlet/>
  index.tsx           Home (hero + converter + features + formats + stats + FAQ + footer)
  tools.tsx           "More Tools Are Cooking" page
  about.tsx           About + timeline
```

Each route gets its own `head()` with unique title/description/og.

## Components (`src/components/`)

Presentation, all client-side:

- `FloatingNavbar.tsx` — pill nav, TanStack `<Link>`, GSAP bounce-in
- `Hero.tsx` — huge heading, typewriter rotating subtitles, floating icon field
- `FloatingIcons.tsx` — cameras/film/play/blobs looping via GSAP
- `UploadDropzone.tsx` — massive rounded area, hover stretch, drag state (wiggle border, lime glow), rotating funny prompt
- `ConverterPanel.tsx` — dropdowns (From/To/Resolution/Quality/Codec) using shadcn `Select`, big convert button
- `FakeProgress.tsx` — animated progress bar 0→100 over ~5s, rotating funny status lines, final "Download Totally Real File" button (no-op toast)
- `FeatureCards.tsx` — 4 cards with hover jump + tilt
- `FormatBubbles.tsx` — bubble chips with inflate hover
- `StatsCounters.tsx` — GSAP-animated counters triggered on scroll
- `FaqAccordion.tsx` — shadcn accordion with smooth GSAP height easing
- `Footer.tsx`
- `Stickers.tsx` — occasional floating emoji stickers spawner
- `MagneticButton.tsx` — reusable magnetic hover wrapper
- `ScrollProgress.tsx` — top progress bar
- `CursorGlow.tsx` — mouse follower

Mock service:

- `src/lib/mock-converter.ts` — exports `simulateConversion(opts, onProgress): Promise<{ url: string; filename: string }>` returning fake data. Real backend later just replaces this file.

## Animations (GSAP)

Install `gsap` via bun. Use `@gsap/react` `useGSAP` hook. Effects:

- Navbar bounce-in, stagger nav links
- Hero heading split reveal, typewriter subtitle rotation
- Endless floating blobs/icons (yoyo + random durations)
- Magnetic buttons (pointer offset via quickTo)
- Card tilt on mousemove
- Stagger entrances on scroll (ScrollTrigger)
- Counter tween on inView
- FAQ open/close height animation
- Progress bar + rotating loader text
- Sticker spawner over interval
- Cursor glow follower
- Scroll progress bar

All heavy DOM/GSAP work runs inside `useGSAP` with cleanup; safe with SSR (guard `document` access, effects run client-side only).

## Content

- Copy exactly matches the spec (hero, subtitles, loading lines, FAQ answers, stats, tools page, about page).
- Lucide icons for feature cards and small UI bits; emojis for personality where called out.

## Structure

```
src/
  routes/{__root,index,tools,about}.tsx
  components/{ FloatingNavbar, Hero, FloatingIcons, UploadDropzone,
               ConverterPanel, FakeProgress, FeatureCards, FormatBubbles,
               StatsCounters, FaqAccordion, Footer, Stickers,
               MagneticButton, ScrollProgress, CursorGlow }.tsx
  lib/mock-converter.ts
  styles.css   (rewritten tokens)
```

## Out of scope

- No real file parsing, no ffmpeg.wasm, no downloads of user files.
- No auth, no DB, no server functions.
- No dark mode.

## Verification

- `tsgo` typecheck via harness
- Load `/`, `/tools`, `/about` in the preview via Playwright, screenshot each, confirm navbar, hero, converter flow, and animations render.
