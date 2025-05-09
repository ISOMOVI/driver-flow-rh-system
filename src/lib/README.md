
# Diretório lib

Este diretório contém funções utilitárias e helpers que são utilizados em toda a aplicação RH Entregadores.

## Arquivos

### utils.ts

`utils.ts` é o principal arquivo de utilidades, contendo funções para manipulação de dados, formatação e outras operações comuns.

**Funcionalidades:**
- `cn`: Função para combinar nomes de classes CSS de forma condicional (baseada em clsx e tailwind-merge)
- Outras utilidades para manipulação de dados, formatação, etc.

## Categorias de Utilidades

### Manipulação de Classes CSS

Funções para trabalhar com classes CSS, especialmente úteis ao usar Tailwind CSS:

```tsx
import { cn } from "@/lib/utils";

<div className={cn(
  "base-class", 
  isActive && "active-class",
  variant === "primary" ? "primary-class" : "secondary-class"
)}>
  Conteúdo
</div>
```

### Formatação de Dados

Funções para formatar diferentes tipos de dados:

- Formatação de datas
- Formatação de valores monetários
- Formatação de números de telefone, CPF, etc.

### Validação

Funções para validar diferentes tipos de entrada:

- Validação de email
- Validação de CPF/CNPJ
- Validação de números de telefone

### Conversão de Dados

Funções para converter entre diferentes formatos de dados:

- Conversão de objetos para arrays e vice-versa
- Transformações de estruturas de dados
- Serialização e deserialização

## Padrões de Implementação

### Funções Puras

As funções utilitárias são preferencialmente implementadas como funções puras:

- Não possuem efeitos colaterais
- Para o mesmo input, sempre retornam o mesmo output
- Não dependem de estado externo

### Modularidade

Funções são projetadas para serem modulares e reutilizáveis:

- Pequenas e focadas em uma única tarefa
- Combinadas para criar funcionalidades mais complexas
- Facilmente testáveis

## Melhores Práticas

1. **Documentação**: Documentar claramente o propósito, parâmetros e retorno de cada função
2. **Tipagem**: Usar TypeScript para definir tipos de entrada e saída precisos
3. **Testabilidade**: Escrever funções que possam ser facilmente testadas
4. **Consistência**: Manter um estilo consistente em todas as funções utilitárias
