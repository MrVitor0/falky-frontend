/**
 * Tipos para o sistema de gerenciamento de API
 * Define interfaces e tipos utilizados em todo o sistema
 */

/**
 * Interface base para respostas da API
 */
export interface ApiResponse<T = unknown> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
  timestamp?: string;
}

/**
 * Interface para configuração de requisições
 */
export interface ApiRequestConfig {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: unknown;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

/**
 * Interface para dados de usuário
 */
export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

/**
 * Interface para curso
 */
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  created_at: string;
  updated_at: string;
}

/**
 * Interface para personagem do Rick and Morty (placeholder)
 */
export interface RickAndMortyCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

/**
 * Interface para resposta da API do Rick and Morty
 */
export interface RickAndMortyResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: RickAndMortyCharacter[];
}

/**
 * Enums para preferências do usuário
 */
export enum NeurodivergenceType {
  NONE = "none",
  AUTISMO_LEVE = "autismo_leve",
  TDAH = "tdah",
  DISLEXIA = "dislexia",
  DISCALCULIA = "discalculia",
  TRANSTORNO_PROCESSAMENTO_SENSORIAL = "transtorno_processamento_sensorial",
}

export enum FalkyPersonalityType {
  CONVERSADOR = "conversador",
  COACH_MOTIVACIONAL = "coach_motivacional",
  SUPERDIRETO = "superdireto",
  PROFESSOR_CLASSICO = "professor_classico",
  CIENTISTA = "cientista",
  ZUEIRO = "zueiro",
  GAMER = "gamer",
  ZEN = "zen",
  SABIO = "sabio",
  HACKER = "hacker",
}

export enum KnowledgeLevelType {
  NOVATO = "novato",
  INTERMEDIARIO = "intermediario",
  AVANCADO = "avancado",
}

export enum StudyRhythmType {
  RAPIDO = "rapido",
  MODERADO = "moderado",
  PAUSADO = "pausado",
}

export enum MotivationGoalType {
  APROVACAO_PROVA = "aprovacao_prova",
  DOMINIO_TEMA = "dominio_tema",
  HOBBY = "hobby",
}

/**
 * Interfaces para criação de preferências
 */
export interface UserPreferencesCreate {
  user_name: string;
  user_birth_date: string; // ISO date string
  falky_personality: FalkyPersonalityType;
  user_neurodivergence?: NeurodivergenceType;
}

export interface CoursePreferencesCreate {
  user_id: string;
  course_name: string;
  knowledge_level: KnowledgeLevelType;
  study_pace: StudyRhythmType;
  goals_and_motivations: MotivationGoalType;
  additional_information?: string;
}

/**
 * Interfaces para respostas das preferências
 */
export interface UserPreferencesResponse {
  prefs_created_at: string;
  user_id: string;
  user_name: string;
  user_birth_date: string;
  user_age: number;
  falky_personality: FalkyPersonalityType;
  falky_personality_description: string;
  user_neurodivergence: NeurodivergenceType;
  user_neurodivergence_description: string;
}

export interface CoursePreferencesResponse {
  course_created_at: string;
  user_id: string;
  course_id: string;
  course_name: string;
  knowledge_level: KnowledgeLevelType;
  knowledge_level_description: string;
  study_pace: StudyRhythmType;
  study_pace_description: string;
  goals_and_motivations: MotivationGoalType;
  goals_and_motivations_description: string;
  additional_information?: string;
}

/**
 * Interfaces para atualização de preferências
 */
export interface UserPreferencesUpdate {
  user_name?: string;
  user_birth_date?: string;
  falky_personality?: FalkyPersonalityType;
  user_neurodivergence?: NeurodivergenceType;
}

export interface CoursePreferencesUpdate {
  course_name?: string;
  knowledge_level?: KnowledgeLevelType;
  study_pace?: StudyRhythmType;
  goals_and_motivations?: MotivationGoalType;
  additional_information?: string;
}

/**
 * Interfaces para geração de cursos
 */
export interface CourseGenerationRequest {
  user_id: string;
  course_topic: string;
}

export interface CourseGenerationResponse {
  success: boolean;
  message: string;
  course_id?: string;
  thread_id?: string;
  file_path?: string;
  error?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: string;
  options?: string[];
  difficulty: string;
  topic: string;
}

export interface CourseGenerationStatus {
  success: boolean;
  status: string;
  message: string;
  course_id?: string;
  quiz_id?: string;
  questions?: QuizQuestion[];
}

export interface CourseModuleSchema {
  ID_MODULO: string;
  NAME_MODULO: string;
  DESCRICAO_MODULO: string;
  ROADMAP_MODULO: string;
  NIVEL_DIFICULDADE: string;
  TEMPO_ESTIMADO: string;
  SUBMODULOS: CourseSubmoduleSchema[];
}

export interface CourseSubmoduleSchema {
  ID_SUBMODULO: string;
  NAME_SUBMODULO: string;
  DESCRICAO_SUBMODULO: string;
  ROADMAP_SUBMODULO: string;
  TEMPO_ESTIMADO: string;
}

export interface PersonalizedCurriculumSchema {
  nivel_identificado: string;
  personalidade_aplicada: string;
  adaptacoes_personalizadas: string;
  observacao: string;
  modulos: CourseModuleSchema[];
}

export interface CourseDetailsSchema {
  user_id: string;
  course_id: string;
  timestamp: string;
  thread_id: string;
  course_topic: string;
  user_config: Record<string, unknown>;
  course_config: Record<string, unknown>;
  personalized_curriculum: PersonalizedCurriculumSchema;
}

export interface CourseListItem {
  filename: string;
  course_topic: string;
  timestamp: string;
  thread_id: string;
  modules_count: number;
  file_path: string;
}

export interface CourseListResponse {
  user_id: string;
  courses: CourseListItem[];
  total_courses: number;
}

export interface CourseDetailsResponse {
  success: boolean;
  course_data: CourseDetailsSchema;
  file_info: Record<string, unknown>;
}

export interface CourseDeleteResponse {
  success: boolean;
  message: string;
}

export interface CourseStatus {
  status: string;
  progress: number;
  current_step: string;
  estimated_time: string;
}

/**
 * Tipos para métodos HTTP
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * Tipos para status de requisição
 */
export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * Interface para controle de estado de requisições
 */
export interface RequestState<T = unknown> {
  data: T | null;
  loading: boolean;
  error: string | null;
  status: RequestStatus;
} 