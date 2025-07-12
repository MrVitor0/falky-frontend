/**
 * Utilitários para o sistema de preferências do usuário
 * Fornece helpers e exemplos práticos para usar o sistema
 */

import {
  UserPreferencesCreate,
  CoursePreferencesCreate,
  FalkyPersonalityType,
  NeurodivergenceType,
  KnowledgeLevelType,
  StudyRhythmType,
  MotivationGoalType,
} from "@/types/api.types";

/**
 * Cria preferências de usuário de exemplo
 * @param overrides - Valores específicos para sobrescrever os padrões
 * @returns Objeto de preferências do usuário
 */
export function createSampleUserPreferences(
  overrides: Partial<UserPreferencesCreate> = {}
): UserPreferencesCreate {
  return {
    user_name: "Usuário Teste",
    user_birth_date: "1990-01-01",
    falky_personality: FalkyPersonalityType.CONVERSADOR,
    user_neurodivergence: NeurodivergenceType.NONE,
    ...overrides,
  };
}

/**
 * Cria preferências de curso de exemplo
 * @param userId - ID do usuário
 * @param overrides - Valores específicos para sobrescrever os padrões
 * @returns Objeto de preferências do curso
 */
export function createSampleCoursePreferences(
  userId: string,
  overrides: Partial<CoursePreferencesCreate> = {}
): CoursePreferencesCreate {
  return {
    user_id: userId,
    course_name: "Curso de Exemplo",
    knowledge_level: KnowledgeLevelType.NOVATO,
    study_pace: StudyRhythmType.MODERADO,
    goals_and_motivations: MotivationGoalType.DOMINIO_TEMA,
    additional_information: "Informações adicionais sobre o curso",
    ...overrides,
  };
}

/**
 * Obtém a descrição amigável da personalidade do Falky
 * @param personality - Tipo de personalidade
 * @returns Descrição da personalidade
 */
export function getPersonalityDescription(personality: FalkyPersonalityType): string {
  const descriptions = {
    [FalkyPersonalityType.CONVERSADOR]: "Abordagem descontraída e dialógica",
    [FalkyPersonalityType.COACH_MOTIVACIONAL]: "Incentivador e energético",
    [FalkyPersonalityType.SUPERDIRETO]: "Explicações enxutas e diretas",
    [FalkyPersonalityType.PROFESSOR_CLASSICO]: "Postura didática e formal",
    [FalkyPersonalityType.CIENTISTA]: "Fundamentação técnica e detalhada",
    [FalkyPersonalityType.ZUEIRO]: "Humor e leveza no aprendizado",
    [FalkyPersonalityType.GAMER]: "Gamificação do processo de aprendizagem",
    [FalkyPersonalityType.ZEN]: "Abordagem serena e pausada",
    [FalkyPersonalityType.SABIO]: "Metáforas e analogias filosóficas",
    [FalkyPersonalityType.HACKER]: "Analogias técnicas e investigativas",
  };

  return descriptions[personality] || "Personalidade personalizada";
}

/**
 * Obtém a descrição amigável do tipo de neurodivergência
 * @param neurodivergence - Tipo de neurodivergência
 * @returns Descrição da neurodivergência
 */
export function getNeurodivergenceDescription(neurodivergence: NeurodivergenceType): string {
  const descriptions = {
    [NeurodivergenceType.NONE]: "Nenhuma neurodivergência",
    [NeurodivergenceType.AUTISMO_LEVE]: "Autismo leve",
    [NeurodivergenceType.TDAH]: "TDAH",
    [NeurodivergenceType.DISLEXIA]: "Dislexia",
    [NeurodivergenceType.DISCALCULIA]: "Discalculia",
    [NeurodivergenceType.TRANSTORNO_PROCESSAMENTO_SENSORIAL]: "Transtorno de Processamento Sensorial",
  };

  return descriptions[neurodivergence] || "Tipo não especificado";
}

/**
 * Obtém a descrição amigável do nível de conhecimento
 * @param level - Nível de conhecimento
 * @returns Descrição do nível
 */
