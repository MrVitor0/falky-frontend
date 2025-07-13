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
  USERS_PREFERENCES: "/config/user-preferences",

  // Cursos
  COURSES: "/courses",
  COURSE_BY_ID: (courseId: string) => `/courses/${courseId}`,
  COURSE_GENERATE: "/courses/generate",
  COURSE_LIST: (userId: string) => `/courses/list/${userId}`,
  COURSE_DETAILS: (userId: string, filename: string) =>
    `/courses/details/${userId}/${filename}`,
  COURSE_DELETE: (userId: string, filename: string) =>
    `/courses/delete/${userId}/${filename}`,

  // Novos endpoints de criação de curso
  COURSE_CREATE: "/course/create",
  COURSE_STEP: "/course/step",
  COURSE_SESSION: (courseId: string) => `/course/session/${courseId}`,
  COURSE_RESEARCH: "/course/research",
  COURSE_RESEARCH_STATUS: (courseId: string) =>
    `/course/research/${courseId}/status`,
  COURSE_SESSION_DELETE: (courseId: string) => `/course/session/${courseId}`,

  // Endpoints de estrutura do curso
  COURSE_STRUCTURE: (courseId: string) => `/course/structure/${courseId}`,

  // Endpoints de materiais
  MATERIAL_GENERATE: "/material/generate",
  MATERIAL_STATUS: (courseId: string) => `/material/status/${courseId}`,
  MATERIAL_LIST: (courseId: string) => `/material/list/${courseId}`,
  MATERIAL_CONTENT: (courseId: string, materialId: string) =>
    `/material/content/${courseId}/${materialId}`,
  MATERIAL_REWRITE: "/material/rewrite",

  // Preferências de Curso
  COURSE_PREFERENCES: "/config/course-preferences",
  COURSE_PREFERENCES_BY_IDS: (userId: string, courseId: string) =>
    `/config/course-preferences/${userId}/${courseId}`,

  // Configurações adicionais
  CONFIG_PERSONALITIES: "/config/personalities",
  CONFIG_NEURODIVERGENCES: "/config/neurodivergences",
  CONFIG_KNOWLEDGE_LEVELS: "/config/knowledge-levels",
  CONFIG_STUDY_RHYTHMS: "/config/study-rhythms",
  CONFIG_MOTIVATION_GOALS: "/config/motivation-goals",
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
 * Função para gerar user_id compatível com o backend
 * Usa o mesmo algoritmo: SHA256 dos dados concatenados
 */
async function generateUserId(
  userName: string,
  birthDate: string
): Promise<string> {
  const dataString = `${userName.toLowerCase()}${birthDate}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(dataString);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex.substring(0, 16); // Primeiros 16 caracteres como no backend
}

/**
 * ID de usuário compatível com backend
 * Gerado baseado nos dados padrão: "Usuário Falky" + "1990-01-01"
 */
export const getStaticUserId = async (): Promise<string> => {
  return await generateUserId("Usuário Falky", "1990-01-01");
};

/**
 * ID de usuário compatível com backend
 * Este ID corresponde ao usuário padrão "Usuário Falky" + "1990-01-01" já existente no backend
 */
export const STATIC_USER_ID = "3fc68c1415e8d009"; // Hash gerado pelo backend para "Usuário Falky" + "1990-01-01"

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
