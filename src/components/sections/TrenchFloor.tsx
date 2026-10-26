import { useRef } from 'react'
import { Seafloor } from '@/components/creatures/Seafloor'
import { ActionButton } from '@/components/ui/ActionButton'
import { Lantern } from '@/components/ui/Lantern'
import { CHALLENGER_DEEP_DEPTH, trench } from '@/data/trench'
import { formatInteger } from '@/lib/format'
import { gsap, SplitText, useGSAP } from '@/lib/gsap'
import { MEDIA, MOTION } from '@/lib/motion'
import { metersToFeet } from '@/lib/ocean-physics'

export function TrenchFloor() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingId = `${trench.id}-title`

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return
      const media = gsap.matchMedia()
      media.add(MEDIA.motionOk, () => {
        const reveal = gsap.timeline({
          defaults: { ease: MOTION.ease, duration: MOTION.dur },
          scrollTrigger: { trigger: section, start: 'top 55%', toggleActions: 'play none none reverse' },
        })
        reveal.from('[data-trench-eyebrow]', { autoAlpha: 0, y: MOTION.dist / 2 }, 0)
        SplitText.create(section.querySelector('[data-trench-depth]') ?? [], {
          type: 'chars',
          mask: 'chars',
          autoSplit: true,
          onSplit: (split) => reveal.from(split.chars, { yPercent: 110, stagger: MOTION.stagger }, 0.15),
        })
        reveal.from('[data-trench-copy]', { autoAlpha: 0, y: MOTION.dist / 2, stagger: MOTION.stagger * 3 }, 0.7)
        reveal.from('[data-trench-cta]', { autoAlpha: 0, scale: 0.9, ease: MOTION.easePop, duration: MOTION.fast }, 1.2)
        gsap.from('[data-seafloor]', {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom bottom', scrub: MOTION.scrub },
        })
      })
      return () => media.revert()
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id={trench.id}
      aria-labelledby={headingId}
      className="relative isolate flex min-h-svh flex-col justify-center overflow-clip bg-ocean-hadal"
    >
      <div data-seafloor className="pointer-events-none absolute inset-x-0 bottom-0 z-0">
        <Seafloor label={trench.seafloorLabel} className="block h-auto w-full" />
      </div>
      <div className="absolute inset-0 z-10">
        <Lantern fadeIn={false} />
      </div>

      <div className="relative z-30 mx-auto flex max-w-content flex-col items-center px-gutter pb-[24svh] pt-section text-center">
        <p data-trench-eyebrow className="font-mono text-label uppercase tracking-widest text-glow-cyan">
          {trench.eyebrow}
        </p>
        <p className="mt-4 flex flex-col items-center">
          <span data-trench-depth className="font-mono text-depth font-medium tracking-tighter text-foam">
            {formatInteger(CHALLENGER_DEEP_DEPTH)} m
          </span>
          <span data-trench-copy className="font-mono text-lead text-mist">
            {formatInteger(metersToFeet(CHALLENGER_DEEP_DEPTH))} ft
          </span>
        </p>
        <h2
          id={headingId}
          data-trench-copy
          data-focus-target
          tabIndex={-1}
          className="mt-8 font-display text-zone font-bold tracking-tight text-foam"
        >
          {trench.title}
        </h2>
        <p data-trench-copy className="mt-4 max-w-xl text-lead leading-relaxed text-foam">
          {trench.impact}
        </p>
        <p data-trench-copy className="mt-4 max-w-md text-label leading-relaxed text-mist">
          {trench.note}
        </p>
        <div data-trench-cta className="mt-10">
          <ActionButton action={trench.cta} variant="glow" duration={MOTION.returnDuration} />
        </div>
      </div>
    </section>
  )
}
