import { useCallback, useRef, useState } from 'react'
import { creatureArt } from '@/components/creatures/registry'
import { CreaturePopover } from '@/components/ui/CreaturePopover'
import { GlowHalo } from '@/components/ui/GlowHalo'
import { creatureProfiles, creatureTraits } from '@/data/creatures'
import { useCreaturePopover } from '@/hooks/useCreaturePopover'
import { measurePartAnchors, type Anchor } from '@/lib/svg-anchors'
import type { ArtLayer } from '@/types/art'
import type { CreaturePlacement } from '@/types/ocean'

interface CreatureActorProps {
  placement: CreaturePlacement
  layer: ArtLayer
}

function facesAgainstSwim(placement: CreaturePlacement): boolean {
  const { facing } = creatureTraits[placement.kind]
  if (facing === 'front') return false
  if (placement.swim !== 'left' && placement.swim !== 'right') return false
  return facing !== placement.swim
}


export function CreatureActor({ placement, layer }: CreatureActorProps) {
  const Art = creatureArt[placement.kind]
  const visibility = placement.desktopOnly ? 'hidden md:block' : ''
  const mirror = facesAgainstSwim(placement) ? '-scale-x-100' : ''
  const { glow } = creatureTraits[placement.kind]
  const profile = layer === 'body' ? creatureProfiles[placement.kind] : undefined
  const popoverId = `${placement.id}-profile`
  const artRef = useRef<HTMLDivElement>(null)
  const [haloAnchors, setHaloAnchors] = useState<Anchor[]>([])
  const { open, handlers } = useCreaturePopover()

  const measureGlow = useCallback(
    (art: HTMLDivElement | null) => {
      artRef.current = art
      const svg = art?.querySelector('svg')
      if (svg && glow) setHaloAnchors(measurePartAnchors(svg, glow.part, true))
    },
    [glow],
  )

  return (
    <div
      data-actor={placement.id}
      className={`absolute ${visibility}`}
      style={{ top: `${placement.top}%`, left: `${placement.left}%`, width: placement.width }}
    >
      <div data-ambient={placement.id}>
        <div
          data-turn
          tabIndex={profile ? (placement.label ? 0 : -1) : undefined}
          aria-describedby={profile ? popoverId : undefined}
          className={profile ? 'cursor-help rounded-panel [&_svg_*]:pointer-events-auto' : undefined}
          {...(profile ? handlers : {})}
        >
          <div ref={measureGlow} className={`relative ${mirror}`}>
            <Art label={layer === 'body' ? placement.label : undefined} className="block h-auto w-full" />
            {glow &&
              haloAnchors.map((anchor) => (
                <GlowHalo key={`${anchor.x}-${anchor.y}`} anchor={anchor} part={glow.part} color={glow.color} />
              ))}
          </div>
        </div>
      </div>
      {profile && <CreaturePopover id={popoverId} profile={profile} anchorRef={artRef} open={open} />}
    </div>
  )
}
