import { ArrowUpRight } from 'lucide-react'
import { Section } from '../components/layout/section'
import { ExpandableCards, type ExpandableCardItem } from '../components/ui/expandable-card'
import { Reveal } from '../components/common/reveal'
import { projects } from '../data/projects'
import { site } from '../data/site'

const cards: ExpandableCardItem[] = projects.map((project) => ({
  title: project.title,
  summary: project.summary,
  content: project.content,
  images: project.images,
  tags: project.stack,
  meta: project.period,
  ctaText: project.demo ? 'Open demo' : 'View code',
  ctaLink: project.demo ?? project.repo,
}))

function Projects() {
  return (
    <Section
      id="projects"
      number="03"
      title="Selected Projects"
      description="Academic and personal work published on GitHub. Open a card for the full story."
    >
      <ExpandableCards items={cards} />

      <Reveal>
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-blue-400 transition hover:text-blue-300"
        >
          See every repository on GitHub
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </Reveal>
    </Section>
  )
}

export default Projects
