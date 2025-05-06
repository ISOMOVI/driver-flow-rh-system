
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockDrivers } from '@/services/mockData';

const ApprovedTab = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Candidatos Aprovados</h2>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Veículo</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Cliente Atual</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockDrivers.map((driver) => (
            <TableRow key={driver.id}>
              <TableCell className="font-medium">{driver.name}</TableCell>
              <TableCell>{driver.phone}</TableCell>
              <TableCell>
                {driver.formData?.vehicleType} {driver.formData?.vehiclePlate}
              </TableCell>
              <TableCell>
                <Badge variant={driver.active ? 'default' : 'outline'}>
                  {driver.active ? 'Ativo' : 'Inativo'}
                </Badge>
              </TableCell>
              <TableCell>
                {driver.clientId ? 'Empresa Vinculada' : 'Sem vínculo'}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Ver</Button>
                  <Button variant="outline" size="sm">WhatsApp</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApprovedTab;
