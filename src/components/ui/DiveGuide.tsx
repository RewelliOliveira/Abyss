import { useCallback, useRef, useState } from 'react'
import { Submarine } from '@/components/creatures/Submarine'
import { GlowHalo } from '@/components/ui/GlowHalo'
import { HeadlightBeam } from '@/components/ui/HeadlightBeam'
import { SubBubbles } from '@/components/ui/SubBubbles'
import { DARKNESS_DEPTH } from '@/data/instruments'
import { subscribeToDepth } from '@/lib/dive-store'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { MEDIA, MOTION } from '@/lib/motion'
import { measurePartAnchors, type Anchor } from '@/lib/svg-anchors'

const LIGHTS = '[data-headlight-beams], [data-headlight-glow]'

export function DiveGuide() {
  const guideRef = useRef<HTMLDivElement>(null)
  const [lensAnchors, setLensAnchors] = useState<Anchor[]>([])

  const measureLenses = useCallback((art: HTMLDivElement | null) => {
    const svg = art?.querySelector('svg')
    if (svg) setLensAnchors(measurePartAnchors(svg, 'headlights'))
  }, [])

  useGSAP(
    () => {
      const guide = guideRef.current
      if (!guide) return
      const headlights = guide.querySelectorAll<SVGElement>('[data-part="headlights"]')
      gsap.set(headlights, { opacity: 0.35 })

      const media = gsap.matchMedia()
      media.add({ motionOk: MEDIA.motionOk, reducedMotion: MEDIA.reducedMotion }, (context) => {
        const { motionOk } = context.conditions ?? {}
        const switchDuration = motionOk ? MOTION.headlightSwitch : 0
        let lightsOn = false

        const stopListening = subscribeToDepth((depth) => {
          const shouldShine = depth >= DARKNESS_DEPTH
          if (shouldShine === lightsOn) return
          lightsOn = shouldShine
          gsap.to(LIGHTS, { autoAlpha: shouldShine ? 1 : 0, duration: switchDuration, overwrite: true })
          gsap.to(headlights, { opacity: shouldShine ? 1 : 0.35, duration: switchDuration, overwrite: true })
        })

        const surface = document.getElementById('surface')
        if (!motionOk) {
          const arrival = ScrollTrigger.create({
            trigger: surface,
            start: 'bottom 60%',
            onEnter: () => gsap.set('[data-sub-body]', { autoAlpha: 1 }),
            onLeaveBack: () => gsap.set('[data-sub-body]', { autoAlpha: 0 }),
          })
          gsap.set('[data-sub-body]', { autoAlpha: arrival.scroll() >= arrival.start ? 1 : 0 })
          return () => {
            stopListening()
            arrival.kill()
          }
        }

        const descent = gsap.timeline({
          scrollTrigger: { trigger: surface, start: 'top top', end: 'bottom top', scrub: MOTION.scrub },
        })
        descent.fromTo('[data-sub-body]', { y: '-70vh', autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: 'none' }, 0)
        descent.fromTo('[data-cable]', { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', ease: 'none' }, 0)

        gsap.utils.toArray<HTMLElement>('[data-sub-bubble]').forEach((bubble) => {
          gsap.fromTo(
            bubble,
            { x: 0, y: 0, scale: 0.4 },
            {
              keyframes: { opacity: [0, 0.8, 0] },
              x: 'random(-14, 10)',
              y: 'random(-150, -90)',
              scale: 'random(0.9, 1.4)',
              duration: 'random(1.8, 2.8)',
              ease: 'sine.out',
              repeat: -1,
              repeatRefresh: true,
              repeatDelay: gsap.utils.random(1.5, 6),
              delay: gsap.utils.random(0, 5),
            },
          )
        })
        return stopListening
      })
      return () => media.revert()
    },
    { scope: guideRef },
  )

  return (
    <div
      ref={guideRef}
      aria-hidden="true"
      className="pointer-events-none fixed bottom-36 right-2 z-30 w-14 md:bottom-auto md:left-[4vw] md:right-auto md:top-[28vh] md:w-[clamp(7rem,11vw,10rem)]"
    >
      <div data-sub-body>
        <div>
          <div className="relative -scale-x-100 md:scale-x-100">
            <svg
              viewBox="0 0 10 1000"
              preserveAspectRatio="none"
              className="absolute bottom-[92%] left-[46%] hidden h-[120vh] w-2 overflow-visible md:block"
            >
              <path
                data-cable
                d="M5 0 C 7 300, 3 650, 5 1000"
                className="fill-none stroke-mist [stroke-width:2]"
              />
            </svg>
            <div ref={measureLenses} data-sub-art className="relative">
              <div data-headlight-beams className="absolute inset-0 opacity-0">
                {lensAnchors.map((anchor) => (
                  <HeadlightBeam key={`${anchor.x}-${anchor.y}`} anchor={anchor} />
                ))}
              </div>
              <Submarine className="relative block h-auto w-full" />
              <div data-headlight-glow className="absolute inset-0 opacity-0">
                {lensAnchors.map((anchor) => (
                  <GlowHalo key={`${anchor.x}-${anchor.y}`} anchor={anchor} part="beam" color="cyan" spread={3} />
                ))}
              </div>
              <SubBubbles />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
