# Configuração SonarQube

## 🔍 Análise de Qualidade de Código

Este projeto utiliza **SonarCloud** para análise automática de qualidade, mantendo altos padrões de código e identificando potenciais problemas.

## ⚙️ Configuração

### SonarCloud Setup
1. Projeto configurado no [SonarCloud](https://sonarcloud.io)
2. Organização: `leds-ifes`
3. Chave do projeto: `leds-ifes-concurso-system`

### Métricas Analisadas
- **Bugs**: Problemas que podem afetar o comportamento
- **Vulnerabilidades**: Questões de segurança
- **Code Smells**: Problemas de manutenibilidade
- **Cobertura**: Percentual de código testado
- **Duplicação**: Código duplicado no projeto
- **Complexidade**: Complexidade ciclomática

## 🚦 Quality Gates

### Critérios de Qualidade
- **Cobertura mínima**: 80%
- **Duplicação máxima**: 3%
- **Manutenibilidade**: Rating A
- **Confiabilidade**: Rating A
- **Segurança**: Rating A

### Configurações Customizadas
```properties
# Exclusões
sonar.exclusions=**/*.config.js,**/*.config.ts,src/components/ui/**

# Cobertura
sonar.javascript.lcov.reportPaths=coverage/lcov.info
sonar.coverage.exclusions=**/*.test.*,src/components/ui/**

# Quality Gate
sonar.qualitygate.wait=true
```

## 🔄 Integração CI/CD

### Workflow Automático
- Análise em **push** para `main` e `develop`
- Análise em **pull requests**
- Comentários automáticos em PRs
- Bloqueio se Quality Gate falhar

### Comandos Locais
```bash
# Executar análise local (se configurado)
npm run sonar

# Ver relatórios de cobertura
npm run test:coverage
```

## 📊 Dashboards e Relatórios

### Links Úteis
- **Dashboard**: https://sonarcloud.io/dashboard?id=leds-ifes-concurso-system
- **Issues**: https://sonarcloud.io/project/issues?id=leds-ifes-concurso-system
- **Coverage**: https://sonarcloud.io/component_measures?id=leds-ifes-concurso-system&metric=coverage

### Badges Disponíveis
- Quality Gate Status
- Coverage Percentage  
- Bugs Count
- Vulnerabilities Count
- Code Smells Count

## 🛠️ Configuração Local

### Secrets Necessários
Para executar localmente ou em fork:

```bash
# GitHub Secrets
SONAR_TOKEN=your_sonar_token_here
GITHUB_TOKEN=automatic_github_token
```

### Arquivo de Configuração
O projeto usa `sonar-project.properties` para configurações específicas:

- Definição de sources e tests
- Exclusões de arquivos gerados
- Configurações de cobertura
- Parâmetros de qualidade

## 📈 Melhoria Contínua

### Monitoramento
- Análise em cada commit
- Trending de métricas ao longo do tempo
- Alertas para degradação de qualidade
- Comparação entre branches

### Ações Recomendadas
1. **Manter cobertura alta**: Escrever testes para código novo
2. **Corrigir code smells**: Refatorar código conforme sugestões
3. **Eliminar duplicação**: Extrair componentes/funções reutilizáveis
4. **Monitorar complexity**: Quebrar funções muito complexas