import type { RefObject } from 'react'
import { ScrollTrigger, useGSAP } from '@/lib/gsap'
import { setDepth } from '@/lib/dive-store'
import type { DepthRange } from '@/types/ocean'

export function useZoneDepth(sectionRef: RefObject<HTMLElement | null>, range: DepthRange): void {
  useGSAP(
    () => {
      const span = range.to - range.from
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        onUpdate: (self) => setDepth(range.from + span * self.progress),
        onLeave: () => setDepth(range.to),
        onLeaveBack: () => setDepth(range.from),
      })
    },
    { scope: sectionRef, dependencies: [range.from, range.to] },
  )
}
