import { useEffect, useState } from 'react'
import styles from './Marquee.module.css'

interface MarqueeProps {
  phrases: string[]
}

/**
 * Signature scrolling ticker. Tulip Red band, white text, gold dot separators.
 * Seamless loop = render the track twice and translate by -50%.
 * Respects prefers-reduced-motion: renders static (no auto-scroll).
 */
export function Marquee({ phrases }: MarqueeProps) {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // One visual sequence; duplicated for the seamless loop.
  const sequence = (
    <>
      {phrases.map((phrase, i) => (
        <span className={styles.item} key={i}>
          <span className={styles.text}>{phrase}</span>
          <span className={styles.dot} aria-hidden="true" />
        </span>
      ))}
    </>
  )

  return (
    <div className={styles.band} role="marquee" aria-label="Hello Kazakhstan">
      <div className={`${styles.track} ${reduced ? styles.static : ''}`}>
        <div className={styles.group}>{sequence}</div>
        {!reduced && (
          <div className={styles.group} aria-hidden="true">
            {sequence}
          </div>
        )}
      </div>
    </div>
  )
}
