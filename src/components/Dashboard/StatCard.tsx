
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  colorClass?: string;
}

export const StatCard = ({ title, value, icon: Icon, trend, colorClass = "bg-blue-50 text-blue-600" }: StatCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-5 animate-fade-in">
      <div className="flex justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
          
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`text-xs font-medium ${trend.positive ? 'text-green-500' : 'text-red-500'}`}>
                {trend.positive ? '+' : ''}{trend.value}%
              </span>
              <span className="text-xs text-gray-400 ml-1">Desde o último mês</span>
            </div>
          )}
        </div>
        
        <div className={`rounded-full p-3 ${colorClass}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};
