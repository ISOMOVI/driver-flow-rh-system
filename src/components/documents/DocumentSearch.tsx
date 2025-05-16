
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

export const DocumentSearch = () => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="relative w-64">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar documentos..." className="pl-8" />
      </div>
      <Button variant="outline" className="flex items-center">
        <Filter className="mr-2 h-4 w-4" /> Filtros
      </Button>
    </div>
  );
};
