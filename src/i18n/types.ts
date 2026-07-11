/* Shape shared by every language dictionary. EN is the source of truth;
   other languages must provide the same keys (EN fallback is acceptable as a
   clearly-marked placeholder while translation is in progress). */

export interface Dictionary {
  nav: {
    tours: string
    regions: string
    about: string
    reviews: string
    bookNow: string
    languageLabel: string
    openMenu: string
    closeMenu: string
    brandTagline: string
  }
  hero: {
    eyebrow: string
    headline: string
    sub: string
    exploreTours: string
    bookNow: string
    photoCredit: string
  }
  trust: {
    secureTitle: string
    secureSub: string
    priceTitle: string
    priceSub: string
    supportTitle: string
    supportSub: string
    ratingTitle: string
    ratingSub: string
  }
  tours: {
    eyebrow: string
    heading: string
    sub: string
    from: string
    reviews: string
    addFavourite: string
    removeFavourite: string
    bestseller: string
    bestPrice: string
    bookThis: string
  }
  marquee: string[]
  why: {
    eyebrow: string
    heading: string
    sub: string
    points: { title: string; body: string }[]
  }
  about: {
    eyebrow: string
    heading: string
    body: string[]
    signature: string
    exploreTours: string
  }
  reviews: {
    eyebrow: string
    heading: string
    summary: string
    /** accessible label for the carousel region */
    carouselLabel: string
    prev: string
    next: string
  }
  cta: {
    eyebrow: string
    headline: string
    sub: string
    bookNow: string
  }
  tourDetail: {
    back: string
    startingFrom: string
    perPerson: string
    durationLabel: string
    groupLabel: string
    ratingLabel: string
    aboutHeading: string
    highlightsHeading: string
    includedHeading: string
    pricingHeading: string
    groupSize: string
    pricePerPerson: string
    pricingNote: string
    bookNow: string
    notFoundTitle: string
    notFoundBody: string
    browseAll: string
  }
  /* shared, enumerated catalogue labels (categories, regions, durations,
     services, group-size labels) plus the day-tour section headings */
  catalog: {
    sectionMultiDay: string
    sectionOneDay: string
    groupType: string
    categories: {
      canyons: string
      lakes: string
      mountains: string
      desertWildlife: string
      cityEscape: string
      culture: string
    }
    regions: {
      almatyRegion: string
      tienShan: string
      almaty: string
    }
    durationShort: { d1: string; d2n1: string; d3n2: string }
    durationLong: { d1: string; d2n1: string; d3n2: string }
    /** group-size labels for 1..8 people (matches the price table) */
    people: {
      p1: string
      p2: string
      p3: string
      p4: string
      p5: string
      p6: string
      p7: string
      p8: string
    }
    services: {
      pickup: string
      transport: string
      transport4x4: string
      guide: string
      parkFees: string
      allFees: string
      lunch: string
      packedLunch: string
      breakfastDinner: string
      water: string
      stay1: string
      stay2: string
      cableCar: string
      kokTobe: string
      borderPermit: string
    }
  }
  footer: {
    tagline: string
    contactHeading: string
    phone: string
    location: string
    followHeading: string
    exploreHeading: string
    rights: string
    hashtags: string
  }
}

export type LangCode = 'en' | 'ru' | 'zh' | 'ar'

export interface LangMeta {
  code: LangCode
  label: string // shown in the switcher
  dir: 'ltr' | 'rtl'
}

export const LANGUAGES: LangMeta[] = [
  { code: 'en', label: 'EN', dir: 'ltr' },
  { code: 'ru', label: 'RU', dir: 'ltr' },
  { code: 'zh', label: '中文', dir: 'ltr' },
  { code: 'ar', label: 'العربية', dir: 'rtl' },
]
