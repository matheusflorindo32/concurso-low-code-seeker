# 🛠️ Guia de Desenvolvimento

## 🚀 Setup do Ambiente

### Pré-requisitos
- **Node.js**: 18+ (recomendado: 20.x LTS)
- **npm**: 9+ ou **yarn**: 1.22+
- **Git**: 2.30+
- **VSCode**: Recomendado com extensões específicas

### Extensões VSCode Recomendadas
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "ms-playwright.playwright",
    "vitest.explorer",
    "formulahendry.auto-rename-tag"
  ]
}
```

### Instalação Inicial
```bash
# Clone o repositório
git clone [URL_DO_REPOSITORIO]
cd concurso-low-code-seeker

# Instale dependências
npm install

# Configure Git hooks (qualidade)
npm run prepare

# Verifique a instalação
npm run dev
```

## 📁 Estrutura do Projeto

### Organização de Pastas
```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes base (Shadcn)
│   ├── forms/          # Formulários específicos
│   ├── cards/          # Cards de exibição
│   └── layout/         # Componentes de layout
├── hooks/              # Hooks personalizados
│   ├── business/       # Lógica de negócio
│   ├── ui/            # Interface e UX
│   └── utils/         # Utilitários gerais
├── pages/              # Páginas da aplicação
├── utils/              # Funções utilitárias
├── types/              # Definições TypeScript
├── data/               # Dados mockados
├── lib/                # Configurações de libs
└── styles/             # Estilos globais
```

### Convenções de Nomenclatura

#### Arquivos e Pastas
- **Componentes**: PascalCase (`CandidatoCard.tsx`)
- **Hooks**: camelCase (`useSearch.ts`)
- **Utilitários**: camelCase (`cpfValidator.ts`)
- **Tipos**: PascalCase (`index.ts` com exports nomeados)
- **Pastas**: kebab-case (`buscar-candidatos/`)

#### Variáveis e Funções
```typescript
// ✅ Boas práticas
const candidatoSelecionado = useState();
const handleSubmitForm = () => {};
const isLoadingData = computed();

// ❌ Evitar
const data = useState();
const handleClick = () => {};
const flag = computed();
```

## 🏗️ Padrões de Desenvolvimento

### Estrutura de Componentes
```typescript
// Template padrão para componentes
import React from 'react';
import { cn } from '@/lib/utils';

interface ComponentNameProps {
  /** Descrição da prop */
  propName: string;
  
  /** Prop opcional com valor padrão */
  optionalProp?: boolean;
  
  /** Classes CSS adicionais */
  className?: string;
  
  /** Children quando necessário */
  children?: React.ReactNode;
}

/**
 * Descrição do componente
 * 
 * @param props - Props do componente
 * @returns JSX element
 */
export const ComponentName: React.FC<ComponentNameProps> = ({
  propName,
  optionalProp = false,
  className,
  children
}) => {
  // Estado local
  const [localState, setLocalState] = useState();
  
  // Hooks personalizados
  const { data, loading } = useCustomHook();
  
  // Handlers
  const handleAction = useCallback(() => {
    // lógica
  }, []);
  
  // Renderização condicional
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return (
    <div 
      className={cn("base-classes", className)}
      data-testid="component-name"
    >
      {children}
    </div>
  );
};

export default ComponentName;
```

### Hooks Personalizados
```typescript
// Template para hooks
import { useState, useEffect, useCallback } from 'react';

interface UseCustomHookOptions {
  /** Opções do hook */
  option1?: string;
  option2?: boolean;
}

interface UseCustomHookReturn {
  /** Dados retornados */
  data: any[];
  
  /** Estado de carregamento */
  loading: boolean;
  
  /** Erro se houver */
  error: string | null;
  
  /** Função de ação */
  performAction: (param: string) => Promise<void>;
}

/**
 * Hook para funcionalidade específica
 * 
 * @param options - Opções de configuração
 * @returns Estado e funções do hook
 */
export const useCustomHook = (
  options: UseCustomHookOptions = {}
): UseCustomHookReturn => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performAction = useCallback(async (param: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // lógica assíncrona
      const result = await someAsyncOperation(param);
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    loading,
    error,
    performAction
  };
};
```

## 🎨 Design System

### Uso de Tokens CSS
```typescript
// ✅ Usar tokens semânticos
<div className="bg-background text-foreground border-border" />

// ❌ Evitar cores diretas
<div className="bg-white text-black border-gray-200" />
```

### Componentes Shadcn/UI
```typescript
// Customização de componentes base
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const CustomButton = ({ variant = 'default', size = 'md', ...props }) => {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "custom-button-styles",
        props.className
      )}
      {...props}
    />
  );
};
```

### Responsividade
```typescript
// Mobile-first approach
<div className="
  p-4 text-sm         // mobile (default)
  sm:p-6 sm:text-base // small screens
  md:p-8 md:text-lg   // medium screens
  lg:p-12 lg:text-xl  // large screens
" />

// Uso de hooks para lógica responsiva
const { isMobile } = useBreakpoint();

return isMobile ? <MobileComponent /> : <DesktopComponent />;
```

## 🧪 Estratégia de Testes

### Testes Unitários
```typescript
// utils/__tests__/example.test.ts
import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCustomHook } from '../useCustomHook';

