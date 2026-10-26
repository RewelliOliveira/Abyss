import type { RefObject } from 'react'
import { createBodyAgent, createSchoolLeader, type AmbientAgent, type SchoolLeader } from '@/lib/ambient-body'
import { runAmbientAgents } from '@/lib/ambient-controller'
import { createPartAgent } from '@/lib/ambient-parts'
import { gsap, useGSAP } from '@/lib/gsap'
import { MEDIA, MOTION } from '@/lib/motion'
import type { AmbientPreset } from '@/types/motion'

export interface AmbientTarget {
  selector: string
  preset: AmbientPreset
  seed: number
  heading?: 1 | -1
  group?: string
  rank?: number
  desktopOnly?: boolean
}

interface AmbientOptions {
  alwaysActive?: boolean
}

function seedFor(element: Element, base: number): number {
  const name = element.getAttribute('data-ambient') ?? element.getAttribute('data-part') ?? ''
  return Array.from(name).reduce((hash, character) => (hash * 31 + character.charCodeAt(0)) % 100003, base)
}

function buildAgents(scope: Element, targets: AmbientTarget[], scale: number, mobile: boolean): AmbientAgent[] {
  const leaders = new Map<string, SchoolLeader>()
  const agents: AmbientAgent[] = []
  for (const target of targets) {
    if (mobile && target.desktopOnly) continue
    const { body, parts = [] } = target.preset
    for (const element of Array.from(scope.querySelectorAll(target.selector))) {
      const seed = seedFor(element, target.seed)
      if (body) {
        let leader: SchoolLeader | null = null
        if (body.kind === 'school' && target.group) {
          leader = leaders.get(target.group) ?? createSchoolLeader(body, target.seed)
          leaders.set(target.group, leader)
        }
        agents.push(
          createBodyAgent(
            {
              element,
              turnElement: element.querySelector('[data-turn]'),
              seed,
              heading: target.heading ?? 1,
              scale,
            },
            body,
            leader,
            target.rank ?? 0,
          ),
        )
      }
      parts.forEach((part, index) => {
        const agent = createPartAgent(element, part, seed + index * 17)
        if (agent) agents.push(agent)
      })
    }
  }
  return agents
}

function touchedElements(scope: Element, targets: AmbientTarget[]): Element[] {
  return targets.flatMap((target) =>
    Array.from(scope.querySelectorAll(target.selector)).flatMap((element) => [
      element,
      ...Array.from(element.querySelectorAll('[data-turn]')),
      ...(target.preset.parts ?? []).flatMap((part) =>
        Array.from(element.querySelectorAll(`[data-part="${part.part}"], [data-halo="${part.part}"]`)),
      ),
    ]),
  )
}

export function useAmbientMotion(
  scopeRef: RefObject<Element | null>,
  targets: AmbientTarget[],
  options: AmbientOptions = {},
): void {
  useGSAP(
    () => {
      const scope = scopeRef.current
      if (!scope) return
      const media = gsap.matchMedia()
      media.add({ motionOk: MEDIA.motionOk, mobile: MEDIA.mobile }, (context) => {
        const { motionOk, mobile } = context.conditions ?? {}
        if (!motionOk) return
        const scale = mobile ? MOTION.mobileDistanceScale : 1
        const agents = buildAgents(scope, targets, scale, Boolean(mobile))
        if (!agents.length) return
        const stop = runAmbientAgents(scope, agents, options.alwaysActive ?? false)
        return () => {
          stop()
          gsap.set(touchedElements(scope, targets), { clearProps: 'transform,opacity' })
        }
      })
      return () => media.revert()
    },
    { scope: scopeRef, dependencies: [targets, options.alwaysActive] },
  )
}
