
import React from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(3, { message: 'Nome completo é obrigatório' }),
  nickname: z.string().optional(),
  rg: z.string().min(7, { message: 'RG inválido' }),
  cpf: z.string().min(11, { message: 'CPF inválido' }),
  phone: z.string().min(10, { message: 'Telefone inválido' }),
  emergencyContact: z.string().min(10, { message: 'Contato de emergência inválido' }),
  city: z.string().min(2, { message: 'Cidade atual é obrigatória' }),
  motherName: z.string().min(3, { message: 'Nome completo da mãe é obrigatório' }),
  vehiclePlate: z.string().optional(),
  videoUrl: z.string().optional(),
  technicalNotes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddCandidateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddCandidateModal: React.FC<AddCandidateModalProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      nickname: '',
      rg: '',
      cpf: '',
      phone: '',
      emergencyContact: '',
      city: '',
      motherName: '',
      vehiclePlate: '',
      videoUrl: '',
      technicalNotes: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    // In a real app, this would save to a database
    console.log('Submitted candidate data:', data);
    
    toast({
      title: "Candidato adicionado",
      description: "O candidato foi adicionado com sucesso.",
    });
    
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Adicionar Novo Candidato</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o nome completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apelido (se tiver)</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o apelido" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="rg"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RG</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o RG" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o CPF" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o telefone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="emergencyContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contato de Emergência</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o contato de emergência" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade Atual</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite a cidade atual" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="motherName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo da Mãe</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o nome completo da mãe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="vehiclePlate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Placa da Moto</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite a placa da moto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL do Vídeo (enviado pelo chat)</FormLabel>
                  <FormControl>
                    <Input placeholder="Cole o link do vídeo enviado" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="technicalNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Informações das Perguntas Técnicas</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Adicione informações sobre as perguntas técnicas feitas pelo chat" 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="bg-slate-100 p-4 rounded-md">
              <h3 className="text-sm font-medium mb-2">Status do Candidato:</h3>
              <p className="text-sm text-indigo-600 font-medium">Novo Cadastro</p>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                Cadastrar Candidato
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
