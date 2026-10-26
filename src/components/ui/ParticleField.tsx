import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { MEDIA } from '@/lib/motion'
import { startParticleField, type ParticleBudget } from '@/lib/particles'

const desktopBudget: ParticleBudget = { bubbles: 70, snow: 160 }
const mobileBudget: ParticleBudget = { bubbles: 28, snow: 60 }

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useGSAP(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const media = gsap.matchMedia()
    media.add({ motionOk: MEDIA.motionOk, mobile: MEDIA.mobile }, (context) => {
      const { motionOk, mobile } = context.conditions ?? {}
      if (!motionOk) return
      return startParticleField(canvas, mobile ? mobileBudget : desktopBudget)
    })
    return () => media.revert()
  })

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 size-full motion-reduce:hidden"
    />
  )
}
