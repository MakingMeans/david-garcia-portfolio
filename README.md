# david-garcia-portfolio

Personal portfolio of David Santiago García Preciado, built with React + TypeScript + Vite and
deployed as a static site to GitHub Pages.

**Live:** https://makingmeans.github.io/david-garcia-portfolio/

## What's on the page

A single scrolling page, navigated by a floating dock instead of a top bar:

- **Home** – portrait, introduction, links and CV download
- **01 About** – background, an at-a-glance panel, the technologies I work with and my areas of focus
- **02 Experience** – a timeline of studies, competitions and teaching
- **03 Projects** – one featured project plus expandable cards; screenshots rotate when a project
  has them, otherwise the card shows a cover built from the repo and its stack
- **04 Certificates** – certificate cards, each linking to the original document or its
  verification page
- **05 Contact** – email and profiles

## Stack

React 19, TypeScript, Vite, Tailwind CSS 4, Motion, lucide-react, Geist and Geist Mono. The floating dock, expandable
cards and loaders are ports of [Aceternity UI](https://ui.aceternity.com) components, restyled for
this site.

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build
npm run lint
```

## Structure

Page content is data, not markup: every entry lives in `src/data/`, and the components in
`src/sections/` only decide how it is laid out.

```
src/
  data/         site links, quick facts, skills, focus areas, experience, projects, certificates
  sections/     one file per numbered section
  components/   layout/ (shell, container, section) · ui/ · common/
  lib/          class helper and hooks
  assets/       projects/<slug>/ – drop screenshots here and they appear on that project's card
public/         cv.pdf, profile.png, certificates/
```

Files under `public/` are published with the site, so any document added there must be free of
personal data such as ID numbers or salaries.

## Deployment

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`.
It requires **Settings → Pages → Source: GitHub Actions**.

The site is served from a repository sub-path, so `vite.config.ts` sets
`base: '/david-garcia-portfolio/'` and everything in `public/` is referenced through the `asset()`
helper in `src/data/site.ts`.

## License

MIT – see [LICENSE](LICENSE).
