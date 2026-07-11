import type { ReactNode } from 'react'
import styles from './SectionHeading.module.css'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  sub?: string
  align?: 'start' | 'center'
  /** heading level for correct document outline */
  as?: 'h2' | 'h3'
  id?: string
  children?: ReactNode
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = 'start',
  as: Tag = 'h2',
  id,
  children,
}: SectionHeadingProps) {
  return (
    <header className={[styles.head, styles[align]].join(' ')}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag className={styles.title} id={id}>
        {title}
      </Tag>
      {sub && <p className={styles.sub}>{sub}</p>}
      {children}
    </header>
  )
}
