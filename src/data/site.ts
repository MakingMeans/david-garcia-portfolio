// Single source of truth for every outbound link on the site.
export const site = {
  name: 'David García',
  fullName: 'David Santiago García Preciado',
  role: 'Backend Engineer · Systems Thinker',
  email: 'davidgar2105@gmail.com',
  github: 'https://github.com/MakingMeans',
  linkedin: 'https://www.linkedin.com/in/david-garcia-dev-sistemas/',
  // Deep link to the "Projects" block of the LinkedIn profile.
  linkedinProjects: 'https://www.linkedin.com/in/david-garcia-dev-sistemas/details/projects/',
} as const

export const mailto = `mailto:${site.email}`

// Assets live in /public, so they must be resolved against Vite's base path
// for the site to keep working under the GitHub Pages sub-directory.
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
