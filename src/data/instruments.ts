import type { TemperaturePoint } from '@/types/ocean'

export const instrumentLabels = {
  panel: 'Dive instruments',
  depth: 'Depth',
  pressure: 'Pressure',
  temperature: 'Temperature',
  light: 'Light',
  zone: 'Zone',
  surfaceZone: 'Surface',
}

export const instrumentShortLabels = {
  depth: 'Depth',
  pressure: 'Press.',
  temperature: 'Temp.',
  light: 'Light',
}

export const lightDescriptions = {
  sunlit: 'sunlit',
  dim: 'dim',
  none: 'none',
}

export const SURFACE_LIGHT_LIMIT = 200
export const DARKNESS_DEPTH = 1000
export const METERS_PER_ATMOSPHERE = 10.06

export const temperatureProfile: TemperaturePoint[] = [
  { depth: 0, celsius: 28 },
  { depth: 50, celsius: 28 },
  { depth: 100, celsius: 26 },
  { depth: 200, celsius: 20 },
  { depth: 300, celsius: 15 },
  { depth: 500, celsius: 8 },
  { depth: 800, celsius: 5 },
  { depth: 1000, celsius: 4.5 },
  { depth: 1500, celsius: 3 },
  { depth: 2000, celsius: 2.2 },
  { depth: 3000, celsius: 1.7 },
  { depth: 4000, celsius: 1.5 },
  { depth: 6000, celsius: 1.6 },
  { depth: 8000, celsius: 1.9 },
  { depth: 10935, celsius: 2.5 },
]
