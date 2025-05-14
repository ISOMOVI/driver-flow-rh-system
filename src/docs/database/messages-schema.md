
# Estrutura de Dados: Módulo de Mensagens

## Tabela: messages

Esta tabela armazena todas as mensagens enviadas e recebidas no sistema.

| Campo | Tipo | Descrição | Restrições |
|-------|------|-----------|------------|
| id | UUID | Identificador único da mensagem | PK, NOT NULL |
| channel_id | ENUM | Canal da mensagem | NOT NULL, CHECK (channel_id IN ('recruitment', 'operations', 'individual')) |
| recipient_id | UUID | ID do destinatário (motorista/candidato) para mensagens individuais | FK (candidate_id ou driver_id), NULL |
| recipient_name | VARCHAR(255) | Nome do destinatário | NULL |
| message | TEXT | Conteúdo da mensagem | NOT NULL |
| timestamp | TIMESTAMP | Data e hora da mensagem | NOT NULL, DEFAULT NOW() |
| direction | ENUM | Direção da mensagem | NOT NULL, CHECK (direction IN ('inbound', 'outbound')) |
| status | ENUM | Status da mensagem | NOT NULL, CHECK (status IN ('sent', 'delivered', 'read')) |
| created_by | UUID | ID do usuário que criou a mensagem | FK (users.id), NULL |
| updated_at | TIMESTAMP | Data da última atualização | NOT NULL, DEFAULT NOW() |

## Tabela: message_attachments

Esta tabela armazena anexos de mensagens.

| Campo | Tipo | Descrição | Restrições |
|-------|------|-----------|------------|
| id | UUID | Identificador único do anexo | PK, NOT NULL |
| message_id | UUID | ID da mensagem | FK (messages.id), NOT NULL |
| type | ENUM | Tipo do anexo | NOT NULL, CHECK (type IN ('image', 'document', 'location')) |
| url | VARCHAR(255) | URL do anexo | NULL |
| name | VARCHAR(255) | Nome do anexo | NULL |
| created_at | TIMESTAMP | Data de criação | NOT NULL, DEFAULT NOW() |

## Tabela: message_templates

Esta tabela armazena modelos de mensagens para uso recorrente.

| Campo | Tipo | Descrição | Restrições |
|-------|------|-----------|------------|
| id | UUID | Identificador único do modelo | PK, NOT NULL |
| name | VARCHAR(255) | Nome do modelo | NOT NULL |
| channel_id | ENUM | Canal associado ao modelo | NOT NULL, CHECK (channel_id IN ('recruitment', 'operations', 'individual')) |
| content | TEXT | Conteúdo do modelo | NOT NULL |
| created_by | UUID | ID do usuário que criou o modelo | FK (users.id), NOT NULL |
| created_at | TIMESTAMP | Data de criação | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMP | Data da última atualização | NOT NULL, DEFAULT NOW() |
| active | BOOLEAN | Indica se o modelo está ativo | NOT NULL, DEFAULT TRUE |

## Tabela: message_groups

Esta tabela permite agrupar destinatários para envio de mensagens em massa.

| Campo | Tipo | Descrição | Restrições |
|-------|------|-----------|------------|
| id | UUID | Identificador único do grupo | PK, NOT NULL |
| name | VARCHAR(255) | Nome do grupo | NOT NULL |
| description | TEXT | Descrição do grupo | NULL |
| created_by | UUID | ID do usuário que criou o grupo | FK (users.id), NOT NULL |
| created_at | TIMESTAMP | Data de criação | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMP | Data da última atualização | NOT NULL, DEFAULT NOW() |
| active | BOOLEAN | Indica se o grupo está ativo | NOT NULL, DEFAULT TRUE |

## Tabela: message_group_members

Esta tabela associa candidatos/motoristas a grupos de mensagens.

| Campo | Tipo | Descrição | Restrições |
|-------|------|-----------|------------|
| id | UUID | Identificador único | PK, NOT NULL |
| group_id | UUID | ID do grupo | FK (message_groups.id), NOT NULL |
| member_type | ENUM | Tipo de membro | NOT NULL, CHECK (member_type IN ('candidate', 'driver')) |
| member_id | UUID | ID do membro (candidato ou motorista) | NOT NULL |
| created_at | TIMESTAMP | Data de criação | NOT NULL, DEFAULT NOW() |

## Tabela: message_broadcasts

Esta tabela registra envios de mensagens em massa.

| Campo | Tipo | Descrição | Restrições |
|-------|------|-----------|------------|
| id | UUID | Identificador único da transmissão | PK, NOT NULL |
| name | VARCHAR(255) | Nome da transmissão | NOT NULL |
| message_template_id | UUID | ID do modelo usado | FK (message_templates.id), NULL |
| custom_message | TEXT | Mensagem personalizada (se não usar modelo) | NULL |
| scheduled_for | TIMESTAMP | Data/hora agendada para envio | NULL |
| sent_at | TIMESTAMP | Data/hora do envio | NULL |
| created_by | UUID | ID do usuário que criou a transmissão | FK (users.id), NOT NULL |
| created_at | TIMESTAMP | Data de criação | NOT NULL, DEFAULT NOW() |
| status | ENUM | Status da transmissão | NOT NULL, CHECK (status IN ('draft', 'scheduled', 'sending', 'completed', 'failed')) |
| total_recipients | INTEGER | Número total de destinatários | DEFAULT 0 |
| successful_sends | INTEGER | Número de envios bem-sucedidos | DEFAULT 0 |

## Relacionamentos

- Uma mensagem (`messages`) pode ter vários anexos (`message_attachments`) - Relacionamento 1:N
- Um modelo de mensagem (`message_templates`) pode ser usado em várias transmissões (`message_broadcasts`) - Relacionamento 1:N
- Um grupo de mensagem (`message_groups`) pode ter vários membros (`message_group_members`) - Relacionamento 1:N
- Uma transmissão (`message_broadcasts`) pode gerar várias mensagens individuais (`messages`)

## Fluxo de Mensagens Individuais

1. Uma mensagem é criada na tabela `messages` com um destinatário específico
2. Se houver anexos, são registrados na tabela `message_attachments`
3. Quando a mensagem é entregue, seu status é atualizado para 'delivered'
4. Quando o destinatário lê a mensagem, seu status é atualizado para 'read'

## Fluxo de Mensagens em Massa

1. Um grupo de destinatários é definido em `message_groups` e `message_group_members`
2. Um modelo de mensagem pode ser criado em `message_templates`
3. Uma transmissão é registrada em `message_broadcasts`
4. Para cada destinatário, uma mensagem individual é criada em `messages`
5. A transmissão é marcada como 'completed' quando todas as mensagens são enviadas

## Fluxo de Canais

1. Canal 'recruitment': mensagens relacionadas ao processo de recrutamento
2. Canal 'operations': mensagens relacionadas à operação diária
3. Canal 'individual': mensagens específicas para um motorista/candidato
