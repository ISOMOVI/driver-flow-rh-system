
# Diretório components/Dashboard

Este diretório contém componentes específicos para visualização de dados no dashboard da aplicação RH Entregadores.

## Componentes

### StatCard

`StatCard` é um componente para exibir métricas estatísticas com recursos visuais.

**Características:**
- Exibe título, valor numérico e ícone
- Suporta exibição de tendências (crescimento/decrescimento)
- Animação de fade-in para melhor experiência de usuário
- Personalizável através de classes de cores

**Props:**
- `title`: Título da estatística
- `value`: Valor numérico ou texto a ser exibido
- `icon`: Ícone Lucide a ser exibido
- `trend`: (Opcional) Objeto com valor e direção da tendência
- `colorClass`: (Opcional) Classe CSS para personalizar as cores

### DriversTable

`DriversTable` é um componente para exibição de dados tabulares sobre entregadores.

**Características:**
- Exibição de entregadores com informações detalhadas
- Indicadores visuais de status com badges coloridos
- Estado de carregamento com skeleton loader
- Mensagem para estado vazio
- Paginação simplificada

**Props:**
- `drivers`: Array de objetos com dados dos entregadores
- `title`: (Opcional) Título da tabela
- `isLoading`: (Opcional) Estado de carregamento

## Uso

Os componentes deste diretório são principalmente utilizados na página inicial (Index) para exibir KPIs e dados resumidos importantes para a tomada de decisão.

Exemplo:

```tsx
import { StatCard } from '@/components/Dashboard/StatCard';
import { Users } from 'lucide-react';

<StatCard 
  title="Total de Entregadores" 
  value="124" 
  icon={Users} 
  trend={{ value: 12, positive: true }} 
/>
```

## Melhores Práticas

1. **Responsividade**: Todos os componentes do dashboard devem ser responsivos
2. **Performance**: Evitar renderizações desnecessárias em componentes que exibem muitos dados
3. **Acessibilidade**: Utilizar cores com contraste adequado e textos alternativos para ícones
4. **Estados vazios**: Sempre considerar e tratar adequadamente estados vazios ou de erro
