import type { CallToAction } from '@/types/ocean'

export const hero = {
  eyebrow: 'A dive to the bottom of the Mariana Trench',
  title: 'Abyss',
  subtitle:
    'Scroll to sink 10,935 meters, from sunlit waves to the deepest known point on Earth.',
  cta: { label: 'Start the dive', targetId: 'sunlight' } satisfies CallToAction,
  scrollHint: 'Scroll to dive',
  shipLabel: 'A research ship floating on the surface',
}
