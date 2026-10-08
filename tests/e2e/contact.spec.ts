import { expect, test } from '@playwright/test';

// No MAILERSEND_API_KEY is set for the test server, so a submission that
// reached MailerSend would show the "not configured" error, never success.

test.beforeEach(async ({ page }) => {
	await page.goto('/contact');
});

test('name, email and message are required; phone and company are not', async ({ page }) => {
	for (const label of ['Name', 'Email', 'Message']) {
		await expect(page.getByLabel(label, { exact: true })).toHaveAttribute('required', '');
	}
	await expect(page.getByLabel(/^Phone/)).not.toHaveAttribute('required');
	await expect(page.getByLabel(/^Company/)).not.toHaveAttribute('required');

	// The browser blocks an empty submission before it reaches the server.
	await page.getByRole('button', { name: /Send Message/ }).click();
	await expect(page).toHaveURL(/\/contact$/);
	const missing = await page
		.getByLabel('Name', { exact: true })
		.evaluate((input: HTMLInputElement) => input.validity.valueMissing);
	expect(missing).toBe(true);
});

test('fields carry autocomplete tokens', async ({ page }) => {
	await expect(page.getByLabel('Name', { exact: true })).toHaveAttribute('autocomplete', 'name');
	await expect(page.getByLabel('Email', { exact: true })).toHaveAttribute('autocomplete', 'email');
	await expect(page.getByLabel(/^Phone/)).toHaveAttribute('autocomplete', 'tel');
	await expect(page.getByLabel(/^Company/)).toHaveAttribute('autocomplete', 'organization');
});

test('whitespace-only required fields are rejected by the server', async ({ page }) => {
	await page.getByLabel('Name', { exact: true }).fill('   ');
	await page.getByLabel('Email', { exact: true }).fill('owner@example.com');
	await page.getByLabel('Message', { exact: true }).fill('A short note.');
	await page.getByRole('button', { name: /Send Message/ }).click();

	await expect(page.getByRole('alert')).toContainText('Name, email, and message are required.');
	await expect(page.getByLabel('Name', { exact: true })).toHaveAttribute('aria-invalid', 'true');
});

test('a bad email is rejected by the server', async ({ page }) => {
	await page.getByLabel('Name', { exact: true }).fill('Test Owner');
	await page.getByLabel('Email', { exact: true }).fill('owner@localhost');
	await page.getByLabel('Message', { exact: true }).fill('A short note.');
	await page.getByRole('button', { name: /Send Message/ }).click();

	await expect(page.getByRole('alert')).toContainText('Please enter a valid email address.');
	await expect(page.getByLabel('Email', { exact: true })).toHaveAttribute('aria-invalid', 'true');
});

test('a filled honeypot returns success without sending', async ({ page }) => {
	await page.getByLabel('Name', { exact: true }).fill('Bot');
	await page.getByLabel('Email', { exact: true }).fill('bot@example.com');
	await page.getByLabel('Message', { exact: true }).fill('Spam.');
	// The honeypot is off-screen, so set it without a visibility check.
	await page.locator('input[name="website"]').evaluate((input: HTMLInputElement) => {
		input.value = 'https://spam.example';
	});
	await page.getByRole('button', { name: /Send Message/ }).click();

	await expect(page.getByRole('status')).toContainText('Thank you');
	await expect(page.getByRole('alert')).toHaveCount(0);
});

test('a real submission without an API key reports the failure', async ({ page }) => {
	await page.getByLabel('Name', { exact: true }).fill('Test Owner');
	await page.getByLabel('Email', { exact: true }).fill('owner@example.com');
	await page.getByLabel('Message', { exact: true }).fill('A short note.');
	await page.getByRole('button', { name: /Send Message/ }).click();

	await expect(page.getByRole('alert')).toContainText('info@madfarm-advisors.com');
});

test('the honeypot is hidden from screen readers and the tab order', async ({ page }) => {
	const trap = page.locator('input[name="website"]');
	await expect(trap).toHaveAttribute('tabindex', '-1');
	const hidden = await trap.evaluate((input) => !!input.closest('[aria-hidden="true"]'));
	expect(hidden).toBe(true);
});
