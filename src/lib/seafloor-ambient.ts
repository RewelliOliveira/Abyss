import { sceneryMotion } from '@/data/motion-presets'
import type { AmbientTarget } from '@/hooks/useAmbientMotion'

export const seafloorTargets: AmbientTarget[] = [
  { selector: '[data-part^="sea-lily"]', preset: sceneryMotion['sea-lily'], seed: 401 },
  { selector: '[data-part^="sea-pen"]', preset: sceneryMotion['sea-pen'], seed: 402 },
  { selector: '[data-part^="anemone"]', preset: sceneryMotion.anemone, seed: 403 },
  { selector: '[data-part^="sponge"]', preset: sceneryMotion.sponge, seed: 404, desktopOnly: true },
  { selector: '[data-part^="sea-whip"]', preset: sceneryMotion['sea-whip'], seed: 405, desktopOnly: true },
  { selector: '[data-part^="sea-pig"]', preset: sceneryMotion['sea-pig'], seed: 406 },
  { selector: '[data-part^="brittle-star"]', preset: sceneryMotion['brittle-star'], seed: 407 },
  { selector: '[data-part="crab"]', preset: sceneryMotion.crab, seed: 408, heading: 1 },
]
