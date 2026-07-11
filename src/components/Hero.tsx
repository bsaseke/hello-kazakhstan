import { useT } from '../i18n'
import { whatsappLink } from '../data/copy'
import { responsiveImage } from '../data/images'
import { Button } from './Button'
import { WhatsAppIcon } from './icons'
import styles from './Hero.module.css'

const heroImage = responsiveImage('/images/charyn5.jpg')

export function Hero() {
  const t = useT()

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.photo}>
        {/* LCP image: eager-loaded and preloaded (with priority) in index.html */}
        <img
          className={styles.photoImg}
          src={heroImage.src}
          srcSet={heroImage.srcSet}
          sizes="100vw"
          alt={t.hero.photoCredit}
          decoding="async"
        />
      </div>
      <div className={styles.scrim} />

      <div className={`container ${styles.inner}`}>
        <p className={styles.eyebrow}>{t.hero.eyebrow}</p>
        <h1 className={styles.headline} id="hero-title">
          {t.hero.headline}
        </h1>
        <p className={styles.sub}>{t.hero.sub}</p>
        <div className={styles.actions}>
          <Button as="a" href="#tours" variant="primary" size="lg">
            {t.hero.exploreTours}
          </Button>
          <Button
            as="a"
            href={whatsappLink()}
            external
            variant="cta"
            size="lg"
            leadingIcon={<WhatsAppIcon size={20} />}
          >
            {t.hero.bookNow}
          </Button>
        </div>
      </div>
    </section>
  )
}
