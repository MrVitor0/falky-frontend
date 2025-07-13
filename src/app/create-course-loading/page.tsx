"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCourseCreation } from "@/contexts/CourseCreationContext";

export default function CreateCourseLoading() {
  const router = useRouter();
  const { dispatch, getCoursePreferencesData } = useCourseCreation();
  const [loadingMessage, setLoadingMessage] = useState(
    "Preparando seu curso personalizado..."
  );
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 10;
  const [researchSteps, setResearchSteps] = useState<string[]>([]);
  const [visibleResearchCount, setVisibleResearchCount] = useState(0);

  useEffect(() => {
    // Buscar etapas de pesquisa do research.json
    fetch("/research.json")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setResearchSteps(data);
      });
  }, []);

  useEffect(() => {
    if (researchSteps.length === 0) return;
    setVisibleResearchCount(0);
    // Exibir cada linha a cada 300ms
    const interval = setInterval(() => {
      setVisibleResearchCount((prev) => {
        if (prev < researchSteps.length) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 600); // Mudado de 300ms para 600ms
    return () => clearInterval(interval);
  }, [researchSteps]);

  useEffect(() => {
    const createCourse = async () => {
      try {
        // Simulando um user_id (em produção, viria da autenticação)
        const userId = "user_demo_123";

        // Obter dados formatados do context
        const courseData = getCoursePreferencesData();

        // Adicionar user_id aos dados
        const completeData = {
          user_id: userId,
          ...courseData,
        };

        console.log("Criando curso com dados:", completeData);

        // Simular progresso de criação com steps mais detalhados
        const progressSteps = [
          { message: "Iniciando criação do curso...", progress: 10, step: 1 },
          { message: "Analisando suas preferências...", progress: 20, step: 2 },
          {
            message: "Configurando nível de dificuldade...",
            progress: 30,
            step: 3,
          },
          { message: "Personalizando conteúdo...", progress: 40, step: 4 },
          { message: "Estruturando módulos...", progress: 50, step: 5 },
          { message: "Criando exercícios práticos...", progress: 60, step: 6 },
          { message: "Definindo cronograma...", progress: 70, step: 7 },
          { message: "Ajustando metodologia...", progress: 80, step: 8 },
          { message: "Finalizando detalhes...", progress: 90, step: 9 },
          { message: "Curso quase pronto!", progress: 100, step: 10 },
        ];

        // Criar um delay mínimo de 3 segundos para a experiência do usuário
        const minLoadingTime = new Promise(
          (resolve) => setTimeout(resolve, 5000) // Mudado de 3000ms para 5000ms
        );

        // Chamar a API
        // const apiCall = apiController.setCoursePreferences(completeData);
        const apiCall = new Promise<{
          success: boolean;
          data?: object;
          error?: string;
        }>((resolve) =>
          setTimeout(() => resolve({ success: true, data: {} }), 1000)
        );

        // Simular progresso enquanto aguarda
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
        }, 500); // Mudado de 300ms para 500ms para cobrir 10 steps em 5 segundos

        // Aguardar tanto a API quanto o tempo mínimo de loading
        const [response] = await Promise.all([apiCall, minLoadingTime]);

        clearInterval(progressInterval);

        if (response.success) {
          console.log("✅ Curso criado com sucesso:", response.data);

          // Marcar como completo
          dispatch({ type: "COMPLETE_CREATION" });

          // Pequeno delay para mostrar 100% antes de redirecionar
          setTimeout(() => {
            router.push("/create-course-interview");
          }, 500);
        } else {
          console.error("❌ Erro ao criar curso:", response.error);
          alert("Erro ao criar curso: " + response.error);
          router.push("/create-course-step-five");
        }
      } catch (error) {
        console.error("❌ Erro ao criar curso:", error);
        alert("Erro ao criar curso. Tente novamente.");
        router.push("/create-course-step-five");
      }
    };

    createCourse();
  }, [router, dispatch, getCoursePreferencesData]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff7f0] px-4">
      <div className="w-full max-w-2xl text-center">
        {/* Logo/Ícone animado */}
        <div className="mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-[#cc6200] to-[#ff8c00] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <span className="text-6xl">🚀</span>
          </div>
        </div>
        {/* Título */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#593100] mb-4">
          Criando seu curso personalizado
        </h1>
        {/* Indicador de step */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="bg-[#cc6200] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
              {currentStep}
            </div>
            <div className="text-[#593100] font-medium">
              <span className="text-2xl font-bold">{currentStep}</span>
              <span className="text-xl opacity-60">/{totalSteps}</span>
            </div>
          </div>
          <div className="text-sm text-[#593100] opacity-60">
            Etapa {currentStep} de {totalSteps}
          </div>
        </div>
        {/* Mensagem de loading */}
        <p className="text-lg md:text-xl text-[#593100] mb-8 opacity-80">
          {loadingMessage}
        </p>
        {/* Barra de progresso */}
        <div className="w-full bg-[#ffddc2] rounded-full h-4 mb-8 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#cc6200] to-[#ff8c00] h-4 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        {/* Etapas de pesquisa da IA */}
        <div className="bg-[#fff] border border-[#ffddc2] rounded-xl p-4 mb-8 text-left shadow-sm min-h-[120px]">
          <h4 className="text-[#cc6200] font-bold mb-2 text-base">
            Processo de pesquisa da IA:
          </h4>
          <ul className="space-y-1">
            {researchSteps.slice(0, visibleResearchCount).map((step, idx) => (
              <li key={idx} className="flex items-start gap-2 animate-fade-in">
                <span className="text-[#cc6200] mt-0.5">🤖</span>
                <span className="text-[#593100] text-sm">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
