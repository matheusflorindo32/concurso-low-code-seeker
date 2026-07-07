import { describe, expect, it } from 'vitest';
import { candidatos, concursos } from '@/data/mockData';
import { searchCandidatosByCodigo, searchConcursosByCPF } from './searchService';

describe('searchService', () => {
  it('encontra concursos compatíveis a partir do CPF de um candidato cadastrado', () => {
    const result = searchConcursosByCPF(candidatos[1].cpf);

    expect(result.found).toBe(true);
    expect(result.data).toHaveLength(2);
  });

  it('retorna erro para CPF inválido', () => {
    const result = searchConcursosByCPF('123');

    expect(result.found).toBe(false);
    expect(result.message).toBe('CPF inválido');
  });

  it('encontra candidatos compatíveis a partir de um código de concurso cadastrado', () => {
    const result = searchCandidatosByCodigo(concursos[0].codigo);

    expect(result.found).toBe(true);
    expect(result.data).toHaveLength(3);
  });

  it('retorna erro para código de concurso vazio', () => {
    const result = searchCandidatosByCodigo('   ');

    expect(result.found).toBe(false);
    expect(result.message).toBe('Código do concurso é obrigatório');
  });

  it('retorna erro para código de concurso inexistente', () => {
    const result = searchCandidatosByCodigo('codigo-inexistente');

    expect(result.found).toBe(false);
    expect(result.message).toBe('Concurso não encontrado');
  });
});
