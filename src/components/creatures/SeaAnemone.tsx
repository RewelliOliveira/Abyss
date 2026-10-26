import SeaAnemoneArt from '@/assets/svg/sea-anemone.svg?react'
import { artAccessibility } from '@/lib/art'
import type { CreatureArtProps } from '@/types/art'

export function SeaAnemone({ label, className }: CreatureArtProps) {
  return <SeaAnemoneArt className={className} {...artAccessibility(label)} />
}
