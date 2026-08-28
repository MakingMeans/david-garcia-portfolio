export interface ExperienceItem {
  /** Human-readable range, e.g. "2023 – 2027 (expected)". */
  period: string
  role: string
  organisation: string
  description: string
  highlights: string[]
}

/**
 * Timeline entries, ordered newest-first by end date (ongoing items lead).
 * To add one, drop a new object in at the right position – nothing else needs
 * to change.
 */
export const experience: ExperienceItem[] = [
  {
    period: '2023 – 2027 (expected)',
    role: 'Systems Engineering, 8th semester',
    organisation: 'Universidad El Bosque',
    description:
      'Degree in progress, with coursework centred on software construction, relational databases, networks and computer architecture.',
    highlights: [
      'Full-stack development across Java, Python, PHP and TypeScript',
      'Relational database design and reporting on MySQL and PostgreSQL',
      'REST API design, web applications and technical documentation',
    ],
  },
  {
    period: '2024 – Present',
    role: 'Competitive programmer',
    organisation: 'ICPC · CCPL · Universidad El Bosque',
    description:
      'Regular contestant in national and internal programming competitions, training in algorithms, data structures and problem solving under time pressure.',
    highlights: [
      '2nd place · CCPL 2026-R4, Universidad Católica',
      '1st place · 4th Internal Programming Marathon 2025, Universidad El Bosque',
      '2nd place · CCPL 2025-R4, Universidad Católica',
      '51st place · ICPC Colombia 2025, XXXIX Maratón Nacional ACIS/REDIS',
      '2nd place · CCPL 2024-R7, Universidad El Bosque',
    ],
  },
  {
    period: '2025',
    role: 'Peer tutor, Desarrollo de Sistemas de Información II',
    organisation: 'Universidad El Bosque · DIGINEXA',
    description:
      'Appointed peer tutor for the 2025-2 term, running individual and group tutoring for students in lower semesters and building the supporting course material.',
    highlights: [
      'Individual and group tutoring on programming fundamentals',
      'Pedagogical content created for synchronous and asynchronous sessions',
    ],
  },
]
