import { useRef } from 'react'
import { FactList } from '@/components/ui/FactList'
import { formatDepthRange } from '@/lib/format'
import { gsap, SplitText, useGSAP } from '@/lib/gsap'
import { MEDIA, MOTION } from '@/lib/motion'
import type { Zone } from '@/types/ocean'

interface ZonePanelProps {
  zone: Zone
  headingId: string
}

export function ZonePanel({ zone, headingId }: ZonePanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add(MEDIA.motionOk, () => {
        const reveal = gsap.timeline({
          defaults: { ease: MOTION.ease, duration: MOTION.dur },
          scrollTrigger: { trigger: panelRef.current, start: 'top 80%', once: true },
        })
        reveal.from(panelRef.current, { autoAlpha: 0, y: MOTION.dist }, 0)
        reveal.from('[data-eyebrow]', { autoAlpha: 0, y: MOTION.dist / 2 }, 0.2)
        SplitText.create(panelRef.current?.querySelector('[data-zone-title]') ?? [], {
          type: 'words',
          mask: 'words',
          autoSplit: true,
          onSplit: (split) =>
            reveal.from(split.words, { yPercent: 110, stagger: MOTION.stagger }, 0.3),
        })
        reveal.from('[data-intro]', { autoAlpha: 0, y: MOTION.dist / 2 }, 0.6)
        reveal.from('[data-fact]', { autoAlpha: 0, y: MOTION.dist / 2, stagger: MOTION.stagger * 2 }, 0.8)
      })
      return () => media.revert()
    },
    { scope: panelRef },
  )

  return (
    <div
      ref={panelRef}
      className="relative w-full max-w-lg rounded-panel border border-hairline bg-scrim p-6 shadow-panel backdrop-blur-sm md:p-8"
    >
      <p data-eyebrow className="font-mono text-label uppercase tracking-widest text-mist">
        <span>{formatDepthRange(zone.depth.from, zone.depth.to)}</span>
        <span aria-hidden="true"> · </span>
        <span>{zone.scientificName}</span>
      </p>
      <h2
        id={headingId}
        data-zone-title
        data-focus-target
        tabIndex={-1}
        className="mt-3 font-display text-zone font-bold tracking-tight text-foam"
      >
        {zone.name}
      </h2>
      <p data-intro className="mt-4 text-lead leading-relaxed text-foam">
        {zone.intro}
      </p>
      <FactList facts={zone.facts} />
    </div>
  )
}
