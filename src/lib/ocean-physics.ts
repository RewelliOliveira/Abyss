import { METERS_PER_ATMOSPHERE, SURFACE_LIGHT_LIMIT, temperatureProfile } from '@/data/instruments'
import type { DiveReading } from '@/types/ocean'

const FEET_PER_METER = 3.28084
const PSI_PER_ATMOSPHERE = 14.696
const LIGHT_DECADES_PER_LIMIT = 2

export function metersToFeet(meters: number): number {
  return meters * FEET_PER_METER
}

export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32
}

export function atmospheresToPsi(atmospheres: number): number {
  return atmospheres * PSI_PER_ATMOSPHERE
}

export function pressureAtDepth(depth: number): number {
  return 1 + depth / METERS_PER_ATMOSPHERE
}

export function temperatureAtDepth(depth: number): number {
  const deeperIndex = temperatureProfile.findIndex((point) => point.depth >= depth)
  if (deeperIndex <= 0) return temperatureProfile[0].celsius
  const shallower = temperatureProfile[deeperIndex - 1]
  const deeper = temperatureProfile[deeperIndex]
  const progress = (depth - shallower.depth) / (deeper.depth - shallower.depth)
  return shallower.celsius + (deeper.celsius - shallower.celsius) * progress
}

export function lightAtDepth(depth: number): number {
  return 100 * 10 ** ((-LIGHT_DECADES_PER_LIMIT * depth) / SURFACE_LIGHT_LIMIT)
}

export function readingAtDepth(depth: number): DiveReading {
  return {
    depth,
    pressureAtm: pressureAtDepth(depth),
    temperatureC: temperatureAtDepth(depth),
    lightPercent: lightAtDepth(depth),
  }
}
