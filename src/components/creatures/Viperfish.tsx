import ViperfishArt from '@/assets/svg/viperfish.svg?react'
import { artAccessibility } from '@/lib/art'
import type { CreatureArtProps } from '@/types/art'

export function Viperfish({ label, className }: CreatureArtProps) {
  return <ViperfishArt className={className} {...artAccessibility(label)} />
}
