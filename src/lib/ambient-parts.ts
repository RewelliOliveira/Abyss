import { gsap } from '@/lib/gsap'
import { createNoise1D } from '@/lib/noise'
import { createRandom, pickInRange } from '@/lib/ambient-timing'
import type { AmbientAgent } from '@/lib/ambient-body'
import type { PartPreset } from '@/types/motion'

type Setter = (value: number) => void

function settersFor(elements: Element[], property: string, unit?: string): Setter {
  const setters = elements.map((element) => gsap.quickSetter(element, property, unit) as Setter)
  return (value) => setters.forEach((set) => set(value))
}

const HALO_LOOKUP_INTERVAL = 0.5

function opacityTargets(scope: Element, shapes: Element[], part: string) {
  let setter = settersFor(shapes, 'opacity')
  let haloCount = 0
  let lastLookup = -Infinity
  return (time: number, value: number) => {
    if (haloCount === 0 && time - lastLookup > HALO_LOOKUP_INTERVAL) {
      lastLookup = time
      const halos = Array.from(scope.querySelectorAll(`[data-halo="${part}"]`))
      if (halos.length) {
        haloCount = halos.length
        setter = settersFor([...shapes, ...halos], 'opacity')
      }
    }
    setter(value)
  }
}

const BLINK_LENGTH = 0.18
const BLINK_DEPTH = 0.75

function blinkLevel(random: () => number, preset: PartPreset) {
  let nextBlink = pickInRange(random, preset.cycle)
  let blinkStart = -1
  return (time: number) => {
    if (time >= nextBlink) {
      blinkStart = time
      nextBlink = time + pickInRange(random, preset.cycle) * (random() > 0.7 ? 0.25 : 1)
    }
    const since = time - blinkStart
    if (blinkStart < 0 || since > BLINK_LENGTH) return 1
    return 1 - Math.sin((since / BLINK_LENGTH) * Math.PI) * BLINK_DEPTH
  }
}

export function createPartAgent(scope: Element, preset: PartPreset, seed: number): AmbientAgent | null {
  const shapes = Array.from(scope.querySelectorAll(`[data-part="${preset.part}"]`))
  const glows = preset.motion === 'blink' || preset.motion === 'flicker'
  if (!shapes.length && !glows) return null
  const random = createRandom(seed)
  const cycle = pickInRange(random, preset.cycle)
  const phase = random() * Math.PI * 2 - (preset.lag ?? 0)
  const shimmer = createNoise1D(seed + 3)
  if (preset.origin) gsap.set(shapes, { transformOrigin: preset.origin })

  switch (preset.motion) {
    case 'wag':
    case 'flap': {
      const setRotation = settersFor(shapes, 'rotation', 'deg')
      const sharpness = preset.motion === 'flap' ? 1.6 : 1
      return {
        update(time) {
          const wave = Math.sin((time / cycle) * Math.PI * 2 + phase)
          setRotation(Math.sign(wave) * Math.abs(wave) ** sharpness * preset.amount)
        },
      }
    }
    case 'sway': {
      const setSkew = settersFor(shapes, 'skewX', 'deg')
      return {
        update(time) {
          const wave = Math.sin((time / cycle) * Math.PI * 2 + phase)
          setSkew((wave * 0.75 + shimmer(time * 0.4) * 0.5) * preset.amount)
        },
      }
    }
    case 'spin': {
      const setScaleY = settersFor(shapes, 'scaleY')
      return {
        update(time) {
          setScaleY(preset.amount + (1 - preset.amount) * Math.abs(Math.cos((time / cycle) * Math.PI)))
        },
      }
    }
    case 'blink': {
      const setOpacity = opacityTargets(scope, shapes, preset.part)
      const level = blinkLevel(random, preset)
      return {
        update(time) {
          const glow = 1 - preset.amount * (0.5 + shimmer(time * 0.8) * 0.5)
          setOpacity(time, glow * level(time))
        },
      }
    }
    case 'turn': {
      const setRotation = settersFor(shapes, 'rotation', 'deg')
      const direction = random() > 0.5 ? 1 : -1
      return {
        update(time) {
          setRotation(((time * preset.amount * direction) / cycle) % 360)
        },
      }
    }
    case 'breathe': {
      const setScale = settersFor(shapes, 'scale')
      return {
        update(time) {
          const wave = Math.sin((time / cycle) * Math.PI * 2 + phase)
          setScale(1 + (wave * 0.7 + shimmer(time * 0.2) * 0.3) * preset.amount)
        },
      }
    }
    case 'flicker': {
      const setOpacity = opacityTargets(scope, shapes, preset.part)
      return {
        update(time) {
          setOpacity(time, 1 - preset.amount * (0.5 + shimmer(time * 3) * 0.5))
        },
      }
    }
  }
}
