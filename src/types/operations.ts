
import { Candidate } from './recruitment';

export type DriverType = 'fixed' | 'sporadic';
export type DriverPaymentMethod = 'per_km' | 'fixed_rate' | 'per_delivery';

export interface Driver extends Candidate {
  active: boolean;
  clientId?: string;
  driverType: DriverType;
  paymentMethod: DriverPaymentMethod;
  ratePerKm?: number;
  fixedRate?: number;
  ratePerDelivery?: number;
  paymentInfo: {
    bank: string;
    agency: string;
    account: string;
    pixKey?: string;
  };
  contractSigned: boolean;
  contractUrl?: string;
  lastPayment?: string;
}

export interface Attendance {
  id: string;
  driverId: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  startKm: number;
  endKm?: number;
  totalKm?: number;
  validated: boolean;
  clientId?: string;
  notes?: string;
}

export interface Client {
  id: string;
  name: string;
  address: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  active: boolean;
  drivers: string[]; // Array of driver IDs
  contract?: {
    signed: boolean;
    startDate: string;
    endDate?: string;
    documentUrl?: string;
  };
  paymentTerms?: {
    paymentMethod: 'bank_transfer' | 'pix' | 'boleto';
    paymentDays: number; // Days after end of month
    autoApprove: boolean;
  };
}

export type PaymentStatus = 'pending' | 'processing' | 'paid' | 'canceled';

export interface Payment {
  id: string;
  driverId: string;
  driverName: string;
  driverType: DriverType;
  clientId?: string;
  clientName?: string;
  period: {
    start: string;
    end: string;
  };
  totalKm?: number;
  totalDeliveries?: number;
  ratePerKm?: number;
  ratePerDelivery?: number;
  fixedAmount?: number;
  totalAmount: number;
  status: PaymentStatus;
  paymentMethod: 'bank_transfer' | 'pix' | 'cash';
  createdAt: string;
  paidAt?: string;
  receiptUrl?: string;
  notes?: string;
}

export interface Document {
  id: string;
  title: string;
  description?: string;
  category: 'contract' | 'receipt' | 'driver_document' | 'company_document' | 'other';
  relatedTo?: {
    type: 'driver' | 'client' | 'payment';
    id: string;
  };
  createdAt: string;
  expiresAt?: string;
  fileUrl: string;
  status: 'pending' | 'active' | 'expired' | 'canceled';
  requiresSignature?: boolean;
  signedAt?: string;
  signedBy?: string;
}

export interface Message {
  id: string;
  channelId: 'recruitment' | 'operations' | 'individual';
  recipientId?: string; // Driver/candidate ID for individual messages
  recipientName?: string;
  message: string;
  timestamp: string;
  direction: 'inbound' | 'outbound';
  status: 'sent' | 'delivered' | 'read';
  attachments?: {
    type: 'image' | 'document' | 'location';
    url?: string;
    name?: string;
  }[];
}
