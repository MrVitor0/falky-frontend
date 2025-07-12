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