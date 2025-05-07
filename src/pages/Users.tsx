
import React, { useState } from 'react';
import { MainLayout } from '@/components/Layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit2, Trash2, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { User, UserRole } from '@/types/users';
import { mockUsers } from '@/services/mockData';
import { toast } from '@/components/ui/use-toast';

const Users = () => {
  const { currentUser, hasPermission } = useAuth();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState<Partial<User>>({
    name: '',
    email: '',
    password: '',
    role: 'suporte',
    active: true
  });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast({
        title: "Erro ao adicionar usuário",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const userWithId: User = {
      id: `user-${Date.now()}`,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      role: newUser.role as UserRole,
      createdAt: new Date().toISOString(),
      active: true
    };

    setUsers([...users, userWithId]);
    setIsAddDialogOpen(false);
    setNewUser({
      name: '',
      email: '',
      password: '',
      role: 'suporte',
      active: true
    });

    toast({
      title: "Usuário adicionado",
      description: `${userWithId.name} foi adicionado com sucesso.`
    });
  };

  const getRoleName = (role: UserRole) => {
    const roleNames = {
      admin: 'Administrador',
      gestor: 'Gestor',
      suporte: 'Suporte'
    };
    return roleNames[role];
  };

  const getRoleBadge = (role: UserRole) => {
    const roleStyles = {
      admin: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
      gestor: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      suporte: 'bg-green-100 text-green-800 hover:bg-green-200'
    };
    return (
      <Badge className={roleStyles[role]}>
        {getRoleName(role)}
      </Badge>
    );
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Usuários</h1>
            <p className="text-muted-foreground">
              Gerencie os usuários do sistema e suas permissões.
            </p>
          </div>
          
          {hasPermission('manageUsers') && (
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gradient-blue text-white">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Adicionar Usuário
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Adicionar novo usuário</DialogTitle>
                  <DialogDescription>
                    Preencha os dados para criar um novo usuário no sistema.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right text-sm" htmlFor="name">Nome</label>
                    <Input
                      id="name"
                      className="col-span-3"
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right text-sm" htmlFor="email">Email</label>
                    <Input
                      id="email"
                      type="email"
                      className="col-span-3"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right text-sm" htmlFor="password">Senha</label>
                    <Input
                      id="password"
                      type="password"
                      className="col-span-3"
                      value={newUser.password}
                      onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label className="text-right text-sm" htmlFor="role">Perfil</label>
                    <Select 
                      value={newUser.role} 
                      onValueChange={(value) => setNewUser({...newUser, role: value as UserRole})}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecione um perfil" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrador</SelectItem>
                        <SelectItem value="gestor">Gestor</SelectItem>
                        <SelectItem value="suporte">Suporte</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancelar</Button>
                  <Button className="gradient-blue text-white" onClick={handleAddUser}>Adicionar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <Card className="shadow-lg border-gray-200/60">
          <CardHeader className="bg-gray-50/50 rounded-t-xl">
            <CardTitle>Lista de Usuários</CardTitle>
            <CardDescription>
              {users.length} usuários cadastrados no sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Perfil</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50/50">
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>
                      <Badge className={user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {user.active ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {hasPermission('update') && (
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-indigo-600">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        )}
                        {hasPermission('delete') && user.id !== currentUser?.id && (
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Users;
