import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { maskCPF } from '@/utils/cpfValidator';

interface SearchFormProps {
  type: 'cpf' | 'codigo';
  onSearch: (value: string) => void;
  loading: boolean;
  placeholder?: string;
  label?: string;
}

/**
 * Componente de formulário reutilizável para buscas
 */
export const SearchForm = ({ 
  type, 
  onSearch, 
  loading, 
  placeholder,
  label 
}: SearchFormProps) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    
    // Aplica máscara para CPF
    if (type === 'cpf') {
      inputValue = maskCPF(inputValue);
    }
    
    setValue(inputValue);
  };

  const defaultPlaceholder = type === 'cpf' 
    ? 'Digite o CPF (000.000.000-00)' 
    : 'Digite o código do concurso';

  const defaultLabel = type === 'cpf' 
    ? 'CPF do Candidato' 
    : 'Código do Concurso';

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div className="space-y-2">
        <Label htmlFor={type} className="text-sm font-medium">
          {label || defaultLabel}
        </Label>
        <Input
          id={type}
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder || defaultPlaceholder}
          maxLength={type === 'cpf' ? 14 : undefined}
          disabled={loading}
          className="w-full"
        />
      </div>
      
      <Button 
        type="submit" 
        disabled={loading || !value.trim()}
        className="w-full"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Buscando...
          </>
        ) : (
          <>
            <Search className="mr-2 h-4 w-4" />
            Buscar
          </>
        )}
      </Button>
    </form>
  );
};