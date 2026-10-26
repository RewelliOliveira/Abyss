import type { Anchor } from '@/lib/svg-anchors'
import type { GlowColor } from '@/types/ocean'

interface GlowHaloProps {
  anchor: Anchor
  part: string
  color: GlowColor
  spread?: number
}

const haloColors: Record<GlowColor, string> = {
  cyan: 'bg-[radial-gradient(circle,var(--color-glow-cyan)_0%,color-mix(in_srgb,var(--color-glow-cyan)_35%,transparent)_30%,transparent_68%)]',
  pink: 'bg-[radial-gradient(circle,var(--color-glow-pink)_0%,color-mix(in_srgb,var(--color-glow-pink)_35%,transparent)_30%,transparent_68%)]',
}

export function GlowHalo({ anchor, part, color, spread = 4 }: GlowHaloProps) {
  const diameter = anchor.size * spread
  return (
    <span
      data-halo={part}
      aria-hidden="true"
      className={`pointer-events-none absolute aspect-square -translate-1/2 rounded-pill mix-blend-screen ${haloColors[color]}`}
      style={{ left: `${anchor.x}%`, top: `${anchor.y}%`, width: `${diameter}%` }}
    />
  )
}
