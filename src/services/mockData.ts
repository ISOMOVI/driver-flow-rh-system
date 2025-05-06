
import { Candidate } from '../types/recruitment';
import { Driver, Attendance, Client, Payment } from '../types/operations';

// Mock candidates data
export const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'João Silva',
    phone: '11 98765-4321',
    email: 'joao.silva@email.com',
    city: 'São Paulo',
    status: 'new',
    createdAt: '2023-05-01T10:30:00Z',
    updatedAt: '2023-05-01T10:30:00Z'
  },
  {
    id: '2',
    name: 'Maria Oliveira',
    phone: '11 91234-5678',
    email: 'maria.oliveira@email.com',
    city: 'São Paulo',
    status: 'form_completed',
    createdAt: '2023-05-02T14:20:00Z',
    updatedAt: '2023-05-02T16:45:00Z',
    formData: {
      fullName: 'Maria Aparecida Oliveira',
      cpf: '123.456.789-00',
      birthday: '1990-03-15',
      address: 'Rua das Flores, 123 - Jardim Paulista',
      cnh: '12345678900',
      cnhCategory: 'B',
      vehicleType: 'Moto',
      vehiclePlate: 'ABC1D23',
    }
  },
  {
    id: '3',
    name: 'Pedro Santos',
    phone: '11 97777-8888',
    email: 'pedro.santos@email.com',
    city: 'São Paulo',
    status: 'video_received',
    createdAt: '2023-05-03T09:15:00Z',
    updatedAt: '2023-05-03T18:30:00Z',
    formData: {
      fullName: 'Pedro Henrique Santos',
      cpf: '987.654.321-00',
      birthday: '1988-07-22',
      address: 'Av. Paulista, 1000 - Bela Vista',
      cnh: '98765432100',
      cnhCategory: 'A',
      vehicleType: 'Moto',
      vehiclePlate: 'XYZ9J87',
    },
    videoUrl: 'https://example.com/videos/pedro-presentation',
    notes: 'Candidato com boa apresentação e experiência prévia.'
  }
];

// Mock approved candidates (already drivers)
export const mockDrivers: Driver[] = [
  {
    id: '4',
    name: 'Ana Ferreira',
    phone: '11 95555-6666',
    email: 'ana.ferreira@email.com',
    city: 'São Paulo',
    status: 'approved',
    createdAt: '2023-04-15T11:20:00Z',
    updatedAt: '2023-04-20T14:30:00Z',
    formData: {
      fullName: 'Ana Carolina Ferreira',
      cpf: '456.789.123-00',
      birthday: '1992-11-05',
      address: 'Rua Augusta, 500 - Consolação',
      cnh: '45678912300',
      cnhCategory: 'A',
      vehicleType: 'Moto',
      vehiclePlate: 'DEF5G67',
    },
    videoUrl: 'https://example.com/videos/ana-presentation',
    active: true,
    clientId: '1',
    paymentInfo: {
      bank: 'Banco do Brasil',
      agency: '1234',
      account: '56789-0',
      pixKey: 'ana.ferreira@email.com',
    }
  },
  {
    id: '5',
    name: 'Carlos Rodrigues',
    phone: '11 94444-3333',
    email: 'carlos.rodrigues@email.com',
    city: 'São Paulo',
    status: 'approved',
    createdAt: '2023-04-10T08:45:00Z',
    updatedAt: '2023-04-18T16:15:00Z',
    formData: {
      fullName: 'Carlos Alberto Rodrigues',
      cpf: '789.123.456-00',
      birthday: '1985-09-28',
      address: 'Rua Oscar Freire, 300 - Jardins',
      cnh: '78912345600',
      cnhCategory: 'AB',
      vehicleType: 'Carro',
      vehiclePlate: 'GHI8J90',
    },
    videoUrl: 'https://example.com/videos/carlos-presentation',
    active: true,
    clientId: '2',
    paymentInfo: {
      bank: 'Itaú',
      agency: '5678',
      account: '12345-6',
      pixKey: '789.123.456-00',
    }
  }
];

