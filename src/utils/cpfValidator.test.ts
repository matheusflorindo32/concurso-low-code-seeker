import { describe, expect, it } from 'vitest';
import { cleanCPF, formatCPF, isValidCPF, maskCPF } from './cpfValidator';

describe('cpfValidator', () => {
  it('remove caracteres não numéricos do CPF', () => {
    expect(cleanCPF('311.667.973-47')).toBe('31166797347');
  });

  it('formata CPF com pontos e traço', () => {
    expect(formatCPF('31166797347')).toBe('311.667.973-47');
  });

  it('aceita os CPFs fornecidos no desafio', () => {
    expect(isValidCPF('182.845.084-34')).toBe(true);
    expect(isValidCPF('311.667.973-47')).toBe(true);
    expect(isValidCPF('565.512.353-92')).toBe(true);
  });

  it('rejeita CPF com tamanho inválido', () => {
    expect(isValidCPF('123')).toBe(false);
  });

  it('rejeita CPF com todos os dígitos iguais', () => {
    expect(isValidCPF('111.111.111-11')).toBe(false);
  });

  it('aplica máscara progressiva durante a digitação', () => {
    expect(maskCPF('31166797347')).toBe('311.667.973-47');
  });
});
