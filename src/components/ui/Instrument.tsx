import type { Ref } from 'react'

interface InstrumentProps {
  label: string
  shortLabel: string
  valueRef: Ref<HTMLSpanElement>
  detailRef: Ref<HTMLSpanElement>
  className?: string
}

export function Instrument({ label, shortLabel, valueRef, detailRef, className = '' }: InstrumentProps) {
  return (
    <div className={`flex min-w-0 flex-col ${className}`}>
      <dt className="font-mono text-2xs uppercase tracking-wider text-mist md:tracking-widest">
        <span aria-hidden="true" className="md:hidden">
          {shortLabel}
        </span>
        <span className="sr-only md:not-sr-only">{label}</span>
      </dt>
      <dd className="flex flex-col">
        <span
          ref={valueRef}
          className="truncate font-mono text-label font-medium tabular-nums text-foam md:text-lead"
        />
        <span ref={detailRef} className="truncate font-mono text-2xs tabular-nums text-mist" />
      </dd>
    </div>
  )
}
