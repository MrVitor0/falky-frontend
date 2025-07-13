"use client";

import React, { useState } from "react";
import Link from "next/link";
import { apiController } from "@/controllers/api.controller";
import {
  UserPreferencesUpdate,
  CoursePreferencesUpdate,
  FalkyPersonalityType,
  NeurodivergenceType,
  KnowledgeLevelType,
  StudyRhythmType,
  MotivationGoalType,
} from "@/types/api.types";
import {
  createSampleUserPreferences,
  createSampleCoursePreferences,
  SAMPLE_PREFERENCES,
} from "@/utils/preferences.utils";

interface TestResult {
  success?: boolean;
  data?: unknown;
  error?: string;
}

export default function ApiTestPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [results, setResults] = useState<{ [key: string]: TestResult }>({});
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [currentCourseId, setCurrentCourseId] = useState<string>("");

  const handleApiCall = async (
    operation: string,
    apiCall: () => Promise<TestResult>
  ) => {
    setLoading(operation);
    try {
      const response = await apiCall();
      setResults((prev) => ({
        ...prev,
        [operation]: response,
      }));
    } catch (error) {
      console.error(`❌ Erro em ${operation}:`, error);
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      setResults((prev) => ({
        ...prev,
        [operation]: { error: errorMessage },
      }));
    } finally {
      setLoading(null);
    }
  };

  const testCreateUserPreferences = () => {
    const preferences = createSampleUserPreferences({
      user_name: "João Teste API",
      user_birth_date: "1990-01-15",
      falky_personality: FalkyPersonalityType.CONVERSADOR,
      user_neurodivergence: NeurodivergenceType.NONE,
    });

    handleApiCall("createUserPreferences", async () => {
      const response = await apiController.setUserPreferences(preferences);
      if (
        response.success &&
        response.data &&
        typeof response.data === "object" &&
        "user_id" in response.data
      ) {
        setCurrentUserId((response.data as { user_id: string }).user_id);
      }
      return response;
    });
  };

  const testGetUserPreferences = () => {
    if (!currentUserId) {
      alert("Primeiro crie uma preferência de usuário ou insira um ID válido");
      return;
    }

    handleApiCall("getUserPreferences", () =>
      apiController.getUserPreferences(currentUserId)
    );
  };

  const testUpdateUserPreferences = () => {
    if (!currentUserId) {
      alert("Primeiro crie uma preferência de usuário ou insira um ID válido");
      return;
    }

    const updateData: UserPreferencesUpdate = {
      user_name: "João Teste Atualizado",
      falky_personality: FalkyPersonalityType.COACH_MOTIVACIONAL,
    };

    handleApiCall("updateUserPreferences", () =>
      apiController.updateUserPreferences(currentUserId, updateData)
    );
  };

  const testListUserPreferences = () => {
    handleApiCall("listUserPreferences", () =>
      apiController.listUserPreferences()
    );
  };

  const testCreateCoursePreferences = () => {
    if (!currentUserId) {
      alert("Primeiro crie uma preferência de usuário");
      return;
    }

    const preferences = createSampleCoursePreferences(currentUserId, {
      course_name: "JavaScript para Iniciantes",
      knowledge_level: KnowledgeLevelType.NOVATO,
      study_pace: StudyRhythmType.MODERADO,
      goals_and_motivations: MotivationGoalType.DOMINIO_TEMA,
      additional_information: "Quero aprender JS para desenvolvimento web",
    });

    handleApiCall("createCoursePreferences", async () => {
      const response = await apiController.setCoursePreferences(preferences);
      if (
        response.success &&
        response.data &&
        typeof response.data === "object" &&
        "course_id" in response.data
      ) {
        setCurrentCourseId((response.data as { course_id: string }).course_id);
      }
      return response;
    });
  };

  const testGetCoursePreferences = () => {
    if (!currentUserId || !currentCourseId) {
      alert("Primeiro crie uma preferência de curso ou insira IDs válidos");
      return;
    }

    handleApiCall("getCoursePreferences", () =>
      apiController.getCoursePreferences(currentUserId, currentCourseId)
    );
  };

  const testUpdateCoursePreferences = () => {
    if (!currentUserId || !currentCourseId) {
      alert("Primeiro crie uma preferência de curso ou insira IDs válidos");
      return;
    }

    const updateData: CoursePreferencesUpdate = {
      course_name: "JavaScript Avançado",
      knowledge_level: KnowledgeLevelType.INTERMEDIARIO,
      study_pace: StudyRhythmType.RAPIDO,
    };

    handleApiCall("updateCoursePreferences", () =>
      apiController.updateCoursePreferences(
        currentUserId,
        currentCourseId,
        updateData
      )
    );
  };

  const testListCoursePreferences = () => {
    handleApiCall("listCoursePreferences", () =>
      apiController.listCoursePreferences()
    );
  };

  const testUseSamplePreferences = (
    sampleKey: keyof typeof SAMPLE_PREFERENCES
  ) => {
    const preferences = SAMPLE_PREFERENCES[sampleKey];

    handleApiCall(`useSample_${sampleKey}`, async () => {
      const response = await apiController.setUserPreferences(preferences);
      if (
        response.success &&
        response.data &&
        typeof response.data === "object" &&
        "user_id" in response.data
      ) {
        setCurrentUserId((response.data as { user_id: string }).user_id);
      }
      return response;
    });
  };

  const renderResult = (key: string, result: TestResult) => {
    if (!result) return null;

    const isError = result.error || !result.success;

    return (
      <div
        key={key}
        className="bg-white rounded-lg p-4 shadow-sm border-2 border-[#cc6200] mb-4"
      >
        <h4 className="font-semibold text-[#593100] mb-2 capitalize">
          {key.replace(/([A-Z])/g, " $1").trim()}
        </h4>
        <div
          className={`p-3 rounded-lg ${isError ? "bg-red-50" : "bg-green-50"}`}
        >
          <pre className="text-sm overflow-x-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#fff7f0] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#593100] mb-2">
              🧪 Teste da API - Preferências
            </h1>
            <p className="text-xl text-[#593100] opacity-80">
              Teste todos os endpoints do sistema de preferências
            </p>
          </div>
          <Link
            href="/"
            className="px-6 py-3 bg-gradient-to-br from-[#593100] via-[#ffddc2] to-[#593100] text-[#593100] font-semibold rounded-lg shadow-md hover:brightness-110 transition"
          >
            ← Voltar ao Início
          </Link>
        </div>

        {/* Controles de ID */}
        <div className="bg-[#ffddc2] rounded-xl p-6 mb-8 shadow-md">
          <h2 className="text-2xl font-bold text-[#593100] mb-4">
            🔧 Controles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-[#593100] font-semibold mb-2">
                User ID Atual:
              </label>
              <input
                type="text"
                value={currentUserId}
                onChange={(e) => setCurrentUserId(e.target.value)}
                placeholder="ID do usuário será preenchido automaticamente"
                className="w-full px-4 py-2 bg-[#fff7f0] border-2 border-[#cc6200] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cc6200] text-[#593100]"
              />
            </div>
            <div>
              <label className="block text-[#593100] font-semibold mb-2">
                Course ID Atual:
              </label>
              <input
                type="text"
                value={currentCourseId}
                onChange={(e) => setCurrentCourseId(e.target.value)}
                placeholder="ID do curso será preenchido automaticamente"
                className="w-full px-4 py-2 bg-[#fff7f0] border-2 border-[#cc6200] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cc6200] text-[#593100]"
              />
            </div>
          </div>

          {/* Botões de controle */}
          <div className="flex gap-4">
            <button
              onClick={() => {
                setResults({});
                setCurrentUserId("");
                setCurrentCourseId("");
              }}
              className="px-6 py-2 bg-red-500 text-white rounded-lg font-semibold shadow-md hover:bg-red-600 transition"
            >
              🗑️ Limpar Tudo
            </button>
            <button
              onClick={() => setResults({})}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg font-semibold shadow-md hover:bg-gray-600 transition"
            >
              🧹 Limpar Resultados
            </button>
          </div>
        </div>

        {/* Testes de Preferências do Usuário */}
        <div className="bg-[#ffddc2] rounded-xl p-6 mb-8 shadow-md">
          <h2 className="text-2xl font-bold text-[#593100] mb-4">
            👤 Preferências do Usuário
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={testCreateUserPreferences}
              disabled={loading === "createUserPreferences"}
              className="px-4 py-3 bg-green-500 text-white rounded-lg font-semibold shadow-md hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading === "createUserPreferences"
                ? "Criando..."
                : "Criar Preferências"}
            </button>

            <button
              onClick={testGetUserPreferences}
              disabled={loading === "getUserPreferences"}
              className="px-4 py-3 bg-blue-500 text-white rounded-lg font-semibold shadow-md hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading === "getUserPreferences"
                ? "Buscando..."
                : "Buscar Preferências"}
            </button>

            <button
              onClick={testUpdateUserPreferences}
              disabled={loading === "updateUserPreferences"}
              className="px-4 py-3 bg-yellow-500 text-white rounded-lg font-semibold shadow-md hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading === "updateUserPreferences"
                ? "Atualizando..."
                : "Atualizar Preferências"}
            </button>

            <button
              onClick={testListUserPreferences}
              disabled={loading === "listUserPreferences"}
              className="px-4 py-3 bg-purple-500 text-white rounded-lg font-semibold shadow-md hover:bg-purple-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading === "listUserPreferences"
                ? "Listando..."
                : "Listar Todas"}
            </button>
          </div>
        </div>

        {/* Testes de Preferências do Curso */}
        <div className="bg-[#ffddc2] rounded-xl p-6 mb-8 shadow-md">
          <h2 className="text-2xl font-bold text-[#593100] mb-4">
            📚 Preferências do Curso
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={testCreateCoursePreferences}
              disabled={loading === "createCoursePreferences"}
              className="px-4 py-3 bg-green-500 text-white rounded-lg font-semibold shadow-md hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading === "createCoursePreferences"
                ? "Criando..."
                : "Criar Pref. Curso"}
            </button>

            <button
              onClick={testGetCoursePreferences}
              disabled={loading === "getCoursePreferences"}
              className="px-4 py-3 bg-blue-500 text-white rounded-lg font-semibold shadow-md hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading === "getCoursePreferences"
                ? "Buscando..."
                : "Buscar Pref. Curso"}
            </button>

            <button
              onClick={testUpdateCoursePreferences}
              disabled={loading === "updateCoursePreferences"}
              className="px-4 py-3 bg-yellow-500 text-white rounded-lg font-semibold shadow-md hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading === "updateCoursePreferences"
                ? "Atualizando..."
                : "Atualizar Pref. Curso"}
            </button>

            <button
              onClick={testListCoursePreferences}
              disabled={loading === "listCoursePreferences"}
              className="px-4 py-3 bg-purple-500 text-white rounded-lg font-semibold shadow-md hover:bg-purple-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading === "listCoursePreferences"
                ? "Listando..."
                : "Listar Pref. Cursos"}
            </button>
          </div>
        </div>

        {/* Exemplos Pré-definidos */}
        <div className="bg-[#ffddc2] rounded-xl p-6 mb-8 shadow-md">
          <h2 className="text-2xl font-bold text-[#593100] mb-4">
            🎭 Exemplos Pré-definidos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.keys(SAMPLE_PREFERENCES).map((key) => (
              <button
                key={key}
                onClick={() =>
                  testUseSamplePreferences(
                    key as keyof typeof SAMPLE_PREFERENCES
                  )
                }
                disabled={loading === `useSample_${key}`}
                className="px-4 py-3 bg-orange-500 text-white rounded-lg font-semibold shadow-md hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {loading === `useSample_${key}`
                  ? "Testando..."
                  : key.replace(/_/g, " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Resultados */}
        <div className="bg-[#ffddc2] rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-bold text-[#593100] mb-4">
            📊 Resultados
          </h2>
          {Object.keys(results).length === 0 ? (
            <p className="text-[#593100] opacity-70 text-center py-8">
              Nenhum teste executado ainda. Clique nos botões acima para testar
              a API.
            </p>
          ) : (
            <div className="space-y-4">
              {Object.entries(results).map(([key, result]) =>
                renderResult(key, result)
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
