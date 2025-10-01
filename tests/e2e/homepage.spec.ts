import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should have the "why-us" target element', async ({ page }) => {
    await page.goto('/');

    const el = page.locator('#why-us');
    await expect(el).toBeVisible();

    // The target, or the first header underneath it
    const h = (await el.evaluate(el => el.tagName.toLowerCase().startsWith('h')))
      ? el
      : el.locator('h1, h2, h3, h4, h5, h6').first();
    await expect(h).toHaveText('Why us?');
  });
});