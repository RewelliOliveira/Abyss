import type { CreatureKind } from '@/types/ocean'
import type { AmbientPreset } from '@/types/motion'

type SceneryKind = 'sun' | 'sea-lily' | 'sea-pen' | 'sponge' | 'anemone' | 'sea-whip' | 'sea-pig' | 'brittle-star' | 'crab'

export const creatureMotion: Record<CreatureKind, AmbientPreset> = {
  'research-ship': {
    body: { kind: 'rock', rotation: [0.8, 2.2], lift: [3, 8], cycle: [4.5, 6.5] },
  },
  submarine: {
    body: { kind: 'wander', x: 6, y: 14, rotation: 2.5, speed: 0.16 },
    parts: [
      { part: 'propeller', motion: 'spin', amount: 0.22, cycle: [0.22, 0.3] },
      { part: 'headlights', motion: 'flicker', amount: 0.3, cycle: [1, 1] },
    ],
  },
  'sea-turtle': {
    body: { kind: 'wander', x: 22, y: 16, rotation: 5, speed: 0.11, lean: 0.6 },
    parts: [
      { part: 'front-flipper', motion: 'flap', amount: 14, cycle: [2.8, 3.4], origin: '90% 10%' },
      { part: 'rear-flipper', motion: 'flap', amount: 9, cycle: [2.8, 3.4], lag: 0.9, origin: '100% 20%' },
    ],
  },
  fish: {
    body: { kind: 'school', x: 24, y: 14, rotation: 4, speed: 0.16, turnEvery: [7, 12], turnLag: 0.11, turnTravel: 60 },
    parts: [{ part: 'tail', motion: 'wag', amount: 16, cycle: [0.45, 0.6], origin: '100% 50%' }],
  },
  jellyfish: {
    body: { kind: 'pulse', interval: [2.4, 3.6], squash: 0.12, rise: [18, 28], sink: 7 },
    parts: [{ part: 'tentacles', motion: 'sway', amount: 7, cycle: [2.6, 3.4], lag: 1.2, origin: '50% 0%' }],
  },
  squid: {
    body: { kind: 'jet', interval: [3.5, 5.5], thrust: [50, 80], squash: 0.16, driftBack: 0.35 },
    parts: [{ part: 'arms', motion: 'wag', amount: 6, cycle: [1.6, 2.2], lag: 0.8, origin: '0% 50%' }],
  },
  anglerfish: {
    body: { kind: 'wander', x: 10, y: 8, rotation: 2, speed: 0.07, lean: 0.3 },
    parts: [{ part: 'lure', motion: 'blink', amount: 0.25, cycle: [2.5, 6] }],
  },
  'gulper-eel': {
    body: { kind: 'wander', x: 14, y: 10, rotation: 3, speed: 0.09, lean: 0.8 },
    parts: [
      { part: 'tail', motion: 'wag', amount: 5, cycle: [3, 4], origin: '100% 35%' },
      { part: 'tail-tip', motion: 'blink', amount: 0.3, cycle: [1.5, 4.5] },
    ],
  },
  'giant-isopod': {
    body: { kind: 'crawl', step: [18, 34], stepDuration: [1.4, 2.2], pause: [0.8, 2.4], bob: 2, range: 60 },
  },
  snailfish: {
    body: { kind: 'wander', x: 16, y: 10, rotation: 3, speed: 0.08, lean: 0.5 },
    parts: [{ part: 'tail', motion: 'wag', amount: 6, cycle: [1.8, 2.4], origin: '100% 50%' }],
  },
  seafloor: {},
}

export const sceneryMotion: Record<SceneryKind, AmbientPreset> = {
  sun: {
    parts: [
      { part: 'rays', motion: 'turn', amount: 360, cycle: [140, 160], origin: '50% 50%' },
      { part: 'ring-outer', motion: 'breathe', amount: 0.025, cycle: [5.5, 6.5], origin: '50% 50%' },
      { part: 'ring-middle', motion: 'breathe', amount: 0.02, cycle: [4.2, 5], origin: '50% 50%' },
      { part: 'ring-inner', motion: 'breathe', amount: 0.03, cycle: [3.4, 4], origin: '50% 50%' },
    ],
  },
  'sea-lily': { body: { kind: 'sway', rotation: [2.5, 5], cycle: [4, 7] } },
  'sea-pen': { body: { kind: 'sway', rotation: [2, 4], cycle: [3.5, 6] } },
  sponge: { body: { kind: 'sway', rotation: [0.8, 1.6], cycle: [5, 8] } },
  anemone: { body: { kind: 'sway', rotation: [1.5, 3], cycle: [3, 5] } },
  'sea-whip': { body: { kind: 'sway', rotation: [3, 6], cycle: [3, 5] } },
  'sea-pig': { body: { kind: 'crawl', step: [6, 12], stepDuration: [2.5, 4], pause: [2, 5], bob: 1, range: 18 } },
  'brittle-star': { body: { kind: 'twitch', rotation: [6, 18], scale: [0.94, 1.06], interval: [2.5, 6] } },
  crab: {
    body: { kind: 'crawl', step: [4, 9], stepDuration: [0.35, 0.55], pause: [0.6, 2.5], bob: 1.5, range: 14, sideways: true },
  },
}
