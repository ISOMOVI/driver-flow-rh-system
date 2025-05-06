
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  TruckIcon, 
  Briefcase, 
  Building, 
  FileText, 
  Settings, 
  Mail, 
  Clock
} from 'lucide-react';

const navigationItems = [
  { name: 'Dashboard', href: '/', icon: TruckIcon },
  { name: 'Recrutamento', href: '/recruitment', icon: Users },
  { name: 'Operacional', href: '/operations', icon: Clock },
  { name: 'Empresas', href: '/companies', icon: Building },
  { name: 'Pagamentos', href: '/payments', icon: Briefcase },
  { name: 'Documentos', href: '/documents', icon: FileText },
  { name: 'Mensagens', href: '/messages', icon: Mail },
  { name: 'Configurações', href: '/settings', icon: Settings },
];

export const Sidebar = () => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-5 border-b border-gray-200">
        <div className="flex items-center">
          <TruckIcon className="h-8 w-8 text-blue-600" />
          <h1 className="ml-2 text-xl font-bold text-gray-800">RH Entregadores</h1>
        </div>
      </div>
      
      <nav className="p-4 space-y-1">
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="flex items-center px-3 py-2 text-gray-600 rounded-md hover:bg-blue-50 hover:text-blue-600 group"
          >
            <item.icon className="mr-3 h-5 w-5" />
            <span className="text-sm font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};
