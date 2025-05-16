
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { TruckIcon } from 'lucide-react';
import MatrixBackground from '@/components/auth/MatrixBackground';

const Login = () => {
  const [email, setEmail] = useState('admin@rhentregadores.com');
  const [password, setPassword] = useState('123457');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { login, isAuthenticated } = useAuth();

  // Clear localStorage on initial mount to ensure the login screen is shown
  useEffect(() => {
    // Only clear if we're on the login page and not authenticated
    if (!isAuthenticated) {
      localStorage.removeItem('currentUser');
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    try {
      await login(email, password);
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <MatrixBackground />
      
      <div className="w-full max-w-md px-4">
        <Card className="glass-card border-none shadow-xl bg-black/70 backdrop-blur-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full gradient-blue flex items-center justify-center shadow-lg">
                <TruckIcon className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              RH Entregadores
            </CardTitle>
            <CardDescription className="text-gray-300">
              Faça login para acessar o sistema
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300" htmlFor="email">Email</label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@exemplo.com"
                    className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-gray-300" htmlFor="password">Senha</label>
                  <button type="button" className="text-xs text-blue-400 hover:text-blue-300">
                    Esqueceu a senha?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="p-3 bg-blue-900/30 rounded-lg text-xs text-blue-300 border border-blue-700/50">
                <p><strong>Credenciais de teste:</strong></p>
                <p>Email: admin@rhentregadores.com</p>
                <p>Senha: 123457</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full gradient-blue text-white shadow-lg hover:shadow-xl transition-all"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? 'Entrando...' : 'Entrar'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
