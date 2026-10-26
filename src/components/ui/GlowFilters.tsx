import { GLOW_COLORS, glowFilterId } from '@/lib/glow'
import type { GlowColor } from '@/types/ocean'

const glowFloodClasses: Record<GlowColor, string> = {
  cyan: '[flood-color:var(--color-glow-cyan)]',
  pink: '[flood-color:var(--color-glow-pink)]',
}

export function GlowFilters() {
  return (
    <svg aria-hidden="true" focusable="false" className="absolute size-0 overflow-hidden">
      <defs>
        {GLOW_COLORS.map((color) => (
          <filter key={color} id={glowFilterId(color)} x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="14" result="blur" />
            <feFlood className={glowFloodClasses[color]} result="tint" />
            <feComposite in="tint" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        ))}
      </defs>
    </svg>
  )
}
