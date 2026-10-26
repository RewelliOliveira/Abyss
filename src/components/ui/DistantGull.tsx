const WING_PATHS = {
  up: 'M2 13 Q 10 1 20 10 Q 30 1 38 13',
  down: 'M2 5 Q 10 15 20 10 Q 30 15 38 5',
  glide: 'M2 9 Q 10 6 20 10 Q 30 6 38 9',
} as const

export function DistantGull() {
  return (
    <svg viewBox="0 0 40 16" aria-hidden="true" className="block h-auto w-full overflow-visible">
      {Object.entries(WING_PATHS).map(([pose, path]) => (
        <path
          key={pose}
          data-pose={pose}
          d={path}
          className={`fill-none stroke-ink/35 [stroke-linecap:round] [stroke-width:2.5] ${pose === 'glide' ? '' : 'opacity-0'}`}
        />
      ))}
    </svg>
  )
}
