"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard";
import { apiController } from "@/controllers/api.controller";
import {
  PersonalizedCurriculumModule,
  PersonalizedCurriculum,
} from "@/lib/types";

interface CourseMaterial {
  material_id: string;
  course_id: string;
  target_type: string;
  target_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

interface CourseStructure {
  course_id: string;
  topic: string;
  personalized_curriculum?: PersonalizedCurriculum;
  materials: Record<string, Record<string, unknown>>;
  research_status?: string;
  research_progress?: number;
  created_at?: string;
}

interface MaterialsMap {
  [key: string]: CourseMaterial;
}

export default function CourseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [courseStructure, setCourseStructure] =
    useState<CourseStructure | null>(null);
  const [materials, setMaterials] = useState<CourseMaterial[]>([]);
  const [materialsMap, setMaterialsMap] = useState<MaterialsMap>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Estados para geração de material
  const [generatingMaterials, setGeneratingMaterials] = useState<Set<string>>(
    new Set()
  );
  const [generationProgress, setGenerationProgress] = useState<
    Record<string, number>
  >({});

  // Carregar estrutura do curso e materiais
  useEffect(() => {
    const loadCourseData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [structureResponse, materialsResponse] = await Promise.all([
          apiController.getCourseStructure(params.id),
          apiController.listCourseMaterials(params.id),
        ]);

        if (structureResponse.success && structureResponse.data) {
          // Fazer casting adequado da resposta da API
          const courseData = structureResponse.data;

          // Tentar acessar o personalized_curriculum de diferentes formas
          let personalizedCurriculum = null;

          // Tentar acessar o personalized_curriculum
          if (courseData.personalized_curriculum) {
            personalizedCurriculum = courseData.personalized_curriculum;
          }
          // Verificar estrutura aninhada (se necessário)
          // @ts-expect-error - verificação de estrutura aninhada
          else if (courseData.data && courseData.data.personalized_curriculum) {
            // @ts-expect-error - verificação de estrutura aninhada
            personalizedCurriculum = courseData.data.personalized_curriculum;
          }

          const structureData: CourseStructure = {
            course_id: courseData.course_id,
            topic: courseData.topic,
            personalized_curriculum: personalizedCurriculum as unknown as
              | PersonalizedCurriculum
              | undefined,
            materials: courseData.materials,
            research_status: courseData.research_status,
            research_progress: courseData.research_progress,
            created_at: courseData.created_at,
          };

          setCourseStructure(structureData);
        } else {
          console.error(
            "❌ Erro ao carregar estrutura:",
            structureResponse.message
          );
          setError("Erro ao carregar estrutura do curso");
          return;
        }

        if (materialsResponse.success && materialsResponse.data) {
          // Verificar se os dados estão em data.data (conforme mencionado pelo usuário)
          const responseData = materialsResponse.data as
            | CourseMaterial[]
            | { data: CourseMaterial[] };
          const materialsData = Array.isArray(responseData)
            ? responseData
            : (responseData as { data: CourseMaterial[] }).data || [];

          setMaterials(materialsData);

          // Criar mapa de materiais por target_type e target_id
          const map: MaterialsMap = {};
          if (Array.isArray(materialsData) && materialsData.length > 0) {
            materialsData.forEach((material: CourseMaterial) => {
              // Verificar se o material tem as propriedades necessárias
              if (material.target_type && material.target_id) {
                const key = `${material.target_type}_${material.target_id}`;
                map[key] = material;
              } else {
                console.warn(
                  "⚠️ Material sem target_type ou target_id:",
                  material
                );
              }
            });
            setMaterialsMap(map);
          }
        } else {
          setMaterials([]);
          setMaterialsMap({});
        }
      } catch (error) {
        console.error("💥 Erro ao carregar dados do curso:", error);
        setError("Erro ao carregar curso");
      } finally {
        setLoading(false);
      }
    };

