import { creatureMotion } from '@/data/motion-presets'
import type { AmbientTarget } from '@/hooks/useAmbientMotion'
import type { CreaturePlacement } from '@/types/ocean'

const SCHOOL_GROUP = 'school'

export function ambientTargetsFor(creatures: CreaturePlacement[], seed: number): AmbientTarget[] {
  let schoolRank = 0
  return creatures.map((placement) => {
    const preset = creatureMotion[placement.kind]
    const inSchool = preset.body?.kind === 'school'
    return {
      selector: `[data-ambient="${placement.id}"]`,
      preset,
      seed,
      heading: placement.swim === 'left' ? -1 : 1,
      group: inSchool ? SCHOOL_GROUP : undefined,
      rank: inSchool ? schoolRank++ : 0,
      desktopOnly: placement.desktopOnly,
    }
  })
}
