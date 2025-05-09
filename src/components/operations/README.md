
# Diretório components/operations

Este diretório contém componentes específicos para o módulo de operações da aplicação RH Entregadores.

## Componentes

### AddClientModal

`AddClientModal` é um modal para adição e edição de clientes.

**Características:**
- Formulário completo para dados do cliente
- Validação de campos com feedback visual
- Suporte para upload de documentos
- Gerenciamento de estado do formulário com React Hook Form

**Props:**
- `open`: Estado de abertura do modal
- `onOpenChange`: Callback para alteração do estado de abertura
- `editingClient`: (Opcional) Dados do cliente para edição

### AttendanceFilterModal

`AttendanceFilterModal` é um modal para filtrar registros de frequência dos entregadores.

**Características:**
- Filtros por data, cliente, entregador
- Seleção de intervalo de datas
- Filtros de status (validado, pendente)
- Aplicação de múltiplos filtros simultaneamente

**Props:**
- `open`: Estado de abertura do modal
- `onOpenChange`: Callback para alteração do estado de abertura
- `onApplyFilters`: Callback executado quando os filtros são aplicados

## Fluxos de Trabalho

### Fluxo de Adição de Cliente

1. Usuário clica no botão "Novo Cliente" na aba Clientes
2. Modal `AddClientModal` é aberto
3. Usuário preenche os dados do cliente
4. Após validação, os dados são enviados para processamento
5. Modal é fechado e a lista de clientes é atualizada

### Fluxo de Filtragem de Frequência

1. Usuário clica no botão de filtro na aba Frequência
2. Modal `AttendanceFilterModal` é aberto
3. Usuário seleciona os filtros desejados
4. Ao aplicar, a lista de registros de frequência é filtrada
5. Indicadores visuais mostram os filtros ativos

## Integração com o Sistema

- Componentes utilizam dados mockados do diretório `services/mockData`
- Preparados para integração futura com APIs reais
- Seguem o padrão de design da aplicação com shadcn/ui e Tailwind CSS

## Extensibilidade

Os componentes deste diretório são projetados para serem extensíveis:

- Fácil adição de novos campos
- Suporte para novos tipos de filtros
- Adaptáveis a mudanças nos requisitos de negócio