// Mock attendance records
export const mockAttendance: Attendance[] = [
  {
    id: '1',
    driverId: '4',
    date: '2023-05-01',
    checkIn: '08:00',
    checkOut: '17:00',
    startKm: 10500,
    endKm: 10580,
    totalKm: 80,
    validated: true
  },
  {
    id: '2',
    driverId: '4',
    date: '2023-05-02',
    checkIn: '08:15',
    checkOut: '17:30',
    startKm: 10580,
    endKm: 10670,
    totalKm: 90,
    validated: true
  },
  {
    id: '3',
    driverId: '5',
    date: '2023-05-01',
    checkIn: '09:00',
    checkOut: '18:00',
    startKm: 22300,
    endKm: 22400,
    totalKm: 100,
    validated: true
  },
  {
    id: '4',
    driverId: '5',
    date: '2023-05-02',
    checkIn: '08:45',
    checkOut: '17:45',
    startKm: 22400,
    endKm: 22520,
    totalKm: 120,
    validated: true
  },
  {
    id: '5',
    driverId: '4',
    date: '2023-05-03',
    checkIn: '08:10',
    startKm: 10670,
    validated: false
  }
];

// Mock clients
export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Empresa ABC Ltda.',
    address: 'Av. Brigadeiro Faria Lima, 1000 - Itaim Bibi',
    contactName: 'Roberto Almeida',
    contactPhone: '11 3456-7890',
    contactEmail: 'roberto@empresaabc.com.br',
    active: true,
    drivers: ['4']
  },
  {
    id: '2',
    name: 'XYZ Comércio S.A.',
    address: 'Rua Vergueiro, 500 - Liberdade',
    contactName: 'Fernanda Lima',
    contactPhone: '11 2345-6789',
    contactEmail: 'fernanda@xyzcomercio.com.br',
    active: true,
    drivers: ['5']
  },
  {
    id: '3',
    name: 'Tech Solutions Brasil',
    address: 'Rua Bela Cintra, 300 - Consolação',
    contactName: 'Marcelo Costa',
    contactPhone: '11 9876-5432',
    contactEmail: 'marcelo@techsolutions.com.br',
    active: true,
    drivers: []
  }
];

// Mock payments
export const mockPayments: Payment[] = [
  {
    id: '1',
    driverId: '4',
    driverName: 'Ana Ferreira',
    period: {
      start: '2023-04-01',
      end: '2023-04-15'
    },
    totalKm: 1200,
    ratePerKm: 1.20,
    totalAmount: 1440,
    status: 'paid',
    paidAt: '2023-04-20T14:30:00Z',
    receiptUrl: 'https://example.com/receipts/ana-abril-1'
  },
  {
    id: '2',
    driverId: '4',
    driverName: 'Ana Ferreira',
    period: {
      start: '2023-04-16',
      end: '2023-04-30'
    },
    totalKm: 1150,
    ratePerKm: 1.20,
    totalAmount: 1380,
    status: 'paid',
    paidAt: '2023-05-05T10:15:00Z',
    receiptUrl: 'https://example.com/receipts/ana-abril-2'
  },
  {
    id: '3',
    driverId: '5',
    driverName: 'Carlos Rodrigues',
    period: {
      start: '2023-04-01',
      end: '2023-04-30'
    },
    totalKm: 2500,
    ratePerKm: 1.50,
    totalAmount: 3750,
    status: 'paid',
    paidAt: '2023-05-05T11:30:00Z',
    receiptUrl: 'https://example.com/receipts/carlos-abril'
  },
  {
    id: '4',
    driverId: '4',
    driverName: 'Ana Ferreira',
    period: {
      start: '2023-05-01',
      end: '2023-05-15'
    },
    totalKm: 850,
    ratePerKm: 1.20,
    totalAmount: 1020,
    status: 'pending'
  },
  {
    id: '5',
    driverId: '5',
    driverName: 'Carlos Rodrigues',
    period: {
      start: '2023-05-01',
      end: '2023-05-15'
    },
    totalKm: 1300,
    ratePerKm: 1.50,
    totalAmount: 1950,
    status: 'pending'
  }
];
