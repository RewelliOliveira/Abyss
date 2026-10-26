import GulperEelArt from '@/assets/svg/gulper-eel.svg?react'
import { artAccessibility } from '@/lib/art'
import type { CreatureArtProps } from '@/types/art'

export function GulperEel({ label, className }: CreatureArtProps) {
  return <GulperEelArt className={className} {...artAccessibility(label)} />
}
