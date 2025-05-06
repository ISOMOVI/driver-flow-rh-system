
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface Driver {
  id: string;
  name: string;
  cpf: string;
  type: 'Fixo' | 'Esporádico';
  status: 'Ativo' | 'Aguardando' | 'Inativo';
  client?: string;
  lastActivity?: string;
}

interface DriversTableProps {
  drivers: Driver[];
  title?: string;
  isLoading?: boolean;
}

export const DriversTable = ({ drivers, title = "Entregadores Recentes", isLoading = false }: DriversTableProps) => {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Ativo':
        return 'bg-green-100 text-green-800';
      case 'Aguardando':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inativo':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'Fixo':
        return 'bg-blue-100 text-blue-800';
      case 'Esporádico':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white shadow rounded-lg p-6 animate-fade-in">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <div className="animate-pulse">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-100 rounded-md mb-3"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden animate-fade-in">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPF</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última atividade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {drivers.map((driver) => (
              <tr key={driver.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{driver.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{driver.cpf}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge className={`${getTypeColor(driver.type)}`}>{driver.type}</Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge className={`${getStatusColor(driver.status)}`}>{driver.status}</Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{driver.client || '-'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{driver.lastActivity || '-'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Editar</button>
                  <button className="text-blue-600 hover:text-blue-900">Detalhes</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {drivers.length === 0 && (
        <div className="text-center p-6 text-gray-500">
          Nenhum entregador encontrado
        </div>
      )}
      
      <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Mostrando {Math.min(drivers.length, 5)} de {drivers.length} entregadores
        </div>
        <div>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
            Ver Todos
          </button>
        </div>
      </div>
    </div>
  );
};
