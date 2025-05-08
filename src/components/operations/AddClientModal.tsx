
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { SearchIcon } from 'lucide-react';

const formSchema = z.object({
  cnpj: z.string().min(14, { message: 'CNPJ inválido' }),
  companyName: z.string().min(3, { message: 'Razão social é obrigatória' }),
  address: z.string().min(5, { message: 'Endereço é obrigatório' }),
  contactName: z.string().min(3, { message: 'Nome do responsável é obrigatório' }),
  contactPhone: z.string().min(10, { message: 'Telefone inválido' }),
  contactEmail: z.string().email({ message: 'Email inválido' }),
  value: z.string().min(1, { message: 'Valor é obrigatório' }),
});

type FormValues = z.infer<typeof formSchema>;

interface AddClientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddClientModal: React.FC<AddClientModalProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [isSearching, setIsSearching] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cnpj: '',
      companyName: '',
      address: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      value: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    // In a real app, this would save to a database
    console.log('Submitted client data:', data);
    
    toast({
      title: "Cliente adicionado",
      description: "O cliente foi adicionado com sucesso.",
    });
    
    form.reset();
    onOpenChange(false);
  };

  const handleCnpjSearch = () => {
    const cnpj = form.getValues('cnpj');
    if (cnpj.length < 14) {
      toast({
        title: "CNPJ inválido",
        description: "Por favor, digite um CNPJ válido",
        variant: "destructive"
      });
      return;
    }
    
    setIsSearching(true);
    
    // Simulate API call to Receita Federal
    setTimeout(() => {
      // Mock data for demo purposes
      form.setValue('companyName', 'Empresa Exemplo Ltda.');
      form.setValue('address', 'Av. Paulista, 1000, São Paulo - SP');
      setIsSearching(false);
      
      toast({
        title: "CNPJ encontrado",
        description: "Dados carregados com sucesso",
      });
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Adicionar Novo Cliente</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <div className="flex gap-2 items-end">
              <FormField
                control={form.control}
                name="cnpj"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>CNPJ</FormLabel>
                    <FormControl>
                      <Input placeholder="00.000.000/0001-00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="button" 
                onClick={handleCnpjSearch}
                className="mb-[2px]"
                disabled={isSearching}
              >
                {isSearching ? "Buscando..." : <SearchIcon className="h-4 w-4" />}
              </Button>
            </div>
            
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Razão Social</FormLabel>
                  <FormControl>
                    <Input placeholder="Razão Social (importada)" {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input placeholder="Endereço (importado)" {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Responsável pelo Contrato</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome do responsável" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone do Responsável</FormLabel>
                    <FormControl>
                      <Input placeholder="(00) 00000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail do Responsável</FormLabel>
                    <FormControl>
                      <Input placeholder="email@exemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="R$ 0,00" 
                      {...field} 
                      onChange={(e) => {
                        // Basic formatting for currency input
                        const value = e.target.value.replace(/\D/g, '');
                        if (value) {
                          const numericValue = parseFloat(value) / 100;
                          field.onChange(`R$ ${numericValue.toFixed(2).replace('.', ',')}`);
                        } else {
                          field.onChange('');
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="bg-slate-100 p-4 rounded-md">
              <h3 className="text-sm font-medium mb-2">Status do Cliente:</h3>
              <p className="text-sm text-indigo-600 font-medium">Novo Cadastro</p>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                Cadastrar Cliente
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
