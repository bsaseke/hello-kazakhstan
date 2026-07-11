import styles from './PhotoPlaceholder.module.css'

interface PhotoPlaceholderProps {
  /** descriptive alt text */
  alt: string
  from: string
  to: string
  /** e.g. "4 / 3" or "16 / 9" */
  ratio?: string
  className?: string
  rounded?: boolean
  /** show the small "PHOTO" tag (only relevant when no real image is set) */
  showTag?: boolean
  /** real image URL. When set, renders an <img>; the gradient stays as a
   *  loading backdrop. When omitted, falls back to the gradient stand-in. */
  src?: string
  /** responsive candidates + sizes hint for the rendered <img> */
  srcSet?: string
  sizes?: string
  /** load eagerly with high priority (use for above-the-fold images) */
  priority?: boolean
}

/**
 * Frames tour photography. When `src` is provided it renders a lazy-loaded
 * <img> over a warm gradient backdrop (the backdrop shows while the photo
 * loads and behind any transparency). Without `src` it's a labelled stand-in.
 */
export function PhotoPlaceholder({
  alt,
  from,
  to,
  ratio = '4 / 3',
  className,
  rounded = false,
  showTag = true,
  src,
  srcSet,
  sizes,
  priority = false,
}: PhotoPlaceholderProps) {
  return (
    <div
      className={[styles.photo, rounded ? styles.rounded : '', className ?? '']
        .filter(Boolean)
        .join(' ')}
      style={{
        aspectRatio: ratio,
        backgroundImage: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
      }}
      {...(src ? {} : { role: 'img', 'aria-label': alt })}
    >
      {src ? (
        <img
          className={styles.img}
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      ) : (
        <>
          {showTag && <span className={styles.tag}>Photo</span>}
          <span className={styles.caption}>{alt}</span>
        </>
      )}
    </div>
  )
}
