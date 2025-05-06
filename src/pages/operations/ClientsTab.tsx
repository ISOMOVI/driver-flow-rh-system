
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockClients, mockDrivers } from '@/services/mockData';

const ClientsTab = () => {
  // Count active clients
  const activeClients = mockClients.filter(client => client.active).length;
  
  // Count clients with drivers assigned
  const clientsWithDrivers = mockClients.filter(client => client.drivers.length > 0).length;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Gerenciamento de Clientes</h2>
        <Button>Novo Cliente</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockClients.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeClients}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Clientes com Entregadores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientsWithDrivers}</div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome da Empresa</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Entregadores</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.contactName}</TableCell>
                <TableCell>{client.contactEmail}</TableCell>
                <TableCell>{client.contactPhone}</TableCell>
                <TableCell>
                  <Badge variant={client.active ? 'default' : 'outline'}>
                    {client.active ? 'Ativo' : 'Inativo'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {client.drivers.length > 0 ? 
                    `${client.drivers.length} entregador(es)` : 
                    'Sem entregadores'}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">Ver</Button>
                    <Button size="sm" variant="outline">Editar</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ClientsTab;
