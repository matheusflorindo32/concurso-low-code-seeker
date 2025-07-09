import { test, expect } from '@playwright/test';

test.describe('Busca de Concursos por CPF', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/buscar-concursos');
  });

  test('deve buscar concursos com CPF válido', async ({ page }) => {
    // CPF de Lindsey Craft que tem concursos compatíveis
    const cpfValido = '182.845.084-34';
    
    // Preencher o formulário
    await page.getByPlaceholder('Digite o CPF').fill(cpfValido);
    await page.getByRole('button', { name: 'Buscar Concursos' }).click();
    
    // Verificar se os resultados aparecem
    await expect(page.getByText('Concursos Encontrados')).toBeVisible({ timeout: 10000 });
    
    // Verificar se pelo menos um concurso é exibido
    await expect(page.getByText('SEJUS')).toBeVisible();
    await expect(page.getByText('15/2017')).toBeVisible();
    await expect(page.getByText('carpinteiro')).toBeVisible();
  });

  test('deve aplicar máscara no CPF durante digitação', async ({ page }) => {
    const input = page.getByPlaceholder('Digite o CPF');
    
    // Digitar números sem formatação
    await input.fill('18284508434');
    
    // Verificar se a máscara foi aplicada
    await expect(input).toHaveValue('182.845.084-34');
  });

  test('deve mostrar erro para CPF inválido', async ({ page }) => {
    const cpfInvalido = '123.456.789-00';
    
    // Preencher com CPF inválido
    await page.getByPlaceholder('Digite o CPF').fill(cpfInvalido);
    await page.getByRole('button', { name: 'Buscar Concursos' }).click();
    
    // Verificar mensagem de erro
    await expect(page.getByText('CPF inválido')).toBeVisible({ timeout: 5000 });
  });

  test('deve mostrar mensagem quando não encontrar concursos', async ({ page }) => {
    // CPF válido mas sem concursos compatíveis (vamos simular)
    const cpfSemConcursos = '111.444.777-35';
    
    // Preencher o formulário
    await page.getByPlaceholder('Digite o CPF').fill(cpfSemConcursos);
    await page.getByRole('button', { name: 'Buscar Concursos' }).click();
    
    // Verificar mensagem de nenhum resultado
    await expect(page.getByText(/Nenhum concurso encontrado|Candidato não encontrado/)).toBeVisible({ timeout: 10000 });
  });

  test('deve validar campo obrigatório', async ({ page }) => {
    // Tentar buscar sem preencher CPF
    await page.getByRole('button', { name: 'Buscar Concursos' }).click();
    
    // Verificar se há validação de campo obrigatório
    await expect(page.getByText(/CPF é obrigatório|Campo obrigatório/)).toBeVisible({ timeout: 5000 });
  });

  test('deve limpar resultados ao fazer nova busca', async ({ page }) => {
    // Primeira busca
    await page.getByPlaceholder('Digite o CPF').fill('182.845.084-34');
    await page.getByRole('button', { name: 'Buscar Concursos' }).click();
    await expect(page.getByText('Concursos Encontrados')).toBeVisible({ timeout: 10000 });
    
    // Limpar e fazer nova busca
    await page.getByPlaceholder('Digite o CPF').clear();
    await page.getByPlaceholder('Digite o CPF').fill('111.444.777-35');
    await page.getByRole('button', { name: 'Buscar Concursos' }).click();
    
    // Verificar se os resultados anteriores foram limpos
    await expect(page.getByText('SEJUS')).not.toBeVisible({ timeout: 5000 });
  });
});