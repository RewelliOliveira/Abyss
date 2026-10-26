import HydrothermalVentArt from '@/assets/svg/hydrothermal-vent.svg?react'
import { artAccessibility } from '@/lib/art'
import type { CreatureArtProps } from '@/types/art'

export function HydrothermalVent({ label, className }: CreatureArtProps) {
  return <HydrothermalVentArt className={className} {...artAccessibility(label)} />
}
