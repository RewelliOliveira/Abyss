export function artAccessibility(label?: string) {
  if (label) return { role: 'img', 'aria-label': label } as const
  return { 'aria-hidden': true } as const
}
