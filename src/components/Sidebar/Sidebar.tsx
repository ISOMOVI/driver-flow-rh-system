
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  TruckIcon, 
  Briefcase, 
  Building, 
  FileText, 
  Settings, 
  Mail, 
  Clock,
  ChevronRight
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
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`${collapsed ? 'w-20' : 'w-64'} bg-white shadow-lg transition-all duration-300 ease-in-out h-full flex flex-col`}>
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
            <TruckIcon className="h-6 w-6" />
          </div>
          {!collapsed && <h1 className="ml-3 text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">RH Entregadores</h1>}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href || 
                           (item.href !== '/' && location.pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100'
                }`}
              >
                <div className="flex items-center">
                  <div className={`flex items-center justify-center ${isActive ? 'text-indigo-600' : 'text-gray-500 group-hover:text-indigo-600'} transition-colors`}>
                    <item.icon className={`${collapsed ? 'h-6 w-6' : 'h-5 w-5 mr-3'} transition-all`} />
                  </div>
                  {!collapsed && (
                    <span className={`text-sm font-medium ${isActive ? 'font-semibold' : ''}`}>
                      {item.name}
                    </span>
                  )}
                </div>
                {!collapsed && isActive && (
                  <div className="h-2 w-2 rounded-full bg-indigo-600"></div>
                )}
              </Link>
            );
          })}
        </div>
      </nav>
      
      <div className={`p-4 mt-auto border-t border-gray-100 ${collapsed ? 'hidden' : 'block'}`}>
        <div className="flex items-center px-3 py-2 rounded-lg">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center justify-center text-white text-xs font-medium">
              AD
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-800">Admin</p>
            <p className="text-xs text-gray-500">admin@rhentregadores.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};
