import { HeroSection } from '../sections/HeroSection'
import { TrustSection } from '../sections/TrustSection'
import { ToursSection } from '../sections/ToursSection'
import { MarqueeBand } from '../sections/MarqueeBand'
import { WhyChooseSection } from '../sections/WhyChooseSection'
import { AboutSection } from '../sections/AboutSection'
import { ReviewsSection } from '../sections/ReviewsSection'
import { CTASection } from '../sections/CTASection'
import { useT } from '../i18n'

export function HomePage() {
  const t = useT()
  return (
    <>
      <HeroSection />
      <TrustSection />
      {/* the catalogue, split into the operator's two groups */}
      <ToursSection
        id="tours"
        group="multiDay"
        heading={t.catalog.sectionMultiDay}
        regionsAnchor
      />
      <ToursSection
        id="one-day-tours"
        group="oneDay"
        heading={t.catalog.sectionOneDay}
      />
      <MarqueeBand />
      <WhyChooseSection />
      <AboutSection />
      <ReviewsSection />
      <CTASection />
    </>
  )
}
