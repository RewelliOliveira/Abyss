import { gsap, ScrollTrigger } from '@/lib/gsap'
import type { AmbientAgent } from '@/lib/ambient-body'

const MAX_FRAME_MS = 100

export function runAmbientAgents(scope: Element, agents: AmbientAgent[], alwaysActive: boolean): () => void {
  let clock = 0
  let running = false

  function tick(_time: number, deltaTime: number) {
    clock += Math.min(deltaTime, MAX_FRAME_MS) / 1000
    agents.forEach((agent) => agent.update(clock))
  }

  function setRunning(active: boolean) {
    if (active === running) return
    running = active
    if (active) gsap.ticker.add(tick)
    else gsap.ticker.remove(tick)
  }

  if (alwaysActive) {
    setRunning(true)
    return () => setRunning(false)
  }

  const visibility = ScrollTrigger.create({
    trigger: scope,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (self) => setRunning(self.isActive),
  })
  agents.forEach((agent) => agent.update(0))
  setRunning(visibility.isActive)
  return () => {
    visibility.kill()
    setRunning(false)
  }
}
