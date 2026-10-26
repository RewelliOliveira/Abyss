import type { RefObject } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { MEDIA, MOTION } from '@/lib/motion'
import type { CreaturePlacement, SwimDirection } from '@/types/ocean'

const entryOffset: Record<SwimDirection, { x: number; y: number }> = {
  right: { x: -1, y: 0 },
  left: { x: 1, y: 0 },
  up: { x: 0, y: 1 },
  still: { x: 0, y: 0 },
}

export function useCreatureReveal(sectionRef: RefObject<HTMLElement | null>, creatures: CreaturePlacement[]): void {
  useGSAP(
    () => {
      const section = sectionRef.current
      const stage = section?.querySelector<HTMLElement>('[data-stage]')
      if (!section || !stage) return

      const media = gsap.matchMedia()
      media.add({ motionOk: MEDIA.motionOk, mobile: MEDIA.mobile }, (context) => {
        const { motionOk, mobile } = context.conditions ?? {}
        if (!motionOk) return
        const distance = MOTION.enterDistance * (mobile ? MOTION.mobileDistanceScale : 1)
        creatures.forEach((placement) => {
          const actors = section.querySelectorAll<HTMLElement>(`[data-actor="${placement.id}"]`)
          if (!actors.length) return
          const offset = entryOffset[placement.swim]
          const top = mobile ? (placement.mobile?.top ?? placement.top) : placement.top
          const entryTop = () => stage.offsetTop + (stage.offsetHeight * top) / 100
          gsap.from(actors, {
            autoAlpha: 0,
            x: `${offset.x * distance}vw`,
            y: `${offset.y * distance}vh`,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: () => `top+=${entryTop()} ${MOTION.enterStart}`,
              end: () => `top+=${entryTop()} ${MOTION.enterEnd}`,
              scrub: MOTION.scrub,
            },
          })
        })
      })
      return () => media.revert()
    },
    { scope: sectionRef, dependencies: [creatures] },
  )
}
