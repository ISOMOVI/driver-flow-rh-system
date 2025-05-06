
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockPayments } from '@/services/mockData';

const PaymentsTab = () => {
  // Calculate pending payments amount
  const pendingAmount = mockPayments
    .filter(payment => payment.status === 'pending')
    .reduce((sum, payment) => sum + payment.totalAmount, 0);
  
  // Calculate paid payments amount
  const paidAmount = mockPayments
    .filter(payment => payment.status === 'paid')
    .reduce((sum, payment) => sum + payment.totalAmount, 0);
  
  // Format currency in BRL
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  // Get status badge based on payment status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="default">Pago</Badge>;
      case 'pending':
        return <Badge variant="outline">Pendente</Badge>;
      case 'canceled':
        return <Badge variant="destructive">Cancelado</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Gerenciamento de Pagamentos</h2>
        <div className="flex space-x-2">
          <Button variant="outline">Relatórios</Button>
          <Button>Gerar Pagamento</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Pendente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(pendingAmount)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Pago (Mês)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(paidAmount)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Próximo Pagamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15/05/2023</div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Pagamentos</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Entregador</TableHead>
              <TableHead>Período</TableHead>
              <TableHead>Total KM</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data do Pagamento</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.driverName}</TableCell>
                <TableCell>
                  {payment.period.start} a {payment.period.end}
                </TableCell>
                <TableCell>{payment.totalKm} km</TableCell>
                <TableCell>{formatCurrency(payment.totalAmount)}</TableCell>
                <TableCell>{getStatusBadge(payment.status)}</TableCell>
                <TableCell>
                  {payment.paidAt ? new Date(payment.paidAt).toLocaleDateString('pt-BR') : '-'}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">Ver</Button>
                    {payment.status === 'pending' && (
                      <Button size="sm">Pagar</Button>
                    )}
                    {payment.status === 'paid' && payment.receiptUrl && (
                      <Button size="sm" variant="outline">Recibo</Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PaymentsTab;
