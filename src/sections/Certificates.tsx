import type { ReactNode } from 'react'
import { Award, ExternalLink } from 'lucide-react'
import { Section } from '../components/layout/section'
import { ImageWithLoader } from '../components/ui/image-with-loader'
import { Reveal } from '../components/common/reveal'
import { certificates, type Certificate } from '../data/certificates'

/** Links out when the entry has a URL; stays a plain card when it does not. */
function CardShell({ certificate, children }: { certificate: Certificate; children: ReactNode }) {
  const className =
    'group flex h-full flex-col gap-4 rounded-3xl border border-slate-800/70 bg-slate-950/80 p-5 text-left shadow-[0_24px_60px_-32px_rgba(0,0,0,0.65)] transition hover:-translate-y-1 hover:border-blue-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400'

  if (!certificate.url) return <article className={className}>{children}</article>

  return (
    <a href={certificate.url} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  )
}

function Thumbnail({ certificate }: { certificate: Certificate }) {
  // Certificates come in both orientations, so contain them on a light mat
  // rather than cropping to fill.
  const frame = 'aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-900'

  if (!certificate.image) {
    return (
      <div className={`${frame} grid place-items-center`}>
        <Award className="h-10 w-10 text-slate-700" />
      </div>
    )
  }

  return (
    <ImageWithLoader
      src={certificate.image}
      alt={certificate.title}
      wrapperClassName={frame}
      className="object-contain p-3"
    />
  )
}

function Certificates() {
  return (
    <Section
      id="certificates"
      number="04"
      title="Certificates & Achievements"
      description="Competition placements, teaching and programmes that back up the engineering and problem-solving track."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((certificate, index) => (
          <Reveal key={certificate.title} delay={0.06 * index} className="h-full">
            <CardShell certificate={certificate}>
              <div className="flex items-start justify-between gap-3">
                <Award className="h-7 w-7 shrink-0 text-blue-400" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {certificate.year}
                </span>
              </div>

              <h3 className="text-base font-semibold leading-6 text-white">{certificate.title}</h3>

              <Thumbnail certificate={certificate} />

              <ul className="flex flex-wrap gap-2">
                {certificate.issuers.map((issuer) => (
                  <li
                    key={issuer}
                    className="rounded-full border border-slate-800 px-2.5 py-1 text-[0.7rem] font-medium text-slate-400"
                  >
                    {issuer}
                  </li>
                ))}
              </ul>

              {certificate.url ? (
                <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-400 transition group-hover:text-blue-300">
                  {certificate.linkLabel ?? 'View certificate'}
                  <ExternalLink className="h-3.5 w-3.5" />
                </span>
              ) : null}
            </CardShell>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

export default Certificates
