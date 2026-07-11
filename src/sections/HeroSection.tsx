import { Hero } from '../components/Hero'

// Thin section wrapper — the Hero component is self-contained (it renders its
// own <section> landmark). Kept for a consistent sections/ structure.
export function HeroSection() {
  return <Hero />
}
