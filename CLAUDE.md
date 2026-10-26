# Abyss

Interactive scroll-driven landing page: a dive from the ocean surface to the bottom of the
Mariana Trench (Challenger Deep). Scrolling is the dive. Educational showcase, no sales or forms.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`), tokens in `src/styles/theme.css` (`@theme`)
- GSAP 3.15 + `@gsap/react` (`useGSAP`). Plugins: ScrollTrigger, ScrollSmoother, ScrollToPlugin,
  SplitText, DrawSVGPlugin. Registered once in `src/lib/gsap.ts`; always import GSAP from `@/lib/gsap`.
- `vite-plugin-svgr` (import SVGs as components with `?react`), `svgo` for SVG optimization
- Fonts (Google Fonts, linked in `index.html`): Space Grotesk (titles), Inter (body),
  JetBrains Mono (instrument numbers)

## Commands

- `npm run dev` — dev server
- `npm run build` — type check (`tsc -b`) + production build
- `npm run lint` — ESLint
- `npx tsc -b` — type check only

## Folder structure

```
src/
  assets/           original illustrations (never modify)
  assets/svg/       traced + optimized SVGs (kebab-case, English names)
  components/
    sections/       page sections (hero, zones, trench floor, footer)
    ui/             reusable UI (instrument panel, buttons, particles, lantern)
    creatures/      one component per creature / illustration
  hooks/            reusable logic (e.g. depth from scroll)
  data/             typed content: zones, creatures, facts, sources, copy
  lib/              GSAP setup, motion config, utilities
  types/            shared TypeScript types
  styles/           theme tokens
```

## Code standards

- Page language is **English (en-US)**: all visible text, alt text and meta tags. `<html lang="en">`.
  Units: meters and °C, with feet and °F shown smaller.
- File, component, variable and function names in English.
- One component per file, named function components, typed props, no `any`.
- No hard-coded copy or data in components: everything lives in `src/data/`.
- Small, focused components; extract hooks when logic repeats.
- Tailwind only with theme tokens (no loose hex colors or arbitrary color values).
- Every animated component uses `useGSAP` with `scope`; animate only `transform` and `opacity`
  (exceptions: DrawSVG stroke).
- Motion values come from the `MOTION` object in `src/lib/motion.ts`; no magic numbers in animations.
- Responsive animations via `gsap.matchMedia()`; respect `prefers-reduced-motion`
  (no parallax, particles or lantern; gradient and instruments still work).
- Do not write code comments; code must explain itself through naming.
- Semantic HTML, alt text on images, keyboard navigation and visible focus.

## Commit rules

- Commit each finished feature immediately, before starting the next one.
- Commit only after type check and build pass.
- English Conventional Commits: `type(scope): description`, imperative, lowercase,
  no trailing period, max ~72 characters. Examples:
  - `chore(setup): remove vite template boilerplate`
  - `feat(hero): add surface scene with animated title`
  - `fix(lantern): follow touch position on mobile`
- **Never run `git push`.** Commits stay local.
