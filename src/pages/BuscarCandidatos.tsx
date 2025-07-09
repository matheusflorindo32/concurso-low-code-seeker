import { useState } from 'react';
import { ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SearchForm } from '@/components/SearchForm';
import { CandidatoCard } from '@/components/CandidatoCard';
import { useSearch } from '@/hooks/useSearch';
import { Candidato } from '@/types';

/**
 * Página para buscar candidatos compatíveis por código do concurso
 */
const BuscarCandidatos = () => {
  const { loading, error, buscarCandidatosPorCodigo } = useSearch();
  const [results, setResults] = useState<Candidato[]>([]);
  const [searched, setSearched] = useState(false);
  const [message, setMessage] = useState<string>('');

  const handleSearch = async (codigo: string) => {
    setSearched(true);
    const result = await buscarCandidatosPorCodigo(codigo);
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
              Buscar Candidatos por Código
            </h1>
            <p className="text-muted-foreground">
              Digite o código do concurso para encontrar candidatos compatíveis
            </p>
          </div>
        </div>

        {/* Search Form */}
        <div className="flex justify-center">
          <SearchForm
            type="codigo"
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
                    Encontrados {results.length} candidato(s) compatível(eis) com o concurso.
                  </AlertDescription>
                </Alert>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {results.map((candidato, index) => (
                    <CandidatoCard key={index} candidato={candidato} />
                  ))}
                </div>
              </>
            ) : (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {message || 'Nenhum candidato encontrado.'}
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuscarCandidatos;