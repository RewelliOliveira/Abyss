import FishArt from '@/assets/svg/fish.svg?react'
import { artAccessibility } from '@/lib/art'
import type { CreatureArtProps } from '@/types/art'

export function Fish({ label, className }: CreatureArtProps) {
  return <FishArt className={className} {...artAccessibility(label)} />
}
