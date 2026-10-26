import { gsap, ScrollSmoother, ScrollTrigger } from '@/lib/gsap'
import { MEDIA, MOTION } from '@/lib/motion'

export interface ViewportTopTracker {
  top: () => number
  stop: () => void
}

export function currentScroll(): number {
  return ScrollSmoother.get()?.scrollTop() ?? window.scrollY
}

export function trackViewportTop(element: Element): ViewportTopTracker {
  let documentTop = 0
  function measure() {
    documentTop = element.getBoundingClientRect().top + currentScroll()
  }
  measure()
  ScrollTrigger.addEventListener('refresh', measure)
  return {
    top: () => documentTop - currentScroll(),
    stop: () => ScrollTrigger.removeEventListener('refresh', measure),
  }
}

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
