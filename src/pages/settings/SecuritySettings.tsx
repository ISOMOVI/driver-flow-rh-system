
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SecuritySettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Alterar Senha</CardTitle>
          <CardDescription>
            Atualize sua senha para manter sua conta segura.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Senha Atual</label>
            <input 
              type="password" 
              className="w-full border-gray-300 rounded-md shadow-sm p-2" 
              placeholder="••••••••" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Nova Senha</label>
            <input 
              type="password" 
              className="w-full border-gray-300 rounded-md shadow-sm p-2" 
              placeholder="••••••••" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Confirmar Nova Senha</label>
            <input 
              type="password" 
              className="w-full border-gray-300 rounded-md shadow-sm p-2" 
              placeholder="••••••••" 
            />
          </div>
          <Button className="mt-4">Atualizar Senha</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Autenticação de Dois Fatores</CardTitle>
          <CardDescription>
            Adicione uma camada extra de segurança à sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Autenticação por SMS</h4>
              <p className="text-sm text-muted-foreground">
                Receba um código por SMS quando fizer login.
              </p>
            </div>
            <Button variant="outline">Configurar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySettings;
