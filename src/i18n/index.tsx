import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Dictionary, LangCode } from './types'
import { LANGUAGES } from './types'
import { en } from './en'
import { ru } from './ru'
import { zh } from './zh'
import { ar } from './ar'

const DICTIONARIES: Record<LangCode, Dictionary> = { en, ru, zh, ar }

const STORAGE_KEY = 'hk-lang'

interface I18nContextValue {
  lang: LangCode
  setLang: (lang: LangCode) => void
  t: Dictionary
  dir: 'ltr' | 'rtl'
}

const I18nContext = createContext<I18nContextValue | null>(null)

function detectInitialLang(): LangCode {
  if (typeof window === 'undefined') return 'en'
  const stored = window.localStorage.getItem(STORAGE_KEY) as LangCode | null
  if (stored && stored in DICTIONARIES) return stored
  const nav = window.navigator.language.slice(0, 2).toLowerCase()
  if (nav === 'ru' || nav === 'zh' || nav === 'ar') return nav as LangCode
  return 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(detectInitialLang)

  const dir = useMemo(
    () => LANGUAGES.find((l) => l.code === lang)?.dir ?? 'ltr',
    [lang],
  )

  // Reflect language + direction onto the document so CSS logical
  // properties flip and assistive tech announces the right language.
  useEffect(() => {
    const html = document.documentElement
    html.setAttribute('lang', lang)
    html.setAttribute('dir', dir)
  }, [lang, dir])

  const setLang = useCallback((next: LangCode) => {
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore storage failures (private mode etc.) */
    }
  }, [])

  const value = useMemo<I18nContextValue>(
    () => ({ lang, setLang, t: DICTIONARIES[lang], dir }),
    [lang, setLang, dir],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}

/** Convenience hook returning just the active dictionary. */
export function useT(): Dictionary {
  return useI18n().t
}

export { LANGUAGES }
export type { LangCode }
