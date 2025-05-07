
import React, { ReactNode, useState } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import { Menu, Bell, Search, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  
  const getInitials = (name: string) => {
    return name.split(' ').map(part => part[0]).join('').toUpperCase().substring(0, 2);
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      <div className={`fixed inset-y-0 left-0 z-50 md:relative md:flex ${mobileMenuOpen ? 'flex' : 'hidden'}`}>
        <Sidebar />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-md z-10 backdrop-blur-sm bg-white/80">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="relative max-w-xs ml-4 hidden md:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full rounded-lg border-0 py-2 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 shadow-sm"
                  placeholder="Pesquisar..."
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none relative shadow-sm">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-indigo-500 ring-2 ring-white"></span>
              </button>
              
              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex items-center focus:outline-none">
                    <Avatar className="h-8 w-8 border border-gray-200 shadow-sm">
                      <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm">
                        {currentUser ? getInitials(currentUser.name) : "AD"}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-2" align="end">
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="font-medium">{currentUser?.name || "Admin"}</p>
                    <p className="text-xs text-gray-500">{currentUser?.email || "admin@rhentregadores.com"}</p>
                    <p className="text-xs text-indigo-600 bg-indigo-50 w-fit px-2 py-0.5 rounded-full mt-1">
                      {currentUser?.role === 'admin' ? 'Administrador' : 
                       currentUser?.role === 'gestor' ? 'Gestor' : 'Suporte'}
                    </p>
                  </div>
                  <div className="border-t my-1"></div>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={logout}
                  >
                    Sair
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="container mx-auto p-6 animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
