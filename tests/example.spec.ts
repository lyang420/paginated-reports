
/* `example.spec.ts` is the default test file generated after installing
Playwright. For our purposes, we'll write our functionality tests in this file.

Important: Make sure to run `npm run dev` in the command line and wait for the
page to launch before running tests, otherwise tests will access a blank
localhost port and fail. */

import { test, expect } from '@playwright/test';

test('verify date filtering for UI', async ({ page }) => {
	await page.goto('http://localhost:3000/');

	const startDate = page.locator('div').filter({ hasText: /^Start Date$/ }).getByRole('textbox');
	const endDate = page.locator('div').filter({ hasText: /^End Date$/ }).getByRole('textbox');

	await expect(startDate).toHaveValue('2024-10-27');
	await expect(endDate).toHaveValue('2024-10-29');
	await expect(page.getByRole('main')).toContainText('Oct 27, 2024 - Oct 29, 2024');

	await startDate.fill('2024-11-01');
	await endDate.fill('2024-11-05');

	await expect(startDate).toHaveValue('2024-11-01');
	await expect(endDate).toHaveValue('2024-11-05');
	await expect(page.getByRole('main')).toContainText('Nov 1, 2024 - Nov 5, 2024');
});

test('verify date filtering for URL', async ({ page }) => {
	await page.goto('http://localhost:3000/?startDate=2024-11-01&endDate=2024-11-05');

	const startDate = page.locator('div').filter({ hasText: /^Start Date$/ }).getByRole('textbox');
	const endDate = page.locator('div').filter({ hasText: /^End Date$/ }).getByRole('textbox');
	
	await expect(startDate).toHaveValue('2024-11-01');
	await expect(endDate).toHaveValue('2024-11-05');
	await expect(page.getByRole('main')).toContainText('Nov 1, 2024 - Nov 5, 2024');
});
