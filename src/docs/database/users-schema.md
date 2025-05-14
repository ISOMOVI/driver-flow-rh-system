
# Estrutura de Dados: Módulo de Usuários

## Tabela: users

Esta tabela armazena informações sobre os usuários do sistema.

| Campo | Tipo | Descrição | Restrições |
|-------|------|-----------|------------|
| id | UUID | Identificador único do usuário | PK, NOT NULL |
| name | VARCHAR(255) | Nome completo do usuário | NOT NULL |
| email | VARCHAR(255) | Email do usuário | NOT NULL, UNIQUE |
| password | VARCHAR(255) | Senha criptografada | NOT NULL |
| role | ENUM | Papel do usuário no sistema | NOT NULL, CHECK (role IN ('admin', 'gestor', 'suporte')) |
| avatar | VARCHAR(255) | URL da imagem do avatar | NULL |
| created_at | TIMESTAMP | Data de criação do registro | NOT NULL, DEFAULT NOW() |
| last_login | TIMESTAMP | Data do último login | NULL |
| active | BOOLEAN | Indica se o usuário está ativo | NOT NULL, DEFAULT TRUE |

## Tabela: user_sessions

Esta tabela armazena as sessões ativas dos usuários.

| Campo | Tipo | Descrição | Restrições |
|-------|------|-----------|------------|
| id | UUID | Identificador único da sessão | PK, NOT NULL |
| user_id | UUID | ID do usuário | FK (users.id), NOT NULL |
| token | VARCHAR(255) | Token de autenticação | NOT NULL, UNIQUE |
| ip_address | VARCHAR(45) | Endereço IP | NOT NULL |
| user_agent | TEXT | Informações do navegador | NOT NULL |
| created_at | TIMESTAMP | Data de criação da sessão | NOT NULL, DEFAULT NOW() |
| expires_at | TIMESTAMP | Data de expiração da sessão | NOT NULL |
| last_activity | TIMESTAMP | Data da última atividade | NOT NULL, DEFAULT NOW() |

## Tabela: user_preferences

Esta tabela armazena preferências pessoais dos usuários.

| Campo | Tipo | Descrição | Restrições |
|-------|------|-----------|------------|
| id | UUID | Identificador único | PK, NOT NULL |
| user_id | UUID | ID do usuário | FK (users.id), NOT NULL |
| font_size | VARCHAR(10) | Tamanho da fonte | NOT NULL, DEFAULT 'medium' |
| notifications_enabled | BOOLEAN | Notificações habilitadas | NOT NULL, DEFAULT TRUE |
| email_notifications | BOOLEAN | Notificações por email | NOT NULL, DEFAULT TRUE |
| created_at | TIMESTAMP | Data de criação | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMP | Data da última atualização | NOT NULL, DEFAULT NOW() |

## Tabela: user_permissions

Esta tabela pode armazenar permissões personalizadas para usuários específicos.

| Campo | Tipo | Descrição | Restrições |
|-------|------|-----------|------------|
| id | UUID | Identificador único | PK, NOT NULL |
| user_id | UUID | ID do usuário | FK (users.id), NOT NULL |
| create | BOOLEAN | Permissão para criar | NOT NULL |
| read | BOOLEAN | Permissão para ler | NOT NULL |
| update | BOOLEAN | Permissão para atualizar | NOT NULL |
| delete | BOOLEAN | Permissão para excluir | NOT NULL |
| manage_users | BOOLEAN | Permissão para gerenciar usuários | NOT NULL |
| manage_documents | BOOLEAN | Permissão para gerenciar documentos | NOT NULL |
| manage_payments | BOOLEAN | Permissão para gerenciar pagamentos | NOT NULL |
| created_at | TIMESTAMP | Data de criação | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMP | Data da última atualização | NOT NULL, DEFAULT NOW() |

## Tabela: user_activity_logs

Esta tabela armazena logs de atividades dos usuários no sistema.

| Campo | Tipo | Descrição | Restrições |
|-------|------|-----------|------------|
| id | UUID | Identificador único | PK, NOT NULL |
| user_id | UUID | ID do usuário | FK (users.id), NOT NULL |
| activity_type | VARCHAR(50) | Tipo de atividade | NOT NULL |
| description | TEXT | Descrição da atividade | NOT NULL |
| ip_address | VARCHAR(45) | Endereço IP | NOT NULL |
| created_at | TIMESTAMP | Data da atividade | NOT NULL, DEFAULT NOW() |

## Relacionamentos

- Um usuário (`users`) pode ter várias sessões (`user_sessions`) - Relacionamento 1:N
- Um usuário (`users`) tem uma preferência (`user_preferences`) - Relacionamento 1:1
- Um usuário (`users`) pode ter uma configuração de permissões personalizadas (`user_permissions`) - Relacionamento 1:1
- Um usuário (`users`) pode ter vários logs de atividade (`user_activity_logs`) - Relacionamento 1:N

## Fluxo de Autenticação

1. Usuário fornece credenciais (email/senha)
2. Sistema verifica credenciais na tabela `users`
3. Se autenticado, sistema cria uma nova sessão em `user_sessions`
4. Token é usado para autenticar requisições subsequentes
5. Atividades são registradas em `user_activity_logs`
6. Na expiração da sessão ou logout, o registro em `user_sessions` é removido

## Fluxo de Permissões

1. Por padrão, as permissões são determinadas pelo papel (role) do usuário
2. Permissões específicas podem ser sobrescritas na tabela `user_permissions`
3. O sistema verifica as permissões antes de permitir ações restritas

## Fluxo de Preferências

1. Preferências padrão são criadas quando um novo usuário é registrado
2. Usuários podem atualizar suas preferências a qualquer momento
3. As preferências são aplicadas à interface do usuário quando ele faz login
