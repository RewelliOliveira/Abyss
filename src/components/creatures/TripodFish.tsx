import TripodFishArt from '@/assets/svg/tripod-fish.svg?react'
import { artAccessibility } from '@/lib/art'
import type { CreatureArtProps } from '@/types/art'

export function TripodFish({ label, className }: CreatureArtProps) {
  return <TripodFishArt className={className} {...artAccessibility(label)} />
}
