"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard";
import { useCourses } from "@/contexts/CourseContext";
import { PersonalizedCurriculumModule } from "@/lib/types";

export default function CourseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const {
    getCourseById,
    loading,
    generateSubmoduleContent,
    isSubmoduleContentGenerated,
  } = useCourses();
  const course = getCourseById(params.id);
  const [generatingContent, setGeneratingContent] = useState<string | null>(
    null
  );

  const handleGenerateContent = async (
    moduleId: string,
    submoduleId: string
  ) => {
    const contentKey = `${moduleId}-${submoduleId}`;
    setGeneratingContent(contentKey);

    try {
      const success = await generateSubmoduleContent(
        params.id,
        moduleId,
        submoduleId
      );
      if (success) {
        console.log("Conteúdo gerado com sucesso!");
      } else {
        console.error("Falha ao gerar conteúdo");
      }
    } catch (error) {
      console.error("Erro ao gerar conteúdo:", error);
    } finally {
      setGeneratingContent(null);
    }
  };

  const handleStudyContent = (moduleId: string, submoduleId: string) => {
    // Aqui você pode implementar a navegação para a página de estudo
    console.log(`Estudar submódulo ${submoduleId} do módulo ${moduleId}`);
    // router.push(`/dashboard/courses/${params.id}/study/${moduleId}/${submoduleId}`);
  };

  if (loading) {
    return (
      <DashboardLayout title="Carregando..." subtitle="">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#cc6200]"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!course) {
    return (
      <DashboardLayout title="Curso não encontrado" subtitle="">
        <div className="text-center py-12">
          <span className="text-6xl opacity-20">❌</span>
          <h2 className="text-2xl font-bold text-[#593100] mt-4">
            Curso não encontrado
          </h2>
          <p className="text-[#593100] opacity-60 mt-2">
            O curso que você está procurando não existe ou foi removido.
          </p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-6 py-2 bg-[#cc6200] text-white rounded-lg hover:bg-[#ff8c00] transition-colors"
          >
            Voltar
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const hasPersonalizedCurriculum = course.personalized_curriculum;

  return (
    <DashboardLayout title={course.name} subtitle={course.description}>
      <div className="space-y-6">
        {/* Currículo Personalizado */}
        {hasPersonalizedCurriculum && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#ffddc2]">
            <h2 className="text-xl font-bold text-[#593100] mb-4">
              📋 Currículo Personalizado
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-[#593100] mb-2">
                    🎯 Nível Identificado
                  </h3>
                  <p className="text-sm text-[#593100] opacity-80 bg-[#fff7f0] p-3 rounded-lg">
                    {course.personalized_curriculum?.nivel_identificado}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#593100] mb-2">
                    👨‍🏫 Personalidade Aplicada
                  </h3>
                  <p className="text-sm text-[#593100] opacity-80 bg-[#fff7f0] p-3 rounded-lg">
                    {course.personalized_curriculum?.personalidade_aplicada}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-[#593100] mb-2">
                    🧠 Adaptações Neurodivergência
                  </h3>
                  <p className="text-sm text-[#593100] opacity-80 bg-[#fff7f0] p-3 rounded-lg">
                    {
                      course.personalized_curriculum
                        ?.adaptacoes_neurodivergencia
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-[#593100] mb-2">
                🔧 Adaptações Personalizadas
              </h3>
              <p className="text-sm text-[#593100] opacity-80 bg-[#fff7f0] p-4 rounded-lg">
                {course.personalized_curriculum?.adaptacoes_personalizadas}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[#593100] mb-2">
                💡 Justificativa da Personalização
              </h3>
              <p className="text-sm text-[#593100] opacity-80 bg-[#fff7f0] p-4 rounded-lg">
                {course.personalized_curriculum?.justificativa_personalizacao}
              </p>
            </div>
          </div>
        )}

        {/* Módulos do Curso */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#ffddc2]">
          <h2 className="text-xl font-bold text-[#593100] mb-6">
            📖 Módulos do Curso
          </h2>

          <div className="space-y-6">
            {hasPersonalizedCurriculum
              ? // Renderizar módulos do currículo personalizado
                course.personalized_curriculum?.modulos.map(
                  (modulo: PersonalizedCurriculumModule) => (
                    <div
                      key={modulo.ID_MODULO}
                      className="border border-[#ffddc2] rounded-lg p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-[#593100] mb-2">
                            Módulo {modulo.ID_MODULO}: {modulo.NAME_MODULO}
                          </h3>
                          <p className="text-sm text-[#593100] opacity-80 mb-3">
                            {modulo.DESCRICAO_MODULO}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="px-3 py-1 bg-[#ffddc2] text-[#593100] text-xs rounded-full">
                            {modulo.NIVEL_DIFICULDADE}
                          </span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {modulo.TEMPO_ESTIMADO}
                          </span>
                        </div>
                      </div>

                      {/* Roadmap do Módulo */}
                      <div className="mb-4">
                        <h4 className="font-medium text-[#593100] mb-2">
                          🗺️ Roadmap
                        </h4>
                        <div className="text-sm text-[#593100] opacity-80 bg-[#fff7f0] p-3 rounded-lg whitespace-pre-line">
                          {modulo.ROADMAP_MODULO}
                        </div>
                      </div>

                      {/* Adaptações e Justificativa */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium text-[#593100] mb-2">
                            🧠 Adaptações Neuro
                          </h4>
                          <p className="text-xs text-[#593100] opacity-70 bg-[#fff7f0] p-3 rounded-lg">
                            {modulo.ADAPTACOES_NEURO}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-[#593100] mb-2">
                            💡 Justificativa
                          </h4>
                          <p className="text-xs text-[#593100] opacity-70 bg-[#fff7f0] p-3 rounded-lg">
                            {modulo.JUSTIFICATIVA}
                          </p>
                        </div>
                      </div>

                      {/* Submódulos */}
                      <div>
                        <h4 className="font-medium text-[#593100] mb-3">
                          📚 Submódulos
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {modulo.SUBMODULOS.map((submodulo) => {
                            const contentGenerated =
                              isSubmoduleContentGenerated(
                                params.id,
                                modulo.ID_MODULO,
                                submodulo.ID_SUBMODULO
                              );
                            const isGenerating =
                              generatingContent ===
                              `${modulo.ID_MODULO}-${submodulo.ID_SUBMODULO}`;

                            return (
                              <div
                                key={submodulo.ID_SUBMODULO}
                                className="bg-[#fff7f0] p-4 rounded-lg"
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <h5 className="font-medium text-[#593100] text-sm">
                                    {submodulo.ID_SUBMODULO}.{" "}
                                    {submodulo.NAME_SUBMODULO}
                                  </h5>
                                  <span className="text-xs text-[#593100] opacity-60 bg-white px-2 py-1 rounded">
                                    {submodulo.TEMPO_ESTIMADO}
                                  </span>
                                </div>
                                <p className="text-xs text-[#593100] opacity-70 mb-3">
                                  {submodulo.DESCRICAO_SUBMODULO}
                                </p>
                                {submodulo.ROADMAP_SUBMODULO && (
                                  <div className="text-xs text-[#593100] opacity-60 whitespace-pre-line mb-3">
                                    {submodulo.ROADMAP_SUBMODULO}
                                  </div>
                                )}

                                {/* Botão Gerar/Estudar */}
                                <div className="flex justify-end">
                                  {contentGenerated ? (
                                    <button
                                      onClick={() =>
                                        handleStudyContent(
                                          modulo.ID_MODULO,
                                          submodulo.ID_SUBMODULO
                                        )
                                      }
                                      className="px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                                    >
                                      <span>📖</span>
                                      Estudar
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() =>
                                        handleGenerateContent(
                                          modulo.ID_MODULO,
                                          submodulo.ID_SUBMODULO
                                        )
                                      }
                                      disabled={isGenerating}
                                      className="px-4 py-2 bg-[#cc6200] text-white text-sm rounded-lg hover:bg-[#ff8c00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                      {isGenerating ? (
                                        <>
                                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                          Gerando...
                                        </>
                                      ) : (
                                        <>
                                          <span>⚡</span>
                                          Gerar
                                        </>
                                      )}
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )
                )
              : // Renderizar módulos do formato original
                course.modulos?.map((modulo) => (
                  <div
                    key={modulo.ID_MODULO}
                    className="border border-[#ffddc2] rounded-lg p-6"
                  >
                    <h3 className="text-lg font-semibold text-[#593100] mb-2">
                      Módulo {modulo.ID_MODULO}: {modulo.NAME_MODULO}
                    </h3>
                    <p className="text-sm text-[#593100] opacity-80 mb-4">
                      {modulo.DESCRICAO_MODULO}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {modulo.SUBMODULOS.map((submodulo) => {
                        const contentGenerated = isSubmoduleContentGenerated(
                          params.id,
                          modulo.ID_MODULO,
                          submodulo.ID_SUBMODULO
                        );
                        const isGenerating =
                          generatingContent ===
                          `${modulo.ID_MODULO}-${submodulo.ID_SUBMODULO}`;

                        return (
                          <div
                            key={submodulo.ID_SUBMODULO}
                            className="bg-[#fff7f0] p-4 rounded-lg"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium text-[#593100] text-sm">
                                {submodulo.ID_SUBMODULO}.{" "}
                                {submodulo.NAME_SUBMODULO}
                              </h4>
                              <span className="text-xs text-[#593100] opacity-60 bg-white px-2 py-1 rounded">
                                {submodulo.TEMPO_ESTIMADO}
                              </span>
                            </div>
                            <p className="text-xs text-[#593100] opacity-70 mb-3">
                              {submodulo.DESCRICAO_SUBMODULO}
                            </p>

                            {/* Botão Gerar/Estudar */}
                            <div className="flex justify-end">
                              {contentGenerated ? (
                                <button
                                  onClick={() =>
                                    handleStudyContent(
                                      modulo.ID_MODULO,
                                      submodulo.ID_SUBMODULO
                                    )
                                  }
                                  className="px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                                >
                                  <span>📖</span>
                                  Estudar
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    handleGenerateContent(
                                      modulo.ID_MODULO,
                                      submodulo.ID_SUBMODULO
                                    )
                                  }
                                  disabled={isGenerating}
                                  className="px-4 py-2 bg-[#cc6200] text-white text-sm rounded-lg hover:bg-[#ff8c00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                  {isGenerating ? (
                                    <>
                                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                      Gerando...
                                    </>
                                  ) : (
                                    <>
                                      <span>⚡</span>
                                      Gerar
                                    </>
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
