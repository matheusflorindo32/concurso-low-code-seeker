import { describe, expect, it } from 'vitest';
import { cleanCPF, formatCPF, isValidCPF } from './cpfValidator';

describe('cpfValidator', () => {
  it('remove caracteres não numéricos do CPF', () => {
    expect(cleanCPF('abc123.def456')).toBe('123456');
  });

  it('formata CPF completo com pontos e traço', () => {
    expect(formatCPF('12345678901')).toBe('123.456.789-01');
  });

  it('mantém apenas números quando o CPF está incompleto para formatação final', () => {
    expect(formatCPF('12345')).toBe('12345');
  });

  it('rejeita CPF com tamanho inválido', () => {
    expect(isValidCPF('123')).toBe(false);
  });

  it('rejeita CPF com todos os dígitos iguais', () => {
    expect(isValidCPF('11111111111')).toBe(false);
  });
});
