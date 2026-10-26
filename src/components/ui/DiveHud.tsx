import { useRef } from 'react'
import { DiveGuide } from '@/components/ui/DiveGuide'
import { InstrumentPanel } from '@/components/ui/InstrumentPanel'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { MEDIA, MOTION } from '@/lib/motion'

interface DiveHudProps {
  exitTargetId: string
}

export function DiveHud({ exitTargetId }: DiveHudProps) {
  const hudRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add({ motionOk: MEDIA.motionOk, reducedMotion: MEDIA.reducedMotion }, (context) => {
        const duration = context.conditions?.motionOk ? MOTION.fast : 0
        ScrollTrigger.create({
          trigger: document.getElementById(exitTargetId),
          start: 'top 85%',
          onEnter: () => gsap.to(hudRef.current, { autoAlpha: 0, duration, overwrite: true }),
          onLeaveBack: () => gsap.to(hudRef.current, { autoAlpha: 1, duration, overwrite: true }),
        })
      })
      return () => media.revert()
    },
    { scope: hudRef, dependencies: [exitTargetId] },
  )

  return (
    <div ref={hudRef} className="relative z-30">
      <DiveGuide />
      <InstrumentPanel />
    </div>
  )
}
