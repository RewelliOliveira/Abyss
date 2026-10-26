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
