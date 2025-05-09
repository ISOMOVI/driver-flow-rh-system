
# Diretório types

Este diretório contém definições de tipos TypeScript utilizados na aplicação RH Entregadores, fornecendo uma estrutura tipada para todo o sistema.

## Arquivos

### users.ts

`users.ts` contém tipos relacionados a usuários e permissões.

**Tipos Principais:**
- `UserRole`: Enum com os papéis de usuário ('admin', 'gestor', 'suporte')
- `UserPermissions`: Interface descrevendo as permissões disponíveis
- `User`: Interface com dados completos de um usuário
- `DEFAULT_ROLE_PERMISSIONS`: Mapeamento de permissões padrão por papel
- Função `hasPermission`: Para verificar se um papel tem determinada permissão

### recruitment.ts

`recruitment.ts` contém tipos relacionados ao processo de recrutamento.

**Tipos Principais:**
- `CandidateStatus`: Enum com os possíveis status de um candidato
- `Candidate`: Interface com dados completos de um candidato

### operations.ts

`operations.ts` contém tipos relacionados às operações da empresa.

**Tipos Principais:**
- Tipos relacionados a entregadores (`Driver`, `DriverType`, `DriverPaymentMethod`)
- Tipos relacionados a clientes (`Client`)
- Tipos relacionados a pagamentos (`Payment`, `PaymentStatus`)
- Tipos relacionados a frequência (`Attendance`)
- Tipos relacionados a documentos (`Document`)
- Tipos relacionados a mensagens (`Message`)

## Sistema de Tipos

### Enums

Utilização de enums para valores predefinidos:

```typescript
export type CandidateStatus = 
  | 'new' 
  | 'form_sent' 
  | 'form_completed' 
  | 'video_requested' 
  | 'video_received'
  | 'approved'
  | 'rejected';
```

### Interfaces

Definição de interfaces para estruturas de dados complexas:

```typescript
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
  active: boolean;
}
```

### Tipos Utilitários

Utilização de recursos avançados do TypeScript:

```typescript
export const DEFAULT_ROLE_PERMISSIONS: Record<UserRole, UserPermissions> = {
  // ...mapeamento de permissões
};
```

## Boas Práticas

1. **Consistência**: Usar convenções de nomenclatura consistentes
2. **Documentação**: Documentar tipos complexos com comentários explicativos
3. **Extensibilidade**: Projetar tipos para serem extensíveis no futuro
4. **Reuso**: Favorecer composição de tipos para promover reuso
5. **Strictness**: Utilizar configurações estritas do TypeScript para maior segurança

## Integração com o Sistema

- Os tipos são importados nos componentes para garantir tipagem correta
- Fornecem autocompletion e validação em tempo de desenvolvimento
- Documentam a estrutura de dados esperada em cada parte do sistema
- Facilitam refatorações seguras e manutenção do código
