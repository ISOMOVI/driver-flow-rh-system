
# Diretório pages

Este diretório contém os componentes de página principal da aplicação RH Entregadores, correspondendo às diferentes rotas disponíveis.

## Estrutura

- **Root Pages**: Páginas principais como Login, Index, NotFound
- **operations/**: Subpáginas do módulo de operações
- **recruitment/**: Subpáginas do módulo de recrutamento
- **settings/**: Subpáginas de configurações

## Páginas Principais

### Login.tsx

Página de login para autenticação de usuários.

**Características:**
- Formulário de login com email e senha
- Credenciais mockadas para teste
- Redirecionamento após login bem-sucedido
- Feedback visual para erros

### Index.tsx

Página inicial (dashboard) exibida após login.

**Características:**
- Visão geral das métricas principais
- Cards estatísticos
- Tabelas com dados recentes
- Links rápidos para funcionalidades principais

### NotFound.tsx

Página de erro 404 para rotas não encontradas.

**Características:**
- Mensagem amigável de erro
- Link para retornar à página inicial
- Log de rotas inexistentes para análise

## Páginas com Abas

### Recruitment.tsx

Página principal do módulo de recrutamento com sistema de abas.

**Características:**
- Navegação por abas (Candidatos, Aprovados, Histórico)
- Uso de React Router e Outlet para renderizar subpáginas
- Sincronização entre URL e aba ativa

### Operations.tsx

Página principal do módulo de operações com sistema de abas.

**Características:**
- Navegação por abas (Frequência, Clientes, Pagamentos)
- Uso de React Router e Outlet para renderizar subpáginas
- Sincronização entre URL e aba ativa

### Settings.tsx

Página de configurações da aplicação com sistema de abas.

**Características:**
- Navegação por abas (Perfil, Segurança, Notificações, Integrações)
- Uso de React Router e Outlet para renderizar subpáginas
- Sincronização entre URL e aba ativa

## Padrões de Implementação

### Layout Consistente

Todas as páginas autenticadas utilizam o `MainLayout` para garantir consistência:

```tsx
<MainLayout>
  <div className="space-y-6">
    <h1 className="text-2xl font-bold tracking-tight">Título da Página</h1>
    <div className="content">
      {/* Conteúdo específico da página */}
    </div>
  </div>
</MainLayout>
```

### Proteção de Rotas

Todas as páginas (exceto Login) são protegidas pelo componente `ProtectedRoute`:

```tsx
<Route 
  path="/route" 
  element={
    <ProtectedRoute>
      <PageComponent />
    </ProtectedRoute>
  } 
/>
```

### Sistema de Abas

Páginas com múltiplas subseções utilizam um sistema de abas consistente:

1. Componente principal define as abas e gerencia o estado ativo
2. React Router `Outlet` renderiza o conteúdo específico de cada aba
3. URLs refletem a aba atual para navegação direta

## Integração com o Sistema

- Páginas usam o `AuthContext` para verificação de autenticação e permissões
- Componentes de UI compartilhados são utilizados para consistência visual
- Dados são obtidos de serviços mockados (futuramente APIs reais)
