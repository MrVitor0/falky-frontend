"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCourseCreation } from "@/contexts/CourseCreationContext";

export default function CreateCourseLoading() {
  const router = useRouter();
  const { state, dispatch, checkResearchStatus } = useCourseCreation();
  const [loadingMessage, setLoadingMessage] = useState(
    "Preparando seu curso personalizado..."
  );
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

  const isProcessing = useRef(false);
  const statusCheckInterval = useRef<NodeJS.Timeout | null>(null);
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
    // Evitar múltiplas execuções
    if (isProcessing.current) {
      return;
    }

    // Se não temos courseId, redirecionar para step-one
    if (!state.courseId) {
      router.push("/create-course-step-one");
      return;
    }

    const monitorResearch = async () => {
      try {
        isProcessing.current = true;

        console.log("📊 Monitorando pesquisa para curso:", state.courseId);

        // Inicializar progresso com status do contexto
        setProgress(state.researchProgress || 0);
        setLoadingMessage(state.researchMessage || "Preparando pesquisa...");

        // Função para mapear status para mensagens amigáveis
        const getStatusMessage = (status: string, progress: number) => {
          switch (status) {
            case "pending":
              return "Preparando pesquisa...";
            case "researching":
              if (progress <= 30) return "Gerando domínios e queries de pesquisa...";
              if (progress <= 60) return "Executando pesquisas em fontes confiáveis...";
              return "Compilando resultados das pesquisas...";
            case "analyzing":
              if (progress <= 80) return "Analisando e compilando informações...";
              if (progress <= 90) return "Gerando questões personalizadas...";
              return "Criando documento final do curso...";
            case "completed":
              return "Pesquisa concluída com sucesso! 🎉";
            case "failed":
              return "Erro na pesquisa. Tente novamente.";
            default:
              return "Processando...";
          }
        };

        // Função para atualizar o progresso baseado no status
        const updateProgressFromStatus = () => {
          const currentProgress = state.researchProgress || 0;
          const currentStatus = state.researchStatus || "pending";
          const message = state.researchMessage || getStatusMessage(currentStatus, currentProgress);
          
          console.log("🔧 [DEBUG] Loading - Atualizando progresso:", {
            status: currentStatus,
            progress: currentProgress,
            message: message
          });
          
          setProgress(currentProgress);
          setLoadingMessage(message);
          
          // Mapear progresso para steps visuais (0-100% → 1-10 steps)
          const calculatedStep = Math.min(Math.max(Math.floor(currentProgress / 10) + 1, 1), 10);
          setCurrentStep(calculatedStep);
        };

        // Atualizar uma vez imediatamente
        updateProgressFromStatus();

        // Iniciar monitoramento periódico
        statusCheckInterval.current = setInterval(async () => {
          try {
            console.log("🔧 [DEBUG] Loading - Verificando status da pesquisa...");
            await checkResearchStatus();
            
            // Atualizar UI com novos dados
            updateProgressFromStatus();
            
            // Se pesquisa completa (status = completed E progress = 100), redirecionar
            if (state.researchStatus === "completed" && state.researchProgress >= 100) {
              if (statusCheckInterval.current) {
                clearInterval(statusCheckInterval.current);
              }
              
              console.log("✅ Pesquisa concluída com sucesso!");
              setProgress(100);
              setLoadingMessage("Curso criado com sucesso! Redirecionando...");
              
              // Marcar como completo
              dispatch({ type: "COMPLETE_CREATION" });
              
              // Delay para mostrar 100% antes de redirecionar
              setTimeout(() => {
                router.push("/course-created-success");
              }, 1500);
              return;
            }
            
            // Se pesquisa falhou, parar e mostrar erro
            if (state.researchStatus === "failed") {
              if (statusCheckInterval.current) {
                clearInterval(statusCheckInterval.current);
              }
              
              console.error("❌ Erro na pesquisa");
              setLoadingMessage("Erro na pesquisa. Redirecionando...");
              setTimeout(() => {
                router.push("/create-course-step-five");
              }, 2000);
              return;
            }
          } catch (error) {
            console.error("🔧 [DEBUG] Loading - Erro ao verificar status:", error);
          }
        }, 1500); // Verificar a cada 1.5 segundos para melhor responsividade
      } catch (error) {
        // Limpeza em caso de erro (progressInterval is handled by finally block)

        console.error("❌ Erro durante o processo:", error);

        setLoadingMessage("Erro ao criar curso");
        setProgress(0);

        // Aguardar um pouco antes de redirecionar para mostrar a mensagem de erro
        setTimeout(() => {
          router.push("/create-course-step-five");
        }, 2000);
      } finally {
        isProcessing.current = false;
        // Limpar interval se ainda estiver rodando
        if (statusCheckInterval.current) {
          clearInterval(statusCheckInterval.current);
        }
      }
    };

    monitorResearch();

    // Cleanup function para limpar interval quando componente desmontar
    return () => {
      if (statusCheckInterval.current) {
        clearInterval(statusCheckInterval.current);
      }
    };
  }, [
    router,
    dispatch,
    state.courseId,
    checkResearchStatus,
    state.researchProgress,
    state.researchMessage,
    state.researchStatus,
  ]);

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
          {state.researchStatus === "completed" ? "Curso criado com sucesso!" : "Criando seu curso personalizado"}
        </h1>
        
        {/* Status da pesquisa */}
        {state.researchStatus && (
          <div className="mb-4">
            <span className={`inline-block px-3 py-1 text-white rounded-full text-sm font-medium ${
              state.researchStatus === "completed" ? "bg-green-500" :
              state.researchStatus === "failed" ? "bg-red-500" :
              "bg-[#cc6200]"
            }`}>
              Status: {state.researchStatus === "researching" ? "Pesquisando" : 
                      state.researchStatus === "analyzing" ? "Analisando" :
                      state.researchStatus === "completed" ? "Concluído" :
                      state.researchStatus === "failed" ? "Erro" : "Preparando"}
            </span>
          </div>
        )}
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
        <div className="w-full mb-8">
          <div className="flex justify-between text-sm text-[#593100] mb-2">
            <span>Progresso</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-[#ffddc2] rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#cc6200] to-[#ff8c00] h-4 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
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
