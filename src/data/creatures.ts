import type { CreatureKind, CreatureTraits } from '@/types/ocean'

export const creatureTraits: Record<CreatureKind, CreatureTraits> = {
  'research-ship': { facing: 'right' },
  submarine: { facing: 'right', glow: { part: 'headlights', color: 'cyan' } },
  'sea-turtle': { facing: 'right' },
  fish: { facing: 'right' },
  jellyfish: { facing: 'front', sway: 'tentacles' },
  squid: { facing: 'left' },
  anglerfish: { facing: 'right', glow: { part: 'lure', color: 'cyan' } },
  'gulper-eel': { facing: 'right', glow: { part: 'tail-tip', color: 'pink' } },
  'giant-isopod': { facing: 'right' },
  snailfish: { facing: 'right' },
  seafloor: { facing: 'front' },
}
