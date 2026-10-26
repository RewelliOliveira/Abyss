import { useRef, type RefObject } from 'react'
import { creatureProfileLabels } from '@/data/creatures'
import { formatDepthRange, formatInteger, formatLength } from '@/lib/format'
import { gsap, useGSAP } from '@/lib/gsap'
import { MEDIA, MOTION } from '@/lib/motion'
import { metersToFeet } from '@/lib/ocean-physics'
import type { CreatureProfile } from '@/types/ocean'

interface CreaturePopoverProps {
  id: string
  profile: CreatureProfile
  anchorRef: RefObject<HTMLElement | null>
  open: boolean
}

function popoverPosition(anchor: DOMRect, popover: HTMLElement): { x: number; y: number } {
  const edge = MOTION.popoverEdge
  const width = popover.offsetWidth
  const height = popover.offsetHeight
  const centeredX = anchor.left + anchor.width / 2 - width / 2
  const x = gsap.utils.clamp(edge, Math.max(edge, window.innerWidth - width - edge), centeredX)
  const above = anchor.top - height - MOTION.popoverGap
  const below = anchor.bottom + MOTION.popoverGap
  const y = above >= edge ? above : Math.min(below, window.innerHeight - height - edge)
  return { x, y }
}

export function CreaturePopover({ id, profile, anchorRef, open }: CreaturePopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const popover = popoverRef.current
      const anchor = anchorRef.current
      if (!popover || !anchor || !open) return
      popover.showPopover()
      const setX = gsap.quickSetter(popover, 'x', 'px')
      const setY = gsap.quickSetter(popover, 'y', 'px')

      function followAnchor() {
        if (!popover || !anchor) return
        const { x, y } = popoverPosition(anchor.getBoundingClientRect(), popover)
        setX(x)
        setY(y)
      }

      followAnchor()
      gsap.ticker.add(followAnchor)
      const media = gsap.matchMedia()
      media.add(MEDIA.motionOk, () => {
        gsap.from(popover, { autoAlpha: 0, duration: MOTION.popoverFade, ease: MOTION.ease })
      })

      return () => {
        gsap.ticker.remove(followAnchor)
        media.revert()
        popover.hidePopover()
      }
    },
    { scope: popoverRef, dependencies: [open] },
  )

  return (
    <div
      ref={popoverRef}
      id={id}
      popover="manual"
      role="tooltip"
      className="pointer-events-none fixed inset-auto left-0 top-0 m-0 w-72 max-w-[calc(100vw-2rem)] rounded-panel border border-hairline bg-panel p-5 text-left text-foam shadow-panel"
    >
      <p className="font-display text-lead font-bold tracking-tight">{profile.name}</p>
      <p className="mt-1 text-label italic text-mist">{profile.scientificName}</p>
      <dl className="mt-4 grid grid-cols-2 gap-4 border-t border-hairline pt-4">
        <div className="flex flex-col">
          <dt className="font-mono text-2xs uppercase tracking-widest text-mist">{creatureProfileLabels.length}</dt>
          <dd className="font-mono text-label tabular-nums">{formatLength(profile.maxLength, 'm')}</dd>
          <dd className="font-mono text-2xs tabular-nums text-mist">
            {formatLength(metersToFeet(profile.maxLength), 'ft')}
          </dd>
        </div>
        <div className="flex flex-col">
          <dt className="font-mono text-2xs uppercase tracking-widest text-mist">{creatureProfileLabels.depth}</dt>
          <dd className="font-mono text-label tabular-nums">
            {formatDepthRange(profile.depth.from, profile.depth.to)}
          </dd>
          <dd className="font-mono text-2xs tabular-nums text-mist">
            {formatInteger(metersToFeet(profile.depth.from))}–{formatInteger(metersToFeet(profile.depth.to))} ft
          </dd>
        </div>
      </dl>
      <p className="mt-4 text-label leading-relaxed">{profile.fact}</p>
    </div>
  )
}
