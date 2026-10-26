import { useRef } from 'react'
import { Hero } from '@/components/sections/Hero'
import { ZoneSection } from '@/components/sections/ZoneSection'
import { GlowFilters } from '@/components/ui/GlowFilters'
import { InstrumentPanel } from '@/components/ui/InstrumentPanel'
import { zones } from '@/data/zones'
import { useLanternTracking } from '@/hooks/useLanternTracking'
import { useSmoothScroller } from '@/hooks/useSmoothScroller'

export default function App() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  useSmoothScroller(wrapperRef, contentRef)
  useLanternTracking()

  return (
    <>
      <GlowFilters />
      <InstrumentPanel />
      <div ref={wrapperRef} id="smooth-wrapper" className="relative z-10">
      <div ref={contentRef} id="smooth-content">
        <main id="main">
          <Hero />
          {zones.map((zone) => (
            <ZoneSection key={zone.id} zone={zone} />
          ))}
        </main>
      </div>
      </div>
    </>
  )
}
