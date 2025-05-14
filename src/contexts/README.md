
# Diretório contexts

Este diretório contém os contextos React utilizados para gerenciamento de estado global na aplicação RH Entregadores.

## Contextos Disponíveis

### AuthContext

`AuthContext` é o contexto principal para gerenciamento de autenticação e autorização na aplicação.

**Funcionalidades:**
- Login e logout de usuários
- Armazenamento do estado de autenticação
- Informações do usuário atual
- Verificação de permissões
- Estado de carregamento durante operações de autenticação

**API exposta:**
- `isAuthenticated`: Boolean indicando se o usuário está autenticado
- `isLoading`: Boolean indicando se uma operação de autenticação está em andamento
- `currentUser`: Objeto com dados do usuário atual
- `login(email, password)`: Função para autenticar usuário
- `logout()`: Função para desconectar usuário
- `hasPermission(permission)`: Função para verificar se o usuário tem uma permissão específica

### ThemeContext

`ThemeContext` é o contexto para gerenciamento das preferências de interface do usuário.

**Funcionalidades:**
- Configuração do tamanho da fonte
- Armazenamento das preferências do usuário

**API exposta:**
- `fontSize`: String com o tamanho atual da fonte ('small', 'medium', 'large')
- `setFontSize(size)`: Função para alterar o tamanho da fonte

## Padrões de Implementação

### Provider Pattern

Os contextos utilizam o padrão Provider do React para disponibilizar estado e funções para a árvore de componentes:

```tsx
<AuthProvider>
  <ThemeProvider>
    <App />
  </ThemeProvider>
</AuthProvider>
```

### Hook Pattern

Para cada contexto, existe um hook correspondente que facilita o consumo do contexto:

```tsx
const { isAuthenticated, currentUser, logout } = useAuth();
const { fontSize, setFontSize } = useTheme();
```

## Integração com o Sistema

- `AuthContext` é fornecido no nível mais alto da aplicação em `App.tsx`
- `ThemeProvider` é fornecido logo abaixo do AuthProvider para configuração de aparência
- `ProtectedRoute` utiliza `useAuth()` para verificar autenticação e permissões
- Componentes de UI adaptam-se com base nas preferências do usuário

## Implementação Atual vs. Futura

Atualmente, o sistema utiliza uma implementação mockada de autenticação:
- Credenciais são verificadas contra valores fixos
- Não há persistência real de sessão entre recarregamentos de página
- Permissões são baseadas em roles predefinidas

Em uma implementação futura:
- Integração com um backend real usando JWT ou OAuth
- Armazenamento seguro de tokens de autenticação
- Refresh tokens para manter sessões ativas
- Verificação de permissões no servidor

## Melhores Práticas

1. **Separação de Preocupações**: Manter a lógica de autenticação e tema separada da UI
2. **Desempenho**: Evitar renderizações desnecessárias ao atualizar o contexto
3. **Segurança**: Nunca armazenar senhas em texto plano ou em estado persistente
4. **Tratamento de Erros**: Fornecer feedback claro sobre falhas de autenticação
5. **Timeout**: Implementar expiração de sessão por inatividade
