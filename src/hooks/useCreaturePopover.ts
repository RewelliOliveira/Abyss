import { useState } from 'react'

export interface CreaturePopoverHandlers {
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export function useCreaturePopover(): { open: boolean; handlers: CreaturePopoverHandlers } {
  const [open, setOpen] = useState(false)
  return {
    open,
    handlers: {
      onMouseEnter: () => setOpen(true),
      onMouseLeave: () => setOpen(false),
    },
  }
}
