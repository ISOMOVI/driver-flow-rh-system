
// Mock documents data used in the Documents page

export interface Document {
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

export const mockDocuments: Document[] = [
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
