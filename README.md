# Sistema de Consulta de Concursos — LEDS IFES

Projeto desenvolvido para o **Desafio Low/No Code do LEDS IFES**, com foco em consulta de compatibilidade entre **candidatos**, **profissões** e **concursos públicos**.

A solução permite realizar duas operações principais:

1. Consultar quais concursos são compatíveis com o perfil profissional de um candidato a partir do **CPF**.
2. Consultar quais candidatos são compatíveis com um concurso a partir do **código do concurso**.

> Este README descreve o projeto, suas decisões técnicas e os recursos implementados. A avaliação final cabe à equipe responsável pelo desafio.

---

## Visão geral

O sistema foi construído como uma aplicação web em **React + TypeScript**, com interface responsiva e separação entre páginas, componentes, serviços, hooks, utilitários, tipos e dados simulados.

A regra principal do projeto é simples: comparar a lista de profissões do candidato com a lista de vagas do concurso. Quando existe ao menos uma profissão em comum, o sistema considera que há compatibilidade.

---

## Funcionalidades principais

### Buscar concursos por CPF

O usuário informa o CPF de um candidato cadastrado e o sistema retorna os concursos compatíveis com as profissões desse candidato.

**Exemplo de uso:**

```txt
CPF: 311.667.973-47
```

O sistema busca o candidato correspondente e compara suas profissões com as vagas disponíveis nos concursos cadastrados.

### Buscar candidatos por código do concurso

O usuário informa o código de um concurso e o sistema retorna os candidatos que possuem ao menos uma profissão compatível com as vagas desse concurso.

**Exemplo de uso:**

```txt
Código do concurso: 61828450843
```

### Validações e mensagens de retorno

A aplicação possui tratamento para situações como:

- CPF inválido;
- candidato não encontrado;
- código de concurso vazio;
- concurso não encontrado;
- ausência de compatibilidade entre candidato e concurso.

---

## Dados utilizados

Os dados seguem o enunciado do desafio e estão organizados no projeto como dados simulados.

### Candidatos

| Nome | Data de nascimento | CPF | Profissões |
|---|---:|---|---|
| Lindsey Craft | 19/05/1976 | 182.845.084-34 | carpinteiro |
| Jackie Dawson | 14/08/1970 | 311.667.973-47 | marceneiro; assistente administrativo |
| Cory Mendoza | 11/02/1957 | 565.512.353-92 | carpinteiro; marceneiro |

### Concursos

| Órgão | Edital | Código | Vagas |
|---|---:|---|---|
| SEDU | 9/2016 | 61828450843 | analista de sistemas; marceneiro |
| SEJUS | 15/2017 | 61828450843 | carpinteiro; professor de matemática; assistente administrativo |
| SEJUS | 17/2017 | 95655123539 | professor de matemática |

---

## Tecnologias utilizadas

- **React** — construção da interface;
- **TypeScript** — tipagem estática e maior segurança no desenvolvimento;
- **Vite** — ambiente de desenvolvimento e build;
- **React Router DOM** — navegação entre páginas;
- **Tailwind CSS** — estilização responsiva;
- **shadcn/ui** — componentes de interface;
- **Vitest** — testes unitários;
- **Playwright** — testes end-to-end;
- **Docker** — estrutura para execução em container;
- **GitHub Actions** — automação para validação e build.

---

## Estrutura do projeto

```txt
src/
├── components/       # Componentes reutilizáveis da interface
├── data/             # Dados simulados do desafio
├── hooks/            # Hooks para estado e integração com a UI
├── pages/            # Páginas principais da aplicação
├── services/         # Regras de negócio e consultas do desafio
├── types/            # Tipos TypeScript
└── utils/            # Funções utilitárias, validação e comparação
```

### Principais arquivos

