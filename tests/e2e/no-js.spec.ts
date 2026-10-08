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

test('content is visible without the scroll reveal', async ({ page }) => {
	await page.goto('/about');
	await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
	await expect(page.locator('.reveal').first()).toHaveCSS('opacity', '1');
});

test('contact validation errors come from the server', async ({ page }) => {
	await page.goto('/contact');
	await page.getByLabel('Name').fill('Test Owner');
	// Passes the browser's type="email" check, fails the server's.
	await page.getByLabel('Email').fill('owner@localhost');
	await page.getByLabel('Message').fill('A short note.');
	await page.getByRole('button', { name: /Send Message/ }).click();

	await expect(page).toHaveURL(/#contact-form$/);
	await expect(page.getByRole('alert')).toContainText('Please enter a valid email address.');
	await expect(page.getByLabel('Email')).toHaveAttribute('aria-invalid', 'true');
	// What the visitor typed is still there.
	await expect(page.getByLabel('Name')).toHaveValue('Test Owner');
	await expect(page.getByLabel('Message')).toHaveValue('A short note.');
});
