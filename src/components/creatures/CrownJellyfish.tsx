import CrownJellyfishArt from '@/assets/svg/crown-jellyfish.svg?react'
import { artAccessibility } from '@/lib/art'
import type { CreatureArtProps } from '@/types/art'

export function CrownJellyfish({ label, className }: CreatureArtProps) {
  return <CrownJellyfishArt className={className} {...artAccessibility(label)} />
}
