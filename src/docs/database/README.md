
# Documentação da Estrutura de Dados do Sistema RH Entregadores

Esta documentação detalha as estruturas de dados para cada módulo do sistema, suas relações e fluxos de informações para facilitar a integração com banco de dados.

## Módulos do Sistema

O sistema está dividido em vários módulos, cada um com sua própria estrutura de dados:

1. **[Recrutamento](./recruitment-schema.md)** - Gerenciamento de candidatos e processo seletivo
2. **[Operações](./operations-schema.md)** - Gerenciamento de motoristas, clientes, frequência e pagamentos
3. **[Usuários](./users-schema.md)** - Gerenciamento de usuários, perfis e permissões
4. **[Mensagens](./messages-schema.md)** - Sistema de comunicação do aplicativo

## Relações Entre Módulos

### Recrutamento → Operações
- Candidatos aprovados (`candidates` com status 'approved') são convertidos em motoristas (`drivers`)
- Os dados do formulário do candidato são transferidos para o perfil do motorista

### Operações → Recrutamento
- O histórico de candidatos inclui tanto candidatos atuais quanto motoristas aprovados

### Usuários → Todos os Módulos
- Usuários (`users`) do sistema interagem com todos os demais módulos
- As permissões dos usuários determinam suas capacidades em cada módulo

### Mensagens → Todos os Módulos
- Mensagens podem ser enviadas para candidatos (Recrutamento) ou motoristas (Operações)
- Mensagens são enviadas por usuários do sistema (Usuários)

## Considerações para Implementação do Banco de Dados

### Chaves Primárias
- Todas as tabelas utilizam UUID como chave primária para facilitar a sincronização entre ambientes

### Rastreabilidade
- Campos `created_at`, `updated_at` ajudam a manter um histórico de alterações
- Campos `created_by` relacionam ações a usuários específicos do sistema

### Soft Delete
- Recomendado implementar soft delete (campo `deleted_at`) para registros importantes
- Em vez de excluir permanentemente, marcar como excluído

### Indexação Recomendada
- Todas as chaves estrangeiras (FK) devem ser indexadas
- Campos frequentemente usados em consultas (email, status, dates) devem ser indexadas

### Validação
- Implementar validações no banco de dados (constraints CHECK) e na aplicação
- Garantir integridade referencial com FOREIGN KEY

### Segurança
- Armazenar senhas usando algoritmos de hash seguros (bcrypt, Argon2)
- Implementar políticas de segurança de linha (RLS) se usar PostgreSQL

## Diagrama de Relacionamentos

Para uma visão completa dos relacionamentos entre as tabelas, consulte o diagrama ERD (Entity-Relationship Diagram) na documentação completa do projeto.

## Estratégia de Migração

Recomenda-se implementar o banco de dados em etapas, seguindo a ordem:

1. Módulo de Usuários
2. Módulo de Recrutamento
3. Módulo de Operações
4. Módulo de Mensagens

Para cada etapa, criar migrations que possam ser aplicadas de forma incremental.
