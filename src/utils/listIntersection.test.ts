import { describe, expect, it } from 'vitest';
import { getIntersection, hasIntersection } from './listIntersection';

describe('listIntersection', () => {
  it('identifica interseção entre profissão e vaga', () => {
    expect(hasIntersection(['marceneiro'], ['analista de sistemas', 'marceneiro'])).toBe(true);
  });

  it('retorna falso quando não há compatibilidade', () => {
    expect(hasIntersection(['carpinteiro'], ['professor de matemática'])).toBe(false);
  });

  it('normaliza maiúsculas, espaços e acentos na comparação', () => {
    expect(hasIntersection([' Assistente Administrativo '], ['assistente administrativo'])).toBe(true);
  });

  it('retorna as profissões compatíveis entre duas listas', () => {
    expect(
      getIntersection(
        ['marceneiro', 'assistente administrativo'],
        ['analista de sistemas', 'marceneiro']
      )
    ).toEqual(['marceneiro']);
  });
});
