import { asset } from './site'

export interface Certificate {
  title: string
  /** Who issued it. Rendered as chips under the card. */
  issuers: string[]
  year: string
  /**
   * Thumbnail under public/certificates. Leave it out and the card falls back
   * to a neutral tile, so an entry without artwork still looks deliberate.
   */
  image?: string
  /** Where the card links: a PDF under public/certificates, or a verification URL. */
  url?: string
  /** Link wording. Defaults to "View certificate". */
  linkLabel?: string
}

/**
 * Newest first. To add one: drop the PDF and a thumbnail in public/certificates
 * and add an object here – nothing else needs touching.
 *
 * PDFs served from public/ are published with the site, so anything containing
 * an ID number, an address or a salary has to be redacted first.
 */
export const certificates: Certificate[] = [
  {
    title: 'Google Cloud Computing Foundations Certificate',
    issuers: ['Google', 'Credly'],
    year: '2026',
    image: asset('certificates/google-cloud-foundations.png'),
    url: 'https://www.credly.com/badges/b48161cb-ef72-4ea1-95d1-b44c15cd62f4/public_url',
    linkLabel: 'Verify on Credly',
  },
  {
    title: 'Peer Tutor, Desarrollo de Sistemas de Información II',
    issuers: ['Universidad El Bosque', 'DIGINEXA'],
    year: '2025',
    image: asset('certificates/tutor-el-bosque-2025.webp'),
    url: asset('certificates/tutor-el-bosque-2025.pdf'),
  },
  {
    title: '51st place · ICPC Colombia 2025, XXXIX Maratón Nacional ACIS/REDIS',
    issuers: ['ICPC Foundation', 'ACIS/REDIS'],
    year: '2025',
    image: asset('certificates/icpc-colombia-2025.webp'),
    url: asset('certificates/icpc-colombia-2025.pdf'),
  },
]
