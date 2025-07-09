import { test, expect } from '@playwright/test';

test.describe('Sistema de Consulta de Concursos LEDS IFES', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('deve exibir a página inicial corretamente', async ({ page }) => {
    // Verificar título da página
    await expect(page).toHaveTitle(/Sistema de Consulta de Concursos/);
    
    // Verificar elementos principais da página
    await expect(page.getByText('Sistema de Consulta de Concursos LEDS IFES')).toBeVisible();
    await expect(page.getByText('Buscar Concursos por CPF')).toBeVisible();
    await expect(page.getByText('Buscar Candidatos por Código')).toBeVisible();
    
    // Verificar links de navegação
    await expect(page.getByRole('link', { name: 'Buscar Concursos' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Buscar Candidatos' })).toBeVisible();
  });

  test('deve navegar para página de busca de concursos', async ({ page }) => {
    // Clicar no link para buscar concursos
    await page.getByRole('link', { name: 'Buscar Concursos' }).click();
    
    // Verificar se está na página correta
    await expect(page).toHaveURL('/buscar-concursos');
    await expect(page.getByText('Buscar Concursos por CPF')).toBeVisible();
    await expect(page.getByPlaceholder('Digite o CPF')).toBeVisible();
  });

  test('deve navegar para página de busca de candidatos', async ({ page }) => {
    // Clicar no link para buscar candidatos
    await page.getByRole('link', { name: 'Buscar Candidatos' }).click();
    
    // Verificar se está na página correta
    await expect(page).toHaveURL('/buscar-candidatos');
    await expect(page.getByText('Buscar Candidatos por Código')).toBeVisible();
    await expect(page.getByPlaceholder('Digite o código do concurso')).toBeVisible();
  });

  test('deve voltar para home através do logo', async ({ page }) => {
    // Navegar para uma página específica
    await page.goto('/buscar-concursos');
    
    // Clicar no logo/título para voltar
    await page.getByText('Sistema de Consulta').first().click();
    
    // Verificar se voltou para home
    await expect(page).toHaveURL('/');
  });
});