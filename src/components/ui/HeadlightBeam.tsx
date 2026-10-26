export function HeadlightBeam() {
  return (
    <svg
      data-headlight-beam
      aria-hidden="true"
      viewBox="0 0 400 200"
      preserveAspectRatio="none"
      className="pointer-events-none absolute left-[88%] top-[2%] h-[150%] w-[320%] -translate-y-1/4 opacity-0"
    >
      <defs>
        <linearGradient id="headlight-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" className="[stop-color:var(--color-foam)] [stop-opacity:0.42]" />
          <stop offset="0.45" className="[stop-color:var(--color-glow-cyan)] [stop-opacity:0.12]" />
          <stop offset="1" className="[stop-color:var(--color-glow-cyan)] [stop-opacity:0]" />
        </linearGradient>
      </defs>
      <polygon points="0,70 0,96 400,200 400,0" fill="url(#headlight-gradient)" />
    </svg>
  )
}
