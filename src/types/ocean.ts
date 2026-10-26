export type ZoneId = 'sunlight' | 'twilight' | 'midnight' | 'abyssal' | 'hadal'

export type CreatureKind =
  | 'research-ship'
  | 'submarine'
  | 'sea-turtle'
  | 'fish'
  | 'jellyfish'
  | 'squid'
  | 'anglerfish'
  | 'gulper-eel'
  | 'giant-isopod'
  | 'snailfish'
  | 'seafloor'

export type GlowColor = 'cyan' | 'pink'

export type SwimDirection = 'left' | 'right' | 'up' | 'still'

export type Facing = 'left' | 'right' | 'front'

export interface DepthRange {
  from: number
  to: number
}

export interface CreaturePlacement {
  id: string
  kind: CreatureKind
  label?: string
  top: number
  left: number
  width: string
  parallax: number
  swim: SwimDirection
  desktopOnly?: boolean
}

export interface GlowPart {
  part: string
  color: GlowColor
}

export interface CreatureTraits {
  facing: Facing
  glow?: GlowPart
  sway?: string
}

export interface Zone {
  id: ZoneId
  name: string
  scientificName: string
  depth: DepthRange
  intro: string
  facts: string[]
  dark: boolean
  backgroundClass: string
  creatures: CreaturePlacement[]
}

export interface TemperaturePoint {
  depth: number
  celsius: number
}

export interface Source {
  label: string
  publisher: string
  url: string
}

export interface CallToAction {
  label: string
  targetId: string
}

export interface DiveReading {
  depth: number
  pressureAtm: number
  temperatureC: number
  lightPercent: number
}
