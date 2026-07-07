import { useState } from 'react';
import { Candidato, Concurso, BuscaResult } from '@/types';
import { searchCandidatosByCodigo, searchConcursosByCPF } from '@/services/searchService';

const SEARCH_DELAY_MS = 500;

const delay = () => new Promise((resolve) => setTimeout(resolve, SEARCH_DELAY_MS));

/**
 * Hook personalizado para busca de candidatos e concursos.
 * Responsável por estados de interface; as regras de negócio ficam no service.
 */
export const useSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runSearch = async <T,>(operation: () => BuscaResult<T>): Promise<BuscaResult<T>> => {
    setLoading(true);
    setError(null);

    try {
      await delay();
      const result = operation();

      if (!result.found && result.message) {
        setError(result.message);
      }

      return result;
    } catch (err) {
      const fallback = 'Erro interno do sistema';
      setError(fallback);
      return { data: [], found: false, message: fallback };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Busca concursos compatíveis com base no CPF do candidato.
   */
  const buscarConcursosPorCPF = async (cpf: string): Promise<BuscaResult<Concurso>> => {
    return runSearch(() => searchConcursosByCPF(cpf));
  };

  /**
   * Busca candidatos compatíveis com base no código do concurso.
   */
  const buscarCandidatosPorCodigo = async (codigo: string): Promise<BuscaResult<Candidato>> => {
    return runSearch(() => searchCandidatosByCodigo(codigo));
  };

  return {
    loading,
    error,
    buscarConcursosPorCPF,
    buscarCandidatosPorCodigo,
  };
};
