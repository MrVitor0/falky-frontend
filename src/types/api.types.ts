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