import { test, expect } from '@playwright/test';

test.describe('Interface Responsiva', () => {
  test('deve funcionar corretamente em dispositivos móveis', async ({ page }) => {
    // Simular viewport mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Verificar se elementos principais estão visíveis
    await expect(page.getByText('Sistema de Consulta de Concursos')).toBeVisible();
    await expect(page.getByText('Buscar Concursos por CPF')).toBeVisible();
    await expect(page.getByText('Buscar Candidatos por Código')).toBeVisible();
    
    // Verificar navegação mobile
    await page.getByRole('link', { name: 'Buscar Concursos' }).click();
    await expect(page).toHaveURL('/buscar-concursos');
    await expect(page.getByPlaceholder('Digite o CPF')).toBeVisible();
  });

  test('deve funcionar corretamente em tablets', async ({ page }) => {
    // Simular viewport tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    // Verificar layout em tablet
    await expect(page.getByText('Sistema de Consulta de Concursos')).toBeVisible();
    
    // Testar funcionalidade de busca
    await page.getByRole('link', { name: 'Buscar Candidatos' }).click();
    await page.getByPlaceholder('Digite o código do concurso').fill('61828450843');
    await page.getByRole('button', { name: 'Buscar Candidatos' }).click();
    
    await expect(page.getByText('Candidatos Encontrados')).toBeVisible({ timeout: 10000 });
  });

  test('deve funcionar corretamente em desktop', async ({ page }) => {
    // Simular viewport desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    // Verificar layout desktop
    await expect(page.getByText('Sistema de Consulta de Concursos')).toBeVisible();
    
    // Testar fluxo completo
    await page.getByRole('link', { name: 'Buscar Concursos' }).click();
    await page.getByPlaceholder('Digite o CPF').fill('182.845.084-34');
    await page.getByRole('button', { name: 'Buscar Concursos' }).click();
    
    await expect(page.getByText('Concursos Encontrados')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('SEJUS')).toBeVisible();
  });
});