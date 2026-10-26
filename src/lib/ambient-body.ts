import { gsap } from '@/lib/gsap'
import { createNoise1D } from '@/lib/noise'
import {
  createRandom,
  createSegment,
  easeNamed,
  pickInRange,
  segmentDone,
  segmentValue,
  type Segment,
} from '@/lib/ambient-timing'
import type {
  BodyPreset,
  CrawlPreset,
  JetPreset,
  PulsePreset,
  RockPreset,
  SchoolPreset,
  SwayPreset,
  TwitchPreset,
  WanderPreset,
} from '@/types/motion'

export interface AmbientAgent {
  update: (time: number) => void
}

export interface AgentTarget {
  element: Element
  turnElement: Element | null
  seed: number
  heading: 1 | -1
  scale: number
}

type Setter = (value: number) => void

function setterFor(element: Element, property: string, unit?: string): Setter {
  return gsap.quickSetter(element, property, unit) as Setter
}

const easeInOut = easeNamed('sine.inOut')
const easeOut = easeNamed('power3.out')
const easeIn = easeNamed('power2.in')

function wander(target: AgentTarget, preset: WanderPreset): AmbientAgent {
  const noiseX = createNoise1D(target.seed)
  const noiseY = createNoise1D(target.seed + 101)
  const noiseR = createNoise1D(target.seed + 202)
  const setX = setterFor(target.element, 'x', 'px')
  const setY = setterFor(target.element, 'y', 'px')
  const setR = setterFor(target.element, 'rotation', 'deg')
  let previousY = 0
  return {
    update(time) {
      const t = time * preset.speed
      const y = noiseY(t) * preset.y * target.scale
      const lean = (preset.lean ?? 0) * (y - previousY)
      previousY = y
      setX(noiseX(t) * preset.x * target.scale)
      setY(y)
      setR(noiseR(t) * preset.rotation + lean * target.heading)
    },
  }
}

function rock(target: AgentTarget, preset: RockPreset): AmbientAgent {
  const random = createRandom(target.seed)
  const amplitudeNoise = createNoise1D(target.seed + 7)
  const cycle = pickInRange(random, preset.cycle)
  const phase = random() * Math.PI * 2
  const setR = setterFor(target.element, 'rotation', 'deg')
  const setY = setterFor(target.element, 'y', 'px')
  return {
    update(time) {
      const swell = (amplitudeNoise(time * 0.15) + 1) / 2
      const angle = (time / cycle) * Math.PI * 2 + phase
      const rotation = preset.rotation[0] + (preset.rotation[1] - preset.rotation[0]) * swell
      const lift = preset.lift[0] + (preset.lift[1] - preset.lift[0]) * swell
      setR(Math.sin(angle) * rotation)
      setY(Math.sin(angle * 0.5 + 1.1) * lift * target.scale)
    },
  }
}

interface SchoolTurn {
  time: number
  direction: 1 | -1
}

export interface SchoolLeader {
  seed: number
  turns: SchoolTurn[]
  extendTo: (time: number) => void
}

export function createSchoolLeader(preset: SchoolPreset, seed: number): SchoolLeader {
  const random = createRandom(seed)
  const turns: SchoolTurn[] = [{ time: -1000, direction: 1 }]
  return {
    seed,
    turns,
    extendTo(time) {
      while (turns[turns.length - 1].time < time + 30) {
        const last = turns[turns.length - 1]
        const next = Math.max(last.time, 0) + pickInRange(random, preset.turnEvery)
        turns.push({ time: next, direction: last.direction === 1 ? -1 : 1 })
      }
    },
  }
}

const TURN_DURATION = 0.7
const TRAVEL_DURATION = 3.2

