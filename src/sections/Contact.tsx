import { Card } from '../components/ui/card'
import { SectionHeading } from '../components/layout/section-heading'

function Contact() {
  return (
    <section id="contact" className="py-24 pb-32">
      <div className="space-y-8">
        <SectionHeading
          number="05"
          title="Get in touch"
          description="Open to collaboration, internships and conversations about backend systems and modern web development."
        />
        <Card variant="accent" className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-white">Let’s build something meaningful.</h3>
            <p className="max-w-2xl text-sm leading-7 text-slate-300">
              Reach out if you want to discuss APIs, architecture, software engineering or opportunities to work together.
            </p>
          </div>
          <a
            href="mailto:davidgar2105@gmail.com"
            className="inline-flex items-center justify-center rounded-full bg-blue-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            Contact me
          </a>
        </Card>
      </div>
    </section>
  )
}

export default Contact