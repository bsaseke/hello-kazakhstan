import type { ReactNode } from 'react'
import styles from './Button.module.css'

type Variant = 'primary' | 'cta' | 'secondary' | 'ghost'
type Size = 'md' | 'lg'

interface CommonProps {
  variant?: Variant
  size?: Size
  children: ReactNode
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  className?: string
  fullWidth?: boolean
}

type ButtonAsButton = CommonProps & {
  as?: 'button'
  onClick?: () => void
  type?: 'button' | 'submit'
  href?: never
}

type ButtonAsLink = CommonProps & {
  as: 'a'
  href: string
  /** anchors that leave the site (WhatsApp, socials) */
  external?: boolean
  onClick?: never
}

type ButtonProps = ButtonAsButton | ButtonAsLink

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    children,
    leadingIcon,
    trailingIcon,
    className,
    fullWidth,
  } = props

  const cls = [
    styles.btn,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  const inner = (
    <>
      {leadingIcon && <span className={styles.icon}>{leadingIcon}</span>}
      <span className={styles.label}>{children}</span>
      {trailingIcon && <span className={styles.icon}>{trailingIcon}</span>}
    </>
  )

  if (props.as === 'a') {
    const external = props.external
    return (
      <a
        href={props.href}
        className={cls}
        {...(external
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        {inner}
      </a>
    )
  }

  return (
    <button
      type={props.type ?? 'button'}
      className={cls}
      onClick={props.onClick}
    >
      {inner}
    </button>
  )
}
