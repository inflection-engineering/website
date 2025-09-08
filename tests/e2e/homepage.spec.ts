import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should have the "how-we-help" target element', async ({ page }) => {
    await page.goto('/');

    const el = page.locator('#how-we-help');
    await expect(el).toBeVisible();
    await expect(el).toHaveText('How we help');
    await expect(el).toHaveRole('heading');
  });
});