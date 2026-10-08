#!/usr/bin/env node
// Regenerate the AVIF + WebP variants the pages load through <picture>/srcset.
// Run from the repo root after adding or replacing an image:
//
//   npm install            (once; installs sharp)
//   npm run images
//
// The original JPG/PNG stays in place: it is the <img src> fallback and the
// source for og/render.sh and print/. Variants are written next to it as
// <name>-<width>.avif and <name>-<width>.webp. Widths are capped at the
// original's width (no upscaling). Sources under 16 KB (the brand logos and
// two deal logos) are skipped, because a variant saves nothing there. If you
// add a width or an image here, add the <picture> and srcset in the HTML too.

import { readdir, stat, unlink } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');

// dir (relative to images/) -> widths to emit, and whether the art is a logo
// (flat color with transparency) or a photo.
const SETS = [
  { dir: 'treated', widths: [360, 640, 900, 1280, 1600], kind: 'photo' },
  { dir: 'team', widths: [320, 560], kind: 'photo', skip: /-thumb\./ },
  { dir: 'team/advisors', widths: [160, 320], kind: 'photo' },
  { dir: 'deals', widths: [200, 400], kind: 'logo' },
  { dir: '.', widths: [360, 720], kind: 'photo', only: /^process-guide-cover\.jpg$/ },
];

const QUALITY = {
  photo: { avif: { quality: 50, effort: 6 }, webp: { quality: 72, effort: 6 } },
  logo: { avif: { quality: 64, effort: 6 }, webp: { quality: 88, alphaQuality: 100, effort: 6 } },
};

const MIN_BYTES = 16 * 1024;

const isSource = (name) => /\.(jpe?g|png)$/i.test(name);
const isVariant = (name) => /-\d+\.(avif|webp)$/i.test(name);

let before = 0;
let after = 0;
const rows = [];

for (const set of SETS) {
  const dir = path.join(ROOT, 'images', set.dir);
  const names = await readdir(dir);

  // Drop stale variants first so a removed or renamed source leaves nothing behind.
  for (const name of names.filter(isVariant)) await unlink(path.join(dir, name));

  for (const name of names.filter(isSource)) {
    if (set.only && !set.only.test(name)) continue;
    if (set.skip && set.skip.test(name)) continue;

    const file = path.join(dir, name);
    if ((await stat(file)).size < MIN_BYTES) continue;
    const base = name.replace(/\.[^.]+$/, '');
    const meta = await sharp(file).metadata();
    // Cap at the original's width, and keep that width as the largest variant
    // so high-density screens never get less detail than the original had.
    const widths = set.widths.filter((w) => w < meta.width);
    if (set.widths.some((w) => w >= meta.width)) widths.push(meta.width);

    const sizes = [];
    for (const width of widths) {
      for (const format of ['avif', 'webp']) {
        const out = path.join(dir, `${base}-${width}.${format}`);
        await sharp(file).resize({ width })[format](QUALITY[set.kind][format]).toFile(out);
        const { size } = await stat(out);
        sizes.push(`${width}.${format} ${Math.round(size / 1024)}K`);
        if (format === 'avif' && width === widths.at(-1)) after += size;
      }
    }
    const { size } = await stat(file);
    before += size;
    rows.push(`${path.join(set.dir, name)} (${meta.width}x${meta.height}, ${Math.round(size / 1024)}K) -> ${sizes.join(', ')}`);
  }
}

console.log(rows.join('\n'));
console.log(`\n${rows.length} images. Originals ${Math.round(before / 1024)}K; largest AVIF of each ${Math.round(after / 1024)}K.`);
