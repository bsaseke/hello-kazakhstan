import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'

// the tour detail page is a separate route — split it out of the initial bundle
const TourDetailPage = lazy(() =>
  import('./pages/TourDetailPage').then((m) => ({ default: m.TourDetailPage })),
)

/**
 * On navigation: scroll to the hash target if there is one (so the nav's
 * "#tours" style links work from any page), otherwise scroll to the top.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      // wait a frame for the destination page to render
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    } else {
      window.scrollTo({ top: 0, left: 0 })
    }
  }, [pathname, hash])

  return null
}

export default function App() {
  const { pathname } = useLocation()
  // the tour detail page is a focused, full-bleed layout — no footer
  const showFooter = !pathname.startsWith('/tours/')

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <span id="top" />
      <ScrollManager />
      <Nav />
      <main id="main">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tours/:slug" element={<TourDetailPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      {showFooter && <Footer />}
    </>
  )
}
