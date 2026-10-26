import { useRef } from 'react'
import { CreatureLayer } from '@/components/ui/CreatureLayer'
import { Lantern } from '@/components/ui/Lantern'
import { ZonePanel } from '@/components/ui/ZonePanel'
import { useCreatureReveal } from '@/hooks/useCreatureReveal'
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
  useCreatureReveal(sectionRef, zone.creatures)
  const glowingCreatures = zone.creatures.filter((placement) => creatureTraits[placement.kind].glow)

  return (
    <section
      ref={sectionRef}
      id={zone.id}
      aria-labelledby={headingId}
      data-zone={zone.id}
      className={`relative isolate -mb-px flex flex-col overflow-clip md:block md:min-h-zone ${zone.backgroundClass}`}
    >
      {zone.dark && (
        <div className="pointer-events-none absolute inset-0 z-10">
          <Lantern fadeIn={zone.id === 'midnight'} />
        </div>
      )}
      <div className="pointer-events-none relative z-30 mx-auto flex w-full max-w-content justify-end px-gutter pb-10 pt-section md:py-section">
        <ZonePanel zone={zone} headingId={headingId} />
      </div>
      <div data-stage className="pointer-events-none relative h-stage md:absolute md:inset-0 md:h-auto">
        <CreatureLayer creatures={zone.creatures} layer="body" className="z-0" />
        {zone.dark && <CreatureLayer creatures={glowingCreatures} layer="glow" className="z-20" />}
      </div>
    </section>
  )
}
