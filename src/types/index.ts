/**
 * Tipos TypeScript para o Sistema de Consulta de Concursos LEDS IFES
 */

export interface Candidato {
  nome: string;
  dataNascimento: string;
  cpf: string;
  profissoes: string[];
}

export interface Concurso {
  orgao: string;
  edital: string;
  codigo: string;
  vagas: string[];
}

export interface BuscaResult<T> {
  data: T[];
  found: boolean;
  message?: string;
}