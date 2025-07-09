# 🛠️ Guia de Implementação Técnica

## 📋 Visão Geral da Arquitetura

Este documento detalha como cada funcionalidade e diferencial foi implementado tecnicamente no Sistema de Consulta de Concursos LEDS IFES.

## 🏗️ Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── ui/              # Componentes base (Shadcn/UI)
│   ├── AccessibilityControls.tsx
│   ├── CandidatoCard.tsx
│   ├── ConcursoCard.tsx
│   ├── OfflineIndicator.tsx
│   ├── PWAInstallPrompt.tsx
│   ├── PWAUpdateNotification.tsx
│   └── SearchForm.tsx
├── hooks/               # Hooks personalizados
│   ├── useAccessibility.ts
│   ├── useBreakpoint.ts
│   ├── usePWA.ts
│   └── useSearch.ts
├── pages/               # Páginas da aplicação
│   ├── Index.tsx
│   ├── BuscarCandidatos.tsx
│   ├── BuscarConcursos.tsx
│   └── NotFound.tsx
├── utils/               # Utilitários puros
│   ├── cpfValidator.ts
│   └── listIntersection.ts
├── data/                # Dados mockados
│   └── mockData.ts
└── types/               # Definições TypeScript
    └── index.ts
```

## 🎯 Implementação dos Diferenciais

### 1. Clean Code (20 pontos)

#### Princípios SOLID Aplicados

**Single Responsibility Principle (SRP)**
```typescript
// ❌ Componente fazendo muitas coisas
const SearchPage = () => {
  // lógica de validação
  // lógica de busca  
  // lógica de formatação
  // renderização
}

// ✅ Responsabilidades separadas
const SearchForm = () => { /* apenas UI do formulário */ }
const useSearch = () => { /* apenas lógica de busca */ }
const useCPFValidator = () => { /* apenas validação */ }
```

**Open/Closed Principle (OCP)**
```typescript
// Componente Card extensível sem modificação
interface BaseCardProps {
  title: string;
  children: React.ReactNode;
}

const Card = ({ title, children, ...props }: BaseCardProps) => (
  <div className="card" {...props}>
    <h3>{title}</h3>
    {children}
  </div>
)

// Extensões específicas
const CandidatoCard = (props) => <Card title="Candidato" {...props} />
const ConcursoCard = (props) => <Card title="Concurso" {...props} />
```

#### Funções Puras e Utilitários
```typescript
// utils/cpfValidator.ts - Função pura
export const validateCPF = (cpf: string): boolean => {
  const numbers = cpf.replace(/\D/g, '');
  if (numbers.length !== 11) return false;
  
  // Algoritmo de validação sem efeitos colaterais
  return calculateCheckDigits(numbers);
}

// utils/listIntersection.ts - Função pura
export const hasIntersection = (list1: string[], list2: string[]): boolean => {
  const normalized1 = list1.map(normalizeString);
  const normalized2 = list2.map(normalizeString);
  return normalized1.some(item => normalized2.includes(item));
}
```

### 2. Padrão React Moderno (20 pontos)

#### Hooks Avançados
```typescript
// hooks/useSearch.ts
export const useSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchByCPF = useCallback(async (cpf: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const candidate = findCandidateByCPF(cpf);
      if (!candidate) {
        setError('CPF não encontrado');
        return;
      }
      
      const compatibleConcursos = findCompatibleConcursos(candidate);
      setResults(compatibleConcursos);
    } catch (err) {
      setError('Erro na busca');
    } finally {
      setLoading(false);
    }
  }, []);

  return { results, loading, error, searchByCPF };
}
```

#### TypeScript Rigoroso
```typescript
// types/index.ts
export interface Candidato {
  nome: string;
  dataNascimento: string;
  cpf: string;
  profissoes: string[];
}

export interface Concurso {
  orgao: string;
  edital: string;
  codigo: string;
  vagas: string[];
}

export interface SearchResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

// Componente com props tipadas
interface CandidatoCardProps {
  candidato: Candidato;
  onSelect?: (candidato: Candidato) => void;
  className?: string;
}

