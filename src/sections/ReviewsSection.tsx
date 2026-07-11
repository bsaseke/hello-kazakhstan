import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import { useI18n, useT } from '../i18n'
import { reviews, type Review } from '../data/reviews'
import { SectionHeading } from '../components/SectionHeading'
import { Rating } from '../components/Rating'
import { ChevronLeftIcon, ChevronRightIcon } from '../components/icons'
import styles from './ReviewsSection.module.css'

function ReviewCard({ review }: { review: Review }) {
  return (
    <>
      <header className={styles.author}>
        <span className={styles.avatar} aria-hidden="true">
          {review.name.charAt(0)}
        </span>
        <span className={styles.authorMeta}>
          <span className={styles.name}>{review.name}</span>
          <span className={styles.from}>{review.from}</span>
        </span>
      </header>

      <div className={styles.ratingRow}>
        <Rating value={review.rating} size={16} />
        <span className={styles.source}>via Tripadvisor</span>
      </div>

      <h3 className={styles.title}>{review.title}</h3>
      <blockquote className={styles.quote}>{review.quote}</blockquote>
      <footer className={styles.date}>{review.date}</footer>
    </>
  )
}

export function ReviewsSection() {
  const t = useT()
  const { dir } = useI18n()
  const last = reviews.length - 1

  const [active, setActive] = useState(0)
  const [offset, setOffset] = useState(0)
  const [ready, setReady] = useState(false)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)

  // Translate the track so the active card sits in the centre of the viewport.
  // Uses layout boxes (offsetLeft/Width), unaffected by the visual scale.
  const measure = useCallback(() => {
    const vp = viewportRef.current
    const track = trackRef.current
    if (!vp || !track) return
    const slide = track.children[active] as HTMLElement | undefined
    if (!slide) return
    setOffset(vp.clientWidth / 2 - (slide.offsetLeft + slide.offsetWidth / 2))
  }, [active])

  useLayoutEffect(() => {
    measure()
  }, [measure])

  // Enable the slide transition only after first paint (no entrance slide).
  useEffect(() => {
    setReady(true)
  }, [])

  useEffect(() => {
    const onResize = () => measure()
    window.addEventListener('resize', onResize)
    let cancelled = false
    // re-centre once the web fonts settle (card widths can shift)
    document.fonts?.ready.then(() => {
      if (!cancelled) measure()
    })
    return () => {
      cancelled = true
      window.removeEventListener('resize', onResize)
    }
  }, [measure])

  const go = (d: 1 | -1) =>
    setActive((i) => Math.min(last, Math.max(0, i + d)))

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(dir === 'rtl' ? 1 : -1)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(dir === 'rtl' ? -1 : 1)
    }
  }

  // In RTL the visual "previous" sits on the right, so mirror the glyphs.
  const PrevIcon = dir === 'rtl' ? ChevronRightIcon : ChevronLeftIcon
  const NextIcon = dir === 'rtl' ? ChevronLeftIcon : ChevronRightIcon

  return (
    <section id="reviews" className="section" aria-labelledby="reviews-heading">
      <div className="container">
        <SectionHeading
          eyebrow={t.reviews.eyebrow}
          title={t.reviews.heading}
          align="center"
          id="reviews-heading"
        >
          <div className={styles.summary}>
            <Rating value={5.0} size={20} />
            <span className={styles.summaryText}>{t.reviews.summary}</span>
          </div>
        </SectionHeading>
      </div>

      <div
        className={styles.carousel}
        role="group"
        aria-roledescription="carousel"
        aria-label={t.reviews.carouselLabel}
      >
        <button
          type="button"
          className={styles.arrow}
          aria-label={t.reviews.prev}
          onClick={() => go(-1)}
          disabled={active === 0}
        >
          <PrevIcon size={26} />
        </button>

        <div
          className={styles.viewport}
          ref={viewportRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          <ul
            className={`${styles.track} ${ready ? styles.animated : ''}`}
            ref={trackRef}
            style={{ transform: `translateX(${offset}px)` }}
          >
            {reviews.map((review, i) => (
              <li
                key={review.name + review.title}
                className={`${styles.card} ${i === active ? styles.active : styles.dim}`}
                aria-hidden={i !== active}
                onClick={i !== active ? () => setActive(i) : undefined}
              >
                <ReviewCard review={review} />
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className={styles.arrow}
          aria-label={t.reviews.next}
          onClick={() => go(1)}
          disabled={active === last}
        >
          <NextIcon size={26} />
        </button>
      </div>

      {/* announce the active review to assistive tech on change */}
      <p className="visually-hidden" aria-live="polite">
        {reviews[active].name}: {reviews[active].title}
      </p>

      <div className={styles.dots} role="tablist" aria-label={t.reviews.carouselLabel}>
        {reviews.map((review, i) => (
          <button
            key={review.name + review.title}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`${i + 1} / ${reviews.length}`}
            className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </section>
  )
}
