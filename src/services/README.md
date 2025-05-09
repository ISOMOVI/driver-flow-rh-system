
# Diretório services

Este diretório contém serviços e dados mockados utilizados na aplicação RH Entregadores, que serão substituídos por chamadas reais a APIs em uma implementação futura.

## Arquivos

### mockData.ts

`mockData.ts` é o principal arquivo contendo dados mockados para simular o comportamento da aplicação sem um backend real.

**Categorias de Dados:**
- Usuários e autenticação
- Candidatos e recrutamento
- Entregadores e operações
- Clientes e contratos
- Pagamentos e financeiro

## Estrutura de Dados Mockados

### Usuários

Dados que simulam usuários do sistema com diferentes níveis de permissão:
- Administradores
- Gestores
- Suporte

### Candidatos

Dados que simulam candidatos em diferentes etapas do processo de recrutamento:
- Informações pessoais
- Status do processo
- Documentos
- Histórico de interações

### Entregadores

Dados que simulam entregadores ativos no sistema:
- Dados pessoais
- Informações de veículo
- Cliente associado
- Histórico de frequência e pagamentos

### Clientes

Dados que simulam clientes da plataforma:
- Informações de contato
- Endereço
- Entregadores associados
- Status do contrato

### Pagamentos

Dados que simulam transações financeiras:
- Pagamentos a entregadores
- Períodos de referência
- Status de processamento
- Métodos de pagamento

## Futura Integração com APIs

Atualmente, o diretório `services` contém apenas dados mockados, mas está estruturado para facilitar a migração para APIs reais:

### Modelo de Integração Futura:

1. **Autenticação**:
   - login/logout
   - verificação de token
   - refresh token

2. **APIs de Recrutamento**:
   - CRUD de candidatos
   - Gerenciamento de etapas do processo
   - Registro de histórico

3. **APIs de Operações**:
   - Gerenciamento de clientes
   - Registro de frequência
   - Processamento de pagamentos

4. **APIs de Usuários**:
   - Gerenciamento de usuários
   - Controle de permissões
   - Auditoria de ações

## Melhores Práticas

Para facilitar a transição futura de dados mockados para APIs reais:

1. **Estrutura Similar**: Os dados mockados devem ter estrutura similar à resposta esperada das APIs
2. **Simulação de Latência**: Atrasos simulados para representar chamadas de rede
3. **Tratamento de Erros**: Simulação de cenários de erro para testar o comportamento da UI
4. **Interface Consistente**: Funções que encapsulam o acesso aos dados com assinaturas que serão mantidas na implementação real
