/**
 * Utilitário para verificar interseção entre listas de profissões/vagas
 */

/**
 * Verifica se há pelo menos uma profissão em comum entre duas listas
 * @param list1 Lista de profissões do candidato
 * @param list2 Lista de vagas do concurso
 * @returns true se houver pelo menos uma profissão em comum
 */
export const hasIntersection = (list1: string[], list2: string[]): boolean => {
  // Normaliza as strings para comparação (remove acentos, converte para minúscula)
  const normalize = (str: string) => str.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  const normalizedList1 = list1.map(normalize);
  const normalizedList2 = list2.map(normalize);
  
  return normalizedList1.some(profession => normalizedList2.includes(profession));
};

/**
 * Retorna as profissões em comum entre duas listas
 * @param list1 Lista de profissões do candidato
 * @param list2 Lista de vagas do concurso
 * @returns Array com as profissões em comum
 */
export const getIntersection = (list1: string[], list2: string[]): string[] => {
  const normalize = (str: string) => str.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  return list1.filter(profession => 
    list2.some(vaga => normalize(profession) === normalize(vaga))
  );
};