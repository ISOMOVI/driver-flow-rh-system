import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Download, FileText, Upload, Filter } from 'lucide-react';
import { mockPayments } from '@/services/mockData';
import { Payment } from '@/types/operations';
import PaymentReceiptModal from '@/components/operations/PaymentReceiptModal';
import { toast } from '@/components/ui/use-toast';

const PaymentsTab = () => {
  const [activeTab, setActiveTab] = useState('fixed');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  
  // Filter payments by driver type
  const fixedDriverPayments = mockPayments.filter(payment => payment.driverType === 'fixed');
  const sporadicDriverPayments = mockPayments.filter(payment => payment.driverType === 'sporadic');
  
  const currentPayments = activeTab === 'fixed' ? fixedDriverPayments : sporadicDriverPayments;
  
  // Calculate pending payments amount
  const pendingAmount = currentPayments
    .filter(payment => payment.status === 'pending')
    .reduce((sum, payment) => sum + payment.totalAmount, 0);
  
  // Calculate paid payments amount
  const paidAmount = currentPayments
    .filter(payment => payment.status === 'paid')
    .reduce((sum, payment) => sum + payment.totalAmount, 0);
  
  // Get number of payments last month
  const lastMonthPayments = currentPayments.filter(payment => {
    const date = new Date(payment.createdAt);
    const now = new Date();
    return date.getMonth() === now.getMonth() - 1 || 
      (now.getMonth() === 0 && date.getMonth() === 11);
  }).length;
  
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
      case 'processing':
        return <Badge variant="secondary">Processando</Badge>;
      case 'canceled':
        return <Badge variant="destructive">Cancelado</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };
  
  // Handle viewing receipt
  const handleViewReceipt = (payment: Payment) => {
    setSelectedPayment(payment);
    setReceiptModalOpen(true);
  };
  
  // Handle payment process
  const handlePayment = (payment: Payment) => {
    // In a real implementation, we'd process the payment
    // For now, just show a toast
    toast({
      title: "Pagamento processado",
      description: `Pagamento para ${payment.driverName} processado com sucesso.`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Gerenciamento de Pagamentos</h2>
        <div className="flex space-x-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Relatórios
          </Button>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Gerar Pagamento
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="fixed">Entregadores Fixos</TabsTrigger>
          <TabsTrigger value="sporadic">Entregadores Esporádicos</TabsTrigger>
        </TabsList>
        
        {/* Fixed Drivers Tab */}
        <TabsContent value="fixed" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">KM Total (Mês)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {fixedDriverPayments.reduce((sum, payment) => sum + (payment.totalKm || 0), 0)} km
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">Pagamentos - Entregadores Fixos</h3>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtrar
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Entregador</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Período</TableHead>
                    <TableHead>Total KM</TableHead>
                    <TableHead>Valor por KM</TableHead>
                    <TableHead>Valor Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data de Pagamento</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fixedDriverPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.driverName}</TableCell>
                      <TableCell>{payment.clientName || 'Não vinculado'}</TableCell>
                      <TableCell>
                        {formatDate(payment.period.start)} a {formatDate(payment.period.end)}
                      </TableCell>
                      <TableCell>{payment.totalKm || 0} km</TableCell>
                      <TableCell>{payment.ratePerKm ? formatCurrency(payment.ratePerKm) : '-'}</TableCell>
                      <TableCell className="font-medium">{formatCurrency(payment.totalAmount)}</TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell>
                        {payment.paidAt ? formatDate(payment.paidAt) : '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleViewReceipt(payment)}
                          >
                            Ver Recibo
                          </Button>
                          {payment.status === 'pending' && (
                            <Button 
                              size="sm"
                              onClick={() => handlePayment(payment)}
                            >
                              Pagar
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Sporadic Drivers Tab */}
        <TabsContent value="sporadic" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                <CardTitle className="text-sm font-medium">Pagamentos Mês Anterior</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{lastMonthPayments}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Entregas (Mês)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {sporadicDriverPayments.reduce((sum, payment) => sum + (payment.totalDeliveries || 0), 0)}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">Pagamentos - Entregadores Esporádicos</h3>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Importar Planilha
              </Button>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Entregador</TableHead>
                    <TableHead>Período</TableHead>
                    <TableHead>Total Entregas</TableHead>
                    <TableHead>Valor por Entrega</TableHead>
                    <TableHead>Valor Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data de Pagamento</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sporadicDriverPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.driverName}</TableCell>
                      <TableCell>
                        {formatDate(payment.period.start)} a {formatDate(payment.period.end)}
                      </TableCell>
                      <TableCell>{payment.totalDeliveries || 0}</TableCell>
                      <TableCell>{payment.ratePerDelivery ? formatCurrency(payment.ratePerDelivery) : '-'}</TableCell>
                      <TableCell className="font-medium">{formatCurrency(payment.totalAmount)}</TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell>
                        {payment.paidAt ? formatDate(payment.paidAt) : '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleViewReceipt(payment)}
                          >
                            Ver Recibo
                          </Button>
                          {payment.status === 'pending' && (
                            <Button 
                              size="sm"
                              onClick={() => handlePayment(payment)}
                            >
                              Pagar
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Payment Receipt Modal */}
      <PaymentReceiptModal 
        payment={selectedPayment} 
        open={receiptModalOpen} 
        onOpenChange={setReceiptModalOpen} 
      />
    </div>
  );
};

export default PaymentsTab;
