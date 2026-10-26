import { getDepth } from '@/lib/dive-store'
import { gsap } from '@/lib/gsap'
import { currentScroll } from '@/lib/scroll'

type ParticleKind = 'bubble' | 'snow'

interface Particle {
  kind: ParticleKind
  x: number
  y: number
  radius: number
  speed: number
  sway: number
  phase: number
}

export interface ParticleBudget {
  bubbles: number
  snow: number
}

const PARTICLES = {
  bubbleFadeDepth: 350,
  snowStartDepth: 500,
  snowFullDepth: 2500,
  scrollParallax: 0.35,
  maxPixelRatio: 2,
  bubbleOpacity: 0.55,
  snowOpacity: 0.5,
  swayAmplitude: 0.3,
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value))
}

function createParticle(kind: ParticleKind, width: number, height: number): Particle {
  const isBubble = kind === 'bubble'
  return {
    kind,
    x: Math.random() * width,
    y: Math.random() * height,
    radius: isBubble ? gsap.utils.random(1.5, 5) : gsap.utils.random(0.6, 2),
    speed: isBubble ? gsap.utils.random(0.4, 1.3) : gsap.utils.random(0.08, 0.35),
    sway: isBubble ? gsap.utils.random(0.2, 0.8) : gsap.utils.random(0.1, 0.4),
    phase: Math.random() * Math.PI * 2,
  }
}

export function startParticleField(
  canvas: HTMLCanvasElement,
  budget: ParticleBudget,
  waterlineY: () => number,
): () => void {
  const context = canvas.getContext('2d')
  if (!context) return () => {}
  const foam = getComputedStyle(document.documentElement).getPropertyValue('--color-foam').trim()
  let width = 0
  let height = 0
  let lastScroll = currentScroll()
  let particles: Particle[] = []
  let cleared = false

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, PARTICLES.maxPixelRatio)
    width = window.innerWidth
    height = window.innerHeight
    canvas.width = width * ratio
    canvas.height = height * ratio
    context!.setTransform(ratio, 0, 0, ratio, 0, 0)
    particles = [
      ...Array.from({ length: budget.bubbles }, () => createParticle('bubble', width, height)),
      ...Array.from({ length: budget.snow }, () => createParticle('snow', width, height)),
    ]
  }

  function wrap(particle: Particle) {
    if (particle.y < -10) particle.y = height + 10
    if (particle.y > height + 10) particle.y = -10
    if (particle.x < -10) particle.x = width + 10
    if (particle.x > width + 10) particle.x = -10
  }

  function draw(time: number, deltaTime: number) {
    const frame = deltaTime / (1000 / 60)
    const depth = getDepth()
    const scroll = currentScroll()
    const scrollShift = (scroll - lastScroll) * PARTICLES.scrollParallax
    lastScroll = scroll
    const bubbleAlpha = clamp01(1 - depth / PARTICLES.bubbleFadeDepth) * PARTICLES.bubbleOpacity
    const snowAlpha =
      clamp01((depth - PARTICLES.snowStartDepth) / (PARTICLES.snowFullDepth - PARTICLES.snowStartDepth)) *
      PARTICLES.snowOpacity

    if (bubbleAlpha < 0.01 && snowAlpha < 0.01) {
      if (!cleared) context!.clearRect(0, 0, width, height)
      cleared = true
      return
    }
    cleared = false

    const waterline = waterlineY()
    context!.clearRect(0, 0, width, height)
    context!.fillStyle = foam
    context!.strokeStyle = foam

    for (const particle of particles) {
      const direction = particle.kind === 'bubble' ? -1 : 1
      particle.y += direction * particle.speed * frame - scrollShift
      particle.x += Math.sin(time * particle.sway + particle.phase) * PARTICLES.swayAmplitude * frame
      wrap(particle)
      const alpha = particle.kind === 'bubble' ? bubbleAlpha : snowAlpha
      if (alpha < 0.01) continue
      if (particle.kind === 'bubble' && particle.y < waterline) continue
      context!.globalAlpha = alpha
      context!.beginPath()
      context!.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
      if (particle.kind === 'bubble') context!.stroke()
      else context!.fill()
    }
    context!.globalAlpha = 1
  }

  resize()
  window.addEventListener('resize', resize)
  gsap.ticker.add(draw)
  return () => {
    window.removeEventListener('resize', resize)
    gsap.ticker.remove(draw)
    context.clearRect(0, 0, width, height)
  }
}
