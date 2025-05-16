import React, { useState } from 'react';
import { MainLayout } from '@/components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FileText, Upload, Download, Search, Filter, Plus } from 'lucide-react';
import DocumentTypesModal from '@/components/documents/DocumentTypesModal';

const Documents = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isDocumentTypesModalOpen, setIsDocumentTypesModalOpen] = useState(false);

  // Mock documents data
  const documents = [
    {
      id: '1',
      title: 'Contrato - Empresa ABC',
      type: 'contract',
      category: 'company_document',
      relatedTo: {
        type: 'client',
        id: '123',
        name: 'Empresa ABC'
      },
      createdAt: '2023-01-15',
      expiresAt: '2024-01-15',
      status: 'active',
      signedAt: '2023-01-16',
      signedBy: 'João Silva'
    },
    {
      id: '2',
      title: 'CNH - Carlos Ferreira',
      type: 'document',
      category: 'driver_document',
      relatedTo: {
        type: 'driver',
        id: '456',
        name: 'Carlos Ferreira'
      },
      createdAt: '2023-02-20',
      expiresAt: '2028-02-20',
      status: 'active'
    },
    {
      id: '3',
      title: 'Recibo de Pagamento - Maio/2023',
      type: 'receipt',
      category: 'receipt',
      relatedTo: {
        type: 'payment',
        id: '789',
        name: 'Pagamento Carlos Ferreira'
      },
      createdAt: '2023-06-05',
      status: 'active',
      signedAt: '2023-06-05',
      signedBy: 'Sistema'
    },
    {
      id: '4',
      title: 'Contrato de Prestação de Serviços - Carlos Ferreira',
      type: 'contract',
      category: 'driver_document',
      relatedTo: {
        type: 'driver',
        id: '456',
        name: 'Carlos Ferreira'
      },
      createdAt: '2023-01-10',
      expiresAt: '2023-12-31',
      status: 'active',
      signedAt: '2023-01-10',
      signedBy: 'Carlos Ferreira'
    },
    {
      id: '5',
      title: 'Comprovante de Residência - Ana Souza',
      type: 'document',
      category: 'driver_document',
      relatedTo: {
        type: 'driver',
        id: '101',
        name: 'Ana Souza'
      },
      createdAt: '2023-03-15',
      status: 'active'
    },
    {
      id: '6',
      title: 'Contrato - Empresa XYZ',
      type: 'contract',
      category: 'company_document',
      relatedTo: {
        type: 'client',
        id: '102',
        name: 'Empresa XYZ'
      },
      createdAt: '2022-11-20',
      expiresAt: '2023-11-20',
      status: 'expired'
    }
  ];

  // Filter documents based on active tab
  const filteredDocuments = documents.filter(document => {
    if (activeTab === 'all') return true;
    if (activeTab === 'contracts') return document.type === 'contract';
    if (activeTab === 'receipts') return document.type === 'receipt';
    if (activeTab === 'driver_docs') return document.category === 'driver_document';
    if (activeTab === 'company_docs') return document.category === 'company_document';
    return false;
  });

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  // Get badge for document status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Ativo</Badge>;
      case 'pending':
        return <Badge variant="outline">Pendente</Badge>;
      case 'expired':
        return <Badge variant="destructive">Expirado</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Handle creating a new document
  const handleNewDocument = () => {
    console.log('Creating new document');
    setIsDocumentTypesModalOpen(false);
    // Here you would implement the logic to create a new document
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Documentos</h1>
            <p className="text-muted-foreground">
              Gerencie contratos, recibos e documentos de entregadores e empresas.
            </p>
          </div>
          <Button onClick={() => setIsDocumentTypesModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Arquivos
          </Button>
        </div>

        {/* Document Types Modal */}
        <DocumentTypesModal
          open={isDocumentTypesModalOpen}
          onOpenChange={setIsDocumentTypesModalOpen}
          onNewDocument={handleNewDocument}
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{documents.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Contratos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {documents.filter(d => d.type === 'contract').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Recibos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {documents.filter(d => d.type === 'receipt').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Expirados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {documents.filter(d => d.status === 'expired').length}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar documentos..." className="pl-8" />
          </div>
          <Button variant="outline" className="flex items-center">
            <Filter className="mr-2 h-4 w-4" /> Filtros
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="contracts">Contratos</TabsTrigger>
            <TabsTrigger value="receipts">Recibos</TabsTrigger>
            <TabsTrigger value="driver_docs">Docs. Entregadores</TabsTrigger>
            <TabsTrigger value="company_docs">Docs. Empresas</TabsTrigger>
          </TabsList>
          
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Documento</TableHead>
                    <TableHead>Relacionado à</TableHead>
                    <TableHead>Data de Criação</TableHead>
                    <TableHead>Validade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assinado</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((document) => (
                    <TableRow key={document.id}>
                      <TableCell className="font-medium flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-blue-500" />
                        {document.title}
                      </TableCell>
                      <TableCell>
                        {document.relatedTo?.name || 'N/A'}
                      </TableCell>
                      <TableCell>{formatDate(document.createdAt)}</TableCell>
                      <TableCell>
                        {document.expiresAt ? formatDate(document.expiresAt) : 'Sem validade'}
                      </TableCell>
                      <TableCell>{getStatusBadge(document.status)}</TableCell>
                      <TableCell>
                        {document.signedAt ? (
                          <span className="text-sm">
                            {formatDate(document.signedAt)} por {document.signedBy}
                          </span>
                        ) : 'Não assinado'}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                          {!document.signedAt && document.type === 'contract' && (
                            <Button size="sm" variant="outline">
                              Solicitar Assinatura
                            </Button>
                          )}
                          {document.type === 'receipt' && (
                            <Button size="sm" variant="outline">
                              Reenviar
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Documents;
