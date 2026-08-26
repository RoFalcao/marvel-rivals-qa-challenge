import { test, expect } from '@playwright/test';

test.describe('Marvel Rivals Heroes - Web', () => {

    test('UI-01 - deve carregar a página de heróis com sucesso', async ({ page }) => {
        await page.goto('/heroes/index.html');

        await expect(page).toHaveURL(/heroes/);
        await expect(page).toHaveTitle(/Marvel Rivals/i);
    });

    test('UI-02 - deve exibir a lista de heróis', async ({ page }) => {
        await page.goto('/heroes/index.html');

        const moreHeroesButton = page.locator('.more-btn');

        await expect(moreHeroesButton).toBeVisible();
        await moreHeroesButton.click({ force: true });

        const heroesList = page.getByRole('list').nth(4);

        await expect(heroesList).toBeVisible();
    });

    test('UI-03 - deve navegar para os detalhes de um herói', async ({ page }) => {
        await page.goto('/heroes/index.html');

        const moreHeroesButton = page.locator('.more-btn');

        await expect(moreHeroesButton).toBeVisible();
        await moreHeroesButton.click({ force: true });

        const heroesList = page.getByRole('list').nth(4);
        await expect(heroesList).toBeVisible();

        const heroCards = heroesList.locator('li');
        const selectedHero = heroCards.nth(30);

        await selectedHero.click();

        await expect(page).toHaveURL(/\/heroes\/index\.html\?id=/);

        const abilitiesSection = page
            .getByRole('heading', { name: 'ABILITIES', exact: true })
            .first();

        await abilitiesSection.scrollIntoViewIfNeeded();
        await expect(abilitiesSection).toBeVisible();
    });

    test('UI-05 - deve renderizar a imagem do herói', async ({ page }) => {
        await page.goto('/heroes/index.html');

        const moreHeroesButton = page.locator('.more-btn');

        await expect(moreHeroesButton).toBeVisible();
        await moreHeroesButton.click({ force: true });

        const heroesList = page.getByRole('list').nth(4);
        await expect(heroesList).toBeVisible();

        const heroCards = heroesList.locator('li');
        const selectedHero = heroCards.nth(6);

        await selectedHero.click();

        await expect(page).toHaveURL(/\/heroes\/index\.html\?id=/);

        const heroImage = page.locator('.jyImg');

        await expect(heroImage).toBeVisible();
    });

});