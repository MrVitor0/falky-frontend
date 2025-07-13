/**
 * Controller principal da API
 * Gerencia todas as operações CRUD e comunicação com endpoints
 */

import { api } from "@/services/api.service";
import { API_ENDPOINTS } from "@/constants/api.constants";
import {
  ApiResponse,
  Course,
  UserPreferencesCreate,
  UserPreferencesResponse,
  UserPreferencesUpdate,
  CoursePreferencesCreate,
  CoursePreferencesResponse,
  CoursePreferencesUpdate,
  CourseGenerationRequest,
  CourseGenerationStatus,
  CourseListResponse,
  CourseDetailsResponse,
  CourseDeleteResponse,
} from "@/types/api.types";
import {
  CourseTopicRequest,
  CourseStepRequest,
  CourseStepResponse,
  CourseSessionResponse,
  ResearchRequest,
  ResearchResponse,
} from "@/lib/types";
import { AxiosResponse } from "axios";

/**
 * Classe controller para gerenciar operações da API
 */
export class ApiController {
  /**
   * Métodos para Preferências do Usuário
   */

  /**
   * Cria preferências do usuário
   * @param preferences - Dados das preferências do usuário
   * @returns Promessa com dados das preferências criadas
   */
  public async setUserPreferences(
    preferences: UserPreferencesCreate
  ): Promise<ApiResponse<UserPreferencesResponse>> {
    try {
      const response: AxiosResponse<ApiResponse<UserPreferencesResponse>> = await api.post(
        API_ENDPOINTS.USERS_PREFERENCES,
        preferences
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao definir preferências do usuário:", error);
      throw error;
    }
  }

  /**
   * Busca preferências do usuário por ID
   * @param userId - ID do usuário
   * @returns Promessa com dados das preferências do usuário
   */
  public async getUserPreferences(userId: string): Promise<ApiResponse<UserPreferencesResponse>> {
    try {
      const response: AxiosResponse<ApiResponse<UserPreferencesResponse>> = await api.get(
        `${API_ENDPOINTS.USERS_PREFERENCES}/${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar preferências do usuário:", error);
      throw error;
    }
  }

  /**
   * Atualiza preferências do usuário
   * @param userId - ID do usuário
   * @param preferences - Dados das preferências a serem atualizadas
   * @returns Promessa com dados das preferências atualizadas
   */
  public async updateUserPreferences(
    userId: string,
    preferences: UserPreferencesUpdate
  ): Promise<ApiResponse<UserPreferencesResponse>> {
    try {
      const response: AxiosResponse<ApiResponse<UserPreferencesResponse>> = await api.put(
        `${API_ENDPOINTS.USERS_PREFERENCES}/${userId}`,
        preferences
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar preferências do usuário:", error);
      throw error;
    }
  }

  /**
   * Lista todas as preferências de usuários
   * @returns Promessa com lista de preferências de usuários
   */
  public async listUserPreferences(): Promise<ApiResponse<Record<string, UserPreferencesResponse>>> {
    try {
      const response: AxiosResponse<ApiResponse<Record<string, UserPreferencesResponse>>> = await api.get(
        API_ENDPOINTS.USERS_PREFERENCES
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao listar preferências de usuários:", error);
      throw error;
    }
  }

  /**
   * Métodos para Preferências de Curso
   */

  /**
   * Cria preferências de curso
   * @param preferences - Dados das preferências do curso
   * @returns Promessa com dados das preferências criadas
   */
  public async setCoursePreferences(
    preferences: CoursePreferencesCreate
  ): Promise<ApiResponse<CoursePreferencesResponse>> {
    try {
      const response: AxiosResponse<ApiResponse<CoursePreferencesResponse>> = await api.post(
        API_ENDPOINTS.COURSE_PREFERENCES,
        preferences
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao definir preferências do curso:", error);
      throw error;
    }
  }

  /**
   * Busca preferências de curso por ID do usuário e curso
   * @param userId - ID do usuário
   * @param courseId - ID do curso
   * @returns Promessa com dados das preferências do curso
   */
  public async getCoursePreferences(
    userId: string,
    courseId: string
  ): Promise<ApiResponse<CoursePreferencesResponse>> {
    try {
      const response: AxiosResponse<ApiResponse<CoursePreferencesResponse>> = await api.get(
        API_ENDPOINTS.COURSE_PREFERENCES_BY_IDS(userId, courseId)
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar preferências do curso:", error);
      throw error;
    }
  }

  /**
   * Atualiza preferências de curso
   * @param userId - ID do usuário
   * @param courseId - ID do curso
   * @param preferences - Dados das preferências a serem atualizadas
   * @returns Promessa com dados das preferências atualizadas
   */
  public async updateCoursePreferences(
    userId: string,
    courseId: string,
    preferences: CoursePreferencesUpdate
  ): Promise<ApiResponse<CoursePreferencesResponse>> {
    try {
      const response: AxiosResponse<ApiResponse<CoursePreferencesResponse>> = await api.put(
        API_ENDPOINTS.COURSE_PREFERENCES_BY_IDS(userId, courseId),
        preferences
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar preferências do curso:", error);
      throw error;
    }
  }

  /**
   * Lista todas as preferências de cursos
   * @param userId - ID do usuário (opcional)
   * @returns Promessa com lista de preferências de cursos
   */
  public async listCoursePreferences(
    userId?: string
  ): Promise<ApiResponse<Record<string, CoursePreferencesResponse>>> {
    try {
      const url = userId ? `${API_ENDPOINTS.COURSE_PREFERENCES}?user_id=${userId}` : API_ENDPOINTS.COURSE_PREFERENCES;
      const response: AxiosResponse<ApiResponse<Record<string, CoursePreferencesResponse>>> = await api.get(url);
      return response.data;
    } catch (error) {
      console.error("Erro ao listar preferências de cursos:", error);
      throw error;
    }
  }

  /**
   * Métodos CRUD para Cursos
   */

  /**
   * Cria um novo curso (método async conforme solicitado)
   * @param courseData - Dados do curso
   * @returns Promessa com dados do curso criado
   */
  public async createCourse(
    courseData: Partial<Course>
  ): Promise<ApiResponse<Course>> {
    try {
      const response: AxiosResponse<ApiResponse<Course>> = await api.post(
        API_ENDPOINTS.COURSES,
        courseData
      );

      console.log("✅ Curso criado com sucesso:", response.data);

      return response.data;
    } catch (error) {
      console.error("❌ Erro ao criar curso:", error);
      throw error;
    }
  }

  /**
   * Busca curso por ID
   * @param courseId - ID do curso
   * @returns Promessa com dados do curso
   */
  public async getCourseById(courseId: string): Promise<ApiResponse<Course>> {
    try {
      const response: AxiosResponse<ApiResponse<Course>> = await api.get(
        API_ENDPOINTS.COURSE_BY_ID(courseId)
      );

      return response.data;
    } catch (error) {
      console.error("Erro ao buscar curso:", error);
      throw error;
    }
  }

  /**
   * Lista todos os cursos
   * @returns Promessa com lista de cursos
   */
  public async getCourses(): Promise<ApiResponse<Course[]>> {
    try {
      const response: AxiosResponse<ApiResponse<Course[]>> = await api.get(
        API_ENDPOINTS.COURSES
      );

      return response.data;
    } catch (error) {
      console.error("Erro ao listar cursos:", error);
      throw error;
    }
  }

  /**
   * Atualiza dados de um curso
   * @param courseId - ID do curso
   * @param courseData - Dados atualizados
   * @returns Promessa com dados do curso atualizado
   */
  public async updateCourse(
    courseId: string,
    courseData: Partial<Course>
  ): Promise<ApiResponse<Course>> {
    try {
      const response: AxiosResponse<ApiResponse<Course>> = await api.put(
        API_ENDPOINTS.COURSE_BY_ID(courseId),
        courseData
      );

      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar curso:", error);
      throw error;
    }
  }

  /**
   * Remove um curso
   * @param courseId - ID do curso
   * @returns Promessa com confirmação da remoção
   */
  public async deleteCourse(courseId: string): Promise<ApiResponse<null>> {
    try {
      const response: AxiosResponse<ApiResponse<null>> = await api.delete(
        API_ENDPOINTS.COURSE_BY_ID(courseId)
      );

      return response.data;
    } catch (error) {
      console.error("Erro ao remover curso:", error);
      throw error;
    }
  }

  /**
   * Métodos para geração de cursos
   */

  /**
   * Gera um novo curso personalizado
   * @param request - Dados da requisição de geração
   * @returns Promessa com resposta da geração
   */
  public async generateCourse(
    request: CourseGenerationRequest
  ): Promise<ApiResponse<CourseGenerationStatus>> {
    try {
      const response: AxiosResponse<ApiResponse<CourseGenerationStatus>> = await api.post(
        API_ENDPOINTS.COURSE_GENERATE,
        request
      );

      console.log("✅ Curso gerado com sucesso:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao gerar curso:", error);
      throw error;
    }
  }

  /**
   * Lista cursos gerados para um usuário
   * @param userId - ID do usuário
   * @returns Promessa com lista de cursos
   */
  public async listGeneratedCourses(
    userId: string
  ): Promise<ApiResponse<CourseListResponse>> {
    try {
      const response: AxiosResponse<ApiResponse<CourseListResponse>> = await api.get(
        API_ENDPOINTS.COURSE_LIST(userId)
      );

      return response.data;
    } catch (error) {
      console.error("❌ Erro ao listar cursos:", error);
      throw error;
    }
  }

  /**
   * Obtém detalhes de um curso específico
   * @param userId - ID do usuário
   * @param filename - Nome do arquivo do curso
   * @returns Promessa com detalhes do curso
   */
  public async getCourseDetails(
    userId: string,
    filename: string
  ): Promise<ApiResponse<CourseDetailsResponse>> {
    try {
      const response: AxiosResponse<ApiResponse<CourseDetailsResponse>> = await api.get(
        API_ENDPOINTS.COURSE_DETAILS(userId, filename)
      );

      return response.data;
    } catch (error) {
      console.error("❌ Erro ao obter detalhes do curso:", error);
      throw error;
    }
  }

  /**
   * Remove um curso específico
   * @param userId - ID do usuário
   * @param filename - Nome do arquivo do curso
   * @returns Promessa com confirmação da remoção
   */
  public async deleteGeneratedCourse(
    userId: string,
    filename: string
  ): Promise<ApiResponse<CourseDeleteResponse>> {
    try {
      const response: AxiosResponse<ApiResponse<CourseDeleteResponse>> = await api.delete(
        API_ENDPOINTS.COURSE_DELETE(userId, filename)
      );

      return response.data;
    } catch (error) {
      console.error("❌ Erro ao remover curso:", error);
      throw error;
    }
  }

  /**
   * Novos métodos para sistema de criação de curso
   */

  /**
   * Cria um novo curso com tópico
   * @param topicData - Dados do tópico do curso
   * @returns Promessa com resposta do step
   */
  public async createCourseWithTopic(
    topicData: CourseTopicRequest
  ): Promise<ApiResponse<CourseStepResponse>> {
    try {
      console.log("🔧 [DEBUG] API Controller - Request para:", API_ENDPOINTS.COURSE_CREATE);
      console.log("🔧 [DEBUG] API Controller - Dados enviados:", topicData);
      
      const response: AxiosResponse<ApiResponse<CourseStepResponse>> = await api.post(
        API_ENDPOINTS.COURSE_CREATE,
        topicData
      );

      console.log("🔧 [DEBUG] API Controller - Response completa:", response);
      console.log("🔧 [DEBUG] API Controller - Response.data:", response.data);
      console.log("🔧 [DEBUG] API Controller - Response.data.data:", response.data.data);
      console.log("✅ Curso criado com tópico:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao criar curso com tópico:", error);
      throw error;
    }
  }

  /**
   * Processa um step do curso (resposta + próxima pergunta)
   * @param stepData - Dados do step
   * @returns Promessa com próxima pergunta ou finalização
   */
  public async processCourseStep(
    stepData: CourseStepRequest
  ): Promise<ApiResponse<CourseStepResponse | { status: string; message: string; progress: number; next_action: string }>> {
    try {
      const response: AxiosResponse<ApiResponse<CourseStepResponse | { status: string; message: string; progress: number; next_action: string }>> = await api.post(
        API_ENDPOINTS.COURSE_STEP,
        stepData
      );

      console.log("✅ Step processado:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao processar step:", error);
      throw error;
    }
  }

  /**
   * Recupera informações da sessão do curso
   * @param courseId - ID do curso
   * @returns Promessa com dados da sessão
   */
  public async getCourseSession(
    courseId: string
  ): Promise<ApiResponse<CourseSessionResponse>> {
    try {
      const response: AxiosResponse<ApiResponse<CourseSessionResponse>> = await api.get(
        API_ENDPOINTS.COURSE_SESSION(courseId)
      );

      console.log("✅ Sessão recuperada:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao recuperar sessão:", error);
      throw error;
    }
  }

  /**
   * Inicia pesquisa e geração de conteúdo
   * @param researchData - Dados da pesquisa
   * @returns Promessa com status da pesquisa
   */
  public async startCourseResearch(
    researchData: ResearchRequest
  ): Promise<ApiResponse<ResearchResponse>> {
    try {
      const response: AxiosResponse<ApiResponse<ResearchResponse>> = await api.post(
        API_ENDPOINTS.COURSE_RESEARCH,
        researchData
      );

      console.log("✅ Pesquisa iniciada:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao iniciar pesquisa:", error);
      throw error;
    }
  }

  /**
   * Verifica status da pesquisa
   * @param courseId - ID do curso
   * @returns Promessa com status atual da pesquisa
   */
  public async getCourseResearchStatus(
    courseId: string
  ): Promise<ApiResponse<ResearchResponse>> {
    try {
      const response: AxiosResponse<ApiResponse<ResearchResponse>> = await api.get(
        API_ENDPOINTS.COURSE_RESEARCH_STATUS(courseId)
      );

      return response.data;
    } catch (error) {
      console.error("❌ Erro ao verificar status da pesquisa:", error);
      throw error;
    }
  }

  /**
   * Remove uma sessão de curso
   * @param courseId - ID do curso
   * @returns Promessa com confirmação da remoção
   */
  public async deleteCourseSession(
    courseId: string
  ): Promise<ApiResponse<{ course_id: string; deleted: boolean }>> {
    try {
      const response: AxiosResponse<ApiResponse<{ course_id: string; deleted: boolean }>> = await api.delete(
        API_ENDPOINTS.COURSE_SESSION_DELETE(courseId)
      );

      console.log("✅ Sessão removida:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao remover sessão:", error);
      throw error;
    }
  }

  /**
   * Métodos utilitários
   */

  /**
   * Testa a conectividade com a API
   * @returns Promessa com status da conexão
   */
  public async testConnection(): Promise<boolean> {
    try {
      await api.get("/health");
      return true;
    } catch (error) {
      console.error("Erro ao testar conexão:", error);
      return false;
    }
  }


}

/**
 * Instância singleton do controller
 */
export const apiController = new ApiController();
