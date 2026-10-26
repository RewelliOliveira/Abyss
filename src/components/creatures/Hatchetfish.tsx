import HatchetfishArt from '@/assets/svg/hatchetfish.svg?react'
import { artAccessibility } from '@/lib/art'
import type { CreatureArtProps } from '@/types/art'

export function Hatchetfish({ label, className }: CreatureArtProps) {
  return <HatchetfishArt className={className} {...artAccessibility(label)} />
}
