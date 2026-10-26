export interface Anchor {
  x: number
  y: number
  size: number
}

const MIN_ANCHOR_SIZE = 0.5

function boxInViewBox(svg: SVGSVGElement, shape: SVGGraphicsElement): DOMRect | null {
  const rootMatrix = svg.getScreenCTM()
  const shapeMatrix = shape.getScreenCTM()
  if (!rootMatrix || !shapeMatrix) return null
  const toViewBox = rootMatrix.inverse().multiply(shapeMatrix)
  const box = shape.getBBox()
  const corners = [
    new DOMPoint(box.x, box.y),
    new DOMPoint(box.x + box.width, box.y),
    new DOMPoint(box.x, box.y + box.height),
    new DOMPoint(box.x + box.width, box.y + box.height),
  ].map((corner) => corner.matrixTransform(toViewBox))
  const xs = corners.map((corner) => corner.x)
  const ys = corners.map((corner) => corner.y)
  return new DOMRect(Math.min(...xs), Math.min(...ys), Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys))
}

function mergeBoxes(boxes: DOMRect[]): DOMRect[] {
  if (!boxes.length) return []
  const left = Math.min(...boxes.map((box) => box.left))
  const top = Math.min(...boxes.map((box) => box.top))
  const right = Math.max(...boxes.map((box) => box.right))
  const bottom = Math.max(...boxes.map((box) => box.bottom))
  return [new DOMRect(left, top, right - left, bottom - top)]
}

export function measurePartAnchors(svg: SVGSVGElement, part: string, merge = false): Anchor[] {
  const { width, height } = svg.viewBox.baseVal
  if (!width || !height) return []
  const selector = merge ? `[data-part="${part}"] path` : `[data-part="${part}"] > *`
  const boxes = Array.from(svg.querySelectorAll<SVGGraphicsElement>(selector))
    .map((shape) => boxInViewBox(svg, shape))
    .filter((box): box is DOMRect => box !== null)
  return (merge ? mergeBoxes(boxes) : boxes)
    .map((box) => ({
      x: ((box.x + box.width / 2) / width) * 100,
      y: ((box.y + box.height / 2) / height) * 100,
      size: (Math.max(box.width, box.height) / width) * 100,
    }))
    .filter((anchor) => anchor.size > MIN_ANCHOR_SIZE)
}
