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
    | "course_resumed";
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
}

// Configurações de layout do dashboard
export interface DashboardSettings {
  layoutType: "sidebar" | "cards";
  sidebarCollapsed: boolean;
  theme: "light" | "dark";
  showStats: boolean;
  itemsPerPage: number;
}

export interface DashboardContextType {
  settings: DashboardSettings;
  updateSettings: (updates: Partial<DashboardSettings>) => void;
  resetSettings: () => void;
}

// Novos tipos para o sistema de criação de cursos

export enum CourseStep {
  TOPIC = "topic",
  MOTIVATION = "motivation", 
  OBJECTIVES = "objectives",
  KNOWLEDGE = "knowledge",
  SUCCESS = "success"
}

export interface CourseTopicRequest {
  topic: string;
}

export interface CourseStepRequest {
  course_id: string;
  step: CourseStep;
  answer?: string;
}

export interface CourseStepResponse {
  course_id: string;
  step: CourseStep;
  question: string;
  next_step?: CourseStep;
  progress: number;
  metadata?: {
    [key: string]: string | number | boolean;
  };
}

export interface CourseSessionResponse {
  course_id: string;
  topic: string;
  current_step: CourseStep;
  progress: number;
  questions_answered: number;
  total_questions: number;
}

export interface ResearchRequest {
  course_id: string;
  generate_content?: boolean;
}

export enum ResearchStatus {
  PENDING = "pending",
  RESEARCHING = "researching", 
  ANALYZING = "analyzing",
  COMPLETED = "completed",
  FAILED = "failed"
}

export interface ResearchResponse {
  course_id: string;
  status: ResearchStatus;
  progress: number;
  message: string;
  estimated_time?: number;
}

export interface CourseContentResponse {
  course_id: string;
  topic: string;
  student_profile: {
    [key: string]: string;
  };
  research_summary: string;
  quiz_questions: string[];
  final_document: string;
  files_generated: string[];
  created_at: string;
}

// Resposta base da API
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  timestamp?: string;
}
