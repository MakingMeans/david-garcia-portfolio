import { Award, Briefcase, FileText, FolderGit2, Github, Home, Linkedin, Mail, User } from 'lucide-react'
import { FloatingDock, type FloatingDockItem } from './ui/floating-dock'
import { useActiveSection } from '../lib/use-active-section'
import { asset, site } from '../data/site'

const sectionItems: FloatingDockItem[] = [
  { title: 'Home', icon: <Home />, href: '#hero' },
  { title: 'About', icon: <User />, href: '#about' },
  { title: 'Experience', icon: <Briefcase />, href: '#experience' },
  { title: 'Projects', icon: <FolderGit2 />, href: '#projects' },
  { title: 'Certificates', icon: <Award />, href: '#certificates' },
  { title: 'Contact', icon: <Mail />, href: '#contact' },
]

const externalItems: FloatingDockItem[] = [
  { title: 'GitHub', icon: <Github />, href: site.github, external: true, startsGroup: true },
  { title: 'LinkedIn', icon: <Linkedin />, href: site.linkedin, external: true },
  { title: 'CV', icon: <FileText />, href: asset('cv.pdf'), external: true },
]

const dockItems = [...sectionItems, ...externalItems]
const sectionIds = sectionItems.map((item) => item.href.slice(1))

export function SiteDock() {
  const activeHref = useActiveSection(sectionIds)

  return <FloatingDock items={dockItems} activeHref={activeHref} labelMode="hover" />
}
