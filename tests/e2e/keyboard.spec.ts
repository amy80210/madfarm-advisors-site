import { expect, test } from '@playwright/test';

test.describe('mobile menu with the keyboard', () => {
	test.use({ viewport: { width: 390, height: 844 } });

	test('opens, traps the page behind it, and Escape returns focus', async ({ page }) => {
		await page.goto('/');
		const toggle = page.getByRole('button', { name: 'Menu' });
		const menu = page.locator('#site-nav');

		await page.keyboard.press('Tab');
		await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
		await page.keyboard.press('Tab');
		await expect(page.getByRole('link', { name: 'Madfarm Advisors home' })).toBeFocused();
		await page.keyboard.press('Tab');
		await expect(toggle).toBeFocused();
		await expect(menu).toBeHidden();

		await page.keyboard.press('Enter');
		await expect(menu).toBeVisible();

		// The page behind the menu is out of reach.
		await expect(page.locator('main')).toHaveCSS('visibility', 'hidden');
		await expect(page.locator('footer')).toHaveCSS('visibility', 'hidden');

		// Tab moves from the button into the menu and stays inside the header.
		await page.keyboard.press('Tab');
		await expect(menu.getByRole('link', { name: 'Process' })).toBeFocused();
		for (let i = 0; i < 8; i++) {
			await page.keyboard.press('Tab');
			const inMain = await page.evaluate(() => !!document.activeElement?.closest('main, footer'));
			expect(inMain).toBe(false);
		}

		await page.keyboard.press('Escape');
		await expect(menu).toBeHidden();
		await expect(toggle).toBeFocused();
		await expect(page.locator('main')).toHaveCSS('visibility', 'visible');
	});
});

test.describe('desktop header', () => {
	test('Tab order runs through the nav and marks the current page', async ({ page }) => {
		await page.goto('/process');
		await expect(page.getByRole('button', { name: 'Menu' })).toBeHidden();
		const nav = page.getByRole('navigation', { name: 'Primary' });
		await expect(nav.getByRole('link', { name: 'Process' })).toHaveAttribute(
			'aria-current',
			'page'
		);
		await expect(nav.getByRole('link', { name: 'About' })).not.toHaveAttribute('aria-current');

		await page.keyboard.press('Tab'); // skip link
		await page.keyboard.press('Tab'); // brand
		for (const name of ['Process', 'Case Studies', 'About', 'Contact']) {
			await page.keyboard.press('Tab');
			await expect(nav.getByRole('link', { name, exact: true })).toBeFocused();
		}
		await page.keyboard.press('Tab');
		await expect(nav.getByRole('link', { name: /Schedule a Call/ })).toBeFocused();
	});

	test('the skip link moves to main', async ({ page }) => {
		await page.goto('/about');
		await page.keyboard.press('Tab');
		await page.keyboard.press('Enter');
		await expect(page).toHaveURL(/#main$/);
	});
});

test('FAQ opens with Enter and Space, one at a time', async ({ page }) => {
	await page.goto('/');
	const items = page.locator('details[name="faq"]');
	await expect(items).toHaveCount(5);

	await items.nth(0).locator('summary').focus();
	await page.keyboard.press('Enter');
	await expect(items.nth(0)).toHaveAttribute('open', '');

	await items.nth(1).locator('summary').focus();
	await page.keyboard.press('Space');
	await expect(items.nth(1)).toHaveAttribute('open', '');
	await expect(items.nth(0)).not.toHaveAttribute('open');

	await page.keyboard.press('Space');
	await expect(items.nth(1)).not.toHaveAttribute('open');
});
