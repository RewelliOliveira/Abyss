import MantaRayArt from '@/assets/svg/manta-ray.svg?react'
import { artAccessibility } from '@/lib/art'
import type { CreatureArtProps } from '@/types/art'

export function MantaRay({ label, className }: CreatureArtProps) {
  return <MantaRayArt className={className} {...artAccessibility(label)} />
}