function school(target: AgentTarget, preset: SchoolPreset, leader: SchoolLeader, rank: number): AmbientAgent {
  const groupX = createNoise1D(leader.seed + 900)
  const groupY = createNoise1D(leader.seed + 901)
  const ownX = createNoise1D(target.seed)
  const ownY = createNoise1D(target.seed + 55)
  const ownR = createNoise1D(target.seed + 77)
  const lag = rank * preset.turnLag
  const setX = setterFor(target.element, 'x', 'px')
  const setY = setterFor(target.element, 'y', 'px')
  const setR = setterFor(target.element, 'rotation', 'deg')
  const setTurn = target.turnElement ? setterFor(target.turnElement, 'scaleX') : null

  return {
    update(time) {
      leader.extendTo(time)
      const local = time - lag
      let index = 0
      while (index + 1 < leader.turns.length && leader.turns[index + 1].time <= local) index++
      const current = leader.turns[index]
      const previous = leader.turns[Math.max(0, index - 1)]
      const sinceTurn = local - current.time
      const turnProgress = easeInOut(Math.min(1, sinceTurn / TURN_DURATION))
      const facing = previous.direction + (current.direction - previous.direction) * turnProgress
      const travelProgress = easeInOut(Math.min(1, sinceTurn / TRAVEL_DURATION))
      const travelFrom = previous.direction * preset.turnTravel
      const travel = travelFrom + (current.direction * preset.turnTravel - travelFrom) * travelProgress
      const t = time * preset.speed
      setX((groupX(t) * preset.x + ownX(t * 1.7) * preset.x * 0.25 + travel) * target.scale)
      setY((groupY(t) * preset.y + ownY(t * 1.7) * preset.y * 0.3) * target.scale)
      setR(ownR(t) * preset.rotation)
      setTurn?.(index === 0 ? 1 : facing)
    },
  }
}

function pulse(target: AgentTarget, preset: PulsePreset): AmbientAgent {
  const random = createRandom(target.seed)
  const setX = setterFor(target.element, 'scaleX')
  const setY = setterFor(target.element, 'scaleY')
  const setLift = setterFor(target.element, 'y', 'px')
  let nextPulse = random() * preset.interval[1]
  let contract: Segment | null = null
  let relax: Segment | null = null
  let rise: Segment | null = null
  let baseY = 0
  let lastTime = 0
  return {
    update(time) {
      const elapsed = Math.max(0, time - lastTime)
      lastTime = time
      if (time >= nextPulse && !contract) {
        const height = pickInRange(random, preset.rise) * target.scale
        contract = createSegment(0, 1, time, 0.45, easeOut)
        relax = createSegment(1, 0, time + 0.45, 1.4, easeInOut)
        rise = createSegment(baseY, baseY - height, time, 1.1, easeOut)
        nextPulse = time + pickInRange(random, preset.interval)
      }
      let squeeze = 0
      if (contract && relax && rise) {
        squeeze = segmentDone(contract, time) ? segmentValue(relax, time) : segmentValue(contract, time)
        baseY = segmentValue(rise, time)
        if (segmentDone(relax, time)) {
          contract = null
          relax = null
          rise = null
        }
      } else {
        baseY += preset.sink * target.scale * elapsed
        baseY = Math.min(baseY, preset.rise[1] * target.scale)
      }
      setX(1 - preset.squash * squeeze)
      setY(1 + preset.squash * 0.6 * squeeze)
      setLift(baseY)
    },
  }
}

function jet(target: AgentTarget, preset: JetPreset): AmbientAgent {
  const random = createRandom(target.seed)
  const setX = setterFor(target.element, 'x', 'px')
  const setScaleX = setterFor(target.element, 'scaleX')
  const setScaleY = setterFor(target.element, 'scaleY')
  let nextJet = 1 + random() * preset.interval[0]
  let offset = 0
  let squeeze: Segment | null = null
  let dart: Segment | null = null
  let settle: Segment | null = null
  let lastTime = 0
  return {
    update(time) {
      const elapsed = Math.max(0, time - lastTime)
      lastTime = time
      if (time >= nextJet && !squeeze) {
        const thrust = pickInRange(random, preset.thrust) * target.scale * target.heading
        squeeze = createSegment(0, 1, time, 0.35, easeIn)
        dart = createSegment(offset, offset + thrust, time + 0.35, 0.7, easeOut)
        settle = createSegment(1, 0, time + 0.35, 0.5, easeOut)
        nextJet = time + pickInRange(random, preset.interval)
      }
      let squash = 0
      if (squeeze && dart && settle) {
        squash = segmentDone(squeeze, time) ? segmentValue(settle, time) : segmentValue(squeeze, time)
        offset = segmentValue(dart, time)
        if (segmentDone(dart, time)) {
          squeeze = null
          dart = null
          settle = null
        }
      } else {
        offset -= offset * Math.min(1, preset.driftBack * elapsed)
      }
      setX(offset)
      setScaleX(1 - preset.squash * squash)
      setScaleY(1 + preset.squash * 0.5 * squash)
    },
  }
}

