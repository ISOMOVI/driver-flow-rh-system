
# Diretório hooks

Este diretório contém hooks personalizados (custom hooks) utilizados na aplicação RH Entregadores para encapsular e reutilizar lógica entre componentes.

## Hooks Disponíveis

### useMobile

`useMobile` é um hook que detecta se a aplicação está sendo exibida em um dispositivo móvel.

**Funcionalidades:**
- Verifica o tamanho da tela atual
- Retorna um boolean indicando se o viewport é de tamanho móvel
- Atualiza automaticamente o valor quando o tamanho da janela muda

**Uso:**
```tsx
const isMobile = useMobile();

return (
  <div>
    {isMobile ? <MobileView /> : <DesktopView />}
  </div>
);
```

### useToast

`useToast` é um hook para exibir notificações temporárias na interface.

**Funcionalidades:**
- Exibição de mensagens de sucesso, erro, aviso e informação
- Personalização de duração, posição e ações
- Fila de notificações para evitar sobrecarga

**Uso:**
```tsx
const { toast } = useToast();

const handleSave = () => {
  // Lógica de salvamento
  toast({
    title: "Sucesso",
    description: "Dados salvos com sucesso!",
    variant: "default",
  });
};
```

## Padrões de Implementação

### Composição de Hooks

Os hooks personalizados podem usar outros hooks do React (useState, useEffect, useContext) ou outros hooks personalizados:

```tsx
function useCustomHook() {
  const [state, setState] = useState(initialValue);
  const isMobile = useMobile();
  
  useEffect(() => {
    // Lógica que depende de isMobile e state
  }, [isMobile, state]);
  
  return { /* valores e funções expostos */ };
}
```

### Encapsulamento de Lógica

Os hooks encapsulam lógica complexa ou repetitiva, deixando os componentes mais limpos:

- Lógica de validação de formulários
- Manipulação de eventos comuns
- Acesso a APIs e estado global
- Cálculos e transformações de dados

## Integração com o Sistema

- Hooks são importados diretamente nos componentes que precisam da funcionalidade
- Podem acessar contextos globais como AuthContext
- Podem integrar-se com bibliotecas externas como TanStack Query

## Melhores Práticas

1. **Nomeação**: Sempre começar com "use" para seguir a convenção do React
2. **Responsabilidade Única**: Cada hook deve ter uma responsabilidade clara
3. **Desempenho**: Evitar cálculos desnecessários e usar memoização quando apropriado
4. **Documentação**: Documentar claramente inputs, outputs e comportamento esperado
5. **Testabilidade**: Escrever hooks de forma que possam ser facilmente testados

## Criação de Novos Hooks

Para criar um novo hook personalizado:

1. Criar um arquivo no diretório hooks/ com o nome do hook (ex: useFormValidation.ts)
2. Implementar o hook seguindo as convenções do React
3. Exportar o hook como default ou named export
4. Documentar o propósito e uso do hook
