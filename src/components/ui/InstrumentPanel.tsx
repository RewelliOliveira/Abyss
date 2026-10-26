import { useCallback, useRef } from 'react'
import { Instrument } from '@/components/ui/Instrument'
import { instrumentLabels, instrumentShortLabels } from '@/data/instruments'
import { useDepth } from '@/hooks/useDepth'
import { gsap, useGSAP } from '@/lib/gsap'
import { MEDIA, MOTION } from '@/lib/motion'
import { readoutAtDepth, type Readout } from '@/lib/readout'

type ReadoutKey = keyof Readout

export function InstrumentPanel() {
  const panelRef = useRef<HTMLElement>(null)
  const fields = useRef<Partial<Record<ReadoutKey, HTMLSpanElement | null>>>({})

  const bind = useCallback(
    (key: ReadoutKey) => (element: HTMLSpanElement | null) => {
      fields.current[key] = element
    },
    [],
  )

  const showReadout = useCallback((depth: number) => {
    const readout = readoutAtDepth(depth)
    for (const [key, text] of Object.entries(readout) as [ReadoutKey, string][]) {
      const element = fields.current[key]
      if (element && element.textContent !== text) element.textContent = text
    }
  }, [])

  useDepth(showReadout)

  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add(MEDIA.motionOk, () => {
        gsap.from(panelRef.current, {
          autoAlpha: 0,
          y: MOTION.dist / 2,
          duration: MOTION.dur,
          ease: MOTION.ease,
          scrollTrigger: { trigger: document.getElementById('surface'), start: 'top+=40% top', toggleActions: 'play none none reverse' },
        })
      })
      return () => media.revert()
    },
    { scope: panelRef },
  )

  return (
    <aside
      ref={panelRef}
      aria-label={instrumentLabels.panel}
      className="pointer-events-none fixed inset-x-3 bottom-3 z-40 rounded-panel border border-hairline bg-panel px-4 py-3 shadow-panel md:inset-x-auto md:bottom-6 md:left-6 md:w-72 md:px-5 md:py-4"
    >
      <p className="flex items-baseline justify-between gap-2 border-b border-hairline pb-2 font-mono text-2xs uppercase tracking-widest text-mist">
        <span>{instrumentLabels.zone}</span>
        <span ref={bind('zone')} className="truncate text-glow-cyan" />
      </p>
      <dl className="mt-2 grid grid-cols-4 gap-x-3 md:grid-cols-2 md:gap-y-3">
        <Instrument
          label={instrumentLabels.depth}
          shortLabel={instrumentShortLabels.depth}
          valueRef={bind('depth')}
          detailRef={bind('depthDetail')}
        />
        <Instrument
          label={instrumentLabels.pressure}
          shortLabel={instrumentShortLabels.pressure}
          valueRef={bind('pressure')}
          detailRef={bind('pressureDetail')}
        />
        <Instrument
          label={instrumentLabels.temperature}
          shortLabel={instrumentShortLabels.temperature}
          valueRef={bind('temperature')}
          detailRef={bind('temperatureDetail')}
        />
        <Instrument
          label={instrumentLabels.light}
          shortLabel={instrumentShortLabels.light}
          valueRef={bind('light')}
          detailRef={bind('lightDetail')}
        />
      </dl>
    </aside>
  )
}
