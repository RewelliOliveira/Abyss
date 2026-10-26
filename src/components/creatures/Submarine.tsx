import SubmarineArt from '@/assets/svg/submarine.svg?react'
import { artAccessibility } from '@/lib/art'
import type { CreatureArtProps } from '@/types/art'

export function Submarine({ label, className }: CreatureArtProps) {
  return <SubmarineArt className={className} {...artAccessibility(label)} />
}
