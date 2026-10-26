import { gsap, ScrollSmoother } from '@/lib/gsap'
import { MEDIA, MOTION } from '@/lib/motion'

function prefersReducedMotion(): boolean {
  return window.matchMedia(MEDIA.reducedMotion).matches
}

function scrollPositionOf(target: HTMLElement): number {
  const smoother = ScrollSmoother.get()
  if (smoother) return smoother.offset(target, 'top top')
  return target.getBoundingClientRect().top + window.scrollY
}

function focusTarget(target: HTMLElement): void {
  const focusable = target.querySelector<HTMLElement>('[data-focus-target]') ?? target
  focusable.focus({ preventScroll: true })
}

export function scrollToSection(targetId: string, duration: number = MOTION.slow): void {
  const target = document.getElementById(targetId)
  if (!target) return
  const y = scrollPositionOf(target)
  if (prefersReducedMotion()) {
    window.scrollTo({ top: y })
    focusTarget(target)
    return
  }
  gsap.to(window, {
    scrollTo: { y, autoKill: true },
    duration,
    ease: MOTION.easeReturn,
    onComplete: () => focusTarget(target),
  })
}
