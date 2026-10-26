import { ResearchShip } from '@/components/creatures/ResearchShip'
import { Submarine } from '@/components/creatures/Submarine'
import { SeaTurtle } from '@/components/creatures/SeaTurtle'
import { Fish } from '@/components/creatures/Fish'
import { MantaRay } from '@/components/creatures/MantaRay'
import { HammerheadShark } from '@/components/creatures/HammerheadShark'
import { Jellyfish } from '@/components/creatures/Jellyfish'
import { Squid } from '@/components/creatures/Squid'
import { Swordfish } from '@/components/creatures/Swordfish'
import { Lanternfish } from '@/components/creatures/Lanternfish'
import { Hatchetfish } from '@/components/creatures/Hatchetfish'
import { SpermWhale } from '@/components/creatures/SpermWhale'
import { Viperfish } from '@/components/creatures/Viperfish'
import { Anglerfish } from '@/components/creatures/Anglerfish'
import { GulperEel } from '@/components/creatures/GulperEel'
import { VampireSquid } from '@/components/creatures/VampireSquid'
import { CrownJellyfish } from '@/components/creatures/CrownJellyfish'
import { TripodFish } from '@/components/creatures/TripodFish'
import { BigfinSquid } from '@/components/creatures/BigfinSquid'
import { RedShrimp } from '@/components/creatures/RedShrimp'
import { SeaAnemone } from '@/components/creatures/SeaAnemone'
import { Snailfish } from '@/components/creatures/Snailfish'
import { Seafloor } from '@/components/creatures/Seafloor'
import type { CreatureArtProps } from '@/types/art'
import type { CreatureKind } from '@/types/ocean'
import type { ComponentType } from 'react'

export const creatureArt: Record<CreatureKind, ComponentType<CreatureArtProps>> = {
  'research-ship': ResearchShip,
  submarine: Submarine,
  'sea-turtle': SeaTurtle,
  fish: Fish,
  'manta-ray': MantaRay,
  'hammerhead-shark': HammerheadShark,
  jellyfish: Jellyfish,
  squid: Squid,
  swordfish: Swordfish,
  lanternfish: Lanternfish,
  hatchetfish: Hatchetfish,
  'sperm-whale': SpermWhale,
  viperfish: Viperfish,
  anglerfish: Anglerfish,
  'gulper-eel': GulperEel,
  'vampire-squid': VampireSquid,
  'crown-jellyfish': CrownJellyfish,
  'tripod-fish': TripodFish,
  'bigfin-squid': BigfinSquid,
  'red-shrimp': RedShrimp,
  'sea-anemone': SeaAnemone,
  snailfish: Snailfish,
  seafloor: Seafloor,
}
