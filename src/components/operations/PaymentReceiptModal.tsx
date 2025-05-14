
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Payment } from '@/types/operations';
import { Download, Share } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface PaymentReceiptModalProps {
  payment: Payment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PaymentReceiptModal: React.FC<PaymentReceiptModalProps> = ({
  payment,
  open,
  onOpenChange
}) => {
  if (!payment) return null;

  // Format currency in BRL
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    // In a real implementation, this would connect to WhatsApp API
    // For now, let's just show a toast
    toast({
      title: "Compartilhado com sucesso",
      description: `Recibo de pagamento enviado para ${payment.driverName} via WhatsApp.`,
    });
  };

  const handleSendToFinance = () => {
    toast({
      title: "Enviado com sucesso",
      description: "Recibo encaminhado para o departamento financeiro.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Recibo de Pagamento</DialogTitle>
          <DialogDescription>
            Detalhes do pagamento para {payment.driverName}
          </DialogDescription>
        </DialogHeader>
        
        <div className="border rounded-md p-6 my-4 print:border-black">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-bold text-lg">RECIBO DE PAGAMENTO</h3>
              <p className="text-sm text-muted-foreground">Nº {payment.id.substring(0, 8).toUpperCase()}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">Data de Emissão:</p>
              <p>{formatDate(new Date().toISOString())}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Entregador:</p>
                <p>{payment.driverName}</p>
              </div>
              <div>
                <p className="font-medium">Tipo de Entregador:</p>
                <p>{payment.driverType === 'fixed' ? 'Fixo' : 'Esporádico'}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Período:</p>
                <p>{formatDate(payment.period.start)} a {formatDate(payment.period.end)}</p>
              </div>
              <div>
                <p className="font-medium">Status:</p>
                <p>{payment.status === 'paid' ? 'Pago' : 'Pendente'}</p>
              </div>
            </div>
            
            {payment.clientName && (
              <div>
                <p className="font-medium">Cliente:</p>
                <p>{payment.clientName}</p>
              </div>
            )}
            
            <div className="border-t pt-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                {payment.totalKm && (
                  <>
                    <div>
                      <p className="font-medium">Total KM:</p>
                      <p>{payment.totalKm} km</p>
                    </div>
                    {payment.ratePerKm && (
                      <div>
                        <p className="font-medium">Valor por KM:</p>
                        <p>{formatCurrency(payment.ratePerKm)}</p>
                      </div>
                    )}
                  </>
                )}
                
                {payment.totalDeliveries && (
                  <>
                    <div>
                      <p className="font-medium">Total Entregas:</p>
                      <p>{payment.totalDeliveries}</p>
                    </div>
                    {payment.ratePerDelivery && (
                      <div>
                        <p className="font-medium">Valor por Entrega:</p>
                        <p>{formatCurrency(payment.ratePerDelivery)}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
              
              <div className="border-t border-b py-4 my-4">
                <div className="flex justify-between items-center">
                  <p className="font-bold">Valor Total:</p>
                  <p className="font-bold text-xl">{formatCurrency(payment.totalAmount)}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-8 mt-8">
                <div className="border-t pt-2">
                  <p className="text-center">Assinatura do Pagador</p>
                </div>
                <div className="border-t pt-2">
                  <p className="text-center">Assinatura do Recebedor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button onClick={handleSendToFinance} variant="outline" className="sm:mr-auto">
            Enviar para Financeiro
          </Button>
          <Button onClick={handleShare} variant="secondary">
            <Share className="mr-2 h-4 w-4" />
            Enviar via WhatsApp
          </Button>
          <Button onClick={handlePrint}>
            <Download className="mr-2 h-4 w-4" />
            Baixar PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentReceiptModal;
