
# Diretório components/Layout

Este diretório contém componentes relacionados à estrutura e layout da aplicação RH Entregadores.

## Componentes

### MainLayout

`MainLayout` é o layout principal utilizado em todas as páginas autenticadas da aplicação.

**Características:**
- Estrutura de layout com barra lateral (sidebar) e área de conteúdo
- Cabeçalho com funcionalidades de navegação, pesquisa e menu de usuário
- Layout responsivo com comportamento diferente em dispositivos móveis
- Animações suaves para transições de interface

**Props:**
- `children`: Conteúdo a ser renderizado dentro do layout

### ProtectedRoute

`ProtectedRoute` é um componente de ordem superior (HOC) para proteger rotas baseado em autenticação e permissões.

**Características:**
- Verificação de autenticação do usuário
- Validação de permissões específicas para acessar rotas
- Redirecionamento para página de login quando não autenticado
- Indicador de carregamento durante a verificação
- Logs detalhados para facilitar depuração

**Props:**
- `children`: Componentes a serem renderizados se o acesso for permitido
- `requiredPermission`: (Opcional) Permissão necessária para acessar a rota

## Uso

Os componentes de layout são usados para estruturar as páginas da aplicação e proteger rotas.

Exemplo de uso do ProtectedRoute:

```tsx
<Route 
  path="/users" 
  element={
    <ProtectedRoute requiredPermission="manageUsers">
      <Users />
    </ProtectedRoute>
  }
/>
```

Exemplo de uso do MainLayout:

```tsx
<MainLayout>
  <div className="space-y-6">
    <h1 className="text-2xl font-bold">Título da Página</h1>
    <p>Conteúdo da página...</p>
  </div>
</MainLayout>
```

## Pontos de Integração

- `MainLayout` integra-se com o contexto de autenticação para exibir informações do usuário
- `ProtectedRoute` utiliza o hook useAuth para verificar autenticação e permissões
