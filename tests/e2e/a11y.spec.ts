import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { pages } from '../../src/lib/site.ts';

// Reduced motion keeps the scroll reveal from holding text at a partial opacity
// while axe measures contrast.
test.use({ contextOptions: { reducedMotion: 'reduce' } });

for (const entry of pages) {
	test(`axe finds no violations on ${entry.path}`, async ({ page }) => {
		await page.goto(entry.path);
		const results = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
			.analyze();
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
	const results = await new AxeBuilder({ page }).analyze();
	expect(results.violations.map((violation) => violation.id)).toEqual([]);
});
