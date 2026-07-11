import { useT } from '../i18n'
import { whatsappLink } from '../data/copy'
import { Button } from '../components/Button'
import { WhatsAppIcon } from '../components/icons'
import styles from './CTASection.module.css'

export function CTASection() {
  const t = useT()

  return (
    <section className={`section ${styles.section}`} aria-labelledby="cta-heading">
      <div className={`container ${styles.panel}`}>
        <p className={styles.eyebrow}>{t.cta.eyebrow}</p>
        <h2 className={styles.headline} id="cta-heading">
          {t.cta.headline}
        </h2>
        <p className={styles.sub}>{t.cta.sub}</p>
        <Button
          as="a"
          href={whatsappLink()}
          external
          variant="cta"
          size="lg"
          leadingIcon={<WhatsAppIcon size={22} />}
        >
          {t.cta.bookNow}
        </Button>
      </div>
    </section>
  )
}
