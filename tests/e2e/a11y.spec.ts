import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { pages } from '../../src/lib/site.ts';

// Reduced motion keeps the scroll reveal from holding text at a partial opacity
// while axe measures contrast.
test.use({ contextOptions: { reducedMotion: 'reduce' } });

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

for (const entry of pages) {
	test(`axe finds no violations on ${entry.path}`, async ({ page }) => {
		await page.goto(entry.path);
		const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
		expect(
			results.violations.map((violation) => ({
				id: violation.id,
				nodes: violation.nodes.map((node) => node.target.join(' '))
			}))
		).toEqual([]);
	});
}

test('axe finds no violations with the mobile menu open', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/');
	await page.getByRole('button', { name: 'Menu' }).click();
	// WCAG rules only. The best-practice rules "one main landmark" and "one h1" fail here
	// by design: the page behind the open menu is hidden, as `inert` hid it before.
	const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
	expect(results.violations.map((violation) => violation.id)).toEqual([]);
});
