import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { getLanternPosition } from '@/lib/lantern-store'
import { MEDIA, MOTION } from '@/lib/motion'

interface LanternProps {
  fadeIn: boolean
}

export function Lantern({ fadeIn }: LanternProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const beamRef = useRef<HTMLDivElement>(null)

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

        function followLantern() {
          const bounds = root!.getBoundingClientRect()
          const { x, y } = getLanternPosition()
          setX(x - bounds.left)
          setY(y - bounds.top)
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
          gsap.ticker.remove(followLantern)
        }
      })
      return () => media.revert()
    },
    { scope: rootRef, dependencies: [fadeIn] },
  )

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden ${fadeIn ? 'mask-t-from-50%' : ''}`}
    >
      <div
        ref={beamRef}
        className="absolute left-0 top-0 size-[400vmax] bg-[radial-gradient(circle,transparent_0,transparent_var(--spacing-lantern),var(--color-darkness)_var(--spacing-lantern-edge))]"
      />
    </div>
  )
}
