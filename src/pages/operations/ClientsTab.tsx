
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockClients, mockDrivers } from '@/services/mockData';
import { AddClientModal } from '@/components/operations/AddClientModal';

const ClientsTab = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  
  // Count active clients
  const activeClients = mockClients.filter(client => client.active).length;
  
  // Count clients with drivers assigned
  const clientsWithDrivers = mockClients.filter(client => client.drivers.length > 0).length;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Gerenciamento de Clientes</h2>
        <Button 
          onClick={() => setAddModalOpen(true)}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md"
        >
          Novo Cliente
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-indigo-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-700">{mockClients.length}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-green-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeClients}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-purple-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Clientes com Entregadores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{clientsWithDrivers}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
            <TableRow>
              <TableHead className="font-semibold text-indigo-900">Nome da Empresa</TableHead>
              <TableHead className="font-semibold text-indigo-900">Contato</TableHead>
              <TableHead className="font-semibold text-indigo-900">Email</TableHead>
              <TableHead className="font-semibold text-indigo-900">Telefone</TableHead>
              <TableHead className="font-semibold text-indigo-900">Status</TableHead>
              <TableHead className="font-semibold text-indigo-900">Entregadores</TableHead>
              <TableHead className="font-semibold text-indigo-900">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockClients.map((client) => (
              <TableRow key={client.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.contactName}</TableCell>
                <TableCell>{client.contactEmail}</TableCell>
                <TableCell>{client.contactPhone}</TableCell>
                <TableCell>
                  <Badge variant={client.active ? 'default' : 'outline'} className={client.active ? 'bg-green-100 text-green-800 hover:bg-green-200' : ''}>
                    {client.active ? 'Ativo' : 'Inativo'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {client.drivers.length > 0 ? 
                    <span className="font-medium text-indigo-600">{client.drivers.length} entregador(es)</span> : 
                    <span className="text-gray-500">Sem entregadores</span>}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">Ver</Button>
                    <Button size="sm" variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">Editar</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <AddClientModal 
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
      />
    </div>
  );
};

export default ClientsTab;
