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
