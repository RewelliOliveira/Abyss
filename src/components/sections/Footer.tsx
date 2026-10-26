import { footer, sources } from '@/data/footer'

export function Footer() {
  return (
    <footer id="credits" className="relative border-t border-hairline bg-ocean-hadal py-16">
      <div className="mx-auto grid max-w-content gap-12 px-gutter md:grid-cols-[2fr_1fr]">
        <section aria-labelledby="sources-title">
          <h2 id="sources-title" className="font-display text-lead font-bold text-foam">
            {footer.sourcesTitle}
          </h2>
          <ul className="mt-4 space-y-3">
            {sources.map((source) => (
              <li key={source.url} className="text-label leading-relaxed text-mist">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm text-foam underline decoration-hairline underline-offset-4 transition-colors hover:decoration-glow-cyan"
                >
                  {source.label}
                </a>
                <span> · {source.publisher}</span>
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="credits-title">
          <h2 id="credits-title" className="font-display text-lead font-bold text-foam">
            {footer.creditsTitle}
          </h2>
          <ul className="mt-4 space-y-3">
            {footer.credits.map((credit) => (
              <li key={credit} className="text-label leading-relaxed text-mist">
                {credit}
              </li>
            ))}
          </ul>
          <p className="mt-8 font-mono text-2xs uppercase tracking-widest text-mist">{footer.closing}</p>
        </section>
      </div>
    </footer>
  )
}
