import DolphinArt from '@/assets/svg/dolphin.svg?react'
import { artAccessibility } from '@/lib/art'
import type { CreatureArtProps } from '@/types/art'

export function Dolphin({ label, className }: CreatureArtProps) {
  return <DolphinArt className={className} {...artAccessibility(label)} />
}
