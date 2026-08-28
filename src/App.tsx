import { PageShell } from './components/layout/page-shell'
import { SiteDock } from './components/site-dock'
import Hero from './sections/Hero'
import About from './sections/About'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Certificates from './sections/Certificates'
import Contact from './sections/Contact'

function App() {
  return (
    <PageShell>
      <main className="space-y-20 pb-32">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Certificates />
        <Contact />
      </main>
      <SiteDock />
    </PageShell>
  )
}

export default App
