import { flightRhythm, type GullPose, type GullSpec } from '@/data/sky'
import { gsap } from '@/lib/gsap'
import { createRandom, pickInRange } from '@/lib/ambient-timing'
import type { AmbientAgent } from '@/lib/ambient-body'

type Setter = (value: number) => void

const POSES: GullPose[] = ['up', 'down', 'glide']

export function createFlightAgent(bird: HTMLElement, spec: GullSpec, seed: number, sky: HTMLElement): AmbientAgent {
  const random = createRandom(seed)
  const setX = gsap.quickSetter(bird, 'x', 'px') as Setter
  const setY = gsap.quickSetter(bird, 'y', 'px') as Setter
  const setRotation = gsap.quickSetter(bird, 'rotation', 'deg') as Setter
  const poseSetters = Object.fromEntries(
    POSES.map((pose) => {
      const element = bird.querySelector(`[data-pose="${pose}"]`)
      return [pose, element ? (gsap.quickSetter(element, 'opacity') as Setter) : () => {}]
    }),
  ) as Record<GullPose, Setter>
  const flapRange = spec.distant ? flightRhythm.distantFlapInterval : flightRhythm.flapInterval

  let x = (spec.startX / 100) * sky.clientWidth
  let speed = pickInRange(random, spec.speed)
  let bob = pickInRange(random, flightRhythm.bob) * (spec.distant ? 0.4 : 1)
  let bobCycle = pickInRange(random, flightRhythm.bobCycle)
  const bobPhase = random() * Math.PI * 2
  let lastTime = 0
  let previousY = 0
  let pose: GullPose = 'glide'
  let flapsLeft = 0
  let nextPoseChange = random() * 2
  let waitingUntil = -1

  function showPose(next: GullPose) {
    pose = next
    POSES.forEach((candidate) => poseSetters[candidate](candidate === next ? 1 : 0))
  }

  function respawn(time: number) {
    x = -bird.offsetWidth - 20
    speed = pickInRange(random, spec.speed)
    bob = pickInRange(random, flightRhythm.bob) * (spec.distant ? 0.4 : 1)
    bobCycle = pickInRange(random, flightRhythm.bobCycle)
    waitingUntil = time + pickInRange(random, flightRhythm.respawnDelay)
  }

  function advancePose(time: number) {
    if (time < nextPoseChange) return
    if (flapsLeft > 0) {
      showPose(pose === 'up' ? 'down' : 'up')
      flapsLeft -= 1
      nextPoseChange = time + pickInRange(random, flapRange)
      return
    }
    if (pose === 'glide') {
      flapsLeft = Math.round(pickInRange(random, flightRhythm.flapsPerBurst)) * 2
      showPose('up')
      nextPoseChange = time + pickInRange(random, flapRange)
      return
    }
    showPose('glide')
    nextPoseChange = time + pickInRange(random, flightRhythm.glide)
  }

  showPose('glide')
  return {
    update(time) {
      const elapsed = Math.max(0, time - lastTime)
      lastTime = time
      const origin = (spec.startX / 100) * sky.clientWidth
      if (waitingUntil > time) {
        setX(x - origin)
        return
      }
      x += speed * elapsed
      if (x > sky.clientWidth + 20) respawn(time)
      const y = Math.sin((time / bobCycle) * Math.PI * 2 + bobPhase) * bob
      const climb = elapsed > 0 ? (y - previousY) / elapsed : 0
      previousY = y
      advancePose(time)
      setX(x - origin)
      setY(y)
      setRotation(climb * flightRhythm.tilt)
    },
  }
}
