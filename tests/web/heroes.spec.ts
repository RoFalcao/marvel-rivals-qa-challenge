import { test, expect } from '@playwright/test';

test.describe('Marvel Rivals Heroes - Web', () => {
    test('UI-01 - deve carregar a página de heróis com sucesso', async ({ page }) => {
        await page.goto('/heroes/index.html');

        await expect(page).toHaveURL(/heroes/);
        await expect(page).toHaveTitle(/Marvel Rivals/i);
    });
});