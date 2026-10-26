import HammerheadSharkArt from '@/assets/svg/hammerhead-shark.svg?react'
import { artAccessibility } from '@/lib/art'
import type { CreatureArtProps } from '@/types/art'

export function HammerheadShark({ label, className }: CreatureArtProps) {
  return <HammerheadSharkArt className={className} {...artAccessibility(label)} />
}
