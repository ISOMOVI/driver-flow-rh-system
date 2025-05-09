
# Diretório src

Este é o diretório principal da aplicação RH Entregadores, contendo todos os arquivos de código fonte do projeto.

## Estrutura

- **components/**: Componentes React reutilizáveis
- **contexts/**: Contextos React para gerenciamento de estado global
- **hooks/**: Hooks personalizados
- **lib/**: Funções utilitárias
- **pages/**: Componentes de página para cada rota
- **services/**: Serviços e dados mockados
- **types/**: Definições de tipos TypeScript

## Arquivos Principais

- **App.tsx**: O componente principal da aplicação, define todas as rotas e fornece o contexto de autenticação e query client
- **main.tsx**: Ponto de entrada da aplicação
- **index.css**: Estilos globais e configurações do Tailwind CSS

## Tecnologias

- **React 18**: Para construção da interface
- **TypeScript**: Para tipagem estática
- **React Router Dom**: Para roteamento
- **TanStack Query**: Para gerenciamento de estado e chamadas assíncronas
- **shadcn/ui**: Para componentes de UI consistentes
- **Tailwind CSS**: Para estilização

## Arquitetura

A aplicação segue uma arquitetura baseada em componentes com separação clara de responsabilidades:

1. **Componentes UI**: Componentes puros de apresentação
2. **Páginas**: Componentes que representam rotas completas
3. **Contextos**: Gerenciamento de estado global
4. **Hooks**: Lógica reutilizável
5. **Serviços**: Comunicação com APIs (simulada com dados mockados)

## Princípios de Design

- **Componentes Reutilizáveis**: Favorecer componentes pequenos e reutilizáveis
- **Separação de Preocupações**: Manter UI e lógica separados quando possível
- **Tipagem Forte**: Utilizar TypeScript para prevenir erros em tempo de desenvolvimento
- **Responsividade**: Design responsivo para funcionar em diferentes dispositivos
