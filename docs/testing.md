# Guia de Testes

Este documento descreve os testes disponíveis no projeto e os comandos usados para validação local e em CI.

---

## Comandos

### Testes unitários

```bash
npm run test
```

Executa a suíte unitária com Vitest.

### Testes em modo observação

```bash
npm run test:watch
```

Mantém o Vitest ativo durante o desenvolvimento.

### Cobertura

```bash
npm run test:coverage
```

Executa a verificação de cobertura quando o provedor de cobertura estiver disponível no ambiente.

### Testes end-to-end

```bash
npm run test:e2e
```

Executa os testes E2E com Playwright.

---

## O que está coberto

### Utilitários de CPF

- limpeza de caracteres não numéricos;
- formatação com pontos e traço;
- rejeição de entrada inválida;
- rejeição de dígitos repetidos;
- máscara progressiva durante digitação.

### Comparação de listas

- compatibilidade entre profissão e vaga;
- ausência de compatibilidade;
- normalização de texto;
- retorno das profissões em comum.

### Regras de busca

- busca de concursos por CPF;
- busca de candidatos por código;
- tratamento de CPF inválido;
- tratamento de código vazio;
- tratamento de código inexistente;
- consideração de múltiplos concursos com o mesmo código.

### E2E básico

Os testes E2E atuais funcionam como smoke tests, validando se as páginas principais carregam corretamente:

- página inicial;
- busca de concursos;
- busca de candidatos.

---

## Próximos testes recomendados

- preencher formulários reais no navegador;
- validar mensagens de sucesso e erro na interface;
- testar responsividade em mobile;
- testar navegação por teclado;
- validar acessibilidade básica de labels e foco.
