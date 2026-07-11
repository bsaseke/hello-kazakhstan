import type { ReactNode } from 'react'
import styles from './Pill.module.css'

type PillVariant = 'category' | 'promo' | 'price'

interface PillProps {
  variant?: PillVariant
  children: ReactNode
  className?: string
}

/**
 * Small rounded tag. One badge style per context — never stack competing
 * accents on the same surface.
 *  - category: teal-tint bg, Petrol Teal text
 *  - promo:    red-tint bg, Tulip Red text (bestseller)
 *  - price:    gold-tint bg, ink text ("★ Best price")
 */
export function Pill({ variant = 'category', children, className }: PillProps) {
  return (
    <span className={[styles.pill, styles[variant], className ?? ''].filter(Boolean).join(' ')}>
      {children}
    </span>
  )
}
