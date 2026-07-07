import { expect, test } from '@playwright/test';

test.describe('fluxos principais', () => {
  test('carrega a página inicial', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Sistema de Consulta de Concursos' })).toBeVisible();
    await expect(page.getByText('LEDS IFES - Desafio Low/No Code')).toBeVisible();
  });

  test('exibe a página de busca de concursos por CPF', async ({ page }) => {
    await page.goto('/buscar-concursos');

    await expect(page.getByRole('heading', { name: 'Buscar Concursos por CPF' })).toBeVisible();
    await expect(page.getByLabel('CPF do Candidato')).toBeVisible();
  });

  test('exibe a página de busca de candidatos por código', async ({ page }) => {
    await page.goto('/buscar-candidatos');

    await expect(page.getByRole('heading', { name: 'Buscar Candidatos por Código' })).toBeVisible();
    await expect(page.getByLabel('Código do Concurso')).toBeVisible();
  });
});
