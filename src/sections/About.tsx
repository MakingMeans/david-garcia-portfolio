import { Badge } from '../components/ui/badge'
import { Card } from '../components/ui/card'
import { Section } from '../components/layout/section'
import { BentoCard } from '../components/ui/bento-card'
import { Reveal } from '../components/common/reveal'
import { Highlight } from '../components/common/highlight'
import { skills } from '../data/skills'
import { focusAreas } from '../data/focus-areas'
import { quickFacts } from '../data/quick-facts'

function About() {
  return (
    <Section
      id="about"
      number="01"
      title="About Me"
      description="A backend-focused engineer who values clean architecture, deliberate systems and strong fundamentals."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start lg:gap-16">
        <Reveal delay={0.08}>
          <div className="space-y-8">
            <div className="max-w-2xl space-y-5 leading-7 text-slate-300">
              <p>
                I am David Santiago García Preciado, a <Highlight>Systems Engineering</Highlight>{' '}
                student at Universidad El Bosque in Bogotá, focused on{' '}
                <Highlight>full-stack development</Highlight>: REST APIs, web applications and
                relational databases.
              </p>
              <p>
                I have worked with Spring Boot, Flask, React, PHP, Python, Java and SQL, building
                academic and personal projects published on GitHub. What I care about is logical
                thinking, <Highlight>complex problem solving</Highlight> and shipping clean, scalable
                code with good engineering practices.
              </p>
            </div>

            <div className="space-y-3">
              <p className="font-mono text-xs text-slate-500">Technologies I work with</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <Card>
            <p className="font-mono text-xs text-slate-500">At a glance</p>
            <dl className="mt-4 space-y-3">
              {quickFacts.map((fact) => (
                <div key={fact.label} className="grid grid-cols-[6.5rem_1fr] gap-3 text-sm">
                  <dt className="text-slate-500">{fact.label}</dt>
                  <dd className="text-slate-200">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Card>
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
