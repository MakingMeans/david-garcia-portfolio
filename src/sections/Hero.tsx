import { Github, Linkedin, Mail } from 'lucide-react'
import { Container } from '../components/layout/container'
import { Reveal } from '../components/common/reveal'
import { Highlight } from '../components/common/highlight'
import { asset, mailto, site } from '../data/site'

const socials = [
  { href: site.github, label: 'GitHub', icon: Github, external: true },
  { href: site.linkedin, label: 'LinkedIn', icon: Linkedin, external: true },
  { href: mailto, label: 'Email', icon: Mail, external: false },
]

function Hero() {
  return (
    // A band, not a screen: it sits flush against the top of the page, spans the
    // full width and takes only the height its content needs.
    <section id="hero" className="relative isolate overflow-hidden border-b border-slate-800/70 bg-[#050B18]">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(59,130,246,0.13),transparent_72%)]"
      />

      <Container className="flex flex-col items-center gap-7 py-20 text-center sm:gap-8 sm:py-24">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-blue-400 sm:text-sm sm:tracking-[0.35em]">
            Hello, my name is
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-6xl lg:text-7xl">
              David García
            </h1>
            <p className="text-2xl font-semibold tracking-tight text-balance text-slate-400 sm:text-4xl lg:text-5xl">
              I build reliable backend systems
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto max-w-2xl text-base leading-7 text-slate-400 sm:leading-8 sm:text-lg">
            <Highlight>Systems Engineering</Highlight> student at Universidad El Bosque, focused on{' '}
            <Highlight>REST APIs</Highlight>, <Highlight>relational databases</Highlight> and{' '}
            <Highlight>full-stack applications</Highlight>, with a{' '}
            <Highlight>competitive programming</Highlight> habit that keeps the problem solving
            sharp.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <a
              href={mailto}
              className="inline-flex w-full items-center justify-center rounded-full bg-blue-500 px-7 py-3 text-sm font-medium text-white transition hover:bg-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 sm:w-auto"
            >
              Get in touch
            </a>
            <a
              href={asset('cv.pdf')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full border border-slate-700 bg-slate-900/60 px-7 py-3 text-sm font-medium text-slate-200 transition hover:border-blue-400/40 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 sm:w-auto"
            >
              Download CV
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="flex items-center gap-3">
            {socials.map(({ href, label, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                aria-label={label}
                title={label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-800 bg-slate-950/80 text-slate-400 transition hover:-translate-y-0.5 hover:border-blue-400/40 hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

export default Hero
