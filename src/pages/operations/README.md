
# Diretório pages/operations

Este diretório contém subpáginas específicas do módulo de operações da aplicação RH Entregadores, cada uma correspondendo a uma aba na página principal de operações.

## Páginas

### AttendanceTab.tsx

Subpágina para gerenciamento de frequência dos entregadores.

**Características:**
- Filtros para data, cliente e entregador
- Visualização de registros de frequência
- Validação de entradas de frequência
- Cálculo automático de quilometragem
- Exportação de relatórios

### ClientsTab.tsx

Subpágina para gerenciamento de clientes.

**Características:**
- Lista de clientes com informações principais
- Indicadores de status (ativo/inativo)
- Botão para adicionar novos clientes
- Ações para visualizar e editar clientes
- Integração com modal AddClientModal

### PaymentsTab.tsx

Subpágina para gerenciamento de pagamentos.

**Características:**
- Controle de pagamentos a entregadores
- Filtros por período, status e entregador
- Resumo de valores por tipo de pagamento
- Processamento de pagamentos
- Geração de recibos

## Fluxos de Trabalho

### Fluxo de Frequência

1. Entregadores registram entrada e saída
2. Supervisores validam registros de frequência
3. Sistema calcula quilometragem e valores
4. Dados são utilizados para cálculo de pagamentos

### Fluxo de Clientes

1. Cadastro de novo cliente via modal
2. Associação de entregadores ao cliente
3. Controle de contrato e status
4. Acompanhamento de atividade por cliente

### Fluxo de Pagamentos

1. Geração automática de pagamentos com base em frequência
2. Revisão e aprovação por supervisores
3. Processamento de pagamentos
4. Geração de comprovantes e relatórios

## Integração com Outros Módulos

- **Recrutamento**: Entregadores aprovados ficam disponíveis para alocação a clientes
- **Documentos**: Contratos de clientes e recibos de pagamento
- **Mensagens**: Comunicação com entregadores sobre frequência e pagamentos

## Estados e Dados

### Clientes
- **Status**: Ativo ou Inativo
- **Entregadores**: Lista de entregadores associados

### Frequência
- **Estado**: Validado ou Pendente
- **Dados**: Check-in, Check-out, Quilometragem

### Pagamentos
- **Status**: Pendente, Processando, Pago, Cancelado
- **Métodos**: Transferência, PIX, Dinheiro
