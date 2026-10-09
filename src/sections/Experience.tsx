import { Section } from '../components/layout/section'
import { Reveal } from '../components/common/reveal'
import { experience } from '../data/experience'

/**
 * Highlights written as "<lead> · <detail>" – the competition placements – get
 * their lead set brighter, so the results can be scanned down the column.
 */
function HighlightText({ text }: { text: string }) {
  const separator = text.indexOf(' · ')
  if (separator === -1) return <>{text}</>

  return (
    <>
      <span className="font-medium text-white">{text.slice(0, separator)}</span>
      <span className="text-slate-400">{text.slice(separator)}</span>
    </>
  )
}

function Experience() {
  return (
    <Section
      id="experience"
      number="02"
      title="Experience & Learning"
      description="Academic training, an early-career programme at Mercado Libre, peer tutoring and a competitive programming track that keeps the fundamentals sharp."
    >
      <ol className="relative max-w-3xl space-y-12 border-l border-slate-800 pl-8 sm:pl-10">
        {experience.map((item, index) => (
          <li key={item.role} className="relative">
            <Reveal delay={0.06 * index}>
              <span
                aria-hidden
                className="absolute -left-[2.3125rem] top-1.5 h-3 w-3 rounded-full border-2 border-blue-400 bg-slate-950 sm:-left-[2.8125rem]"
              />
              <p className="font-mono text-sm text-blue-400">{item.period}</p>
              <h3 className="mt-1.5 text-lg font-semibold text-white sm:text-xl">{item.role}</h3>
              <p className="mt-0.5 text-sm text-slate-400">{item.organisation}</p>
              <p className="mt-3 text-sm leading-7 text-slate-400">{item.description}</p>
              <ul className="mt-4 space-y-2">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm leading-6 text-slate-300">
                    <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-blue-400" />
                    <span>
                      <HighlightText text={highlight} />
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}

export default Experience
