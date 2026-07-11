/* Convert the self-hosted TTF/OTF fonts to WOFF2 (≈40-50% smaller).
   Run with: node scripts/convert-fonts.mjs */

import { readFile, writeFile, readdir } from 'node:fs/promises'
import { join, parse } from 'node:path'
import { fileURLToPath } from 'node:url'
import woff2 from 'wawoff2'

const root = fileURLToPath(new URL('..', import.meta.url))
const DIR = join(root, 'public', 'fonts')

const files = (await readdir(DIR)).filter((f) => /\.(ttf|otf)$/i.test(f))

for (const file of files) {
  const input = await readFile(join(DIR, file))
  const out = await woff2.compress(input)
  const outName = `${parse(file).name}.woff2`
  await writeFile(join(DIR, outName), out)
  console.log(
    `✓ ${file} (${(input.length / 1024).toFixed(0)} KB) → ${outName} (${(out.length / 1024).toFixed(0)} KB)`,
  )
}
console.log('\nDone.')
