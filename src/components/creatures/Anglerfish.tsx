import AnglerfishArt from '@/assets/svg/anglerfish.svg?react'
import { artAccessibility } from '@/lib/art'
import type { CreatureArtProps } from '@/types/art'

export function Anglerfish({ label, className }: CreatureArtProps) {
  return <AnglerfishArt className={className} {...artAccessibility(label)} />
}
