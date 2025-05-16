
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  type: string;
  category: string;
  relatedTo: {
    type: string;
    id: string;
    name: string;
  };
  createdAt: string;
  expiresAt?: string;
  status: string;
  signedAt?: string;
  signedBy?: string;
}

interface DocumentsTableProps {
  documents: Document[];
}

export const DocumentsTable = ({ documents }: DocumentsTableProps) => {
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

  return (
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
        {documents.map((document) => (
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
  );
};
