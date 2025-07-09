# Guia de Deployment

## 🚀 Instalação Local

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Docker (opcional)

### Setup do Projeto
```bash
# Clone o repositório
git clone [URL_DO_REPOSITORIO]

# Entre na pasta
cd concurso-low-code-seeker

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev
```

### Build para Produção
```bash
npm run build
```

## 🐳 Docker Deployment

### Build da Imagem
```bash
# Construir a imagem Docker
docker build -t concurso-leds-ifes .
```

### Executar Container
```bash
# Executar em modo desenvolvimento
docker run -p 8080:80 concurso-leds-ifes

# Executar em background
docker run -d -p 8080:80 --name concurso-app concurso-leds-ifes
```

### Comandos Úteis
```bash
# Ver containers rodando
docker ps

# Parar container
docker stop concurso-app

# Remover container
docker rm concurso-app

# Ver logs
docker logs concurso-app
```

A aplicação estará disponível em `http://localhost:8080`

## 🔄 CI/CD Pipeline

Este projeto utiliza **GitHub Actions** para automação completa do pipeline de desenvolvimento:

### Continuous Integration (CI)
- ✅ **Testes automatizados**: Execução de todos os testes unitários
- ✅ **Testes E2E**: Validação de fluxos completos com Playwright
- ✅ **Build verification**: Verificação da compilação da aplicação
- ✅ **Docker build**: Construção e teste da imagem Docker
- ✅ **Code coverage**: Análise de cobertura de testes
- ✅ **Quality gates**: Verificações de qualidade do código
- ✅ **SonarQube analysis**: Análise automática de qualidade

### Continuous Deployment (CD)
- 🚀 **Deploy automático**: Deploy para staging/produção
- 📦 **Container registry**: Publicação no GitHub Container Registry
- 🏷️ **Versionamento**: Tags automáticas baseadas em semver
- 📊 **Deployment summary**: Relatórios detalhados de deploy

### Como Usar
```bash
# Para triggar CI: faça push para main ou abra PR
git push origin main

# Para deploy em produção: crie uma tag
git tag v1.0.0
git push origin v1.0.0
```

## 🌐 Ambientes

### Development
- URL: `http://localhost:3000`
- Hot reload habilitado
- Source maps disponíveis

### Staging
- Deploy automático via CI/CD no push para `main`
- Ambiente de testes

### Production
- Deploy automático via CI/CD em tags `v*`
- Otimização completa
- Monitoramento ativo