import SnailfishArt from '@/assets/svg/snailfish.svg?react'
import { artAccessibility } from '@/lib/art'
import type { CreatureArtProps } from '@/types/art'

export function Snailfish({ label, className }: CreatureArtProps) {
  return <SnailfishArt className={className} {...artAccessibility(label)} />
}
