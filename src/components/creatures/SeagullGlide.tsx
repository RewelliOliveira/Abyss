import SeagullGlideArt from '@/assets/svg/seagull-glide.svg?react'
import { artAccessibility } from '@/lib/art'
import type { CreatureArtProps } from '@/types/art'

export function SeagullGlide({ label, className }: CreatureArtProps) {
  return <SeagullGlideArt className={className} {...artAccessibility(label)} />
}
