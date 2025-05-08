
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockDrivers } from '@/services/mockData';
import { AttendanceFilterModal } from '@/components/operations/AttendanceFilterModal';

// Simulated attendance data
const mockAttendance = [
  {
    id: 'att-1',
    driverId: mockDrivers[0].id,
    driverName: mockDrivers[0].name,
    date: '2025-04-20',
    checkIn: '08:00',
    checkOut: '17:30',
    startKm: 5000,
    endKm: 5120,
    totalKm: 120,
    validated: true,
    clientId: 'client-1',
    clientName: 'Empresa A',
  },
  {
    id: 'att-2',
    driverId: mockDrivers[1].id,
    driverName: mockDrivers[1].name,
    date: '2025-04-20',
    checkIn: '07:45',
    checkOut: '16:15',
    startKm: 12500,
    endKm: 12640,
    totalKm: 140,
    validated: true,
    clientId: 'client-2',
    clientName: 'Empresa B',
  },
  {
    id: 'att-3',
    driverId: mockDrivers[2].id,
    driverName: mockDrivers[2].name,
    date: '2025-04-20',
    checkIn: '09:00',
    checkOut: '18:30',
    startKm: 8700,
    endKm: 8800,
    totalKm: 100,
    validated: false,
    clientId: 'client-1',
    clientName: 'Empresa A',
  },
  {
    id: 'att-4',
    driverId: mockDrivers[0].id,
    driverName: mockDrivers[0].name,
    date: '2025-04-19',
    checkIn: '08:15',
    checkOut: '17:45',
    startKm: 4880,
    endKm: 5000,
    totalKm: 120,
    validated: true,
    clientId: 'client-1',
    clientName: 'Empresa A',
  },
];

const AttendanceTab = () => {
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filteredAttendance, setFilteredAttendance] = useState(mockAttendance);
  const [activeFilters, setActiveFilters] = useState<{
    startDate?: Date;
    endDate?: Date;
    driverId?: string;
    status?: 'all' | 'validated' | 'pending';
  }>({});
  
  const applyFilter = (filters: any) => {
    let filtered = [...mockAttendance];
    
    // Filter by date range
    if (filters.startDate) {
      filtered = filtered.filter(att => new Date(att.date) >= filters.startDate);
    }
    
    if (filters.endDate) {
      filtered = filtered.filter(att => new Date(att.date) <= filters.endDate);
    }
    
    // Filter by driver
    if (filters.driverId) {
      filtered = filtered.filter(att => att.driverId === filters.driverId);
    }
    
    // Filter by validation status
    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(att => {
        if (filters.status === 'validated') return att.validated;
        if (filters.status === 'pending') return !att.validated;
        return true;
      });
    }
    
    setFilteredAttendance(filtered);
    setActiveFilters(filters);
  };
  
  const clearFilters = () => {
    setFilteredAttendance(mockAttendance);
    setActiveFilters({});
  };
  
  const hasActiveFilters = Object.keys(activeFilters).some(
    key => activeFilters[key as keyof typeof activeFilters] !== undefined
  );
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Registro de Frequência</h2>
        <div className="flex gap-2">
          {hasActiveFilters && (
            <Button 
              variant="outline" 
              onClick={clearFilters}
              className="border-red-200 text-red-700 hover:bg-red-50"
            >
              Limpar Filtros
            </Button>
          )}
          <Button 
            onClick={() => setFilterModalOpen(true)} 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md"
          >
            Filtrar
          </Button>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Entregador</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Entrada</TableHead>
            <TableHead>Saída</TableHead>
            <TableHead>KMs</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAttendance.map((attendance) => (
            <TableRow key={attendance.id}>
              <TableCell>
                {new Date(attendance.date).toLocaleDateString('pt-BR')}
              </TableCell>
              <TableCell className="font-medium">{attendance.driverName}</TableCell>
              <TableCell>{attendance.clientName}</TableCell>
              <TableCell>{attendance.checkIn}</TableCell>
              <TableCell>{attendance.checkOut}</TableCell>
              <TableCell>{attendance.totalKm} km</TableCell>
              <TableCell>
                <Badge variant={attendance.validated ? "default" : "outline"}>
                  {attendance.validated ? "Validado" : "Pendente"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Ver</Button>
                  {!attendance.validated && (
                    <Button variant="outline" size="sm">Validar</Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <AttendanceFilterModal 
        open={filterModalOpen}
        onOpenChange={setFilterModalOpen}
        onApplyFilter={applyFilter}
      />
    </div>
  );
};

export default AttendanceTab;
