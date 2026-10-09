// Screenshot diff between two builds of the site.
//
//   OLD_URL=http://localhost:5101 NEW_URL=http://localhost:5102 npm run visual-diff
//
// OLD_URL serves the reference, NEW_URL the candidate. Set OLD_LEGACY=1 when the
// reference is the pre-SvelteKit site, which uses the `.html` URLs.
// Optional: ONLY=/about,/contact limits the pages. THRESHOLD=1 sets the pass mark in percent.
// Diff images go to ./visual-diff/. Exit code 1 when a page is over the threshold.

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { pages } from '../src/lib/site.ts';

const OLD_URL = process.env.OLD_URL;
const NEW_URL = process.env.NEW_URL;
if (!OLD_URL || !NEW_URL) {
	console.error('Set OLD_URL and NEW_URL.');
	process.exit(2);
}
const legacy = process.env.OLD_LEGACY === '1';
const only = process.env.ONLY?.split(',');
const threshold = Number(process.env.THRESHOLD ?? 1);
const widths = [390, 820, 1440];
const outDir = path.resolve('visual-diff');

/** Full-page screenshot with lazy images loaded and motion off. */
async function capture(browser, url, width) {
	const context = await browser.newContext({
		viewport: { width, height: 900 },
		reducedMotion: 'reduce',
		deviceScaleFactor: 1
	});
	const page = await context.newPage();
	await page.goto(url, { waitUntil: 'networkidle' });
	// Scroll through the page so every `loading="lazy"` image is requested.
	await page.evaluate(async () => {
		const step = window.innerHeight / 2;
		for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
			window.scrollTo(0, y);
			await new Promise((resolve) => setTimeout(resolve, 40));
		}
		window.scrollTo(0, 0);
		await Promise.all([...document.images].map((img) => img.decode().catch(() => {})));
		await document.fonts.ready;
	});
	await page.waitForLoadState('networkidle');
	const buffer = await page.screenshot({ fullPage: true, animations: 'disabled' });
	await context.close();
	return PNG.sync.read(buffer);
}

/** Pads an image to the given height so two captures can be compared pixel by pixel. */
function pad(png, height) {
	if (png.height === height) return png;
	const out = new PNG({ width: png.width, height });
	out.data.fill(255);
	png.data.copy(out.data, 0, 0, png.data.length);
	return out;
}

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
const rows = [];

for (const entry of pages) {
	if (only && !only.includes(entry.path)) continue;
	for (const width of widths) {
		const oldPath = legacy ? (entry.legacyPath ?? entry.path) : entry.path;
		const [before, after] = await Promise.all([
			capture(browser, OLD_URL + oldPath, width),
			capture(browser, NEW_URL + entry.path, width)
		]);
		const height = Math.max(before.height, after.height);
		const a = pad(before, height);
		const b = pad(after, height);
		const diff = new PNG({ width, height });
		const mismatched = pixelmatch(a.data, b.data, diff.data, width, height, { threshold: 0.1 });
		const percent = (mismatched / (width * height)) * 100;
		const name = `${entry.path === '/' ? 'home' : entry.path.slice(1).replaceAll('/', '-')}-${width}`;
		await writeFile(path.join(outDir, `${name}-old.png`), PNG.sync.write(before));
		await writeFile(path.join(outDir, `${name}-new.png`), PNG.sync.write(after));
		await writeFile(path.join(outDir, `${name}-diff.png`), PNG.sync.write(diff));
		rows.push({
			page: entry.path,
			width,
			oldHeight: before.height,
			newHeight: after.height,
			percent: Number(percent.toFixed(2)),
			pass: percent < threshold
		});
	}
}

await browser.close();
console.table(rows);
await writeFile(path.join(outDir, 'report.json'), JSON.stringify(rows, null, 2));

const failed = rows.filter((row) => !row.pass);
console.log(`${rows.length - failed.length}/${rows.length} under ${threshold}%`);
process.exit(failed.length ? 1 : 0);
