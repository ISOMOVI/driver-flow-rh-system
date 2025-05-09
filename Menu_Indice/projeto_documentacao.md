
# RH Entregadores - Documentação do Projeto

## Visão Geral do Projeto

O RH Entregadores é uma aplicação web para gerenciamento de entregadores, clientes e operações logísticas. A plataforma permite o recrutamento de novos entregadores, controle de frequência, gestão de clientes e pagamentos.

### Principais Funcionalidades:

- **Recrutamento**: Gerenciamento do fluxo de seleção de candidatos a entregadores
- **Operações**: Controle de frequência, clientes e pagamentos
- **Mensagens**: Sistema de comunicação com entregadores e candidatos
- **Empresas**: Gerenciamento de empresas parceiras
- **Documentos**: Controle de documentação de entregadores e clientes
- **Usuários**: Gestão de usuários do sistema com diferentes níveis de permissão

### Público-alvo:

- Gestores de RH
- Administradores de operações logísticas
- Supervisores de entregadores
- Equipe de suporte

## Diagrama de Arquitetura

```
+---------------------------+
|                           |
|       Componentes UI      |
|   (shadcn/ui + Tailwind)  |
|                           |
+------------+--------------+
             |
+------------v--------------+
|                           |
|     Páginas e Layouts     |
|                           |
+------------+--------------+
             |
+------------v--------------+
|                           |
|   Contextos e Hooks       |
|                           |
+------------+--------------+
             |
+------------v--------------+
|                           |
|    Serviços (MockData)    |
|                           |
+---------------------------+
```

## Estrutura de Diretórios

```
src/
├── components/       # Componentes da UI
│   ├── Dashboard/    # Componentes específicos para dashboard
│   ├── Layout/       # Layouts da aplicação
│   ├── Sidebar/      # Componentes da barra lateral
│   ├── operations/   # Componentes para a área de operações
│   ├── recruitment/  # Componentes para a área de recrutamento
│   └── ui/           # Componentes base do shadcn/ui
├── contexts/         # Contextos React (AuthContext, etc)
├── hooks/            # Custom Hooks
├── lib/              # Funções utilitárias
├── pages/            # Páginas da aplicação
│   ├── operations/   # Páginas de operações (attendance, clients, payments)
│   ├── recruitment/  # Páginas de recrutamento (candidates, approved, history)
│   └── settings/     # Páginas de configurações
├── services/         # Serviços e mock data
└── types/            # Definições de tipos TypeScript
```

## Stack Tecnológico

### Frontend:
- **React**: Biblioteca para construção de interfaces
- **React Router**: Roteamento da aplicação
- **TanStack Query**: Gerenciamento de estado e chamadas assíncronas
- **Tailwind CSS**: Framework CSS utilitário
- **shadcn/ui**: Componentes de UI reutilizáveis
- **Lucide Icons**: Biblioteca de ícones
- **React Hook Form**: Gerenciamento de formulários
- **Zod**: Validação de esquemas

## Relacionamento entre Componentes

### Padrões de Composição:
- **Layout + Conteúdo**: O `MainLayout` envolve todas as páginas autenticadas com a barra lateral e cabeçalho
- **Abas + Outlet**: As páginas principais (Recrutamento, Operações) usam um sistema de abas com React Router Outlet
- **Modais para CRUD**: Operações de criação e edição são feitas em modais (Ex: AddClientModal)

### Fluxo de Dados:
- **Contexto → Componente**: Dados de autenticação fluem do AuthContext para os componentes
- **Props Drilling**: Utilizado para passar dados para componentes filhos diretos
- **React Query**: Para gerenciamento de estado do servidor (futura implementação com APIs)

## Fluxo de Navegação

### Estrutura de Rotas:
- **Rota Pública**: /login
- **Rota Principal**: / (dashboard)
- **Rotas Protegidas**:
  - /recruitment - Gestão de recrutamento (candidates, approved, history)
  - /operations - Operações (attendance, clients, payments)
  - /messages - Sistema de mensagens
  - /companies - Gestão de empresas
  - /documents - Gestão de documentos
  - /users - Gerenciamento de usuários (requer permissão especial)
  - /settings - Configurações (profile, security, notifications, integrations)

