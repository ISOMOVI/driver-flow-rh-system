
# Diretório components/ui

Este diretório contém componentes de interface do usuário reutilizáveis baseados na biblioteca shadcn/ui, personalizados para a aplicação RH Entregadores.

## Visão Geral

Os componentes neste diretório são construídos com base no Radix UI e estilizados com Tailwind CSS, seguindo o padrão da biblioteca shadcn/ui. Eles formam o sistema de design da aplicação e garantem consistência visual em toda a interface.

## Componentes Principais

### Elementos de Formulário
- **Input**: Campos de entrada de texto
- **Select**: Seletores dropdown
- **Checkbox**: Caixas de seleção
- **RadioGroup**: Grupos de opções mutuamente exclusivas
- **Switch**: Alternadores de estado
- **Textarea**: Áreas de texto multilinhas

### Elementos de Layout
- **Accordion**: Painéis expansíveis
- **Card**: Contêineres de conteúdo com estilos predefinidos
- **Dialog**: Janelas modais
- **Popover**: Elementos flutuantes ancorados
- **Sheet**: Painéis deslizantes
- **Tabs**: Sistema de abas

### Elementos de Feedback
- **Alert**: Mensagens de alerta
- **Toast**: Notificações temporárias
- **Progress**: Barras de progresso

### Elementos de Navegação
- **Sidebar**: Navegação lateral
- **Breadcrumb**: Trilha de navegação
- **DropdownMenu**: Menus suspensos
- **NavigationMenu**: Menus de navegação complexos

### Elementos de Apresentação
- **Avatar**: Representação visual de usuários
- **Badge**: Indicadores visuais pequenos
- **Separator**: Linhas divisórias
- **AspectRatio**: Controle da proporção de elementos

## Personalização

Os componentes shadcn/ui são altamente personalizáveis através do sistema de classes do Tailwind CSS. A personalização na aplicação RH Entregadores inclui:

- Esquema de cores personalizado com foco em tons de azul e índigo
- Tipografia consistente com hierarquia clara
- Raios de borda e sombras personalizadas
- Animações e transições suaves

## Uso

Os componentes são importados individualmente de seus respectivos arquivos:

```tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function MyForm() {
  return (
    <div>
      <Input placeholder="Digite seu nome" />
      <Button>Enviar</Button>
    </div>
  );
}
```

## Acessibilidade

Os componentes são construídos com base no Radix UI, que fornece funcionalidades de acessibilidade robustas:

- Suporte completo a navegação por teclado
- Atributos ARIA apropriados
- Foco gerenciado para elementos interativos
- Alto contraste para legibilidade

## Extensibilidade

Novos componentes podem ser adicionados seguindo o padrão shadcn/ui:

1. Criar um novo arquivo no diretório ui/
2. Importar os primitivos necessários do Radix UI
3. Aplicar estilos consistentes com Tailwind CSS
4. Exportar o componente para uso na aplicação
