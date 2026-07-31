import { Avatar } from '../components/ui/avatar'
import { Badge } from '../components/ui/badge'
import { SectionHeading } from '../components/layout/section-heading'
import { skills } from '../data/skills'

function About() {
  return (
    <section id="about" className="grid gap-16 py-24 lg:grid-cols-[0.9fr_0.7fr] lg:items-center">
      <div className="space-y-8">
        <SectionHeading
          number="01"
          title="About Me"
          description="A backend-focused developer who builds reliable APIs, systems and data-driven products while learning modern frontend patterns."
        />
        <div className="space-y-6 text-slate-300">
          <p>
            I am David Santiago García Preciado, a Systems Engineering student at Universidad El Bosque in Bogotá. I focus on clean backend architecture, scalable REST APIs and database-driven solutions using Python, Java, Go and modern frameworks.
          </p>
          <p>
            My journey includes building enterprise-ready services, mentoring peers and competing in algorithmic programming contests. I enjoy solving problems with data structures, optimization and effective software design.
          </p>
          <p>
            I continue strengthening my backend skills while expanding into frontend, DevOps and automation tools that help deliver reliable, maintainable systems.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="accent" className="justify-center">{skill}</Badge>
          ))}
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-sm rounded-[2rem] border border-slate-800/80 bg-slate-950/80 p-6 shadow-2xl shadow-black/20">
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-blue-500/10 via-transparent to-slate-950/25" />
        <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-800/90 bg-slate-900/95 p-5">
          <Avatar src="/profile.png" alt="David García portrait" className="aspect-square w-full" />
          <div className="mt-6 space-y-2 text-slate-200">
            <p className="text-sm uppercase tracking-[0.25em] text-blue-400">Profile</p>
            <p className="text-lg font-semibold">David García</p>
            <p className="text-sm text-slate-400">Systems Engineering student & Backend Developer</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
