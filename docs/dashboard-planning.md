# Dashboard do Usuário - Planejamento e Implementação

## 🎯 Objetivo

Criar uma tela de dashboard moderna e amigável para usuários que já possuem cursos criados, oferecendo navegação intuitiva entre diferentes funcionalidades.

## 🤔 Chain of Thoughts - Análise do Problema

### 1. Identificação das Necessidades

- **Problema**: Usuários com cursos criados precisam de uma interface para gerenciar seus estudos
- **Contexto**: Sistema ainda em desenvolvimento (backend em construção)
- **Solução temporária**: Usar localStorage para simular dados de cursos

### 2. Estrutura de Navegação

**Opções consideradas:**

- ✅ **Navbar lateral tradicional**: Familiar, funcional
- ✅ **Layout moderno com cards**: Visualmente atrativo, mobile-friendly
- 🎯 **Decisão**: Implementar ambos e permitir escolha via configuração

### 3. Categorização dos Menus

**Grupo 1 - Cursos:**

- Home (Dashboard principal)
- Novo Curso
- Em Andamento
- Concluídos

**Grupo 2 - Recursos:**

- Biblioteca
- Relatórios
- Configurações

## 📋 Passo a Passo da Implementação

### Fase 1: Estrutura Base e Dados Mock

1. **Criar tipos TypeScript para cursos**

   - Interface Course
   - Status de curso (em_andamento, concluido, pausado)
   - Dados de progresso

2. **Implementar sistema de dados mock**

   - Função para gerar cursos fictícios
   - Gerenciamento via localStorage
   - Utilitários para CRUD de cursos

3. **Criar contexto de cursos**
   - CourseContext para gerenciar estado global
   - Funções para manipular cursos
   - Integração com AuthContext

### Fase 2: Layout e Navegação

4. **Criar componentes de layout**

   - DashboardLayout (container principal)
   - Sidebar (navegação lateral)
   - TopBar (navegação superior)
   - MainContent (área de conteúdo)

5. **Implementar sistema de navegação**
   - Roteamento entre seções
   - Estado ativo de menu
   - Responsividade mobile

### Fase 3: Páginas do Dashboard

6. **Página Home (Dashboard principal)**

   - Resumo de cursos
   - Estatísticas rápidas
   - Ações principais

7. **Página Em Andamento**

   - Lista de cursos ativos
   - Progresso visual
   - Botões de ação

8. **Página Concluídos**

   - Histórico de cursos
   - Certificados/badges
   - Opções de revisão

9. **Páginas secundárias**
   - Biblioteca (recursos salvos)
   - Relatórios (estatísticas detalhadas)
   - Configurações (preferências)

### Fase 4: Integração e Polimento

10. **Integrar com fluxo existente**

    - Modificar Hero.tsx para detectar cursos existentes
    - Redirecionar para dashboard quando apropriado
    - Manter fluxo de criação de novo curso

11. **Implementar configurações de layout**

    - Toggle sidebar/cards
    - Persistir preferência do usuário
    - Animações e transições

12. **Testes e refinamentos**
    - Testar todos os fluxos
    - Ajustar responsividade
    - Polir UX/UI

## 🎨 Decisões de Design

### Layout Moderno Escolhido

- **Sidebar colapsável** para desktop
- **Bottom navigation** para mobile
- **Cards com gradientes** seguindo paleta existente
- **Ícones intuitivos** para cada seção

### Paleta de Cores (mantendo consistência)

- Primária: `#593100` (marrom escuro)
- Secundária: `#cc6200` (laranja)
- Accent: `#ff8c00` (laranja claro)
- Background: `#fff7f0` (bege claro)
- Cards: `#ffddc2` (bege médio)

### Componentes Principais

```
DashboardLayout
├── Sidebar
│   ├── UserProfile
│   ├── NavigationMenu
│   └── LogoutButton
├── MainContent
│   ├── TopBar (breadcrumb + actions)
│   └── PageContent (dinâmico)
└── MobileNavigation
```

## 📊 Estrutura de Dados Mock

### Interface Course

```typescript
interface Course {
  id: string;
  name: string;
  description: string;
  status: "em_andamento" | "concluido" | "pausado";
  progress: number; // 0-100
  totalLessons: number;
  completedLessons: number;
  createdAt: Date;
  updatedAt: Date;
  category: string;
  difficulty: "iniciante" | "intermediario" | "avancado";
  estimatedHours: number;
  tags: string[];
}
```

### Dados de Exemplo

- 3-5 cursos em andamento
- 2-3 cursos concluídos
- Variação de progresso e categorias
- Dados realistas de tempo e dificuldade

## 🚀 Critérios de Sucesso

### Funcionalidade

- [ ] Navegação fluida entre seções
- [ ] Dados persistem no localStorage
- [ ] Responsivo em todos os dispositivos
- [ ] Integração com fluxo de criação de curso

### UX/UI

- [ ] Visual consistente com design existente
- [ ] Animações suaves e performáticas
- [ ] Feedback visual adequado
- [ ] Acessibilidade básica

### Código

- [ ] Componentes reutilizáveis
- [ ] TypeScript bem tipado
- [ ] Fácil manutenção
- [ ] Preparado para integração com backend

## 📝 Próximos Passos

1. **Aprovação do plano** ✅
2. **Implementação Fase 1** - Estrutura base
3. **Implementação Fase 2** - Layout
4. **Implementação Fase 3** - Páginas
5. **Implementação Fase 4** - Integração
6. **Testes e refinamentos**

---

_Documento criado para guiar a implementação do dashboard do usuário no sistema Falky._
