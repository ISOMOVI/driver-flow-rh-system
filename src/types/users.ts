
export type UserRole = 'admin' | 'gestor' | 'suporte';

export interface UserPermissions {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
  manageUsers: boolean;
  manageDocuments: boolean;
  managePayments: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Not stored in plain text in a real application
  role: UserRole;
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
  active: boolean;
}

export const DEFAULT_ROLE_PERMISSIONS: Record<UserRole, UserPermissions> = {
  admin: {
    create: true,
    read: true,
    update: true,
    delete: true,
    manageUsers: true,
    manageDocuments: true,
    managePayments: true
  },
  gestor: {
    create: true,
    read: true,
    update: true,
    delete: false,
    manageUsers: false,
    manageDocuments: false,
    managePayments: false
  },
  suporte: {
    create: false,
    read: true,
    update: false,
    delete: false,
    manageUsers: false,
    manageDocuments: true,
    managePayments: false
  }
};

export function hasPermission(role: UserRole, permission: keyof UserPermissions): boolean {
  return DEFAULT_ROLE_PERMISSIONS[role][permission];
}