export function getKnowledgeLevelDescription(level: KnowledgeLevelType): string {
  const descriptions = {
    [KnowledgeLevelType.NOVATO]: "Iniciante",
    [KnowledgeLevelType.INTERMEDIARIO]: "Intermediário",
    [KnowledgeLevelType.AVANCADO]: "Avançado",
  };

  return descriptions[level] || "Nível não especificado";
}

/**
 * Obtém a descrição amigável do ritmo de estudo
 * @param rhythm - Ritmo de estudo
 * @returns Descrição do ritmo
 */
export function getStudyRhythmDescription(rhythm: StudyRhythmType): string {
  const descriptions = {
    [StudyRhythmType.RAPIDO]: "Rápido e dinâmico",
    [StudyRhythmType.MODERADO]: "Moderado e equilibrado",
    [StudyRhythmType.PAUSADO]: "Pausado e detalhado",
  };

  return descriptions[rhythm] || "Ritmo não especificado";
}

/**
 * Obtém a descrição amigável da motivação/meta
 * @param goal - Meta/motivação
 * @returns Descrição da meta
 */
export function getMotivationGoalDescription(goal: MotivationGoalType): string {
  const descriptions = {
    [MotivationGoalType.APROVACAO_PROVA]: "Aprovação em prova/certificação",
    [MotivationGoalType.DOMINIO_TEMA]: "Domínio completo do tema",
    [MotivationGoalType.HOBBY]: "Hobby e interesse pessoal",
  };

  return descriptions[goal] || "Meta não especificada";
}

/**
 * Valida se uma data de nascimento é válida
 * @param birthDate - Data de nascimento no formato YYYY-MM-DD
 * @returns Boolean indicando se é válida
 */
export function isValidBirthDate(birthDate: string): boolean {
  const date = new Date(birthDate);
  const today = new Date();
  
  // Verifica se a data é válida
  if (isNaN(date.getTime())) {
    return false;
  }
  
  // Verifica se a data não é futura
  if (date >= today) {
    return false;
  }
  
  // Calcula a idade
  const age = today.getFullYear() - date.getFullYear();
  const monthDiff = today.getMonth() - date.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
    return age >= 5 && age <= 120;
  }
  
  return age >= 5 && age <= 120;
}

/**
 * Calcula a idade baseada na data de nascimento
 * @param birthDate - Data de nascimento no formato YYYY-MM-DD
 * @returns Idade em anos
 */
export function calculateAge(birthDate: string): number {
  const birth = new Date(birthDate);
  const today = new Date();
  
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}

/**
 * Exemplos de preferências pré-definidas para diferentes perfis
 */
export const SAMPLE_PREFERENCES = {
  ESTUDANTE_TRADICIONAL: createSampleUserPreferences({
    user_name: "João Silva",
    user_birth_date: "2000-05-15",
    falky_personality: FalkyPersonalityType.PROFESSOR_CLASSICO,
    user_neurodivergence: NeurodivergenceType.NONE,
  }),
  
  PROFISSIONAL_RAPIDO: createSampleUserPreferences({
    user_name: "Maria Santos",
    user_birth_date: "1985-08-22",
    falky_personality: FalkyPersonalityType.SUPERDIRETO,
    user_neurodivergence: NeurodivergenceType.NONE,
  }),
  
  INICIANTE_MOTIVADO: createSampleUserPreferences({
    user_name: "Pedro Costa",
    user_birth_date: "1995-12-03",
    falky_personality: FalkyPersonalityType.COACH_MOTIVACIONAL,
    user_neurodivergence: NeurodivergenceType.NONE,
  }),
  
  TECH_ENTHUSIAST: createSampleUserPreferences({
    user_name: "Ana Ferreira",
    user_birth_date: "1992-03-18",
    falky_personality: FalkyPersonalityType.HACKER,
    user_neurodivergence: NeurodivergenceType.NONE,
  }),
  
  TDAH_GAMER: createSampleUserPreferences({
    user_name: "Carlos Oliveira",
    user_birth_date: "1998-07-10",
    falky_personality: FalkyPersonalityType.GAMER,
    user_neurodivergence: NeurodivergenceType.TDAH,
  }),
} as const; 