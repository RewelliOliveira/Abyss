import RedShrimpArt from '@/assets/svg/red-shrimp.svg?react'
import { artAccessibility } from '@/lib/art'
import type { CreatureArtProps } from '@/types/art'

export function RedShrimp({ label, className }: CreatureArtProps) {
  return <RedShrimpArt className={className} {...artAccessibility(label)} />
}
