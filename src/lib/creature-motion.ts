import { creatureTraits } from '@/data/creatures'
import { gsap } from '@/lib/gsap'
import { glowFilterUrl } from '@/lib/glow'
import { MOTION } from '@/lib/motion'
import type { CreaturePlacement, SwimDirection } from '@/types/ocean'

type Actors = HTMLElement[]

const swimTravel: Record<SwimDirection, number> = {
  left: -1,
  right: 1,
  up: 0,
  still: 0,
}

export function findActors(scope: HTMLElement, placement: CreaturePlacement): Actors {
  return Array.from(scope.querySelectorAll<HTMLElement>(`[data-actor="${placement.id}"]`))
}

function findParts(actors: Actors, part: string): SVGElement[] {
  return actors.flatMap((actor) => Array.from(actor.querySelectorAll<SVGElement>(`[data-part="${part}"]`)))
}

export function applyGlowFilters(actors: Actors, placement: CreaturePlacement): void {
  const { glow } = creatureTraits[placement.kind]
  const parts = glow ? findParts(actors, glow.part) : []
  if (!glow || !parts.length) return
  gsap.set(parts, { attr: { filter: glowFilterUrl(glow.color) } })
}

export function animateDrift(section: HTMLElement, actors: Actors, placement: CreaturePlacement, scale: number): void {
  const travel = swimTravel[placement.swim] * MOTION.swimDistance * scale
  const rise = placement.swim === 'up' ? MOTION.riseBoost : 1
  const depthShift = placement.parallax * MOTION.parallaxDepth * scale * rise
  gsap.fromTo(
    actors,
    { x: `${-travel}vw`, y: depthShift },
    {
      x: `${travel}vw`,
      y: -depthShift,
      ease: 'none',
      scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: MOTION.scrub },
    },
  )
  gsap.from(actors, {
    autoAlpha: 0,
    duration: MOTION.slow,
    ease: MOTION.ease,
    scrollTrigger: {
      trigger: section,
      start: () => `top+=${(section.offsetHeight * placement.top) / 100} 90%`,
      toggleActions: 'play none none reverse',
    },
  })
}

export function animateFloat(actors: Actors, index: number): void {
  const floaters = actors.map((actor) => actor.querySelector<HTMLElement>('[data-float]')).filter(Boolean)
  gsap.to(floaters, {
    y: MOTION.floatDistance,
    rotation: index % 2 === 0 ? 1.5 : -1.5,
    duration: MOTION.floatCycle * (0.8 + (index % 3) * 0.15),
    ease: MOTION.easeInOut,
    repeat: -1,
    yoyo: true,
    delay: -index * 0.7,
  })
}

export function animateParts(actors: Actors, placement: CreaturePlacement): void {
  const { glow, sway } = creatureTraits[placement.kind]
  const swayParts = sway ? findParts(actors, sway) : []
  if (swayParts.length) {
    gsap.to(swayParts, {
      skewX: 6,
      transformOrigin: '50% 0%',
      duration: MOTION.floatCycle / 2,
      ease: MOTION.easeInOut,
      repeat: -1,
      yoyo: true,
    })
  }
  const glowParts = glow ? findParts(actors, glow.part) : []
  if (glowParts.length) {
    gsap.fromTo(
      glowParts,
      { opacity: 0.55, scale: 0.92 },
      {
        opacity: 1,
        scale: 1.12,
        transformOrigin: '50% 50%',
        duration: MOTION.glowCycle,
        ease: MOTION.easeInOut,
        repeat: -1,
        yoyo: true,
      },
    )
  }
}
