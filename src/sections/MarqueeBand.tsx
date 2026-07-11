import { Marquee } from '../components/Marquee'
import { useT } from '../i18n'

export function MarqueeBand() {
  const t = useT()
  return <Marquee phrases={t.marquee} />
}
