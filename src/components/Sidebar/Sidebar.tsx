
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
  ChevronRight,
  UserCog,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { UserPermissions } from '@/types/users';

const navigationItems = [
  { name: 'Dashboard', href: '/', icon: TruckIcon, permission: 'read' as keyof UserPermissions },
  { name: 'Recrutamento', href: '/recruitment', icon: Users, permission: 'read' as keyof UserPermissions },
  { name: 'Operacional', href: '/operations', icon: Clock, permission: 'read' as keyof UserPermissions },
  { name: 'Empresas', href: '/companies', icon: Building, permission: 'read' as keyof UserPermissions },
  { name: 'Pagamentos', href: '/payments', icon: Briefcase, permission: 'read' as keyof UserPermissions },
  { name: 'Documentos', href: '/documents', icon: FileText, permission: 'read' as keyof UserPermissions },
  { name: 'Mensagens', href: '/messages', icon: Mail, permission: 'read' as keyof UserPermissions },
  { name: 'Usuários', href: '/users', icon: UserCog, permission: 'manageUsers' as keyof UserPermissions },
  { name: 'Configurações', href: '/settings', icon: Settings, permission: 'read' as keyof UserPermissions },
];

export const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { currentUser, logout, hasPermission } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={`${collapsed ? 'w-20' : 'w-64'} bg-white shadow-xl transition-all duration-300 ease-in-out h-full flex flex-col`}>
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-lg shadow-indigo-300/30">
            <TruckIcon className="h-6 w-6" />
          </div>
          {!collapsed && (
            <h1 className="ml-3 text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              RH Entregadores
            </h1>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors shadow-sm"
        >
          <ChevronRight className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            if (!hasPermission(item.permission)) return null;
            
            const isActive = location.pathname === item.href || 
                          (item.href !== '/' && location.pathname.startsWith(item.href));
            
            return (
              <TooltipProvider key={item.name} delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.href}
                      className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                        isActive 
                          ? 'bg-gradient-to-r from-indigo-100/80 to-purple-100/80 shadow-md shadow-indigo-200/30'
                          : 'text-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-center">
                        <div 
                          className={`flex items-center justify-center ${
                            isActive 
                              ? 'text-indigo-600 bg-white rounded-md p-1.5 shadow-sm' 
                              : 'text-gray-500 group-hover:text-indigo-600'
                          } transition-colors`}
                        >
                          <item.icon className={`${collapsed ? 'h-5 w-5' : 'h-5 w-5 mr-3'} transition-all`} />
                        </div>
                        {!collapsed && (
                          <span className={`text-sm font-medium ${isActive ? 'text-indigo-800 font-semibold' : 'text-gray-700'}`}>
                            {item.name}
                          </span>
                        )}
                      </div>
                      {!collapsed && isActive && (
                        <div className="h-2 w-2 rounded-full bg-indigo-600 shadow-md shadow-indigo-200"></div>
                      )}
                    </Link>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right" className="bg-white shadow-lg border-gray-100">
                      {item.name}
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      </nav>
      
      <div className={`p-4 mt-auto border-t border-gray-100 ${collapsed ? 'items-center justify-center' : 'block'}`}>
        {collapsed ? (
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 rounded-full hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Sair</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <div className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-medium shadow-md shadow-indigo-200/30">
                {currentUser?.name?.substring(0, 2).toUpperCase() || 'AD'}
              </div>
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{currentUser?.name || 'Admin'}</p>
              <p className="text-xs text-gray-500 truncate">{currentUser?.email || 'admin@rhentregadores.com'}</p>
            </div>
            <Button 
              onClick={handleLogout}
              variant="ghost" 
              size="icon" 
              className="ml-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full h-8 w-8"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
