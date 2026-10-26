import { CreatureActor } from '@/components/ui/CreatureActor'
import type { ArtLayer } from '@/types/art'
import type { CreaturePlacement } from '@/types/ocean'

interface CreatureLayerProps {
  creatures: CreaturePlacement[]
  layer: ArtLayer
  className?: string
}

export function CreatureLayer({ creatures, layer, className = '' }: CreatureLayerProps) {
  return (
    <div
      data-art-layer={layer}
      aria-hidden={layer === 'glow' ? true : undefined}
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      {creatures.map((placement) => (
        <CreatureActor key={placement.id} placement={placement} layer={layer} />
      ))}
    </div>
  )
}
