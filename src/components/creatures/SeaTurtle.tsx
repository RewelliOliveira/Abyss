import SeaTurtleArt from '@/assets/svg/sea-turtle.svg?react'
import { artAccessibility } from '@/lib/art'
import type { CreatureArtProps } from '@/types/art'

export function SeaTurtle({ label, className }: CreatureArtProps) {
  return <SeaTurtleArt className={className} {...artAccessibility(label)} />
}
