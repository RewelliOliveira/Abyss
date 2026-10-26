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
    sections/       page sections (hero, zones, trench floor)
    ui/             reusable UI (instrument panel, buttons, particles, lantern)
    creatures/      one component per creature / illustration
  hooks/            reusable logic (e.g. depth from scroll)
  data/             typed content: zones, creatures, facts, copy
  lib/              GSAP setup, motion config, utilities
  types/            shared TypeScript types
  styles/           theme tokens
```

## How the dive works

- `src/lib/dive-store.ts` holds the current depth. Each `ZoneSection` maps its scroll progress to its
  depth range (`useZoneDepth`); instruments, headlights and particles subscribe to it.
- Page background: every zone paints a vertical gradient from its color to the next one
  (`backgroundClass` in `src/data/zones.ts`), so the gradient is continuous and scroll-driven.
- Fixed layers (outside `#smooth-wrapper`): `ParticleField` (canvas, z-20), `DiveGuide`
  (submarine, z-30) and `InstrumentPanel` (z-40). The page ends at the `TrenchFloor` section.
- Dark zones (`dark: true`) render a `Lantern` (darkness with a radial hole following the pointer,
  touch or screen center) and a second `CreatureLayer` with `layer="glow"` above the darkness that only
  shows the bioluminescent SVG part plus its pre-drawn `GlowHalo`, so lures and tail tips glow in the dark.
  Glow is never an animated SVG filter: halos are radial gradients animated only in opacity.
- Creature DOM layers: `[data-actor]` (scroll drift and parallax, `useCreatureMotion`) >
  `[data-ambient]` (idle motion, `useAmbientMotion`) > `[data-turn]` (school turns) > mirror > art.
  Never animate the same element from both systems.
- Ambient motion: presets per species/scenery in `src/data/motion-presets.ts` (typed in `src/types/motion.ts`),
  behaviors in `src/lib/ambient-body.ts` (wander, rock, school, pulse, jet, crawl, sway, twitch) and
  secondary part motion in `src/lib/ambient-parts.ts` (wag, flap, sway, spin, blink, flicker, turn, breathe).
  Agents are deterministic per element (seeded noise) and run on one `gsap.ticker` per scene via
  `runAmbientAgents`, paused off-screen by ScrollTrigger. Reduced motion skips them entirely.
- Animatable SVG parts are `<g data-part="...">`: `lure`, `tail`, `tail-tip`, `arms`, `front-flipper`,
  `rear-flipper`, `far-flipper`, `tentacles`, `headlights`, `propeller`, sun `rays`/`ring-*`/`core`, and the
  seafloor organisms (`sea-lily-*`, `sea-pen-*`, `sponge-*`, `anemone-*`, `sea-whip-*`, `sea-pig-*`,
  `brittle-star-*`, `crab`, `ground`). Cut-out parts are drawn behind the body with an overlap at the joint.
- Sky: `Sun`, `GodRays` (fade with depth into the Sunlight Zone) and `SeagullFlock` (pose-swapping gulls
  driven by `src/lib/flight.ts`, configured in `src/data/sky.ts`).
- Tune motion in `src/lib/motion.ts` (`MOTION`, `MEDIA`), colors/fonts/spacing in `src/styles/theme.css`,
  Google Fonts link in `index.html`.

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
