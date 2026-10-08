import { expect, test } from '@playwright/test';

// The site ships no JavaScript. These tests also switch it off in the browser,
// so nothing can depend on it by accident.
test.use({ javaScriptEnabled: false });

test('the mobile menu opens and closes', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/');
	const menu = page.locator('#site-nav');
	await expect(menu).toBeHidden();
	await page.getByRole('button', { name: 'Menu' }).click();
	await expect(menu).toBeVisible();
	await expect(menu.getByRole('link', { name: 'Case Studies' })).toBeVisible();
	await page.getByRole('button', { name: 'Menu' }).click();
	await expect(menu).toBeHidden();
});

test('an FAQ answer opens', async ({ page }) => {
	await page.goto('/');
	const first = page.locator('details[name="faq"]').first();
	await expect(first.locator('p')).toBeHidden();
	await first.locator('summary').click();
	await expect(first.locator('p')).toBeVisible();
});

test('content is visible when the scroll reveal does not run', async ({ browser }) => {
	// Reduced motion switches the reveal off, as a browser without scroll-driven
	// animations does. Every block must then be fully visible with no script.
	const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce' });
	const page = await context.newPage();
	await page.goto('/about');
	await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
	const reveals = page.locator('.reveal');
	const count = await reveals.count();
	expect(count).toBeGreaterThan(3);
	for (let i = 0; i < count; i++) {
		await expect(reveals.nth(i)).toHaveCSS('opacity', '1');
	}
	await context.close();
});

test('contact validation errors come from the server', async ({ page }) => {
	await page.goto('/contact');
	await page.getByLabel('Name').fill('Test Owner');
	// Passes the browser's type="email" check, fails the server's.
	await page.getByLabel('Email').fill('owner@localhost');
	await page.getByLabel('Message').fill('A short note.');
	// Submit from the keyboard. Playwright cannot run its "element is stable" check
	// for a click on this button with scripts off; contact.spec.ts covers the click.
	await page.getByLabel('Email').press('Enter');

	await expect(page).toHaveURL(/#contact-form$/);
	await expect(page.getByRole('alert')).toContainText('Please enter a valid email address.');
	await expect(page.getByLabel('Email')).toHaveAttribute('aria-invalid', 'true');
	// What the visitor typed is still there.
	await expect(page.getByLabel('Name')).toHaveValue('Test Owner');
	await expect(page.getByLabel('Message')).toHaveValue('A short note.');
});
