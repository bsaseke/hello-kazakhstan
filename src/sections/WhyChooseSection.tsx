import type { ReactNode } from 'react'
import { useT } from '../i18n'
import { SectionHeading } from '../components/SectionHeading'
import { CompassIcon, HandshakeIcon, MapPinIcon, SlidersIcon } from '../components/icons'
import styles from './WhyChooseSection.module.css'

export function WhyChooseSection() {
  const t = useT()

  // Flat rounded icons mapping to the four brand pillars
  const icons: ReactNode[] = [
    <HandshakeIcon size={24} />,
    <SlidersIcon size={24} />,
    <MapPinIcon size={24} />,
    <CompassIcon size={24} />,
  ]

  return (
    <section className="section" aria-labelledby="why-heading">
      <div className="container">
        <SectionHeading
          eyebrow={t.why.eyebrow}
          title={t.why.heading}
          sub={t.why.sub}
          align="center"
          id="why-heading"
        />
        <ul className={styles.grid}>
          {t.why.points.map((point, i) => (
            <li className={styles.card} key={point.title}>
              <span className={styles.icon}>{icons[i]}</span>
              <h3 className={styles.title}>{point.title}</h3>
              <p className={styles.body}>{point.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
