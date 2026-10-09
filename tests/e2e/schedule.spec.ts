import { expect, test } from '@playwright/test';
import { SCHEDULE_URL } from '../../src/lib/site.ts';

test('"Schedule a Call" opens the on-site calendar, not a new tab', async ({ page }) => {
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.goto('/');
	const link = page
		.getByRole('banner')
		.getByRole('link', { name: /Schedule a Call/ })
		.first();
	await expect(link).not.toHaveAttribute('target', '_blank');
	await link.click();
	await expect(page).toHaveURL(/\/schedule$/);

	const frame = page.locator('iframe');
	await expect(frame).toHaveAttribute('src', `${SCHEDULE_URL}?gv=true`);
	await expect(frame).toHaveAttribute('title', /.+/);
});

test('no "Schedule a Call" link leaves the site', async ({ page }) => {
	for (const path of ['/', '/contact', '/case-studies/saas', '/case-studies/hvac']) {
		await page.goto(path);
		const hrefs = await page
			.getByRole('link', { name: /Schedule a Call/ })
			.evaluateAll((links) => links.map((link) => link.getAttribute('href')));
		expect(hrefs.length, `${path} has no schedule link`).toBeGreaterThan(0);
		expect(new Set(hrefs), path).toEqual(new Set(['/schedule']));
	}
});
