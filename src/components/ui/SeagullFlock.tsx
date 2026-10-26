import { useRef } from 'react'
import { DistantGull } from '@/components/ui/DistantGull'
import { Seagull } from '@/components/ui/Seagull'
import { flock, gullLabel } from '@/data/sky'
import { runAmbientAgents } from '@/lib/ambient-controller'
import { createFlightAgent } from '@/lib/flight'
import { gsap, useGSAP } from '@/lib/gsap'
import { MEDIA } from '@/lib/motion'

interface SeagullFlockProps {
  className?: string
}

export function SeagullFlock({ className = '' }: SeagullFlockProps) {
  const skyRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const sky = skyRef.current
      if (!sky) return
      const media = gsap.matchMedia()
      media.add(MEDIA.motionOk, () => {
        const agents = flock.flatMap((spec, index) => {
          const bird = sky.querySelector<HTMLElement>(`[data-gull="${spec.id}"]`)
          if (!bird || bird.offsetParent === null) return []
          return [createFlightAgent(bird, spec, index * 97 + 5, sky)]
        })
        const stop = runAmbientAgents(sky, agents, false)
        return () => {
          stop()
          gsap.set(sky.querySelectorAll('[data-gull], [data-pose]'), { clearProps: 'transform,opacity' })
        }
      })
      return () => media.revert()
    },
    { scope: skyRef },
  )

  return (
    <div ref={skyRef} className={`pointer-events-none absolute inset-x-0 top-0 overflow-hidden ${className}`}>
      {flock.map((spec) => (
        <div
          key={spec.id}
          data-gull={spec.id}
          className={`absolute ${spec.desktopOnly ? 'hidden md:block' : ''}`}
          style={{ top: `${spec.top}%`, left: `${spec.startX}%`, width: spec.width }}
        >
          {spec.distant ? <DistantGull /> : <Seagull label={spec.id === flock[0].id ? gullLabel : undefined} />}
        </div>
      ))}
    </div>
  )
}
