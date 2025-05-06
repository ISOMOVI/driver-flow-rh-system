
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/Layout/MainLayout';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Operations = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("attendance");
  
  // Determine the active tab based on the current route
  useEffect(() => {
    const path = location.pathname.split('/').pop() || 'attendance';
    setActiveTab(path);
  }, [location]);

  // Handle tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/operations/${value}`);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Operacional</h1>
          <p className="text-muted-foreground">
            Gerenciamento de frequência, clientes e pagamentos.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
          <TabsList>
            <TabsTrigger value="attendance">Frequência</TabsTrigger>
            <TabsTrigger value="clients">Clientes</TabsTrigger>
            <TabsTrigger value="payments">Pagamentos</TabsTrigger>
          </TabsList>
          
          <div className="border rounded-lg p-6">
            <Outlet />
          </div>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Operations;
