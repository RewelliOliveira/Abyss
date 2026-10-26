import GrenadierArt from '@/assets/svg/grenadier.svg?react'
import { artAccessibility } from '@/lib/art'
import type { CreatureArtProps } from '@/types/art'

export function Grenadier({ label, className }: CreatureArtProps) {
  return <GrenadierArt className={className} {...artAccessibility(label)} />
}
