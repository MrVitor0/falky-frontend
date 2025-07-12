/**
 * Hook personalizado para usar o controller da API
 * Facilita o uso do sistema de API nos componentes React
 */

import { useState, useCallback } from "react";
import { apiController } from "@/controllers/api.controller";
import { RickAndMortyCharacter } from "@/types/api.types";

/**
 * Hook para gerenciar personagens do Rick and Morty
 */
export const useRickAndMortyCharacter = () => {
  const [character, setCharacter] = useState<RickAndMortyCharacter | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Busca um personagem aleatório
   */
  const fetchRandomCharacter = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const randomCharacter =
        await apiController.getRandomRickAndMortyCharacter();
      setCharacter(randomCharacter);
      console.log("🎭 Personagem obtido:", randomCharacter);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
      console.error("❌ Erro ao buscar personagem:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Busca um personagem específico por ID
   */
  const fetchCharacterById = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      const specificCharacter =
        await apiController.getRickAndMortyCharacterById(id);
      setCharacter(specificCharacter);
      console.log("🎭 Personagem específico obtido:", specificCharacter);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
      console.error("❌ Erro ao buscar personagem por ID:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Limpa o personagem atual
   */
  const clearCharacter = useCallback(() => {
    setCharacter(null);
    setError(null);
  }, []);

  return {
    character,
    loading,
    error,
    fetchRandomCharacter,
    fetchCharacterById,
    clearCharacter,
  };
};

/**
 * Hook para demonstrar o uso do sistema de API com cursos
 */
export const useApiDemo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Testa a criação de um curso
   */
  const testCreateCourse = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const courseData = {
        title: "Curso de React Avançado",
        description: "Aprenda React com hooks, context e performance",
        instructor: "João Silva",
        duration: 40,
        level: "intermediate" as const,
      };

      const result = await apiController.createCourse(courseData);
      console.log("✅ Curso criado:", result);

      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
      console.error("❌ Erro ao criar curso:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Testa a conexão com a API
   */
  const testConnection = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const isConnected = await apiController.testConnection();
      console.log(
        "🔌 Status da conexão:",
        isConnected ? "Conectado" : "Desconectado"
      );

      return isConnected;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
      console.error("❌ Erro ao testar conexão:", err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    testCreateCourse,
    testConnection,
  };
};
