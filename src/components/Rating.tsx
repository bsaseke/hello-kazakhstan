import { StarIcon } from './icons'
import styles from './Rating.module.css'

interface RatingProps {
  value: number
  /** review count; omit to hide the "(n reviews)" part */
  count?: number
  countLabel?: string
  /** show all five stars (default) or just one + value */
  compact?: boolean
  size?: number
}

/** ★★★★★ 5.0 (16 reviews) — stars in Steppe Gold, value ink, count muted. */
export function Rating({
  value,
  count,
  countLabel = 'reviews',
  compact = false,
  size = 16,
}: RatingProps) {
  const rounded = Math.round(value)
  const stars = compact ? 1 : 5

  return (
    <span className={styles.rating}>
      <span className={styles.stars} aria-hidden="true">
        {Array.from({ length: stars }).map((_, i) => (
          <StarIcon
            key={i}
            size={size}
            className={i < rounded || compact ? styles.on : styles.off}
          />
        ))}
      </span>
      <span className={styles.value}>{value.toFixed(1)}</span>
      {count != null && (
        <span className={styles.count}>
          ({count.toLocaleString()} {countLabel})
        </span>
      )}
      <span className="visually-hidden">
        {value.toFixed(1)} out of 5
        {count != null ? `, ${count} ${countLabel}` : ''}
      </span>
    </span>
  )
}