export const CandidatoCard: React.FC<CandidatoCardProps> = ({
  candidato,
  onSelect,
  className
}) => {
  // implementação
}
```

### 3. Arquitetura de Serviços (30 pontos)

#### Hooks como Camada de Serviço
```typescript
// hooks/useAccessibility.ts
export const useAccessibility = () => {
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [highContrast, setHighContrast] = useState(false);

  const changeFontSize = useCallback((size: typeof fontSize) => {
    setFontSize(size);
    document.documentElement.setAttribute('data-font-size', size);
  }, []);

  const toggleHighContrast = useCallback(() => {
    setHighContrast(prev => {
      const newValue = !prev;
      document.documentElement.setAttribute('data-high-contrast', String(newValue));
      return newValue;
    });
  }, []);

  const announceToScreenReader = useCallback((message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.setAttribute('class', 'sr-only');
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  }, []);

  return {
    fontSize,
    highContrast,
    changeFontSize,
    toggleHighContrast,
    announceToScreenReader
  };
}
```

#### Separação de Responsabilidades
```typescript
// Camada de dados
const dataService = {
  getCandidatos: () => mockData.candidatos,
  getConcursos: () => mockData.concursos,
  findByCPF: (cpf: string) => mockData.candidatos.find(c => c.cpf === cpf)
}

// Camada de lógica de negócio
const businessLogic = {
  findCompatibleConcursos: (candidate: Candidato) => {
    return dataService.getConcursos().filter(concurso =>
      hasIntersection(candidate.profissoes, concurso.vagas)
    );
  }
}

// Camada de apresentação (hooks)
const useSearchService = () => {
  const searchByCPF = async (cpf: string) => {
    const candidate = dataService.findByCPF(cpf);
    return candidate ? businessLogic.findCompatibleConcursos(candidate) : [];
  }
  
  return { searchByCPF };
}
```

### 4. Estratégia de Testes (30 pontos)

#### Testes Unitários - Vitest
```typescript
// src/utils/__tests__/cpfValidator.test.ts
import { describe, it, expect } from 'vitest';
import { validateCPF, formatCPF } from '../cpfValidator';

describe('CPF Validator', () => {
  describe('validateCPF', () => {
    it('should validate correct CPF from challenge', () => {
      expect(validateCPF('182.845.084-34')).toBe(true);
      expect(validateCPF('311.667.973-47')).toBe(true);
      expect(validateCPF('565.512.353-92')).toBe(true);
    });

    it('should reject invalid CPF', () => {
      expect(validateCPF('123.456.789-00')).toBe(false);
      expect(validateCPF('111.111.111-11')).toBe(false);
    });

    it('should handle different formats', () => {
      expect(validateCPF('18284508434')).toBe(true);
      expect(validateCPF('182 845 084 34')).toBe(true);
    });
  });
});
```

#### Testes E2E - Playwright
```typescript
// e2e/buscar-candidatos.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Buscar Candidatos', () => {
  test('should find candidates by valid code', async ({ page }) => {
    await page.goto('/buscar-candidatos');
    
    // Preencher formulário
    await page.fill('input[name="codigo"]', '61828450843');
    await page.click('button[type="submit"]');
    
    // Verificar resultados
    await expect(page.locator('[data-testid="candidato-card"]')).toBeVisible();
    await expect(page.locator('text=Jackie Dawson')).toBeVisible();
  });

  test('should show error for invalid code', async ({ page }) => {
    await page.goto('/buscar-candidatos');
    
    await page.fill('input[name="codigo"]', '99999999999');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('text=Nenhum candidato encontrado')).toBeVisible();
  });
});
```

### 5. Containerização Docker (5 pontos)

#### Dockerfile Multi-stage
```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage  
FROM nginx:alpine

# Copiar build
COPY --from=builder /app/dist /usr/share/nginx/html

# Configuração nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Porta
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### Configuração Nginx
```nginx
# nginx.conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

### 6. CI/CD com GitHub Actions (10 pontos)

#### Pipeline de CI
```yaml
# .github/workflows/ci.yml
name: CI Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20]
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    - name: Run unit tests
      run: npm run test:coverage
    
    - name: Run E2E tests
      run: npm run test:e2e
    
    - name: SonarCloud Scan
      uses: SonarSource/sonarcloud-github-action@master
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

### 7. Progressive Web App (5 pontos)

#### Service Worker
```javascript
// public/sw.js
const CACHE_NAME = 'concursos-leds-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

// Install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Fetch
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
```

#### PWA Hook
```typescript
// hooks/usePWA.ts
export const usePWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
    
    setDeferredPrompt(null);
  };

  return { isInstallable, installApp };
};
```

### 8. Design System e Responsividade (35 pontos)

#### Tokens Semânticos
```css
/* src/index.css */
:root {
  /* Cores LEDS IFES em HSL */
  --primary: 142 76% 36%;
  --primary-foreground: 0 0% 98%;
  
  /* Sistema de espaçamento */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Typography scale */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  
  /* Touch targets */
  --touch-target: 44px;
  
  /* Animations */
  --transition-fast: 150ms ease;
  --transition-normal: 300ms ease;
  --transition-slow: 500ms ease;
}
```

