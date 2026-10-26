import { useRef } from 'react'
import { ZoneSection } from '@/components/sections/ZoneSection'
import { zones } from '@/data/zones'
import { useSmoothScroller } from '@/hooks/useSmoothScroller'

export default function App() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  useSmoothScroller(wrapperRef, contentRef)

  return (
    <div ref={wrapperRef} id="smooth-wrapper" className="relative z-10">
      <div ref={contentRef} id="smooth-content">
        <main id="main">
          {zones.map((zone) => (
            <ZoneSection key={zone.id} zone={zone} />
          ))}
        </main>
      </div>
    </div>
  )
}
