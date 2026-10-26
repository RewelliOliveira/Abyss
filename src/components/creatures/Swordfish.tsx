import SwordfishArt from '@/assets/svg/swordfish.svg?react'
import { artAccessibility } from '@/lib/art'
import type { CreatureArtProps } from '@/types/art'

export function Swordfish({ label, className }: CreatureArtProps) {
  return <SwordfishArt className={className} {...artAccessibility(label)} />
}
