import { Search, Users, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

console.log('Index.tsx: Loading...');

/**
 * Dashboard principal do Sistema de Consulta de Concursos LEDS IFES
 */
const Index = () => {
  console.log('Index.tsx: Rendering Index component');
  
  try {

    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            <div className="text-center space-y-3 lg:space-y-4">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground max-w-4xl mx-auto">
                Sistema de Consulta de Concursos
              </h1>
              <h2 className="text-lg sm:text-xl md:text-2xl text-muted-foreground">
                LEDS IFES - Desafio Low/No Code
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Encontre concursos compatíveis com seu perfil ou candidatos adequados para vagas específicas
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid gap-6 lg:gap-8 max-w-5xl mx-auto grid-cols-1 md:grid-cols-2">
            
            {/* Card 1: Buscar Concursos por CPF */}
            <Card className="group border-2 transition-all duration-300 hover:shadow-lg hover:border-primary/20">
              <CardHeader className="text-center pb-4 lg:pb-6">
                <div className="mx-auto w-12 h-12 lg:w-16 lg:h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4 lg:mb-6 group-hover:bg-primary/20 transition-all duration-300">
                  <Search className="h-6 w-6 lg:h-8 lg:w-8 text-primary" />
                </div>
                <CardTitle className="text-lg sm:text-xl md:text-2xl">
                  Buscar Concursos por CPF
                </CardTitle>
                <CardDescription className="text-sm sm:text-base leading-relaxed">
                  Digite seu CPF para encontrar concursos públicos compatíveis com suas profissões
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link to="/buscar-concursos" className="inline-block w-full rounded-md">
                  <Button size="lg" className="w-full text-sm sm:text-base font-medium">
                    Buscar Concursos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <p className="text-xs lg:text-sm text-muted-foreground mt-3 lg:mt-4">
                  <strong>Resultado:</strong> Órgão, Edital e Código dos concursos
                </p>
              </CardContent>
            </Card>

            {/* Card 2: Buscar Candidatos por Código */}
            <Card className="group border-2 transition-all duration-300 hover:shadow-lg hover:border-primary/20">
              <CardHeader className="text-center pb-4 lg:pb-6">
                <div className="mx-auto w-12 h-12 lg:w-16 lg:h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4 lg:mb-6 group-hover:bg-primary/20 transition-all duration-300">
                  <Users className="h-6 w-6 lg:h-8 lg:w-8 text-primary" />
                </div>
                <CardTitle className="text-lg sm:text-xl md:text-2xl">
                  Buscar Candidatos por Código
                </CardTitle>
                <CardDescription className="text-sm sm:text-base leading-relaxed">
                  Digite o código do concurso para encontrar candidatos com perfil compatível
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link to="/buscar-candidatos" className="inline-block w-full rounded-md">
                  <Button size="lg" className="w-full text-sm sm:text-base font-medium">
                    Buscar Candidatos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <p className="text-xs lg:text-sm text-muted-foreground mt-3 lg:mt-4">
                  <strong>Resultado:</strong> Nome, Data de Nascimento e CPF
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Info Section */}
          <section className="mt-12 lg:mt-16 text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-full">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm sm:text-base text-muted-foreground">
                Sistema desenvolvido para o Desafio LEDS IFES
              </span>
            </div>
            
            <div className="grid gap-4 max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground grid-cols-1 sm:grid-cols-3">
              <div className="space-y-1">
                <p className="font-medium text-foreground">Candidatos</p>
                <p>3 perfis cadastrados</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-foreground">Concursos</p>
                <p>3 editais disponíveis</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-foreground">Profissões</p>
                <p>Múltiplas áreas</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  } catch (error) {
    console.error('Index.tsx: Error rendering Index component:', error);
    return <div>Error loading page: {error?.message}</div>;
  }
};

export default Index;
