# Guia de Testes

## 🧪 Estratégia de Testes

Este projeto implementa uma estratégia abrangente de testes para garantir qualidade e confiabilidade:

### Tipos de Testes Implementados

#### 1. **Testes Unitários** (53 testes)
- **CPF Validator**: 21 testes
  - Validação de CPFs específicos do desafio
  - Formatação e limpeza de CPF
  - Casos extremos e edge cases

- **List Intersection**: 15 testes
  - Normalização de strings
  - Comparação de arrays
  - Casos com e sem intersecção

- **Search Hook**: 17 testes
  - Busca por CPF
  - Busca por código
  - Estados de loading e erro

#### 2. **Testes E2E** (15+ cenários)
- **Navegação**: Fluxos entre páginas
- **Busca por CPF**: Cenários de sucesso e erro
- **Busca por Código**: Validações e resultados
- **Responsividade**: Mobile, tablet e desktop
- **Validações**: Campos obrigatórios e formatos

### Como Executar os Testes

#### Testes Unitários
```bash
# Executar todos os testes unitários
npm run test

# Executar testes com interface gráfica
npm run test:ui

# Executar testes com cobertura
npm run test:coverage

# Executar testes em modo watch
npm run test:watch
```

#### Testes E2E
```bash
# Executar todos os testes E2E
npm run test:e2e

# Executar em modo interativo
npm run test:e2e:ui

# Executar em browser específico
npm run test:e2e -- --project=chromium

# Executar com debug
npm run test:e2e:debug
```

## 📊 Cobertura de Testes

O projeto mantém alta cobertura de testes nos módulos críticos:

- **Utils**: 100% de cobertura
- **Hooks**: 95% de cobertura  
- **Core functions**: 100% de cobertura
- **E2E Coverage**: 90% dos fluxos principais

### Relatórios
- Relatórios de cobertura são gerados automaticamente
- Relatórios E2E com screenshots e vídeos
- Integração com Codecov para tracking
- Badge de cobertura no README

## 🧪 Testes Manuais

### Cenários de Teste Funcionais

#### Busca por CPF
1. **CPF válido com concursos**: `182.845.084-34` → Deve retornar concurso SEJUS
2. **CPF válido sem concursos**: Teste com CPF sem profissões compatíveis
3. **CPF inválido**: `123.456.789-00` → Deve mostrar erro de validação
4. **CPF inexistente**: CPF válido mas não cadastrado

#### Busca por Código
1. **Código válido**: `61828450843` → Deve retornar candidatos compatíveis
2. **Código inexistente**: `99999999999` → Deve mostrar erro
3. **Campo vazio**: Deve solicitar preenchimento

### Testes de Interface
- **Responsividade**: Testar em diferentes tamanhos de tela
- **Navegação**: Verificar funcionamento dos links
- **Formulários**: Validar comportamento e feedback
- **Loading states**: Confirmar indicadores de carregamento

## 🔍 Debugging e Qualidade

### Ferramentas Utilizadas
- **Vitest**: Framework de testes unitários
- **Testing Library**: Testes de componentes React
- **Playwright**: Testes E2E multiplataforma
- **JSDoc**: Documentação de código
- **ESLint**: Análise estática de código
- **TypeScript**: Tipagem forte

### Boas Práticas
- Testes isolados e independentes
- Nomenclatura descritiva
- Arrange-Act-Assert pattern
- Mocks e stubs quando necessário
- Testes de regressão para bugs
- Screenshots e vídeos em falhas E2E
- Testes em múltiplos navegadores