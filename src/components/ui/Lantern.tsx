import { useRef } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { getLanternPosition } from '@/lib/lantern-store'
import { MEDIA, MOTION } from '@/lib/motion'
import { trackViewportTop } from '@/lib/scroll'

interface LanternProps {
  fadeIn: boolean
}

const pointerViewport = 'absolute inset-0'
const touchViewport = 'sticky top-0 h-lvh overflow-clip'
const pointerBeam =
  'bg-[radial-gradient(circle,transparent_0,transparent_var(--spacing-lantern),var(--color-darkness)_var(--spacing-lantern-edge))]'
const touchBeam =
  'bg-[radial-gradient(circle,transparent_0,transparent_var(--spacing-lantern-touch),var(--color-darkness)_var(--spacing-lantern-touch-edge))]'

export function Lantern({ fadeIn }: LanternProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const beamRef = useRef<HTMLDivElement>(null)
  const hasPointer = useMediaQuery(MEDIA.finePointer)

  useGSAP(
    () => {
      const root = rootRef.current
      const beam = beamRef.current
      if (!root || !beam) return
      const media = gsap.matchMedia()
      media.add(MEDIA.motionOk, () => {
        gsap.set(beam, { xPercent: -50, yPercent: -50 })
        const setX = gsap.quickSetter(beam, 'x', 'px')
        const setY = gsap.quickSetter(beam, 'y', 'px')
        const rootTop = hasPointer ? trackViewportTop(root) : null

        function followLantern() {
          const { x, y } = getLanternPosition()
          setX(x)
          setY(y - (rootTop?.top() ?? 0))
        }

        const visibility = ScrollTrigger.create({
          trigger: root,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => {
            if (self.isActive) gsap.ticker.add(followLantern)
            else gsap.ticker.remove(followLantern)
          },
        })

        if (fadeIn) {
          gsap.fromTo(
            root,
            { autoAlpha: 0 },
            {
              autoAlpha: 1,
              ease: 'none',
              scrollTrigger: { trigger: root, start: 'top 60%', end: 'top -20%', scrub: MOTION.scrub },
            },
          )
        }

        return () => {
          visibility.kill()
          rootTop?.stop()
          gsap.ticker.remove(followLantern)
        }
      })
      return () => media.revert()
    },
    { scope: rootRef, dependencies: [fadeIn, hasPointer], revertOnUpdate: true },
  )

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-clip motion-reduce:hidden ${fadeIn ? 'mask-t-from-50%' : ''}`}
    >
      <div className={hasPointer ? pointerViewport : touchViewport}>
        <div
          ref={beamRef}
          className={`absolute left-0 top-0 size-[220vmax] will-change-transform ${hasPointer ? pointerBeam : touchBeam}`}
        />
      </div>
    </div>
  )
}
