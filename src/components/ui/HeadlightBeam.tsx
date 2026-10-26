import { useId } from 'react'
import type { Anchor } from '@/lib/svg-anchors'

interface HeadlightBeamProps {
  anchor: Anchor
}

export function HeadlightBeam({ anchor }: HeadlightBeamProps) {
  const gradientId = `beam-${useId().replace(/[^a-zA-Z0-9]/g, '')}`

  return (
    <svg
      data-headlight-beam
      aria-hidden="true"
      viewBox="0 0 400 200"
      preserveAspectRatio="none"
      className="pointer-events-none absolute h-[110%] w-[300%] origin-left -translate-y-1/2"
      style={{ left: `${anchor.x}%`, top: `${anchor.y}%` }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" className="[stop-color:var(--color-foam)] [stop-opacity:0.45]" />
          <stop offset="0.4" className="[stop-color:var(--color-glow-cyan)] [stop-opacity:0.14]" />
          <stop offset="1" className="[stop-color:var(--color-glow-cyan)] [stop-opacity:0]" />
        </linearGradient>
      </defs>
      <polygon points="0,92 0,108 400,200 400,0" fill={`url(#${gradientId})`} />
    </svg>
  )
}
