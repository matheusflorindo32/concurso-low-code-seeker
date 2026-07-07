import { candidatos, concursos } from '@/data/mockData';
import { BuscaResult, Candidato, Concurso } from '@/types';
import { cleanCPF, isValidCPF } from '@/utils/cpfValidator';
import { hasIntersection } from '@/utils/listIntersection';

/**
 * Busca concursos compatíveis com o perfil profissional de um candidato.
 */
export const searchConcursosByCPF = (cpf: string): BuscaResult<Concurso> => {
  if (!isValidCPF(cpf)) {
    return { data: [], found: false, message: 'CPF inválido' };
  }

  const candidato = candidatos.find((item) => cleanCPF(item.cpf) === cleanCPF(cpf));

  if (!candidato) {
    return { data: [], found: false, message: 'Candidato não encontrado' };
  }

  const concursosCompativeis = concursos.filter((concurso) =>
    hasIntersection(candidato.profissoes, concurso.vagas)
  );

  if (concursosCompativeis.length === 0) {
    return {
      data: [],
      found: false,
      message: 'Nenhum concurso compatível encontrado para suas profissões',
    };
  }

  return { data: concursosCompativeis, found: true };
};

/**
 * Busca candidatos compatíveis com as vagas de um código de concurso.
 * Quando há mais de um concurso com o mesmo código, todas as vagas são consideradas.
 */
export const searchCandidatosByCodigo = (codigo: string): BuscaResult<Candidato> => {
  const codigoNormalizado = codigo.trim();

  if (!codigoNormalizado) {
    return { data: [], found: false, message: 'Código do concurso é obrigatório' };
  }

  const concursosEncontrados = concursos.filter((concurso) => concurso.codigo === codigoNormalizado);

  if (concursosEncontrados.length === 0) {
    return { data: [], found: false, message: 'Concurso não encontrado' };
  }

  const vagasDoCodigo = concursosEncontrados.flatMap((concurso) => concurso.vagas);

  const candidatosCompativeis = candidatos.filter((candidato) =>
    hasIntersection(candidato.profissoes, vagasDoCodigo)
  );

  if (candidatosCompativeis.length === 0) {
    return {
      data: [],
      found: false,
      message: 'Nenhum candidato compatível encontrado para este concurso',
    };
  }

  return { data: candidatosCompativeis, found: true };
};