#### Breakpoints Responsivos
```typescript
// hooks/useBreakpoint.ts
export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState('xs');

  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      
      if (width < 640) setBreakpoint('xs');
      else if (width < 768) setBreakpoint('sm');
      else if (width < 1024) setBreakpoint('md');
      else if (width < 1280) setBreakpoint('lg');
      else if (width < 1536) setBreakpoint('xl');
      else setBreakpoint('2xl');
    };

    checkBreakpoint();
    window.addEventListener('resize', checkBreakpoint);
    
    return () => window.removeEventListener('resize', checkBreakpoint);
  }, []);

  return {
    breakpoint,
    isMobile: breakpoint === 'xs' || breakpoint === 'sm',
    isTablet: breakpoint === 'md',
    isDesktop: breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl'
  };
};
```

### 9. Acessibilidade WCAG 2.1 AA (20 pontos)

#### Controles de Acessibilidade
```typescript
// components/AccessibilityControls.tsx
export const AccessibilityControls = () => {
  const {
    fontSize,
    highContrast,
    changeFontSize,
    toggleHighContrast
  } = useAccessibility();

  return (
    <div
      className="fixed top-4 right-4 bg-card p-4 rounded-lg shadow-lg"
      role="toolbar"
      aria-label="Controles de acessibilidade"
    >
      <div className="space-y-2">
        <label htmlFor="font-size" className="block text-sm font-medium">
          Tamanho da fonte
        </label>
        <div className="flex gap-2" role="group" aria-labelledby="font-size">
          <Button
            size="sm"
            variant={fontSize === 'small' ? 'default' : 'outline'}
            onClick={() => changeFontSize('small')}
            aria-pressed={fontSize === 'small'}
          >
            A-
          </Button>
          <Button
            size="sm"
            variant={fontSize === 'medium' ? 'default' : 'outline'}
            onClick={() => changeFontSize('medium')}
            aria-pressed={fontSize === 'medium'}
          >
            A
          </Button>
          <Button
            size="sm"
            variant={fontSize === 'large' ? 'default' : 'outline'}
            onClick={() => changeFontSize('large')}
            aria-pressed={fontSize === 'large'}
          >
            A+
          </Button>
        </div>
      </div>

      <Button
        onClick={toggleHighContrast}
        variant={highContrast ? 'default' : 'outline'}
        aria-pressed={highContrast}
        aria-label="Alternar alto contraste"
      >
        Alto Contraste
      </Button>
    </div>
  );
};
```

#### ARIA e Semântica
```typescript
// Exemplo de componente acessível
export const SearchForm = ({ onSubmit }: SearchFormProps) => {
  const [cpf, setCpf] = useState('');
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="Buscar concursos por CPF"
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="cpf-input">
            CPF *
          </Label>
          <Input
            id="cpf-input"
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="000.000.000-00"
            aria-required="true"
            aria-invalid={!!error}
            aria-describedby={error ? "cpf-error" : undefined}
          />
          {error && (
            <div
              id="cpf-error"
              role="alert"
              aria-live="polite"
              className="text-destructive text-sm mt-1"
            >
              {error}
            </div>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          aria-label="Buscar concursos compatíveis"
        >
          Buscar Concursos
        </Button>
      </div>
    </form>
  );
};
```

## 🔧 Ferramentas de Desenvolvimento

### Configuração de Qualidade
```json
// .eslintrc.json
{
  "extends": [
    "@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  "rules": {
    "react-hooks/exhaustive-deps": "error",
    "jsx-a11y/no-autofocus": "error",
    "@typescript-eslint/no-unused-vars": "error"
  }
}
```

### Configuração de Testes
```typescript
// vitest.config.ts
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.test.{ts,tsx}', 'src/components/ui/**']
    }
  }
});
```

## 📊 Métricas e Monitoramento

### SonarQube Configuration
```properties
# sonar-project.properties
sonar.projectKey=leds-ifes-concurso-system
sonar.organization=leds-ifes

sonar.sources=src
sonar.tests=src
sonar.test.inclusions=**/*.test.ts,**/*.test.tsx,e2e/**/*.spec.ts
sonar.coverage.exclusions=src/components/ui/**,**/*.config.ts

sonar.javascript.lcov.reportPaths=coverage/lcov.info
sonar.typescript.lcov.reportPaths=coverage/lcov.info
```

Esta implementação técnica demonstra como cada aspecto do projeto foi cuidadosamente planejado e executado para atingir os mais altos padrões de qualidade e funcionalidade.