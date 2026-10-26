import type { RefObject } from 'react'
import { gsap, ScrollSmoother, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { MEDIA, MOTION } from '@/lib/motion'

export function useSmoothScroller(
  wrapperRef: RefObject<HTMLDivElement | null>,
  contentRef: RefObject<HTMLDivElement | null>,
): void {
  useGSAP(() => {
    const media = gsap.matchMedia()
    media.add(`${MEDIA.motionOk} and ${MEDIA.finePointer}`, () => {
      const smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: MOTION.smooth,
        effects: false,
        normalizeScroll: false,
      })
      return () => smoother.kill()
    })
    document.fonts.ready.then(() => ScrollTrigger.refresh())
    return () => media.revert()
  })
}
