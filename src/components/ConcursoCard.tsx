import { Building, FileText, Hash, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Concurso } from '@/types';

interface ConcursoCardProps {
  concurso: Concurso;
}

/**
 * Componente para exibir informações de um concurso
 */
export const ConcursoCard = ({ concurso }: ConcursoCardProps) => {
  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Building className="h-5 w-5 text-primary" />
          {concurso.orgao}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileText className="h-4 w-4" />
          <span>Edital: {concurso.edital}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Hash className="h-4 w-4" />
          <span>Código: {concurso.codigo}</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Users className="h-4 w-4" />
            <span>Vagas disponíveis:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {concurso.vagas.map((vaga, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {vaga}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};