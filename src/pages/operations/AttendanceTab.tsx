
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockAttendance, mockDrivers } from '@/services/mockData';

const AttendanceTab = () => {
  // Get the current date
  const today = new Date().toISOString().split('T')[0];
  
  // Filter attendance records for today
  const todayAttendance = mockAttendance.filter(record => record.date === '2023-05-03');
  
  // Function to find driver name by ID
  const getDriverName = (driverId: string) => {
    const driver = mockDrivers.find(d => d.id === driverId);
    return driver ? driver.name : 'Desconhecido';
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Controle de Frequência</h2>
        <div className="flex space-x-2">
          <Button variant="outline">Filtrar</Button>
          <Button>Registrar Entrada/Saída</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Entregadores Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDrivers.filter(d => d.active).length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Entradas Registradas Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayAttendance.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total de KM Registrados (Mês)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockAttendance.reduce((sum, record) => sum + (record.totalKm || 0), 0)} km
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Registros Recentes</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Entregador</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Entrada</TableHead>
              <TableHead>Saída</TableHead>
              <TableHead>KM Inicial</TableHead>
              <TableHead>KM Final</TableHead>
              <TableHead>Total KM</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAttendance.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{getDriverName(record.driverId)}</TableCell>
                <TableCell>{record.date}</TableCell>
                <TableCell>{record.checkIn}</TableCell>
                <TableCell>{record.checkOut || '-'}</TableCell>
                <TableCell>{record.startKm}</TableCell>
                <TableCell>{record.endKm || '-'}</TableCell>
                <TableCell>{record.totalKm ? `${record.totalKm} km` : '-'}</TableCell>
                <TableCell>
                  <Badge variant={record.validated ? 'default' : 'outline'}>
                    {record.validated ? 'Validado' : 'Pendente'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">Editar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AttendanceTab;
