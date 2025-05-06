
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ProfileSettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações Pessoais</CardTitle>
          <CardDescription>
            Atualize suas informações pessoais e detalhes de contato.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome</label>
              <input 
                type="text" 
                className="w-full border-gray-300 rounded-md shadow-sm p-2" 
                placeholder="Seu nome" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Sobrenome</label>
              <input 
                type="text" 
                className="w-full border-gray-300 rounded-md shadow-sm p-2" 
                placeholder="Seu sobrenome" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input 
                type="email" 
                className="w-full border-gray-300 rounded-md shadow-sm p-2" 
                placeholder="seu.email@exemplo.com" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Telefone</label>
              <input 
                type="tel" 
                className="w-full border-gray-300 rounded-md shadow-sm p-2" 
                placeholder="(00) 00000-0000" 
              />
            </div>
          </div>
          <Button className="mt-4">Salvar Alterações</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettings;
