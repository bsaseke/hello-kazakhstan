import { Link, useParams } from 'react-router-dom'
import { getTourBySlug } from '../data/tours'
import { whatsappLink } from '../data/copy'
import { responsiveImage } from '../data/images'
import { useI18n } from '../i18n'
import { Button } from '../components/Button'
import {
  ArrowLeftIcon,
  CalendarIcon,
  CheckIcon,
  StarIcon,
  UsersIcon,
  WhatsAppIcon,
} from '../components/icons'
import styles from './TourDetailPage.module.css'

export function TourDetailPage() {
  const { t, lang } = useI18n()
  const { slug } = useParams<{ slug: string }>()
  const tour = getTourBySlug(slug)

  if (!tour) {
    return (
      <div className={`container ${styles.notFound}`}>
        <h1 className={styles.notFoundTitle}>{t.tourDetail.notFoundTitle}</h1>
        <p className={styles.notFoundBody}>{t.tourDetail.notFoundBody}</p>
        <Button as="a" href="/#tours" variant="primary">
          {t.tourDetail.browseAll}
        </Button>
      </div>
    )
  }

  // booking message stays in English so the (local) operator always reads it
  const bookHref = whatsappLink(
    `Hi! I'm interested in the "${tour.title.en}" tour (${tour.durationKey === 'd1' ? '1 day' : tour.durationKey === 'd2n1' ? '2 days 1 night' : '3 days 2 nights'}, from $${tour.priceFrom} per person). Could you share availability?`,
  )

  return (
    <article className={styles.page}>
      {/* ---- Image column (left on desktop / top on mobile) ---- */}
      <div className={styles.media}>
        <img
          className={styles.img}
          {...responsiveImage(tour.image)}
          sizes="(max-width: 900px) 100vw, 560px"
          alt={tour.alt[lang]}
          decoding="async"
        />
        <div className={styles.scrim} />
        <div className={styles.mediaInner}>
          <p className={styles.category}>{t.catalog.categories[tour.category]}</p>
          <h1 className={styles.title}>{tour.title[lang]}</h1>
          <p className={styles.lead}>{tour.description[lang]}</p>
          <p className={styles.starting}>
            <span className={styles.startingLabel}>{t.tourDetail.startingFrom}</span>
            <span className={styles.price}>${tour.priceFrom}</span>
            <span className={styles.per}>{t.tourDetail.perPerson}</span>
          </p>
        </div>
      </div>

      {/* ---- Details column ---- */}
      <div className={styles.content}>
        <Link to="/#tours" className={styles.back}>
          <ArrowLeftIcon size={18} />
          {t.tourDetail.back}
        </Link>

        <ul className={styles.stats}>
          <li className={styles.stat}>
            <span className={styles.statIcon}>
              <CalendarIcon size={22} />
            </span>
            <span className={styles.statText}>
              <strong>{t.catalog.durationLong[tour.durationKey]}</strong>
              <small>{t.tourDetail.durationLabel}</small>
            </span>
          </li>
          <li className={styles.stat}>
            <span className={styles.statIcon}>
              <UsersIcon size={22} />
            </span>
            <span className={styles.statText}>
              <strong>{t.catalog.groupType}</strong>
              <small>{t.tourDetail.groupLabel}</small>
            </span>
          </li>
          <li className={styles.stat}>
            <span className={`${styles.statIcon} ${styles.statIconGold}`}>
              <StarIcon size={20} />
            </span>
            <span className={styles.statText}>
              <strong>{tour.rating.toFixed(1)}</strong>
              <small>{t.tourDetail.ratingLabel}</small>
            </span>
          </li>
        </ul>

        <section className={styles.block}>
          <h2 className={styles.blockHeading}>{t.tourDetail.aboutHeading}</h2>
          <p className={styles.about}>{tour.longDescription[lang]}</p>
        </section>

        <section className={styles.block}>
          <h2 className={styles.blockHeading}>{t.tourDetail.highlightsHeading}</h2>
          <ul className={styles.highlights}>
            {tour.highlights[lang].map((place) => (
              <li key={place}>
                <span className={styles.dot} aria-hidden="true" />
                {place}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.block}>
          <h2 className={styles.blockHeading}>{t.tourDetail.includedHeading}</h2>
          <ul className={styles.included}>
            {tour.included.map((key) => (
              <li key={key}>
                <CheckIcon size={18} />
                {t.catalog.services[key]}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.block}>
          <h2 className={styles.blockHeading}>{t.tourDetail.pricingHeading}</h2>
          <table className={styles.priceTable}>
            <thead>
              <tr>
                <th scope="col">{t.tourDetail.groupSize}</th>
                <th scope="col">{t.tourDetail.pricePerPerson}</th>
              </tr>
            </thead>
            <tbody>
              {tour.pricing.map((row) => (
                <tr key={row.people}>
                  <td>{t.catalog.people[`p${row.people}` as keyof typeof t.catalog.people]}</td>
                  <td className={styles.tablePrice}>${row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className={styles.note}>{t.tourDetail.pricingNote}</p>
        </section>

        <Button
          as="a"
          href={bookHref}
          external
          variant="cta"
          size="lg"
          fullWidth
          leadingIcon={<WhatsAppIcon size={20} />}
        >
          {t.tourDetail.bookNow}
        </Button>
      </div>
    </article>
  )
}