function crawl(target: AgentTarget, preset: CrawlPreset): AmbientAgent {
  const random = createRandom(target.seed)
  const setX = setterFor(target.element, 'x', 'px')
  const setY = setterFor(target.element, 'y', 'px')
  let position = 0
  let direction = target.heading
  let move: Segment | null = null
  let restUntil = random() * preset.pause[1]
  return {
    update(time) {
      if (!move && time >= restUntil) {
        const limit = preset.range * target.scale
        if (Math.abs(position) > limit) direction = position > 0 ? -1 : 1
        const step = pickInRange(random, preset.step) * target.scale * direction
        const duration = pickInRange(random, preset.stepDuration)
        move = createSegment(position, position + step, time, duration, preset.sideways ? easeOut : easeInOut)
      }
      let lift = 0
      if (move) {
        position = segmentValue(move, time)
        const progress = Math.min(1, (time - move.start) / move.duration)
        lift = -Math.abs(Math.sin(progress * Math.PI * (preset.sideways ? 1 : 3))) * preset.bob * target.scale
        if (segmentDone(move, time)) {
          move = null
          restUntil = time + pickInRange(random, preset.pause)
        }
      }
      setX(position)
      setY(lift)
    },
  }
}

function sway(target: AgentTarget, preset: SwayPreset): AmbientAgent {
  const random = createRandom(target.seed)
  const current = createNoise1D(target.seed + 13)
  const cycle = pickInRange(random, preset.cycle)
  const amplitude = pickInRange(random, preset.rotation)
  const phase = random() * Math.PI * 2
  const setR = setterFor(target.element, 'rotation', 'deg')
  return {
    update(time) {
      const wave = Math.sin((time / cycle) * Math.PI * 2 + phase)
      setR((wave * 0.7 + current(time * 0.3) * 0.6) * amplitude)
    },
  }
}

function twitch(target: AgentTarget, preset: TwitchPreset): AmbientAgent {
  const random = createRandom(target.seed)
  const setR = setterFor(target.element, 'rotation', 'deg')
  const setS = setterFor(target.element, 'scale')
  let rotation = 0
  let scale = 1
  let turn: Segment | null = null
  let grow: Segment | null = null
  let next = random() * preset.interval[1]
  return {
    update(time) {
      if (time >= next) {
        const sign = random() > 0.5 ? 1 : -1
        turn = createSegment(rotation, sign * pickInRange(random, preset.rotation), time, 1.2, easeInOut)
        grow = createSegment(scale, pickInRange(random, preset.scale), time, 1.2, easeInOut)
        next = time + pickInRange(random, preset.interval)
      }
      if (turn && grow) {
        rotation = segmentValue(turn, time)
        scale = segmentValue(grow, time)
      }
      setR(rotation)
      setS(scale)
    },
  }
}

export function createBodyAgent(target: AgentTarget, preset: BodyPreset, leader: SchoolLeader | null, rank: number): AmbientAgent {
  switch (preset.kind) {
    case 'wander':
      return wander(target, preset)
    case 'rock':
      return rock(target, preset)
    case 'school':
      return school(target, preset, leader ?? createSchoolLeader(preset, target.seed), rank)
    case 'pulse':
      return pulse(target, preset)
    case 'jet':
      return jet(target, preset)
    case 'crawl':
      return crawl(target, preset)
    case 'sway':
      return sway(target, preset)
    case 'twitch':
      return twitch(target, preset)
  }
}
