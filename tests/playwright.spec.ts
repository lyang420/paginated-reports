
/* `example.spec.ts` is the default test file generated after installing
Playwright. For our purposes, we'll write our functionality tests in this file.

Important: Make sure to run `npm run dev` in the command line and wait for the
page to launch before running tests, otherwise tests will access a blank
localhost port and fail. */

import { test, expect } from '@playwright/test';
import { defineConfig } from '@playwright/test';

export default defineConfig({
	workers: 5,
	timeout: 60000,
	use: {
		actionTimeout: 60000
	}
});

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

test('verify device filtering', async ({ page }) => {
	/* This covers basic checkbox function, if you have time and really want to
	be thorough, consider different permutations / filtering options... */
	await page.goto('http://localhost:3000/');
	await page.getByLabel('MakerBot').check();
	await expect(page.getByText('MakerBot Production Report')).toBeVisible();
	await expect(page.getByText('Ender Production Report')).not.toBeVisible();
	await expect(page.getByText('Prusa Production Report')).not.toBeVisible();
	await page.getByLabel('MakerBot').uncheck();
	await expect(page.getByText('MakerBot Production Report')).toBeVisible();
	await expect(page.getByText('Ender Production Report')).toBeVisible();
	await expect(page.getByText('Prusa Production Report')).toBeVisible();
});

test('verify chart and table renders', async ({ page }) => {
	/* Verifies UI display of table based on provided default data, as well as
	scale and title of chart (numbers will have to be verified using access to
	database). This test focuses specifically on the provided numbers for
	MakerBot Production Report, scale for the other two if needed. */
	await page.goto('http://localhost:3000/');

	await page.getByLabel('MakerBot').check();
	await expect(page.locator('div').filter({ hasText: /^MakerBot Production ReportOct 27, 2024 - Oct 29, 2024$/ }).first()).toBeVisible();
	await expect(page.getByRole('cell', { name: 'Process State' }).first()).toBeVisible();
	await expect(page.getByRole('cell', { name: 'Good Count' }).first()).toBeVisible();
	await expect(page.getByRole('cell', { name: 'Reject Count' }).first()).toBeVisible();
	await expect(page.getByRole('cell', { name: 'duration (hrs)' }).first()).toBeVisible();

	await expect(page.getByRole('row', { name: 'Down 0 11 4.73' }).getByRole('cell').nth(1)).toBeVisible();
	await expect(page.getByRole('row', { name: 'Running 63,313 1,700 31.56' }).getByRole('cell').nth(1)).toBeVisible();
	await expect(page.getByRole('row', { name: 'Meal/Break 743 0 5.56' }).getByRole('cell').nth(1)).toBeVisible();
	await expect(page.getByRole('row', { name: 'Changeover 0 0 1.93' }).getByRole('cell').nth(1)).toBeVisible();
	await expect(page.getByRole('row', { name: 'Meeting 2 0 0.13' }).getByRole('cell').nth(1)).toBeVisible();

	await expect(page.getByRole('heading', { name: 'Production Overview' }).first()).toBeVisible();
	await expect(page.locator('svg').filter({ hasText: 'DownRunningMeal/' })).toBeVisible();
	await expect(page.getByRole('main')).toContainText('Count');
	await expect(page.getByRole('main')).toContainText('Down');
	await expect(page.getByRole('main')).toContainText('Running');
	await expect(page.getByRole('main')).toContainText('Meal/Break');
	await expect(page.getByRole('main')).toContainText('Changeover');
	await expect(page.getByRole('main')).toContainText('Meeting');
	await expect(page.getByRole('main')).toContainText('Duration (hours');
});

test('verify PDF and print', async ({ page }) => {
	await page.goto('http://localhost:3000/');
	const downloadButton = page.getByRole('button', { name: 'Download PDF' });
	// const downloadPromise = page.waitForEvent('download');

	await downloadButton.click();
	// const download = await downloadPromise;

	// await expect(download.suggestedFilename()).toMatch(/production-report-.*\.pdf/);
});
