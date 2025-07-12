# Sistema de Preferências do Usuário - Falky Frontend

## Visão Geral

O sistema de preferências do usuário permite personalizar a experiência educacional com base no perfil, personalidade preferida do assistente Falky, e necessidades específicas de aprendizado.

## Tipos de Dados

### Enums Disponíveis

#### FalkyPersonalityType
Define as personalidades disponíveis para o assistente Falky:
- `CONVERSADOR` - Abordagem descontraída e dialógica
- `COACH_MOTIVACIONAL` - Incentivador e energético
- `SUPERDIRETO` - Explicações enxutas e diretas
- `PROFESSOR_CLASSICO` - Postura didática e formal
- `CIENTISTA` - Fundamentação técnica e detalhada
- `ZUEIRO` - Humor e leveza no aprendizado
- `GAMER` - Gamificação do processo de aprendizagem
- `ZEN` - Abordagem serena e pausada
- `SABIO` - Metáforas e analogias filosóficas
- `HACKER` - Analogias técnicas e investigativas

#### NeurodivergenceType
Tipos de neurodivergência suportados:
- `NONE` - Nenhuma neurodivergência
- `AUTISMO_LEVE` - Autismo leve
- `TDAH` - Transtorno de Déficit de Atenção e Hiperatividade
- `DISLEXIA` - Dislexia
- `DISCALCULIA` - Discalculia
- `TRANSTORNO_PROCESSAMENTO_SENSORIAL` - Transtorno de Processamento Sensorial

#### KnowledgeLevelType
Níveis de conhecimento:
- `NOVATO` - Pouco ou nenhum conhecimento
- `INTERMEDIARIO` - Conhecimento básico com lacunas
- `AVANCADO` - Conhecimento sólido buscando aprofundamento

#### StudyRhythmType
Ritmos de estudo:
- `RAPIDO` - Conteúdo condensado e dinâmico
- `MODERADO` - Equilíbrio entre detalhamento e agilidade
- `PAUSADO` - Explanações detalhadas e tempo para absorver

#### MotivationGoalType
Metas e motivações:
- `APROVACAO_PROVA` - Foco em exames e certificações
- `DOMINIO_TEMA` - Compreensão profunda do assunto
- `HOBBY` - Interesse pessoal e curiosidade

## Interfaces

### UserPreferencesCreate
Interface para criar preferências do usuário:
```typescript
interface UserPreferencesCreate {
  user_name: string;
  user_birth_date: string; // ISO date string (YYYY-MM-DD)
  falky_personality: FalkyPersonalityType;
  user_neurodivergence?: NeurodivergenceType; // Opcional, padrão: NONE
}
```

### UserPreferencesResponse
Interface para resposta das preferências do usuário:
```typescript
interface UserPreferencesResponse {
  prefs_created_at: string;
  user_id: string;
  user_name: string;
  user_birth_date: string;
  user_age: number; // Calculado automaticamente
  falky_personality: FalkyPersonalityType;
  falky_personality_description: string;
  user_neurodivergence: NeurodivergenceType;
  user_neurodivergence_description: string;
}
```

## Métodos do Controller

### Preferências do Usuário

#### setUserPreferences(preferences: UserPreferencesCreate)
Cria preferências do usuário no backend.

**Exemplo de uso:**
```typescript
const preferences: UserPreferencesCreate = {
  user_name: "João Silva",
  user_birth_date: "1990-05-15",
  falky_personality: FalkyPersonalityType.CONVERSADOR,
  user_neurodivergence: NeurodivergenceType.NONE,
};

const response = await apiController.setUserPreferences(preferences);
```

#### getUserPreferences(userId: string)
Busca preferências do usuário por ID.

#### updateUserPreferences(userId: string, preferences: UserPreferencesUpdate)
Atualiza preferências existentes do usuário.

#### listUserPreferences()
Lista todas as preferências de usuários cadastradas.

### Preferências de Curso

#### setCoursePreferences(preferences: CoursePreferencesCreate)
Cria preferências específicas para um curso.

#### getCoursePreferences(userId: string, courseId: string)
Busca preferências de um curso específico.

#### updateCoursePreferences(userId: string, courseId: string, preferences: CoursePreferencesUpdate)
Atualiza preferências de curso existentes.

#### listCoursePreferences(userId?: string)
Lista preferências de cursos, opcionalmente filtradas por usuário.

## Exemplo Completo

```typescript
import { 
  apiController, 
  UserPreferencesCreate, 
  FalkyPersonalityType, 
  NeurodivergenceType 
} from "@/controllers/api.controller";

// Criar preferências do usuário
const userPreferences: UserPreferencesCreate = {
  user_name: "Maria Santos",
  user_birth_date: "1985-12-03",
  falky_personality: FalkyPersonalityType.COACH_MOTIVACIONAL,
  user_neurodivergence: NeurodivergenceType.TDAH,
};

try {
  const response = await apiController.setUserPreferences(userPreferences);
  
  if (response.success) {
    console.log("Preferências criadas:", response.data);
    
    // Usar o ID do usuário para criar preferências de curso
    const coursePreferences = {
      user_id: response.data.user_id,
      course_name: "JavaScript para Iniciantes",
      knowledge_level: KnowledgeLevelType.NOVATO,
      study_pace: StudyRhythmType.MODERADO,
      goals_and_motivations: MotivationGoalType.DOMINIO_TEMA,
      additional_information: "Quero aprender JS para desenvolvimento web"
    };
    
    await apiController.setCoursePreferences(coursePreferences);
  }
} catch (error) {
  console.error("Erro ao criar preferências:", error);
}
```

## Validações

O sistema inclui validações automáticas:
- Nome do usuário: 2-50 caracteres
- Data de nascimento: deve ser anterior à data atual
- Idade: entre 5 e 120 anos
- Nome do curso: 2-100 caracteres
- Informações adicionais: máximo 2000 caracteres

## Integração com Backend

O sistema se integra com os endpoints do backend:
- `POST /api/v1/user-preferences` - Criar preferências do usuário
- `GET /api/v1/user-preferences/{user_id}` - Buscar preferências do usuário
- `PUT /api/v1/user-preferences/{user_id}` - Atualizar preferências do usuário
- `GET /api/v1/user-preferences` - Listar todas as preferências
- `POST /api/v1/course-preferences` - Criar preferências de curso
- `GET /api/v1/course-preferences/{user_id}/{course_id}` - Buscar preferências de curso

## Tratamento de Erros

O sistema inclui tratamento de erros robusto:
- Erros de validação (400)
- Recursos não encontrados (404)
- Erros de servidor (500)
- Erros de rede

Todas as respostas seguem o padrão `ApiResponse<T>` com:
- `success`: boolean indicando sucesso
- `data`: dados retornados
- `error`: mensagem de erro (se houver)
- `timestamp`: timestamp da resposta 