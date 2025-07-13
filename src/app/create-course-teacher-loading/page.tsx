"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCourseCreation } from "@/contexts/CourseCreationContext";

export default function CreateCourseLoadingTeacher() {
  const router = useRouter();
  const { state } = useCourseCreation();
  const [loadingMessage, setLoadingMessage] = useState(
    "Buscando professores especializados..."
  );
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 8;
  const [teacherSearchSteps, setTeacherSearchSteps] = useState<string[]>([]);
  const [visibleStepsCount, setVisibleStepsCount] = useState(0);

  // Etapas de busca de professores
  const searchSteps = [
    "🔍 Analisando especialização necessária...",
    "👨‍🏫 Buscando professores especialistas na plataforma...",
    "🤖 Configurando professor de IA personalizado...",
    "📊 Avaliando compatibilidade com suas preferências...",
    "⭐ Verificando avaliações e experiência...",
    "🎯 Personalizando abordagem pedagógica...",
    "📝 Preparando perfis dos professores...",
    "✅ Professores selecionados com sucesso!",
  ];

  useEffect(() => {
    setTeacherSearchSteps(searchSteps);
  }, []);

  useEffect(() => {
    if (teacherSearchSteps.length === 0) return;

    setVisibleStepsCount(0);

    // Exibir cada etapa progressivamente
    const interval = setInterval(() => {
      setVisibleStepsCount((prev) => {
        if (prev < teacherSearchSteps.length) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 600); // 600ms entre cada etapa

    return () => clearInterval(interval);
  }, [teacherSearchSteps]);

  useEffect(() => {
    const findTeachers = async () => {
      try {
        console.log("🔍 Buscando professores para:", state.courseName);

        // Simular progresso de busca
        const progressSteps = [
          {
            message: "Iniciando busca de professores...",
            progress: 10,
            step: 1,
          },
          {
            message: "Analisando especialização necessária...",
            progress: 20,
            step: 2,
          },
          {
            message: "Buscando na base de professores...",
            progress: 35,
            step: 3,
          },
          {
            message: "Configurando IA personalizada...",
            progress: 50,
            step: 4,
          },
          { message: "Avaliando compatibilidade...", progress: 65, step: 5 },
          { message: "Verificando disponibilidade...", progress: 80, step: 6 },
          { message: "Preparando perfis...", progress: 95, step: 7 },
          { message: "Professores encontrados!", progress: 100, step: 8 },
        ];

        // Tempo total de loading: 5 segundos
        const totalLoadingTime = new Promise((resolve) =>
          setTimeout(resolve, 5000)
        );

        // Simular progresso
        const progressInterval = setInterval(() => {
          setProgress((prev) => {
            const nextStep = progressSteps.find((step) => step.progress > prev);
            if (nextStep) {
              setLoadingMessage(nextStep.message);
              setCurrentStep(nextStep.step);
              return nextStep.progress;
            }
            return prev;
          });
        }, 600); // 600ms por step para cobrir 8 steps em ~5 segundos

        // Aguardar o tempo de loading
        await totalLoadingTime;

        clearInterval(progressInterval);

        console.log("✅ Professores encontrados com sucesso!");

        // Pequeno delay para mostrar 100% antes de redirecionar
        setTimeout(() => {
          router.push("/create-course-interview");
        }, 500);
      } catch (error) {
        console.error("❌ Erro ao buscar professores:", error);
        alert("Erro ao buscar professores. Tente novamente.");
        router.push("/create-course-interview");
      }
    };

    findTeachers();
  }, [router, state.courseName]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff7f0] px-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="animate-bounce text-6xl mb-4">🎓</div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#593100] mb-4">
              Encontrando Professores
            </h1>
            <p className="text-xl text-[#593100] opacity-80">
              Selecionando os melhores professores para{" "}
              <span className="font-semibold text-[#cc6200]">
                {state.courseName}
              </span>
            </p>
          </div>
        </div>

        {/* Loading card principal */}
        <div className="bg-[#ffddc2] rounded-3xl p-8 shadow-2xl border border-[#ffb877] mb-8">
          {/* Indicador de progresso */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-semibold text-[#593100]">
                {loadingMessage}
              </span>
              <span className="text-lg font-bold text-[#cc6200]">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-[#fff7f0] rounded-full h-4 shadow-inner">
              <div
                className="bg-gradient-to-r from-[#cc6200] to-[#ff8c00] h-4 rounded-full transition-all duration-500 ease-out shadow-sm"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-[#593100] opacity-60">
                Etapa {currentStep} de {totalSteps}
              </span>
              <span className="text-sm text-[#593100] opacity-60">
                Tempo estimado: {Math.max(0, Math.ceil((100 - progress) / 20))}s
              </span>
            </div>
          </div>

          {/* Etapas de busca */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-[#593100] mb-4 flex items-center gap-2">
              <span className="text-2xl">🔍</span>
              Processo de Busca:
            </h3>
            <div className="bg-[#fff7f0] rounded-xl p-4 max-h-64 overflow-y-auto">
              {teacherSearchSteps
                .slice(0, visibleStepsCount)
                .map((step, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 py-2 animate-fadeIn"
                  >
                    <div className="w-6 h-6 bg-[#cc6200] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <span className="text-[#593100] font-medium">{step}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Loading spinner animado */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-lg border border-[#ffddc2]">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#cc6200]"></div>
            <span className="text-[#593100] font-medium">
              Aguarde enquanto preparamos tudo...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
