# Abyss

> Scroll from sunlit waves to the Challenger Deep, 10,935 m down.

**Abyss** is an interactive, scroll-driven landing page that takes you on a dive from the ocean surface to the bottom of the Mariana Trench. Scrolling *is* the dive: the depth gauge, the light, the colors and the creatures all change as you go down. It is an educational showcase, with no sales pitch and no forms.

Built with React, TypeScript, Tailwind CSS and GSAP.

---

## Table of contents

- [Highlights](#highlights)
- [The dive](#the-dive)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Scripts](#scripts)
- [Project structure](#project-structure)
- [How it works](#how-it-works)
- [Customization](#customization)
- [Accessibility](#accessibility)
- [Contributing](#contributing)

---

## Highlights

- **Five ocean zones**, each with its own color gradient, facts and creatures.
- **20+ hand-traced SVG illustrations**: sea life, a research ship, a submarine, seagulls and a detailed seafloor.
- **Live instrument panel** showing depth (m / ft), temperature (°C / °F) and pressure as you scroll.
- **Lantern effect** in the dark zones: the darkness has a light hole that follows your pointer, finger or the screen center.
- **Bioluminescence**: lures, tail tips and photophores keep glowing above the darkness.
- **Creature profiles**: hover or focus a creature to learn more about it.
- **Smooth scrolling** with GSAP ScrollSmoother and creatures that swim in as the dive reaches them.
- **Responsive** layout with a dedicated creature stage on mobile, and full `prefers-reduced-motion` support.

## The dive

| Zone | Depth | Some of the creatures |
| --- | --- | --- |
| Sunlight Zone | 0 – 200 m | Green sea turtle, Atlantic herring, giant manta ray, great hammerhead, mauve stinger |
| Twilight Zone | 200 – 1,000 m | Humboldt squid, swordfish, lanternfish, silver hatchetfish, sperm whale |
| Midnight Zone | 1,000 – 4,000 m | Humpback anglerfish, gulper eel, vampire squid, Atolla jellyfish |
| Abyssal Zone | 4,000 – 6,000 m | Tripod fish, bigfin squid, deep-sea red shrimp |
| Hadal Zone | 6,000 – 10,935 m | Deep-sea anemone, Mariana snailfish |

The journey ends at the **Challenger Deep**, the deepest known point on Earth.

## Tech stack

| Technology | Purpose |
| --- | --- |
| [React 19](https://react.dev) | UI |
| [TypeScript](https://www.typescriptlang.org) | Type safety |
| [Vite](https://vite.dev) | Dev server and bundler |
| [Tailwind CSS v4](https://tailwindcss.com) | Styling, with theme tokens in `src/styles/theme.css` |
| [GSAP 3](https://gsap.com) + `@gsap/react` | ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText, DrawSVGPlugin |
| [vite-plugin-svgr](https://github.com/pd4d10/vite-plugin-svgr) | Import SVGs as React components (`?react`) |
| [SVGO](https://github.com/svg/svgo) | SVG optimization |

Fonts: **Space Grotesk** (titles), **Inter** (body) and **JetBrains Mono** (instrument readouts), loaded from Google Fonts.

## Getting started

**Requirements:** Node.js 20+ and npm.

```bash
git clone https://github.com/RewelliOliveira/Abyss.git
cd Abyss
npm install
npm run dev
```

Then open `http://localhost:5173`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Type check (`tsc -b`) and build for production into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Project structure

```
Abyss/
├── public/                 # favicon and logo
├── src/
│   ├── assets/             # original illustrations (never modified)
│   │   └── svg/            # traced and optimized SVGs
│   ├── components/
│   │   ├── sections/       # Hero, ZoneSection, TrenchFloor
│   │   ├── ui/             # instrument panel, lantern, particles, popover, sky...
│   │   └── creatures/      # one component per creature or illustration
│   ├── data/               # typed content: zones, creatures, facts, sky, motion presets
│   ├── hooks/              # depth, reveal, lantern tracking, smooth scroller...
│   ├── lib/                # GSAP setup, motion config, dive store, ambient motion
│   ├── styles/             # theme tokens
│   ├── types/              # shared TypeScript types
│   ├── App.tsx
│   └── main.tsx
├── index.html
└── vite.config.ts
```

## How it works

**Depth from scroll.** `src/lib/dive-store.ts` holds the current depth. Each `ZoneSection` maps its scroll progress to its own depth range (`useZoneDepth`), and the instruments, headlights and particles subscribe to that value.

**Continuous background.** Every zone paints a vertical gradient from its color to the next zone's color, so the ocean darkens smoothly as you scroll.

**Fixed layers.** Outside the smooth-scroll wrapper sit the `ParticleField` (canvas), the `DiveGuide` (the submarine) and the `InstrumentPanel`.

**Darkness and glow.** Dark zones render a `Lantern` (a darkness layer with a radial light hole) plus a second creature layer above it that shows only the bioluminescent parts and their pre-drawn halos. Glow is never an animated SVG filter: halos are radial gradients animated only in opacity, which keeps it fast.

**Creature reveals.** Underwater art is static. Creatures only enter as the dive reaches them: sliding in from the left or right, or rising from below.

**Living sky.** Only the surface scene animates its SVGs: the sun, god rays, waves, the research ship and a flock of seagulls that swap poses in flight. These ambient agents use seeded noise, run on a single `gsap.ticker` per scene and pause when off-screen.

**Code splitting.** Illustrations are split into separate chunks (`seafloor`, `sea-life`, `illustrations`, `vendor`) in `vite.config.ts`.

## Customization

| What | Where |
| --- | --- |
| Colors, fonts, spacing | `src/styles/theme.css` |
| Font links | `index.html` |
| Motion timings and breakpoints | `src/lib/motion.ts` (`MOTION`, `MEDIA`) |
| Zones, creatures and facts | `src/data/zones.ts`, `src/data/creatures.ts` |
| Sky and seagulls | `src/data/sky.ts`, `src/lib/flight.ts` |
| Ambient motion presets | `src/data/motion-presets.ts` |

## Accessibility

- Semantic HTML, alt text on every illustration, keyboard navigation and visible focus.
- `prefers-reduced-motion` turns off parallax, particles and the lantern, while the depth gradient and instruments keep working.
- Units are shown in metric with imperial alongside (meters / feet, °C / °F).

## Contributing

Commits follow [Conventional Commits](https://www.conventionalcommits.org) in English:

```
feat(hero): add surface scene with animated title
fix(lantern): follow touch position on mobile
```

Run `npm run build` before committing to make sure the type check and the build pass.
