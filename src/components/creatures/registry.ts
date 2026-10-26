import { ResearchShip } from '@/components/creatures/ResearchShip'
import { Submarine } from '@/components/creatures/Submarine'
import { SeaTurtle } from '@/components/creatures/SeaTurtle'
import { Fish } from '@/components/creatures/Fish'
import { Jellyfish } from '@/components/creatures/Jellyfish'
import { Squid } from '@/components/creatures/Squid'
import { Anglerfish } from '@/components/creatures/Anglerfish'
import { GulperEel } from '@/components/creatures/GulperEel'
import { GiantIsopod } from '@/components/creatures/GiantIsopod'
import { Snailfish } from '@/components/creatures/Snailfish'
import { HydrothermalVent } from '@/components/creatures/HydrothermalVent'
import { Seafloor } from '@/components/creatures/Seafloor'
import type { CreatureArtProps } from '@/types/art'
import type { CreatureKind } from '@/types/ocean'
import type { ComponentType } from 'react'

export const creatureArt: Record<CreatureKind, ComponentType<CreatureArtProps>> = {
  'research-ship': ResearchShip,
  submarine: Submarine,
  'sea-turtle': SeaTurtle,
  fish: Fish,
  jellyfish: Jellyfish,
  squid: Squid,
  anglerfish: Anglerfish,
  'gulper-eel': GulperEel,
  'giant-isopod': GiantIsopod,
  snailfish: Snailfish,
  'hydrothermal-vent': HydrothermalVent,
  seafloor: Seafloor,
}
