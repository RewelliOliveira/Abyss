import { useRef } from 'react'
import { Footer } from '@/components/sections/Footer'
import { Hero } from '@/components/sections/Hero'
import { TrenchFloor } from '@/components/sections/TrenchFloor'
import { ZoneSection } from '@/components/sections/ZoneSection'
import { DiveHud } from '@/components/ui/DiveHud'
import { GlowFilters } from '@/components/ui/GlowFilters'
import { ParticleField } from '@/components/ui/ParticleField'
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
      <ParticleField />
      <DiveHud exitTargetId="credits" />
      <div ref={wrapperRef} id="smooth-wrapper" className="relative z-10">
        <div ref={contentRef} id="smooth-content">
          <main id="main">
            <Hero />
            {zones.map((zone) => (
              <ZoneSection key={zone.id} zone={zone} />
            ))}
            <TrenchFloor />
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}
