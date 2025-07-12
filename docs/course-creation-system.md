# 🎯 Sistema de Criação de Cursos - Falky Frontend

## Visão Geral

O sistema de criação de cursos permite aos usuários personalizar completamente sua experiência de aprendizado através de um fluxo de 5 etapas, coletando informações sobre o curso desejado e preferências pessoais para criar cursos sob medida.

## 🏗️ Arquitetura do Sistema

### Gerenciamento de Estado Global
- **Context API**: `CourseCreationContext` gerencia todo o estado do fluxo
- **Reducer Pattern**: Ações tipadas para mudanças de estado previsíveis
- **Persistência**: Estado mantido durante toda a navegação entre steps

### Fluxo Multi-Step
```
Step 1 → Step 2 → Step 3 → Step 4 → Step 5 → Sucesso
  ↓        ↓        ↓        ↓        ↓        ↓
Nome    Nível    Ritmo   Objetivo   Final   API Call
```

## 📋 Estrutura dos Steps

### Step 1: Nome do Curso
- **Arquivo**: `src/app/create-course-step-one/page.tsx`
- **Função**: Coleta o nome/tópico do curso
- **Campo**: `courseName` (string)
- **Validação**: Nome não pode estar vazio
- **Features**:
  - Input text para nome livre
  - Cards de sugestões clicáveis
  - Indicador de progresso (20%)

### Step 2: Nível de Conhecimento
- **Arquivo**: `src/app/create-course-step-two/page.tsx`
- **Função**: Define o nível de experiência do usuário
- **Campo**: `knowledgeLevel` (KnowledgeLevelType)
- **Opções**:
  - 🌱 **Iniciante**: Pouco ou nenhum conhecimento
  - 📚 **Intermediário**: Conhecimento básico com lacunas
  - 🎓 **Avançado**: Conhecimento sólido buscando aprofundamento
- **Features**:
  - Cards selecionáveis com feedback visual
  - Resumo das escolhas anteriores
  - Indicador de progresso (40%)

### Step 3: Ritmo de Estudo
- **Arquivo**: `src/app/create-course-step-three/page.tsx`
- **Função**: Define a velocidade de aprendizado
- **Campo**: `studyPace` (StudyRhythmType)
- **Opções**:
  - 🐌 **Pausado**: Explanações detalhadas, tempo para absorver
  - 🚶 **Moderado**: Equilíbrio entre detalhamento e agilidade
  - 🏃 **Rápido**: Conteúdo condensado e dinâmico
- **Features**:
  - Resumo acumulativo das escolhas
  - Indicador de progresso (60%)

### Step 4: Objetivos e Motivações
- **Arquivo**: `src/app/create-course-step-four/page.tsx`
- **Função**: Define a finalidade do aprendizado
- **Campo**: `goalsAndMotivations` (MotivationGoalType)
- **Opções**:
  - 📋 **Aprovação em Prova**: Foco em exames e certificações
  - 🎯 **Domínio do Tema**: Compreensão profunda e completa
  - 🎨 **Hobby Pessoal**: Interesse pessoal e curiosidade
- **Features**:
  - Resumo completo em grid 2x2
  - Indicador de progresso (80%)

### Step 5: Finalização
- **Arquivo**: `src/app/create-course-step-five/page.tsx`
- **Função**: Coleta informações extras e executa criação
- **Campo**: `additionalInformation` (string, opcional)
- **Features**:
  - Textarea para informações extras
  - Resumo final completo e visual
  - Botão de criação com loading state
  - Chamada à API de course-preferences
  - Indicador de progresso (100%)

## 🎯 Context e Estado

### Interface do Estado
```typescript
interface CourseCreationState {
  step: number;                              // Step atual (1-5)
  courseName: string;                        // Nome do curso
  knowledgeLevel: KnowledgeLevelType | null; // Nível de conhecimento
  studyPace: StudyRhythmType | null;         // Ritmo de estudo
  goalsAndMotivations: MotivationGoalType | null; // Objetivos
  additionalInformation: string;             // Info adicional
  isCompleted: boolean;                      // Se foi finalizado
  userId: string;                           // ID do usuário
}
```

### Ações Disponíveis
```typescript
type CourseCreationAction =
  | { type: 'SET_COURSE_NAME'; payload: string }
  | { type: 'SET_KNOWLEDGE_LEVEL'; payload: KnowledgeLevelType }
  | { type: 'SET_STUDY_PACE'; payload: StudyRhythmType }
  | { type: 'SET_GOALS_AND_MOTIVATIONS'; payload: MotivationGoalType }
  | { type: 'SET_ADDITIONAL_INFORMATION'; payload: string }
  | { type: 'SET_USER_ID'; payload: string }
  | { type: 'NEXT_STEP' }
  | { type: 'PREVIOUS_STEP' }
  | { type: 'COMPLETE_CREATION' }
  | { type: 'RESET' };
```

### Funções Utilitárias
- `canProceedToNext()`: Valida se pode avançar para próximo step
- `isStepValid(step)`: Verifica se um step específico é válido
- `getCoursePreferencesData()`: Formata dados para API

## 🔄 Fluxo de Navegação

