const integerFormat = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })
const decimalFormat = new Intl.NumberFormat('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })

export function formatInteger(value: number): string {
  return integerFormat.format(Math.round(value))
}

export function formatDecimal(value: number): string {
  return decimalFormat.format(value)
}

export function formatDepthRange(from: number, to: number): string {
  return `${formatInteger(from)}–${formatInteger(to)} m`
}

export function formatLightPercent(percent: number): string {
  if (percent >= 10) return `${formatInteger(percent)}%`
  if (percent >= 0.1) return `${formatDecimal(percent)}%`
  if (percent > 0) return '<0.1%'
  return '0%'
}
