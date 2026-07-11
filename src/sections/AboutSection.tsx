import { useT } from '../i18n'
import { Button } from '../components/Button'
import { PhotoPlaceholder } from '../components/PhotoPlaceholder'
import { responsiveImage } from '../data/images'
import styles from './AboutSection.module.css'

export function AboutSection() {
  const t = useT()

  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className={`container ${styles.grid}`}>
        <div className={styles.media}>
          <PhotoPlaceholder
            alt="A traveller taking in the turquoise first Kolsai lake in the Tien Shan mountains"
            from="#1f6f78"
            to="#0b3a44"
            ratio="4 / 5"
            rounded
            {...responsiveImage('/images/kolsai4.jpg')}
            sizes="(max-width: 768px) 92vw, 420px"
          />
        </div>
        <div className={styles.text}>
          <p className="eyebrow">{t.about.eyebrow}</p>
          <h2 className={styles.heading} id="about-heading">
            {t.about.heading}
          </h2>
          {t.about.body.map((para, i) => (
            <p className={styles.para} key={i}>
              {para}
            </p>
          ))}
          <p className={styles.signature}>{t.about.signature}</p>
          <div className={styles.cta}>
            <Button as="a" href="#tours" variant="secondary">
              {t.about.exploreTours}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
