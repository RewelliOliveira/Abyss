import SunArt from '@/assets/svg/sun.svg?react'
import { artAccessibility } from '@/lib/art'
import type { CreatureArtProps } from '@/types/art'

export function Sun({ label, className }: CreatureArtProps) {
  return <SunArt className={className} {...artAccessibility(label)} />
}
