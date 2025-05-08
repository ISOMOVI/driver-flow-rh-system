
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { mockAttendance, mockDrivers } from '@/services/mockData';
import { Filter, CalendarRange } from 'lucide-react';
import { AttendanceFilterModal } from '@/components/operations/AttendanceFilterModal';

const AttendanceTab = () => {
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    startDate: undefined,
    endDate: undefined,
    driverId: undefined,
    status: 'all'
  });
  
  console.log("Rendering AttendanceTab with filters:", filters);
  
  // Apply filters to the attendance records
  const filteredAttendance = mockAttendance.filter(record => {
    // Filter by driver ID
    if (filters.driverId && record.driverId !== filters.driverId) {
      return false;
    }
    
    // Filter by status
    if (filters.status === 'validated' && !record.validated) {
      return false;
    }
    if (filters.status === 'pending' && record.validated) {
      return false;
    }
    
    // Filter by date range
    if (filters.startDate) {
      const recordDate = new Date(record.date);
      const startDate = new Date(filters.startDate);
      if (recordDate < startDate) {
        return false;
      }
    }
    
    if (filters.endDate) {
      const recordDate = new Date(record.date);
      const endDate = new Date(filters.endDate);
      if (recordDate > endDate) {
        return false;
      }
    }
    
    return true;
  });
  
  // Get driver name by ID
  const getDriverName = (driverId: string) => {
    const driver = mockDrivers.find(d => d.id === driverId);
    return driver ? driver.name : 'Desconhecido';
  };
  
  const handleFilterChange = (newFilters: any) => {
    console.log("Applying filters:", newFilters);
    setFilters(newFilters);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Registro de Frequência</h2>
        <Button 
          onClick={() => setFilterModalOpen(true)} 
          variant="outline"
          className="border-indigo-200 text-indigo-700 hover:text-indigo-800 hover:bg-indigo-50"
        >
          <Filter className="w-4 h-4 mr-2" /> Filtrar
        </Button>
      </div>
      
      {(filters.startDate || filters.endDate || filters.driverId || filters.status !== 'all') && (
        <div className="bg-blue-50 p-3 rounded-md flex items-center justify-between">
          <div className="text-sm text-blue-700">
            <span className="font-medium">Filtros aplicados:</span>
            {filters.driverId && (
              <span className="ml-2">Entregador: {getDriverName(filters.driverId)}</span>
            )}
            {filters.status !== 'all' && (
              <span className="ml-2">Status: {filters.status === 'validated' ? 'Validados' : 'Pendentes'}</span>
            )}
            {(filters.startDate || filters.endDate) && (
              <span className="ml-2">
                <CalendarRange className="inline w-3 h-3 mr-1" />
                Período: {filters.startDate ? new Date(filters.startDate).toLocaleDateString('pt-BR') : 'início'} até {filters.endDate ? new Date(filters.endDate).toLocaleDateString('pt-BR') : 'hoje'}
              </span>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setFilters({
              startDate: undefined,
              endDate: undefined,
              driverId: undefined,
              status: 'all'
            })}
            className="text-blue-700 hover:bg-blue-100"
          >
            Limpar Filtros
          </Button>
        </div>
      )}
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Entregador</TableHead>
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
            {filteredAttendance.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.date}</TableCell>
                <TableCell className="font-medium">{getDriverName(record.driverId)}</TableCell>
                <TableCell>{record.checkIn}</TableCell>
                <TableCell>{record.checkOut || '-'}</TableCell>
                <TableCell>{record.startKm}</TableCell>
                <TableCell>{record.endKm || '-'}</TableCell>
                <TableCell>{record.totalKm || '-'}</TableCell>
                <TableCell>
                  {record.validated ? (
                    <Badge variant="default">Validado</Badge>
                  ) : (
                    <Badge variant="outline">Pendente</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">Ver</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <AttendanceFilterModal
        open={filterModalOpen}
        onOpenChange={setFilterModalOpen}
        onFilter={handleFilterChange}
      />
    </div>
  );
};

export default AttendanceTab;
