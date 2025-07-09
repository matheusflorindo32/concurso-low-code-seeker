# 🤝 Guia de Contribuição

Obrigado pelo seu interesse em contribuir com o Sistema de Consulta de Concursos LEDS IFES! Este documento fornece diretrizes para contribuições.

## 📋 Código de Conduta

### Nossa Promessa
Estamos comprometidos em tornar a participação em nosso projeto uma experiência livre de assédio para todos, independentemente de idade, tamanho corporal, deficiência, etnia, identidade de gênero, nível de experiência, nacionalidade, aparência pessoal, raça, religião ou identidade e orientação sexual.

### Padrões Esperados
- Usar linguagem acolhedora e inclusiva
- Respeitar diferentes pontos de vista e experiências
- Aceitar críticas construtivas graciosamente
- Focar no que é melhor para a comunidade
- Mostrar empatia com outros membros da comunidade

## 🚀 Como Contribuir

### 1. Issues e Bug Reports

#### Reportando Bugs
Antes de criar uma issue, verifique se o problema já foi reportado:

1. Procure por issues existentes
2. Se não encontrar, crie uma nova issue com:
   - **Título claro** descrevendo o problema
   - **Descrição detalhada** com passos para reproduzir
   - **Ambiente** (OS, browser, versão)
   - **Screenshots** se aplicável
   - **Logs de erro** se disponíveis

#### Template de Bug Report
```markdown
**Descrição do Bug**
Uma descrição clara e concisa do bug.

**Passos para Reproduzir**
1. Vá para '...'
2. Clique em '...'
3. Role para baixo até '...'
4. Veja o erro

**Comportamento Esperado**
Uma descrição clara do que você esperava que acontecesse.

**Screenshots**
Se aplicável, adicione screenshots para ajudar a explicar o problema.

**Ambiente**
- OS: [e.g. iOS]
- Browser: [e.g. chrome, safari]
- Versão: [e.g. 22]

**Contexto Adicional**
Adicione qualquer outro contexto sobre o problema aqui.
```

### 2. Feature Requests

Para solicitar novas funcionalidades:

1. Verifique se a funcionalidade já foi solicitada
2. Crie uma issue com label "enhancement"
3. Descreva claramente:
   - **Problema** que a funcionalidade resolve
   - **Solução proposta**
   - **Alternativas consideradas**
   - **Benefícios** para os usuários

### 3. Pull Requests

#### Preparação
1. **Fork** o repositório
2. **Clone** seu fork localmente
3. **Crie uma branch** para sua funcionalidade:
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```

#### Desenvolvimento
1. **Siga os padrões** estabelecidos no projeto
2. **Escreva testes** para nova funcionalidade
3. **Mantenha commits** pequenos e focados
4. **Use mensagens** descritivas nos commits

#### Exemplo de Commit Message
```bash
feat(search): add advanced filtering options

- Add filter by profession
- Add filter by location  
- Add filter by date range
- Update search form UI
- Add unit tests for new filters

Fixes #123
```

#### Padrões de Commit
- **feat**: Nova funcionalidade
- **fix**: Correção de bug
- **docs**: Mudanças na documentação
- **style**: Formatação, sem mudança de lógica
- **refactor**: Refatoração de código
- **test**: Adição ou correção de testes
- **chore**: Manutenção, configuração

#### Antes de Submeter PR
1. **Execute todos os testes**:
   ```bash
   npm run test
   npm run test:e2e
   npm run lint
   npm run type-check
   ```

2. **Verifique a cobertura**:
   ```bash
   npm run test:coverage
   ```

3. **Build o projeto**:
   ```bash
   npm run build
   ```

#### Template de Pull Request
```markdown
## Descrição
Breve descrição das mudanças.

## Tipo de Mudança
- [ ] Bug fix (mudança que corrige um problema)
- [ ] Nova funcionalidade (mudança que adiciona funcionalidade)
- [ ] Breaking change (correção ou funcionalidade que mudaria funcionalidade existente)
- [ ] Mudança na documentação

## Como Foi Testado?
Descreva os testes executados para verificar suas mudanças.

- [ ] Testes unitários
- [ ] Testes de integração
- [ ] Testes E2E
- [ ] Testes manuais

## Screenshots (se aplicável)
Adicione screenshots para mudanças na UI.

## Checklist
- [ ] Meu código segue os padrões do projeto
- [ ] Revisei meu próprio código
- [ ] Comentei o código em áreas de difícil compreensão
- [ ] Fiz mudanças correspondentes na documentação
- [ ] Minhas mudanças não geram novos warnings
- [ ] Adicionei testes que provam que minha correção é efetiva ou que minha funcionalidade funciona
- [ ] Testes unitários novos e existentes passam localmente
- [ ] Mudanças dependentes foram mergeadas e publicadas
```

## 📏 Padrões de Código

### TypeScript
```typescript
// ✅ Bom
interface UserProps {
  /** Nome completo do usuário */
  name: string;
  /** Email válido */
  email: string;
  /** Idade opcional */
  age?: number;
}

const User: React.FC<UserProps> = ({ name, email, age }) => {
  // implementação
};

// ❌ Evitar
const User = (props: any) => {
  // sem tipagem adequada
};
```

### Componentes React
```typescript
// ✅ Estrutura recomendada
import React from 'react';
import { cn } from '@/lib/utils';

interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export const Component: React.FC<ComponentProps> = ({
  className,
  children
}) => {
  return (
    <div className={cn("base-classes", className)}>
      {children}
    </div>
  );
};
```

### CSS/Tailwind
```typescript
// ✅ Usar tokens semânticos
<div className="bg-background text-foreground border-border" />

// ✅ Responsive design
<div className="p-4 sm:p-6 lg:p-8" />

// ❌ Evitar cores hardcoded
<div className="bg-white text-black border-gray-200" />
```

### Testes
```typescript
// ✅ Testes descritivos
describe('UserSearch', () => {
  it('should find user by valid CPF', async () => {
    const result = await searchUser('123.456.789-00');
    expect(result).toBeDefined();
    expect(result.name).toBe('John Doe');
  });

  it('should throw error for invalid CPF', async () => {
    await expect(searchUser('invalid-cpf')).rejects.toThrow();
  });
});
```

## 🏗️ Arquitetura

### Estrutura de Pastas
Siga a estrutura estabelecida:
```
src/
├── components/     # Componentes reutilizáveis
├── hooks/         # Hooks personalizados  
├── pages/         # Páginas da aplicação
├── utils/         # Funções utilitárias
├── types/         # Definições TypeScript
└── data/          # Dados mockados
```

### Convenções de Nomenclatura
- **Componentes**: PascalCase (`UserCard.tsx`)
- **Hooks**: camelCase (`useUserData.ts`)
- **Utilitários**: camelCase (`formatCpf.ts`)
- **Constantes**: UPPER_SNAKE_CASE (`API_ENDPOINTS`)

## 🧪 Testes

### Cobertura Mínima
- **Utilitários**: 100%
- **Hooks**: 90%
- **Componentes**: 80%
- **Páginas**: 70%

### Tipos de Teste
1. **Unitários**: Funções e hooks isolados
2. **Integração**: Componentes com dependências
3. **E2E**: Fluxos completos do usuário

### Exemplos
```typescript
// Teste unitário
import { validateCPF } from '../utils/cpfValidator';

test('should validate correct CPF', () => {
  expect(validateCPF('123.456.789-09')).toBe(true);
});

// Teste de componente
import { render, screen } from '@testing-library/react';
import { UserCard } from '../UserCard';

test('should display user information', () => {
  const user = { name: 'John', email: 'john@example.com' };
  render(<UserCard user={user} />);
  
  expect(screen.getByText('John')).toBeInTheDocument();
});
```

## 🚀 Deployment

### Ambientes
- **Development**: `main` branch
- **Staging**: Tags `v*-beta`
- **Production**: Tags `v*`

### Process
1. **Development**: Push para `main` → Deploy automático para staging
2. **Release**: Criar tag → Deploy automático para produção
3. **Hotfix**: Branch `hotfix/*` → Review → Merge → Tag

## 📚 Documentação

### Requisitos
- **JSDoc**: Funções públicas devem ter documentação
- **README**: Atualizar para novas funcionalidades
- **CHANGELOG**: Documentar mudanças significativas

### Exemplo JSDoc
```typescript
/**
 * Valida um CPF usando o algoritmo oficial brasileiro
 * 
 * @param cpf - CPF a ser validado (com ou sem formatação)
 * @returns true se o CPF for válido, false caso contrário
 * 
 * @example
 * ```typescript
 * validateCPF('123.456.789-09') // true
 * validateCPF('12345678909')    // true  
 * validateCPF('123456789')      // false
 * ```
 */
export function validateCPF(cpf: string): boolean {
  // implementação
}
```

## 🔧 Setup de Desenvolvimento

### Requisitos
- Node.js 18+
- npm 9+
- Git 2.30+

### Instalação
```bash
# Fork e clone
git clone https://github.com/seu-usuario/repo-name.git
cd repo-name

# Instalar dependências
npm install

# Configurar ambiente
cp .env.example .env

# Iniciar desenvolvimento
npm run dev
```

### Extensões VSCode Recomendadas
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "ms-playwright.playwright"
  ]
}
```

## ❓ Dúvidas e Suporte

### Canais de Comunicação
- **Issues**: Para bugs e feature requests
- **Discussions**: Para dúvidas gerais e discussões
- **Email**: Para assuntos sensíveis ou privados

### LEDS IFES
- **Site**: https://leds.ifes.edu.br
- **LinkedIn**: https://www.linkedin.com/school/ledsifes
- **Instagram**: @ledsifes

## 🎯 Prioridades de Contribuição

### Alta Prioridade
- Correções de bugs críticos
- Melhorias de acessibilidade
- Otimizações de performance
- Documentação em falta

### Média Prioridade
- Novas funcionalidades solicitadas
- Refatorações de código
- Melhorias na UX
- Testes adicionais

### Baixa Prioridade
- Otimizações menores
- Atualizações de dependências
- Melhorias estéticas

## 🏆 Reconhecimento

Contribuidores serão reconhecidos em:
- README.md principal
- CONTRIBUTORS.md
- Release notes
- Redes sociais do LEDS IFES

---

**Obrigado por contribuir! Juntos, construímos software melhor. 🚀**