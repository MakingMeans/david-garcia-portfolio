import { Section } from '../components/layout/section'
import { Reveal } from '../components/common/reveal'
import { experience } from '../data/experience'

function Experience() {
  return (
    <Section
      id="experience"
      number="02"
      title="Experience & Learning"
      description="Academic training, an early-career programme at Mercado Libre, peer tutoring and a competitive programming track that keeps the fundamentals sharp."
    >
      <ol className="relative space-y-10 border-l border-slate-800 pl-8 sm:pl-10">
        {experience.map((item, index) => (
          <li key={item.role} className="relative">
            <Reveal delay={0.06 * index}>
              <span
                aria-hidden
                className="absolute -left-[2.3125rem] top-1.5 h-3 w-3 rounded-full border-2 border-blue-400 bg-slate-950 sm:-left-[2.8125rem]"
              />
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
                {item.period}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">{item.role}</h3>
              <p className="text-sm font-medium text-slate-400">{item.organisation}</p>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">{item.description}</p>
              <ul className="mt-4 space-y-2">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm leading-6 text-slate-300">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-400" />
                    {highlight}
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
