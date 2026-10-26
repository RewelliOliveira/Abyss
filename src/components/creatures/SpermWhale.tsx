import SpermWhaleArt from '@/assets/svg/sperm-whale.svg?react'
import { artAccessibility } from '@/lib/art'
import type { CreatureArtProps } from '@/types/art'

export function SpermWhale({ label, className }: CreatureArtProps) {
  return <SpermWhaleArt className={className} {...artAccessibility(label)} />
}
