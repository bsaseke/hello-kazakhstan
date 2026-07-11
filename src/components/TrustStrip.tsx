import type { ReactNode } from 'react'
import { useT } from '../i18n'
import { HeadsetIcon, ShieldIcon, StarIcon, TagIcon } from './icons'
import styles from './TrustStrip.module.css'

interface Cell {
  icon: ReactNode
  title: string
  sub: string
}

export function TrustStrip() {
  const t = useT()

  const cells: Cell[] = [
    { icon: <ShieldIcon size={22} />, title: t.trust.secureTitle, sub: t.trust.secureSub },
    { icon: <TagIcon size={22} />, title: t.trust.priceTitle, sub: t.trust.priceSub },
    { icon: <HeadsetIcon size={22} />, title: t.trust.supportTitle, sub: t.trust.supportSub },
    { icon: <StarIcon size={22} />, title: t.trust.ratingTitle, sub: t.trust.ratingSub },
  ]

  return (
    <ul className={styles.strip}>
      {cells.map((cell) => (
        <li className={styles.cell} key={cell.title}>
          <span className={styles.icon}>{cell.icon}</span>
          <span className={styles.text}>
            <span className={styles.title}>{cell.title}</span>
            <span className={styles.sub}>{cell.sub}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}
