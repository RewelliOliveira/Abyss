export interface Anchor {
  x: number
  y: number
}

export function measurePartAnchors(svg: SVGSVGElement, part: string): Anchor[] {
  const { width, height } = svg.viewBox.baseVal
  if (!width || !height) return []
  const shapes = svg.querySelectorAll<SVGGraphicsElement>(`[data-part="${part}"] > *`)
  return Array.from(shapes, (shape) => {
    const box = shape.getBBox()
    return {
      x: ((box.x + box.width / 2) / width) * 100,
      y: ((box.y + box.height / 2) / height) * 100,
    }
  })
}
