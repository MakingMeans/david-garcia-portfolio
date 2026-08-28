import { Avatar } from '../components/ui/avatar'
import { Badge } from '../components/ui/badge'
import { Section } from '../components/layout/section'
import { BentoCard } from '../components/ui/bento-card'
import { Reveal } from '../components/common/reveal'
import { Highlight } from '../components/common/highlight'
import { skills } from '../data/skills'
import { focusAreas } from '../data/focus-areas'
import { asset } from '../data/site'

function About() {
  return (
    <Section
      id="about"
      number="01"
      title="About Me"
      description="A backend-focused engineer who values clean architecture, deliberate systems and strong fundamentals."
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_300px] lg:items-start">
        <Reveal delay={0.08}>
          <div className="space-y-8">
            <div className="space-y-6 text-justify text-slate-300 hyphens-auto">
              <p>
                I am David Santiago García Preciado, a{' '}
                <Highlight>Systems Engineering</Highlight> student at{' '}
                <Highlight>Universidad El Bosque</Highlight> in Bogotá, focused on{' '}
                <Highlight>full-stack development</Highlight>: <Highlight>REST APIs</Highlight>, web
                applications and <Highlight>relational databases</Highlight>.
              </p>
              <p>
                I have worked with <Highlight>Spring Boot</Highlight>, <Highlight>Flask</Highlight>,{' '}
                <Highlight>React</Highlight>, <Highlight>PHP</Highlight>,{' '}
                <Highlight>Python</Highlight>, <Highlight>Java</Highlight> and{' '}
                <Highlight>SQL</Highlight>, building academic and personal projects published on
                GitHub. What I care about is logical thinking,{' '}
                <Highlight>complex problem solving</Highlight> and shipping clean, scalable code with
                good engineering practices.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                Technologies I work with
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="accent">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <Avatar
            src={asset('profile.png')}
            alt="David García portrait"
            className="mx-auto aspect-[896/1107] w-full max-w-xs lg:mx-0 lg:max-w-none"
          />
        </Reveal>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {focusAreas.map((area, index) => (
          <Reveal key={area.title} delay={0.08 * index} className="h-full">
            <BentoCard
              title={area.title}
              description={area.description}
              detail={area.detail}
              className="h-full"
            />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

export default About
