
import React, { useState } from 'react';
import { MainLayout } from '@/components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, FileText, Users, BarChart4 } from 'lucide-react';
import { mockClients, mockDrivers } from '@/services/mockData';

const Companies = () => {
  const [activeTab, setActiveTab] = useState('clients');

  const activeClients = mockClients.filter(client => client.active);
  const inactiveClients = mockClients.filter(client => !client.active);
  
  const getDriversForClient = (clientId: string) => {
    return mockDrivers.filter(driver => driver.clientId === clientId);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Empresas</h1>
            <p className="text-muted-foreground">
              Gerencie empresas clientes, contratos e entregadores vinculados.
            </p>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Nova Empresa
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total de Empresas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockClients.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Empresas Ativas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeClients.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Entregadores Vinculados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockDrivers.filter(driver => driver.clientId).length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="clients">Empresas Ativas</TabsTrigger>
            <TabsTrigger value="inactive">Empresas Inativas</TabsTrigger>
            <TabsTrigger value="contracts">Contratos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="clients">
            <Card>
              <CardHeader>
                <CardTitle>Empresas Ativas</CardTitle>
                <CardDescription>
                  Gerencie empresas ativas e seus entregadores vinculados.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome da Empresa</TableHead>
                      <TableHead>Contato</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Telefone</TableHead>
                      <TableHead>Entregadores</TableHead>
                      <TableHead>Contrato</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeClients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell className="font-medium">{client.name}</TableCell>
                        <TableCell>{client.contactName}</TableCell>
                        <TableCell>{client.contactEmail}</TableCell>
                        <TableCell>{client.contactPhone}</TableCell>
                        <TableCell>
                          {getDriversForClient(client.id).length} entregadores
                        </TableCell>
                        <TableCell>
                          <Badge variant={client.contract?.signed ? 'default' : 'outline'}>
                            {client.contract?.signed ? 'Assinado' : 'Pendente'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Users className="h-4 w-4 mr-1" /> Entregadores
                            </Button>
                            <Button size="sm" variant="outline">
                              <FileText className="h-4 w-4 mr-1" /> Contrato
                            </Button>
                            <Button size="sm" variant="outline">
                              <BarChart4 className="h-4 w-4 mr-1" /> Relatórios
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inactive">
            <Card>
              <CardHeader>
                <CardTitle>Empresas Inativas</CardTitle>
                <CardDescription>
                  Empresas com contratos encerrados ou temporariamente suspensos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome da Empresa</TableHead>
                      <TableHead>Contato</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Último Contrato</TableHead>
                      <TableHead>Motivo da Inatividade</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inactiveClients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell className="font-medium">{client.name}</TableCell>
                        <TableCell>{client.contactName}</TableCell>
                        <TableCell>{client.contactEmail}</TableCell>
                        <TableCell>Encerrado em 12/04/2023</TableCell>
                        <TableCell>Contrato finalizado</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">Histórico</Button>
                            <Button size="sm">Reativar</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contracts">
            <Card>
              <CardHeader>
                <CardTitle>Contratos</CardTitle>
                <CardDescription>
                  Gerencie contratos com empresas clientes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Empresa</TableHead>
                      <TableHead>Data de Início</TableHead>
                      <TableHead>Data de Término</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Valor Mensal</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeClients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell className="font-medium">{client.name}</TableCell>
                        <TableCell>{client.contract?.startDate || '01/01/2023'}</TableCell>
                        <TableCell>{client.contract?.endDate || '31/12/2023'}</TableCell>
                        <TableCell>
                          <Badge variant={client.contract?.signed ? 'default' : 'outline'}>
                            {client.contract?.signed ? 'Ativo' : 'Pendente'}
                          </Badge>
                        </TableCell>
                        <TableCell>R$ {Math.floor(Math.random() * 10000 + 5000).toLocaleString('pt-BR')}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">Ver</Button>
                            <Button size="sm" variant="outline">Renovar</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Companies;
