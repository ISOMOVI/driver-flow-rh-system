
# Estrutura de Dados: Módulo de Operações

## Tabela: drivers

Esta tabela armazena informações sobre os motoristas/entregadores.

| Campo | Tipo | Descrição | Restrições |
|-------|------|-----------|------------|
| id | UUID | Identificador único do motorista | PK, NOT NULL |
| name | VARCHAR(255) | Nome completo do motorista | NOT NULL |
| phone | VARCHAR(20) | Número de telefone | NOT NULL |
| email | VARCHAR(255) | Email do motorista | NOT NULL, UNIQUE |
| city | VARCHAR(100) | Cidade do motorista | NOT NULL |
| status | VARCHAR(20) | Status do motorista no sistema | NOT NULL, DEFAULT 'approved' |
| created_at | TIMESTAMP | Data de criação do registro | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMP | Data da última atualização | NOT NULL, DEFAULT NOW() |
| active | BOOLEAN | Indica se o motorista está ativo | NOT NULL, DEFAULT TRUE |
| client_id | UUID | ID do cliente ao qual o motorista está vinculado | FK (clients.id), NULL |
| driver_type | ENUM | Tipo de motorista | NOT NULL, CHECK (driver_type IN ('fixed', 'sporadic')) |
| payment_method | ENUM | Método de pagamento do motorista | NOT NULL, CHECK (payment_method IN ('per_km', 'fixed_rate', 'per_delivery')) |
| rate_per_km | DECIMAL(10,2) | Valor pago por km rodado | NULL |
| fixed_rate | DECIMAL(10,2) | Valor fixo de pagamento | NULL |
| rate_per_delivery | DECIMAL(10,2) | Valor pago por entrega | NULL |
| contract_signed | BOOLEAN | Indica se o contrato foi assinado | NOT NULL, DEFAULT FALSE |
| contract_url | VARCHAR(255) | URL do contrato assinado | NULL |
| last_payment | TIMESTAMP | Data do último pagamento | NULL |

## Tabela: driver_payment_info

Esta tabela armazena informações de pagamento dos motoristas.

| Campo | Tipo | Descrição | Restrições |
|-------|------|-----------|------------|
| id | UUID | Identificador único | PK, NOT NULL |
| driver_id | UUID | ID do motorista | FK (drivers.id), NOT NULL |
| bank | VARCHAR(100) | Nome do banco | NOT NULL |
| agency | VARCHAR(20) | Número da agência | NOT NULL |
| account | VARCHAR(20) | Número da conta | NOT NULL |
| pix_key | VARCHAR(255) | Chave PIX | NULL |
| created_at | TIMESTAMP | Data de criação | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMP | Data da última atualização | NOT NULL, DEFAULT NOW() |

## Tabela: clients

Esta tabela armazena informações sobre os clientes.

| Campo | Tipo | Descrição | Restrições |
|-------|------|-----------|------------|
| id | UUID | Identificador único do cliente | PK, NOT NULL |
| name | VARCHAR(255) | Nome do cliente | NOT NULL |
| address | TEXT | Endereço do cliente | NOT NULL |
| contact_name | VARCHAR(255) | Nome do contato principal | NOT NULL |
| contact_phone | VARCHAR(20) | Telefone do contato | NOT NULL |
| contact_email | VARCHAR(255) | Email do contato | NOT NULL |
| active | BOOLEAN | Indica se o cliente está ativo | NOT NULL, DEFAULT TRUE |
| created_at | TIMESTAMP | Data de criação | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMP | Data da última atualização | NOT NULL, DEFAULT NOW() |

## Tabela: client_contracts

Esta tabela armazena informações dos contratos com clientes.

| Campo | Tipo | Descrição | Restrições |
|-------|------|-----------|------------|
| id | UUID | Identificador único do contrato | PK, NOT NULL |
| client_id | UUID | ID do cliente | FK (clients.id), NOT NULL |
| signed | BOOLEAN | Indica se o contrato está assinado | NOT NULL, DEFAULT FALSE |
| start_date | DATE | Data de início do contrato | NOT NULL |
| end_date | DATE | Data de término do contrato | NULL |
| document_url | VARCHAR(255) | URL do documento do contrato | NULL |
| created_at | TIMESTAMP | Data de criação | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMP | Data da última atualização | NOT NULL, DEFAULT NOW() |

## Tabela: client_payment_terms

Esta tabela armazena as condições de pagamento dos clientes.

| Campo | Tipo | Descrição | Restrições |
|-------|------|-----------|------------|
| id | UUID | Identificador único | PK, NOT NULL |
| client_id | UUID | ID do cliente | FK (clients.id), NOT NULL |
| payment_method | ENUM | Método de pagamento | NOT NULL, CHECK (payment_method IN ('bank_transfer', 'pix', 'boleto')) |
| payment_days | INTEGER | Dias após o fim do mês para pagamento | NOT NULL |
| auto_approve | BOOLEAN | Aprovação automática de pagamentos | NOT NULL, DEFAULT FALSE |
| created_at | TIMESTAMP | Data de criação | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMP | Data da última atualização | NOT NULL, DEFAULT NOW() |

## Tabela: attendance

Esta tabela armazena os registros de frequência dos motoristas.

