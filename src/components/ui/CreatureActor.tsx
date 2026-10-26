import { creatureArt } from '@/components/creatures/registry'
import { VentPlumes } from '@/components/ui/VentPlumes'
import { creatureTraits } from '@/data/creatures'
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
  const showPlumes = layer === 'body' && placement.kind === 'hydrothermal-vent'

  return (
    <div
      data-actor={placement.id}
      className={`absolute ${visibility}`}
      style={{ top: `${placement.top}%`, left: `${placement.left}%`, width: placement.width }}
    >
      <div data-float>
        <div className={`relative ${mirror}`}>
          <Art label={layer === 'body' ? placement.label : undefined} className="block h-auto w-full" />
          {showPlumes && <VentPlumes />}
        </div>
      </div>
    </div>
  )
}
