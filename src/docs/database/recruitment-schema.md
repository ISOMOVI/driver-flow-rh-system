
# Estrutura de Dados: Módulo de Recrutamento

## Tabela: candidates

Esta tabela armazena informações sobre os candidatos no processo de recrutamento.

| Campo | Tipo | Descrição | Restrições |
|-------|------|-----------|------------|
| id | UUID | Identificador único do candidato | PK, NOT NULL |
| name | VARCHAR(255) | Nome completo do candidato | NOT NULL |
| phone | VARCHAR(20) | Número de telefone | NOT NULL |
| email | VARCHAR(255) | Email do candidato | NOT NULL, UNIQUE |
| city | VARCHAR(100) | Cidade do candidato | NOT NULL |
| status | ENUM | Status do candidato no processo seletivo | NOT NULL, CHECK (status IN ('new', 'form_sent', 'form_completed', 'video_requested', 'video_received', 'approved', 'rejected')) |
| created_at | TIMESTAMP | Data de criação do registro | NOT NULL, DEFAULT NOW() |
| updated_at | TIMESTAMP | Data da última atualização | NOT NULL, DEFAULT NOW() |

## Tabela: candidate_forms

Esta tabela armazena os dados do formulário preenchido pelos candidatos.

| Campo | Tipo | Descrição | Restrições |
|-------|------|-----------|------------|
| id | UUID | Identificador único do formulário | PK, NOT NULL |
| candidate_id | UUID | ID do candidato relacionado | FK (candidates.id), NOT NULL |
| full_name | VARCHAR(255) | Nome completo do candidato | NOT NULL |
| cpf | VARCHAR(14) | CPF do candidato | NOT NULL, UNIQUE |
| birthday | DATE | Data de nascimento | NOT NULL |
| address | TEXT | Endereço completo | NOT NULL |
| cnh | VARCHAR(20) | Número da CNH | NOT NULL |
| cnh_category | VARCHAR(2) | Categoria da CNH | NOT NULL |
| vehicle_type | VARCHAR(50) | Tipo de veículo | NOT NULL |
| vehicle_plate | VARCHAR(10) | Placa do veículo | NULL |

## Tabela: candidate_videos

Esta tabela armazena os vídeos enviados pelos candidatos.

| Campo | Tipo | Descrição | Restrições |
|-------|------|-----------|------------|
| id | UUID | Identificador único do vídeo | PK, NOT NULL |
| candidate_id | UUID | ID do candidato relacionado | FK (candidates.id), NOT NULL |
| video_url | VARCHAR(255) | URL do vídeo de apresentação | NOT NULL |
| created_at | TIMESTAMP | Data de upload do vídeo | NOT NULL, DEFAULT NOW() |

## Tabela: candidate_notes

Esta tabela armazena anotações sobre os candidatos.

| Campo | Tipo | Descrição | Restrições |
|-------|------|-----------|------------|
| id | UUID | Identificador único da nota | PK, NOT NULL |
| candidate_id | UUID | ID do candidato relacionado | FK (candidates.id), NOT NULL |
| note | TEXT | Conteúdo da nota | NOT NULL |
| created_by | UUID | ID do usuário que criou a nota | FK (users.id), NOT NULL |
| created_at | TIMESTAMP | Data de criação da nota | NOT NULL, DEFAULT NOW() |

## Relacionamentos

- Um candidato (`candidates`) pode ter um formulário (`candidate_forms`) - Relacionamento 1:1
- Um candidato (`candidates`) pode ter um vídeo (`candidate_videos`) - Relacionamento 1:1
- Um candidato (`candidates`) pode ter várias notas (`candidate_notes`) - Relacionamento 1:N

## Fluxo de Dados

1. Um novo candidato é registrado na tabela `candidates` com status 'new'
2. Quando o formulário é enviado, o status é atualizado para 'form_sent'
3. Após o candidato preencher o formulário, os dados são salvos em `candidate_forms` e o status é atualizado para 'form_completed'
4. Quando um vídeo é solicitado, o status é atualizado para 'video_requested'
5. Após o envio do vídeo, os dados são salvos em `candidate_videos` e o status é atualizado para 'video_received'
6. Um recrutador pode então aprovar ('approved') ou rejeitar ('rejected') o candidato
7. Candidatos aprovados podem ser convertidos em motoristas no sistema operacional
