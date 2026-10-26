import type { CallToAction } from '@/types/ocean'

export const CHALLENGER_DEEP_DEPTH = 10935

export const trench = {
  id: 'challenger-deep',
  eyebrow: 'Challenger Deep · Mariana Trench',
  title: 'The deepest known point on Earth',
  impact:
    'Drop Mount Everest in here and its summit would still sit more than 2 km below the waves.',
  note:
    'Depth as published by NOAA. A 2026 survey estimates 10,927 m; measurements differ by a few tens of meters depending on the method.',
  seafloorLabel: 'The rocky, sediment-covered floor of the trench',
  cta: { label: 'Return to the surface', targetId: 'surface' } satisfies CallToAction,
}
