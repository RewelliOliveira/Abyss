import { scrollToSection } from '@/lib/scroll'
import type { CallToAction } from '@/types/ocean'

type ActionButtonVariant = 'ink' | 'glow'

interface ActionButtonProps {
  action: CallToAction
  variant: ActionButtonVariant
  duration?: number
  className?: string
}

const variantClasses: Record<ActionButtonVariant, string> = {
  ink: 'bg-ink text-foam hover:bg-ocean-twilight focus-visible:outline-ink',
  glow: 'border border-glow-cyan bg-scrim text-foam shadow-glow-cyan hover:bg-ocean-twilight',
}

export function ActionButton({ action, variant, duration, className = '' }: ActionButtonProps) {
  function handleClick() {
    scrollToSection(action.targetId, duration)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`group inline-flex min-h-12 items-center gap-3 rounded-pill px-7 py-3 font-display text-body font-medium tracking-wide transition-colors duration-300 ${variantClasses[variant]} ${className}`}
    >
      <span>{action.label}</span>
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-0.5">
        {variant === 'ink' ? '↓' : '↑'}
      </span>
    </button>
  )
}
