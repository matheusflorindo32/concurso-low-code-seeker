import { useState } from 'react';
import { candidatos, concursos } from '@/data/mockData';
import { Candidato, Concurso, BuscaResult } from '@/types';
import { cleanCPF, isValidCPF } from '@/utils/cpfValidator';
import { hasIntersection } from '@/utils/listIntersection';

/**
 * Hook personalizado para busca de candidatos e concursos
 */
export const useSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Busca concursos compatíveis com base no CPF do candidato
   */
  const buscarConcursosPorCPF = async (cpf: string): Promise<BuscaResult<Concurso>> => {
    setLoading(true);
    setError(null);

    try {
      // Simula delay de API
      await new Promise(resolve => setTimeout(resolve, 500));

      // Valida CPF
      if (!isValidCPF(cpf)) {
        setError('CPF inválido');
        return { data: [], found: false, message: 'CPF inválido' };
      }

      // Busca candidato pelo CPF
      const candidato = candidatos.find(c => cleanCPF(c.cpf) === cleanCPF(cpf));
      
      if (!candidato) {
        setError('Candidato não encontrado');
        return { data: [], found: false, message: 'Candidato não encontrado' };
      }

      // Busca concursos compatíveis
      const concursosCompativeis = concursos.filter(concurso => 
        hasIntersection(candidato.profissoes, concurso.vagas)
      );

      if (concursosCompativeis.length === 0) {
        return { 
          data: [], 
          found: false, 
          message: 'Nenhum concurso compatível encontrado para suas profissões' 
        };
      }

      return { data: concursosCompativeis, found: true };

    } catch (err) {
      setError('Erro interno do sistema');
      return { data: [], found: false, message: 'Erro interno do sistema' };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Busca candidatos compatíveis com base no código do concurso
   */
  const buscarCandidatosPorCodigo = async (codigo: string): Promise<BuscaResult<Candidato>> => {
    setLoading(true);
    setError(null);

    try {
      // Simula delay de API
      await new Promise(resolve => setTimeout(resolve, 500));

      // Valida se código foi fornecido
      if (!codigo.trim()) {
        setError('Código do concurso é obrigatório');
        return { data: [], found: false, message: 'Código do concurso é obrigatório' };
      }

      // Busca concurso pelo código
      const concurso = concursos.find(c => c.codigo === codigo.trim());
      
      if (!concurso) {
        setError('Concurso não encontrado');
        return { data: [], found: false, message: 'Concurso não encontrado' };
      }

      // Busca candidatos compatíveis
      const candidatosCompativeis = candidatos.filter(candidato => 
        hasIntersection(candidato.profissoes, concurso.vagas)
      );

      if (candidatosCompativeis.length === 0) {
        return { 
          data: [], 
          found: false, 
          message: 'Nenhum candidato compatível encontrado para este concurso' 
        };
      }

      return { data: candidatosCompativeis, found: true };

    } catch (err) {
      setError('Erro interno do sistema');
      return { data: [], found: false, message: 'Erro interno do sistema' };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    buscarConcursosPorCPF,
    buscarCandidatosPorCodigo
  };
};