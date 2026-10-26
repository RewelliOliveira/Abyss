import BigfinSquidArt from '@/assets/svg/bigfin-squid.svg?react'
import { artAccessibility } from '@/lib/art'
import type { CreatureArtProps } from '@/types/art'

export function BigfinSquid({ label, className }: CreatureArtProps) {
  return <BigfinSquidArt className={className} {...artAccessibility(label)} />
}
