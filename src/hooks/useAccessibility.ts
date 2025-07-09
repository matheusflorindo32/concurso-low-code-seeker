import { useState, useEffect } from 'react';

/**
 * Hook para detectar preferências de acessibilidade do usuário
 */
export const useAccessibility = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [prefersHighContrast, setPrefersHighContrast] = useState(false);
  const [prefersDarkMode, setPrefersDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState('medium');

  useEffect(() => {
    // Detectar preferência por movimento reduzido
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    motionQuery.addEventListener('change', handleMotionChange);

    // Detectar preferência por alto contraste
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');
    setPrefersHighContrast(contrastQuery.matches);
    
    const handleContrastChange = (e: MediaQueryListEvent) => {
      setPrefersHighContrast(e.matches);
    };
    contrastQuery.addEventListener('change', handleContrastChange);

    // Detectar preferência por modo escuro
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setPrefersDarkMode(darkModeQuery.matches);
    
    const handleDarkModeChange = (e: MediaQueryListEvent) => {
      setPrefersDarkMode(e.matches);
    };
    darkModeQuery.addEventListener('change', handleDarkModeChange);

    // Detectar tamanho de fonte preferido (simulado)
    const storedFontSize = localStorage.getItem('preferred-font-size') || 'medium';
    setFontSize(storedFontSize);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      contrastQuery.removeEventListener('change', handleContrastChange);
      darkModeQuery.removeEventListener('change', handleDarkModeChange);
    };
  }, []);

  /**
   * Altera o tamanho da fonte
   */
  const changeFontSize = (size: 'small' | 'medium' | 'large') => {
    setFontSize(size);
    localStorage.setItem('preferred-font-size', size);
    
    // Aplicar mudanças no documento
    const root = document.documentElement;
    switch (size) {
      case 'small':
        root.style.fontSize = '14px';
        break;
      case 'large':
        root.style.fontSize = '18px';
        break;
      default:
        root.style.fontSize = '16px';
    }
  };

  /**
   * Força alto contraste
   */
  const toggleHighContrast = () => {
    const newValue = !prefersHighContrast;
    setPrefersHighContrast(newValue);
    
    if (newValue) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };

  /**
   * Gera ID único para acessibilidade
   */
  const generateId = (prefix: string = 'id') => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  };

  /**
   * Anuncia mensagem para screen readers
   */
  const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  return {
    // Preferências detectadas
    prefersReducedMotion,
    prefersHighContrast,
    prefersDarkMode,
    fontSize,
    
    // Controles
    changeFontSize,
    toggleHighContrast,
    
    // Utilidades
    generateId,
    announceToScreenReader,
    
    // Classes condicionais
    getAnimationClass: (baseClass: string) => 
      prefersReducedMotion ? '' : baseClass,
    
    getMotionSafeClass: (baseClass: string) => 
      `${baseClass} ${prefersReducedMotion ? '' : 'motion-safe:' + baseClass}`
  };
};