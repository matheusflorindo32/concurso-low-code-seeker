# Arquitetura do Sistema

## 🏗️ Estrutura de Pastas

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base (shadcn)
│   ├── CandidatoCard.tsx
│   ├── ConcursoCard.tsx
│   └── SearchForm.tsx
├── pages/              # Páginas da aplicação
│   ├── Index.tsx       # Dashboard principal
│   ├── BuscarConcursos.tsx
│   └── BuscarCandidatos.tsx
├── data/               # Dados mockados
│   └── mockData.ts
├── types/              # Tipos TypeScript
│   └── index.ts
├── utils/              # Utilitários
│   ├── cpfValidator.ts
│   └── listIntersection.ts
└── hooks/              # Hooks personalizados
    └── useSearch.ts
```

## 📄 Componentes Principais

### 🏠 Dashboard (`/`)
- Página inicial com navegação para as duas funcionalidades
- Design responsivo com cards informativos
- Tema visual LEDS IFES (verde institucional)

### 🔍 Busca por CPF (`/buscar-concursos`)
- Formulário com validação e máscara de CPF
- Busca concursos compatíveis com as profissões do candidato
- Exibe resultados em cards organizados

### 👥 Busca por Código (`/buscar-candidatos`)
- Formulário para inserção do código do concurso
- Busca candidatos com profissões compatíveis
- Exibe resultados com informações completas

## 🔧 Algoritmos e Validações

### Validação de CPF
- Algoritmo oficial brasileiro de validação
- Formatação automática com máscara
- Verificação de dígitos verificadores

### Interseção de Listas
- Comparação normalizada de profissões e vagas
- Remove acentos e diferenças de case
- Retorna compatibilidade booleana

### Busca Inteligente
- Localização eficiente por CPF e código
- Filtros baseados em interseção de competências
- Tratamento de casos não encontrados

## 🎨 Design System

### Tema LEDS IFES
- **Cor primária**: Verde institucional (#22c55e)
- **Tipografia**: Fonte system padrão, hierarquia clara
- **Ícones**: Lucide React (Search, Users, FileText, etc.)
- **Layout**: Cards com sombras, bordas arredondadas
- **Animações**: Transições suaves hover states

### Responsividade
- Mobile-first design
- Grid adaptativo
- Componentes flexíveis
- Navegação otimizada para touch

## 📊 Dados do Sistema

### Candidatos
| Nome | Data de Nascimento | CPF | Profissões |
|------|-------------------|-----|------------|
| Lindsey Craft | 19/05/1976 | 182.845.084-34 | [carpinteiro] |
| Jackie Dawson | 14/08/1970 | 311.667.973-47 | [marceneiro, assistente administrativo] |
| Cory Mendoza | 11/02/1957 | 565.512.353-92 | [carpinteiro, marceneiro] |

### Concursos
| Órgão | Edital | Código | Vagas |
|-------|--------|--------|-------|
| SEDU | 9/2016 | 61828450843 | [analista de sistemas, marceneiro] |
| SEJUS | 15/2017 | 61828450843 | [carpinteiro, professor de matemática, assistente administrativo] |
| SEJUS | 17/2017 | 95655123539 | [professor de matemática] |