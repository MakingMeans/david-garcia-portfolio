import { SocialLink } from '../components/common/social-link'
import { BentoCard } from '../components/ui/bento-card'
import { Cpu, Github, Layers3, Linkedin, Mail, Network, Sparkles } from 'lucide-react'
import { asset, mailto, site } from '../data/site'

function Hero() {
  return (
    <section id="hero" className="grid min-h-[calc(100vh-96px)] items-center gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
      <div className="space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-300">
          <Sparkles className="h-4 w-4" />
          Backend Engineer · Systems Thinker
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Building reliable systems with clarity and intent.
          </h1>
          <p className="max-w-2xl text-xl leading-8 text-slate-300 sm:text-2xl">
            I work at the intersection of backend engineering, software architecture and distributed thinking.
          </p>
        </div>

        <p className="max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
          I’m a Systems Engineering student focused on APIs, scalable services, architectural trade-offs and problem-solving under constraints.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href={mailto}
            className="inline-flex items-center justify-center rounded-full bg-blue-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            Get in touch
          </a>
          <a
            href={asset('cv.pdf')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 px-6 py-3 text-sm font-medium text-slate-200 transition hover:border-blue-400/30 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            Download CV
          </a>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <SocialLink href={mailto} label="Email" external={false} icon={<Mail className="h-4 w-4" />} />
          <SocialLink href={site.github} label="GitHub" icon={<Github className="h-4 w-4" />} />
          <SocialLink href={site.linkedin} label="LinkedIn" icon={<Linkedin className="h-4 w-4" />} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <BentoCard
          title="Backend Engineering"
          description="Reliable services, clean contracts and performance-minded implementation."
          detail="APIs · Services · Systems"
          icon={<Cpu className="h-5 w-5" />}
          className="sm:col-span-2"
        />
        <BentoCard
          title="Software Architecture"
          description="Designing boundaries, interfaces and evolution paths that scale with intent."
          detail="Architecture · Maintainability"
          icon={<Layers3 className="h-5 w-5" />}
        />
        <BentoCard
          title="Distributed Systems"
          description="Thinking in resilience, concurrency and operational clarity."
          detail="Concurrency · Trade-offs"
          icon={<Network className="h-5 w-5" />}
        />
      </div>
    </section>
  )
}

export default Hero
