<div align="center">

# CONCURSO LOW-CODE SEEKER

### Sistema de compatibilidade entre candidatos, profissões e concursos públicos

[![React](https://img.shields.io/badge/React-TypeScript-3178C6?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![Tests](https://img.shields.io/badge/Testes-Vitest%20%2B%20Playwright-16A34A?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev/)
[![Docker](https://img.shields.io/badge/Docker-Container-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)
[![CI](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white)](https://github.com/features/actions)

</div>

---

## Contexto

Projeto desenvolvido para o **Desafio Low/No Code do LEDS IFES**. A aplicação consulta compatibilidade entre candidatos e concursos públicos com base na interseção entre profissões declaradas e vagas disponíveis.

O projeto demonstra organização de uma aplicação React em páginas, componentes, serviços, hooks, tipos, utilitários e dados simulados.

---

## Problema e solução

A aplicação oferece dois fluxos principais:

1. **Concursos por candidato:** o usuário informa um CPF e recebe os concursos compatíveis com as profissões cadastradas para aquele candidato.
2. **Candidatos por concurso:** o usuário informa o código de um concurso e recebe os candidatos que possuem ao menos uma profissão compatível com as vagas.

A regra de negócio principal é implementada em uma camada de serviço independente da interface.

---

## Funcionalidades

- consulta por CPF;
- consulta por código de concurso;
- máscara, limpeza e validação de CPF;
- comparação entre listas de profissões e vagas;
- estados de carregamento, sucesso, ausência de resultado e erro;
- mensagens para candidato ou concurso inexistente;
- interface responsiva;
- testes unitários e testes end-to-end;
- execução por container;
- validação automatizada em GitHub Actions.

---

## Arquitetura

```mermaid
graph TD
    A[Interface React] --> B[Hook useSearch]
    B --> C[Search Service]
    C --> D[Dados simulados]
    C --> E[Validador de CPF]
    C --> F[Interseção de listas]
    G[Vitest] --> C
    H[Playwright] --> A
```

| Camada | Responsabilidade |
|:---|:---|
| `pages/` | Fluxos principais e composição das telas |
| `components/` | Componentes reutilizáveis |
| `hooks/` | Estados e integração entre UI e serviço |
| `services/` | Regras de busca e compatibilidade |
| `utils/` | CPF, máscaras e comparação de listas |
| `types/` | Contratos TypeScript |
| `data/` | Dados simulados fornecidos para o desafio |

---

## Stack

`React` • `TypeScript` • `Vite` • `React Router` • `Tailwind CSS` • `Shadcn/UI` • `Vitest` • `Playwright` • `Docker` • `GitHub Actions`

---

## Execução local

```bash
git clone https://github.com/matheusflorindo32/concurso-low-code-seeker.git
cd concurso-low-code-seeker
npm install
npm run dev
```

### Testes e build

```bash
npm run test
npm run build
```

Consulte o `package.json` para os scripts adicionais disponíveis no projeto.

---

## Execução com Docker

```bash
docker build -t concurso-low-code-seeker .
docker run --rm -p 8080:80 concurso-low-code-seeker
```

---

## Dados de demonstração

Os dados utilizados seguem o enunciado do desafio e são **simulados**. O projeto não consulta bases governamentais nem processa dados reais de candidatos.

Essa limitação é intencional e mantém a solução aderente ao escopo acadêmico.

---

## Decisões técnicas

- lógica de compatibilidade separada da camada visual;
- tipagem explícita dos candidatos, profissões e concursos;
- funções utilitárias isoladas para facilitar testes;
- hook dedicado aos estados de busca;
- automação de build e validação;
- documentação sem tratar o protótipo acadêmico como sistema governamental em produção.

---

## Autor

**Matheus Florindo de Deus**  
Estudante de Análise e Desenvolvimento de Sistemas — IFES

[![Perfil](https://img.shields.io/badge/GitHub-matheusflorindo32-111827?style=for-the-badge&logo=github)](https://github.com/matheusflorindo32)
[![Portfólio](https://img.shields.io/badge/Portfólio-Tropa%20Científica-D4AF37?style=for-the-badge&logo=googlechrome&logoColor=111827)](https://www.tropacientifica.com)
