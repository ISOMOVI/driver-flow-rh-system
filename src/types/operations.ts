
import { Candidate } from './recruitment';

export interface Driver extends Candidate {
  active: boolean;
  clientId?: string;
  paymentInfo: {
    bank: string;
    agency: string;
    account: string;
    pixKey?: string;
  };
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
}

export interface Payment {
  id: string;
  driverId: string;
  driverName: string;
  period: {
    start: string;
    end: string;
  };
  totalKm: number;
  ratePerKm: number;
  totalAmount: number;
  status: 'pending' | 'paid' | 'canceled';
  paidAt?: string;
  receiptUrl?: string;
}
