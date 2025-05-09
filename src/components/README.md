
# Diretório components

Este diretório contém todos os componentes React reutilizáveis da aplicação RH Entregadores.

## Estrutura

- **Dashboard/**: Componentes específicos para o dashboard
- **Layout/**: Componentes de layout como MainLayout e ProtectedRoute
- **Sidebar/**: Componentes da barra lateral
- **operations/**: Componentes relacionados ao módulo de operações
- **recruitment/**: Componentes relacionados ao módulo de recrutamento
- **ui/**: Componentes base da biblioteca shadcn/ui

## Padrões de Componentes

### Componentes Puros vs. Componentes Conectados

- **Componentes Puros**: Recebem props e não têm conhecimento do estado global
- **Componentes Conectados**: Utilizam hooks e contextos para acessar estado global

### Estrutura de Arquivos

- Um componente por arquivo
- Nome do arquivo igual ao nome do componente
- Utilização de subdiretórios para organizar componentes relacionados

## Componentes Principais

### Layout

- **MainLayout**: Layout principal da aplicação que inclui barra lateral e cabeçalho
- **ProtectedRoute**: Componente de ordem superior (HOC) para proteger rotas

### Elementos de UI

- **StatCard**: Cards para exibição de estatísticas
- **DriversTable**: Tabela para exibição de dados de entregadores

### Modais

- **AddClientModal**: Modal para adicionar novos clientes
- **AddCandidateModal**: Modal para adicionar novos candidatos

## Práticas Recomendadas

1. **Componentização**: Dividir interfaces complexas em componentes menores
2. **Props Tipadas**: Usar TypeScript para tipar as props dos componentes
3. **Responsabilidade Única**: Cada componente deve ter uma única responsabilidade
4. **Props vs. Estado**: Preferir props para dados que vêm de fora e estado para dados internos
5. **Composição**: Favorecer composição de componentes em vez de herança

## Estilização

- Utiliza Tailwind CSS para estilos
- Classes utilitárias para estilos específicos
- Componentes shadcn/ui para elementos de UI consistentes
