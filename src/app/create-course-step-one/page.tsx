"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCourseCreation } from "@/contexts/CourseCreationContext";

export default function CreateCourseStepOne() {
  const router = useRouter();
  const { state, dispatch, canProceedToNext, createCourseWithTopic, clearError } = useCourseCreation();
  const [inputValue, setInputValue] = useState(state.courseName);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    dispatch({ type: "SET_COURSE_NAME", payload: value });
    // Limpar erro quando usuário digitar
    if (state.apiError) {
      clearError();
    }
  };

  const handleContinue = async () => {
    console.log("🔧 [DEBUG] STEP-ONE handleContinue iniciado");
    console.log("🔧 [DEBUG] - inputValue:", inputValue);
    console.log("🔧 [DEBUG] - canProceedToNext():", canProceedToNext());
    console.log("🔧 [DEBUG] - state antes da chamada:", state);
    
    if (canProceedToNext()) {
      try {
        console.log("🔧 [DEBUG] STEP-ONE: Criando curso no backend...");
        // Criar curso no backend
        const result = await createCourseWithTopic(inputValue);
        
        console.log("🔧 [DEBUG] STEP-ONE: Resultado da criação:", result);
        
        if (result.success && result.courseId) {
          console.log("🔧 [DEBUG] STEP-ONE: Curso criado com sucesso, courseId:", result.courseId);
          
          // Se chegou até aqui, foi sucesso
          dispatch({ type: "NEXT_STEP" });
          console.log("🔧 [DEBUG] STEP-ONE: Redirecionando para step-two");
          router.push("/create-course-step-two");
        } else {
          console.error("🔧 [DEBUG] STEP-ONE: Falha ao criar curso:", result);
          // Erro já tratado no contexto
        }
      } catch (error) {
        // Erro já tratado no contexto
        console.error("🔧 [DEBUG] STEP-ONE: Erro ao criar curso:", error);
      }
    } else {
      console.log("🔧 [DEBUG] STEP-ONE: canProceedToNext() retornou false");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff7f0] px-4">
      <div className="w-full max-w-2xl bg-[#ffddc2] rounded-3xl p-12 shadow-2xl flex flex-col items-center border border-[#ffb877]">
        <label className="text-3xl font-bold text-[#593100] mb-8 text-center">
          O que você quer aprender hoje?
        </label>
        
        {/* Mensagem de erro da API */}
        {state.apiError && (
          <div className="w-full max-w-xl mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="text-sm">{state.apiError}</p>
          </div>
        )}
        
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Ex: Inteligência Artificial, Culinária, Fotografia..."
          className="w-full max-w-xl px-6 py-5 text-2xl text-[#593100] bg-[#fff7f0] border-2 border-[#cc6200] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#cc6200] focus:border-transparent placeholder-[#cc6200] placeholder-opacity-40 mb-10 shadow-sm"
          disabled={state.loading}
        />
        
        <button
          onClick={handleContinue}
          disabled={!canProceedToNext() || state.loading}
          className="px-12 py-4 rounded-full shadow-lg font-bold text-lg text-[#fff] bg-[#593100] hover:bg-[#cc6200] transition border-none whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {state.loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Criando curso...
            </>
          ) : (
            "Quero criar meu professor"
          )}
        </button>
      </div>
    </div>
  );
}
