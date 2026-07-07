# Guia de Testes

Este documento descreve a estratégia de testes do projeto e os comandos disponíveis para validação local e em CI.

---

## Objetivo

A estratégia de testes tem como foco validar as partes mais importantes da solução:

- funções utilitárias de CPF;
- comparação entre profissões e vagas;
- carregamento das páginas principais;
- navegação básica entre os fluxos do desafio.

A cobertura pode ser ampliada nas próximas evoluções do projeto, especialmente com testes mais completos para formulários, estados de erro e resultados de busca.

---

## Comandos disponíveis

### Testes unitários

```bash
npm run test
```

Executa os testes unitários com Vitest.

### Testes unitários em modo observação

```bash
npm run test:watch
```

Mantém o Vitest ativo para reexecutar testes durante o desenvolvimento.

### Cobertura de testes

```bash
npm run test:coverage
```

Executa a verificação de cobertura quando o provedor de cobertura estiver disponível no ambiente.

### Testes end-to-end

```bash
npm run test:e2e
```

Executa os testes E2E com Playwright.

### Testes E2E com interface

```bash
npm run test:e2e:ui
```

Abre a interface do Playwright para depuração visual dos testes.

### Testes E2E em modo debug

```bash
npm run test:e2e:debug
```

Executa os testes com ferramentas de depuração do Playwright.

---

## Testes unitários atuais

Os testes unitários iniciais cobrem:

### CPF

- limpeza de CPF;
- formatação de CPF;
- aceitação dos CPFs fornecidos pelo desafio;
- rejeição de CPF com tamanho inválido;
- rejeição de CPF com dígitos repetidos;
- máscara progressiva durante a digitação.

### Comparação de listas

- identificação de compatibilidade entre profissão e vaga;
- retorno falso quando não há compatibilidade;
- normalização de maiúsculas, espaços e acentos;
- retorno das profissões compatíveis.

---

## Testes E2E atuais

Os testes E2E iniciais funcionam como smoke tests, verificando se os fluxos principais carregam corretamente:

- página inicial;
- página de busca de concursos por CPF;
- página de busca de candidatos por código.

---

## Próximos testes recomendados

Para fortalecer a avaliação técnica, os próximos testes devem cobrir:

- busca por CPF válido com resultado;
- busca por CPF inválido;
- busca por CPF não cadastrado;
- busca por código válido com resultado;
- busca por código inexistente;
- campo de código vazio;
- mensagens de sucesso e erro;
- responsividade básica em mobile;
- comportamento dos botões de navegação.

---

## Ferramentas utilizadas

- **Vitest** para testes unitários;
- **Testing Library** para testes de componentes React;
- **Playwright** para testes end-to-end;
- **ESLint** para análise estática;
- **TypeScript** para tipagem e segurança no desenvolvimento.
