import SeagullDownArt from '@/assets/svg/seagull-down.svg?react'
import { artAccessibility } from '@/lib/art'
import type { CreatureArtProps } from '@/types/art'

export function SeagullDown({ label, className }: CreatureArtProps) {
  return <SeagullDownArt className={className} {...artAccessibility(label)} />
}
