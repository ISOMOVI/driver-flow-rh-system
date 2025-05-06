
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const IntegrationSettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Integrações de API</CardTitle>
          <CardDescription>
            Gerencie as conexões com sistemas externos e APIs.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between border-b pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">WhatsApp Business API</h4>
                <Badge>Ativo</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Conectado com dois canais: Recrutamento e Operacional
              </p>
            </div>
            <Button variant="outline">Configurar</Button>
          </div>

          <div className="flex items-center justify-between border-b pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">Sistema de Pagamentos</h4>
                <Badge variant="outline">Não configurado</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Integração com gateway de pagamento para processamento automático
              </p>
            </div>
            <Button variant="outline">Conectar</Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">Google Maps API</h4>
                <Badge>Ativo</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Utilizado para validação de localização e cálculo de rotas
              </p>
            </div>
            <Button variant="outline">Configurar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationSettings;
