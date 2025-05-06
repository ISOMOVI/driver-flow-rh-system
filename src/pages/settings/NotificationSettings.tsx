
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

const NotificationSettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Preferências de Notificações</CardTitle>
          <CardDescription>
            Escolha quais notificações deseja receber e como prefere recebê-las.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Notificações por Email</h4>
                <p className="text-sm text-muted-foreground">
                  Receba atualizações e relatórios diários por email.
                </p>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Notificações do Sistema</h4>
                <p className="text-sm text-muted-foreground">
                  Receba alertas sobre atividades importantes no sistema.
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Lembretes de Tarefas</h4>
                <p className="text-sm text-muted-foreground">
                  Seja notificado sobre tarefas pendentes e prazos.
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Alertas de Segurança</h4>
                <p className="text-sm text-muted-foreground">
                  Receba alertas sobre atividades suspeitas na sua conta.
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSettings;
