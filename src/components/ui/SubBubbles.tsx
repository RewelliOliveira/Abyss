const BUBBLES = [
  { left: 8, size: 'size-2', desktopOnly: false },
  { left: 12, size: 'size-1.5', desktopOnly: false },
  { left: 5, size: 'size-1', desktopOnly: false },
  { left: 15, size: 'size-2.5', desktopOnly: true },
  { left: 10, size: 'size-1', desktopOnly: true },
]

export function SubBubbles() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute left-0 top-[46%] h-0 w-full">
      {BUBBLES.map((bubble, index) => (
        <span
          key={index}
          data-sub-bubble
          className={`absolute rounded-pill border border-foam/70 opacity-0 ${bubble.size} ${bubble.desktopOnly ? 'hidden md:block' : ''}`}
          style={{ left: `${bubble.left}%` }}
        />
      ))}
    </div>
  )
}
