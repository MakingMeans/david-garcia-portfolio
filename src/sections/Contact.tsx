import { Github, Linkedin, Mail } from 'lucide-react'
import { Card } from '../components/ui/card'
import { Section } from '../components/layout/section'
import { SocialLink } from '../components/common/social-link'
import { Reveal } from '../components/common/reveal'
import { mailto, site } from '../data/site'

function Contact() {
  return (
    <Section
      id="contact"
      number="05"
      title="Get in touch"
      description="Open to collaboration, internships and conversations about backend systems and modern web development."
      className="pb-32"
    >
      <Reveal>
        <Card
          variant="accent"
          className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
        >
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-white">Let’s build something meaningful.</h3>
            <p className="max-w-2xl text-sm leading-7 text-slate-300">
              Reach out if you want to discuss APIs, architecture, software engineering or
              opportunities to work together.
            </p>
            <a
              href={mailto}
              className="inline-block text-sm text-blue-300 underline-offset-4 transition hover:text-blue-200 hover:underline"
            >
              {site.email}
            </a>
          </div>
          <a
            href={mailto}
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-blue-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            Contact me
          </a>
        </Card>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="flex flex-wrap gap-3">
          <SocialLink href={site.github} label="GitHub" icon={<Github className="h-4 w-4" />} />
          <SocialLink href={site.linkedin} label="LinkedIn" icon={<Linkedin className="h-4 w-4" />} />
          <SocialLink href={mailto} label="Email" external={false} icon={<Mail className="h-4 w-4" />} />
        </div>
      </Reveal>
    </Section>
  )
}

export default Contact
