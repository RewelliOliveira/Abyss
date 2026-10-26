export interface GodRay {
  left: number
  width: number
  tilt: number
  desktopOnly?: boolean
}

export const godRays: GodRay[] = [
  { left: 6, width: 4, tilt: 14 },
  { left: 18, width: 7, tilt: 11, desktopOnly: true },
  { left: 31, width: 3, tilt: 9 },
  { left: 44, width: 8, tilt: 7, desktopOnly: true },
  { left: 57, width: 5, tilt: 5 },
  { left: 70, width: 9, tilt: 3, desktopOnly: true },
  { left: 84, width: 4, tilt: 1 },
]

export const sunLabel = 'The sun shining over the sea'

export type GullPose = 'up' | 'down' | 'glide'

export interface GullSpec {
  id: string
  width: string
  top: number
  startX: number
  speed: readonly [number, number]
  distant?: boolean
  desktopOnly?: boolean
}

export const flock: GullSpec[] = [
  { id: 'gull-1', width: 'clamp(3.5rem, 7vw, 6.5rem)', top: 10, startX: 22, speed: [55, 70] },
  { id: 'gull-2', width: 'clamp(3rem, 5.5vw, 5rem)', top: 24, startX: 58, speed: [45, 60] },
  { id: 'gull-3', width: 'clamp(2.75rem, 5vw, 4.5rem)', top: 4, startX: 80, speed: [60, 78] },
  { id: 'gull-4', width: 'clamp(3rem, 6vw, 5.5rem)', top: 32, startX: 38, speed: [50, 64], desktopOnly: true },
  { id: 'gull-5', width: 'clamp(2.5rem, 4.5vw, 4rem)', top: 16, startX: 6, speed: [64, 82], desktopOnly: true },
  { id: 'far-1', width: 'clamp(1rem, 1.6vw, 1.5rem)', top: 14, startX: 30, speed: [22, 30], distant: true },
  { id: 'far-2', width: 'clamp(0.9rem, 1.3vw, 1.25rem)', top: 20, startX: 66, speed: [18, 26], distant: true },
  { id: 'far-3', width: 'clamp(0.8rem, 1.1vw, 1.1rem)', top: 8, startX: 48, speed: [16, 24], distant: true },
  { id: 'far-4', width: 'clamp(1rem, 1.4vw, 1.4rem)', top: 28, startX: 12, speed: [20, 28], distant: true, desktopOnly: true },
  { id: 'far-5', width: 'clamp(0.8rem, 1vw, 1rem)', top: 6, startX: 88, speed: [14, 20], distant: true, desktopOnly: true },
  { id: 'far-6', width: 'clamp(0.9rem, 1.2vw, 1.2rem)', top: 24, startX: 74, speed: [18, 24], distant: true, desktopOnly: true },
]

export const flightRhythm = {
  flapInterval: [0.11, 0.16],
  distantFlapInterval: [0.16, 0.22],
  flapsPerBurst: [4, 10],
  glide: [1.2, 3.8],
  respawnDelay: [1.5, 7],
  bob: [4, 11],
  bobCycle: [2.2, 3.6],
  tilt: 0.35,
} as const

export const gullLabel = 'A seagull flying over the sea'
