/**
 * Constantes utilizadas no sistema de gerenciamento de API
 * Centraliza URLs, configurações e valores fixos
 */

/**
 * URLs base das APIs
 */
export const API_BASE_URLS = {
  MAIN: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",
} as const;

/**
 * Endpoints da API principal
 */
export const API_ENDPOINTS = {
  // Usuários
  USERS_PREFERENCES: "/user-preferences",

  //Cursos
  COURSES: "/courses",
  COURSE_BY_ID: (courseId: string) => `/courses/${courseId}`,
} as const;

/**
 * Códigos de status HTTP
 */
export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

/**
 * Mensagens de erro padrão
 */
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Erro de conexão com o servidor",
  VALIDATION_ERROR: "Dados inválidos fornecidos",
  UNAUTHORIZED: "Acesso não autorizado",
  NOT_FOUND: "Recurso não encontrado",
  SERVER_ERROR: "Erro interno do servidor",
  TIMEOUT: "Tempo limite da requisição excedido",
} as const;

/**
 * Configurações de timeout e retry
 */
export const API_CONFIG = {
  TIMEOUT: 10000, // 10 segundos
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 segundo
} as const;

/**
 * Headers padrão
 */
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
} as const;

/**
 * ID de usuário estático (como solicitado)
 */
export const STATIC_USER_ID = "user_12345_static";

/**
 * Lista de bad words para filtro
 * Esta lista contém palavras ofensivas que devem ser filtradas
 * Pode ser expandida conforme necessário
 * @see
 */
export const BAD_WORDS = [
  "merda",
  "porra",
  "caralho",
  "fodase",
  "buceta",
  "puta",
  "viado",
  "bicha",
  "traveco",
] as const;
