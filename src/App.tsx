import { PageShell } from './components/layout/page-shell'
import { BootScreen } from './components/boot-screen'
import { SiteDock } from './components/site-dock'
import { CodeforcesModalProvider } from './components/codeforces/codeforces-modal'
import Hero from './sections/Hero'
import About from './sections/About'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Certificates from './sections/Certificates'
import Contact from './sections/Contact'

function App() {
  return (
    <>
      <BootScreen />
      <CodeforcesModalProvider>
        <PageShell>
          <main>
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Certificates />
            <Contact />
          </main>
          <SiteDock />
        </PageShell>
      </CodeforcesModalProvider>
    </>
  )
}

export default App