### Navegação Progressiva
1. **Validação**: Cada step valida se pode prosseguir
2. **Estado Persistente**: Dados mantidos durante navegação
3. **Voltar**: Possibilidade de retornar a steps anteriores
4. **Indicadores**: Barra de progresso visual

### Controle de Estado
```typescript
// Avançar step
dispatch({ type: 'NEXT_STEP' });
router.push('/create-course-step-two');

// Voltar step  
dispatch({ type: 'PREVIOUS_STEP' });
router.push('/create-course-step-one');

// Definir dados
dispatch({ type: 'SET_COURSE_NAME', payload: 'Inteligência Artificial' });
```

## 🚀 Integração com API

### Endpoint Utilizado
- **POST** `/api/v1/course-preferences`
- **Dados**: CoursePreferencesCreate + user_id

### Processo de Criação
```typescript
// 1. Obter dados formatados do context
const courseData = getCoursePreferencesData();

// 2. Adicionar user_id
const completeData = {
  user_id: "user_demo_123", // Em produção: da autenticação
  ...courseData,
};

// 3. Chamar API
const response = await apiController.setCoursePreferences(completeData);

// 4. Tratar resposta
if (response.success) {
  dispatch({ type: 'COMPLETE_CREATION' });
  router.push('/course-created-success');
}
```

### Dados Enviados
```typescript
{
  user_id: string,
  course_name: string,
  knowledge_level: "novato" | "intermediario" | "avancado",
  study_pace: "pausado" | "moderado" | "rapido", 
  goals_and_motivations: "aprovacao_prova" | "dominio_tema" | "hobby",
  additional_information?: string
}
```

## ✅ Página de Sucesso

### Funcionalidades
- **Confirmação visual**: Animação de sucesso
- **Resumo completo**: Todos os dados escolhidos
- **Próximos passos**: Orientações pós-criação
- **Ações**: Voltar, criar outro curso, testar API
- **Auto-reset**: Estado limpo após 10 segundos

## 🎨 Design System

### Cores Principais
- **Primary**: `#593100` (Marrom escuro)
- **Secondary**: `#cc6200` (Laranja)
- **Background**: `#fff7f0` (Bege claro)
- **Cards**: `#ffddc2` (Laranja claro)

### Componentes Visuais
- **Progress Bar**: Indicador de progresso com % e cores
- **Selection Cards**: Cards interativos com hover e seleção
- **Form Elements**: Inputs e textareas estilizados
- **Buttons**: Gradientes e estados (loading, disabled)

### Responsividade
- **Mobile First**: Design otimizado para mobile
- **Grid Adaptive**: Layouts que se adaptam à tela
- **Touch Friendly**: Elementos grandes para touch

## 🔧 Configuração e Uso

### Setup do Provider
```tsx
// layout.tsx
import { CourseCreationProvider } from "@/contexts/CourseCreationContext";

export default function RootLayout({ children }) {
  return (
    <CourseCreationProvider>
      {children}
    </CourseCreationProvider>
  );
}
```

### Uso em Componentes
```tsx
// Qualquer página do fluxo
import { useCourseCreation } from "@/contexts/CourseCreationContext";

const { state, dispatch, canProceedToNext } = useCourseCreation();
```

### Opções Pré-definidas
```typescript
// Importadas do context
import { 
  KNOWLEDGE_LEVEL_OPTIONS,
  STUDY_PACE_OPTIONS, 
  GOALS_AND_MOTIVATIONS_OPTIONS 
} from "@/contexts/CourseCreationContext";
```

## 🧪 Testes e Debugging

### Console Logs
- Dados enviados para API são logados
- Estado do context visível no DevTools
- Erros tratados com alerts informativos

### Validações
- Campos obrigatórios verificados
- Botões desabilitados quando inválido
- Feedback visual de estados

### Error Handling
```typescript
try {
  const response = await apiController.setCoursePreferences(data);
  // Sucesso
} catch (error) {
  console.error("Erro ao criar curso:", error);
  alert("Erro ao criar curso. Tente novamente.");
}
```

## 📱 Fluxo do Usuário

### Jornada Completa
1. **Entrada**: Usuário acessa Step 1
2. **Preenchimento**: Navega pelos 5 steps
3. **Validação**: Sistema valida cada etapa
4. **Criação**: API é chamada no Step 5
5. **Confirmação**: Página de sucesso exibida
6. **Saída**: Opções de próximas ações

### Pontos de Saída
- **Voltar ao início**: Link sempre disponível
- **Abandono**: Estado mantido para retorno
- **Sucesso**: Múltiplas opções de continuação

## 🚀 Melhorias Futuras

### Funcionalidades Planejadas
- **Salvamento**: Persistir estado no localStorage
- **Login**: Integrar com sistema de autenticação
- **Preview**: Visualizar curso antes de criar
- **Templates**: Modelos pré-configurados
- **Compartilhamento**: Enviar configurações via link

### Otimizações
- **Performance**: Lazy loading de steps
- **UX**: Animações entre transições
- **Acessibilidade**: ARIA labels e navegação por teclado
- **PWA**: Funcionar offline

---

**Sistema implementado com foco na experiência do usuário e integração robusta com a API do Falky! 🎉** 