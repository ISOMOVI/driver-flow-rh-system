
# Diretório components/recruitment

Este diretório contém componentes específicos para o módulo de recrutamento da aplicação RH Entregadores.

## Componentes

### AddCandidateModal

`AddCandidateModal` é um modal para adição de novos candidatos ao sistema.

**Características:**
- Formulário para coleta de dados básicos do candidato
- Validação de campos (telefone, email, cidade)
- Interface intuitiva com feedback visual
- Status inicial definido como "new"

**Props:**
- `open`: Estado de abertura do modal
- `onOpenChange`: Callback para alteração do estado de abertura
- `onSave`: Callback executado quando um candidato é salvo

### ExportHistoryModal

`ExportHistoryModal` é um modal para exportação de dados históricos do recrutamento.

**Características:**
- Seleção de período para exportação
- Opções de formato (CSV, Excel)
- Seleção de campos a serem incluídos
- Prévia dos dados a serem exportados

**Props:**
- `open`: Estado de abertura do modal
- `onOpenChange`: Callback para alteração do estado de abertura
- `onExport`: Callback executado quando os dados são exportados

## Fluxo do Processo de Recrutamento

Os componentes neste diretório suportam o seguinte fluxo de recrutamento:

1. **Adição de Candidato**: Registro inicial dos dados básicos via `AddCandidateModal`
2. **Etapas do Processo**:
   - Envio de formulário detalhado
   - Recebimento do formulário preenchido
   - Solicitação de vídeo de apresentação
   - Recebimento do vídeo
   - Aprovação ou rejeição
3. **Histórico**: Registro de todas as etapas para consulta futura

## Integração com Outros Módulos

- Candidatos aprovados são automaticamente integrados ao módulo de operações
- Histórico de recrutamento fornece dados para relatórios e análises
- Comunicação com candidatos através do módulo de mensagens

## Estados dos Candidatos

O sistema utiliza os seguintes estados para acompanhar o progresso dos candidatos:

- `new`: Recém cadastrado
- `form_sent`: Formulário enviado ao candidato
- `form_completed`: Formulário recebido do candidato
- `video_requested`: Vídeo solicitado
- `video_received`: Vídeo recebido
- `approved`: Candidato aprovado
- `rejected`: Candidato rejeitado

## Melhores Práticas

1. Manter a interface de usuário simples e intuitiva
2. Fornecer feedback claro sobre o progresso do processo
3. Validar dados de entrada para garantir qualidade das informações
4. Permitir anotações e comentários em cada etapa do processo
