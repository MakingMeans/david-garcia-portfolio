import { PageShell } from './components/layout/page-shell'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Certificates from './sections/Certificates'
import Contact from './sections/Contact'

function App() {
  return (
    <PageShell>
      <Navbar />
      <main className="space-y-20">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Certificates />
        <Contact />
      </main>
    </PageShell>
  )
}

export default App