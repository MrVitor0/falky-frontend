/**
 * Controller principal da API
 * Gerencia todas as operações CRUD e comunicação com endpoints
 */

import { api } from "@/services/api.service";
import { API_BASE_URLS, API_ENDPOINTS } from "@/constants/api.constants";
import {
  ApiResponse,
  Course,
  RickAndMortyCharacter,
  RickAndMortyResponse,
} from "@/types/api.types";
import { AxiosResponse } from "axios";

/**
 * Classe controller para gerenciar operações da API
 */
export class ApiController {
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
   * Métodos para Rick and Morty API (placeholder)
   */

  /**
   * Busca um personagem aleatório do Rick and Morty
   * @returns Promessa com dados do personagem
   */
  public async getRandomRickAndMortyCharacter(): Promise<RickAndMortyCharacter> {
    try {
      // Primeiro, busca informações sobre a API para saber quantos personagens existem
      const infoResponse = await api.get<RickAndMortyResponse>(
        `${API_BASE_URLS.RICK_AND_MORTY}${API_ENDPOINTS.RICK_MORTY_CHARACTERS}`,
        {
          baseURL: "", // Override para usar a URL completa
        }
      );

      // Gera um ID aleatório baseado no total de personagens
      const totalCharacters = infoResponse.data.info.count;
      const randomId = Math.floor(Math.random() * totalCharacters) + 1;

      // Busca o personagem específico
      const characterResponse = await api.get<RickAndMortyCharacter>(
        `${
          API_BASE_URLS.RICK_AND_MORTY
        }${API_ENDPOINTS.RICK_MORTY_CHARACTER_BY_ID(randomId)}`,
        {
          baseURL: "", // Override para usar a URL completa
        }
      );

      console.log("🎭 Personagem aleatório obtido:", characterResponse.data);

      return characterResponse.data;
    } catch (error) {
      console.error("❌ Erro ao buscar personagem do Rick and Morty:", error);
      throw error;
    }
  }

  /**
   * Busca personagem do Rick and Morty por ID
   * @param characterId - ID do personagem
   * @returns Promessa com dados do personagem
   */
  public async getRickAndMortyCharacterById(
    characterId: number
  ): Promise<RickAndMortyCharacter> {
    try {
      const response = await api.get<RickAndMortyCharacter>(
        `${
          API_BASE_URLS.RICK_AND_MORTY
        }${API_ENDPOINTS.RICK_MORTY_CHARACTER_BY_ID(characterId)}`,
        {
          baseURL: "", // Override para usar a URL completa
        }
      );

      return response.data;
    } catch (error) {
      console.error("Erro ao buscar personagem por ID:", error);
      throw error;
    }
  }

  /**
   * Lista personagens do Rick and Morty com paginação
   * @param page - Página a ser buscada
   * @returns Promessa com lista de personagens
   */
  public async getRickAndMortyCharacters(
    page = 1
  ): Promise<RickAndMortyResponse> {
    try {
      const response = await api.get<RickAndMortyResponse>(
        `${API_BASE_URLS.RICK_AND_MORTY}${API_ENDPOINTS.RICK_MORTY_CHARACTERS}?page=${page}`,
        {
          baseURL: "", // Override para usar a URL completa
        }
      );

      return response.data;
    } catch (error) {
      console.error("Erro ao listar personagens:", error);
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
