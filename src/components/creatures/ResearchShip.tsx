import ResearchShipArt from '@/assets/svg/research-ship.svg?react'
import { artAccessibility } from '@/lib/art'
import type { CreatureArtProps } from '@/types/art'

export function ResearchShip({ label, className }: CreatureArtProps) {
  return <ResearchShipArt className={className} {...artAccessibility(label)} />
}
