import { ArrowUpRight } from 'lucide-react'
import { Section } from '../components/layout/section'
import { ExpandableCards, type ExpandableCardItem } from '../components/ui/expandable-card'
import { ProjectCover } from '../components/ui/project-cover'
import { Reveal } from '../components/common/reveal'
import { projects, screenshotsFor } from '../data/projects'
import { site } from '../data/site'

// The featured project leads; everything else keeps the order in the data file.
const ordered = [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)]

const cards: ExpandableCardItem[] = ordered.map((project) => ({
  title: project.title,
  summary: project.summary,
  content: project.content,
  images: screenshotsFor(project.slug),
  cover: <ProjectCover repo={project.repo} stack={project.stack} />,
  tags: project.stack,
  meta: project.period,
  featured: project.featured,
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
          className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 transition hover:text-blue-300"
        >
          See every repository on GitHub
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </Reveal>
    </Section>
  )
}

export default Projects
