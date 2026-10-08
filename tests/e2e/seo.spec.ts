import { expect, test } from '@playwright/test';
import { pages, SITE_URL } from '../../src/lib/site.ts';

// The registry values were taken from the <head> of the old .html pages.
for (const entry of pages) {
	test(`SEO tags on ${entry.path}`, async ({ page }) => {
		await page.goto(entry.path);
		const canonical = `${SITE_URL}${entry.path}`;
		const image = `${SITE_URL}${entry.ogImage}`;
		const meta = (selector: string) => page.locator(selector).getAttribute('content');

		await expect(page).toHaveTitle(entry.title);
		expect(await meta('meta[name="description"]')).toBe(entry.description);
		expect(await page.locator('link[rel="canonical"]').getAttribute('href')).toBe(canonical);
		expect(await meta('meta[property="og:url"]')).toBe(canonical);
		expect(await meta('meta[property="og:type"]')).toBe(entry.ogType);
		expect(await meta('meta[property="og:title"]')).toBe(entry.title);
		expect(await meta('meta[property="og:description"]')).toBe(entry.description);
		expect(await meta('meta[property="og:image"]')).toBe(image);
		expect(await meta('meta[name="twitter:card"]')).toBe('summary_large_image');
		expect(await meta('meta[name="twitter:title"]')).toBe(entry.title);
		expect(await meta('meta[name="twitter:image"]')).toBe(image);

		const schemas = await page
			.locator('script[type="application/ld+json"]')
			.evaluateAll((nodes) => nodes.map((node) => JSON.parse(node.textContent ?? '{}')['@type']));
		expect(schemas).toEqual(
			entry.path === '/' ? ['FinancialService', 'WebSite'] : ['BreadcrumbList']
		);

		await expect(page.locator('h1')).toHaveCount(1);
	});
}

test('sitemap lists the 11 clean URLs', async ({ request }) => {
	const response = await request.get('/sitemap.xml');
	expect(response.ok()).toBe(true);
	const xml = await response.text();
	const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
	expect(locs).toEqual(pages.map((entry) => `${SITE_URL}${entry.path}`));
	expect(xml).not.toContain('.html');
});

test('pages ship no JavaScript', async ({ page }) => {
	for (const entry of pages) {
		await page.goto(entry.path);
		const scripts = await page
			.locator('script:not([type="application/ld+json"])')
			.evaluateAll((nodes) => nodes.length);
		expect(scripts, `${entry.path} has a script tag`).toBe(0);
	}
});
