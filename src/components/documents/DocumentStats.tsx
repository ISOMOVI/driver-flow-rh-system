
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DocumentStatsProps {
  totalCount: number;
  contractsCount: number;
  receiptsCount: number;
  expiredCount: number;
}

export const DocumentStats = ({ totalCount, contractsCount, receiptsCount, expiredCount }: DocumentStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCount}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Contratos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{contractsCount}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Recibos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{receiptsCount}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Expirados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{expiredCount}</div>
        </CardContent>
      </Card>
    </div>
  );
};
