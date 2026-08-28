import { Avatar } from '../components/ui/avatar'
import { Badge } from '../components/ui/badge'
import { SectionHeading } from '../components/layout/section-heading'
import { skills } from '../data/skills'
import { focusAreas } from '../data/focus-areas'
import { BentoCard } from '../components/ui/bento-card'
import { asset } from '../data/site'

function About() {
  return (
    <section id="about" className="grid gap-16 py-24 lg:grid-cols-[0.95fr_0.85fr] lg:items-start">
      <div className="space-y-8">
        <SectionHeading
          number="01"
          title="About Me"
          description="A backend-focused engineer who values clean architecture, deliberate systems and strong fundamentals."
        />
        <div className="space-y-6 text-slate-300">
          <p>
            I am David Santiago García Preciado, a Systems Engineering student at Universidad El Bosque in Bogotá. I focus on backend architecture, scalable APIs and dependable systems built with clarity and practicality.
          </p>
          <p>
            I care about how software is structured, how it evolves over time and how to solve hard problems with strong reasoning, clean abstractions and disciplined execution.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="accent" className="justify-center">{skill}</Badge>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-[2rem] border border-slate-800/80 bg-slate-950/80 p-6 shadow-2xl shadow-black/20">
          <div className="overflow-hidden rounded-[1.75rem] border border-slate-800/90 bg-slate-900/95 p-5">
            <Avatar src={asset('profile.png')} alt="David García portrait" className="aspect-square w-full" />
            <div className="mt-6 space-y-2 text-slate-200">
              <p className="text-sm uppercase tracking-[0.25em] text-blue-400">Profile</p>
              <p className="text-lg font-semibold">David García</p>
              <p className="text-sm text-slate-400">Systems Engineering student & Backend Developer</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {focusAreas.slice(0, 2).map((area) => (
            <BentoCard key={area.title} title={area.title} description={area.description} detail={area.detail} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
