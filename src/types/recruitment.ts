
export type CandidateStatus = 
  | 'new' 
  | 'form_sent' 
  | 'form_completed' 
  | 'video_requested' 
  | 'video_received'
  | 'approved'
  | 'rejected';

export interface Candidate {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  status: CandidateStatus;
  createdAt: string;
  updatedAt: string;
  formData?: {
    fullName: string;
    cpf: string;
    birthday: string;
    address: string;
    cnh: string;
    cnhCategory: string;
    vehicleType: string;
    vehiclePlate?: string;
  };
  videoUrl?: string;
  notes?: string;
}
