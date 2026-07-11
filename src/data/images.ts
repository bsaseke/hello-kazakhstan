/* =========================================================================
   Responsive image helper. Source paths in the data files point at the
   original "/images/<name>.jpg"; the build ships pre-generated WebP variants
   at several widths (see scripts/optimize-images.mjs). This turns a base path
   into a `src` + `srcSet` so the browser downloads only the size it needs.
   ========================================================================= */

const WIDTHS = [480, 800, 1280, 1920] as const

export interface ResponsiveImage {
  src: string
  srcSet: string
}

export function responsiveImage(path: string): ResponsiveImage {
  const base = path.replace(/\.(jpe?g|png|webp)$/i, '')
  return {
    src: `${base}-1280.webp`,
    srcSet: WIDTHS.map((w) => `${base}-${w}.webp ${w}w`).join(', '),
  }
}
