
import React from 'react';
import { MainLayout } from '@/components/Layout/MainLayout';
import { StatCard } from '@/components/Dashboard/StatCard';
import { DriversTable } from '@/components/Dashboard/DriversTable';
import { TruckIcon, Users, Building, Clock, AlertCircle } from 'lucide-react';

const dummyDrivers = [
  { 
    id: '1', 
    name: 'João Silva', 
    cpf: '123.456.789-00', 
    type: 'Fixo' as const, 
    status: 'Ativo' as const, 
    client: 'Mercado Express', 
    lastActivity: 'Hoje, 10:30' 
  },
  { 
    id: '2', 
    name: 'Maria Oliveira', 
    cpf: '987.654.321-00', 
    type: 'Fixo' as const, 
    status: 'Ativo' as const, 
    client: 'Farmácia Rápida', 
    lastActivity: 'Hoje, 09:15' 
  },
  { 
    id: '3', 
    name: 'Carlos Santos', 
    cpf: '456.789.123-00', 
    type: 'Esporádico' as const, 
    status: 'Aguardando' as const, 
    lastActivity: 'Ontem, 15:45' 
  },
  { 
    id: '4', 
    name: 'Ana Pereira', 
    cpf: '789.123.456-00', 
    type: 'Fixo' as const, 
    status: 'Inativo' as const, 
    client: 'Supermercado BomPreço', 
    lastActivity: '3 dias atrás' 
  },
  { 
    id: '5', 
    name: 'Pedro Costa', 
    cpf: '321.654.987-00', 
    type: 'Esporádico' as const, 
    status: 'Ativo' as const, 
    lastActivity: 'Hoje, 11:00' 
  },
];

const Index = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Painel de Controle</h1>
        <p className="text-gray-500 mt-1">Bem-vindo ao sistema de gerenciamento de entregadores</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total de Entregadores" 
          value="124" 
          icon={TruckIcon}
          trend={{ value: 12, positive: true }}
          colorClass="bg-blue-50 text-blue-600"
        />
        <StatCard 
          title="Novos Recrutamentos" 
          value="18" 
          icon={Users}
          trend={{ value: 5, positive: true }}
          colorClass="bg-green-50 text-green-600"
        />
        <StatCard 
          title="Empresas Ativas" 
          value="8" 
          icon={Building}
          trend={{ value: 0, positive: true }}
          colorClass="bg-purple-50 text-purple-600"
        />
        <StatCard 
          title="Em Serviço Agora" 
          value="42" 
          icon={Clock}
          trend={{ value: 3, positive: false }}
          colorClass="bg-amber-50 text-amber-600"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <DriversTable drivers={dummyDrivers} />
        </div>
        
        <div className="bg-white shadow rounded-lg p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Alertas Recentes</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">Ver todos</button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start p-3 bg-red-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Discrepância de KM</p>
                <p className="text-sm text-gray-500">João Silva reportou 1200km acima da média.</p>
                <p className="text-xs text-gray-400 mt-1">Hoje, 10:45</p>
              </div>
            </div>
            
            <div className="flex items-start p-3 bg-yellow-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Localização inválida</p>
                <p className="text-sm text-gray-500">Maria Oliveira iniciou jornada fora da área permitida.</p>
                <p className="text-xs text-gray-400 mt-1">Hoje, 08:30</p>
              </div>
            </div>
            
            <div className="flex items-start p-3 bg-blue-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Novos candidatos</p>
                <p className="text-sm text-gray-500">3 novos candidatos finalizaram cadastro.</p>
                <p className="text-xs text-gray-400 mt-1">Ontem, 17:20</p>
              </div>
            </div>
            
            <div className="flex items-start p-3 bg-purple-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-purple-500 mt-0.5 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Contratos pendentes</p>
                <p className="text-sm text-gray-500">5 contratos aguardam assinatura digital.</p>
                <p className="text-xs text-gray-400 mt-1">2 dias atrás</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Recrutamento</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">Ver detalhes</button>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium">Novos Cadastros</p>
                <p className="text-lg font-bold">18</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
            
            <div className="h-px bg-gray-200"></div>
            
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium">Cadastros Incompletos</p>
                <p className="text-lg font-bold">7</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            
            <div className="h-px bg-gray-200"></div>
            
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium">Aprovados este mês</p>
                <p className="text-lg font-bold">24</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <TruckIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">WhatsApp</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">Ver detalhes</button>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium">Canal 1 - Recrutamento</p>
                <p className="text-lg font-bold">156 mensagens hoje</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-xs text-gray-500">Taxa de resposta</p>
                <p className="text-sm font-medium text-green-600">98%</p>
              </div>
            </div>
            
            <div className="h-px bg-gray-200"></div>
            
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium">Canal 2 - Operacional</p>
                <p className="text-lg font-bold">423 mensagens hoje</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-xs text-gray-500">Taxa de resposta</p>
                <p className="text-sm font-medium text-green-600">99.5%</p>
              </div>
            </div>
            
            <div className="h-px bg-gray-200"></div>
            
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium">KMs Registrados Hoje</p>
                <p className="text-lg font-bold">4,872 km</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-xs text-gray-500">Entregadores ativos</p>
                <p className="text-sm font-medium">42 de 82</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
