import type { RefObject } from 'react'
import { animateDrift, applyGlowFilters, findActors } from '@/lib/creature-motion'
import { gsap, useGSAP } from '@/lib/gsap'
import { MEDIA, MOTION } from '@/lib/motion'
import type { CreaturePlacement } from '@/types/ocean'

export function useCreatureMotion(sectionRef: RefObject<HTMLElement | null>, creatures: CreaturePlacement[]): void {
  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return
      creatures.forEach((placement) => applyGlowFilters(findActors(section, placement), placement))

      const media = gsap.matchMedia()
      media.add({ motionOk: MEDIA.motionOk, mobile: MEDIA.mobile }, (context) => {
        const { motionOk, mobile } = context.conditions ?? {}
        if (!motionOk) return
        const scale = mobile ? MOTION.mobileDistanceScale : 1
        creatures.forEach((placement) => {
          const actors = findActors(section, placement)
          if (!actors.length) return
          animateDrift(section, actors, placement, scale)
        })
      })
      return () => media.revert()
    },
    { scope: sectionRef, dependencies: [creatures] },
  )
}
