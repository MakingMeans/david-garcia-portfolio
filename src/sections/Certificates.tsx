import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { SectionHeading } from '../components/layout/section-heading'

const certificates = [
  {
    title: 'Programming Competitions',
    tag: 'Algorithms',
    description: 'Recognition through university and national programming contests that strengthened problem-solving discipline.',
  },
  {
    title: 'Software Development Foundations',
    tag: 'Backend',
    description: 'Continuous practice with backend tools, APIs and systems thinking across modern development stacks.',
  },
]

function Certificates() {
  return (
    <section id="certificates" className="py-24">
      <div className="space-y-8">
        <SectionHeading
          number="04"
          title="Certificates & Achievements"
          description="Recognition and milestones that support a strong engineering and problem-solving foundation."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {certificates.map((certificate) => (
            <Card key={certificate.title} className="space-y-3">
              <Badge variant="accent">{certificate.tag}</Badge>
              <h3 className="text-xl font-semibold text-white">{certificate.title}</h3>
              <p className="text-sm leading-7 text-slate-400">{certificate.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certificates