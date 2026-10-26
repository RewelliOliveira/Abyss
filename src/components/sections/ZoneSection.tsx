import { useRef } from 'react'
import { CreatureLayer } from '@/components/ui/CreatureLayer'
import { Lantern } from '@/components/ui/Lantern'
import { ZonePanel } from '@/components/ui/ZonePanel'
import { useCreatureMotion } from '@/hooks/useCreatureMotion'
import { useZoneDepth } from '@/hooks/useZoneDepth'
import { creatureTraits } from '@/data/creatures'
import type { Zone } from '@/types/ocean'

interface ZoneSectionProps {
  zone: Zone
}

export function ZoneSection({ zone }: ZoneSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headingId = `${zone.id}-title`
  useZoneDepth(sectionRef, zone.depth)
  useCreatureMotion(sectionRef, zone.creatures)
  const glowingCreatures = zone.creatures.filter((placement) => creatureTraits[placement.kind].glow)

  return (
    <section
      ref={sectionRef}
      id={zone.id}
      aria-labelledby={headingId}
      data-zone={zone.id}
      className={`relative isolate min-h-zone overflow-clip ${zone.backgroundClass}`}
    >
      <CreatureLayer creatures={zone.creatures} layer="body" className="z-0" />
      {zone.dark && (
        <>
          <div className="absolute inset-0 z-10">
            <Lantern fadeIn={zone.id === 'midnight'} />
          </div>
          <CreatureLayer creatures={glowingCreatures} layer="glow" className="z-20" />
        </>
      )}
      <div className="relative z-30 mx-auto flex max-w-content justify-end px-gutter py-section">
        <ZonePanel zone={zone} headingId={headingId} />
      </div>
    </section>
  )
}