| Campo | Tipo | Descrição | Restrições |
|-------|------|-----------|------------|
| id | UUID | Identificador único do registro | PK, NOT NULL |
| driver_id | UUID | ID do motorista | FK (drivers.id), NOT NULL |
| date | DATE | Data do registro | NOT NULL |
| check_in | TIME | Hora de entrada | NOT NULL |
| check_out | TIME | Hora de saída | NULL |
| start_km | INTEGER | Quilometragem inicial | NOT NULL |
| end_km | INTEGER | Quilometragem final | NULL |
| total_km | INTEGER | Quilometragem total | NULL |
| validated | BOOLEAN | Indica se o registro foi validado | NOT NULL, DEFAULT FALSE |
| client_id | UUID | ID do cliente relacionado | FK (clients.id), NULL |
| notes | TEXT | Observações | NULL |
| created_at | TIMESTAMP | Data de criação | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMP | Data da última atualização | NOT NULL, DEFAULT NOW() |

## Tabela: payments

Esta tabela armazena os pagamentos aos motoristas.

| Campo | Tipo | Descrição | Restrições |
|-------|------|-----------|------------|
| id | UUID | Identificador único do pagamento | PK, NOT NULL |
| driver_id | UUID | ID do motorista | FK (drivers.id), NOT NULL |
| driver_name | VARCHAR(255) | Nome do motorista | NOT NULL |
| driver_type | ENUM | Tipo de motorista | NOT NULL, CHECK (driver_type IN ('fixed', 'sporadic')) |
| client_id | UUID | ID do cliente | FK (clients.id), NULL |
| client_name | VARCHAR(255) | Nome do cliente | NULL |
| period_start | DATE | Data de início do período | NOT NULL |
| period_end | DATE | Data de fim do período | NOT NULL |
| total_km | INTEGER | Total de quilômetros | NULL |
| total_deliveries | INTEGER | Total de entregas | NULL |
| rate_per_km | DECIMAL(10,2) | Valor pago por km | NULL |
| rate_per_delivery | DECIMAL(10,2) | Valor pago por entrega | NULL |
| fixed_amount | DECIMAL(10,2) | Valor fixo | NULL |
| total_amount | DECIMAL(10,2) | Valor total do pagamento | NOT NULL |
| status | ENUM | Status do pagamento | NOT NULL, CHECK (status IN ('pending', 'processing', 'paid', 'canceled')) |
| payment_method | ENUM | Método de pagamento | NOT NULL, CHECK (payment_method IN ('bank_transfer', 'pix', 'cash')) |
| created_at | TIMESTAMP | Data de criação | NOT NULL, DEFAULT NOW() |
| paid_at | TIMESTAMP | Data do pagamento | NULL |
| receipt_url | VARCHAR(255) | URL do recibo | NULL |
| notes | TEXT | Observações | NULL |

## Tabela: documents

Esta tabela armazena documentos do sistema (contratos, recibos, etc).

| Campo | Tipo | Descrição | Restrições |
|-------|------|-----------|------------|
| id | UUID | Identificador único do documento | PK, NOT NULL |
| title | VARCHAR(255) | Título do documento | NOT NULL |
| description | TEXT | Descrição do documento | NULL |
| category | ENUM | Categoria do documento | NOT NULL, CHECK (category IN ('contract', 'receipt', 'driver_document', 'company_document', 'other')) |
| related_type | ENUM | Tipo da entidade relacionada | NULL, CHECK (related_type IN ('driver', 'client', 'payment')) |
| related_id | UUID | ID da entidade relacionada | NULL |
| created_at | TIMESTAMP | Data de criação | NOT NULL, DEFAULT NOW() |
| expires_at | TIMESTAMP | Data de expiração | NULL |
| file_url | VARCHAR(255) | URL do arquivo | NOT NULL |
| status | ENUM | Status do documento | NOT NULL, CHECK (status IN ('pending', 'active', 'expired', 'canceled')) |
| requires_signature | BOOLEAN | Indica se requer assinatura | NOT NULL, DEFAULT FALSE |
| signed_at | TIMESTAMP | Data da assinatura | NULL |
| signed_by | UUID | ID do usuário que assinou | FK (users.id), NULL |

## Relacionamentos

- Um motorista (`drivers`) pode estar vinculado a um cliente (`clients`) - Relacionamento N:1
- Um motorista (`drivers`) tem uma informação de pagamento (`driver_payment_info`) - Relacionamento 1:1
- Um cliente (`clients`) pode ter vários motoristas (`drivers`) - Relacionamento 1:N
- Um cliente (`clients`) pode ter um contrato (`client_contracts`) - Relacionamento 1:1
- Um cliente (`clients`) pode ter termos de pagamento (`client_payment_terms`) - Relacionamento 1:1
- Um motorista (`drivers`) pode ter vários registros de frequência (`attendance`) - Relacionamento 1:N
- Um motorista (`drivers`) pode ter vários pagamentos (`payments`) - Relacionamento 1:N
- Um cliente (`clients`) pode estar relacionado a vários pagamentos (`payments`) - Relacionamento 1:N
- Documentos (`documents`) podem estar relacionados a motoristas, clientes ou pagamentos

## Fluxo de Dados

### Fluxo de Frequência
1. Motorista registra entrada (check_in) com quilometragem inicial
2. Motorista registra saída (check_out) com quilometragem final
3. Sistema calcula quilometragem total
4. Supervisor valida o registro (validated = true)
5. Registros validados são usados para cálculo de pagamentos

### Fluxo de Clientes
1. Cliente é cadastrado na tabela `clients`
2. Opcionalmente, contrato e termos de pagamento são registrados
3. Motoristas podem ser vinculados ao cliente (client_id em `drivers`)

### Fluxo de Pagamentos
1. Pagamentos são gerados a partir dos registros de frequência validados
2. O cálculo depende do tipo de motorista e método de pagamento
3. Pagamentos são processados e marcados como pagos
4. Recibos são gerados e armazenados como documentos
