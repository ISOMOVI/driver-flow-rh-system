
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileText, Plus } from 'lucide-react';

interface DocumentType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface DocumentTypesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNewDocument: () => void;
}

export const DocumentTypesModal = ({ open, onOpenChange, onNewDocument }: DocumentTypesModalProps) => {
  // Predefined document types
  const documentTypes: DocumentType[] = [
    {
      id: 'fixed-contract',
      name: 'Contrato Fixo',
      description: 'Contrato para entregadores com período fixo',
      icon: <FileText className="h-8 w-8 text-blue-500" />
    },
    {
      id: 'sporadic-contract',
      name: 'Contrato Esporádico',
      description: 'Contrato para entregadores com serviço esporádico',
      icon: <FileText className="h-8 w-8 text-green-500" />
    },
    {
      id: 'fixed-receipt',
      name: 'Recibo de Fixo',
      description: 'Recibo para pagamentos de entregadores fixos',
      icon: <FileText className="h-8 w-8 text-purple-500" />
    },
    {
      id: 'sporadic-receipt',
      name: 'Recibo de Esporádico',
      description: 'Recibo para pagamentos de entregadores esporádicos',
      icon: <FileText className="h-8 w-8 text-orange-500" />
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Tipos de Documentos</DialogTitle>
          <DialogDescription>
            Selecione um tipo de documento abaixo ou crie um novo.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 py-4">
          {documentTypes.map((type) => (
            <div 
              key={type.id}
              className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => {
                // Here you would handle the selection of a document type
                console.log('Selected document type:', type.id);
                onOpenChange(false);
              }}
            >
              {type.icon}
              <span className="mt-2 text-sm font-medium">{type.name}</span>
              <span className="text-xs text-gray-500 text-center mt-1">{type.description}</span>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-2">
          <Button onClick={onNewDocument}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Documento
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentTypesModal;
