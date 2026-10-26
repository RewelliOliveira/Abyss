import SeagullUpArt from '@/assets/svg/seagull-up.svg?react'
import { artAccessibility } from '@/lib/art'
import type { CreatureArtProps } from '@/types/art'

export function SeagullUp({ label, className }: CreatureArtProps) {
  return <SeagullUpArt className={className} {...artAccessibility(label)} />
}
