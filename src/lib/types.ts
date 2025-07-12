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
