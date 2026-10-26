import { useState, type FocusEvent, type PointerEvent } from 'react'

export interface CreaturePopoverHandlers {
  onPointerEnter: (event: PointerEvent<HTMLElement>) => void
  onPointerLeave: (event: PointerEvent<HTMLElement>) => void
  onPointerDown: (event: PointerEvent<HTMLElement>) => void
  onFocus: (event: FocusEvent<HTMLElement>) => void
  onBlur: () => void
}

export function useCreaturePopover(): { open: boolean; handlers: CreaturePopoverHandlers } {
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [tapped, setTapped] = useState(false)

  const handlers: CreaturePopoverHandlers = {
    onPointerEnter: (event) => {
      if (event.pointerType !== 'touch') setHovered(true)
    },
    onPointerLeave: (event) => {
      if (event.pointerType !== 'touch') setHovered(false)
    },
    onPointerDown: (event) => {
      if (event.pointerType === 'touch') setTapped((current) => !current)
    },
    onFocus: (event) => setFocused(event.currentTarget.matches(':focus-visible')),
    onBlur: () => {
      setFocused(false)
      setTapped(false)
    },
  }

  return { open: hovered || focused || tapped, handlers }
}
