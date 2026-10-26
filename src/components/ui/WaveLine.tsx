const WAVE_PERIOD = 240
const WAVE_COUNT = 12
const WAVE_WIDTH = WAVE_PERIOD * WAVE_COUNT

function buildWavePath(): string {
  const crests = Array.from({ length: WAVE_COUNT * 2 - 1 }, (_, index) => `T ${(index + 2) * (WAVE_PERIOD / 2)} 30`)
  return `M0 30 Q ${WAVE_PERIOD / 4} 10 ${WAVE_PERIOD / 2} 30 ${crests.join(' ')} V 80 H 0 Z`
}

const WAVE_PATH = buildWavePath()

interface WaveLineProps {
  className?: string
}

export function WaveLine({ className = '' }: WaveLineProps) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-x-0 h-16 overflow-hidden ${className}`}>
      <svg
        data-wave="back"
        viewBox={`0 0 ${WAVE_WIDTH} 80`}
        preserveAspectRatio="none"
        className="absolute inset-y-0 left-0 h-full w-[200%] fill-sky-low opacity-60"
      >
        <path d={WAVE_PATH} />
      </svg>
      <svg
        data-wave="front"
        viewBox={`0 0 ${WAVE_WIDTH} 80`}
        preserveAspectRatio="none"
        className="absolute inset-y-0 left-0 h-full w-[200%] translate-y-2 fill-ocean-surface"
      >
        <path d={WAVE_PATH} />
      </svg>
    </div>
  )
}
