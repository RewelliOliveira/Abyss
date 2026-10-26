import GiantIsopodArt from '@/assets/svg/giant-isopod.svg?react'
import { artAccessibility } from '@/lib/art'
import type { CreatureArtProps } from '@/types/art'

export function GiantIsopod({ label, className }: CreatureArtProps) {
  return <GiantIsopodArt className={className} {...artAccessibility(label)} />
}
