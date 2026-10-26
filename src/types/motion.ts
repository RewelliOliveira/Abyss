export type Range = readonly [number, number]

export interface WanderPreset {
  kind: 'wander'
  x: number
  y: number
  rotation: number
  speed: number
  lean?: number
}

export interface RockPreset {
  kind: 'rock'
  rotation: Range
  lift: Range
  cycle: Range
}

export interface SchoolPreset {
  kind: 'school'
  x: number
  y: number
  rotation: number
  speed: number
  turnEvery: Range
  turnLag: number
  turnTravel: number
}

export interface PulsePreset {
  kind: 'pulse'
  interval: Range
  squash: number
  rise: Range
  sink: number
}

export interface JetPreset {
  kind: 'jet'
  interval: Range
  thrust: Range
  squash: number
  driftBack: number
}

export interface CrawlPreset {
  kind: 'crawl'
  step: Range
  stepDuration: Range
  pause: Range
  bob: number
  range: number
  sideways?: boolean
}

export interface SwayPreset {
  kind: 'sway'
  rotation: Range
  cycle: Range
}

export interface TwitchPreset {
  kind: 'twitch'
  rotation: Range
  scale: Range
  interval: Range
}

export type BodyPreset =
  | WanderPreset
  | RockPreset
  | SchoolPreset
  | PulsePreset
  | JetPreset
  | CrawlPreset
  | SwayPreset
  | TwitchPreset

export type PartMotionKind = 'wag' | 'flap' | 'sway' | 'spin' | 'blink' | 'flicker' | 'turn' | 'breathe'

export interface PartPreset {
  part: string
  motion: PartMotionKind
  amount: number
  cycle: Range
  lag?: number
  origin?: string
}

export interface AmbientPreset {
  body?: BodyPreset
  parts?: PartPreset[]
}
