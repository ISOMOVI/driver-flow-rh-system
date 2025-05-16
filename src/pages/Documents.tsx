
import React, { useState } from 'react';
import { MainLayout } from '@/components/Layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus } from 'lucide-react';
import DocumentTypesModal from '@/components/documents/DocumentTypesModal';
import { DocumentStats } from '@/components/documents/DocumentStats';
import { DocumentSearch } from '@/components/documents/DocumentSearch';
import { DocumentsTable } from '@/components/documents/DocumentsTable';
import { mockDocuments } from '@/components/documents/DocumentsData';

const Documents = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isDocumentTypesModalOpen, setIsDocumentTypesModalOpen] = useState(false);

  // Filter documents based on active tab
  const filteredDocuments = mockDocuments.filter(document => {
    if (activeTab === 'all') return true;
    if (activeTab === 'contracts') return document.type === 'contract';
    if (activeTab === 'receipts') return document.type === 'receipt';
    if (activeTab === 'driver_docs') return document.category === 'driver_document';
    if (activeTab === 'company_docs') return document.category === 'company_document';
    return false;
  });

  // Count documents by type
  const contractsCount = mockDocuments.filter(d => d.type === 'contract').length;
  const receiptsCount = mockDocuments.filter(d => d.type === 'receipt').length;
  const expiredCount = mockDocuments.filter(d => d.status === 'expired').length;

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

        {/* Document Statistics */}
        <DocumentStats 
          totalCount={mockDocuments.length}
          contractsCount={contractsCount}
          receiptsCount={receiptsCount}
          expiredCount={expiredCount}
        />

        {/* Search and Filter */}
        <DocumentSearch />

        {/* Document Tabs and Table */}
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
              <DocumentsTable documents={filteredDocuments} />
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Documents;
