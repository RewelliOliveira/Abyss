import { useRef } from 'react'
import { CreatureLayer } from '@/components/ui/CreatureLayer'
import { ZonePanel } from '@/components/ui/ZonePanel'
import { useCreatureMotion } from '@/hooks/useCreatureMotion'
import { useZoneDepth } from '@/hooks/useZoneDepth'
import type { Zone } from '@/types/ocean'

interface ZoneSectionProps {
  zone: Zone
}

export function ZoneSection({ zone }: ZoneSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headingId = `${zone.id}-title`
  useZoneDepth(sectionRef, zone.depth)
  useCreatureMotion(sectionRef, zone.creatures)

  return (
    <section
      ref={sectionRef}
      id={zone.id}
      aria-labelledby={headingId}
      data-zone={zone.id}
      className={`relative isolate min-h-zone overflow-clip ${zone.backgroundClass}`}
    >
      <CreatureLayer creatures={zone.creatures} layer="body" className="z-0" />
      <div className="relative z-30 mx-auto flex max-w-content justify-end px-gutter py-section">
        <ZonePanel zone={zone} headingId={headingId} />
      </div>
    </section>
  )
}
