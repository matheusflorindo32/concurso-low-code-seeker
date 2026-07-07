import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useSearch } from './useSearch';

describe('useSearch', () => {
  it('busca concursos compatíveis por CPF', async () => {
    const { result } = renderHook(() => useSearch());

    let response;
    await act(async () => {
      response = await result.current.buscarConcursosPorCPF('311.667.973-47');
    });

    expect(response.found).toBe(true);
    expect(response.data).toHaveLength(2);
    expect(response.data.map((concurso) => concurso.orgao)).toEqual(['SEDU', 'SEJUS']);
  });

  it('retorna erro para CPF inválido', async () => {
    const { result } = renderHook(() => useSearch());

    let response;
    await act(async () => {
      response = await result.current.buscarConcursosPorCPF('123');
    });

    expect(response.found).toBe(false);
    expect(response.message).toBe('CPF inválido');
  });

  it('busca candidatos considerando todos os concursos do mesmo código', async () => {
    const { result } = renderHook(() => useSearch());

    let response;
    await act(async () => {
      response = await result.current.buscarCandidatosPorCodigo('61828450843');
    });

    expect(response.found).toBe(true);
    expect(response.data).toHaveLength(3);
    expect(response.data.map((candidato) => candidato.nome)).toEqual([
      'Lindsey Craft',
      'Jackie Dawson',
      'Cory Mendoza',
    ]);
  });

  it('retorna erro quando o código do concurso não existe', async () => {
    const { result } = renderHook(() => useSearch());

    let response;
    await act(async () => {
      response = await result.current.buscarCandidatosPorCodigo('99999999999');
    });

    expect(response.found).toBe(false);
    expect(response.message).toBe('Concurso não encontrado');
  });
});
