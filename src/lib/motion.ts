export const MOTION = {
  ease: 'power3.out',
  easeInOut: 'sine.inOut',
  easePop: 'back.out(1.4)',
  easeReturn: 'power3.inOut',
  dur: 1.4,
  fast: 0.7,
  slow: 2.4,
  stagger: 0.08,
  dist: 40,
  floatCycle: 5.5,
  floatDistance: 14,
  swimDistance: 18,
  scrub: 1.2,
  smooth: 1.4,
  returnDuration: 2.6,
  glowCycle: 1.8,
  headlightSwitch: 0.9,
  mobileDistanceScale: 0.5,
} as const

export const MEDIA = {
  desktop: '(min-width: 768px)',
  mobile: '(max-width: 767px)',
  motionOk: '(prefers-reduced-motion: no-preference)',
  reducedMotion: '(prefers-reduced-motion: reduce)',
  finePointer: '(hover: hover) and (pointer: fine)',
} as const
