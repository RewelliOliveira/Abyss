type DepthListener = (depth: number) => void

const listeners = new Set<DepthListener>()
let currentDepth = 0

export function getDepth(): number {
  return currentDepth
}

export function setDepth(depth: number): void {
  if (depth === currentDepth) return
  currentDepth = depth
  listeners.forEach((listener) => listener(depth))
}

export function subscribeToDepth(listener: DepthListener): () => void {
  listeners.add(listener)
  listener(currentDepth)
  return () => {
    listeners.delete(listener)
  }
}
