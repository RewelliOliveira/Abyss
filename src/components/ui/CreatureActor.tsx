import { useCallback, useRef, useState, type CSSProperties } from 'react'
import { creatureArt } from '@/components/creatures/registry'
import { CreaturePopover } from '@/components/ui/CreaturePopover'
import { GlowHalo } from '@/components/ui/GlowHalo'
import { creatureProfiles, creatureTraits } from '@/data/creatures'
import { useCreaturePopover } from '@/hooks/useCreaturePopover'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { MEDIA } from '@/lib/motion'
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

function actorPosition({ top, left, width, mobile }: CreaturePlacement): CSSProperties {
  return {
    '--actor-top': `${top}%`,
    '--actor-left': `${left}%`,
    '--actor-width': width,
    '--actor-top-mobile': `${mobile?.top ?? top}%`,
    '--actor-left-mobile': `${mobile?.left ?? left}%`,
    '--actor-width-mobile': mobile?.width ?? width,
  } as CSSProperties
}

export function CreatureActor({ placement, layer }: CreatureActorProps) {
  const Art = creatureArt[placement.kind]
  const visibility = placement.desktopOnly ? 'hidden md:block' : ''
  const mirror = facesAgainstSwim(placement) ? '-scale-x-100' : ''
  const { glow } = creatureTraits[placement.kind]
  const hasPointer = useMediaQuery(MEDIA.finePointer)
  const profile = layer === 'body' && hasPointer ? creatureProfiles[placement.kind] : undefined
  const popoverId = `${placement.id}-profile`
  const artRef = useRef<HTMLDivElement>(null)
  const [haloAnchors, setHaloAnchors] = useState<Anchor[]>([])
  const { open, handlers } = useCreaturePopover()

  const measureGlow = useCallback(
    (art: HTMLDivElement | null) => {
      artRef.current = art
      const svg = art?.querySelector('svg')
      if (svg && glow) setHaloAnchors(measurePartAnchors(svg, glow.part, !glow.scattered))
    },
    [glow],
  )

  return (
    <div
      data-actor={placement.id}
      className={`absolute top-(--actor-top-mobile) left-(--actor-left-mobile) w-(--actor-width-mobile) md:top-(--actor-top) md:left-(--actor-left) md:w-(--actor-width) ${visibility}`}
      style={actorPosition(placement)}
    >
      <div data-ambient={placement.id}>
        <div
          data-turn
          aria-describedby={profile ? popoverId : undefined}
          className={profile ? '[&_svg_*]:pointer-events-auto' : undefined}
          {...(profile ? handlers : {})}
        >
          <div ref={measureGlow} className={`relative ${mirror}`}>
            <Art label={layer === 'body' ? placement.label : undefined} className="block h-auto w-full" />
            {glow &&
              haloAnchors.map((anchor) => (
                <GlowHalo key={`${anchor.x}-${anchor.y}`} anchor={anchor} part={glow.part} color={glow.color} spread={glow.spread} />
              ))}
          </div>
        </div>
      </div>
      {profile && <CreaturePopover id={popoverId} profile={profile} anchorRef={artRef} open={open} />}
    </div>
  )
}
