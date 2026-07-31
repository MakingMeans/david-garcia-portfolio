import { Card } from '../components/ui/card'
import { SectionHeading } from '../components/layout/section-heading'

const projects = [
  {
    title: 'API Services & Backend Systems',
    description: 'Designing robust service layers for data-intensive applications with maintainable structure and clear contracts.',
  },
  {
    title: 'Modern Web Apps',
    description: 'Combining React, Vite and Tailwind to deliver polished interfaces that stay fast, accessible and easy to evolve.',
  },
]

function Projects() {
  return (
    <section id="projects" className="py-24">
      <div className="space-y-8">
        <SectionHeading
          number="03"
          title="Selected Projects"
          description="A portfolio of work that highlights backend strength and modern frontend delivery."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.title} className="space-y-3">
              <h3 className="text-xl font-semibold text-white">{project.title}</h3>
              <p className="text-sm leading-7 text-slate-400">{project.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects