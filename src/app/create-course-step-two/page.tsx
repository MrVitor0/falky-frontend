"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCourseCreation } from "@/contexts/CourseCreationContext";

export default function CreateCourseStepTwo() {
  const router = useRouter();
  const { state, dispatch, processCourseStep, clearError } =
    useCourseCreation();
  const [motivation, setMotivation] = useState("");

  // Usar a pergunta do contexto que veio da API
  const question =
    state.currentQuestion ||
    `Qual a sua motivação para aprender sobre ${
      state.courseName || "este assunto"
    }?`;
  const loading = state.loading;

  useEffect(() => {
    if (state.apiError) {
      clearError();
    }
  }, [state.courseId, state.apiError, state.loading, router, clearError]);

  const handleContinue = async () => {
    if (motivation.trim().length > 5) {
      try {
        // Salvar localmente
        dispatch({ type: "SET_STEP_TWO_ANSWER", payload: motivation });

        // Processar step no backend
        await processCourseStep(motivation);

        // Se chegou até aqui, foi sucesso
        dispatch({ type: "NEXT_STEP" });
        router.push("/create-course-step-three");
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
          <div className="text-[#593100] text-xl flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#593100]"></div>
            Carregando pergunta...
          </div>
        ) : (
          <>
            <label className="text-2xl font-bold text-[#593100] mb-8 text-center">
              {question}
            </label>

            {/* Mensagem de erro da API */}
            {state.apiError && (
              <div className="w-full max-w-xl mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                <p className="text-sm">{state.apiError}</p>
              </div>
            )}

            <textarea
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              placeholder="Conte para a IA o que te motiva, seus objetivos, ou o que espera alcançar..."
              className="w-full max-w-xl px-6 py-5 text-lg text-[#593100] bg-[#fff7f0] border-2 border-[#cc6200] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cc6200] focus:border-transparent placeholder-[#cc6200] placeholder-opacity-40 mb-10 shadow-sm resize-none min-h-[120px]"
              disabled={state.loading}
            />

            <div className="flex gap-4">
              <button
                onClick={() => router.push("/create-course-step-one")}
                disabled={state.loading}
                className="px-8 py-3 rounded-full shadow-lg font-bold text-lg text-[#593100] bg-[#fff7f0] hover:bg-[#ffddc2] transition border-2 border-[#cc6200] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Voltar
              </button>
              <button
                onClick={handleContinue}
                disabled={motivation.trim().length < 5 || state.loading}
                className="px-12 py-4 rounded-full shadow-lg font-bold text-lg text-[#fff] bg-[#593100] hover:bg-[#cc6200] transition border-none whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {state.loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processando...
                  </>
                ) : (
                  "Continuar"
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
