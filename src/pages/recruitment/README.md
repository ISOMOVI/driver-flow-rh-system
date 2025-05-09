
# Diretório pages/recruitment

Este diretório contém subpáginas específicas do módulo de recrutamento da aplicação RH Entregadores, cada uma correspondendo a uma aba na página principal de recrutamento.

## Páginas

### CandidatesTab.tsx

Subpágina para gerenciamento de candidatos em processo de recrutamento.

**Características:**
- Lista de candidatos em diferentes etapas do processo
- Filtros por status, cidade e data de inscrição
- Ações para avançar candidatos no processo
- Botão para adicionar novos candidatos
- Detalhes de contato e informações básicas

### ApprovedTab.tsx

Subpágina para gerenciamento de candidatos aprovados.

**Características:**
- Lista de candidatos que completaram o processo de seleção
- Documentação necessária para contratação
- Processo de onboarding
- Associação a clientes
- Definição de tipo de contrato e pagamento

### HistoryTab.tsx

Subpágina para visualização do histórico do processo de recrutamento.

**Características:**
- Dados históricos de processos de recrutamento
- Filtros por período e resultados
- Métricas de conversão (candidatos → aprovados)
- Tempo médio de cada etapa do processo
- Exportação de relatórios

## Fluxo do Processo de Recrutamento

### Etapas do Processo:

1. **Cadastro Inicial** (new)
   - Cadastro de dados básicos do candidato
   - Contato inicial

2. **Envio de Formulário** (form_sent)
   - Sistema envia formulário detalhado ao candidato
   - Aguarda resposta

3. **Recebimento do Formulário** (form_completed)
   - Análise das informações fornecidas
   - Verificação de requisitos básicos

4. **Solicitação de Vídeo** (video_requested)
   - Candidato é convidado a enviar um vídeo de apresentação
   - Instruções específicas são fornecidas

5. **Recebimento do Vídeo** (video_received)
   - Análise do vídeo recebido
   - Avaliação de comunicação e apresentação

6. **Decisão Final**
   - Aprovação (approved) ou Rejeição (rejected)
   - Comunicação da decisão ao candidato

## Estados dos Candidatos

- `new`: Recém cadastrado
- `form_sent`: Formulário enviado ao candidato
- `form_completed`: Formulário recebido do candidato
- `video_requested`: Vídeo solicitado
- `video_received`: Vídeo recebido
- `approved`: Candidato aprovado
- `rejected`: Candidato rejeitado

## Integração com Outros Módulos

- **Operações**: Candidatos aprovados são transferidos para o módulo de operações
- **Mensagens**: Comunicação com candidatos durante o processo
- **Documentos**: Armazenamento de documentos dos candidatos (CNH, comprovantes)
