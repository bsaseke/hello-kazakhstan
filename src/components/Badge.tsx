import type { ReactNode } from 'react'
import styles from './Badge.module.css'

interface BadgeProps {
  children: ReactNode
  className?: string
}

/** Duration badge — Ink Black fill, white text. Overlaid on a photo. */
export function Badge({ children, className }: BadgeProps) {
  return (
    <span className={[styles.badge, className ?? ''].filter(Boolean).join(' ')}>
      {children}
    </span>
  )
}
