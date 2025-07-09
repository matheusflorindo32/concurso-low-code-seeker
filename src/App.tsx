import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BuscarConcursos from "./pages/BuscarConcursos";
import BuscarCandidatos from "./pages/BuscarCandidatos";
import NotFound from "./pages/NotFound";
// import { PWAInstallPrompt } from "./components/PWAInstallPrompt";
// import { PWAUpdateNotification } from "./components/PWAUpdateNotification";
// import { OfflineIndicator } from "./components/OfflineIndicator";

console.log('App.tsx: Loading...');

const queryClient = new QueryClient();

const App = () => {
  console.log('App.tsx: Rendering App component');
  
  try {
    return (
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/buscar-concursos" element={<BuscarConcursos />} />
            <Route path="/buscar-candidatos" element={<BuscarCandidatos />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    );
  } catch (error) {
    console.error('App.tsx: Error rendering App component:', error);
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h1>Erro ao carregar a aplicação</h1>
        <p>Detalhes: {error?.message || 'Erro desconhecido'}</p>
        <p>Stack: {error?.stack}</p>
      </div>
    );
  }
};

export default App;
