import type { ReactNode } from 'react'
import { ArrowUpRight, Award } from 'lucide-react'
import { Section } from '../components/layout/section'
import { ImageWithLoader } from '../components/ui/image-with-loader'
import { Reveal } from '../components/common/reveal'
import { certificates, type Certificate } from '../data/certificates'

/** Links out (and lifts on hover) when the entry has a URL; stays a still card when it does not. */
function CardShell({ certificate, children }: { certificate: Certificate; children: ReactNode }) {
  const className = 'flex h-full flex-col gap-4 rounded-2xl bg-slate-900/50 p-5 text-left'

  if (!certificate.url) return <article className={className}>{children}</article>

  return (
    <a
      href={certificate.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group ${className} transition hover:-translate-y-1 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400`}
    >
      {children}
    </a>
  )
}

function Thumbnail({ certificate }: { certificate: Certificate }) {
  // Certificates come in both orientations, so contain them on a dark mat
  // rather than cropping to fill.
  const frame = 'aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-950/60'

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
      description="Competition placements, certifications and teaching, each linked to the original document or its verification page."
    >
      {/* Flex rather than grid so an incomplete last row sits centred instead
          of leaving a gap on the right. Widths mirror a 1/2/3-column grid. */}
      <div className="flex flex-wrap justify-center gap-5">
        {certificates.map((certificate, index) => (
          <Reveal
            key={certificate.title}
            delay={0.06 * index}
            className="w-full sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
          >
            <CardShell certificate={certificate}>
              <div className="flex items-start justify-between gap-3">
                <Award className="h-6 w-6 shrink-0 text-blue-400" />
                <span className="font-mono text-sm text-slate-500">{certificate.year}</span>
              </div>

              <h3 className="text-base font-semibold leading-6 text-white">{certificate.title}</h3>

              <Thumbnail certificate={certificate} />

              <ul className="flex flex-wrap gap-2">
                {certificate.issuers.map((issuer) => (
                  <li
                    key={issuer}
                    className="rounded-md bg-slate-800/70 px-2 py-0.5 font-mono text-[0.7rem] text-slate-400"
                  >
                    {issuer}
                  </li>
                ))}
              </ul>

              {certificate.url ? (
                <span className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-medium text-blue-400 transition group-hover:text-blue-300">
                  {certificate.linkLabel ?? 'View certificate'}
                  <ArrowUpRight className="h-3.5 w-3.5" />
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
