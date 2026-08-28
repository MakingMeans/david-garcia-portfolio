import { asset } from './site'

export interface Project {
  title: string
  /** One line, shown on the collapsed card. Keep it under ~60 characters. */
  summary: string
  /** Long form, shown once the card expands. */
  content: string
  /** Chips on the card; the first three show collapsed, all of them expanded. */
  stack: string[]
  repo: string
  /** When the project ran. Omit for undated work. */
  period?: string
  /** Live deployment. When set, the card's button links here instead of the repo. */
  demo?: string
  /** Every image in public/projects/<folder>; they auto-rotate on the card. */
  images: string[]
}

/** Helper so a project's images are declared as just a folder plus filenames. */
const gallery = (folder: string, files: string[] = ['01.svg', '02.svg', '03.svg']) =>
  files.map((file) => asset(`projects/${folder}/${file}`))

/**
 * Ongoing projects first (newest start date), then finished ones by end date.
 * Adding a project = one object here plus a folder under public/projects.
 */
export const projects: Project[] = [
  {
    title: 'ICPC Notebook',
    summary: 'Contest-ready algorithms and data structures',
    content:
      'A curated collection of Python and C++ implementations of the algorithms and data structures that come up in competitive programming – templates, solutions and problem-solving techniques prepared for coding contests and technical interviews. It is the reference I actually take into a competition.',
    stack: ['C++', 'Python', 'Algorithms', 'Data structures'],
    repo: 'https://github.com/MakingMeans/competitive-programming-icpc-algorithms',
    period: 'Jul 2026 – Present',
    images: gallery('icpc-algorithms'),
  },
  {
    title: 'Connect Four – React, FastAPI & AI',
    summary: 'Full-stack Connect Four with an AI opponent',
    content:
      'A modern take on Connect Four with fluid animations and a play-against-the-machine mode. The React and TypeScript client talks to a FastAPI service that holds the game rules and the AI opponent, with match results persisted so the board state survives a reload. Built with a clear front/back split so the solver can grow without touching the interface.',
    stack: ['React', 'TypeScript', 'FastAPI', 'Python'],
    repo: 'https://github.com/MakingMeans/ConnectFour-React-FastAPI-AI',
    period: 'Mar 2026 – Present',
    images: gallery('connect-four'),
  },
  {
    title: 'Judges AC Record',
    summary: 'Accepted solutions from VJudge and other online judges',
    content:
      'A running record of my accepted submissions across VJudge and other competitive programming platforms, organised by judge and by topic. Keeping it structured this way turns a pile of solved problems into something searchable – when a contest problem rhymes with one I have already solved, the previous approach is one folder away.',
    stack: ['Java', 'C++', 'Python', 'Problem solving'],
    repo: 'https://github.com/MakingMeans/competitive-programming-judges-ac-record',
    period: 'Nov 2025 – Present',
    images: gallery('judges-ac-record'),
  },
  {
    title: 'Tienda Genérica – Spring Boot Microservices',
    summary: 'Retail transactions platform on a microservices architecture',
    content:
      'A commercial transactions management system for a retail store, built as a distributed set of Spring Boot and Spring Cloud services: a Eureka server for service discovery, an API Gateway as the single entry point, and domain services for authentication, clients, suppliers, product catalog, purchases and sales. Access control runs on Spring Security with JWT, with ADMIN, GERENTE and CAJERO roles carrying different permissions across the platform. The front end is React with Vite, talking to the backend through the gateway, and MySQL is managed through Docker Compose with scripts that initialise, start and stop the whole system.',
    stack: ['Java', 'Spring Boot', 'Spring Cloud', 'JWT', 'React', 'MySQL', 'Docker'],
    repo: 'https://github.com/MakingMeans/TiendaGenerica-Microservicios',
    period: 'Feb – May 2026',
    images: gallery('tienda-generica'),
  },
  {
    title: 'SophyFarm – Batch Processing',
    summary: 'Automated validation and loading of bulk inventory data',
    content:
      'A batch processing system for large volumes of inventory data, built in PHP over MySQL. It ingests CSV files holding thousands of product records, applies validation rules, detects errors and protects data integrity before anything is written. Two modes decide what happens when a record fails: selective inserts the valid rows and reports the rest, transactional rolls the whole run back so the database is never left half-loaded. The pipeline runs as scheduled Windows batch tasks covering load, reporting and cleanup, and reports results over email through PHPMailer and over WhatsApp through the CallMeBot API, with audit logs for every execution.',
    stack: ['PHP', 'MySQL', 'Batch processing', 'PHPMailer', 'CallMeBot API'],
    repo: 'https://github.com/MakingMeans/sophyfarm-procesos-batch',
    period: 'Oct – Dec 2025',
    images: gallery('sophyfarm'),
  },
  {
    title: 'IPv4 Network Calculator',
    summary: 'Subnetting calculator with binary visualisation',
    content:
      'A web calculator that derives full network information from an IPv4 address and its subnet mask, accepting the mask in either decimal notation or CIDR. It returns the network and broadcast addresses, the usable host range and the total number of available hosts, identifies the address class (A, B or C) and whether it is public or private, and renders the network and host portions in binary so the segmentation is visible rather than asserted. Built with plain HTML, CSS and JavaScript, and deployed to run on port 80 under Linux Rocky 9.',
    stack: ['JavaScript', 'HTML', 'CSS', 'Networking', 'Linux'],
    repo: 'https://github.com/MakingMeans/IPv4-Calculadora-RedesI',
    period: 'Oct – Nov 2025',
    images: gallery('ipv4-calculator'),
  },
  {
    title: 'Nominapp – Payroll Management',
    summary: 'Payroll system with auditing over PostgreSQL',
    content:
      'A web payroll management system covering the financial and administrative processes of an organisation: employees, departments, positions, payroll periods and accounting concepts, each as its own module. The backend is Python with Flask, organised into routes and services, over PostgreSQL as the primary relational store. Every change is written to an audit log, so salary and concept edits stay traceable – which was the part of the brief that actually shaped the schema.',
    stack: ['Python', 'Flask', 'PostgreSQL', 'Auditing'],
    repo: 'https://github.com/MakingMeans/DB2_SoftwareNomina',
    period: 'Apr – Jun 2025',
    images: gallery('payroll'),
  },
]
