import { User, Calendar, CreditCard, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Candidato } from '@/types';

interface CandidatoCardProps {
  candidato: Candidato;
}

/**
 * Componente para exibir informações de um candidato
 */
export const CandidatoCard = ({ candidato }: CandidatoCardProps) => {
  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <User className="h-5 w-5 text-primary" />
          {candidato.nome}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Data de Nascimento: {candidato.dataNascimento}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CreditCard className="h-4 w-4" />
          <span>CPF: {candidato.cpf}</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Briefcase className="h-4 w-4" />
            <span>Profissões:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {candidato.profissoes.map((profissao, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {profissao}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};