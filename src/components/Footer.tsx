import { Link } from 'react-router-dom'
import { useT } from '../i18n'
import { navLinks, socials, whatsappLink } from '../data/copy'
import styles from './Footer.module.css'

export function Footer() {
  const t = useT()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brandCol}>
          <Link to="/" className={styles.brand}>
            <img
              className={styles.mark}
              src="/logo/logo.svg"
              alt=""
              aria-hidden="true"
              width={44}
              height={44}
            />
            <span className={styles.brandName}>Hello Kazakhstan</span>
          </Link>
          <p className={styles.tagline}>{t.footer.tagline}</p>
        </div>

        <nav className={styles.col} aria-label={t.footer.exploreHeading}>
          <h2 className={styles.colHeading}>{t.footer.exploreHeading}</h2>
          <ul>
            {navLinks.map((link) => (
              <li key={link.key}>
                <Link to={`/${link.href}`} className={styles.link}>
                  {t.nav[link.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.col}>
          <h2 className={styles.colHeading}>{t.footer.contactHeading}</h2>
          <ul>
            <li>
              <a href={`tel:${t.footer.phone.replace(/[^+\d]/g, '')}`} className={styles.link}>
                {t.footer.phone}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink()}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </li>
            <li className={styles.muted}>{t.footer.location}</li>
          </ul>
        </div>

        <nav className={styles.col} aria-label={t.footer.followHeading}>
          <h2 className={styles.colHeading}>{t.footer.followHeading}</h2>
          <ul>
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className={styles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p className={styles.hashtags}>{t.footer.hashtags}</p>
        <p className={styles.rights}>{t.footer.rights}</p>
      </div>
    </footer>
  )
}
