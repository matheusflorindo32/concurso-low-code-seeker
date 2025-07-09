import { WifiOff, Wifi } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';
import { useEffect, useState } from 'react';

/**
 * Componente indicador de status offline/online
 */
export const OfflineIndicator = () => {
  const { isOffline } = usePWA();
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  useEffect(() => {
    if (isOffline) {
      setShowOfflineMessage(true);
    } else {
      // Mostrar brevemente que voltou online
      const timer = setTimeout(() => {
        setShowOfflineMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOffline]);

  if (!showOfflineMessage) {
    return null;
  }

  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ${
      isOffline 
        ? 'bg-red-500 text-white' 
        : 'bg-green-500 text-white'
    }`}>
      <div className="flex items-center gap-2">
        {isOffline ? (
          <WifiOff className="h-4 w-4" />
        ) : (
          <Wifi className="h-4 w-4" />
        )}
        <span className="text-sm font-medium">
          {isOffline ? 'Modo offline - funcionalidades limitadas' : 'Conexão restaurada'}
        </span>
      </div>
    </div>
  );
};