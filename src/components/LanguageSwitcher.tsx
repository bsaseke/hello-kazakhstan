import { useEffect, useRef, useState } from 'react'
import { LANGUAGES, useI18n } from '../i18n'
import { ChevronDownIcon, GlobeIcon } from './icons'
import styles from './LanguageSwitcher.module.css'

export function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current = LANGUAGES.find((l) => l.code === lang)!

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className={styles.wrap} ref={ref}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.nav.languageLabel}
        onClick={() => setOpen((o) => !o)}
      >
        <GlobeIcon size={18} />
        <span className={styles.code}>{current.label}</span>
        <ChevronDownIcon size={14} />
      </button>

      {open && (
        <ul className={styles.menu} role="listbox" aria-label={t.nav.languageLabel}>
          {LANGUAGES.map((l) => (
            <li key={l.code} role="option" aria-selected={l.code === lang}>
              <button
                type="button"
                className={[styles.option, l.code === lang ? styles.active : '']
                  .filter(Boolean)
                  .join(' ')}
                lang={l.code}
                onClick={() => {
                  setLang(l.code)
                  setOpen(false)
                }}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
