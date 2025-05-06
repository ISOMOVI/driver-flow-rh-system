
import React from 'react';
import { MainLayout } from '@/components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Messages = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Mensagens</h1>
          <p className="text-muted-foreground">
            Central de mensagens e comunicação com entregadores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Canal 1 - Recrutamento</CardTitle>
              <CardDescription>
                Comunicação com candidatos em processo de recrutamento.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 rounded-lg p-4 h-80 overflow-auto">
                <p className="text-center text-gray-500">Interface de WhatsApp será implementada aqui</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Canal 2 - Operacional</CardTitle>
              <CardDescription>
                Comunicação com entregadores ativos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 rounded-lg p-4 h-80 overflow-auto">
                <p className="text-center text-gray-500">Interface de WhatsApp será implementada aqui</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Messages;
