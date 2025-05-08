
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockCandidates } from '@/services/mockData';
import { AddCandidateModal } from '@/components/recruitment/AddCandidateModal';

// Helper function to convert status to human-readable text
const getStatusDisplay = (status: string) => {
  const statusMap: Record<string, { text: string; variant: 'default' | 'secondary' | 'outline' | 'destructive' }> = {
    new: { text: 'Novo', variant: 'default' },
    form_sent: { text: 'Formulário Enviado', variant: 'secondary' },
    form_completed: { text: 'Formulário Completo', variant: 'secondary' },
    video_requested: { text: 'Vídeo Solicitado', variant: 'outline' },
    video_received: { text: 'Vídeo Recebido', variant: 'outline' },
    approved: { text: 'Aprovado', variant: 'default' },
    rejected: { text: 'Rejeitado', variant: 'destructive' }
  };
  
  return statusMap[status] || { text: status, variant: 'default' };
};

const CandidatesTab = () => {
  console.log("Rendering CandidatesTab");
  const [addModalOpen, setAddModalOpen] = useState(false);
  
  // Filter candidates that are in process (not approved or rejected)
  const activeCandidates = mockCandidates.filter(
    candidate => !['approved', 'rejected'].includes(candidate.status)
  );
  
  console.log(`CandidatesTab: Found ${activeCandidates.length} active candidates`);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Candidatos em Processo</h2>
        <Button 
          onClick={() => setAddModalOpen(true)} 
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md"
        >
          Adicionar Candidato
        </Button>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Cidade</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data de Cadastro</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activeCandidates.map((candidate) => {
            const status = getStatusDisplay(candidate.status);
            
            return (
              <TableRow key={candidate.id}>
                <TableCell className="font-medium">{candidate.name}</TableCell>
                <TableCell>{candidate.phone}</TableCell>
                <TableCell>{candidate.city}</TableCell>
                <TableCell>
                  <Badge variant={status.variant}>{status.text}</Badge>
                </TableCell>
                <TableCell>
                  {new Date(candidate.createdAt).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Ver</Button>
                    <Button variant="outline" size="sm">WhatsApp</Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      
      <AddCandidateModal 
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
      />
    </div>
  );
};

export default CandidatesTab;
