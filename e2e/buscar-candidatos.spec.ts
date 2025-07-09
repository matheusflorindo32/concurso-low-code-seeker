import { test, expect } from '@playwright/test';

test.describe('Busca de Candidatos por Código', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/buscar-candidatos');
  });

  test('deve buscar candidatos com código válido', async ({ page }) => {
    // Código que retorna candidatos compatíveis
    const codigoValido = '61828450843';
    
    // Preencher o formulário
    await page.getByPlaceholder('Digite o código do concurso').fill(codigoValido);
    await page.getByRole('button', { name: 'Buscar Candidatos' }).click();
    
    // Verificar se os resultados aparecem
    await expect(page.getByText('Candidatos Encontrados')).toBeVisible({ timeout: 10000 });
    
    // Verificar se pelo menos um candidato é exibido
    await expect(page.getByText('Jackie Dawson')).toBeVisible();
    await expect(page.getByText('311.667.973-47')).toBeVisible();
    await expect(page.getByText('marceneiro')).toBeVisible();
  });

  test('deve mostrar mensagem quando não encontrar candidatos', async ({ page }) => {
    // Código inexistente
    const codigoInexistente = '99999999999';
    
    // Preencher o formulário
    await page.getByPlaceholder('Digite o código do concurso').fill(codigoInexistente);
    await page.getByRole('button', { name: 'Buscar Candidatos' }).click();
    
    // Verificar mensagem de nenhum resultado
    await expect(page.getByText(/Nenhum candidato encontrado|Concurso não encontrado/)).toBeVisible({ timeout: 10000 });
  });

  test('deve validar campo obrigatório', async ({ page }) => {
    // Tentar buscar sem preencher código
    await page.getByRole('button', { name: 'Buscar Candidatos' }).click();
    
    // Verificar se há validação de campo obrigatório
    await expect(page.getByText(/Código é obrigatório|Campo obrigatório/)).toBeVisible({ timeout: 5000 });
  });

  test('deve exibir informações completas do candidato', async ({ page }) => {
    const codigoValido = '61828450843';
    
    // Fazer busca
    await page.getByPlaceholder('Digite o código do concurso').fill(codigoValido);
    await page.getByRole('button', { name: 'Buscar Candidatos' }).click();
    
    // Aguardar resultados
    await expect(page.getByText('Candidatos Encontrados')).toBeVisible({ timeout: 10000 });
    
    // Verificar informações do candidato
    await expect(page.getByText('Jackie Dawson')).toBeVisible();
    await expect(page.getByText('14/08/1970')).toBeVisible();
    await expect(page.getByText('311.667.973-47')).toBeVisible();
    await expect(page.getByText('marceneiro')).toBeVisible();
    await expect(page.getByText('assistente administrativo')).toBeVisible();
  });

  test('deve permitir apenas números no campo código', async ({ page }) => {
    const input = page.getByPlaceholder('Digite o código do concurso');
    
    // Tentar digitar letras e números
    await input.fill('abc123def456');
    
    // Verificar se apenas números foram aceitos
    await expect(input).toHaveValue('123456');
  });

  test('deve limpar resultados ao fazer nova busca', async ({ page }) => {
    // Primeira busca
    await page.getByPlaceholder('Digite o código do concurso').fill('61828450843');
    await page.getByRole('button', { name: 'Buscar Candidatos' }).click();
    await expect(page.getByText('Candidatos Encontrados')).toBeVisible({ timeout: 10000 });
    
    // Limpar e fazer nova busca
    await page.getByPlaceholder('Digite o código do concurso').clear();
    await page.getByPlaceholder('Digite o código do concurso').fill('99999999999');
    await page.getByRole('button', { name: 'Buscar Candidatos' }).click();
    
    // Verificar se os resultados anteriores foram limpos
    await expect(page.getByText('Jackie Dawson')).not.toBeVisible({ timeout: 5000 });
  });
});