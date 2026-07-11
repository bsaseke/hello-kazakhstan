import { useState } from 'react'
import { toursByGroup, type TourGroup } from '../data/tours'
import { TourCard } from '../components/TourCard'
import styles from './ToursSection.module.css'

interface ToursSectionProps {
  id: string
  group: TourGroup
  heading: string
  /** render the #regions scroll anchor (only on the first tours section) */
  regionsAnchor?: boolean
}

export function ToursSection({ id, group, heading, regionsAnchor }: ToursSectionProps) {
  // Favourite hearts are local-only state, keyed by tour id.
  const [favourites, setFavourites] = useState<Set<string>>(() => new Set())

  const toggleFavourite = (tourId: string) =>
    setFavourites((prev) => {
      const next = new Set(prev)
      next.has(tourId) ? next.delete(tourId) : next.add(tourId)
      return next
    })

  const list = toursByGroup(group)
  const headingId = `${id}-heading`

  return (
    <section id={id} className={styles.section} aria-labelledby={headingId}>
      {regionsAnchor && <span id="regions" className={styles.anchor} aria-hidden="true" />}
      <div className="container">
        <h2 className={styles.heading} id={headingId}>
          {heading}
        </h2>
        <div className={styles.grid}>
          {list.map((tour) => (
            <TourCard
              key={tour.id}
              tour={tour}
              isFavourite={favourites.has(tour.id)}
              onToggleFavourite={toggleFavourite}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
