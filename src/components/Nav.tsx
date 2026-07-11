import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useT } from '../i18n'
import { navLinks, whatsappLink } from '../data/copy'
import { Button } from './Button'
import { LanguageSwitcher } from './LanguageSwitcher'
import { CloseIcon, MenuIcon, WhatsAppIcon } from './icons'
import styles from './Nav.module.css'

export function Nav() {
  const t = useT()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header className={[styles.nav, scrolled ? styles.scrolled : ''].join(' ')}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.brand} aria-label="Hello Kazakhstan — home">
          <img
            className={styles.mark}
            src="/logo/logo.svg"
            alt=""
            aria-hidden="true"
            width={40}
            height={40}
          />
          <span className={styles.wordmark}>
            <span className={styles.brandName}>Hello Kazakhstan</span>
            <span className={styles.brandTag}>{t.nav.brandTagline}</span>
          </span>
        </Link>

        <nav className={styles.links} aria-label="Primary">
          {navLinks.map((link) => (
            <Link key={link.key} to={`/${link.href}`} className={styles.link}>
              {t.nav[link.key]}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <LanguageSwitcher />
          <span className={styles.ctaDesktop}>
            <Button
              as="a"
              href={whatsappLink()}
              external
              variant="cta"
              leadingIcon={<WhatsAppIcon size={18} />}
            >
              {t.nav.bookNow}
            </Button>
          </span>
          <button
            type="button"
            className={styles.burger}
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.sheet}>
          <nav className={styles.sheetLinks} aria-label="Mobile">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                to={`/${link.href}`}
                className={styles.sheetLink}
                onClick={() => setMenuOpen(false)}
              >
                {t.nav[link.key]}
              </Link>
            ))}
          </nav>
          <Button
            as="a"
            href={whatsappLink()}
            external
            variant="cta"
            size="lg"
            fullWidth
            leadingIcon={<WhatsAppIcon size={20} />}
          >
            {t.nav.bookNow}
          </Button>
        </div>
      )}
    </header>
  )
}
