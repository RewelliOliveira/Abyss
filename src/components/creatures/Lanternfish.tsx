import LanternfishArt from '@/assets/svg/lanternfish.svg?react'
import { artAccessibility } from '@/lib/art'
import type { CreatureArtProps } from '@/types/art'

export function Lanternfish({ label, className }: CreatureArtProps) {
  return <LanternfishArt className={className} {...artAccessibility(label)} />
}
