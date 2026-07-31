import { SocialLink } from '../components/common/social-link'

function Hero() {
  return (
    <section id="hero" className="grid min-h-[calc(100vh-96px)] items-center gap-12 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
      <div className="space-y-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">Hello! My name is</p>
        <div className="space-y-4">
          <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">David García.</h1>
          <p className="text-3xl font-semibold tracking-tight text-slate-300 sm:text-4xl">Backend Developer focused on APIs, data-driven systems and scalable architecture.</p>
        </div>
        <p className="max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
          Systems Engineering student building REST APIs, web applications, and database-driven solutions with Python, Java, Go, Spring Boot and FastAPI. Passionate about software architecture, optimization and competitive programming.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href="mailto:davidgar2105@gmail.com"
            className="inline-flex items-center justify-center rounded-full bg-blue-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            Get in touch
          </a>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 px-6 py-3 text-sm font-medium text-slate-200 transition hover:border-blue-400/30 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            Download CV
          </a>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <SocialLink href="mailto:davidgar2105@gmail.com" label="Email" icon={<span>✉️</span>} />
          <SocialLink href="https://github.com/davidgarcia" label="GitHub" icon={<span>🐱</span>} />
          <SocialLink href="https://www.linkedin.com/in/davidgarcia" label="LinkedIn" icon={<span>💼</span>} />
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-800/70 bg-slate-950/80 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <div className="flex h-full flex-col gap-6 rounded-[1.75rem] border border-slate-800/80 bg-slate-900/80 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-400">About this portfolio</p>
          <div className="space-y-4">
            <p className="text-slate-300">
              This portfolio is designed to show technical strength in backend development, systems thinking and modern frontend composition using React, Vite, and Tailwind.
            </p>
            <p className="text-slate-400">
              It is structured to be responsive, accessible and easy to expand with project, experience and certificate sections.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-800/70 bg-slate-950/90 p-5">
              <p className="text-sm text-slate-400">Current focus</p>
              <p className="mt-2 text-xl font-semibold text-white">APIs & Architecture</p>
            </div>
            <div className="rounded-3xl border border-slate-800/70 bg-slate-950/90 p-5">
              <p className="text-sm text-slate-400">Tools</p>
              <p className="mt-2 text-xl font-semibold text-white">Python, Java, Go</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
