import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSearch } from '../useSearch';

describe('useSearch Hook', () => {
  let hook: ReturnType<typeof renderHook<ReturnType<typeof useSearch>, unknown>>;

  beforeEach(() => {
    hook = renderHook(() => useSearch());
  });

  describe('buscarConcursosPorCPF', () => {
    it('should find contests for valid CPF with matching professions', async () => {
      const { result } = hook;
      
      // Lindsey Craft (carpinteiro) - deve encontrar SEJUS 15/2017
      const searchResult = await result.current.buscarConcursosPorCPF('182.845.084-34');
      
      expect(searchResult.found).toBe(true);
      expect(searchResult.data).toHaveLength(1);
      expect(searchResult.data[0].orgao).toBe('SEJUS');
      expect(searchResult.data[0].edital).toBe('15/2017');
    });

    it('should find multiple contests for candidate with multiple matching professions', async () => {
      const { result } = hook;
      
      // Jackie Dawson (marceneiro, assistente administrativo)
      const searchResult = await result.current.buscarConcursosPorCPF('311.667.973-47');
      
      expect(searchResult.found).toBe(true);
      expect(searchResult.data).toHaveLength(2);
      
      const orgaos = searchResult.data.map(c => c.orgao);
      expect(orgaos).toContain('SEDU');
      expect(orgaos).toContain('SEJUS');
    });

    it('should return error for invalid CPF', async () => {
      const { result } = hook;
      
      const searchResult = await result.current.buscarConcursosPorCPF('123.456.789-10');
      
      expect(searchResult.found).toBe(false);
      expect(searchResult.message).toBe('CPF inválido');
      expect(searchResult.data).toHaveLength(0);
    });

    it('should return error for non-existent candidate', async () => {
      const { result } = hook;
      
      // CPF válido mas não existe nos dados
      const searchResult = await result.current.buscarConcursosPorCPF('111.444.777-35');
      
      expect(searchResult.found).toBe(false);
      expect(searchResult.message).toBe('Candidato não encontrado');
      expect(searchResult.data).toHaveLength(0);
    });

    it('should handle loading state', async () => {
      const { result } = hook;
      
      expect(result.current.loading).toBe(false);
      
      const searchPromise = result.current.buscarConcursosPorCPF('182.845.084-34');
      
      // Durante a busca, loading deve ser true
      expect(result.current.loading).toBe(true);
      
      await searchPromise;
      
      // Após a busca, loading deve ser false
      expect(result.current.loading).toBe(false);
    });
  });

  describe('buscarCandidatosPorCodigo', () => {
    it('should find candidates for valid contest code', async () => {
      const { result } = hook;
      
      // Código do concurso SEJUS 15/2017 (carpinteiro, professor de matemática, assistente administrativo)
      const searchResult = await result.current.buscarCandidatosPorCodigo('61828450843');
      
      expect(searchResult.found).toBe(true);
      expect(searchResult.data).toHaveLength(3); // Todos os candidatos têm profissões compatíveis
      
      const nomes = searchResult.data.map(c => c.nome);
      expect(nomes).toContain('Lindsey Craft'); // carpinteiro
      expect(nomes).toContain('Jackie Dawson'); // assistente administrativo
      expect(nomes).toContain('Cory Mendoza'); // carpinteiro
    });

    it('should find specific candidates for contest with limited matching professions', async () => {
      const { result } = hook;
      
      // Código do concurso SEJUS 17/2017 (professor de matemática) - nenhum candidato compatível
      const searchResult = await result.current.buscarCandidatosPorCodigo('95655123539');
      
      expect(searchResult.found).toBe(false);
      expect(searchResult.message).toBe('Nenhum candidato compatível encontrado para este concurso');
      expect(searchResult.data).toHaveLength(0);
    });

    it('should return error for empty contest code', async () => {
      const { result } = hook;
      
      const searchResult = await result.current.buscarCandidatosPorCodigo('');
      
      expect(searchResult.found).toBe(false);
      expect(searchResult.message).toBe('Código do concurso é obrigatório');
      expect(searchResult.data).toHaveLength(0);
    });

    it('should return error for non-existent contest', async () => {
      const { result } = hook;
      
      const searchResult = await result.current.buscarCandidatosPorCodigo('99999999999');
      
      expect(searchResult.found).toBe(false);
      expect(searchResult.message).toBe('Concurso não encontrado');
      expect(searchResult.data).toHaveLength(0);
    });

    it('should handle loading state', async () => {
      const { result } = hook;
      
      expect(result.current.loading).toBe(false);
      
      const searchPromise = result.current.buscarCandidatosPorCodigo('61828450843');
      
      // Durante a busca, loading deve ser true
      expect(result.current.loading).toBe(true);
      
      await searchPromise;
      
      // Após a busca, loading deve ser false
      expect(result.current.loading).toBe(false);
    });

    it('should trim whitespace from contest code', async () => {
      const { result } = hook;
      
      const searchResult = await result.current.buscarCandidatosPorCodigo(' 61828450843 ');
      
      expect(searchResult.found).toBe(true);
      expect(searchResult.data).toHaveLength(3);
    });
  });

  describe('error handling', () => {
    it('should initialize with no error', () => {
      const { result } = hook;
      expect(result.current.error).toBeNull();
    });

    it('should set error for invalid CPF', async () => {
      const { result } = hook;
      
      await result.current.buscarConcursosPorCPF('invalid-cpf');
      
      expect(result.current.error).toBe('CPF inválido');
    });

    it('should set error for candidate not found', async () => {
      const { result } = hook;
      
      await result.current.buscarConcursosPorCPF('111.444.777-35');
      
      expect(result.current.error).toBe('Candidato não encontrado');
    });

    it('should clear error on successful search', async () => {
      const { result } = hook;
      
      // Primeiro, gera um erro
      await result.current.buscarConcursosPorCPF('invalid-cpf');
      expect(result.current.error).toBe('CPF inválido');
      
      // Depois, faz uma busca válida
      await result.current.buscarConcursosPorCPF('182.845.084-34');
      expect(result.current.error).toBeNull();
    });
  });
});