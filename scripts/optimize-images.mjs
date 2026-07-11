/* =========================================================================
   Generate responsive WebP variants from the source JPGs.
   Source (full-res originals, NOT deployed): /assets/images/*.jpg
   Output (deployed):                          /public/images/<name>-<w>.webp
   Run with: npm run images
   ========================================================================= */

import { readdir, mkdir } from 'node:fs/promises'
import { join, parse } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = fileURLToPath(new URL('..', import.meta.url))
const SRC = join(root, 'assets', 'images')
const OUT = join(root, 'public', 'images')

// widths cover phone → retina desktop / full-bleed hero
const WIDTHS = [480, 800, 1280, 1920]
const QUALITY = 72

await mkdir(OUT, { recursive: true })

// optional CLI args = specific source filenames to process; otherwise, all
const argv = process.argv.slice(2)
const files = (argv.length ? argv : await readdir(SRC)).filter((f) =>
  /\.(jpe?g|png)$/i.test(f),
)
let totalOut = 0

for (const file of files) {
  const { name } = parse(file)
  const input = join(SRC, file)

  // Always emit every width so `srcset`/`src` references never 404. Sources
  // smaller than a target width are gently upscaled (a few low-res photos).
  for (const w of WIDTHS) {
    const outPath = join(OUT, `${name}-${w}.webp`)
    const info = await sharp(input)
      .resize({ width: w })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(outPath)
    totalOut += info.size
  }
  console.log(`✓ ${file}`)
}

console.log(
  `\nDone: ${files.length} source images → WebP. Total output: ${(totalOut / 1024 / 1024).toFixed(2)} MB`,
)