    loadCourseData();
  }, [params.id]);

  const handleGenerateContent = async (
    moduleId: string,
    submoduleId: string
  ) => {
    const materialKey = `${moduleId}_${submoduleId}`;

    // Adicionar ao estado de geração
    setGeneratingMaterials((prev) => new Set([...prev, materialKey]));
    setGenerationProgress((prev) => ({ ...prev, [materialKey]: 0 }));

    try {
      // Simular progresso inicial
      setGenerationProgress((prev) => ({ ...prev, [materialKey]: 15 }));

      // Redirecionar para a página de geração de material
      const queryParams = new URLSearchParams({
        targetType: "submodule",
        targetId: submoduleId,
        moduleId: moduleId,
        submoduleId: submoduleId,
      });

      router.push(
        `/dashboard/courses/${
          params.id
        }/generate-material?${queryParams.toString()}`
      );
    } catch (error) {
      console.error("Erro ao gerar material:", error);
      // Remover do estado de geração em caso de erro
      setGeneratingMaterials((prev) => {
        const newSet = new Set(prev);
        newSet.delete(materialKey);
        return newSet;
      });
      setGenerationProgress((prev) => {
        const newProgress = { ...prev };
        delete newProgress[materialKey];
        return newProgress;
      });
    }
  };

  const handleStudyContent = (materialId: string) => {
    router.push(`/dashboard/courses/${params.id}/material/${materialId}`);
  };

  const getSubmoduleMaterial = (submoduleId: string): CourseMaterial | null => {
    const key = `submodule_${submoduleId}`;
    const material = materialsMap[key] || null;
    if (material) {
    }
    return material;
  };

  const formatDate = (dateString: string): string => {
    try {
      return new Date(dateString).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Data inválida";
    }
  };

  // Função para verificar se um material está sendo gerado
  const isMaterialGenerating = (
    moduleId: string,
    submoduleId: string
  ): boolean => {
    const materialKey = `${moduleId}_${submoduleId}`;
    return generatingMaterials.has(materialKey);
  };

  // Função para obter progresso de geração
  const getMaterialGenerationProgress = (
    moduleId: string,
    submoduleId: string
  ): number => {
    const materialKey = `${moduleId}_${submoduleId}`;
    return generationProgress[materialKey] || 0;
  };

  // Função para calcular estatísticas de materiais por módulo
  const getModuleStatistics = (modulo: PersonalizedCurriculumModule) => {
    const totalSubmodules = modulo.SUBMODULOS.length;
    const completedSubmodules = modulo.SUBMODULOS.filter((submodulo) =>
      Boolean(getSubmoduleMaterial(submodulo.ID_SUBMODULO))
    ).length;
    const generatingSubmodules = modulo.SUBMODULOS.filter((submodulo) =>
      isMaterialGenerating(modulo.ID_MODULO, submodulo.ID_SUBMODULO)
    ).length;
    const progressPercentage =
      totalSubmodules > 0 ? (completedSubmodules / totalSubmodules) * 100 : 0;

    return {
      totalSubmodules,
      completedSubmodules,
      generatingSubmodules,
      progressPercentage,
      pendingSubmodules:
        totalSubmodules - completedSubmodules - generatingSubmodules,
    };
  };

  // Função para calcular estatísticas gerais do curso
  const getCourseStatistics = () => {
    if (!hasPersonalizedCurriculum || !personalizedCurriculum) {
      return {
        totalModules: 0,
        totalSubmodules: 0,
        completedMaterials: 0,
        generatingMaterials: 0,
        progressPercentage: 0,
      };
    }

    const totalModules = personalizedCurriculum.modulos.length;
    const totalSubmodules = personalizedCurriculum.modulos.reduce(
      (total, modulo) => total + modulo.SUBMODULOS.length,
      0
    );
    const completedMaterials = personalizedCurriculum.modulos.reduce(
      (total, modulo) => {
        return (
          total +
          modulo.SUBMODULOS.filter((submodulo) =>
            Boolean(getSubmoduleMaterial(submodulo.ID_SUBMODULO))
          ).length
        );
      },
      0
    );
    const generatingMaterials = personalizedCurriculum.modulos.reduce(
      (total, modulo) => {
        return (
          total +
          modulo.SUBMODULOS.filter((submodulo) =>
            isMaterialGenerating(modulo.ID_MODULO, submodulo.ID_SUBMODULO)
          ).length
        );
      },
      0
    );
    const progressPercentage =
      totalSubmodules > 0 ? (completedMaterials / totalSubmodules) * 100 : 0;

    return {
      totalModules,
      totalSubmodules,
      completedMaterials,
      generatingMaterials,
      progressPercentage,
    };
  };

  if (loading) {
    return (
      <DashboardLayout title="Carregando..." subtitle="">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#cc6200]"></div>
          <span className="ml-4 text-[#593100]">
            Carregando dados do curso...
          </span>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !courseStructure) {
    return (
      <DashboardLayout title="Curso não encontrado" subtitle="">
        <div className="text-center py-12">
          <span className="text-6xl opacity-20">❌</span>
          <h2 className="text-2xl font-bold text-[#593100] mt-4">
            Curso não encontrado
          </h2>
          <p className="text-[#593100] opacity-60 mt-2">
            {error ||
              "O curso que você está procurando não existe ou foi removido."}
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

  // Extrair currículo personalizado se disponível
  const personalizedCurriculum = courseStructure.personalized_curriculum;
  const hasPersonalizedCurriculum = Boolean(personalizedCurriculum);

  return (
    <DashboardLayout
      title={courseStructure.topic}
      subtitle={
        hasPersonalizedCurriculum && personalizedCurriculum
          ? `${getCourseStatistics().totalModules} módulos • ${
              getCourseStatistics().totalSubmodules
            } submódulos • ${
              getCourseStatistics().completedMaterials
            } materiais gerados (${getCourseStatistics().progressPercentage.toFixed(
              0
            )}% concluído)`
          : `Curso ID: ${courseStructure.course_id} • ${materials.length} material(s) disponível(s)`
      }
    >
      <div className="space-y-6">
        {/* Informações do Curso */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#ffddc2]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#fff7f0] p-4 rounded-lg">
              <h3 className="font-semibold text-[#593100] mb-1">
                📊 Status da Pesquisa
              </h3>
              <p className="text-sm text-[#593100] opacity-80">
                {courseStructure.research_status || "Não iniciada"}
              </p>
              {courseStructure.research_progress && (
                <div className="mt-2">
                  <div className="w-full bg-[#ffddc2] rounded-full h-2">
                    <div
                      className="bg-[#cc6200] h-2 rounded-full transition-all"
                      style={{ width: `${courseStructure.research_progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-[#593100] opacity-60">
                    {courseStructure.research_progress}%
                  </span>
                </div>
              )}
            </div>

            <div className="bg-[#fff7f0] p-4 rounded-lg">
              <h3 className="font-semibold text-[#593100] mb-1">
                📚 Materiais
              </h3>
              <p className="text-sm text-[#593100] opacity-80">
                {hasPersonalizedCurriculum && personalizedCurriculum
                  ? `${getCourseStatistics().completedMaterials} de ${
                      getCourseStatistics().totalSubmodules
                    } gerados`
                  : `${materials.length} material(s) gerado(s)`}
              </p>
              {hasPersonalizedCurriculum &&
                personalizedCurriculum &&
                getCourseStatistics().generatingMaterials > 0 && (
                  <p className="text-xs text-yellow-600 mt-1">
                    ⚙️ {getCourseStatistics().generatingMaterials} sendo gerados
                  </p>
                )}
            </div>

            <div className="bg-[#fff7f0] p-4 rounded-lg">
              <h3 className="font-semibold text-[#593100] mb-1">
                📅 Criado em
              </h3>
              <p className="text-sm text-[#593100] opacity-80">
                {courseStructure.created_at
                  ? formatDate(courseStructure.created_at)
                  : "Data não disponível"}
              </p>
            </div>
          </div>
        </div>

        {/* Resumo Rápido de Materiais (quando há materiais) */}
        {hasPersonalizedCurriculum &&
          personalizedCurriculum &&
          getCourseStatistics().completedMaterials > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#ffddc2]">
              <h2 className="text-xl font-bold text-[#593100] mb-4">
                🚀 Acesso Rápido aos Materiais
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {personalizedCurriculum.modulos.map((modulo) => {
                  const completedSubmodules = modulo.SUBMODULOS.filter(
                    (submodulo) =>
                      Boolean(getSubmoduleMaterial(submodulo.ID_SUBMODULO))
                  );

                  if (completedSubmodules.length === 0) return null;

                  return (
                    <div
                      key={modulo.ID_MODULO}
                      className="bg-[#fff7f0] p-4 rounded-lg border border-[#ffddc2]"
                    >
                      <h3 className="font-medium text-[#593100] mb-2 text-sm">
                        📘 Módulo {modulo.ID_MODULO}: {modulo.NAME_MODULO}
                      </h3>
                      <div className="space-y-2">
                        {completedSubmodules.slice(0, 3).map((submodulo) => {
                          const material = getSubmoduleMaterial(
                            submodulo.ID_SUBMODULO
                          );
                          if (!material) return null;

                          return (
                            <button
                              key={submodulo.ID_SUBMODULO}
                              onClick={() =>
                                handleStudyContent(material.material_id)
                              }
                              className="w-full text-left px-3 py-2 bg-white rounded border border-[#ffddc2] hover:border-[#cc6200] transition-colors text-xs"
                            >
                              📄 {submodulo.NAME_SUBMODULO}
                            </button>
                          );
                        })}
                        {completedSubmodules.length > 3 && (
                          <p className="text-xs text-[#593100] opacity-60 text-center">
                            +{completedSubmodules.length - 3} mais materiais
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        {/* Currículo Personalizado */}
        {hasPersonalizedCurriculum && personalizedCurriculum && (
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
                    {personalizedCurriculum?.nivel_identificado}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#593100] mb-2">
                    👨‍🏫 Personalidade Aplicada
                  </h3>
                  <p className="text-sm text-[#593100] opacity-80 bg-[#fff7f0] p-3 rounded-lg">
                    {personalizedCurriculum?.personalidade_aplicada}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-[#593100] mb-2">
                    🧠 Adaptações Neurodivergência
                  </h3>
                  <p className="text-sm text-[#593100] opacity-80 bg-[#fff7f0] p-3 rounded-lg">
                    {personalizedCurriculum?.adaptacoes_neurodivergencia}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-[#593100] mb-2">
                🔧 Adaptações Personalizadas
              </h3>
              <p className="text-sm text-[#593100] opacity-80 bg-[#fff7f0] p-4 rounded-lg">
                {personalizedCurriculum?.adaptacoes_personalizadas}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[#593100] mb-2">
                💡 Justificativa da Personalização
              </h3>
              <p className="text-sm text-[#593100] opacity-80 bg-[#fff7f0] p-4 rounded-lg">
                {personalizedCurriculum?.justificativa_personalizacao}
              </p>
            </div>
          </div>
        )}

        {/* Módulos do Curso */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#ffddc2]">
          <h2 className="text-xl font-bold text-[#593100] mb-6">
            📖 Estrutura do Curso
          </h2>

          {hasPersonalizedCurriculum && personalizedCurriculum ? (
            <div className="space-y-6">
              {/* Estatísticas Gerais */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-[#fff7f0] p-4 rounded-lg border border-[#ffddc2] text-center">
                  <div className="text-2xl font-bold text-[#cc6200]">
                    {getCourseStatistics().totalModules}
                  </div>
                  <div className="text-sm text-[#593100] opacity-80">
                    Módulos Totais
                  </div>
                </div>
                <div className="bg-[#fff7f0] p-4 rounded-lg border border-[#ffddc2] text-center">
                  <div className="text-2xl font-bold text-[#cc6200]">
                    {getCourseStatistics().totalSubmodules}
                  </div>
                  <div className="text-sm text-[#593100] opacity-80">
                    Submódulos Totais
                  </div>
                </div>
                <div className="bg-[#fff7f0] p-4 rounded-lg border border-[#ffddc2] text-center">
                  <div className="text-2xl font-bold text-[#cc6200]">
                    {getCourseStatistics().completedMaterials}
                  </div>
                  <div className="text-sm text-[#593100] opacity-80">
                    Materiais Gerados
                  </div>
                </div>
                <div className="bg-[#fff7f0] p-4 rounded-lg border border-[#ffddc2] text-center">
                  <div className="text-2xl font-bold text-[#cc6200]">
                    {getCourseStatistics().progressPercentage.toFixed(0)}%
                  </div>
                  <div className="text-sm text-[#593100] opacity-80">
                    Progresso Geral
                  </div>
                </div>
              </div>

              {/* Módulos */}
              <div className="space-y-6">
                {personalizedCurriculum.modulos.map(
                  (modulo: PersonalizedCurriculumModule) => {
                    const moduleStats = getModuleStatistics(modulo);

                    return (
                      <div
                        key={modulo.ID_MODULO}
                        className="bg-[#fff7f0] p-6 rounded-lg border border-[#ffddc2] hover:shadow-md transition-shadow"
                      >
                        {/* Cabeçalho do Módulo */}
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-[#593100] mb-2">
                              📘 Módulo {modulo.ID_MODULO}: {modulo.NAME_MODULO}
                            </h3>
                            <p className="text-sm text-[#593100] opacity-80 mb-3">
                              {modulo.DESCRICAO_MODULO}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <div className="flex gap-2">
                              <span className="text-xs bg-[#cc6200] text-white px-2 py-1 rounded">
                                {modulo.NIVEL_DIFICULDADE}
                              </span>
                              <span className="text-xs bg-[#ffddc2] text-[#593100] px-2 py-1 rounded">
                                {modulo.TEMPO_ESTIMADO}
                              </span>
                            </div>
                            <div className="text-xs text-[#593100] opacity-60">
                              {moduleStats.completedSubmodules}/
                              {moduleStats.totalSubmodules} submódulos
                            </div>
                            {/* Estatísticas detalhadas do módulo */}
                            <div className="flex gap-1 text-xs">
                              {moduleStats.completedSubmodules > 0 && (
                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                                  ✅ {moduleStats.completedSubmodules} prontos
                                </span>
                              )}
                              {moduleStats.generatingSubmodules > 0 && (
                                <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                                  ⚙️ {moduleStats.generatingSubmodules} gerando
                                </span>
                              )}
                              {moduleStats.pendingSubmodules > 0 && (
                                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                  ⏳ {moduleStats.pendingSubmodules} pendentes
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Barra de Progresso do Módulo */}
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-medium text-[#593100]">
                              Progresso do Módulo
                            </span>
                            <span className="text-xs text-[#593100] opacity-60">
                              {moduleStats.progressPercentage.toFixed(0)}%
                            </span>
                          </div>
                          <div className="w-full bg-[#ffddc2] rounded-full h-2">
                            <div
                              className="bg-[#cc6200] h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${moduleStats.progressPercentage}%`,
                              }}
                            ></div>
                          </div>
                          {/* Barra segmentada mostrando estados */}
                          <div className="flex mt-1 h-1 rounded-full overflow-hidden">
                            <div
                              className="bg-green-400 transition-all duration-300"
                              style={{
                                width: `${
                                  (moduleStats.completedSubmodules /
                                    moduleStats.totalSubmodules) *
                                  100
                                }%`,
                              }}
                            ></div>
                            <div
                              className="bg-yellow-400 transition-all duration-300"
                              style={{
                                width: `${
                                  (moduleStats.generatingSubmodules /
                                    moduleStats.totalSubmodules) *
                                  100
                                }%`,
                              }}
                            ></div>
                            <div
                              className="bg-gray-300 transition-all duration-300"
                              style={{
                                width: `${
                                  (moduleStats.pendingSubmodules /
                                    moduleStats.totalSubmodules) *
                                  100
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        {/* Roadmap do Módulo */}
                        <div className="mb-4">
                          <h4 className="font-medium text-[#593100] mb-2">
                            🗺️ Roadmap do Módulo
                          </h4>
                          <div className="bg-white p-3 rounded-lg border border-[#ffddc2]">
                            <div className="text-sm text-[#593100] opacity-80 whitespace-pre-line">
                              {modulo.ROADMAP_MODULO}
                            </div>
                          </div>
                        </div>

                        {/* Adaptações Neurológicas */}
                        {modulo.ADAPTACOES_NEURO && (
                          <div className="mb-4">
                            <h4 className="font-medium text-[#593100] mb-2">
                              🧠 Adaptações Neurológicas
                            </h4>
                            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                              <div className="text-sm text-blue-800">
                                {modulo.ADAPTACOES_NEURO}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Justificativa */}
                        {modulo.JUSTIFICATIVA && (
                          <div className="mb-4">
                            <h4 className="font-medium text-[#593100] mb-2">
                              💡 Justificativa
                            </h4>
                            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                              <div className="text-sm text-yellow-800">
                                {modulo.JUSTIFICATIVA}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Ações do Módulo */}
                        {moduleStats.completedSubmodules > 0 && (
                          <div className="mb-4">
                            <h4 className="font-medium text-[#593100] mb-2">
                              🎯 Ações do Módulo
                            </h4>
                            <div className="flex gap-2 flex-wrap">
                              <button
                                onClick={() => {
                                  const firstMaterial = modulo.SUBMODULOS.find(
                                    (sub) =>
                                      Boolean(
                                        getSubmoduleMaterial(sub.ID_SUBMODULO)
                                      )
                                  );
                                  if (firstMaterial) {
                                    const material = getSubmoduleMaterial(
                                      firstMaterial.ID_SUBMODULO
                                    );
                                    if (material) {
                                      handleStudyContent(material.material_id);
                                    }
                                  }
                                }}
                                className="px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                              >
                                📖 Ver Primeiro Material
                              </button>
                              <button
                                onClick={() => {}}
                                className="px-3 py-2 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 transition-colors"
                              >
                                📋 Ver Todos os Submódulos
                              </button>
                              {moduleStats.completedSubmodules ===
                                moduleStats.totalSubmodules && (
                                <span className="px-3 py-2 bg-green-100 text-green-700 rounded text-sm">
                                  🎉 Módulo Completo!
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Submódulos */}
                        <div className="space-y-3">
                          <h4 className="font-medium text-[#593100] flex items-center gap-2">
                            📚 Submódulos ({modulo.SUBMODULOS.length})
                          </h4>

                          <div className="space-y-2">
                            {modulo.SUBMODULOS.map((submodulo) => {
                              const material = getSubmoduleMaterial(
                                submodulo.ID_SUBMODULO
                              );
                              const hasMaterial = Boolean(material);
                              const isGenerating = isMaterialGenerating(
                                modulo.ID_MODULO,
                                submodulo.ID_SUBMODULO
                              );
                              const generationProgress =
                                getMaterialGenerationProgress(
                                  modulo.ID_MODULO,
                                  submodulo.ID_SUBMODULO
                                );

                              return (
                                <div
                                  key={submodulo.ID_SUBMODULO}
                                  className={`bg-white p-4 rounded-lg border-2 transition-all duration-200 ${
                                    hasMaterial
                                      ? "border-green-200 bg-green-50"
                                      : isGenerating
                                      ? "border-yellow-200 bg-yellow-50"
                                      : "border-[#ffddc2] hover:border-[#cc6200]"
                                  }`}
                                >
                                  <div className="flex justify-between items-start mb-3">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <h5 className="font-medium text-[#593100]">
                                          {submodulo.ID_SUBMODULO}:{" "}
                                          {submodulo.NAME_SUBMODULO}
                                        </h5>
                                        {hasMaterial && (
                                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                            ✅ Completo
                                          </span>
                                        )}
                                        {isGenerating && (
                                          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                                            ⚙️ Gerando...
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-sm text-[#593100] opacity-70 mb-2">
                                        {submodulo.DESCRICAO_SUBMODULO}
                                      </p>
                                      <div className="text-xs text-[#593100] opacity-60">
                                        ⏱️ {submodulo.TEMPO_ESTIMADO}
                                      </div>
                                    </div>
                                    <div className="flex gap-2">
                                      {hasMaterial && material ? (
                                        <div className="flex gap-2">
                                          <button
                                            onClick={() =>
                                              handleStudyContent(
                                                material.material_id
                                              )
                                            }
                                            className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
                                          >
                                            📖 Estudar
                                          </button>
                                          <button
                                            onClick={() => {
                                              // Copiar link do material
                                              const link = `${window.location.origin}/dashboard/courses/${params.id}/material/${material.material_id}`;
                                              navigator.clipboard.writeText(
                                                link
                                              );
                                            }}
                                            className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
                                            title="Copiar link"
                                          >
                                            🔗
                                          </button>
                                        </div>
                                      ) : isGenerating ? (
                                        <div className="flex gap-2 items-center">
                                          <button
                                            disabled
                                            className="px-3 py-1 bg-yellow-400 text-white rounded text-sm opacity-75 cursor-not-allowed"
                                          >
                                            ⚙️ Gerando...
                                          </button>
                                          <span className="text-xs text-yellow-700">
                                            {generationProgress}%
                                          </span>
                                        </div>
                                      ) : (
                                        <button
                                          onClick={() =>
                                            handleGenerateContent(
                                              modulo.ID_MODULO,
                                              submodulo.ID_SUBMODULO
                                            )
                                          }
                                          className="px-3 py-1 bg-[#cc6200] text-white rounded text-sm hover:bg-[#ff8c00] transition-colors"
                                        >
                                          ⚙️ Gerar Material
                                        </button>
                                      )}
                                    </div>
                                  </div>

                                  {/* Progresso de Geração */}
                                  {isGenerating && (
                                    <div className="mb-3">
                                      <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs font-medium text-yellow-700">
                                          Gerando Material
                                        </span>
                                        <span className="text-xs text-yellow-700">
                                          {generationProgress}%
                                        </span>
                                      </div>
                                      <div className="w-full bg-yellow-200 rounded-full h-2">
                                        <div
                                          className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                                          style={{
                                            width: `${generationProgress}%`,
                                          }}
                                        ></div>
                                      </div>
                                    </div>
                                  )}

                                  {/* Roadmap do Submódulo */}
                                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                                    <h6 className="font-medium text-gray-700 mb-1 text-xs">
                                      🗺️ Roadmap do Submódulo
                                    </h6>
                                    <div className="text-xs text-gray-600 whitespace-pre-line">
                                      {submodulo.ROADMAP_SUBMODULO}
                                    </div>
                                  </div>

                                  {/* Informações do Material */}
                                  {hasMaterial && material && (
                                    <div className="mt-3 pt-3 border-t border-green-200">
                                      <div className="flex justify-between items-center text-xs text-green-700">
                                        <span>📄 {material.title}</span>
                                        <span>
                                          Criado em{" "}
                                          {formatDate(material.created_at)}
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          ) : (
            // Exibir mensagem quando não há currículo personalizado
            <div className="bg-[#fff7f0] p-8 rounded-lg border border-[#ffddc2] text-center">
              <div className="space-y-4">
                <div className="text-6xl opacity-30">📚</div>
                <h3 className="text-xl font-semibold text-[#593100]">
                  Estrutura do Curso em Preparação
                </h3>
                <p className="text-[#593100] opacity-70 max-w-md mx-auto">
                  O currículo personalizado está sendo gerado. Esta página será
                  atualizada automaticamente quando o conteúdo estiver
                  disponível.
                </p>
                <div className="flex justify-center gap-4 mt-6">
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="px-6 py-2 bg-[#cc6200] text-white rounded-lg hover:bg-[#ff8c00] transition-colors"
                  >
                    🔄 Voltar ao Dashboard
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    🔄 Atualizar Página
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Lista de Materiais Gerados */}
        {materials.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#ffddc2]">
            <h2 className="text-xl font-bold text-[#593100] mb-4">
              📚 Materiais Disponíveis ({materials.length})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {materials.map((material) => (
                <div
                  key={material.material_id}
                  className="bg-[#fff7f0] p-4 rounded-lg border border-[#ffddc2] hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-[#593100] text-sm">
                      📄 {material.title}
                    </h4>
                    <span className="text-xs bg-[#cc6200] text-white px-2 py-1 rounded">
                      {material.target_type}
                    </span>
                  </div>

                  <p className="text-xs text-[#593100] opacity-60 mb-3">
                    ID: {material.target_id} • Criado em{" "}
                    {formatDate(material.created_at)}
                  </p>

                  <button
                    onClick={() => handleStudyContent(material.material_id)}
                    className="w-full px-3 py-2 bg-[#cc6200] text-white rounded text-sm hover:bg-[#ff8c00] transition-colors"
                  >
                    📖 Abrir Material
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
