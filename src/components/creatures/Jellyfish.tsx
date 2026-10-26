import JellyfishArt from '@/assets/svg/jellyfish.svg?react'
import { artAccessibility } from '@/lib/art'
import type { CreatureArtProps } from '@/types/art'

export function Jellyfish({ label, className }: CreatureArtProps) {
  return <JellyfishArt className={className} {...artAccessibility(label)} />
}
