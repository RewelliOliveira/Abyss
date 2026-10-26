interface FactListProps {
  facts: string[]
}

export function FactList({ facts }: FactListProps) {
  return (
    <ul className="mt-6 space-y-4 border-t border-hairline pt-6">
      {facts.map((fact) => (
        <li key={fact} data-fact className="flex gap-3 text-body leading-relaxed text-foam">
          <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-pill bg-glow-cyan shadow-glow-cyan" />
          <span>{fact}</span>
        </li>
      ))}
    </ul>
  )
}
