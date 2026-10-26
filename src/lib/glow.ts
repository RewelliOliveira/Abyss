import type { GlowColor } from '@/types/ocean'

export const GLOW_COLORS: GlowColor[] = ['cyan', 'pink']

export function glowFilterId(color: GlowColor): string {
  return `glow-${color}`
}

export function glowFilterUrl(color: GlowColor): string {
  return `url(#${glowFilterId(color)})`
}
