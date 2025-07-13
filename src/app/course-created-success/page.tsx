"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCourseCreation } from "@/contexts/CourseCreationContext";
import { useCourses } from "@/contexts/CourseContext";

export default function CourseCreatedSuccess() {
  const { state, dispatch } = useCourseCreation();
  const { addCourse } = useCourses();
  const [courseCreated, setCourseCreated] = useState(false);

  useEffect(() => {
    // Criar o curso no banco de dados (apenas uma vez)
    if (!courseCreated && state.courseName) {
      const createCourseInDB = () => {
        try {
          // Determinar categoria baseada no nome do curso
          const courseName = state.courseName.toLowerCase();
          let category = "Outros";
          if (
            courseName.includes("programação") ||
            courseName.includes("javascript") ||
            courseName.includes("python") ||
            courseName.includes("react")
          ) {
            category = "Programação";
          } else if (
            courseName.includes("design") ||
            courseName.includes("ui") ||
            courseName.includes("ux")
          ) {
            category = "Design";
          } else if (
            courseName.includes("marketing") ||
            courseName.includes("vendas")
          ) {
            category = "Marketing";
          } else if (
            courseName.includes("fotografia") ||
            courseName.includes("arte")
          ) {
            category = "Arte";
          } else if (
            courseName.includes("data") ||
            courseName.includes("dados")
          ) {
            category = "Data Science";
          }

          // Determinar dificuldade baseada nas respostas
          let difficulty: "iniciante" | "intermediario" | "avancado" =
            "iniciante";
          const knowledge = state.stepFourAnswer.toLowerCase();
          if (
            knowledge.includes("intermediário") ||
            knowledge.includes("algum conhecimento") ||
            knowledge.includes("básico")
          ) {
            difficulty = "intermediario";
          } else if (
            knowledge.includes("avançado") ||
            knowledge.includes("experiente") ||
            knowledge.includes("profissional")
          ) {
            difficulty = "avancado";
          }

          // Estimar horas baseado na complexidade
          const totalHours = mockCourseData.modulos.reduce((total, modulo) => {
            return total + parseInt(modulo.TEMPO_ESTIMADO.split(" ")[0]);
          }, 0);

          // Criar objeto do curso
          const newCourse = {
            name: state.courseName,
            description: `Curso personalizado de ${state.courseName} criado especialmente para você`,
            status: "nao_iniciado" as const,
            progress: 0,
            totalLessons: mockCourseData.modulos.length * 3, // Estimativa de 3 aulas por módulo
            completedLessons: 0,
            category,
            difficulty,
            estimatedHours: totalHours,
            tags: [
              state.courseName.toLowerCase(),
              category.toLowerCase(),
              difficulty,
            ],
          };

          console.log("Criando curso:", newCourse);
          addCourse(newCourse);
          setCourseCreated(true);
        } catch (error) {
          console.error("Erro ao criar curso:", error);
        }
      };

      createCourseInDB();
    }

    // Reseta o estado após 10 segundos na página de sucesso
    const timer = setTimeout(() => {
      dispatch({ type: "RESET" });
    }, 10000);

    return () => clearTimeout(timer);
  }, [
    dispatch,
    courseCreated,
    state.courseName,
    state.stepFourAnswer,
    addCourse,
  ]);

  // Mock da estrutura do curso personalizado (em produção viria da API)
  const mockCourseData = {
    course_topic: state.courseName,
    nivel_identificado: "INICIANTE",
    personalidade_aplicada: "Professor Clássico",
    adaptacoes_personalizadas:
      "Curso estruturado em módulos sequenciais e progressivos, com linguagem clara e didática, focando em conceitos fundamentais e aplicação prática gradual.",
    modulos: [
      {
        ID_MODULO: "1",
        NAME_MODULO: `Fundamentos de ${state.courseName}: Conceitos e Contexto`,
        DESCRICAO_MODULO: `Introdução aos conceitos básicos de ${state.courseName}, suas aplicações práticas e importância no mercado atual.`,
        NIVEL_DIFICULDADE: "BÁSICO",
        TEMPO_ESTIMADO: "6 horas",
      },
      {
        ID_MODULO: "2",
        NAME_MODULO: `Construção Prática com ${state.courseName}`,
        DESCRICAO_MODULO: `Desenvolvimento de projetos práticos utilizando ${state.courseName}, com foco em aplicação real dos conceitos.`,
        NIVEL_DIFICULDADE: "BÁSICO/INTERMEDIÁRIO",
        TEMPO_ESTIMADO: "8 horas",
      },
      {
        ID_MODULO: "3",
        NAME_MODULO: `Técnicas Avançadas de ${state.courseName}`,
        DESCRICAO_MODULO: `Exploração de técnicas avançadas e otimizações para dominar completamente ${state.courseName}.`,
        NIVEL_DIFICULDADE: "INTERMEDIÁRIO",
        TEMPO_ESTIMADO: "7 horas",
      },
      {
        ID_MODULO: "4",
        NAME_MODULO: `Aplicações Práticas e Estudos de Caso`,
        DESCRICAO_MODULO: `Aplicação dos conhecimentos em cenários reais, com projetos completos e estudos de caso do mercado.`,
        NIVEL_DIFICULDADE: "INTERMEDIÁRIO",
        TEMPO_ESTIMADO: "8 horas",
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff7f0] px-4">
      <div className="max-w-4xl text-center">
        {/* Animação de sucesso */}
        <div className="m-8 ">
          <div className="w-32 h-32 bg-gradient-to-r from-[#cc6200] to-[#ff8c00] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <span className="text-6xl">🎉</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-[#593100] mb-6">
          Parabéns! 🚀
        </h1>

        <h2 className="text-2xl md:text-3xl font-semibold text-[#cc6200] mb-8">
          Seu curso foi criado com sucesso!
        </h2>

        {/* Módulos do Curso */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8 border-2 border-[#ffddc2]">
          <h3 className="text-xl font-bold text-[#593100] mb-6">
            🎯 Estrutura do Curso ({mockCourseData.modulos.length} Módulos):
          </h3>

          <div className="space-y-4">
            {mockCourseData.modulos.map((modulo) => (
              <div
                key={modulo.ID_MODULO}
                className="bg-[#fff7f0] rounded-lg p-6 border-l-4 border-[#cc6200]"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#cc6200] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {modulo.ID_MODULO}
                    </div>
                    <h4 className="font-bold text-[#593100] text-lg">
                      {modulo.NAME_MODULO}
                    </h4>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="bg-[#ffddc2] px-3 py-1 rounded-full text-[#593100] font-medium">
                      {modulo.NIVEL_DIFICULDADE}
                    </span>
                    <span className="text-[#cc6200] font-semibold">
                      ⏱️ {modulo.TEMPO_ESTIMADO}
                    </span>
                  </div>
                </div>

                <p className="text-[#593100] opacity-80 leading-relaxed">
                  {modulo.DESCRICAO_MODULO}
                </p>

                <div className="mt-4 flex items-center gap-2 text-sm text-[#593100] opacity-60">
                  <span>📋</span>
                  <span>
                    Submódulos serão gerados dinamicamente conforme seu
                    progresso
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="px-8 py-4 rounded-full shadow-lg font-bold text-white bg-gradient-to-r from-[#cc6200] to-[#ff8c00] hover:from-[#ff8c00] hover:to-[#cc6200] transition transform hover:scale-105"
          >
            🎯 Começar a estudar
          </Link>
        </div>

        {/* Mensagem adicional */}
        <div className="mt-12 text-center mb-8">
          <p className="text-lg text-[#593100] opacity-80">
            Obrigado por escolher o Falky! 💜
          </p>
          <p className="text-base text-[#593100] opacity-60 mt-2">
            Seu curso personalizado está sendo preparado com muito carinho.
          </p>
        </div>
      </div>
    </div>
  );
}
