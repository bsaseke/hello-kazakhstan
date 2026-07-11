/* Rotate a source photo in place (for images saved with the wrong orientation
   and no EXIF flag). Usage: node scripts/rotate-source.mjs <file> [degrees] */

import { rename } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = fileURLToPath(new URL('..', import.meta.url))
const [file, deg = '90'] = process.argv.slice(2)
if (!file) {
  console.error('usage: node scripts/rotate-source.mjs <file> [degrees]')
  process.exit(1)
}

const src = join(root, 'assets', 'images', file)
const tmp = `${src}.rot.jpg`
await sharp(src).rotate(Number(deg)).jpeg({ quality: 92 }).toFile(tmp)
await rename(tmp, src)
console.log(`rotated ${file} by ${deg}°`)