describe('useCustomHook', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useCustomHook());
    
    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle async operations', async () => {
    const { result } = renderHook(() => useCustomHook());
    
    await act(async () => {
      await result.current.performAction('test');
    });
    
    expect(result.current.loading).toBe(false);
    // mais assertions
  });
});
```

### Testes de Componentes
```typescript
// components/__tests__/Component.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ComponentName } from '../ComponentName';

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName propName="test" />);
    
    expect(screen.getByTestId('component-name')).toBeInTheDocument();
  });

  it('should handle user interactions', () => {
    const handleClick = vi.fn();
    render(<ComponentName propName="test" onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Testes E2E
```typescript
// e2e/feature.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete user flow', async ({ page }) => {
    // Passo 1
    await page.fill('input[name="field"]', 'value');
    
    // Passo 2
    await page.click('button[type="submit"]');
    
    // Verificação
    await expect(page.locator('[data-testid="result"]')).toBeVisible();
  });
});
```

## 🔧 Scripts de Desenvolvimento

### Scripts Disponíveis
```bash
# Desenvolvimento
npm run dev              # Servidor de desenvolvimento
npm run dev:host         # Servidor acessível na rede

# Build
npm run build            # Build de produção
npm run preview          # Preview do build

# Testes
npm run test             # Testes unitários
npm run test:ui          # Interface de testes
npm run test:coverage    # Cobertura de testes
npm run test:e2e         # Testes E2E
npm run test:e2e:ui      # Interface E2E

# Qualidade
npm run lint             # ESLint
npm run lint:fix         # Corrigir problemas
npm run type-check       # Verificação TypeScript

# Utilitários
npm run clean            # Limpar builds
npm run deps:update      # Atualizar dependências
```

### Hooks de Git
```bash
# Pre-commit (automático via Husky)
npm run lint             # Verificar código
npm run type-check       # Verificar tipos
npm run test:changed     # Testar arquivos alterados

# Pre-push
npm run test             # Todos os testes
npm run build            # Verificar build
```

## 📦 Gerenciamento de Estado

### Estado Local (useState)
```typescript
// Estado simples do componente
const [isOpen, setIsOpen] = useState(false);
const [formData, setFormData] = useState({ name: '', email: '' });
```

### Estado Derivado (useMemo)
```typescript
// Valores computados
const filteredItems = useMemo(() => {
  return items.filter(item => item.active);
}, [items]);

const totalPrice = useMemo(() => {
  return cartItems.reduce((sum, item) => sum + item.price, 0);
}, [cartItems]);
```

### Hooks Personalizados
```typescript
// Encapsulamento de lógica complexa
const { 
  candidates, 
  loading, 
  error, 
  searchByCPF 
} = useSearch();
```

## 🚀 Performance

### Otimizações de Renderização
```typescript
// Memoização de componentes
const ExpensiveComponent = React.memo(({ data }) => {
  return <ComplexVisualization data={data} />;
});

// Callbacks memoizados
const handleSubmit = useCallback((formData) => {
  // processar dados
}, []);

// Lazy loading
const LazyComponent = lazy(() => import('./LazyComponent'));
```

### Bundle Optimization
```typescript
// Import dinâmico
const loadFeature = async () => {
  const module = await import('./feature/FeatureModule');
  return module.default;
};

// Code splitting por rota
const routes = [
  {
    path: '/feature',
    component: lazy(() => import('./pages/FeaturePage'))
  }
];
```

## 🐛 Debugging

### Console Logging
```typescript
// Debug estruturado
console.group('User Search');
console.log('CPF:', cpf);
console.log('Results:', results);
console.log('Duration:', performance.now() - start);
console.groupEnd();

// Logs condicionais
if (process.env.NODE_ENV === 'development') {
  console.debug('Debug info:', data);
}
```

### React DevTools
```typescript
// Nomes de componentes para DevTools
ComponentName.displayName = 'ComponentName';

// Props customizadas para debugging
<div 
  data-debug-id="search-form"
  data-debug-state={JSON.stringify(state)}
/>
```

### Playwright Debugging
```bash
# Debug mode
npm run test:e2e:debug

# Headed mode
npm run test:e2e -- --headed

# Specific test
npm run test:e2e -- tests/specific.spec.ts --debug
```

## 📚 Recursos e Referências

### Documentação Oficial
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/UI](https://ui.shadcn.com/)
- [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/)
- [Playwright](https://playwright.dev/)

### Ferramentas de Desenvolvimento
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)
- [TypeScript Config](https://www.typescriptlang.org/tsconfig)

### Padrões e Boas Práticas
- [React Patterns](https://reactpatterns.com/)
- [TypeScript Best Practices](https://typescript-eslint.io/rules/)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 🔄 Workflow de Contribuição

### Branch Strategy
```bash
# Feature branch
git checkout -b feature/nova-funcionalidade

# Bug fix
git checkout -b fix/correcao-bug

# Hotfix
git checkout -b hotfix/correcao-urgente
```

### Commit Messages
```bash
# Formato: type(scope): description
feat(search): add CPF validation
fix(ui): correct button hover state
docs(readme): update installation steps
test(utils): add cpf validator tests
```

### Pull Request Template
1. **Descrição**: O que foi alterado?
2. **Motivação**: Por que foi alterado?
3. **Testes**: Como foi testado?
4. **Screenshots**: Se aplicável
5. **Checklist**: Todos os critérios atendidos?

Este guia deve ser seguido para manter a consistência e qualidade do código em todo o projeto.