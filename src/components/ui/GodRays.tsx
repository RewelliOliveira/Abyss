import { useRef } from 'react'
import { godRays } from '@/data/sky'
import { gsap, useGSAP } from '@/lib/gsap'
import { MEDIA, MOTION } from '@/lib/motion'

interface GodRaysProps {
  fadeTargetId: string
  className?: string
}

export function GodRays({ fadeTargetId, className = '' }: GodRaysProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        rootRef.current,
        { autoAlpha: 1 },
        {
          autoAlpha: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: document.getElementById(fadeTargetId),
            start: 'top 75%',
            end: 'center top',
            scrub: MOTION.scrub,
          },
        },
      )
      const media = gsap.matchMedia()
      media.add(MEDIA.motionOk, () => {
        gsap.utils.toArray<HTMLElement>('[data-god-ray]').forEach((ray) => {
          gsap.to(ray, {
            rotation: 'random(-3.5, 3.5)',
            duration: 'random(5, 9)',
            ease: MOTION.easeInOut,
            repeat: -1,
            yoyo: true,
            repeatRefresh: true,
          })
          gsap.to(ray, {
            opacity: 'random(0.35, 1)',
            duration: 'random(3, 6)',
            ease: MOTION.easeInOut,
            repeat: -1,
            yoyo: true,
            repeatRefresh: true,
          })
        })
      })
      return () => media.revert()
    },
    { scope: rootRef, dependencies: [fadeTargetId] },
  )

  return (
    <div ref={rootRef} aria-hidden="true" className={`pointer-events-none absolute inset-x-0 ${className}`}>
      {godRays.map((ray) => (
        <span
          key={ray.left}
          className={`absolute top-0 h-full origin-top opacity-50 ${ray.desktopOnly ? 'hidden md:block' : ''}`}
          style={{ left: `${ray.left}%`, width: `${ray.width}%`, rotate: `${ray.tilt}deg` }}
        >
          <span
            data-god-ray
            className="block size-full origin-top bg-[linear-gradient(to_bottom,transparent,var(--color-foam)_7%,color-mix(in_srgb,var(--color-foam)_22%,transparent)_45%,transparent)] blur-sm"
          />
        </span>
      ))}
    </div>
  )
}
