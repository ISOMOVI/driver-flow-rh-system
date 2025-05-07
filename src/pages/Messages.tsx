
import React, { useState } from 'react';
import { MainLayout } from '@/components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Search, Send, Paperclip, Smile, Users, Phone, MessageSquare, FileText } from 'lucide-react';
import { mockCandidates, mockDrivers } from '@/services/mockData';

const Messages = () => {
  const [activeChannel, setActiveChannel] = useState('recruitment');
  const [selectedChat, setSelectedChat] = useState('');
  const [messageInput, setMessageInput] = useState('');

  // Combine candidates and drivers for contacts
  const contacts = [
    ...mockCandidates.map(c => ({
      id: c.id,
      name: c.name,
      photo: null,
      lastMessage: 'Envie o formulário para continuar o processo...',
      timestamp: '10:30',
      unread: Math.floor(Math.random() * 3),
      type: 'candidate',
      status: c.status
    })),
    ...mockDrivers.map(d => ({
      id: d.id,
      name: d.name,
      photo: null,
      lastMessage: 'Boa tarde! Consegui registrar os KMs de hoje.',
      timestamp: '12:45',
      unread: Math.floor(Math.random() * 2),
      type: 'driver',
      active: d.active
    }))
  ];

  // Filter contacts based on active channel
  const filteredContacts = contacts.filter(contact => {
    if (activeChannel === 'recruitment') {
      return contact.type === 'candidate';
    } else if (activeChannel === 'operations') {
      return contact.type === 'driver';
    }
    return true;
  });

  // Mock messages for the selected chat
  const mockMessages = [
    {
      id: '1',
      text: 'Olá! Tudo bem?',
      sender: 'user',
      timestamp: '10:30',
      status: 'read'
    },
    {
      id: '2',
      text: 'Estou bem, obrigado! Como posso ajudá-lo hoje?',
      sender: 'contact',
      timestamp: '10:31',
      status: 'read'
    },
    {
      id: '3',
      text: 'Precisamos de algumas informações adicionais para o seu cadastro.',
      sender: 'user',
      timestamp: '10:32',
      status: 'read'
    },
    {
      id: '4',
      text: 'Claro, o que vocês precisam?',
      sender: 'contact',
      timestamp: '10:33',
      status: 'read'
    },
    {
      id: '5',
      text: 'Vou enviar um link para você preencher o formulário completo. É importante que todos os campos sejam preenchidos corretamente.',
      sender: 'user',
      timestamp: '10:35',
      status: 'read'
    },
    {
      id: '6',
      text: 'Após o preenchimento, precisaremos de um vídeo curto de apresentação.',
      sender: 'user',
      timestamp: '10:36',
      status: 'delivered'
    }
  ];

  // Handle sending a new message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim() !== '') {
      // Here would be the logic to actually send the message
      console.log('Message sent:', messageInput);
      setMessageInput('');
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Mensagens</h1>
          <p className="text-muted-foreground">
            Central de mensagens e comunicação com entregadores.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[75vh]">
          {/* Left side - Contacts */}
          <Card className="lg:col-span-1">
            <CardHeader className="p-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Contatos</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Users size={18} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageSquare size={18} />
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar contato..." className="pl-8" />
              </div>
              <Tabs value={activeChannel} onValueChange={setActiveChannel} className="mt-2">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="recruitment">Recrutamento</TabsTrigger>
                  <TabsTrigger value="operations">Operacional</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(75vh-12rem)]">
                {filteredContacts.map((contact) => (
                  <React.Fragment key={contact.id}>
                    <div 
                      className={`flex items-center p-3 hover:bg-accent cursor-pointer ${selectedChat === contact.id ? 'bg-accent' : ''}`}
                      onClick={() => setSelectedChat(contact.id)}
                    >
                      <Avatar className="h-10 w-10 mr-3">
                        {contact.photo ? (
                          <img src={contact.photo} alt={contact.name} />
                        ) : (
                          <div className="bg-primary text-primary-foreground h-full w-full flex items-center justify-center text-sm font-semibold">
                            {contact.name.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <span className="font-medium truncate">{contact.name}</span>
                          <span className="text-xs text-muted-foreground">{contact.timestamp}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground truncate">
                            {contact.lastMessage}
                          </span>
                          {contact.unread > 0 && (
                            <Badge variant="default" className="ml-1 rounded-full h-5 w-5 flex items-center justify-center p-0">
                              {contact.unread}
                            </Badge>
                          )}
                        </div>
                        <div className="mt-1">
                          {contact.type === 'candidate' && (
                            <Badge variant="outline" className="text-xs">
                              {(contact as any).status || 'Novo'}
                            </Badge>
                          )}
                          {contact.type === 'driver' && (
                            <Badge variant={(contact as any).active ? 'default' : 'outline'} className="text-xs">
                              {(contact as any).active ? 'Ativo' : 'Inativo'}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <Separator />
                  </React.Fragment>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Right side - Chat */}
          <Card className="lg:col-span-2">
            {selectedChat ? (
              <>
                <CardHeader className="p-4 border-b flex flex-row items-center space-y-0">
                  <div className="flex items-center flex-1">
                    <Avatar className="h-10 w-10 mr-3">
                      <div className="bg-primary text-primary-foreground h-full w-full flex items-center justify-center text-sm font-semibold">
                        {filteredContacts.find(c => c.id === selectedChat)?.name.substring(0, 2).toUpperCase() || ''}
                      </div>
                    </Avatar>
                    <div>
                      <CardTitle>{filteredContacts.find(c => c.id === selectedChat)?.name || ''}</CardTitle>
                      <CardDescription className="flex items-center">
                        Online • Última visualização às 12:45
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Phone size={18} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <FileText size={18} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Search size={18} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[calc(75vh-20rem)]">
                    <div className="p-4 space-y-4">
                      {mockMessages.map(message => (
                        <div 
                          key={message.id}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[70%] p-3 rounded-lg ${
                              message.sender === 'user' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-accent'
                            }`}
                          >
                            <p>{message.text}</p>
                            <div className="flex justify-end items-center mt-1 space-x-1">
                              <span className="text-xs opacity-70">
                                {message.timestamp}
                              </span>
                              {message.sender === 'user' && (
                                <span className="text-xs opacity-70">
                                  {message.status === 'read' ? '✓✓' : '✓'}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <form onSubmit={handleSendMessage} className="p-4 border-t">
                    <div className="flex items-end space-x-2">
                      <Button type="button" variant="ghost" size="sm">
                        <Paperclip size={18} />
                      </Button>
                      <Input 
                        className="flex-1"
                        placeholder="Digite uma mensagem..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                      />
                      <Button type="button" variant="ghost" size="sm">
                        <Smile size={18} />
                      </Button>
                      <Button type="submit" disabled={!messageInput.trim()}>
                        <Send size={18} />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <MessageSquare size={48} className="text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Nenhuma conversa selecionada</h3>
                <p className="text-muted-foreground">
                  Selecione uma conversa para começar a trocar mensagens.
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Messages;
