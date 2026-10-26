export type Noise1D = (time: number) => number

function seededRandom(seed: number): () => number {
  let state = Math.floor(seed * 2654435761) >>> 0 || 1
  return () => {
    state ^= state << 13
    state ^= state >>> 17
    state ^= state << 5
    return ((state >>> 0) % 100000) / 100000
  }
}

function smootherstep(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10)
}

const LATTICE_SIZE = 256

export function createNoise1D(seed: number): Noise1D {
  const random = seededRandom(seed)
  const lattice = Array.from({ length: LATTICE_SIZE }, () => random() * 2 - 1)

  function valueAt(time: number): number {
    const floor = Math.floor(time)
    const fraction = smootherstep(time - floor)
    const start = lattice[((floor % LATTICE_SIZE) + LATTICE_SIZE) % LATTICE_SIZE]
    const end = lattice[(((floor + 1) % LATTICE_SIZE) + LATTICE_SIZE) % LATTICE_SIZE]
    return start + (end - start) * fraction
  }

  return (time) => valueAt(time) * 0.68 + valueAt(time * 2.17 + 31.7) * 0.32
}
