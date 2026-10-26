import { gsap, useGSAP } from '@/lib/gsap'
import { startLanternTracking } from '@/lib/lantern-store'
import { MEDIA } from '@/lib/motion'

export function useLanternTracking(): void {
  useGSAP(() => {
    const media = gsap.matchMedia()
    media.add(MEDIA.motionOk, () => startLanternTracking())
    return () => media.revert()
  })
}
