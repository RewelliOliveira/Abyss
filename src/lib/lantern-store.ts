import { gsap } from '@/lib/gsap'
import { MOTION } from '@/lib/motion'

interface Point {
  x: number
  y: number
}

const target: Point = { x: 0, y: 0 }
const position: Point = { x: 0, y: 0 }
let usesTouch = false
let recenter: gsap.core.Tween | null = null

function centerOfViewport(): Point {
  return { x: window.innerWidth / 2, y: window.innerHeight / 2 }
}

function aimAt(point: Point): void {
  target.x = point.x
  target.y = point.y
}

function aimAtCenter(): void {
  aimAt(centerOfViewport())
}

function handlePointer(event: PointerEvent): void {
  if (event.pointerType !== 'mouse') return
  usesTouch = false
  aimAt({ x: event.clientX, y: event.clientY })
}

function handleTap(event: PointerEvent): void {
  if (event.pointerType === 'mouse') return
  usesTouch = true
  aimAt({ x: event.clientX, y: event.clientY })
  recenter?.kill()
  recenter = gsap.delayedCall(MOTION.lanternRecenterDelay, aimAtCenter)
}

function handleResize(): void {
  if (usesTouch || (target.x === 0 && target.y === 0)) aimAtCenter()
}

function easeTowardTarget(): void {
  const follow = 1 - Math.pow(1 - MOTION.lanternFollow, gsap.ticker.deltaRatio())
  position.x += (target.x - position.x) * follow
  position.y += (target.y - position.y) * follow
}

export function getLanternPosition(): Point {
  return position
}

export function startLanternTracking(): () => void {
  const center = centerOfViewport()
  aimAt(center)
  position.x = center.x
  position.y = center.y
  window.addEventListener('pointermove', handlePointer, { passive: true })
  window.addEventListener('pointerdown', handlePointer, { passive: true })
  window.addEventListener('pointerup', handleTap, { passive: true })
  window.addEventListener('resize', handleResize)
  gsap.ticker.add(easeTowardTarget)
  return () => {
    window.removeEventListener('pointermove', handlePointer)
    window.removeEventListener('pointerdown', handlePointer)
    window.removeEventListener('pointerup', handleTap)
    window.removeEventListener('resize', handleResize)
    gsap.ticker.remove(easeTowardTarget)
    recenter?.kill()
    recenter = null
  }
}
