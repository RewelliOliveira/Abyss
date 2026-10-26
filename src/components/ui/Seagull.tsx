import { SeagullDown } from '@/components/creatures/SeagullDown'
import { SeagullGlide } from '@/components/creatures/SeagullGlide'
import { SeagullUp } from '@/components/creatures/SeagullUp'

interface SeagullProps {
  label?: string
}

export function Seagull({ label }: SeagullProps) {
  return (
    <div className="relative" role={label ? 'img' : undefined} aria-label={label}>
      <div data-pose="glide">
        <SeagullGlide className="block h-auto w-full" />
      </div>
      <div data-pose="up" className="absolute inset-0 opacity-0">
        <SeagullUp className="block h-auto w-full" />
      </div>
      <div data-pose="down" className="absolute inset-0 opacity-0">
        <SeagullDown className="block h-auto w-full" />
      </div>
    </div>
  )
}
