import { RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePWA } from '@/hooks/usePWA';
import { useState } from 'react';

/**
 * Componente para notificação de atualização da PWA
 */
export const PWAUpdateNotification = () => {
  const { isUpdateAvailable, updateSW } = usePWA();
  const [isDismissed, setIsDismissed] = useState(false);

  if (!isUpdateAvailable || isDismissed) {
    return null;
  }

  const handleUpdate = () => {
    updateSW();
  };

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  return (
    <Card className="fixed top-4 left-4 right-4 md:left-auto md:w-96 z-50 shadow-lg border-green-200 bg-green-50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-green-600" />
            <CardTitle className="text-lg text-green-800">
              Atualização Disponível
            </CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="h-6 w-6 p-0 text-green-600 hover:text-green-800"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription className="text-green-700">
          Uma nova versão do app está disponível
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex gap-2">
          <Button 
            onClick={handleUpdate} 
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Atualizar
          </Button>
          <Button variant="outline" onClick={handleDismiss}>
            Depois
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};