### Proteção de Rotas:
- Todas as rotas exceto /login são protegidas pelo componente `ProtectedRoute`
- Certas rotas (ex: /users) requerem permissões específicas

## Sistema de Autenticação

### Roles e Permissões:
- **admin**: Acesso completo a todas as funcionalidades
- **gestor**: Acesso limitado a criação, leitura e atualização
- **suporte**: Acesso limitado principalmente a leitura e documentos

### Permissões:
- create: Criar novos registros
- read: Visualizar registros
- update: Atualizar registros
- delete: Excluir registros
- manageUsers: Gerenciar usuários
- manageDocuments: Gerenciar documentos
- managePayments: Gerenciar pagamentos

### Fluxo de Login:
1. Usuário insere credenciais na página de login
2. AuthContext verifica as credenciais
3. Em caso de sucesso, o usuário é redirecionado para a página principal
4. O componente ProtectedRoute verifica autenticação e permissões em cada navegação

## Fluxo de Dados

### Dados Mockados:
Atualmente, a aplicação utiliza dados mockados no diretório `services/mockData`

### Pontos de Integração Futura:
- Autenticação com JWT ou OAuth
- APIs RESTful para CRUD de entidades
- Uploads de arquivos para documentos
- Sistema de notificações em tempo real

## Documentação de Funcionalidades

### Módulo de Recrutamento:
1. **Candidatos**: Visualização e gestão de candidatos em diferentes etapas do processo
2. **Aprovados**: Candidatos que passaram pelo processo de seleção
3. **Histórico**: Registro histórico de processos de recrutamento

### Sistema de Operações:
1. **Frequência**: Controle de presença e horários dos entregadores
2. **Clientes**: Cadastro e gestão de clientes
3. **Pagamentos**: Controle de pagamentos dos entregadores

### Gerenciamento de Usuários:
- Cadastro e edição de usuários do sistema
- Atribuição de roles e permissões
- Controle de acesso baseado em permissões

## Sistema de Design UI/UX

### Paleta de Cores:
- **Primária**: Tons de azul e índigo para elementos principais
- **Secundária**: Tons de roxo para elementos de destaque
- **Estado**: Verde (sucesso), Amarelo (alerta), Vermelho (erro)
- **Neutros**: Tons de cinza para textos e fundos

### Tipografia:
- Sistema de fonte sem serifa (font-sans)
- Tamanhos de texto responsivos
- Peso da fonte variável para hierarquia visual

### Padrões de Estilo de Componentes:
- Cards para agrupamento de informações
- Tabelas para exibição de dados
- Formulários com validação visual
- Design responsivo adaptado a diferentes tamanhos de tela

## Guia de Início Rápido

### Configuração:
1. Clone o repositório
2. Instale as dependências com `npm install`
3. Execute a aplicação com `npm run dev`

### Fluxo de Desenvolvimento:
- O projeto utiliza Vite para um desenvolvimento rápido
- TypeScript para tipagem estática
- ESLint para linting
- Os componentes shadcn/ui podem ser personalizados conforme necessário

### Processo de Implantação:
- Build de produção com `npm run build`
- Os arquivos estáticos podem ser hospedados em qualquer serviço de hosting

## Solução de Problemas

### Problemas Comuns:
- **Erro de Autenticação**: Verifique as credenciais (atualmente, credenciais mockadas)
- **Permissão Negada**: Verifique se o usuário tem a permissão necessária
- **Problemas de UI**: A maioria dos componentes vem do shadcn/ui, consulte a documentação

### Técnicas de Depuração:
- Console logs estratégicos (já implementados em áreas críticas)
- React Developer Tools para inspeção de componentes
- Network tab para monitoramento de chamadas de API (quando implementadas)

### Dicas de Otimização:
- Utilizar React.memo para componentes que não mudam frequentemente
- Evitar re-renderizações desnecessárias
- Lazy loading de componentes para rotas menos acessadas
