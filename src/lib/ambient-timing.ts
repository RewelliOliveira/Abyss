import { gsap } from '@/lib/gsap'
import type { Range } from '@/types/motion'

export type EaseFunction = (progress: number) => number

export function createRandom(seed: number): () => number {
  let state = Math.floor((seed + 1) * 2246822519) >>> 0 || 1
  return () => {
    state ^= state << 13
    state ^= state >>> 17
    state ^= state << 5
    return ((state >>> 0) % 1000003) / 1000003
  }
}

export function pickInRange(random: () => number, [min, max]: Range): number {
  return min + (max - min) * random()
}

export function easeNamed(name: string): EaseFunction {
  return gsap.parseEase(name) as EaseFunction
}

export interface Segment {
  from: number
  to: number
  start: number
  duration: number
  ease: EaseFunction
}

export function createSegment(from: number, to: number, start: number, duration: number, ease: EaseFunction): Segment {
  return { from, to, start, duration, ease }
}

export function segmentValue(segment: Segment, time: number): number {
  if (segment.duration <= 0) return segment.to
  const progress = Math.min(1, Math.max(0, (time - segment.start) / segment.duration))
  return segment.from + (segment.to - segment.from) * segment.ease(progress)
}

export function segmentDone(segment: Segment, time: number): boolean {
  return time >= segment.start + segment.duration
}
