/**
 * Hook personalizado para usar o controller da API
 * Facilita o uso do sistema de API nos componentes React
 */

import { useState, useCallback } from "react";
import { apiController } from "@/controllers/api.controller";

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
