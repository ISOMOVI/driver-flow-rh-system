
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

const formSchema = z.object({
  cnpj: z.string().min(14, { message: 'CNPJ inválido' }),
  name: z.string().min(3, { message: 'Razão social é obrigatória' }),
  address: z.string().min(5, { message: 'Endereço é obrigatório' }),
  contactName: z.string().min(3, { message: 'Nome do responsável é obrigatório' }),
  contactPhone: z.string().min(10, { message: 'Telefone inválido' }),
  contactEmail: z.string().email({ message: 'E-mail inválido' }),
  value: z.string().min(1, { message: 'Valor é obrigatório' }),
});

type FormValues = z.infer<typeof formSchema>;

interface AddClientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddClientModal: React.FC<AddClientModalProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cnpj: '',
      name: '',
      address: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      value: '',
    },
  });

  const fetchCompanyData = async () => {
    const cnpj = form.getValues('cnpj');
    
    if (!cnpj || cnpj.length < 14) {
      toast({
        title: "CNPJ inválido",
        description: "Por favor, insira um CNPJ válido.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call to fetch company data from Brazil's tax authority
      // In a real app, this would call an actual API
      setTimeout(() => {
        const mockCompanyData = {
          name: "EMPRESA SIMULADA LTDA",
          address: "Av. Paulista, 1000, São Paulo - SP",
        };
        
        form.setValue('name', mockCompanyData.name);
        form.setValue('address', mockCompanyData.address);
        
        toast({
          title: "Dados importados",
          description: "Dados da empresa foram importados com sucesso.",
        });
        
        setLoading(false);
      }, 1500);
    } catch (error) {
      toast({
        title: "Erro ao buscar dados",
        description: "Não foi possível buscar os dados da empresa.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Adicionar Novo Cliente</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="cnpj"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>CNPJ</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input placeholder="Digite o CNPJ" {...field} />
                      </FormControl>
                      <Button 
                        type="button" 
                        onClick={fetchCompanyData} 
                        disabled={loading}
                        className="whitespace-nowrap"
                      >
                        {loading ? "Buscando..." : "Buscar Dados"}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Razão Social</FormLabel>
                    <FormControl>
                      <Input placeholder="Razão social (importada)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o valor" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input placeholder="Endereço (importado)" {...field} />
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
                      <Input placeholder="Digite o telefone do responsável" {...field} />
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
                      <Input placeholder="Digite o e-mail do responsável" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
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
