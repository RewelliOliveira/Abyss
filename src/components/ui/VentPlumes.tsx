const PLUME_COUNT = 6

export function VentPlumes() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute left-[38%] top-[26%] size-[22%]">
      {Array.from({ length: PLUME_COUNT }, (_, index) => (
        <span
          key={index}
          data-plume
          className="absolute inset-0 rounded-pill bg-smoke opacity-0 blur-md"
        />
      ))}
    </div>
  )
}
