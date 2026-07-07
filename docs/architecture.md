# Arquitetura do Sistema

Este documento descreve a organização técnica do Sistema de Consulta de Concursos — LEDS IFES.

---

## Estrutura de pastas

```txt
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/              # Componentes base do shadcn/ui
│   ├── CandidatoCard.tsx
│   ├── ConcursoCard.tsx
│   └── SearchForm.tsx
├── pages/               # Páginas da aplicação
│   ├── Index.tsx
│   ├── BuscarConcursos.tsx
│   └── BuscarCandidatos.tsx
├── data/                # Dados simulados do desafio
│   └── mockData.ts
├── hooks/               # Hooks de integração com a interface
│   └── useSearch.ts
├── services/            # Regras de negócio
│   └── searchService.ts
├── types/               # Tipos TypeScript
│   └── index.ts
└── utils/               # Funções utilitárias
    ├── cpfValidator.ts
    └── listIntersection.ts
```

---

## Fluxo de responsabilidade

A arquitetura segue um fluxo simples:

```txt
Página → Hook → Service → Dados/Utils → Resultado
```

### Pages

As páginas são responsáveis por renderizar a interface e exibir formulários, mensagens e resultados.

### Hook `useSearch`

O hook centraliza estados de interface, como:

- carregamento;
- mensagem de erro;
- chamada das funções de busca.

Ele não concentra mais a regra principal do desafio. Essa lógica foi extraída para a camada de serviço.

### Service `searchService`

A camada de serviço concentra as regras de negócio:

- localizar candidato por CPF;
- localizar concursos por código;
- considerar múltiplos concursos com o mesmo código;
- comparar profissões do candidato com vagas do concurso;
- retornar mensagens padronizadas para sucesso, erro e ausência de resultado.

### Utils

As funções utilitárias cuidam de operações específicas:

- limpeza, formatação e validação de CPF;
- normalização e comparação entre listas de profissões e vagas.

---

## Componentes principais

### Dashboard (`/`)

- Página inicial com acesso às duas funcionalidades.
- Cards de navegação para busca por CPF e busca por código.
- Layout simples e responsivo.

### Busca por CPF (`/buscar-concursos`)

- Formulário com campo de CPF.
- Chamada ao hook de busca.
- Exibição de concursos compatíveis.
- Feedback visual para erro ou ausência de resultado.

### Busca por Código (`/buscar-candidatos`)

- Formulário com campo de código do concurso.
- Chamada ao hook de busca.
- Exibição de candidatos compatíveis.
- Feedback visual para erro ou ausência de resultado.

---

## Regras de negócio

### Compatibilidade por CPF

O sistema identifica o candidato cadastrado pelo CPF informado, lê suas profissões e retorna os concursos que possuem ao menos uma vaga compatível.

### Compatibilidade por código de concurso

O sistema localiza os concursos cadastrados com o código informado. Quando existe mais de um concurso com o mesmo código, todas as vagas desses concursos são consideradas na busca de candidatos compatíveis.

### Comparação normalizada

A comparação entre profissões e vagas é feita de forma normalizada, reduzindo problemas com:

- letras maiúsculas e minúsculas;
- espaços extras;
- acentuação.

---

## Testabilidade

A separação da lógica em `searchService.ts` permite testar as regras do desafio sem depender diretamente da interface React.

A suíte atual possui testes para:

- validação e formatação de CPF;
- comparação de listas;
- regra de busca por CPF;
- regra de busca por código;
- tratamento de código inexistente ou vazio;
- smoke tests das páginas principais com Playwright.

---

## Responsividade

A interface utiliza abordagem responsiva com Tailwind CSS, priorizando boa leitura e navegação em diferentes tamanhos de tela.

---

## Possíveis evoluções arquiteturais

- Criar uma camada de repositório para isolar a origem dos dados.
- Substituir dados simulados por API ou banco de dados.
- Adicionar testes de integração com preenchimento real dos formulários.
- Centralizar mensagens de erro em constantes.
- Criar uma camada de mapeamento para preparar dados antes da exibição.
