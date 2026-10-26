import { DARKNESS_DEPTH, instrumentLabels, lightDescriptions } from '@/data/instruments'
import { zones } from '@/data/zones'
import { formatDecimal, formatInteger, formatLightPercent } from '@/lib/format'
import { atmospheresToPsi, celsiusToFahrenheit, metersToFeet, readingAtDepth } from '@/lib/ocean-physics'

export interface Readout {
  zone: string
  depth: string
  depthDetail: string
  pressure: string
  pressureDetail: string
  temperature: string
  temperatureDetail: string
  light: string
  lightDetail: string
}

function zoneNameAt(depth: number): string {
  if (depth <= 0) return instrumentLabels.surfaceZone
  const zone = zones.find((candidate) => depth <= candidate.depth.to) ?? zones[zones.length - 1]
  return zone.name
}

function lightDescriptionAt(depth: number, percent: number): string {
  if (percent >= 1) return lightDescriptions.sunlit
  if (depth < DARKNESS_DEPTH) return lightDescriptions.dim
  return lightDescriptions.none
}

export function readoutAtDepth(depth: number): Readout {
  const reading = readingAtDepth(depth)
  const visibleLight = depth < DARKNESS_DEPTH ? reading.lightPercent : 0
  return {
    zone: zoneNameAt(depth),
    depth: `${formatInteger(depth)} m`,
    depthDetail: `${formatInteger(metersToFeet(depth))} ft`,
    pressure: `${formatInteger(reading.pressureAtm)} atm`,
    pressureDetail: `${formatInteger(atmospheresToPsi(reading.pressureAtm))} psi`,
    temperature: `${formatDecimal(reading.temperatureC)} °C`,
    temperatureDetail: `${formatDecimal(celsiusToFahrenheit(reading.temperatureC))} °F`,
    light: formatLightPercent(visibleLight),
    lightDetail: lightDescriptionAt(depth, visibleLight),
  }
}
