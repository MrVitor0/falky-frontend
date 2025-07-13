"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCourseCreation } from "@/contexts/CourseCreationContext";

export default function CreateCourseStepThree() {
  const router = useRouter();
  const { state, dispatch, processCourseStep, clearError } = useCourseCreation();
  const [answer, setAnswer] = useState("");

  // Usar a pergunta do contexto que veio da API
  const question = state.currentQuestion || `Qual é o seu objetivo principal ao aprender sobre ${state.courseName || "este assunto"}?`;
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
    if (answer.trim().length > 5) {
      try {
        // Salvar localmente
        dispatch({ type: "SET_STEP_THREE_ANSWER", payload: answer });
        
        // Processar step no backend
        await processCourseStep(answer);
        
        // Se chegou até aqui, foi sucesso
        dispatch({ type: "NEXT_STEP" });
        router.push("/create-course-step-four");
      } catch (error) {
        // Erro já tratado no contexto
        console.error("Erro ao processar step:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff7f0] px-4">
      <div className="w-full max-w-2xl bg-[#ffddc2] rounded-3xl p-12 shadow-2xl flex flex-col items-center border border-[#ffb877]">
        {loading ? (
          <div className="text-[#593100] text-xl">Carregando pergunta...</div>
        ) : (
          <>
            <label className="text-2xl font-bold text-[#593100] mb-8 text-center">
              {question}
            </label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Descreva seu objetivo principal com esse aprendizado..."
              className="w-full max-w-xl px-6 py-5 text-lg text-[#593100] bg-[#fff7f0] border-2 border-[#cc6200] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cc6200] focus:border-transparent placeholder-[#cc6200] placeholder-opacity-40 mb-10 shadow-sm resize-none min-h-[120px]"
            />
            <button
              onClick={handleContinue}
              disabled={answer.trim().length < 5}
              className="px-12 py-4 rounded-full shadow-lg font-bold text-lg text-[#fff] bg-[#593100] hover:bg-[#cc6200] transition border-none whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
