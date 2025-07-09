import { describe, it, expect } from 'vitest';
import { cleanCPF, formatCPF, isValidCPF, maskCPF } from '../cpfValidator';

describe('CPF Validator Utils', () => {
  describe('cleanCPF', () => {
    it('should remove all non-numeric characters', () => {
      expect(cleanCPF('123.456.789-10')).toBe('12345678910');
      expect(cleanCPF('123 456 789 10')).toBe('12345678910');
      expect(cleanCPF('123abc456def789-10')).toBe('12345678910');
    });

    it('should handle empty string', () => {
      expect(cleanCPF('')).toBe('');
    });
  });

  describe('formatCPF', () => {
    it('should format valid CPF with dots and dash', () => {
      expect(formatCPF('12345678910')).toBe('123.456.789-10');
      expect(formatCPF('123.456.789-10')).toBe('123.456.789-10');
    });

    it('should handle incomplete CPF', () => {
      expect(formatCPF('123456789')).toBe('123.456.789');
      expect(formatCPF('123')).toBe('123');
    });
  });

  describe('isValidCPF', () => {
    // CPFs específicos do desafio LEDS IFES
    it('should validate challenge specific CPFs', () => {
      expect(isValidCPF('182.845.084-34')).toBe(true); // Lindsey Craft
      expect(isValidCPF('311.667.973-47')).toBe(true); // Jackie Dawson
      expect(isValidCPF('565.512.353-92')).toBe(true); // Cory Mendoza
    });

    it('should validate challenge CPFs without formatting', () => {
      expect(isValidCPF('18284508434')).toBe(true);
      expect(isValidCPF('31166797347')).toBe(true);
      expect(isValidCPF('56551235392')).toBe(true);
    });

    // CPFs válidos conhecidos
    it('should validate known valid CPFs', () => {
      expect(isValidCPF('11144477735')).toBe(true);
      expect(isValidCPF('111.444.777-35')).toBe(true);
    });

    // CPFs inválidos
    it('should reject invalid CPFs', () => {
      expect(isValidCPF('123.456.789-10')).toBe(false);
      expect(isValidCPF('000.000.000-00')).toBe(false);
      expect(isValidCPF('111.111.111-11')).toBe(false);
      expect(isValidCPF('12345')).toBe(false);
      expect(isValidCPF('')).toBe(false);
    });

    it('should reject CPFs with all same digits', () => {
      expect(isValidCPF('11111111111')).toBe(false);
      expect(isValidCPF('22222222222')).toBe(false);
      expect(isValidCPF('99999999999')).toBe(false);
    });

    it('should reject CPFs with wrong length', () => {
      expect(isValidCPF('123456789')).toBe(false);
      expect(isValidCPF('123456789012')).toBe(false);
    });
  });

  describe('maskCPF', () => {
    it('should apply CPF mask during typing', () => {
      expect(maskCPF('1')).toBe('1');
      expect(maskCPF('123')).toBe('123');
      expect(maskCPF('1234')).toBe('123.4');
      expect(maskCPF('123456')).toBe('123.456');
      expect(maskCPF('1234567')).toBe('123.456.7');
      expect(maskCPF('123456789')).toBe('123.456.789');
      expect(maskCPF('1234567890')).toBe('123.456.789-0');
      expect(maskCPF('12345678901')).toBe('123.456.789-01');
    });

    it('should handle pre-formatted input', () => {
      expect(maskCPF('123.456.789-01')).toBe('123.456.789-01');
    });

    it('should handle empty input', () => {
      expect(maskCPF('')).toBe('');
    });
  });
});