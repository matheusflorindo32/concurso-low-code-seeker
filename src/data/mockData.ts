import { Candidato, Concurso } from '@/types';

/**
 * Dados dos candidatos conforme especificado no desafio LEDS IFES
 */
export const candidatos: Candidato[] = [
  {
    nome: "Lindsey Craft",
    dataNascimento: "19/05/1976",
    cpf: "182.845.084-34",
    profissoes: ["carpinteiro"]
  },
  {
    nome: "Jackie Dawson",
    dataNascimento: "14/08/1970",
    cpf: "311.667.973-47",
    profissoes: ["marceneiro", "assistente administrativo"]
  },
  {
    nome: "Cory Mendoza",
    dataNascimento: "11/02/1957",
    cpf: "565.512.353-92",
    profissoes: ["carpinteiro", "marceneiro"]
  }
];

/**
 * Dados dos concursos conforme especificado no desafio LEDS IFES
 */
export const concursos: Concurso[] = [
  {
    orgao: "SEDU",
    edital: "9/2016",
    codigo: "61828450843",
    vagas: ["analista de sistemas", "marceneiro"]
  },
  {
    orgao: "SEJUS",
    edital: "15/2017",
    codigo: "61828450843",
    vagas: ["carpinteiro", "professor de matemática", "assistente administrativo"]
  },
  {
    orgao: "SEJUS",
    edital: "17/2017",
    codigo: "95655123539",
    vagas: ["professor de matemática"]
  }
];