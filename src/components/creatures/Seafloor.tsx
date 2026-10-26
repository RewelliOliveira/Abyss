import SeafloorArt from '@/assets/svg/seafloor.svg?react'
import { artAccessibility } from '@/lib/art'
import type { CreatureArtProps } from '@/types/art'

export function Seafloor({ label, className }: CreatureArtProps) {
  return <SeafloorArt className={className} {...artAccessibility(label)} />
}
