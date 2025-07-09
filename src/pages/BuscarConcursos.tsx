import { useState } from 'react';
import { ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SearchForm } from '@/components/SearchForm';
import { ConcursoCard } from '@/components/ConcursoCard';
import { useSearch } from '@/hooks/useSearch';
import { Concurso } from '@/types';

/**
 * Página para buscar concursos compatíveis por CPF
 */
const BuscarConcursos = () => {
  const { loading, error, buscarConcursosPorCPF } = useSearch();
  const [results, setResults] = useState<Concurso[]>([]);
  const [searched, setSearched] = useState(false);
  const [message, setMessage] = useState<string>('');

  const handleSearch = async (cpf: string) => {
    setSearched(true);
    const result = await buscarConcursosPorCPF(cpf);
    setResults(result.data);
    setMessage(result.message || '');
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Dashboard
            </Button>
          </Link>
          
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              Buscar Concursos por CPF
            </h1>
            <p className="text-muted-foreground">
              Digite o CPF para encontrar concursos compatíveis com o perfil do candidato
            </p>
          </div>
        </div>

        {/* Search Form */}
        <div className="flex justify-center">
          <SearchForm
            type="cpf"
            onSearch={handleSearch}
            loading={loading}
          />
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Results */}
        {searched && !loading && (
          <div className="space-y-4">
            {results.length > 0 ? (
              <>
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Encontrados {results.length} concurso(s) compatível(eis) com o perfil do candidato.
                  </AlertDescription>
                </Alert>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {results.map((concurso, index) => (
                    <ConcursoCard key={index} concurso={concurso} />
                  ))}
                </div>
              </>
            ) : (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {message || 'Nenhum concurso encontrado.'}
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuscarConcursos;