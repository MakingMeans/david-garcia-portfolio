import { Card } from '../components/ui/card'
import { SectionHeading } from '../components/layout/section-heading'

const items = [
  {
    title: 'Systems Engineering Student',
    period: '2021 — Present',
    description: 'Studying at Universidad El Bosque while strengthening backend development, algorithms and systems design.',
  },
  {
    title: 'Backend Development & Competitive Programming',
    period: '2023 — Present',
    description: 'Building APIs, exploring architecture patterns and training for algorithmic competitions with a strong focus on problem solving.',
  },
]

function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="space-y-8">
        <SectionHeading
          number="02"
          title="Experience & Learning"
          description="A growing path shaped by software development, education and continuous technical exploration."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {items.map((item) => (
            <Card key={item.title} className="space-y-3">
              <p className="text-sm uppercase tracking-[0.25em] text-blue-400">{item.period}</p>
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="text-sm leading-7 text-slate-400">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience