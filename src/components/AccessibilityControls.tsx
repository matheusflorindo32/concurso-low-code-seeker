import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAccessibility } from '@/hooks/useAccessibility';

/**
 * Componente de controles de acessibilidade
 */
export const AccessibilityControls = () => {
  const { 
    fontSize, 
    changeFontSize, 
    toggleHighContrast, 
    prefersHighContrast,
    announceToScreenReader 
  } = useAccessibility();

  const handleFontSizeChange = (size: 'small' | 'medium' | 'large') => {
    changeFontSize(size);
    announceToScreenReader(`Tamanho da fonte alterado para ${size === 'small' ? 'pequeno' : size === 'large' ? 'grande' : 'médio'}`);
  };

  const handleContrastToggle = () => {
    toggleHighContrast();
    announceToScreenReader(`Alto contraste ${!prefersHighContrast ? 'ativado' : 'desativado'}`);
  };

  return (
    <div 
      className="fixed top-4 right-4 z-50 bg-card border rounded-lg p-3 shadow-lg print-hidden"
      role="toolbar"
      aria-label="Controles de acessibilidade"
    >
      <div className="flex flex-col gap-2">
        <div className="text-xs font-medium text-muted-foreground mb-1">
          Acessibilidade
        </div>
        
        {/* Controle de tamanho de fonte */}
        <div className="flex gap-1" role="group" aria-label="Tamanho da fonte">
          <Button
            size="sm"
            variant={fontSize === 'small' ? 'default' : 'outline'}
            onClick={() => handleFontSizeChange('small')}
            className="text-xs h-8 px-2"
            aria-label="Fonte pequena"
            aria-pressed={fontSize === 'small'}
          >
            A-
          </Button>
          <Button
            size="sm"
            variant={fontSize === 'medium' ? 'default' : 'outline'}
            onClick={() => handleFontSizeChange('medium')}
            className="text-sm h-8 px-2"
            aria-label="Fonte média"
            aria-pressed={fontSize === 'medium'}
          >
            A
          </Button>
          <Button
            size="sm"
            variant={fontSize === 'large' ? 'default' : 'outline'}
            onClick={() => handleFontSizeChange('large')}
            className="text-base h-8 px-2"
            aria-label="Fonte grande"
            aria-pressed={fontSize === 'large'}
          >
            A+
          </Button>
        </div>

        {/* Controle de alto contraste */}
        <Button
          size="sm"
          variant={prefersHighContrast ? 'default' : 'outline'}
          onClick={handleContrastToggle}
          className="text-xs h-8"
          aria-label={`${prefersHighContrast ? 'Desativar' : 'Ativar'} alto contraste`}
          aria-pressed={prefersHighContrast}
        >
          {prefersHighContrast ? '◐' : '○'} Contraste
        </Button>
      </div>
    </div>
  );
};

/**
 * Componente de link para pular navegação
 */
export const SkipToMain = () => {
  return (
    <a 
      href="#main-content" 
      className="skip-link focus:skip-link:not-sr-only"
      onFocus={(e) => {
        // Garante que o link seja visível quando focado
        e.currentTarget.classList.remove('sr-only');
      }}
      onBlur={(e) => {
        // Esconde novamente quando perde o foco
        e.currentTarget.classList.add('sr-only');
      }}
    >
      Pular para o conteúdo principal
    </a>
  );
};

/**
 * Componente de breadcrumb acessível
 */
interface BreadcrumbProps {
  items: Array<{
    label: string;
    href?: string;
    current?: boolean;
  }>;
}

export const AccessibleBreadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav aria-label="Navegação estrutural" className="mb-4">
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
        <li>
          <a 
            href="/" 
            className="hover:text-foreground transition-colors focus-ring"
            aria-label="Voltar para página inicial"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Página inicial</span>
          </a>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <ArrowLeft className="h-3 w-3 rotate-180" aria-hidden="true" />
            {item.href && !item.current ? (
              <a 
                href={item.href}
                className="hover:text-foreground transition-colors focus-ring"
                aria-current={item.current ? 'page' : undefined}
              >
                {item.label}
              </a>
            ) : (
              <span 
                className={item.current ? 'text-foreground font-medium' : ''}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};