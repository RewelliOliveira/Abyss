import { useRef } from 'react'
import { ResearchShip } from '@/components/creatures/ResearchShip'
import { Sun } from '@/components/creatures/Sun'
import { ActionButton } from '@/components/ui/ActionButton'
import { GodRays } from '@/components/ui/GodRays'
import { SeagullFlock } from '@/components/ui/SeagullFlock'
import { WaveLine } from '@/components/ui/WaveLine'
import { hero } from '@/data/hero'
import { creatureMotion, sceneryMotion } from '@/data/motion-presets'
import { sunLabel } from '@/data/sky'
import { useAmbientMotion, type AmbientTarget } from '@/hooks/useAmbientMotion'
import { gsap, SplitText, useGSAP } from '@/lib/gsap'
import { MEDIA, MOTION } from '@/lib/motion'

const skyTargets: AmbientTarget[] = [
  { selector: '[data-sun-art]', preset: sceneryMotion.sun, seed: 11 },
  { selector: '[data-ship-bob]', preset: creatureMotion['research-ship'], seed: 5 },
]

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  useAmbientMotion(sectionRef, skyTargets)

  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add({ motionOk: MEDIA.motionOk, mobile: MEDIA.mobile }, (context) => {
        const { motionOk, mobile } = context.conditions ?? {}
        if (!motionOk) return
        const distance = mobile ? MOTION.dist * MOTION.mobileDistanceScale : MOTION.dist

        const intro = gsap.timeline({ defaults: { ease: MOTION.ease, duration: MOTION.dur } })
        intro.from('[data-hero-eyebrow]', { autoAlpha: 0, y: distance / 2 }, 0)
        SplitText.create(sectionRef.current?.querySelector('[data-hero-title]') ?? [], {
          type: 'chars',
          mask: 'chars',
          autoSplit: true,
          onSplit: (split) => {
            gsap.set(split.masks, { paddingBottom: '0.18em', marginBottom: '-0.18em' })
            return intro.from(split.chars, { yPercent: 120, rotate: 8, stagger: MOTION.stagger, duration: MOTION.dur }, 0.1)
          },
        })
        intro.from('[data-hero-subtitle]', { autoAlpha: 0, y: distance / 2 }, 0.6)
        intro.from('[data-hero-cta]', { autoAlpha: 0, scale: 0.9, ease: MOTION.easePop, duration: MOTION.fast }, 0.8)
        intro.from('[data-hero-ship-arrival]', { autoAlpha: 0, y: distance, duration: MOTION.slow * 0.75 }, 0.2)
        intro.from('[data-hero-hint]', { autoAlpha: 0, duration: MOTION.fast }, 1.2)

        gsap.to('[data-wave="front"]', { xPercent: -50, duration: MOTION.floatCycle * 2.5, ease: 'none', repeat: -1 })
        gsap.to('[data-wave="back"]', { xPercent: -50, duration: MOTION.floatCycle * 4, ease: 'none', repeat: -1 })
        gsap.to('[data-hero-hint-arrow]', { y: 8, duration: MOTION.fast, ease: MOTION.easeInOut, repeat: -1, yoyo: true })

        const exit = gsap.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: MOTION.scrub },
        })
        exit.to('[data-hero-copy]', { yPercent: -30, autoAlpha: 0, ease: 'none' }, 0)
        exit.to('[data-hero-ship]', { y: -distance * 2, ease: 'none' }, 0)
        exit.to('[data-sun]', { yPercent: -220, ease: 'none' }, 0)
      })
      return () => media.revert()
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id="surface"
      aria-labelledby="surface-title"
      className="relative isolate z-10 flex min-h-svh flex-col overflow-x-clip"
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[64%] bg-linear-to-b from-sky-low to-sky-high" />
      <div
        data-sun
        className="pointer-events-none absolute right-[5%] top-[4%] w-[clamp(4.5rem,13vw,11rem)] md:right-[12%] md:top-[7%]"
      >
        <div data-sun-art>
          <Sun label={sunLabel} className="block h-auto w-full" />
        </div>
      </div>
      <SeagullFlock className="z-5 h-[58%]" />
      <div data-waterline aria-hidden="true" className="absolute inset-x-0 bottom-0 top-[64%] z-15 bg-ocean-surface" />
      <GodRays fadeTargetId="sunlight" className="top-[64%] z-15 h-[calc(36%+110svh)]" />

      <div className="absolute left-1/2 top-[64%] z-10 w-[min(78vw,30rem)] -translate-x-1/2 -translate-y-[88%] md:left-auto md:right-[6%] md:w-[min(42vw,36rem)] md:translate-x-0">
        <div data-hero-ship>
          <div data-hero-ship-arrival>
            <div data-ship-bob className="origin-bottom">
              <ResearchShip label={hero.shipLabel} className="h-auto w-full" />
            </div>
          </div>
        </div>
      </div>

      <WaveLine className="top-[calc(64%-2.5rem)] z-20" />

      <div
        data-hero-copy
        className="relative z-30 mx-auto w-full max-w-content px-gutter pt-[14svh] md:pt-[18svh]"
      >
        <p data-hero-eyebrow className="font-mono text-label uppercase tracking-widest text-ink">
          {hero.eyebrow}
        </p>
        <h1
          id="surface-title"
          data-hero-title
          data-focus-target
          tabIndex={-1}
          className="mt-2 font-display text-display font-bold tracking-tighter text-ink"
        >
          {hero.title}
        </h1>
        <p data-hero-subtitle className="mt-4 max-w-md text-lead leading-relaxed text-ink">
          {hero.subtitle}
        </p>
        <div data-hero-cta className="mt-8">
          <ActionButton action={hero.cta} variant="ink" />
        </div>
      </div>

      <p
        data-hero-hint
        className="absolute inset-x-0 bottom-6 z-30 flex flex-col items-center gap-1 font-mono text-label uppercase tracking-widest text-ink"
      >
        <span>{hero.scrollHint}</span>
        <span data-hero-hint-arrow aria-hidden="true">↓</span>
      </p>
    </section>
  )
}
