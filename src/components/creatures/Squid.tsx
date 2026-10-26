import SquidArt from '@/assets/svg/squid.svg?react'
import { artAccessibility } from '@/lib/art'
import type { CreatureArtProps } from '@/types/art'

export function Squid({ label, className }: CreatureArtProps) {
  return <SquidArt className={className} {...artAccessibility(label)} />
}
