import { describe, it, expect } from 'vitest';
import { hasIntersection, getIntersection } from '../listIntersection';

describe('List Intersection Utils', () => {
  describe('hasIntersection', () => {
    it('should return true when lists have common elements', () => {
      const list1 = ['carpinteiro', 'marceneiro'];
      const list2 = ['analista de sistemas', 'marceneiro'];
      
      expect(hasIntersection(list1, list2)).toBe(true);
    });

    it('should return false when lists have no common elements', () => {
      const list1 = ['carpinteiro', 'marceneiro'];
      const list2 = ['analista de sistemas', 'professor de matemática'];
      
      expect(hasIntersection(list1, list2)).toBe(false);
    });

    it('should handle case insensitive comparison', () => {
      const list1 = ['CARPINTEIRO', 'marceneiro'];
      const list2 = ['carpinteiro', 'PROFESSOR'];
      
      expect(hasIntersection(list1, list2)).toBe(true);
    });

    it('should handle accented characters', () => {
      const list1 = ['carpinteiro', 'técnico'];
      const list2 = ['CARPINTEIRO', 'tecnico'];
      
      expect(hasIntersection(list1, list2)).toBe(true);
    });

    it('should handle extra spaces', () => {
      const list1 = [' carpinteiro ', 'marceneiro'];
      const list2 = ['carpinteiro', ' professor '];
      
      expect(hasIntersection(list1, list2)).toBe(true);
    });

    it('should handle empty lists', () => {
      expect(hasIntersection([], ['carpinteiro'])).toBe(false);
      expect(hasIntersection(['carpinteiro'], [])).toBe(false);
      expect(hasIntersection([], [])).toBe(false);
    });

    // Casos específicos do desafio LEDS
    it('should work with challenge specific professions', () => {
      const candidatoProfessoes = ['carpinteiro'];
      const concursoVagas = ['carpinteiro', 'professor de matemática', 'assistente administrativo'];
      
      expect(hasIntersection(candidatoProfessoes, concursoVagas)).toBe(true);
    });

    it('should work with multiple matching professions', () => {
      const candidatoProfessoes = ['carpinteiro', 'marceneiro'];
      const concursoVagas = ['analista de sistemas', 'marceneiro'];
      
      expect(hasIntersection(candidatoProfessoes, concursoVagas)).toBe(true);
    });
  });

  describe('getIntersection', () => {
    it('should return common elements', () => {
      const list1 = ['carpinteiro', 'marceneiro', 'assistente administrativo'];
      const list2 = ['analista de sistemas', 'marceneiro', 'assistente administrativo'];
      
      const result = getIntersection(list1, list2);
      expect(result).toEqual(['marceneiro', 'assistente administrativo']);
    });

    it('should return empty array when no intersection', () => {
      const list1 = ['carpinteiro', 'marceneiro'];
      const list2 = ['analista de sistemas', 'professor de matemática'];
      
      const result = getIntersection(list1, list2);
      expect(result).toEqual([]);
    });

    it('should handle case insensitive matching', () => {
      const list1 = ['CARPINTEIRO', 'marceneiro'];
      const list2 = ['carpinteiro', 'PROFESSOR'];
      
      const result = getIntersection(list1, list2);
      expect(result).toEqual(['CARPINTEIRO']);
    });

    it('should handle accented characters', () => {
      const list1 = ['técnico', 'carpinteiro'];
      const list2 = ['tecnico', 'professor'];
      
      const result = getIntersection(list1, list2);
      expect(result).toEqual(['técnico']);
    });

    it('should preserve original casing from first list', () => {
      const list1 = ['Carpinteiro', 'MARCENEIRO'];
      const list2 = ['carpinteiro', 'marceneiro'];
      
      const result = getIntersection(list1, list2);
      expect(result).toEqual(['Carpinteiro', 'MARCENEIRO']);
    });

    it('should handle empty lists', () => {
      expect(getIntersection([], ['carpinteiro'])).toEqual([]);
      expect(getIntersection(['carpinteiro'], [])).toEqual([]);
      expect(getIntersection([], [])).toEqual([]);
    });
  });
});