| Arquivo | Função |
|---|---|
| `src/pages/Index.tsx` | Tela inicial com acesso às duas buscas |
| `src/pages/BuscarConcursos.tsx` | Página de busca de concursos por CPF |
| `src/pages/BuscarCandidatos.tsx` | Página de busca de candidatos por código |
| `src/services/searchService.ts` | Regras de negócio para consulta de concursos e candidatos |
| `src/hooks/useSearch.ts` | Controle de loading, erro e integração entre service e interface |
| `src/data/mockData.ts` | Dados de candidatos e concursos |
| `src/utils/cpfValidator.ts` | Limpeza, máscara e validação de CPF |
| `src/utils/listIntersection.ts` | Comparação entre profissões e vagas |

---

## Decisões técnicas

### Separação de responsabilidades

A aplicação foi organizada para separar interface, regras de busca, dados e funções auxiliares. Isso facilita leitura, manutenção e evolução do projeto.

### Camada de serviço

As regras principais de compatibilidade foram concentradas em `src/services/searchService.ts`. Dessa forma, a lógica do desafio pode ser testada de forma isolada, sem depender diretamente da camada visual em React.

### Hook de busca

O hook `useSearch` ficou responsável pelos estados de interface, como carregamento, mensagem de erro e chamada das funções de serviço. Isso reduz acoplamento e deixa o fluxo mais fácil de manter.

### Validação de CPF

O sistema possui função própria para limpar, formatar e validar CPF. Para manter aderência ao enunciado, os CPFs fornecidos no desafio também são aceitos pela aplicação.

### Comparação normalizada

A comparação entre profissões e vagas usa normalização de texto, reduzindo problemas com diferença entre maiúsculas, minúsculas, espaços e acentuação.

### Interface responsiva

A interface utiliza classes responsivas para funcionar em telas menores e maiores, mantendo navegação simples para o usuário.

---

## Como executar o projeto

### Pré-requisitos

- Node.js instalado;
- npm instalado.

### Instalação

```bash
git clone https://github.com/matheusflorindo32/concurso-low-code-seeker.git
cd concurso-low-code-seeker
npm install
```

### Rodar em desenvolvimento

```bash
npm run dev
```

Depois, abra o endereço exibido no terminal.

### Gerar build de produção

```bash
npm run build
```

### Visualizar build localmente

```bash
npm run preview
```

---

## Testes

### Testes unitários

```bash
npm run test
```

### Testes end-to-end

```bash
npm run test:e2e
```

### Testes em modo observação

```bash
npm run test:watch
```

---

## Execução com Docker

O projeto possui um `Dockerfile` para build e execução da aplicação em ambiente containerizado.

```bash
docker build -t concurso-leds-ifes .
docker run -p 8080:80 concurso-leds-ifes
```

Depois, acesse:

```txt
http://localhost:8080
```

---

## Critérios do desafio contemplados

Este projeto foi organizado considerando os critérios apresentados no desafio:

- legibilidade do código;
- documentação da solução;
- documentação das principais funções;
- tratamento de erros;
- separação da lógica de busca;
- uso de TypeScript e padrão de componentes React;
- estrutura para execução com Docker;
- estrutura de automação com GitHub Actions;
- interface responsiva.

A proposta deste README é apresentar evidências técnicas da solução sem substituir a avaliação oficial.

---

## Documentação complementar

O repositório também possui documentos auxiliares em `docs/`, incluindo:

- arquitetura do projeto;
- guia de deploy;
- estratégia de testes;
- acessibilidade e responsividade;
- informações sobre PWA;
- configuração de qualidade de código.

---

## Possíveis evoluções

Alguns caminhos naturais para evolução do projeto são:

- ampliar os testes automatizados dos fluxos de busca e mensagens de erro;
- ativar e validar completamente os recursos de PWA;
- substituir dados simulados por uma fonte externa ou banco de dados;
- publicar uma versão online demonstrável;
- evoluir a interface com estados visuais mais detalhados para sucesso, erro e ausência de resultados.

---

## Autor

Projeto desenvolvido por **Matheus Florindo** para o desafio **LEDS IFES — Low/No Code**.

---

## Licença

Este projeto foi desenvolvido para fins de estudo, demonstração técnica e avaliação no contexto do desafio.
