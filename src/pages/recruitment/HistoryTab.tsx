
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockCandidates, mockDrivers } from '@/services/mockData';
import { ExportHistoryModal } from '@/components/recruitment/ExportHistoryModal';

const HistoryTab = () => {
  const [exportModalOpen, setExportModalOpen] = useState(false);
  
  console.log("Rendering HistoryTab");
  
  // Combining all candidates and drivers for history
  const allCandidates = [...mockCandidates, ...mockDrivers];
  
  // Sort by most recent
  const sortedCandidates = [...allCandidates].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  
  console.log(`HistoryTab: Found ${sortedCandidates.length} candidates/drivers`);
  
  // Helper function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="default">Aprovado</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejeitado</Badge>;
      default:
        return <Badge variant="outline">Em Processo</Badge>;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Histórico de Candidatos</h2>
        <Button 
          variant="outline" 
          onClick={() => setExportModalOpen(true)}
          className="border-indigo-200 text-indigo-700 hover:text-indigo-800 hover:bg-indigo-50"
        >
          Exportar
        </Button>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data do Cadastro</TableHead>
              <TableHead>Última Atualização</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCandidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell className="font-medium">{candidate.name}</TableCell>
                <TableCell>{candidate.email}</TableCell>
                <TableCell>{getStatusBadge(candidate.status)}</TableCell>
                <TableCell>
                  {new Date(candidate.createdAt).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>
                  {new Date(candidate.updatedAt).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">Ver Detalhes</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <ExportHistoryModal
        open={exportModalOpen}
        onOpenChange={setExportModalOpen}
      />
    </div>
  );
};

export default HistoryTab;
