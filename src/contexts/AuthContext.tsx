
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User, UserRole, hasPermission as checkPermission, UserPermissions } from '@/types/users';
import { mockUsers } from '@/services/mockData';
import { toast } from '@/components/ui/use-toast';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: keyof UserPermissions) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on initial mount
  useEffect(() => {
    console.log("AuthProvider: Checking for saved user");
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        console.log("AuthProvider: Found saved user", parsedUser);
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('currentUser');
      }
    } else {
      console.log("AuthProvider: No saved user found");
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log("Login attempt for:", email);
    // In a real app, this would be an API call
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      const { password, ...userWithoutPassword } = user;
      const authenticatedUser = {
        ...userWithoutPassword,
        lastLogin: new Date().toISOString()
      };
      
      console.log("Login successful for:", authenticatedUser.name);
      setCurrentUser(authenticatedUser);
      localStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
      
      toast({
        title: "Login realizado com sucesso",
        description: `Bem-vindo, ${authenticatedUser.name}!`,
      });
      
      return true;
    } else {
      console.log("Login failed: Invalid credentials");
      toast({
        title: "Erro ao fazer login",
        description: "Email ou senha inválidos.",
        variant: "destructive"
      });
      return false;
    }
  };

  const logout = () => {
    console.log("Logging out user");
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado do sistema."
    });
  };

  const checkUserPermission = (permission: keyof UserPermissions): boolean => {
    if (!currentUser) return false;
    return checkPermission(currentUser.role, permission);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isLoading,
        login,
        logout,
        hasPermission: checkUserPermission
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
