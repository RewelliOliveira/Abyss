import { useEffect } from 'react'
import { subscribeToDepth } from '@/lib/dive-store'

export function useDepth(onDepthChange: (depth: number) => void): void {
  useEffect(() => subscribeToDepth(onDepthChange), [onDepthChange])
}
