import { TrustStrip } from '../components/TrustStrip'
import styles from './TrustSection.module.css'

export function TrustSection() {
  return (
    <section className={styles.wrap} aria-label="Why you can book with confidence">
      <div className="container">
        <TrustStrip />
      </div>
    </section>
  )
}
