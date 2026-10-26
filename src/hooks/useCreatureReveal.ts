import type { RefObject } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { MEDIA, MOTION } from '@/lib/motion'
import type { CreaturePlacement } from '@/types/ocean'

export function useCreatureReveal(sectionRef: RefObject<HTMLElement | null>, creatures: CreaturePlacement[]): void {
  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const media = gsap.matchMedia()
      media.add(MEDIA.motionOk, () => {
        creatures.forEach((placement) => {
          const actors = section.querySelectorAll<HTMLElement>(`[data-actor="${placement.id}"]`)
          if (!actors.length) return
          gsap.from(actors, {
            autoAlpha: 0,
            duration: MOTION.slow,
            ease: MOTION.ease,
            scrollTrigger: {
              trigger: section,
              start: () => `top+=${(section.offsetHeight * placement.top) / 100} ${MOTION.revealViewport}`,
              toggleActions: 'play none none reverse',
            },
          })
        })
      })
      return () => media.revert()
    },
    { scope: sectionRef, dependencies: [creatures] },
  )
}
