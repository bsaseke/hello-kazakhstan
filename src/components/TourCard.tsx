import { Link } from 'react-router-dom'
import type { Tour } from '../data/tours'
import { whatsappLink } from '../data/copy'
import { responsiveImage } from '../data/images'
import { useI18n } from '../i18n'
import { Badge } from './Badge'
import { Pill } from './Pill'
import { Rating } from './Rating'
import { PhotoPlaceholder } from './PhotoPlaceholder'
import { HeartIcon, WhatsAppIcon } from './icons'
import styles from './TourCard.module.css'

interface TourCardProps {
  tour: Tour
  isFavourite: boolean
  onToggleFavourite: (id: string) => void
}

export function TourCard({ tour, isFavourite, onToggleFavourite }: TourCardProps) {
  const { t, lang } = useI18n()
  const titleId = `tour-${tour.id}-title`

  // booking message stays in English so the (local) operator always reads it
  const bookHref = whatsappLink(
    `Hi! I'm interested in the "${tour.title.en}" tour (${tour.durationKey === 'd1' ? '1 day' : tour.durationKey === 'd2n1' ? '2 days 1 night' : '3 days 2 nights'}, from $${tour.priceFrom} per person). Could you share availability?`,
  )

  return (
    <article className={styles.card} aria-labelledby={titleId}>
      <div className={styles.media}>
        <PhotoPlaceholder
          alt={tour.alt[lang]}
          from={tour.placeholder.from}
          to={tour.placeholder.to}
          ratio="4 / 3"
          showTag={false}
          {...responsiveImage(tour.image)}
          sizes="(max-width: 560px) 92vw, (max-width: 900px) 45vw, 344px"
        />

        <div className={styles.topLeft}>
          <Badge>{t.catalog.durationShort[tour.durationKey]}</Badge>
        </div>

        <button
          type="button"
          className={styles.fav}
          aria-pressed={isFavourite}
          aria-label={isFavourite ? t.tours.removeFavourite : t.tours.addFavourite}
          onClick={() => onToggleFavourite(tour.id)}
        >
          <HeartIcon size={20} filled={isFavourite} />
        </button>
      </div>

      <div className={styles.body}>
        <div className={styles.metaRow}>
          <span className={styles.category}>{t.catalog.categories[tour.category]}</span>
          {/* one accent per context: bestseller OR best-price, never both */}
          {tour.bestseller ? (
            <Pill variant="promo">{t.tours.bestseller}</Pill>
          ) : tour.bestPrice ? (
            <Pill variant="price">{t.tours.bestPrice}</Pill>
          ) : null}
        </div>

        <h3 className={styles.title} id={titleId}>
          {/* stretched link — makes the whole card open the detail page while
              the heart toggle and book button stay independently clickable */}
          <Link to={`/tours/${tour.slug}`} className={styles.titleLink}>
            {tour.title[lang]}
          </Link>
        </h3>

        <p className={styles.desc}>{tour.description[lang]}</p>

        <div className={styles.divider} />

        <div className={styles.footer}>
          <Rating value={tour.rating} count={tour.reviewCount} countLabel={t.tours.reviews} />
          <span className={styles.price}>
            <span className={styles.priceFrom}>{t.tours.from}</span>
            <span className={styles.priceValue}>${tour.priceFrom}</span>
          </span>
        </div>

        <a
          className={styles.book}
          href={bookHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon size={18} />
          {t.tours.bookThis}
        </a>
      </div>
    </article>
  )
}
