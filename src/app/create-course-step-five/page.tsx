"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCourseCreation } from "@/contexts/CourseCreationContext";
import { useAuth } from "@/contexts/AuthContext";

export default function CreateCourseStepFive() {
  const router = useRouter();
  const { state, dispatch, processCourseStep, clearError, startResearch } =
    useCourseCreation();
  const { user, loading: authLoading } = useAuth();
  const [successCriteria, setSuccessCriteria] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Usar a pergunta do contexto que veio da API
  const question =
    state.currentQuestion ||
    "Qual o seu critério de sucesso? O que você considera que foi um sucesso ao final do aprendizado?";
  const loading = state.loading;

  useEffect(() => {
    // Se não temos courseId, redirecionar para step-one
    if (!state.courseId) {
      router.push("/create-course-step-one");
      return;
    }

    // Limpar erro quando entrar na página
    if (state.apiError) {
      clearError();
    }
  }, [state.courseId, state.apiError, router, clearError]);

  const handleContinue = async () => {
    if (successCriteria.trim().length > 5) {
      try {
        setIsProcessing(true);

        // Salvar localmente
        dispatch({ type: "SET_STEP_FIVE_ANSWER", payload: successCriteria });

        // Processar step no backend (último step)
        await processCourseStep(successCriteria);

        // Iniciar pesquisa
        await startResearch();

        // Se chegou até aqui, foi sucesso
        dispatch({ type: "NEXT_STEP" });

        // Verificar se usuário está logado para decidir para onde redirecionar
        if (user) {
          // Usuário já está logado, ir direto para o loading
          router.push("/create-course-loading");
        } else {
          // Usuário não está logado, ir para signup
          router.push("/create-course-signup");
        }
      } catch (error) {
        // Erro já tratado no contexto
        console.error("Erro ao processar step:", error);
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff7f0] px-4">
      <div className="w-full max-w-2xl bg-[#ffddc2] rounded-3xl p-12 shadow-2xl flex flex-col items-center border border-[#ffb877]">
        {loading ? (
          <div className="text-[#593100] text-xl">Carregando pergunta...</div>
        ) : isProcessing ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#593100] mx-auto mb-4"></div>
            <div className="text-[#593100] text-xl">Processando...</div>
            <div className="text-[#593100] text-sm opacity-70 mt-2">
              {authLoading
                ? "Verificando cadastro..."
                : "Finalizando etapas..."}
            </div>
          </div>
        ) : (
          <>
            <label className="text-2xl font-bold text-[#593100] mb-8 text-center">
              {question}
            </label>
            <textarea
              value={successCriteria}
              onChange={(e) => setSuccessCriteria(e.target.value)}
              placeholder="Descreva o que seria um sucesso para você ao final do curso..."
              className="w-full max-w-xl px-6 py-5 text-lg text-[#593100] bg-[#fff7f0] border-2 border-[#cc6200] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cc6200] focus:border-transparent placeholder-[#cc6200] placeholder-opacity-40 mb-10 shadow-sm resize-none min-h-[120px]"
              disabled={isProcessing}
            />
            <button
              onClick={handleContinue}
              disabled={successCriteria.trim().length < 5 || isProcessing}
              className="px-12 py-4 rounded-full shadow-lg font-bold text-lg text-[#fff] bg-[#593100] hover:bg-[#cc6200] transition border-none whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processando...
                </>
              ) : (
                "Continuar"
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
