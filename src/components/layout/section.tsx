import type { ReactNode } from 'react'
import { Container } from './container'
import { SectionHeading } from './section-heading'
import { Reveal } from '../common/reveal'
import { cn } from '../../lib/cn'

interface SectionProps {
  /** Anchor id – must match the dock's href for scroll-spy to light it up. */
  id: string
  /** Two-digit marker; sections are read in order, so the number carries meaning. */
  number: string
  title: string
  description?: string
  children: ReactNode
  className?: string
}

/**
 * Standard content section: full-bleed wrapper, contained column, numbered
 * heading and a revealed body. Every section below the hero uses this, so
 * spacing and heading rhythm stay identical across the page.
 */
export function Section({ id, number, title, description, children, className }: SectionProps) {
  return (
    <section id={id} className={cn('py-24', className)}>
      <Container className="space-y-12">
        <Reveal>
          <SectionHeading number={number} title={title} description={description} />
        </Reveal>
        {children}
      </Container>
    </section>
  )
}
