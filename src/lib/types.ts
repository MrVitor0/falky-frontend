// Tipos para autenticação e preferências (sem Supabase)

// Tipos para as preferências do usuário
export interface UserPreferences {
  id?: string;
  user_id: string;
  name: string;
  profession: string;
  birth_date: string;
  teacher_personality: string;
  neurodivergence: string;
  created_at?: string;
  updated_at?: string;
}

// Tipos para o contexto de autenticação
export interface AuthUser {
  id: string;
  email: string;
  user_metadata?: {
    name?: string;
  };
}

export interface AuthContextType {
  user: AuthUser | null;
  preferences: UserPreferences | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (
    email: string,
    password: string,
    name: string
  ) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  updatePreferences: (
    preferences: Omit<
      UserPreferences,
      "id" | "user_id" | "created_at" | "updated_at"
    >
  ) => Promise<{ error: Error | null }>;
  hasPreferences: () => boolean;
}

// Interfaces para módulos de curso (formato original)
export interface CourseSubmodule {
  ID_SUBMODULO: string;
  NAME_SUBMODULO: string;
  DESCRICAO_SUBMODULO: string;
  ROADMAP_SUBMODULO: string;
  TEMPO_ESTIMADO: string;
  // Novos campos para geração de conteúdo
  content_generated?: boolean;
  generated_at?: string;
  content_url?: string;
}

export interface CourseModule {
  ID_MODULO: string;
  NAME_MODULO: string;
  DESCRICAO_MODULO: string;
  SUBMODULOS: CourseSubmodule[];
  // Novos campos para currículo personalizado
  ROADMAP_MODULO?: string;
  NIVEL_DIFICULDADE?: string;
  TEMPO_ESTIMADO?: string;
  ADAPTACOES_NEURO?: string;
  JUSTIFICATIVA?: string;
}

// Tipos para currículo personalizado
export interface PersonalizedCurriculumModule {
  ID_MODULO: string;
  NAME_MODULO: string;
  DESCRICAO_MODULO: string;
  ROADMAP_MODULO: string;
  NIVEL_DIFICULDADE: string;
  TEMPO_ESTIMADO: string;
  ADAPTACOES_NEURO: string;
  JUSTIFICATIVA: string;
  SUBMODULOS: PersonalizedCurriculumSubmodule[];
}

export interface PersonalizedCurriculumSubmodule {
  ID_SUBMODULO: string;
  NAME_SUBMODULO: string;
  DESCRICAO_SUBMODULO: string;
  ROADMAP_SUBMODULO: string;
  TEMPO_ESTIMADO: string;
  // Novos campos para geração de conteúdo
  content_generated?: boolean;
  generated_at?: string;
  content_url?: string;
}

export interface PersonalizedCurriculum {
  nivel_identificado: string;
  personalidade_aplicada: string;
  adaptacoes_personalizadas: string;
  adaptacoes_neurodivergencia: string;
  justificativa_personalizacao: string;
  modulos: PersonalizedCurriculumModule[];
}

export interface CourseGenerationData {
  user_id: string;
  timestamp: string;
  thread_id: string;
  course_topic: string;
  user_config: Record<string, unknown>;
  personalized_curriculum: PersonalizedCurriculum;
}

// Interfaces para o sistema de cursos
export interface Course {
  id: string;
  name: string;
  description: string;
  status: "nao_iniciado" | "em_andamento" | "concluido" | "pausado";
  progress: number; // 0-100
  totalLessons: number;
  completedLessons: number;
  createdAt: Date;
  updatedAt: Date;
  category: string;
  difficulty: "iniciante" | "intermediario" | "avancado";
  estimatedHours: number;
  tags: string[];
  modulos?: CourseModule[]; // Formato original (compatibilidade)
  // Novos campos para currículo personalizado
  user_id?: string;
  thread_id?: string;
  course_topic?: string;
  user_config?: Record<string, unknown>;
  personalized_curriculum?: PersonalizedCurriculum;
  timestamp?: string;
}

export interface CourseStats {
  totalCourses: number;
  notStarted: number;
  inProgress: number;
  completed: number;
  paused: number;
  totalHoursStudied: number;
  averageProgress: number;
}

export interface DashboardData {
  courses: Course[];
  stats: CourseStats;
  recentActivity: CourseActivity[];
}

export interface CourseActivity {
  id: string;
  courseId: string;
  courseName: string;
  type:
    | "lesson_completed"
    | "course_created"
    | "course_started"
    | "course_completed"
    | "course_paused"
    | "course_resumed"
    | "content_generated";
  timestamp: Date;
  description: string;
}

// Context para cursos
export interface CourseContextType {
  courses: Course[];
  stats: CourseStats;
  recentActivity: CourseActivity[];
  loading: boolean;
  addCourse: (course: Omit<Course, "id" | "createdAt" | "updatedAt">) => void;
  updateCourse: (id: string, updates: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  getCourseById: (id: string) => Course | undefined;
  getCoursesByStatus: (status: Course["status"]) => Course[];
  refreshData: () => void;
  // Novas funções para geração de conteúdo
  generateSubmoduleContent: (
    courseId: string,
    moduleId: string,
    submoduleId: string
  ) => Promise<boolean>;
  isSubmoduleContentGenerated: (
    courseId: string,
    moduleId: string,
    submoduleId: string
  ) => boolean;
}

// Tipos para configurações do dashboard
export interface DashboardSettings {
  theme: "light" | "dark" | "system";
  notifications: boolean;
  autoplay: boolean;
  language: "pt" | "en" | "es";
}

export interface DashboardContextType {
  settings: DashboardSettings;
  updateSettings: (updates: Partial<DashboardSettings>) => void;
  resetSettings: () => void;
}
