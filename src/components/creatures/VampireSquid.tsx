import VampireSquidArt from '@/assets/svg/vampire-squid.svg?react'
import { artAccessibility } from '@/lib/art'
import type { CreatureArtProps } from '@/types/art'

export function VampireSquid({ label, className }: CreatureArtProps) {
  return <VampireSquidArt className={className} {...artAccessibility(label)} />
}
