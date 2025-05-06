
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/Layout/MainLayout';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Recruitment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("candidates");
  
  // Determine the active tab based on the current route
  useEffect(() => {
    const path = location.pathname.split('/').pop() || 'candidates';
    setActiveTab(path);
  }, [location]);

  // Handle tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/recruitment/${value}`);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Recrutamento</h1>
          <p className="text-muted-foreground">
            Gerenciamento de candidatos, aprovados e histórico de recrutamento.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
          <TabsList>
            <TabsTrigger value="candidates">Candidatos</TabsTrigger>
            <TabsTrigger value="approved">Aprovados</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
          </TabsList>
          
          <div className="border rounded-lg p-6">
            <Outlet />
          </div>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Recruitment;
