
# Diretório components/Sidebar

Este diretório contém componentes relacionados à barra lateral (sidebar) da aplicação RH Entregadores.

## Componentes

### Sidebar

`Sidebar` é o componente principal da barra lateral, responsável por fornecer navegação e acesso rápido às funcionalidades principais.

**Características:**
- Navegação principal da aplicação
- Itens de menu organizados por categoria
- Indicador visual para item ativo
- Comportamento responsivo (colapsa em dispositivos móveis)
- Integração com sistema de permissões

**Implementação:**
- Utiliza o componente `sidebar` do shadcn/ui como base
- Customizado para atender às necessidades específicas da aplicação
- Integrado com React Router para navegação

## Estrutura de Navegação

A barra lateral organiza a navegação nas seguintes seções:

1. **Dashboard**: Página inicial
2. **Recrutamento**: Gestão de candidatos e processos de seleção
3. **Operações**: Gerenciamento de frequência, clientes e pagamentos
4. **Mensagens**: Sistema de comunicação
5. **Empresas**: Gestão de empresas parceiras
6. **Documentos**: Controle de documentação
7. **Usuários**: Administração de usuários (acesso restrito)
8. **Configurações**: Preferências do sistema

## Renderização Condicional

A Sidebar implementa renderização condicional baseada em permissões de usuário:

- Alguns itens são visíveis apenas para usuários com permissões específicas
- A aparência dos itens pode mudar com base no estado da aplicação
- Indicadores visuais mostram notificações ou itens que precisam de atenção

## Integração com o Sistema

- Integrado com o `AuthContext` para permissões de usuário
- Utiliza o React Router para navegação entre rotas
- Estado de item ativo sincronizado com a rota atual

## Personalização

O componente Sidebar foi personalizado para atender às necessidades específicas da aplicação RH Entregadores, incluindo:

- Esquema de cores personalizado
- Ícones específicos para cada seção
- Comportamento responsivo otimizado
- Animações e transições suaves
